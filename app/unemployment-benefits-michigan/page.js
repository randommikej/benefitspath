import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits in Michigan — 2026 Guide',
  description: 'Complete guide to unemployment benefits in Michigan. Eligibility requirements, weekly benefit amounts up to $362/week, how to apply, and how to appeal a denial.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-michigan' },
}

export default function Page() {
  const stats = [['$362', 'Max Weekly Benefit'], ['20 wks', 'Max Duration'], ['30 days', 'Appeal Deadline']]
  const faqs = [
    { q: 'How much will I receive in unemployment benefits in Michigan?', a: 'In Michigan, the maximum weekly benefit is $362 per week. Your actual amount depends on your earnings during the base period. Most claimants receive between $148–$362 per week.' },
    { q: 'How long can I collect unemployment in Michigan?', a: 'Michigan offers up to 20 weeks of unemployment benefits during normal economic conditions. Extended benefits may be available during periods of high statewide unemployment.' },
    { q: 'What is the appeal deadline in Michigan?', a: 'You have 30 calendar days from the date of your denial notice to file an appeal in Michigan. Missing this deadline typically means losing your right to appeal that specific determination.' },
    { q: 'Can I work part-time and still collect benefits in Michigan?', a: 'Yes, in most cases. Michigan allows you to earn some income while collecting benefits. Your benefits will be reduced proportionally based on your part-time earnings. Report all earnings when you certify each week.' },
    { q: 'What if my employer contests my Michigan unemployment claim?', a: 'Your employer has the right to contest your claim. If they do, your case will be reviewed and you may need to provide additional information. If denied after a contest, you have 30 days to appeal.' },
  ]

  return (
    <SeoLayout>
      <div className="sg-hero">
        <div className="sg-eyebrow">State Guide</div>
        <h1 className="sg-title">
          Unemployment Benefits in Michigan
        </h1>
        <p className="sg-lede">
          Everything you need to know about Michigan unemployment insurance — eligibility, benefit amounts, how to apply, and what to do if denied.
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

      <CTABlock title="Check Your Michigan Eligibility" description="Answer 5 quick questions and get a personalized eligibility result for Michigan — including your estimated benefit amount." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 className="prose-h2">Eligibility Requirements in Michigan</h2>
      <p className="prose-p">
        To qualify for unemployment benefits in Michigan, you generally must meet these requirements:
      </p>
      <ul className="prose-ul">
        {['You must have earned wages in at least two quarters. Total wages must be at least 1.5 times your highest quarter wages. Michigan caps benefits at 20 weeks', 'You must be unemployed through no fault of your own (layoff, reduction in force, or similar)', 'You must be actively seeking full-time work and available to accept suitable employment', 'You must certify weekly that you are still unemployed and actively job searching'].map(r => (
          <li key={r} className="prose-li">{r}</li>
        ))}
      </ul>

      <h2 className="prose-h2">Weekly Benefit Amounts in Michigan</h2>
      <p className="prose-p">
        Michigan weekly benefit amounts range from <strong>$148–$362</strong> per week, with a maximum of <strong>$362 per week</strong>. Benefits are calculated based on your earnings during the base period — typically the first four of the last five completed calendar quarters.
      </p>
      <p className="prose-p prose-end">
        You can receive benefits for up to <strong>20 weeks</strong> in Michigan. During periods of high statewide unemployment, extended benefits may be available.
      </p>

      <h2 className="prose-h2">How to Apply for Unemployment in Michigan</h2>
      <p className="prose-p">
        Apply online at the Michigan UIA website (michigan.gov/uia) or by phone.
      </p>
      <div style={{ marginBottom: 12 }}>
        <a href="https://www.michigan.gov/uia/" target="_blank" rel="noopener noreferrer" className="sg-btn">
          Apply Online in Michigan →
        </a>
      </div>
      <p className="sg-phone">By phone: <strong>1-866-500-0017</strong></p>

      <h2 className="prose-h2">How to Appeal a Denial in Michigan</h2>
      <div className="sg-deadline">
        <strong>Michigan Appeal Deadline: 30 calendar days from your denial notice</strong>
      </div>
      <p className="prose-p prose-end">
        Michigan gives 30 calendar days to file an appeal through the UIA online system or by mail.
      </p>

      <CTABlock title="Generate Your Michigan Appeal Letter" description="Our free tool creates a professional appeal letter tailored to your situation and Michigan unemployment law." href="/" btnText="Create My Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer contested your claim or the situation is complex, legal help can significantly improve your odds." href="/legal-help/michigan" btnText="Find Free Legal Help" variant="blue" />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
