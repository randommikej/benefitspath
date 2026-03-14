import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits in Louisiana — 2026 Guide',
  description: 'Complete guide to unemployment benefits in Louisiana. Eligibility requirements, weekly benefit amounts up to $247/week, how to apply, and how to appeal a denial.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-louisiana' },
}

export default function Page() {
  const stats = [['$247', 'Max Weekly Benefit'], ['26 wks', 'Max Duration'], ['15 days', 'Appeal Deadline']]
  const faqs = [
    { q: 'How much will I receive in unemployment benefits in Louisiana?', a: 'In Louisiana, the maximum weekly benefit is $247 per week. Your actual amount depends on your earnings during the base period. Most claimants receive between $10–$247 per week.' },
    { q: 'How long can I collect unemployment in Louisiana?', a: 'Louisiana offers up to 26 weeks of unemployment benefits during normal economic conditions. Extended benefits may be available during periods of high statewide unemployment.' },
    { q: 'What is the appeal deadline in Louisiana?', a: 'You have 15 calendar days from the date of your denial notice to file an appeal in Louisiana. Missing this deadline typically means losing your right to appeal that specific determination.' },
    { q: 'Can I work part-time and still collect benefits in Louisiana?', a: 'Yes, in most cases. Louisiana allows you to earn some income while collecting benefits. Your benefits will be reduced proportionally based on your part-time earnings. Report all earnings when you certify each week.' },
    { q: 'What if my employer contests my Louisiana unemployment claim?', a: 'Your employer has the right to contest your claim. If they do, your case will be reviewed and you may need to provide additional information. If denied after a contest, you have 15 days to appeal.' },
  ]

  return (
    <SeoLayout>
      <div style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1a4731 100%)', color: '#fff', borderRadius: 16, padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>State Guide</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 5vw, 40px)', lineHeight: 1.15, marginBottom: 12, color: '#fff' }}>
          Unemployment Benefits in Louisiana
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,.85)', lineHeight: 1.6, marginBottom: 0 }}>
          Everything you need to know about Louisiana unemployment insurance — eligibility, benefit amounts, how to apply, and what to do if denied.
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

      <CTABlock title="Check Your Louisiana Eligibility" description="Answer 5 quick questions and get a personalized eligibility result for Louisiana — including your estimated benefit amount." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Eligibility Requirements in Louisiana</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        To qualify for unemployment benefits in Louisiana, you generally must meet these requirements:
      </p>
      <ul style={{ paddingLeft: 22, marginBottom: 24 }}>
        {['You must have earned wages in at least two quarters of the base period. Louisiana has one of the lower maximum weekly benefits', 'You must be unemployed through no fault of your own (layoff, reduction in force, or similar)', 'You must be actively seeking full-time work and available to accept suitable employment', 'You must certify weekly that you are still unemployed and actively job searching'].map(r => (
          <li key={r} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{r}</li>
        ))}
      </ul>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Weekly Benefit Amounts in Louisiana</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Louisiana weekly benefit amounts range from <strong>$10–$247</strong> per week, with a maximum of <strong>$247 per week</strong>. Benefits are calculated based on your earnings during the base period — typically the first four of the last five completed calendar quarters.
      </p>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        You can receive benefits for up to <strong>26 weeks</strong> in Louisiana. During periods of high statewide unemployment, extended benefits may be available.
      </p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How to Apply for Unemployment in Louisiana</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Apply online at the Louisiana Workforce Commission website or by phone. Processing typically takes 3 weeks.
      </p>
      <div style={{ marginBottom: 12 }}>
        <a href="https://www.laworks.net/unemployment/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2d6a4f', color: '#fff', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          Apply Online in Louisiana →
        </a>
      </div>
      <p style={{ fontSize: 14, color: '#8a8078', marginBottom: 32 }}>By phone: <strong>1-866-783-5567</strong></p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How to Appeal a Denial in Louisiana</h2>
      <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <strong style={{ color: '#92400e' }}>⏰ Louisiana Appeal Deadline: 15 calendar days from your denial notice</strong>
      </div>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Louisiana gives 15 calendar days to appeal a determination at the Louisiana Workforce Commission.
      </p>

      <CTABlock title="Generate Your Louisiana Appeal Letter" description="Our free tool creates a professional appeal letter tailored to your situation and Louisiana unemployment law." href="/" btnText="Create My Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer contested your claim or the situation is complex, legal help can significantly improve your odds." href="/#lawyer" btnText="Find Free Legal Help" variant="blue" />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
