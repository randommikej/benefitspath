import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SeoLayout } from '../../../components/SeoTemplate'
import LegalHelpDirectory from '../../../components/LegalHelpDirectory'
import { STATES, STATE_DATA } from '../../../lib/data'
import { LEGAL_HELP } from '../../../lib/legalHelp'

const bySlug = Object.fromEntries(STATES.map((s) => [s.slug, s.code]))

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }))
}
export const dynamicParams = false

export function generateMetadata({ params }) {
  const code = bySlug[params.state]
  if (!code) return {}
  const name = STATE_DATA[code].name
  return {
    title: `Unemployment Lawyers & Free Legal Aid in ${name}`,
    description: `Free legal aid, the lawyer referral service and employment attorneys who help with unemployment claims and appeals in ${name}. Contact them in one tap.`,
    alternates: { canonical: `https://www.benefitspath.org/legal-help/${params.state}` },
  }
}

export default function StateLegalHelp({ params }) {
  const code = bySlug[params.state]
  if (!code || !LEGAL_HELP[code]) notFound()
  const sd = STATE_DATA[code]
  return (
    <SeoLayout>
      <h1 className="guide-title">Unemployment legal help in {sd.name}</h1>
      <p className="guide-lede">
        If your {sd.name} unemployment claim was denied or your employer is fighting it, you usually have about {sd.appealDays} days to appeal.
        These offices and attorneys help workers with unemployment problems. Tap a button to email or call them with your situation already written out.
      </p>
      <p className="guide-aside">
        Not sure you qualify yet? <Link href="/">Check your eligibility</Link> or read the <Link href={`/unemployment-benefits-${sd.slug}`}>{sd.name} benefits guide</Link>.
      </p>
      <LegalHelpDirectory initialState={code} />
    </SeoLayout>
  )
}
