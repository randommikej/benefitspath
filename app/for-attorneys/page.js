import Link from 'next/link'
import { SeoLayout, CTABlock, FAQSection } from '../../components/SeoTemplate'

export const metadata = {
  title: 'List Your Practice on BenefitsPath | For Employment Attorneys',
  description: 'Reach unemployed workers actively searching for employment attorneys. Get listed on BenefitsPath and connect with high-intent clients in your state.',
}

const faqs = [
  {
    q: 'What kind of users will see my listing?',
    a: 'BenefitsPath users have just been laid off or had their unemployment claim denied. They are actively seeking legal help and have already answered questions about their situation — making them high-intent, qualified leads.',
  },
  {
    q: 'How many leads can I expect per month?',
    a: 'Lead volume varies by state, tier, and practice focus. Featured attorneys in high-traffic states (CA, TX, NY, FL) typically see the most activity. We show attorney cards on eligibility results and the main attorney-request flow.',
  },
  {
    q: 'Is there a contract or minimum commitment?',
    a: 'No contracts. All plans are month-to-month and you can cancel anytime. We want to earn your business every month.',
  },
  {
    q: 'What is the difference between Basic, Premium, and Featured?',
    a: 'Basic gets you a standard listing. Premium adds priority placement and lead notifications. Featured puts you at the top with a highlighted badge, a direct phone call button, and maximum visibility — the most popular option for attorneys serious about growth.',
  },
  {
    q: 'How quickly will my listing go live?',
    a: 'After submitting your application and completing payment, our team reviews and activates your listing within 1-2 business days.',
  },
  {
    q: 'Do I need to be barred in every state I list?',
    a: 'Yes — only list the states where you are licensed to practice. We rely on attorneys to self-certify their bar admission status for the states they select.',
  },
]

export default function ForAttorneysPage() {
  return (
    <SeoLayout>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a3c2b 0%, #2d6a4f 100%)', borderRadius: 20, padding: '56px 48px', marginBottom: 48, color: '#fff' }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}>FOR EMPLOYMENT ATTORNEYS</p>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, margin: '0 0 20px', lineHeight: 1.15 }}>
          Connect With Workers Who Need Legal Help
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 560 }}>
          BenefitsPath guides newly unemployed Americans through eligibility checks, appeal letters, and attorney referrals. Get in front of users at exactly the moment they are looking for representation.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/lawyer-signup" style={{ background: '#fff', color: '#1a3c2b', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Apply for a Listing
          </Link>
          <a href="#pricing" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            See Pricing
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 48 }}>
        {[
          ['10,000+', 'Monthly Users'],
          ['50 States', 'Nationwide Coverage'],
          ['High Intent', 'Users Need Help Now'],
          ['1-2 Days', 'Listing Activation'],
        ].map(([stat, label]) => (
          <div key={stat} style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#2d6a4f', marginBottom: 4 }}>{stat}</div>
            <div style={{ fontSize: 13, color: '#5a524a', fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Value Prop */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, marginBottom: 24 }}>Why Attorneys Choose BenefitsPath</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            {
              icon: '🎯',
              title: 'High-Intent Leads Only',
              body: 'Our users have already completed an eligibility assessment and many have had claims denied. They are not browsing — they need legal help right now. Your listing reaches them at peak intent.',
            },
            {
              icon: '⚡',
              title: 'Zero Effort Setup',
              body: 'Submit your profile, complete payment, and we handle the rest. No technical setup, no ad campaigns to manage. Your listing goes live across all relevant state pages automatically.',
            },
            {
              icon: '📍',
              title: 'State-Level Targeting',
              body: 'Your listing appears only for users in the specific states you practice in. Serve California, New York, Texas — or list as nationwide. You only get seen by workers you can actually help.',
            },
            {
              icon: '📈',
              title: 'Grow With the Platform',
              body: 'BenefitsPath is growing fast during a wave of layoffs. Early listings benefit from the lowest competition and highest visibility as we scale our user base.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: '24px', display: 'flex', gap: 20 }}>
              <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{icon}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#1a1714' }}>{title}</h3>
                <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.65, margin: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, marginBottom: 8 }}>Pricing</h2>
        <p style={{ color: '#5a524a', marginBottom: 24 }}>All plans are month-to-month. No setup fees. Cancel anytime.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20 }}>
          {[
            {
              tier: 'Basic',
              price: '$99',
              features: ['Standard directory listing', 'Name, bio & contact info', 'Practice area tags', 'State targeting', 'Email inquiries'],
            },
            {
              tier: 'Premium',
              price: '$299',
              features: ['Everything in Basic', 'Priority placement', 'Highlighted card design', 'Lead email notifications', 'Website link displayed'],
            },
            {
              tier: 'Featured',
              price: '$599',
              featured: true,
              features: ['Everything in Premium', 'Top-of-page placement', 'Featured badge', 'Direct phone call button', 'Maximum visibility'],
            },
          ].map(({ tier, price, features, featured }) => (
            <div key={tier} style={{ background: featured ? '#1a3c2b' : '#fff', color: featured ? '#fff' : '#1a1714', border: featured ? 'none' : '1px solid #e5e0d8', borderRadius: 18, padding: '28px 24px', position: 'relative' }}>
              {featured && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#c77c3c', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 20, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: featured ? '#fff' : '#1a1714' }}>{tier}</div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, marginBottom: 20, color: featured ? '#fff' : '#1a1714', lineHeight: 1 }}>
                {price}<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 10 }}>
                {features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: featured ? 'rgba(255,255,255,0.85)' : '#5a524a', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4 }}>
                    <span style={{ color: featured ? '#7dd3a8' : '#2d6a4f', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/lawyer-signup" style={{ display: 'block', textAlign: 'center', background: featured ? '#fff' : '#2d6a4f', color: featured ? '#1a3c2b' : '#fff', padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, marginBottom: 24 }}>How It Works</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { step: '1', title: 'Submit Your Application', body: 'Fill out our simple form with your contact info, practice areas, and states. Takes less than 5 minutes.' },
            { step: '2', title: 'Team Review & Setup', body: 'Our team reviews your application and contacts you to select your plan and complete payment. Typically within 1-2 business days.' },
            { step: '3', title: 'Go Live', body: 'Your listing goes live and starts appearing to users in your target states at the moment they are searching for legal help.' },
            { step: '4', title: 'Receive Inquiries', body: 'Workers reach out directly via phone or email. Featured tier attorneys also receive lead notifications when users specifically request a consultation.' },
          ].map(({ step, title, body }) => (
            <div key={step} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: 24 }}>
              <div style={{ background: '#2d6a4f', color: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{step}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#1a1714' }}>{title}</h3>
                <p style={{ fontSize: 15, color: '#5a524a', lineHeight: 1.6, margin: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTABlock
        title="Ready to Reach Unemployed Workers?"
        description="Apply now and get your listing live within 1-2 business days. No contracts, cancel anytime."
        href="/lawyer-signup"
        btnText="Apply for a Listing"
        variant="green"
      />

      <FAQSection faqs={faqs} />
    </SeoLayout>
  )
}
