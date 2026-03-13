import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Why Unemployment Claims Get Denied — Top Reasons & Fixes',
  description: 'Discover the most common reasons unemployment claims are denied and what you can do about it. Learn how to avoid denials and appeal successfully.',
  alternates: { canonical: 'https://www.benefitspath.org/reasons-unemployment-claims-get-denied' },
}

export default function Page() {
  const reasons = [
    { icon: '👋', title: 'Voluntary Quit', desc: 'If the state believes you quit without good cause, your claim will be denied. "Good cause" generally means unsafe working conditions, harassment, a significant reduction in pay or hours, or a family/medical emergency. Simply being unhappy with your job usually doesn\'t qualify.' },
    { icon: '⚠️', title: 'Fired for Misconduct', desc: 'Being fired doesn\'t automatically disqualify you — but being fired for misconduct does. States define misconduct as intentional or repeated violations of workplace policy. Simple mistakes or poor performance usually don\'t rise to the level of misconduct.' },
    { icon: '👷', title: 'Independent Contractor Classification', desc: 'If your employer classified you as an independent contractor (1099) rather than an employee (W-2), you may not qualify for traditional unemployment benefits. However, many misclassified workers can still successfully appeal.' },
    { icon: '📉', title: 'Insufficient Work History', desc: 'Most states require you to have earned a minimum amount in wages over a "base period" (typically the 12–18 months before you lost your job). If you worked only briefly or earned too little, you may not qualify.' },
    { icon: '📋', title: 'Employer Contests the Claim', desc: 'When you file, your former employer is notified and can contest your claim. If their version of events differs from yours, the state may side with them — especially if they provide documentation and you don\'t.' },
    { icon: '🔍', title: 'Failure to Meet Job Search Requirements', desc: 'Once approved, you must actively search for work each week and document your efforts. If you fail to certify or don\'t meet job search requirements, your benefits can be denied or suspended.' },
  ]

  return (
    <SeoLayout>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: 16, color: '#1a1714' }}>
        Top Reasons Unemployment Claims Get Denied
      </h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Unemployment claims are denied far more often than many people realize — and the reasons aren't always obvious. Understanding why claims get denied is the first step to protecting yours, or successfully appealing a decision. Here are the most common reasons, and what you can do about each one.
      </p>

      <CTABlock title="Check Your Eligibility First" description="Answer 5 quick questions and get a personalized eligibility assessment for your state." href="/" btnText="Check My Eligibility" variant="green" />

      {reasons.map(r => (
        <div key={r.title} style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, marginBottom: 10, marginTop: 0 }}>{r.title}</h2>
          <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.75, marginBottom: 0 }}>{r.desc}</p>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>What to Do If Your Claim Is Denied</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>A denial is not the end. Here's what to do immediately:</p>
      <ol style={{ paddingLeft: 22, marginBottom: 32 }}>
        {['Read your denial notice carefully — understand the exact reason given', 'Note your appeal deadline (usually 10–30 days from the denial date)', 'Gather any documentation that contradicts the reason for denial', 'Write a clear, factual appeal letter addressing the denial reason', 'Submit your appeal before the deadline and keep copies of everything', 'Prepare for your hearing by organizing your evidence and your account of events'].map(s => (
          <li key={s} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 8 }}>{s}</li>
        ))}
      </ol>

      <CTABlock title="Appeal Your Denial — Generate a Letter" description="Our free tool creates a professional appeal letter tailored to your situation and state." href="/" btnText="Generate Appeal Letter" variant="green" />
      <CTABlock title="Talk to an Unemployment Attorney" description="If your employer contested your claim or the situation is complex, legal help can make the difference." href="/#lawyer" btnText="Find a Free Consultation" variant="blue" />

      <FAQSection faqs={[
        { q: 'Can I appeal if I quit my job?', a: 'Yes — if you quit for "good cause," which varies by state but generally includes unsafe working conditions, harassment, a major reduction in pay or hours, or compelling personal circumstances. File the appeal and explain your reasons clearly.' },
        { q: 'What if my employer lied on the claim?', a: 'If you believe your employer provided false information, your appeal is the place to correct the record. Provide documentation — emails, texts, witness statements — that contradicts their account. The hearing officer will weigh the evidence from both sides.' },
        { q: 'How long does the appeal process take?', a: 'Most states schedule appeal hearings within 3–6 weeks of filing. The entire process from denial to decision typically takes 4–8 weeks, though it varies significantly by state and caseload.' },
        { q: 'Does being fired always mean I\'m denied?', a: 'No. Being fired for reasons other than misconduct — such as poor fit, performance issues, or layoffs framed as terminations — often still qualifies for benefits. The key is whether the separation was truly your fault.' },
        { q: 'What if I miss the appeal deadline?', a: 'Missing the deadline usually ends your right to appeal that denial. However, you can sometimes file a new claim if you become unemployed again, and some states allow late appeals in exceptional circumstances like illness or incarceration.' },
      ]} />
    </SeoLayout>
  )
}
