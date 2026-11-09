import Link from 'next/link'

const APPLY_EMAIL = 'michael@momoadvisors.com'
const APPLY_HREF = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application: Cold-Calling Sales Rep')}`
const DATE_POSTED = '2026-11-09'
const VALID_THROUGH = '2027-02-09T23:59:59-08:00'

export const metadata = {
  title: 'Careers: Cold-Calling Sales Rep, Remote, 1099 Commission | BenefitsPath',
  description:
    'Remote, 1099 commission-only cold-calling role. Earn $100 a month, every month, for every employment attorney you sign to a BenefitsPath listing. No base pay, no benefits, no set hours.',
  alternates: { canonical: 'https://www.benefitspath.org/careers' },
}

const earnings = [
  [5, 500, 6000],
  [10, 1000, 12000],
  [25, 2500, 30000],
  [50, 5000, 60000],
  [100, 10000, 120000],
]

const usd = (n) => `$${n.toLocaleString('en-US')}`

const jobDescriptionHtml = `
<p><strong>Pay, up front: this is a 1099, commission-only role. There is no base pay, no hourly pay, and no benefits. You earn $100 every month for every attorney you sign, for as long as that attorney keeps paying.</strong></p>
<p><strong>This is a cold-calling job.</strong> You spend your time on the phone with employment attorneys and their offices. BenefitsPath does not provide email accounts, email addresses, or lead lists.</p>
<p><strong>About BenefitsPath:</strong> BenefitsPath (benefitspath.org) is a free tool that helps people who lost their job check their unemployment eligibility, file appeals, and find an employment attorney. More than 850 people have submitted requests for help since launch, with zero ad spend. Employment attorneys pay $250 a month to be listed in front of them, with no contracts. Your job is to get more of them listed.</p>
<p><strong>How you get paid</strong></p>
<ul>
<li>$100 per attorney, per month, recurring, with no cap and no expiration as long as they keep paying.</li>
<li>Every attorney counts separately: sign 10 attorneys at one firm and you earn $1,000 a month.</li>
<li>Paid every other week. Your first $100 is paid in full on the next pay cycle after the attorney's first payment.</li>
<li>If an attorney cancels, the $100 for that attorney stops. You never owe anything back.</li>
<li>No base pay, no hourly pay, no benefits. You are an independent contractor and receive a 1099.</li>
</ul>
<p><strong>What the work is</strong></p>
<ul>
<li>Cold calling employment attorneys anywhere in the US. No territories.</li>
<li>No email accounts, email addresses, or leads are provided. You build your own call list.</li>
<li>You get your own payment link, so every sale is tracked to you automatically.</li>
<li>No set hours, no quotas, no required meetings. Work as much or as little as you want.</li>
</ul>
<p><strong>To apply,</strong> email ${APPLY_EMAIL} with a short note on why you'd be good at this and any cold-calling or sales experience you have.</p>
`.trim()

const jobPostingJsonLd = {
  '@context': 'https://schema.org/',
  '@type': 'JobPosting',
  title: 'Cold-Calling Sales Rep (1099, Commission Only)',
  description: jobDescriptionHtml,
  datePosted: DATE_POSTED,
  validThrough: VALID_THROUGH,
  employmentType: 'CONTRACTOR',
  directApply: false,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'BenefitsPath',
    sameAs: 'https://www.benefitspath.org',
    logo: 'https://www.benefitspath.org/favicon.svg',
  },
  jobLocationType: 'TELECOMMUTE',
  applicantLocationRequirements: { '@type': 'Country', name: 'USA' },
  industry: 'Legal Services Marketing',
  occupationalCategory: '41-3091.00 Sales Representatives of Services',
  skills: 'Cold calling, outbound sales, B2B phone sales, objection handling',
}

const S = {
  h2: { fontFamily: "'Instrument Serif', serif", fontSize: 30, fontWeight: 400, margin: '40px 0 14px', color: '#1a1714' },
  p: { fontSize: 16, lineHeight: 1.7, color: '#3a352e', margin: '0 0 14px' },
  li: { fontSize: 16, lineHeight: 1.65, color: '#3a352e', marginBottom: 8 },
  card: { background: '#fff', border: '1px solid #e5e0d8', borderRadius: 16, padding: '22px 24px' },
}

function ApplyButton({ light = false }) {
  return (
    <a
      href={APPLY_HREF}
      style={{
        display: 'inline-block',
        background: light ? '#fff' : '#2d6a4f',
        color: light ? '#2d6a4f' : '#fff',
        padding: '15px 30px',
        borderRadius: 14,
        fontWeight: 700,
        fontSize: 16,
        textDecoration: 'none',
      }}
    >
      Apply by email →
    </a>
  )
}

