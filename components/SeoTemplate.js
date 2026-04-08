import Link from 'next/link'

export function CTABlock({ title, description, href, btnText, variant = 'green' }) {
  const bg = variant === 'green' ? '#d8f3dc' : '#dbeafe'
  const border = variant === 'green' ? '#b7e4c7' : '#bfdbfe'
  const btnBg = variant === 'green' ? '#2d6a4f' : '#1e40af'
  return (
    <div style={{ background: bg, borderRadius: 16, padding: 28, margin: '32px 0', border: `1px solid ${border}` }}>
      <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, marginBottom: 8, color: '#1a1714', marginTop: 0 }}>{title}</h3>
      <p style={{ fontSize: 15, color: '#5a524a', marginBottom: 16, lineHeight: 1.6 }}>{description}</p>
      <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: btnBg, color: '#fff', padding: '13px 24px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>{btnText} →</Link>
    </div>
  )
}

export function FAQSection({ faqs }) {
  return (
    <div style={{ margin: '32px 0' }}>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 20 }}>Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid #e5e0d8', padding: '16px 0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, marginTop: 0, color: '#1a1714' }}>{faq.q}</h3>
          <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.7, marginBottom: 0 }}>{faq.a}</p>
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

export function SeoLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh' }}>
        <nav style={{ background: '#fff', borderBottom: '1px solid #e5e0d8', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, background: '#2d6a4f', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: '#1a1714' }}>BenefitsPath</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/articles" style={{ fontSize: 14, color: '#5a524a', textDecoration: 'none', fontWeight: 500 }}>Articles</Link>
            <Link href="/for-attorneys" style={{ fontSize: 14, color: '#5a524a', textDecoration: 'none', fontWeight: 500 }}>Find a Lawyer</Link>
            <Link href="/" style={{ background: '#2d6a4f', color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check Eligibility →</Link>
          </div>
        </nav>
        <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>
          {children}
        </main>
        <footer style={{ background: '#1a1714', color: 'rgba(255,255,255,0.6)', padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16, fontSize: 14 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Check Eligibility</Link>
              <Link href="/#appeal" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Appeal Letter</Link>
              <Link href="/#lawyer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Find Attorney</Link>
              <Link href="/articles" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Articles</Link>
              <Link href="/how-to-appeal-unemployment-denial" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Guides</Link>
              <Link href="/for-attorneys" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>For Attorneys</Link>
            </div>
            <p style={{ fontSize: 12, margin: 0 }}>BenefitsPath is not a law firm or government agency. Information is for educational purposes only. © {new Date().getFullYear()} BenefitsPath</p>
          </div>
        </footer>
      </div>
    </>
  )
}
