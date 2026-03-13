import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'How to Appeal an Unemployment Denial | Step-by-Step Guide',
  description: 'Learn how to appeal a denied unemployment claim. Step-by-step guide to writing your appeal, meeting deadlines, and winning your case. Free appeal letter generator included.',
  keywords: ['appeal unemployment denial', 'unemployment appeal process', 'how to appeal unemployment'],
  openGraph: { title: 'How to Appeal an Unemployment Denial', description: 'Step-by-step guide to appealing a denied unemployment claim. Free tools included.' },
  alternates: { canonical: 'https://www.benefitspath.org/how-to-appeal-unemployment-denial' },
}

export default function Page() {
  return (
    <SeoLayout>
      <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: '12px 18px', marginBottom: 24, fontSize: 14, color: '#92400e' }}>
        ⏰ <strong>Act fast:</strong> Most states give you only 10–30 days to appeal a denial. Don't wait.
      </div>

      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: 16, color: '#1a1714' }}>
        How to Appeal an Unemployment Denial
      </h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Being denied unemployment benefits can feel devastating — especially when you need that income. The good news: denial is not the final word. Millions of unemployment claims are overturned every year through the appeals process. This guide walks you through exactly how to appeal an unemployment denial, step by step.
      </p>

      <CTABlock
        title="Generate Your Appeal Letter in Minutes"
        description="Don't start from scratch. Our free tool creates a professional, state-specific appeal letter based on your situation."
        href="/"
        btnText="Create My Appeal Letter"
        variant="green"
      />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Why Unemployment Claims Get Denied</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        Before you appeal, it helps to understand why your claim was denied. Common reasons include:
      </p>
      <ul style={{ paddingLeft: 22, marginBottom: 24 }}>
        {['The state believes you quit voluntarily (even if you didn\'t)', 'Your employer contested the claim', 'You were classified as an independent contractor', 'You didn\'t meet the minimum earnings requirement', 'Missing or incorrect information on your application', 'You were fired and the state classified it as misconduct'].map(r => (
          <li key={r} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{r}</li>
        ))}
      </ul>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        Many of these reasons can be successfully challenged — especially if your employer misrepresented facts or the state made a procedural error.
      </p>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Step-by-Step: How to Appeal</h2>
      {[
        ['1', 'Read your denial letter carefully', 'Your denial notice explains the exact reason your claim was rejected. This is the foundation of your appeal. Look for the specific section of law cited and the factual basis for the denial.'],
        ['2', 'Note your appeal deadline', 'Every state has a strict deadline — typically 10 to 30 days from the denial date. Missing this window usually means losing your right to appeal, so act immediately.'],
        ['3', 'Write your appeal letter', 'Your appeal should be professional, factual, and directly address the reason for denial. State your name, claim number, denial date, and why you believe the decision was wrong. Include specific facts and any evidence you have.'],
        ['4', 'Gather supporting documents', 'Collect any evidence that supports your case: termination letters, emails from your employer, pay stubs, performance reviews, witness statements, or medical records if relevant.'],
        ['5', 'Submit your appeal', 'File your appeal through your state\'s unemployment portal, by mail, or in person at your local unemployment office. Keep copies of everything and get confirmation of receipt.'],
        ['6', 'Prepare for your hearing', 'Most appeals result in a phone or in-person hearing. You\'ll have the chance to present your case. Be organized, professional, and stick to the facts.'],
      ].map(([num, title, desc]) => (
        <div key={num} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2d6a4f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 2 }}>{num}</div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, marginTop: 0, color: '#1a1714' }}>{title}</h3>
            <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.7, marginBottom: 0 }}>{desc}</p>
          </div>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>What to Include in Your Appeal Letter</h2>
      <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
        {['Your full name, address, and contact information', 'Your claim number and the date of your denial', 'A clear statement that you are appealing the decision', 'The specific reason(s) you believe the denial was wrong', 'A factual account of how your employment ended', 'A list of evidence you are attaching', 'A request for a hearing'].map(r => (
          <li key={r} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{r}</li>
        ))}
      </ul>

      <CTABlock
        title="Need Help Writing Your Appeal?"
        description="Our free appeal letter generator creates a professional, formatted letter in minutes — tailored to your state and your specific situation."
        href="/"
        btnText="Generate My Appeal Letter"
        variant="green"
      />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>When to Hire an Unemployment Attorney</h2>
      <p style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 16 }}>
        You don't always need a lawyer to appeal, but in some situations, legal help significantly improves your odds:
      </p>
      <ul style={{ paddingLeft: 22, marginBottom: 24 }}>
        {['Your employer has legal representation at the hearing', 'You believe you were fired illegally (discrimination, retaliation)', 'The case involves complex facts or contradictory evidence', 'You\'ve already lost an initial appeal', 'There are significant benefits at stake'].map(r => (
          <li key={r} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{r}</li>
        ))}
      </ul>

      <CTABlock
        title="Talk to an Unemployment Attorney"
        description="Many employment lawyers offer free consultations and work on contingency — meaning you pay nothing unless they win."
        href="/#lawyer"
        btnText="Request Free Consultation"
        variant="blue"
      />

      <FAQSection faqs={[
        { q: 'How long do I have to appeal an unemployment denial?', a: 'It varies by state — typically between 10 and 30 days from the date on your denial notice. Some states like Delaware give only 10 days, while others like California give 30. Check your denial letter immediately for your specific deadline.' },
        { q: 'What are my chances of winning an unemployment appeal?', a: 'Nationally, roughly 40% of unemployment appeals are successful. Your odds improve significantly if you were laid off rather than fired for misconduct, if your employer misrepresented facts, or if you have documentation supporting your case.' },
        { q: 'Do I need a lawyer to appeal?', a: 'No — many people successfully appeal without legal representation. However, if your employer has a lawyer at the hearing, or if the case is complex, having an attorney can significantly improve your odds.' },
        { q: 'Can I still receive benefits while my appeal is pending?', a: 'In most states, benefits are suspended during the appeal period. If you win your appeal, you typically receive back pay for the weeks you were eligible during the appeal period.' },
        { q: 'What happens at an unemployment appeal hearing?', a: 'A hearing officer or administrative law judge will listen to both sides. You can present evidence, testify, and call witnesses. The employer may also participate. It\'s formal but not as intimidating as a court proceeding — many hearings are conducted by phone.' },
      ]} />
    </SeoLayout>
  )
}
