import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits in Minnesota — 2026 Guide',
  description: 'Complete guide to unemployment benefits in Minnesota. Eligibility requirements, weekly benefit amounts up to $857/week, how to apply, and how to appeal a denial.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-minnesota' },
}

export default function Page() {
  const stats = [['$857', 'Max Weekly Benefit'], ['26 wks', 'Max Duration'], ['20 days', 'Appeal Deadline']]
  const faqs = [
    { q: 'How much will I receive in unemployment benefits in Minnesota?', a: 'In Minnesota, the maximum weekly benefit is $857 per week. Your actual amount depends on your earnings during the base period. Most claimants receive between $100–$857 per week.' },
    { q: 'How long can I collect unemployment in Minnesota?', a: 'Minnesota offers up to 26 weeks of unemployment benefits during normal economic conditions. Extended benefits may be available during periods of high statewide unemployment.' },
    { q: 'What is the appeal deadline in Minnesota?', a: 'You have 20 calendar days from the date of your denial notice to file an appeal in Minnesota. Missing this deadline typically means losing your right to appeal that specific determination.' },
    { q: 'Can I work part-time and still collect benefits in Minnesota?', a: 'Yes, in most cases. Minnesota allows you to earn some income while collecting benefits. Your benefits will be reduced proportionally based on your part-time earnings. Report all earnings when you certify each week.' },
    { q: 'What if my employer contests my Minnesota unemployment claim?', a: 'Your employer has the right to contest your claim. If they do, your case will be reviewed and you may need to provide additional information. If denied after a contest, you have 20 days to appeal.' },
  ]

  return (
    <SeoLayout>
      <div style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1a4731 100%)', color: '#fff', borderRadius: 16, padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>State Guide</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 5vw, 40px)', lineHeight: 1.15, marginBottom: 12, color: '#fff' }}>
          Unemployment Benefits in Minnesota
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,.85)', lineHeight: 1.6, marginBottom: 0 }}>
          Everything you need to know about Minnesota unemployment insurance — eligibility, benefit amounts, how to apply, and what to do if denied.
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

      <CTABlock title="Check Your Minnesota Eligibility" description="Answer 5 quick questions and get a personalized eligibility result for Minnesota — including your estimated benefit amount." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Eligibility Requirements in Minnesota</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        To qualify for unemployment benefits in Minnesota, you generally must meet these requirements:
      </p>
      <ul style={{ paddingLeft: 22, marginBottom: 24 }}>
        {['You must have earned wages in at least two quarters with total wages of at least $2,400, including at least $1,000 outside your highest quarter', 'You must be unemployed through no fault of your own (layoff, reduction in force, or similar)', 'You must be actively seeking full-time work and available to accept suitable employment', 'You must certify weekly that you are still unemployed and actively job searching'].map(r => (
          <li key={r} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{r}</li>
        ))}
      </ul>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Weekly Benefit Amounts in Minnesota</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Minnesota weekly benefit amounts range from <strong>$100–$857</strong> per week, with a maximum of <strong>$857 per week</strong>. Benefits are calculated based on your earnings during the base period — typically the first four of the last five completed calendar quarters.
      </p>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        You can receive benefits for up to <strong>26 weeks</strong> in Minnesota. During periods of high statewide unemployment, extended benefits may be available.
      </p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How to Apply for Unemployment in Minnesota</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Apply online at the Minnesota UI website (uimn.org) or by phone. Minnesota has a user-friendly online system.
      </p>
      <div style={{ marginBottom: 12 }}>
        <a href="https://www.uimn.org/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2d6a4f', color: '#fff', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          Apply Online in Minnesota →
        </a>
      </div>
      <p style={{ fontSize: 14, color: '#8a8078', marginBottom: 32 }}>By phone: <strong>1-651-296-3644</strong></p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How to Appeal a Denial in Minnesota</h2>
      <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <strong style={{ color: '#92400e' }}>⏰ Minnesota Appeal Deadline: 20 calendar days from your denial notice</strong>
      </div>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Minnesota allows 20 calendar days from the date of determination to file an appeal.
      </p>

      <CTABlock title="Generate Your Minnesota Appeal Letter" description="Our free tool creates a professional appeal letter tailored to your situation and Minnesota unemployment law." href="/" btnText="Create My Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer contested your claim or the situation is complex, legal help can significantly improve your odds." href="/#lawyer" btnText="Find Free Legal Help" variant="blue" />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
