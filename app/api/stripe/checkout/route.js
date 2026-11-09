import Stripe from 'stripe'
import { supabaseAdmin } from '../../../../lib/supabase'
import { getListingPriceId } from '../../../../lib/listingPrice'

// Looks up an active rep by their link code. Unknown or inactive codes are ignored
// (the attorney can still sign up; the listing just isn't credited to anyone).
async function findRep(code) {
  const clean = typeof code === 'string' ? code.trim().toLowerCase() : ''
  if (!clean || !/^[a-z0-9-]{2,40}$/.test(clean)) return null
  const { data } = await supabaseAdmin
    .from('reps')
    .select('id, code')
    .eq('code', clean)
    .eq('active', true)
    .maybeSingle()
  return data || null
}

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const body = await request.json()
  const { name, firm, email, phone, website, states, tags, bio, rep } = body

  if (!name || !email || !phone) {
    return Response.json({ error: 'name, email, and phone are required' }, { status: 400 })
  }

  const stateList = states?.length ? states : ['ALL']

  try {
    const repRow = await findRep(rep)

    // Insert a pending attorney row so we can activate on webhook
    const { data: attorney, error: dbError } = await supabaseAdmin
      .from('attorneys')
      .insert({
        name,
        firm: firm || '',
        email,
        phone,
        website: website || '',
        bio: bio || '',
        tags: tags || [],
        states: stateList,
        featured: false,
        paid_tier: 'standard',
        active: false, // activated by webhook on payment
        ...(repRow ? { rep_id: repRow.id } : {}),
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return Response.json({ error: 'Failed to create listing record' }, { status: 500 })
    }

    const priceId = await getListingPriceId(stripe)

    // Metadata is copied onto the subscription and every invoice it produces,
    // which is how the webhook credits each monthly payment to the right rep.
    const meta = {
      attorney_id: String(attorney.id),
      ...(repRow ? { rep_id: String(repRow.id), rep_code: repRow.code } : {}),
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.benefitspath.org'
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { ...meta, attorney_name: name, firm: firm || '' },
      subscription_data: { metadata: meta },
      success_url: `${base}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/lawyer-signup${repRow ? `?rep=${repRow.code}` : ''}`,
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
