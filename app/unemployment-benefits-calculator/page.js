import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Benefits Calculator — Estimate Your Weekly Pay',
  description: 'Estimate how much you could receive in unemployment benefits. See weekly benefit amounts and duration for all 50 states.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-benefits-calculator' },
}

export default function Page() {
  return (
    <SeoLayout>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: 16, color: '#1a1714' }}>
        Unemployment Benefits Calculator
      </h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Wondering how much you'll receive in unemployment benefits? Every state calculates benefits differently — using your past wages, your state's formula, and your work history. This guide explains how the calculation works and what you can expect in your state.
      </p>

      <CTABlock title="Check Your Eligibility & Estimated Benefits" description="Answer 5 quick questions and see your state's maximum weekly benefit amount and how long you can receive it." href="/" btnText="See My Estimated Benefits" variant="green" />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>How Unemployment Benefits Are Calculated</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Most states use a formula based on your highest-earning quarter (or multiple quarters) during your "base period" — typically the first four of the last five completed calendar quarters before you filed your claim.
      </p>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Your <strong>Weekly Benefit Amount (WBA)</strong> is usually calculated as a percentage of your average weekly wage during the base period — typically between 40% and 60%. This amount is then capped at your state's maximum weekly benefit.
      </p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Example Calculation</h2>
      <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: 24, marginBottom: 32 }}>
        <p style={{ fontSize: 15, color: '#5a524a', marginBottom: 12 }}>Say you earned $60,000/year ($1,154/week average). In a state that pays 50% of your average weekly wage:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['Average weekly wage', '$1,154'], ['State formula', '× 50%'], ['Calculated WBA', '$577'], ['State cap (if lower)', 'Applies here']].map(([l, v]) => (
            <div key={l} style={{ background: '#f7f5f0', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#8a8078', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#2d6a4f' }}>{v}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: '#8a8078', marginTop: 12, marginBottom: 0 }}>If your state's maximum weekly benefit is $500, your actual WBA would be $500, not $577.</p>
      </div>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Weekly Benefit Maximums by State</h2>
      <p style={{ fontSize: 15, color: '#5a524a', marginBottom: 16 }}>Weekly benefit maximums vary widely across states. Here are some examples:</p>
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
          <thead>
            <tr style={{ background: '#f0ede6' }}>
              {['State', 'Max Weekly Benefit', 'Max Duration', 'State Portal'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: 13, color: '#5a524a', borderBottom: '2px solid #e5e0d8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Washington', '$1,079', '26 weeks', '/unemployment-benefits-washington'],
              ['Massachusetts', '$1,033', '30 weeks', '/unemployment-benefits-massachusetts'],
              ['Minnesota', '$857', '26 weeks', '/unemployment-benefits-minnesota'],
              ['New Jersey', '$830', '26 weeks', '/unemployment-benefits-new-jersey'],
              ['Oregon', '$783', '26 weeks', '/unemployment-benefits-oregon'],
              ['Colorado', '$781', '26 weeks', '/unemployment-benefits-colorado'],
              ['Connecticut', '$760', '26 weeks', '/unemployment-benefits-connecticut'],
              ['Illinois', '$742', '26 weeks', '/unemployment-benefits-illinois'],
              ['Texas', '$563', '26 weeks', '/unemployment-benefits-texas'],
              ['California', '$450', '26 weeks', '/unemployment-benefits-california'],
              ['Florida', '$275', '12 weeks', '/unemployment-benefits-florida'],
              ['Mississippi', '$235', '13 weeks', '/unemployment-benefits-mississippi'],
            ].map(([state, wba, dur, href]) => (
              <tr key={state} style={{ borderBottom: '1px solid #e5e0d8' }}>
                <td style={{ padding: '10px 14px', fontWeight: 500 }}>{state}</td>
                <td style={{ padding: '10px 14px', color: '#2d6a4f', fontWeight: 600 }}>{wba}</td>
                <td style={{ padding: '10px 14px', color: '#5a524a' }}>{dur}</td>
                <td style={{ padding: '10px 14px' }}><a href={href} style={{ color: '#1e40af', fontSize: 13 }}>Details →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>What Reduces Your Benefit Amount?</h2>
      <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
        {['Part-time earnings while on unemployment (benefits are reduced proportionally)', 'Severance pay (may delay when benefits start)', 'Pension payments from a former employer', 'Vacation pay being paid out', 'Working reduced hours rather than full separation'].map(i => (
          <li key={i} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{i}</li>
        ))}
      </ul>

      <CTABlock title="Ready to Check Your State's Benefits?" description="Use our free eligibility checker to see your state's exact maximum weekly benefit and how long you can receive it." href="/" btnText="Check My State's Benefits" variant="green" />
      <CTABlock title="Was Your Claim Denied?" description="Don't give up — many denials are overturned on appeal. Generate your appeal letter for free." href="/" btnText="Generate Appeal Letter" variant="green" />

      <FAQSection faqs={[
        { q: 'How is my base period determined?', a: 'Your base period is typically the first four of the last five completed calendar quarters before you filed your claim. If you don\'t qualify using this standard base period, some states offer an "alternative base period" using more recent wages.' },
        { q: 'Is unemployment taxable income?', a: 'Yes. Unemployment benefits are considered taxable income by the federal government and most states. You can choose to have federal income tax (10%) withheld from your payments, which can prevent a surprise tax bill.' },
        { q: 'Can I get more money if I have dependents?', a: 'Some states (like Massachusetts and Connecticut) offer dependency allowances that increase your weekly benefit if you have dependent children. Check your state\'s specific rules.' },
        { q: 'What if I worked part-time? Can I still collect?', a: 'Yes, in most states. Part-time workers can qualify as long as they meet the minimum wage requirements during the base period and are available for full-time work.' },
        { q: 'Can I receive benefits if I\'m self-employed?', a: 'Traditional unemployment insurance is only for employees. However, some states have created programs for self-employed individuals. Pandemic-era PUA programs have ended, but check your state\'s current options.' },
      ]} />
    </SeoLayout>
  )
}
