import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'Unemployment Appeal Letter Example — Free Template & Guide',
  description: 'See a real unemployment appeal letter example. Learn what to write, how to format it, and generate your own personalized appeal letter for free.',
  alternates: { canonical: 'https://www.benefitspath.org/unemployment-appeal-letter-example' },
}

export default function Page() {
  return (
    <SeoLayout>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, marginBottom: 16, color: '#1a1714' }}>
        Unemployment Appeal Letter Example
      </h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.75, marginBottom: 32 }}>
        A well-written appeal letter is one of the most important things you can do to win your unemployment appeal. Below you'll find a real-world example of an unemployment appeal letter, broken down section by section, along with a free tool to generate your own personalized version.
      </p>

      <CTABlock title="Skip the Template — Generate Your Letter" description="Enter your details and get a complete, personalized appeal letter for your state in under 2 minutes. Free, always." href="/" btnText="Generate My Letter Now" variant="green" />

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Sample Unemployment Appeal Letter</h2>
      <p style={{ fontSize: 15, color: '#5a524a', marginBottom: 16 }}>Below is an example of a well-structured unemployment appeal letter for someone who was laid off:</p>

      <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: 28, fontFamily: 'Courier New, monospace', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: '#1a1714', marginBottom: 32, overflowX: 'auto' }}>{`Jane Smith
123 Main Street
Anytown, CA 90210
(555) 000-1234
jane.smith@email.com

March 1, 2025

Appeals Office
California Employment Development Department
[EDD address from your denial notice]

RE: Appeal of Unemployment Benefits Denial
Claimant: Jane Smith
Claim Number: CA-2025-XXXXXXX
Date of Denial: February 15, 2025

Dear Appeals Officer,

I am writing to formally appeal the denial of my unemployment 
insurance benefits dated February 15, 2025. I believe this 
determination was made in error, and I respectfully request a 
hearing to present the facts of my case.

BACKGROUND

I was employed as a Marketing Coordinator at Acme Corporation 
from January 10, 2022 through January 31, 2025 — a period of 
three years. My separation from employment was the result of a 
company-wide layoff affecting 40% of the workforce, including 
my entire department. I did not resign, nor was I terminated 
for any performance or conduct issue.

MY EXPLANATION

I received written notice of my layoff on January 15, 2025, 
effective January 31, 2025. The notice stated that my position 
was eliminated due to budget restructuring. I have attached a 
copy of this notice. My separation was entirely beyond my 
control and occurred through no fault of my own.

LEGAL BASIS

Under California Unemployment Insurance Code Section 1256, 
individuals who lose employment through no fault of their own 
are entitled to unemployment benefits. My layoff clearly 
qualifies as an involuntary separation.

REQUEST

I respectfully request:
1. A full review of my claim
2. An opportunity to present evidence at a formal hearing
3. Approval of all benefits owed from the date of my claim

I am available for a hearing at the earliest convenience of 
the Appeals Office.

Respectfully,

Jane Smith
[Signature]

Attachments:
- Layoff notice dated January 15, 2025
- Final pay stub
`}</div>

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>What Makes This Letter Effective</h2>
      {[
        ['Clear identification', 'The letter immediately establishes who is writing, what claim is being appealed, and when the denial occurred.'],
        ['Factual, unemotional tone', 'It sticks to verifiable facts rather than emotional arguments. Hearing officers respond better to evidence than to anger or desperation.'],
        ['Direct response to the denial reason', 'It addresses the core question of fault — establishing that the separation was involuntary.'],
        ['Legal reference', 'Citing the relevant section of state unemployment law signals that the claimant understands their rights.'],
        ['Clear ask', 'The letter ends with a specific request: a hearing and approval of benefits. Don\'t leave the reader wondering what you want.'],
      ].map(([t, d]) => (
        <div key={t} style={{ display: 'flex', gap: 14, marginBottom: 16, padding: '14px 0', borderBottom: '1px solid #e5e0d8' }}>
          <div style={{ color: '#2d6a4f', marginTop: 2 }}>✓</div>
          <div><strong style={{ fontSize: 15, color: '#1a1714' }}>{t}:</strong> <span style={{ fontSize: 15, color: '#5a524a' }}>{d}</span></div>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, marginBottom: 16, marginTop: 40 }}>Common Mistakes to Avoid</h2>
      <ul style={{ paddingLeft: 22, marginBottom: 32 }}>
        {['Missing the appeal deadline (this automatically loses your appeal)', 'Being vague — include specific dates, names, and facts', 'Focusing on emotion rather than facts', 'Forgetting to attach supporting documents', 'Not requesting a hearing explicitly', 'Sending the appeal to the wrong address or department'].map(m => (
          <li key={m} style={{ fontSize: 16, color: '#5a524a', lineHeight: 1.75, marginBottom: 6 }}>{m}</li>
        ))}
      </ul>

      <CTABlock title="Generate Your Personalized Appeal Letter" description="Our tool creates a complete appeal letter with your name, state, claim number, and situation. Takes 2 minutes." href="/" btnText="Create My Letter" variant="green" />
      <CTABlock title="Get Legal Help" description="If your case is complex or your employer has a lawyer, consider a free consultation with an employment attorney." href="/#lawyer" btnText="Talk to an Attorney Free" variant="blue" />

      <FAQSection faqs={[
        { q: 'How long should an unemployment appeal letter be?', a: 'One to two pages is ideal. Long enough to cover all the key facts and make your case clearly, but concise enough that the hearing officer can quickly understand your situation. Quality matters more than length.' },
        { q: 'Should I send my appeal letter by certified mail?', a: 'Yes, if submitting by mail. Certified mail with return receipt provides proof that your appeal was submitted on time — which is critical given the strict deadlines.' },
        { q: 'What documents should I attach to my appeal?', a: 'Include any documents that support your version of events: termination or layoff notice, emails or texts from your employer about your separation, pay stubs, performance reviews, and any witness information.' },
        { q: 'Can I use someone else\'s appeal letter as a template?', a: 'You can use a template as a starting point, but make sure every specific detail reflects your own situation. Generic or copy-pasted letters are less persuasive than ones that clearly describe your unique circumstances.' },
        { q: 'Do I need to appear in person for the appeal hearing?', a: 'Most states now allow phone hearings, and many have moved to video hearings. In-person hearings are still an option in some cases. Your hearing notice will specify the format.' },
      ]} />
    </SeoLayout>
  )
}
