import Stripe from 'stripe'
import { supabaseAdmin } from '../../../../lib/supabase'
import { REP_COMMISSION_CENTS } from '../../../../lib/listingPrice'

// Stripe moved some invoice fields in newer API versions (invoice.subscription ->
// invoice.parent.subscription_details.subscription). Read both shapes.
const invoiceSubscriptionId = (inv) =>
  inv?.subscription || inv?.parent?.subscription_details?.subscription || null
const invoiceMeta = (inv) =>
  inv?.subscription_details?.metadata || inv?.parent?.subscription_details?.metadata || {}

async function recordCommission(invoice) {
  if (!invoice?.id || !(invoice.amount_paid > 0)) return
  const subscriptionId = invoiceSubscriptionId(invoice)
  const meta = invoiceMeta(invoice)

  // Find the listing: by attorney_id on the subscription, else by subscription id.
  let attorney = null
  if (meta.attorney_id) {
    const { data } = await supabaseAdmin.from('attorneys').select('id, rep_id').eq('id', meta.attorney_id).maybeSingle()
    attorney = data
  }
  if (!attorney && subscriptionId) {
    const { data } = await supabaseAdmin.from('attorneys').select('id, rep_id').eq('stripe_subscription_id', subscriptionId).maybeSingle()
    attorney = data
  }

  const repId = attorney?.rep_id || (meta.rep_id ? Number(meta.rep_id) : null)
  if (!repId) return // not a rep-credited listing

  const paidAt = invoice.status_transitions?.paid_at
    ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
    : new Date().toISOString()

  // One commission per invoice; the unique invoice id makes webhook retries harmless.
  const { error } = await supabaseAdmin.from('commissions').upsert(
    {
      stripe_invoice_id: invoice.id,
      attorney_id: attorney?.id || null,
      rep_id: repId,
      amount_cents: REP_COMMISSION_CENTS,
      invoice_paid_at: paidAt,
    },
    { onConflict: 'stripe_invoice_id', ignoreDuplicates: true }
  )
  if (error) {
    console.error('Commission insert error:', error)
    throw error // 500 so Stripe retries
  }
}

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event
  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return Response.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const attorneyId = session.metadata?.attorney_id
        if (!attorneyId) break
        await supabaseAdmin
          .from('attorneys')
          .update({
            active: true,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
          })
          .eq('id', attorneyId)
        break
      }

      case 'invoice.paid':
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        const subscriptionId = invoiceSubscriptionId(invoice)
        if (subscriptionId) {
          await supabaseAdmin.from('attorneys').update({ active: true }).eq('stripe_subscription_id', subscriptionId)
        }
        await recordCommission(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const subscriptionId = invoiceSubscriptionId(event.data.object)
        if (!subscriptionId) break
        await supabaseAdmin.from('attorneys').update({ active: false }).eq('stripe_subscription_id', subscriptionId)
        break
      }

      case 'customer.subscription.deleted': {
        await supabaseAdmin.from('attorneys').update({ active: false }).eq('stripe_subscription_id', event.data.object.id)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const isActive = ['active', 'trialing'].includes(subscription.status)
        await supabaseAdmin.from('attorneys').update({ active: isActive }).eq('stripe_subscription_id', subscription.id)
        break
      }
    }
  } catch (err) {
    console.error(`Webhook handler error (${event.type}):`, err)
    return Response.json({ error: 'Handler failed' }, { status: 500 })
  }

  return Response.json({ received: true })
}
