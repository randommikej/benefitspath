import Link from 'next/link'
import { SeoLayout } from '../../components/SeoTemplate'
import LegalHelpDirectory from '../../components/LegalHelpDirectory'
import { STATES } from '../../lib/data'

export const metadata = {
  title: 'Free Legal Help for Unemployment Benefits — Find a Lawyer by State | BenefitsPath',
  description: 'Free legal aid, bar lawyer referral services and employment attorneys in every state. Contact them in one tap with a message that explains your unemployment situation.',
  alternates: { canonical: 'https://www.benefitspath.org/legal-help' },
}

export default function LegalHelpIndex() {
  return (
    <SeoLayout>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, lineHeight: 1.15, margin: '0 0 12px' }}>Get legal help with your unemployment claim</h1>
      <p style={{ fontSize: 17, color: '#5a524a', lineHeight: 1.6, marginBottom: 24 }}>
        Denied benefits, fired unfairly, or facing an appeal hearing? Find free legal aid, your bar&apos;s lawyer referral service and
        employment attorneys in your state, then contact them directly with one tap.
      </p>
      <LegalHelpDirectory />
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, margin: '36px 0 12px' }}>Legal help by state</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {STATES.map((s) => (
          <Link key={s.code} href={`/legal-help/${s.slug}`} style={{ fontSize: 14, color: '#1e40af', textDecoration: 'none', padding: '6px 10px', background: '#fff', border: '1px solid #e5e0d8', borderRadius: 8 }}>{s.name}</Link>
        ))}
      </div>
    </SeoLayout>
  )
}
