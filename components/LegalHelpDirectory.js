'use client'
import { useMemo, useState } from 'react'
import { LEGAL_HELP, NATIONAL_HELP, LEGAL_HELP_CHECKED } from '../lib/legalHelp'
import { buildContactMessage, buildSubject, mailtoHref, telHref } from '../lib/contactMessage'

const STATE_OPTIONS = Object.entries(LEGAL_HELP)
  .map(([code, s]) => ({ code, name: s.stateName }))
  .sort((a, b) => a.name.localeCompare(b.name))

async function logContact(state, target, method) {
  // Records only which listing was contacted and how — no personal details.
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'attorney_contact', state, lawyerSituation: `Contacted: ${target} via ${method}`.slice(0, 300) }),
    })
  } catch (_) { /* never block the user */ }
}

function ContactButtons({ entry, kind, stateCode, stateName, message, subject, onCopy }) {
  const target = entry.firm ? `${entry.name} (${entry.firm})` : entry.name
  const tel = telHref(entry.phone)
  const site = entry.intakeUrl || entry.website
  return (
    <div className="lh-actions">
      {entry.email && (
        <a className="lh-btn lh-primary" href={mailtoHref(entry.email, subject, message)}
           onClick={() => logContact(stateCode, target, 'email')}>✉️ Email them</a>
      )}
      {tel && (
        <a className={`lh-btn ${entry.email ? 'lh-secondary' : 'lh-primary'}`} href={tel}
           onClick={() => logContact(stateCode, target, 'call')}>📞 Call {entry.phone}</a>
      )}
      {site && (
        <a className="lh-btn lh-secondary" href={site} target="_blank" rel="noopener noreferrer"
           onClick={() => logContact(stateCode, target, entry.intakeUrl ? 'apply_online' : 'website')}>
          🌐 {entry.intakeUrl ? (kind === 'aid' ? 'Apply online' : 'Request online') : 'Website'}
        </a>
      )}
      {!entry.email && (
        <button type="button" className="lh-btn lh-secondary" onClick={() => { onCopy(); logContact(stateCode, target, 'copy') }}>
          📋 Copy my message
        </button>
      )}
    </div>
  )
}

