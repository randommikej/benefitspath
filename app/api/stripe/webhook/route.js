import Stripe from 'stripe'
import { supabaseAdmin } from '../../../../lib/supabase'

export const config = { api: { bodyParser: false } }

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

  const getAttorneyId = (obj) =>
    obj?.metadata?.attorney_id || obj?.subscription_data?.metadata?.attorney_id

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const attorneyId = getAttorneyId(session)
      if (!attorneyId) break

      const customerId = session.customer
      const subscriptionId = session.subscription

      await supabaseAdmin
        .from('attorneys')
        .update({
          active: true,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
        })
        .eq('id', attorneyId)
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object
      const subscriptionId = invoice.subscription
      if (!subscriptionId) break
      await supabaseAdmin
        .from('attorneys')
        .update({ active: true })
        .eq('stripe_subscription_id', subscriptionId)
      break
    }

    case 'invoice.payment_failed':
    case 'customer.subscription.deleted': {
      const obj = event.data.object
      const subscriptionId = obj.subscription || obj.id
      if (!subscriptionId) break
      await supabaseAdmin
        .from('attorneys')
        .update({ active: false })
        .eq('stripe_subscription_id', subscriptionId)
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object
      const isActive = ['active', 'trialing'].includes(subscription.status)
      await supabaseAdmin
        .from('attorneys')
        .update({ active: isActive })
        .eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return Response.json({ received: true })
}
