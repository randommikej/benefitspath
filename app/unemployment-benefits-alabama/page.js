import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits in Alabama — 2026 Guide',
  description: 'Complete guide to unemployment benefits in Alabama. Eligibility requirements, weekly benefit amounts up to $275/week, how to apply, and how to appeal a denial.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-alabama' },
}

export default function Page() {
  const stats = [['$275', 'Max Weekly Benefit'], ['14 wks', 'Max Duration'], ['15 days', 'Appeal Deadline']]
  const faqs = [
    { q: 'How much will I receive in unemployment benefits in Alabama?', a: 'In Alabama, the maximum weekly benefit is $275 per week. Your actual amount depends on your earnings during the base period. Most claimants receive between $45–$275 per week.' },
    { q: 'How long can I collect unemployment in Alabama?', a: 'Alabama offers up to 14 weeks of unemployment benefits during normal economic conditions. Extended benefits may be available during periods of high statewide unemployment.' },
    { q: 'What is the appeal deadline in Alabama?', a: 'You have 15 calendar days from the date of your denial notice to file an appeal in Alabama. Missing this deadline typically means losing your right to appeal that specific determination.' },
    { q: 'Can I work part-time and still collect benefits in Alabama?', a: 'Yes, in most cases. Alabama allows you to earn some income while collecting benefits. Your benefits will be reduced proportionally based on your part-time earnings. Report all earnings when you certify each week.' },
    { q: 'What if my employer contests my Alabama unemployment claim?', a: 'Your employer has the right to contest your claim. If they do, your case will be reviewed and you may need to provide additional information. If denied after a contest, you have 15 days to appeal.' },
  ]

  return (
    <SeoLayout>
      <div className="sg-hero">
        <div className="sg-eyebrow">State Guide</div>
        <h1 className="sg-title">
          Unemployment Benefits in Alabama
        </h1>
        <p className="sg-lede">
          Everything you need to know about Alabama unemployment insurance — eligibility, benefit amounts, how to apply, and what to do if denied.
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

      <CTABlock title="Check Your Alabama Eligibility" description="Answer 5 quick questions and get a personalized eligibility result for Alabama — including your estimated benefit amount." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 className="prose-h2">Eligibility Requirements in Alabama</h2>
      <p className="prose-p">
        To qualify for unemployment benefits in Alabama, you generally must meet these requirements:
      </p>
      <ul className="prose-ul">
        {['You must have earned wages in at least two quarters of your base period', 'You must be unemployed through no fault of your own (layoff, reduction in force, or similar)', 'You must be actively seeking full-time work and available to accept suitable employment', 'You must certify weekly that you are still unemployed and actively job searching'].map(r => (
          <li key={r} className="prose-li">{r}</li>
        ))}
      </ul>

      <h2 className="prose-h2">Weekly Benefit Amounts in Alabama</h2>
      <p className="prose-p">
        Alabama weekly benefit amounts range from <strong>$45–$275</strong> per week, with a maximum of <strong>$275 per week</strong>. Benefits are calculated based on your earnings during the base period — typically the first four of the last five completed calendar quarters.
      </p>
      <p className="prose-p prose-end">
        You can receive benefits for up to <strong>14 weeks</strong> in Alabama. During periods of high statewide unemployment, extended benefits may be available.
      </p>

      <h2 className="prose-h2">How to Apply for Unemployment in Alabama</h2>
      <p className="prose-p">
        Apply online at the Alabama Department of Labor website or call the claims line. Claims take 3-4 weeks to process.
      </p>
      <div style={{ marginBottom: 12 }}>
        <a href="https://labor.alabama.gov/UC/" target="_blank" rel="noopener noreferrer" className="sg-btn">
          Apply Online in Alabama →
        </a>
      </div>
      <p className="sg-phone">By phone: <strong>1-800-361-4524</strong></p>

      <h2 className="prose-h2">How to Appeal a Denial in Alabama</h2>
      <div className="sg-deadline">
        <strong>Alabama Appeal Deadline: 15 calendar days from your denial notice</strong>
      </div>
      <p className="prose-p prose-end">
        Alabama allows 15 days to appeal. File online or by mail to the Alabama Department of Labor Appeals Division.
      </p>

      <CTABlock title="Generate Your Alabama Appeal Letter" description="Our free tool creates a professional appeal letter tailored to your situation and Alabama unemployment law." href="/" btnText="Create My Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer contested your claim or the situation is complex, legal help can significantly improve your odds." href="/legal-help/alabama" btnText="Find Free Legal Help" variant="blue" />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
