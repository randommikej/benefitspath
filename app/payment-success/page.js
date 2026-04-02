import Link from 'next/link'

export const metadata = {
  title: 'Listing Active | BenefitsPath',
  description: 'Your attorney listing on BenefitsPath is now active.',
  robots: { index: false },
}

export default function PaymentSuccessPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 48, maxWidth: 480, width: '100%', textAlign: 'center', border: '1px solid #e5e0d8', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 64, height: 64, background: '#d8f3dc', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, marginBottom: 12, color: '#1a1714' }}>You're listed!</h1>
          <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.7, marginBottom: 32 }}>
            Your attorney listing is now active on BenefitsPath. Unemployed Americans in your covered states can now find you when they need help.
          </p>
          <div style={{ background: '#f7f5f0', borderRadius: 12, padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
            <p style={{ fontSize: 14, color: '#5a524a', margin: 0 }}>
              You'll receive a confirmation email shortly. To update your listing or manage your subscription, email <strong>hello@benefitspath.org</strong>.
            </p>
          </div>
          <Link href="/" style={{ display: 'inline-block', background: '#2d6a4f', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            Back to BenefitsPath →
          </Link>
        </div>
      </div>
    </>
  )
}
