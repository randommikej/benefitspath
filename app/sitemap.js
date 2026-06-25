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
  'self-employment-assistance-program-start-business-on-unemployment-2026',
  'can-seasonal-workers-collect-unemployment-off-season-2026',
  'can-you-collect-unemployment-during-a-strike-or-lockout-2026',
  'how-to-file-unemployment-washington-state-2026-guide',
  'what-is-at-will-employment-your-rights-when-you-can-be-fired-2026',
  'how-to-reopen-or-reactivate-unemployment-claim-2026-guide',
  'can-you-collect-unemployment-while-pregnant-or-on-maternity-leave-2026',
  'can-you-collect-unemployment-and-workers-comp-at-the-same-time-2026',
  'can-you-collect-unemployment-and-social-security-at-the-same-time-2026',
  'can-teachers-collect-unemployment-over-summer-reasonable-assurance-2026',
  'filing-unemployment-different-state-interstate-combined-wage-claims-2026',
  'can-you-collect-unemployment-while-in-school-or-job-training-2026',
  'unemployment-work-search-requirements-2026',
  'what-is-warn-act-mass-layoff-notification-rights-2026',
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
  'how-to-file-unemployment-pennsylvania-2026-guide',
  'how-to-file-unemployment-illinois-2026-guide',
  'constructive-discharge-when-quitting-counts-as-wrongful-termination-2026',
  'how-to-file-unemployment-ohio-2026-guide',
  'are-unemployment-benefits-taxable-federal-state-tax-guide-2026',
  'how-to-file-unemployment-new-jersey-2026-guide',
  'partial-unemployment-benefits-hours-cut-2026-guide',
  'how-to-file-unemployment-georgia-2026-guide',
  'how-to-negotiate-severance-package-after-layoff-2026-guide',
  'how-to-file-unemployment-michigan-2026-guide',
  'how-to-file-unemployment-north-carolina-2026-guide',
  'final-paycheck-laws-by-state-2026-guide',
  'workplace-retaliation-legal-rights-how-to-prove-it-2026',
  'what-to-do-when-unemployment-benefits-run-out-2026',
  'layoff-vs-furlough-key-differences-unemployment-benefits-2026',
  'independent-contractor-misclassification-unemployment-benefits-2026',
  'non-compete-agreements-after-termination-enforceable-2026',
  'unemployment-phone-interview-how-to-prepare-2026',
  'age-discrimination-in-layoffs-adea-rights-2026',
  'refusing-job-offer-while-on-unemployment-suitable-work-2026',
  'unemployment-benefits-for-veterans-ucx-program-2026',
  'snap-food-stamps-after-job-loss-2026-guide',
  'health-insurance-marketplace-after-job-loss-aca-subsidies-2026',
  'unemployment-benefits-for-federal-employees-ucfe-rif-2026',
  '401k-after-job-loss-rollover-cash-out-leave-it-2026-guide',
  'disaster-unemployment-assistance-dua-how-to-qualify-2026',
  'how-unemployment-benefits-are-calculated-base-period-weekly-amount-2026',
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
