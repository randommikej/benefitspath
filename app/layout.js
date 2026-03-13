import './globals.css'

export const metadata = {
  title: { default: 'BenefitsPath — Free Unemployment Benefits Navigator', template: '%s | BenefitsPath' },
  description: 'Check your unemployment eligibility, generate appeal letters, and connect with employment attorneys — 100% free for all 50 states.',
  keywords: ['unemployment benefits', 'unemployment eligibility', 'appeal unemployment denial', 'unemployment insurance'],
  openGraph: {
    siteName: 'BenefitsPath',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.benefitspath.org'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064375540718559"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
