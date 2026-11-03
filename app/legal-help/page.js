import Link from 'next/link'
import { SeoLayout } from '../../components/SeoTemplate'
import LegalHelpDirectory from '../../components/LegalHelpDirectory'
import { STATES } from '../../lib/data'

export const metadata = {
  title: 'Free Legal Help for Unemployment Benefits — Find a Lawyer by State',
  description: 'Free legal aid, bar lawyer referral services and employment attorneys in every state. Contact them in one tap with a message that explains your unemployment situation.',
  alternates: { canonical: 'https://www.benefitspath.org/legal-help' },
}

export default function LegalHelpIndex() {
  return (
    <SeoLayout>
      <h1 className="guide-title">Get legal help with your unemployment claim</h1>
      <p className="guide-lede">
        Denied benefits, fired unfairly, or facing an appeal hearing? Find free legal aid, your bar&apos;s lawyer referral service and
        employment attorneys in your state, then contact them directly with one tap.
      </p>
      <LegalHelpDirectory />
      <h2 className="prose-h2">Legal help by state</h2>
      <div className="state-index">
        {STATES.map((s) => (
          <Link key={s.code} href={`/legal-help/${s.slug}`} >{s.name}</Link>
        ))}
      </div>
    </SeoLayout>
  )
}
