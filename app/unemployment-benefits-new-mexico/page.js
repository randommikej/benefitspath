import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits in New Mexico — 2026 Guide',
  description: 'Complete guide to unemployment benefits in New Mexico. Eligibility requirements, weekly benefit amounts up to $511/week, how to apply, and how to appeal a denial.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-new-mexico' },
}

export default function Page() {
  const stats = [['$511', 'Max Weekly Benefit'], ['26 wks', 'Max Duration'], ['10 days', 'Appeal Deadline']]
  const faqs = [
    { q: 'How much will I receive in unemployment benefits in New Mexico?', a: 'In New Mexico, the maximum weekly benefit is $511 per week. Your actual amount depends on your earnings during the base period. Most claimants receive between $88–$511 per week.' },
    { q: 'How long can I collect unemployment in New Mexico?', a: 'New Mexico offers up to 26 weeks of unemployment benefits during normal economic conditions. Extended benefits may be available during periods of high statewide unemployment.' },
    { q: 'What is the appeal deadline in New Mexico?', a: 'You have 10 calendar days from the date of your denial notice to file an appeal in New Mexico. Missing this deadline typically means losing your right to appeal that specific determination.' },
    { q: 'Can I work part-time and still collect benefits in New Mexico?', a: 'Yes, in most cases. New Mexico allows you to earn some income while collecting benefits. Your benefits will be reduced proportionally based on your part-time earnings. Report all earnings when you certify each week.' },
    { q: 'What if my employer contests my New Mexico unemployment claim?', a: 'Your employer has the right to contest your claim. If they do, your case will be reviewed and you may need to provide additional information. If denied after a contest, you have 10 days to appeal.' },
  ]

  return (
    <SeoLayout>
      <div style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1a4731 100%)', color: '#fff', borderRadius: 16, padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>State Guide</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 5vw, 40px)', lineHeight: 1.15, marginBottom: 12, color: '#fff' }}>
          Unemployment Benefits in New Mexico
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,.85)', lineHeight: 1.6, marginBottom: 0 }}>
          Everything you need to know about New Mexico unemployment insurance — eligibility, benefit amounts, how to apply, and what to do if denied.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {stats.map(([val, lbl]) => (
          <div key={lbl} style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#2d6a4f' }}>{val}</div>
            <div style={{ fontSize: 12, color: '#8a8078', marginTop: 4 }}>{lbl}</div>
          </div>
        ))}
      </div>

      <CTABlock title="Check Your New Mexico Eligibility" description="Answer 5 quick questions and get a personalized eligibility result for New Mexico — including your estimated benefit amount." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Eligibility Requirements in New Mexico</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        To qualify for unemployment benefits in New Mexico, you generally must meet these requirements:
      </p>
      <ul style={{ paddingLeft: 22, marginBottom: 24 }}>
        {['You must have earned wages in at least two quarters of the base period. New Mexico has a short 10-day appeal window', 'You must be unemployed through no fault of your own (layoff, reduction in force, or similar)', 'You must be actively seeking full-time work and available to accept suitable employment', 'You must certify weekly that you are still unemployed and actively job searching'].map(r => (
          <li key={r} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{r}</li>
        ))}
      </ul>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Weekly Benefit Amounts in New Mexico</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        New Mexico weekly benefit amounts range from <strong>$88–$511</strong> per week, with a maximum of <strong>$511 per week</strong>. Benefits are calculated based on your earnings during the base period — typically the first four of the last five completed calendar quarters.
      </p>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        You can receive benefits for up to <strong>26 weeks</strong> in New Mexico. During periods of high statewide unemployment, extended benefits may be available.
      </p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How to Apply for Unemployment in New Mexico</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Apply online at the New Mexico Department of Workforce Solutions website or by phone.
      </p>
      <div style={{ marginBottom: 12 }}>
        <a href="https://www.dws.state.nm.us/unemployment/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2d6a4f', color: '#fff', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          Apply Online in New Mexico →
        </a>
      </div>
      <p style={{ fontSize: 14, color: '#8a8078', marginBottom: 32 }}>By phone: <strong>1-877-664-6984</strong></p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How to Appeal a Denial in New Mexico</h2>
      <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <strong style={{ color: '#92400e' }}>⏰ New Mexico Appeal Deadline: 10 calendar days from your denial notice</strong>
      </div>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        New Mexico allows only 10 calendar days to appeal a determination — among the shortest deadlines in the country.
      </p>

      <CTABlock title="Generate Your New Mexico Appeal Letter" description="Our free tool creates a professional appeal letter tailored to your situation and New Mexico unemployment law." href="/" btnText="Create My Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer contested your claim or the situation is complex, legal help can significantly improve your odds." href="/#lawyer" btnText="Find Free Legal Help" variant="blue" />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
