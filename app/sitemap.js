const BASE_URL = 'https://www.benefitspath.org'

const states = [
  'alabama','alaska','arizona','arkansas','california','colorado','connecticut',
  'delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa',
  'kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan',
  'minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire',
  'new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio',
  'oklahoma','oregon','pennsylvania','rhode-island','south-carolina','south-dakota',
  'tennessee','texas','utah','vermont','virginia','washington','washington-dc',
  'west-virginia','wisconsin','wyoming'
]

const topicPages = [
  'how-to-appeal-unemployment-denial',
  'reasons-unemployment-claims-get-denied',
  'unemployment-appeal-letter-example',
  'how-long-unemployment-benefits-take',
  'how-to-apply-for-unemployment',
  'unemployment-benefits-calculator',
]

// Dynamic article slugs — keep in sync with app/articles/data/articles.js
const articleSlugs = [
  'how-to-appeal-unemployment-denial-2026-guide',
  'what-is-wrongful-termination-your-legal-rights-explained',
  'employer-contests-unemployment-claim-what-to-do',
  'do-gig-workers-qualify-for-unemployment-benefits',
  'how-to-file-unemployment-california-2026-guide',
  'can-you-collect-unemployment-if-you-quit-your-job',
  'how-to-file-unemployment-florida-2026-guide',
  'how-to-file-unemployment-texas-2026-guide',
  'severance-pay-and-unemployment-benefits-can-you-collect-both',
  'how-to-file-unemployment-new-york-2026-guide',
  'unemployment-overpayment-notice-what-to-do',
  'working-part-time-while-on-unemployment-2026',
  'cobra-health-insurance-after-job-loss-2026-guide',
  'unemployment-identity-theft-fraudulent-claim-what-to-do',
  'fired-for-misconduct-can-you-collect-unemployment-2026',
]

export default function sitemap() {
  const now = new Date().toISOString()

  const stateRoutes = states.map((state) => ({
    url: `${BASE_URL}/unemployment-benefits-${state}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const topicRoutes = topicPages.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${BASE_URL}/articles/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...articleRoutes,
    ...topicRoutes,
    ...stateRoutes,
  ]
}
