// Single attorney listing price: $250/month, no contract.
// The Stripe Price is looked up by a stable lookup_key and created on first use,
// so changing the price never requires a dashboard step or a new env var.
export const LISTING_PRICE_CENTS = 25000
export const LISTING_PRICE_LABEL = '$250'
export const REP_COMMISSION_CENTS = 10000

const LOOKUP_KEY = 'attorney_listing_monthly_250'
const DEFAULT_PRODUCT = 'prod_UEyRGupiRHstUY' // "BenefitsPath Attorney Listing"

export async function getListingPriceId(stripe) {
  const existing = await stripe.prices.list({ lookup_keys: [LOOKUP_KEY], active: true, limit: 1 })
  if (existing.data.length) return existing.data[0].id

  const price = await stripe.prices.create({
    product: process.env.STRIPE_PRODUCT_LISTING || DEFAULT_PRODUCT,
    currency: 'usd',
    unit_amount: LISTING_PRICE_CENTS,
    recurring: { interval: 'month' },
    lookup_key: LOOKUP_KEY,
    nickname: 'Attorney Listing $250/mo',
  })
  return price.id
}