export default function CareersPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />

      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh', color: '#1a1714' }}>
        <nav className="topnav">
          <Link href="/" className="topnav-logo">
            <div className="topnav-mark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="topnav-word">BenefitsPath</span>
          </Link>
          <a href={APPLY_HREF} className="topnav-cta">Apply →</a>
        </nav>

        <header style={{ background: '#2d6a4f', color: '#fff', padding: '56px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#d8f3dc', fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Now hiring · Remote · United States
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1.12, fontWeight: 400, margin: '0 0 18px' }}>
              Cold-Calling Sales Rep
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.92, margin: '0 auto 28px', maxWidth: 560 }}>
              Earn <strong>$100 a month, every month,</strong> for every employment attorney you sign. 1099, commission only.
            </p>
            <ApplyButton light />
          </div>
        </header>

        <main style={{ maxWidth: 720, margin: '0 auto', padding: '36px 20px 64px' }}>
          <div style={{ ...S.card, background: '#fff8e6', borderColor: '#f3d98b' }}>
            <p style={{ ...S.p, margin: 0, color: '#5c4400' }}>
              <strong>Pay, up front:</strong> this is a 1099, commission-only role. There is no base pay, no hourly pay, and no benefits. You earn $100 every month for every attorney you sign, for as long as that attorney keeps paying.
            </p>
          </div>
          <div style={{ ...S.card, marginTop: 14 }}>
            <p style={{ ...S.p, margin: 0 }}>
              <strong>This is a cold-calling job.</strong> You spend your time on the phone with employment attorneys and their offices. BenefitsPath does not provide email accounts, email addresses, or lead lists.
            </p>
          </div>

          <h2 style={S.h2}>About BenefitsPath</h2>
          <p style={S.p}>
            BenefitsPath is a free tool that helps people who lost their job check their unemployment eligibility, file appeals, and find an employment attorney. More than 850 people have submitted requests for help since launch, with zero ad spend and zero outbound marketing.
          </p>
          <p style={S.p}>
            Employment attorneys pay $250 a month to be listed in front of those people. No contracts, cancel anytime. Your job is to get more of them listed.
          </p>

          <h2 style={S.h2}>How you get paid</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={S.li}><strong>$100 per attorney, per month, recurring.</strong> No cap, and no expiration as long as they keep paying.</li>
            <li style={S.li}><strong>Every attorney counts separately.</strong> Sign 10 attorneys at the same firm and you earn $1,000 a month.</li>
            <li style={S.li}><strong>Paid every other week.</strong> Your first $100 is paid in full on the next pay cycle after the attorney's first payment, whatever day they signed up.</li>
            <li style={S.li}><strong>It stops when they stop.</strong> If an attorney cancels or their payment fails, the $100 for that attorney stops. You never owe anything back.</li>
            <li style={S.li}><strong>No base pay. No hourly pay. No benefits.</strong> You are an independent contractor, receive a 1099, and handle your own taxes.</li>
          </ul>

          <h2 style={S.h2}>What earnings can look like</h2>
          <p style={{ ...S.p, fontSize: 14, color: '#5a524a' }}>Examples only, not a promise. They assume every attorney stays listed.</p>
          <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <thead>
                <tr style={{ background: '#f0ece4', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Attorneys listed</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Per month</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Per year</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map(([n, mo, yr]) => (
                  <tr key={n} style={{ borderTop: '1px solid #ece7de' }}>
                    <td style={{ padding: '11px 16px' }}>{n}</td>
                    <td style={{ padding: '11px 16px', fontWeight: 600, color: '#2d6a4f' }}>{usd(mo)}</td>
                    <td style={{ padding: '11px 16px' }}>{usd(yr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={S.h2}>What the work is</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={S.li}><strong>This is a phone job.</strong> You cold call employment attorneys and their offices anywhere in the US. There are no territories.</li>
            <li style={S.li}><strong>No email accounts or email addresses are provided.</strong> If an attorney asks for details in writing, you can follow up from your own email.</li>
            <li style={S.li}><strong>No leads are provided.</strong> You build your own list of attorneys to call.</li>
            <li style={S.li}>You get your own payment link. Attorneys sign up through it, and the sale is tracked to you automatically.</li>
            <li style={S.li}><strong>No set hours, no quotas, no required meetings.</strong> Work as much or as little as you want, whenever and wherever you want.</li>
            <li style={S.li}>You use your own phone and computer.</li>
          </ul>

          <h2 style={S.h2}>Is this a fit?</h2>
          <p style={S.p}><strong>Yes, if you</strong> are comfortable cold calling businesses and asking for the sale, want income that builds month over month, work well without a manager setting your schedule, and can describe the product honestly: a listing, not guaranteed clients.</p>
          <p style={S.p}><strong>No, if you</strong> need a steady paycheck from day one, benefits, or a provided lead list, or would rather sell by email or social media than by phone.</p>

          <h2 style={S.h2}>Ground rules</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={S.li}>Describe BenefitsPath accurately. Never promise attorneys a number of clients or cases.</li>
            <li style={S.li}>No spam and no bulk email blasts.</li>
            <li style={S.li}>You'll sign a short independent contractor agreement before your payment link is issued.</li>
          </ul>

          <div style={{ ...S.card, marginTop: 40, textAlign: 'center', padding: '32px 24px' }}>
            <h2 style={{ ...S.h2, margin: '0 0 10px' }}>Apply</h2>
            <p style={S.p}>
              Email <a href={APPLY_HREF} style={{ color: '#2d6a4f', fontWeight: 600 }}>{APPLY_EMAIL}</a> with a short note on why you'd be good at this and any cold-calling or sales experience you have.
            </p>
            <ApplyButton />
            <p style={{ ...S.p, fontSize: 14, color: '#5a524a', marginTop: 20, marginBottom: 0 }}>
              <strong>Pay and role, one more time:</strong> cold calling, 1099, commission only, no base, no benefits. $100 a month for every attorney you sign, paid every other week, for as long as they stay.
            </p>
          </div>

          <p style={{ ...S.p, fontSize: 13, color: '#8a8078', marginTop: 24, textAlign: 'center' }}>BenefitsPath welcomes applicants of every background.</p>
        </main>
      </div>
    </>
  )
}
