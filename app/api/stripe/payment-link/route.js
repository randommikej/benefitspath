import Stripe from 'stripe'

// POST /api/stripe/payment-link — admin generates a reusable payment link
export async function POST(request) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const priceId = process.env.STRIPE_PRICE_LISTING

  if (!priceId) {
    return Response.json({ error: 'Stripe price not configured' }, { status: 500 })
  }

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: priceId, quantity: 1 }],
      after_completion: {
        type: 'redirect',
        redirect: { url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.benefitspath.org'}/payment-success` },
      },
    })

    return Response.json({ url: paymentLink.url, id: paymentLink.id })
  } catch (err) {
    console.error('Payment link error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
