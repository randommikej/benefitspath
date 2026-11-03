import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits in Colorado — 2026 Guide',
  description: 'Complete guide to unemployment benefits in Colorado. Eligibility requirements, weekly benefit amounts up to $781/week, how to apply, and how to appeal a denial.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-colorado' },
}

export default function Page() {
  const stats = [['$781', 'Max Weekly Benefit'], ['26 wks', 'Max Duration'], ['20 days', 'Appeal Deadline']]
  const faqs = [
    { q: 'How much will I receive in unemployment benefits in Colorado?', a: 'In Colorado, the maximum weekly benefit is $781 per week. Your actual amount depends on your earnings during the base period. Most claimants receive between $25–$781 per week.' },
    { q: 'How long can I collect unemployment in Colorado?', a: 'Colorado offers up to 26 weeks of unemployment benefits during normal economic conditions. Extended benefits may be available during periods of high statewide unemployment.' },
    { q: 'What is the appeal deadline in Colorado?', a: 'You have 20 calendar days from the date of your denial notice to file an appeal in Colorado. Missing this deadline typically means losing your right to appeal that specific determination.' },
    { q: 'Can I work part-time and still collect benefits in Colorado?', a: 'Yes, in most cases. Colorado allows you to earn some income while collecting benefits. Your benefits will be reduced proportionally based on your part-time earnings. Report all earnings when you certify each week.' },
    { q: 'What if my employer contests my Colorado unemployment claim?', a: 'Your employer has the right to contest your claim. If they do, your case will be reviewed and you may need to provide additional information. If denied after a contest, you have 20 days to appeal.' },
  ]

  return (
    <SeoLayout>
      <div className="sg-hero">
        <div className="sg-eyebrow">State Guide</div>
        <h1 className="sg-title">
          Unemployment Benefits in Colorado
        </h1>
        <p className="sg-lede">
          Everything you need to know about Colorado unemployment insurance — eligibility, benefit amounts, how to apply, and what to do if denied.
        </p>
      </div>

      <div className="sg-stats">
        {stats.map(([val, lbl]) => (
          <div key={lbl} className="sg-stat">
            <div className="sg-stat-val">{val}</div>
            <div className="sg-stat-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <CTABlock title="Check Your Colorado Eligibility" description="Answer 5 quick questions and get a personalized eligibility result for Colorado — including your estimated benefit amount." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 className="prose-h2">Eligibility Requirements in Colorado</h2>
      <p className="prose-p">
        To qualify for unemployment benefits in Colorado, you generally must meet these requirements:
      </p>
      <ul className="prose-ul">
        {['You must have earned at least $2,500 in wages during the base period', 'You must be unemployed through no fault of your own (layoff, reduction in force, or similar)', 'You must be actively seeking full-time work and available to accept suitable employment', 'You must certify weekly that you are still unemployed and actively job searching'].map(r => (
          <li key={r} className="prose-li">{r}</li>
        ))}
      </ul>

      <h2 className="prose-h2">Weekly Benefit Amounts in Colorado</h2>
      <p className="prose-p">
        Colorado weekly benefit amounts range from <strong>$25–$781</strong> per week, with a maximum of <strong>$781 per week</strong>. Benefits are calculated based on your earnings during the base period — typically the first four of the last five completed calendar quarters.
      </p>
      <p className="prose-p prose-end">
        You can receive benefits for up to <strong>26 weeks</strong> in Colorado. During periods of high statewide unemployment, extended benefits may be available.
      </p>

      <h2 className="prose-h2">How to Apply for Unemployment in Colorado</h2>
      <p className="prose-p">
        Apply online at MyUI+ (myui.coworkforce.com) or by phone. Colorado has a modern, user-friendly claims system.
      </p>
      <div style={{ marginBottom: 12 }}>
        <a href="https://cdle.colorado.gov/unemployment" target="_blank" rel="noopener noreferrer" className="sg-btn">
          Apply Online in Colorado →
        </a>
      </div>
      <p className="sg-phone">By phone: <strong>1-303-318-9000</strong></p>

      <h2 className="prose-h2">How to Appeal a Denial in Colorado</h2>
      <div className="sg-deadline">
        <strong>Colorado Appeal Deadline: 20 calendar days from your denial notice</strong>
      </div>
      <p className="prose-p prose-end">
        Colorado gives 20 calendar days from the mailing date to file an appeal at the Division of Unemployment Insurance.
      </p>

      <CTABlock title="Generate Your Colorado Appeal Letter" description="Our free tool creates a professional appeal letter tailored to your situation and Colorado unemployment law." href="/" btnText="Create My Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer contested your claim or the situation is complex, legal help can significantly improve your odds." href="/legal-help/colorado" btnText="Find Free Legal Help" variant="blue" />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