export default function LegalHelpDirectory({ initialState = '', answers = {}, appeal = {}, eligibility = null, initialDetails = {}, showDetailsForm = true }) {
  const [stateCode, setStateCode] = useState(initialState && LEGAL_HELP[initialState] ? initialState : '')
  const [details, setDetails] = useState({ name: '', phone: '', email: '', situation: '', ...initialDetails })
  const [copied, setCopied] = useState(false)

  const s = stateCode ? LEGAL_HELP[stateCode] : null
  const subject = buildSubject(s?.stateName)
  const message = useMemo(
    () => buildContactMessage({ stateName: s?.stateName, details, answers, appeal, eligibility }),
    [s, details, answers, appeal, eligibility]
  )

  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2500) }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(message).then(done, done)
    else done()
  }

  const set = (k) => (e) => setDetails((d) => ({ ...d, [k]: e.target.value }))

  return (
    <div className="lh">
      <div className="lh-field">
        <label className="lh-label" htmlFor="lh-state">Your state</label>
        <select id="lh-state" className="lh-input" value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
          <option value="">Choose your state…</option>
          {STATE_OPTIONS.map((o) => <option key={o.code} value={o.code}>{o.name}</option>)}
        </select>
      </div>

      {showDetailsForm && (
        <div className="lh-box">
          <div className="lh-h3">Your details (optional)</div>
          <p className="lh-muted">These go into the message you send. Nothing is sent until you press send in your own email app, and BenefitsPath doesn't share them with anyone.</p>
          <div className="lh-grid">
            <input className="lh-input" placeholder="Your name" value={details.name} onChange={set('name')} autoComplete="name" />
            <input className="lh-input" placeholder="Phone" value={details.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" />
            <input className="lh-input" placeholder="Email" value={details.email} onChange={set('email')} autoComplete="email" inputMode="email" />
          </div>
          <textarea className="lh-input lh-ta" placeholder="Briefly, what happened? (e.g. when you lost your job, why your claim was denied, any deadlines)" value={details.situation} onChange={set('situation')} />
          <details className="lh-preview">
            <summary>Preview the message</summary>
            <pre>{`Subject: ${subject}\n\n${message}`}</pre>
          </details>
          <button type="button" className="lh-btn lh-secondary" onClick={copy}>{copied ? '✅ Copied' : '📋 Copy message'}</button>
        </div>
      )}

      {copied && <div className="lh-toast">Message copied. Paste it into their contact form or email.</div>}

      {!s && <p className="lh-muted">Pick your state to see free legal aid, your bar's lawyer referral service and employment attorneys.</p>}

      {s && (
        <>
          {s.legalAid.length > 0 && (
            <section className="lh-section">
              <div className="lh-h2">Free legal aid in {s.stateName}</div>
              <p className="lh-muted">Nonprofit legal help for people with low or no income. Start here if you can't afford a lawyer.</p>
              {s.legalAid.map((e) => (
                <div className="lh-card" key={e.name}>
                  <div className="lh-badge lh-free">Free</div>
                  <div className="lh-name">{e.name}</div>
                  {e.coverage && <div className="lh-meta">Serves: {e.coverage}</div>}
                  {e.notes && <div className="lh-note">{e.notes}</div>}
                  <ContactButtons entry={e} kind="aid" stateCode={stateCode} stateName={s.stateName} message={message} subject={subject} onCopy={copy} />
                </div>
              ))}
            </section>
          )}

          {s.barReferral && (
            <section className="lh-section">
              <div className="lh-h2">Lawyer referral service</div>
              <p className="lh-muted">Run by the bar association. They match you with a local lawyer, often for a low-cost first consultation.</p>
              <div className="lh-card">
                <div className="lh-name">{s.barReferral.name}</div>
                {s.barReferral.fee && <div className="lh-meta">Consultation: {s.barReferral.fee}</div>}
                <ContactButtons entry={s.barReferral} kind="bar" stateCode={stateCode} stateName={s.stateName} message={message} subject={subject} onCopy={copy} />
              </div>
            </section>
          )}

          {s.attorneys.length > 0 && (
            <section className="lh-section">
              <div className="lh-h2">Employment attorneys in {s.stateName}</div>
              <p className="lh-muted">Private lawyers who represent workers. Ask about fees before you hire anyone; many offer a free first call.</p>
              {s.attorneys.map((e) => (
                <div className="lh-card" key={e.name + (e.firm || '')}>
                  {e.unemploymentSpecific && <div className="lh-badge">Handles unemployment cases</div>}
                  <div className="lh-name">{e.firm && e.firm !== e.name ? e.firm : e.name}</div>
                  <div className="lh-meta">{[e.firm && e.firm !== e.name ? e.name : null, e.city].filter(Boolean).join(' · ')}</div>
                  {e.practiceNote && <div className="lh-note">{e.practiceNote}</div>}
                  <ContactButtons entry={e} kind="attorney" stateCode={stateCode} stateName={s.stateName} message={message} subject={subject} onCopy={copy} />
                </div>
              ))}
            </section>
          )}

          <section className="lh-section">
            <div className="lh-h2">More places to look</div>
            {NATIONAL_HELP.map((n) => (
              <div className="lh-card lh-slim" key={n.name}>
                <div className="lh-name">{n.name}</div>
                <div className="lh-note">{n.description}</div>
                <div className="lh-actions"><a className="lh-btn lh-secondary" href={n.website} target="_blank" rel="noopener noreferrer">🌐 Open</a></div>
              </div>
            ))}
          </section>
        </>
      )}

      <p className="lh-disclaimer">
        BenefitsPath is not a law firm and doesn&apos;t give legal advice. We don&apos;t receive payment from the organizations listed here
        and haven&apos;t reviewed their work. Contact details were checked in {LEGAL_HELP_CHECKED} and can change. Appeal deadlines are short
        (often 10–30 days), so contact more than one place if you don&apos;t hear back quickly.
      </p>
    </div>
  )
}
