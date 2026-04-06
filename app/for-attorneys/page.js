import Link from 'next/link'

export const metadata = {
  title: 'Get Listed on BenefitsPath | Reach Unemployed Clients — $25/mo',
  description: 'Advertise your employment law practice to thousands of unemployed Americans actively seeking legal help. $25/month, no contracts, cancel anytime.',
}

export default function ForAttorneysPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh', color: '#1a1714' }}>

        {/* Nav */}
        <nav style={{ background: '#fff', borderBottom: '1px solid #e5e0d8', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, background: '#2d6a4f', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: '#1a1714' }}>BenefitsPath</span>
          </Link>
          <Link href="/lawyer-signup" style={{ background: '#2d6a4f', color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Get Listed →</Link>
        </nav>

        {/* Hero */}
        <div style={{ background: '#2d6a4f', color: '#fff', padding: '64px 24px 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#d8f3dc', fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 20, marginBottom: 24, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
              For Employment Attorneys
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.15, marginBottom: 20, fontWeight: 400 }}>
              Reach clients when<br />they need you most
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.9, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
              BenefitsPath helps thousands of unemployed Americans every month understand their rights and find legal help. Your listing puts your firm directly in front of them.
            </p>
            <Link href="/lawyer-signup" style={{ display: 'inline-block', background: '#fff', color: '#2d6a4f', padding: '16px 36px', borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: 'none' }}>
              Start Your Listing — $25/mo →
            </Link>
            <p style={{ marginTop: 14, fontSize: 13, opacity: 0.7 }}>No contracts. Cancel anytime.</p>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e0d8', padding: '20px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px 48px' }}>
            {[
              ['10,000+', 'Monthly users'],
              ['50 states', 'Coverage'],
              ['High intent', 'Users need help now'],
              ['$25/mo', 'Flat rate'],
            ].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#2d6a4f' }}>{num}</div>
                <div style={{ fontSize: 13, color: '#5a524a', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, marginBottom: 8, textAlign: 'center' }}>How it works</h2>
          <p style={{ textAlign: 'center', color: '#5a524a', marginBottom: 48 }}>Listed in minutes. Seen by thousands.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { step: '1', title: 'Create your listing', desc: 'Fill out a short form with your firm name, practice areas, states covered, and a brief bio.' },
              { step: '2', title: 'Complete payment', desc: 'Secure $25/month subscription via Stripe. Cancel anytime — no lock-in, no contracts.' },
              { step: '3', title: 'Go live instantly', desc: 'Your listing appears to users in your covered states who complete our eligibility flow.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e5e0d8' }}>
                <div style={{ width: 36, height: 36, background: '#d8f3dc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2d6a4f', marginBottom: 16 }}>{step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div style={{ background: '#fff', borderTop: '1px solid #e5e0d8', borderBottom: '1px solid #e5e0d8', padding: '56px 24px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, marginBottom: 8, textAlign: 'center' }}>What's included</h2>
            <p style={{ textAlign: 'center', color: '#5a524a', marginBottom: 40 }}>Everything you need to get discovered by clients in need.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                'Your name, firm, and contact info',
                'Phone & website link',
                'Practice areas & specialty tags',
                'State coverage (one or all 50)',
                'Short bio visible to users',
                'Listed to users in your covered states',
                'Appears after eligibility quiz results',
                'Cancel anytime from your dashboard',
              ].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0ede6' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 15, color: '#1a1714' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, marginBottom: 8 }}>Simple pricing</h2>
          <p style={{ color: '#5a524a', marginBottom: 36 }}>One plan. One price. No surprises.</p>
          <div style={{ background: '#fff', border: '2px solid #2d6a4f', borderRadius: 20, padding: 40 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 56, color: '#2d6a4f', lineHeight: 1 }}>$25</div>
            <div style={{ fontSize: 16, color: '#5a524a', marginBottom: 28 }}>per month</div>
            <Link href="/lawyer-signup" style={{ display: 'block', background: '#2d6a4f', color: '#fff', padding: '16px 24px', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none', marginBottom: 16 }}>
              Get Listed Now →
            </Link>
            <p style={{ fontSize: 13, color: '#8a8078' }}>Cancel anytime · No setup fee · Instant activation</p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: '#fff', borderTop: '1px solid #e5e0d8', padding: '56px 24px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, marginBottom: 36, textAlign: 'center' }}>Common questions</h2>
            {[
              { q: 'Who sees my listing?', a: 'Users who complete our unemployment eligibility quiz and are located in your covered states. These are people actively seeking help — high-intent leads.' },
              { q: 'How do I cancel?', a: 'You can cancel anytime by emailing us. Your listing stays active until the end of your billing period.' },
              { q: 'What states can I cover?', a: 'Any state or all 50. You choose when you sign up. You can email us to update your coverage.' },
              { q: 'How quickly does my listing go live?', a: 'Immediately after payment is confirmed — typically within a minute or two.' },
              { q: 'Is this a lead generation service?', a: 'We display your contact information to users who are looking for help. Users contact you directly — we do not charge per lead.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: '1px solid #e5e0d8', padding: '20px 0' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ background: '#2d6a4f', padding: '56px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, color: '#fff', marginBottom: 12 }}>Ready to get discovered?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28, fontSize: 16 }}>Join employment attorneys helping Americans navigate their benefits.</p>
          <Link href="/lawyer-signup" style={{ display: 'inline-block', background: '#fff', color: '#2d6a4f', padding: '16px 36px', borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: 'none' }}>
            Create Your Listing — $25/mo →
          </Link>
        </div>

        {/* Footer */}
        <div style={{ background: '#1a1714', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#5a524a', fontSize: 13 }}>© 2025 BenefitsPath. <Link href="/" style={{ color: '#5a524a' }}>Back to homepage</Link></p>
        </div>
      </div>
    </>
  )
}
