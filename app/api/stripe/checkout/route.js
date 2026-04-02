import Stripe from 'stripe'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const body = await request.json()
  const { name, firm, email, phone, website, states, tags, bio } = body

  if (!name || !email || !phone) {
    return Response.json({ error: 'name, email, and phone are required' }, { status: 400 })
  }

  const stateList = states?.length ? states : ['ALL']

  try {
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
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return Response.json({ error: 'Failed to create listing record' }, { status: 500 })
    }

    const priceId = process.env.STRIPE_PRICE_ATTORNEY_LISTING
    if (!priceId) {
      return Response.json({ error: 'Stripe price not configured' }, { status: 500 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        attorney_id: attorney.id,
        attorney_name: name,
        firm: firm || '',
      },
      subscription_data: {
        metadata: {
          attorney_id: attorney.id,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.benefitspath.org'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.benefitspath.org'}/lawyer-signup`,
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
