import Link from 'next/link'

export function CTABlock({ title, description, href, btnText, variant = 'green' }) {
  return (
    <aside className={`cta-block${variant === 'green' ? '' : ' cta-blue'}`}>
      <h3 className="cta-title">{title}</h3>
      <p className="cta-text">{description}</p>
      <Link href={href} className="cta-btn">{btnText} <span aria-hidden="true">→</span></Link>
    </aside>
  )
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }) {
  return (
    <div className="faq">
      <h2 className="prose-h2">{title}</h2>
      {faqs.map((faq, i) => (
        <div key={i} className="faq-item">
          <h3 className="faq-q">{faq.q}</h3>
          <p className="faq-a">{faq.a}</p>
        </div>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      })}} />
    </div>
  )
}

const NAV = {
  en: { home: '/', articles: 'Articles', lawyer: 'Find a Lawyer', check: 'Check Eligibility →', checkHref: '/', footCheck: 'Check Eligibility', appeal: 'Appeal Letter', legal: 'Find Legal Help', guides: 'Guides', attorneys: 'For Attorneys', other: 'Español', otherHref: '/es',
    disclaimer: 'BenefitsPath is not a law firm or government agency. Information is for educational purposes only.' },
  es: { home: '/es', articles: 'Artículos', lawyer: 'Ayuda legal', check: 'Verificar elegibilidad →', checkHref: '/es', footCheck: 'Verificar elegibilidad', appeal: 'Carta de apelación (inglés)', legal: 'Ayuda legal', guides: 'Audiencia de apelación', attorneys: 'Para abogados', other: 'English', otherHref: '/',
    disclaimer: 'BenefitsPath no es un bufete de abogados ni una agencia del gobierno. La información es solo educativa.' },
}

export function SeoLayout({ children, lang = 'en', altHref }) {
  const n = NAV[lang] || NAV.en
  const es = lang === 'es'
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      <div lang={lang} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh' }}>
        <nav className="topnav">
          <Link href={n.home} className="topnav-logo">
            <div className="topnav-mark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="topnav-word">BenefitsPath</span>
          </Link>
          <div className="topnav-links">
            <Link href={altHref || n.otherHref} className="topnav-link topnav-opt" hrefLang={es ? 'en' : 'es'} lang={es ? 'en' : 'es'}>{n.other}</Link>
            {!es && <Link href="/articles" className="topnav-link topnav-opt">{n.articles}</Link>}
            <Link href="/legal-help" className="topnav-link">{n.lawyer}</Link>
            <Link href={n.checkHref} className="topnav-cta">{n.check}</Link>
          </div>
        </nav>
        <main className="seo-main">
          {children}
        </main>
        <footer style={{ background: '#1a1714', color: 'rgba(255,255,255,0.6)', padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16, fontSize: 14 }}>
              {(es ? [
                ['/es', n.footCheck], ['/es/audiencia-de-apelacion', n.guides], ['/legal-help', n.legal], ['/', n.other],
              ] : [
                ['/', n.footCheck], ['/#appeal', n.appeal], ['/legal-help', n.legal], ['/articles', n.articles], ['/how-to-appeal-unemployment-denial', n.guides], ['/es', n.other], ['/for-attorneys', n.attorneys],
              ]).map(([href, label]) => (
                <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <p style={{ fontSize: 12, margin: 0 }}>{n.disclaimer} © {new Date().getFullYear()} BenefitsPath</p>
          </div>
        </footer>
      </div>
    </>
  )
}
