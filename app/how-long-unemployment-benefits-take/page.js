import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'How Long Do Unemployment Benefits Take? | Timeline Guide',
  description: 'Find out how long it takes to receive unemployment benefits after applying. Learn about processing times, first payment timing, and what causes delays.',
  alternates: { canonical: 'https://www.benefitspath.org/how-long-unemployment-benefits-take' },
}

export default function Page() {
  return (
    <SeoLayout>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: 16, color: '#1a1714' }}>
        How Long Does It Take to Receive Unemployment Benefits?
      </h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        When you've lost your job, every day matters. Most people want to know exactly when their first unemployment check will arrive — and that answer depends on your state, your situation, and how quickly you act. Here's what to expect and how to speed things up.
      </p>

      <div style={{ background: '#d8f3dc', borderRadius: 14, padding: 24, marginBottom: 32, border: '1px solid #b7e4c7' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
          {[['1–3 days', 'To apply online'], ['2–3 weeks', 'Average to first payment'], ['1 week', 'Typical waiting period']].map(([val, lbl]) => (
            <div key={lbl}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#2d6a4f' }}>{val}</div><div style={{ fontSize: 13, color: '#5a524a', marginTop: 4 }}>{lbl}</div></div>
          ))}
        </div>
      </div>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Typical Unemployment Timeline</h2>
      {[
        ['Day 1', 'Apply', 'File your claim online as soon as possible after losing your job. Most state portals take 20–45 minutes to complete.'],
        ['Week 1', 'Waiting period', 'Most states have a mandatory one-week waiting period during which no benefits are paid. Some states have waived this requirement.'],
        ['Weeks 2–3', 'Processing', 'Your state reviews your claim, verifies your work history with your employer, and makes an eligibility determination.'],
        ['Week 3–4', 'First payment', 'If approved, your first payment typically arrives 3–4 weeks after your initial application — covering the weeks since your claim date.'],
        ['Ongoing', 'Weekly certification', 'You must certify each week that you\'re actively job searching. Benefits are paid weekly or bi-weekly depending on your state.'],
      ].map(([time, title, desc]) => (
        <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 20, padding: '16px 0', borderBottom: '1px solid #e5e0d8' }}>
          <div style={{ minWidth: 72, fontWeight: 600, fontSize: 13, color: '#2d6a4f', paddingTop: 2 }}>{time}</div>
          <div><strong style={{ fontSize: 15, color: '#1a1714', display: 'block', marginBottom: 4 }}>{title}</strong><span style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.7 }}>{desc}</span></div>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>What Causes Delays?</h2>
      <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
        {['Your employer contests the claim', 'Missing or incomplete information on your application', 'High claim volume at your state unemployment office', 'Issues verifying your wages or employment history', 'Additional review needed for your separation circumstances', 'Failure to certify each week on time'].map(d => (
          <li key={d} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{d}</li>
        ))}
      </ul>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        If your claim is taking longer than 3–4 weeks, contact your state unemployment office directly. Ask for a specific reason for the delay and whether any additional information is needed from you.
      </p>

      <CTABlock title="Check Your Eligibility Now" description="Find out if you qualify before you apply — takes 2 minutes and covers all 50 states." href="/" btnText="Check My Eligibility" variant="green" />
      <CTABlock title="Was Your Claim Denied?" description="Don't give up. Many denials are successfully appealed. Generate a professional appeal letter for free." href="/" btnText="Generate Appeal Letter" variant="green" />

      <FAQSection faqs={[
        { q: 'Do I get paid for the week I apply?', a: 'It depends on your state. Most states have a one-week waiting period (unpaid), meaning your first week of benefits is the week after you apply. A few states have eliminated the waiting period.' },
        { q: 'What if I haven\'t received payment after 4 weeks?', a: 'Contact your state unemployment office immediately. Log into your online account to check for any notices or requests for information. There may be an issue with your claim that requires your attention.' },
        { q: 'Can I get retroactive pay if my claim was delayed?', a: 'Generally yes — if your claim is approved, you should receive back pay for all eligible weeks dating back to your application date, even if approval took several weeks.' },
        { q: 'Does it matter when in the week I apply?', a: 'Apply as early in the week as possible. Some states have specific filing windows. Apply immediately after losing your job — you typically cannot receive benefits for weeks before your application date.' },
        { q: 'How long can I receive unemployment benefits?', a: 'Most states offer 26 weeks of benefits. Some states (like Florida and North Carolina) cap benefits at 12 weeks. Extended benefits may be available during periods of high unemployment.' },
      ]} />
    </SeoLayout>
  )
}
