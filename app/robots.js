export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: 'https://www.benefitspath.org/sitemap.xml',
    host: 'https://www.benefitspath.org',
  }
}
