import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'How to Apply for Unemployment Benefits — Complete Guide',
  description: 'Step-by-step guide to applying for unemployment benefits in any state. What you need, how to file, and what happens after you apply.',
  alternates: { canonical: 'https://www.benefitspath.org/how-to-apply-for-unemployment' },
}

export default function Page() {
  return (
    <SeoLayout>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: 16, color: '#1a1714' }}>
        How to Apply for Unemployment Benefits
      </h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Applying for unemployment benefits can feel overwhelming — especially right after losing your job. The process is different in every state, but the basic steps are the same. This guide walks you through exactly what to do, what you'll need, and what to expect after you apply.
      </p>

      <CTABlock title="Check If You Qualify First" description="Before you apply, find out your likelihood of qualifying based on your state and situation. Takes 2 minutes." href="/" btnText="Check My Eligibility" variant="green" />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>What You'll Need to Apply</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>Gather these before you start your application to avoid delays:</p>
      {[
        ['🪪', 'Personal identification', 'Your Social Security number and a government-issued photo ID'],
        ['💼', 'Employer information', 'Your former employer\'s full name, address, and phone number'],
        ['📅', 'Employment dates', 'Your exact start and end dates at each job in the past 18 months'],
        ['💵', 'Earnings information', 'Your wages and hours worked — often available on pay stubs or W-2s'],
        ['📝', 'Separation details', 'The reason your employment ended and any documentation you have'],
        ['🏦', 'Banking information', 'Routing and account numbers for direct deposit (recommended over mailed checks)'],
      ].map(([ico, title, desc]) => (
        <div key={title} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #e5e0d8' }}>
          <div style={{ fontSize: 22, flexShrink: 0 }}>{ico}</div>
          <div><strong style={{ fontSize: 15, color: '#1a1714', display: 'block', marginBottom: 2 }}>{title}</strong><span style={{ fontSize: 14, color: '#5a524a' }}>{desc}</span></div>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Step-by-Step Application Process</h2>
      {[
        ['Find your state\'s unemployment portal', 'Go to your state\'s official unemployment insurance website. Use our tool above to find the direct link for your state — it varies by state and changes periodically.'],
        ['Create an account or log in', 'Most states require you to create an online account before filing. Have your email address ready and create a secure password you\'ll remember.'],
        ['Complete the initial claim form', 'Answer questions about your employment history, separation reason, and personal information. Be honest and accurate — inconsistencies can delay or deny your claim.'],
        ['Submit supporting documents if requested', 'Some states ask for separation letters, pay stubs, or other documentation upfront. Upload them directly in the portal if prompted.'],
        ['Note your confirmation number', 'Save or screenshot your confirmation number. This is your proof that you applied and when.'],
        ['Set up your weekly certification', 'Understand when and how you need to certify each week that you\'re still unemployed and actively job searching. Missing a certification week means missing that week\'s payment.'],
      ].map(([title, desc], i) => (
        <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2d6a4f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div><h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, marginTop: 0, color: '#1a1714' }}>{title}</h3><p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.7, marginBottom: 0 }}>{desc}</p></div>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Tips to Avoid Common Mistakes</h2>
      <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
        {['Apply immediately — don\'t wait. Most states won\'t backpay before your application date', 'Be completely accurate about your separation reason — inconsistencies get flagged', 'Apply even if you\'re not sure you qualify — let the state determine eligibility', 'Set calendar reminders for your weekly certification dates', 'Keep records of every job application you make (you\'ll need to report them)', 'Don\'t quit a job without good cause — it will likely disqualify you'].map(t => (
          <li key={t} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{t}</li>
        ))}
      </ul>

      <CTABlock title="Was Your Claim Denied After Applying?" description="A denial isn't final. Generate a professional appeal letter for free and learn how to fight back." href="/" btnText="Generate Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Employment Attorney" description="If your employer is contesting your claim, legal help can make the difference. Free consultations available." href="/#lawyer" btnText="Get Free Legal Help" variant="blue" />

      <FAQSection faqs={[
        { q: 'Can I apply for unemployment online?', a: 'Yes — all 50 states have online application portals. Applying online is typically the fastest method and is available 24/7. Phone applications are also available in most states for those without internet access.' },
        { q: 'How soon after losing my job should I apply?', a: 'Apply as soon as possible — ideally within the first few days. Most states won\'t pay benefits for weeks before your application date, so every day you wait is potentially lost income.' },
        { q: 'What if I worked in multiple states?', a: 'File in the state where you worked, not where you live. If you worked in multiple states, you may be able to combine wages from different states to meet the minimum earnings requirement — called "combining wages." Contact your state unemployment office for guidance.' },
        { q: 'Do I have to report severance pay?', a: 'Yes, in most states. Severance can affect when your benefits begin. Some states require you to wait until your severance period ends before benefits start. Report it accurately on your application.' },
        { q: 'What happens if I find part-time work while collecting benefits?', a: 'Report all earnings when you certify each week. Most states have earnings disregards — meaning you can earn a small amount without losing all your benefits. Benefits are typically reduced proportionally based on your earnings.' },
      ]} />
    </SeoLayout>
  )
}
