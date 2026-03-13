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

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...topicRoutes,
    ...stateRoutes,
  ]
}
