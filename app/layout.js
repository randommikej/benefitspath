import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: { default: 'BenefitsPath — Free Unemployment Benefits Navigator', template: '%s | BenefitsPath' },
  description: 'Check your unemployment eligibility, generate appeal letters, and connect with employment attorneys — 100% free for all 50 states.',
  keywords: ['unemployment benefits', 'unemployment eligibility', 'appeal unemployment denial', 'unemployment insurance', 'unemployment calculator', 'unemployment appeal letter'],
  openGraph: {
    siteName: 'BenefitsPath',
    type: 'website',
    locale: 'en_US',
    title: 'BenefitsPath — Free Unemployment Benefits Navigator',
    description: 'Check your unemployment eligibility, generate appeal letters, and connect with employment attorneys — 100% free for all 50 states.',
    url: 'https://www.benefitspath.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BenefitsPath — Free Unemployment Benefits Navigator',
    description: 'Check your unemployment eligibility, generate appeal letters, and connect with employment attorneys — 100% free.',
  },
  alternates: {
    canonical: 'https://www.benefitspath.org',
  },
  robots: { index: true, follow: true },
  verification: { google: 'TDlDvaNkcoStForyONL56uKUyCyYAvtp043bpkNB9ZE' },
  metadataBase: new URL('https://www.benefitspath.org'),
}

export default function RootLayout({ children }) {
  const redditPixelId = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BenefitsPath',
    url: 'https://www.benefitspath.org',
    description: 'Free unemployment benefits navigator for all 50 states. Check eligibility, generate appeal letters, and connect with employment attorneys.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.benefitspath.org/unemployment-benefits-{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064375540718559"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          strategy="lazyOnload"
          data-pid="7LdEGGfZbgQPGWK3"
          data-version="062024"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XP23624RW5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XP23624RW5');
          `}
        </Script>
        {redditPixelId && (
          <Script id="reddit-pixel" strategy="afterInteractive">{`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/v2.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
            rdt("init","${redditPixelId}");
            rdt("track","PageVisit");
          `}</Script>
        )}
      </body>
    </html>
  )
}
