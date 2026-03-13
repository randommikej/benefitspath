'use client'
import { useState } from 'react'
import Link from 'next/link'
import { STATE_DATA, STATES, computeEligibility, generateAppealLetter } from '../lib/data'

const SHEETS_WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL || ''

async function submitToSheets(payload) {
  if (!SHEETS_WEBHOOK_URL || SHEETS_WEBHOOK_URL.includes('YOUR_APPS_SCRIPT')) return
  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString(), source: 'BenefitsPath' }),
    })
  } catch (err) { console.warn('Sheet submission:', err) }
}

async function submitLead(payload) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) { console.warn('Lead submission:', err) }
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Chk = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const Arr = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const ArrL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const Shld = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const Ext = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const Cpy = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
const Prt = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
const Mlico = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const GlobeIco = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const CvDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>

// ─── ADSENSE SLOT ─────────────────────────────────────────────────────────────
const ADSENSE_ID = 'ca-pub-7064375540718559'

function AdSlot({ slot = 'inline', style = {} }) {
  return (
    <div className={slot === 'sidebar' ? 'ad-slot-sidebar' : 'ad-slot'} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
    </div>
  )
}

// ─── ATTORNEY CARDS ───────────────────────────────────────────────────────────
function AttorneyCards({ state }) {
  // Placeholder attorneys — replaced by live Supabase data after setup
  const attorneys = [
    { id: 1, name: 'Sarah Mitchell', firm: 'Mitchell Employment Law', tags: ['Wrongful Termination', 'UI Appeals', 'Discrimination'], phone: '1-800-555-0101', featured: true },
    { id: 2, name: 'James Reyes', firm: 'Reyes & Associates', tags: ['UI Denials', 'Contractor Disputes'], phone: '1-800-555-0102', featured: false },
  ]
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="sectit" style={{ fontSize: 18, marginBottom: 4 }}>Talk to an Attorney</div>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16 }}>Employment lawyers who specialize in unemployment cases. Most offer free consultations.</p>
      {attorneys.map(a => (
        <div key={a.id} className={`attorney-card${a.featured ? ' featured' : ''}`}>
          {a.featured && <div className="attorney-badge">⭐ Featured</div>}
          <div className="attorney-name">{a.name}</div>
          <div className="attorney-firm">{a.firm}</div>
          <div className="attorney-tags">
            {a.tags.map(t => <span key={t} className="attorney-tag">{t}</span>)}
          </div>
          <div className="attorney-contact">
            <a href={`tel:${a.phone}`} className="call">📞 Call Free</a>
            <a href="#attorney-form" className="consult">💬 Free Consult</a>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function BenefitsApp() {
  const [screen, setScreen] = useState('home')
  const [prevScreen, setPrevScreen] = useState('home')
  const [answers, setAnswers] = useState({})
  const [aData, setAData] = useState({})
  const [letter, setLetter] = useState('')
  const [cpyOk, setCpyOk] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lForm, setLForm] = useState({ name: '', phone: '', email: '', situation: '' })
  const [lSent, setLSent] = useState(false)
  const [emailVal, setEmailVal] = useState('')
  const [firstNameVal, setFirstNameVal] = useState('')
  const [lastNameVal, setLastNameVal] = useState('')
  const [phoneVal, setPhoneVal] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const si = answers.state ? STATE_DATA[answers.state] : null
  const elig = answers.state && answers.endReason && answers.employmentLength
    ? computeEligibility(answers) : null

  const stepMap = { home:0, state:1, situation:2, employment:3, applied:4, email_capture:5, result:6, forms:6, appeal_intro:6, appeal_form:6, appeal_letter:6, lawyer:6, privacy:6 }
  const progress = ((stepMap[screen] || 0) / 6) * 100

  const go = (s) => { setPrevScreen(screen); setScreen(s); window.scrollTo(0, 0) }

  const sheetPayload = (extra = {}) => ({
    email: answers.email || extra.email || '(not provided)',
    firstName: answers.firstName || firstNameVal || '',
    lastName: answers.lastName || lastNameVal || '',
    phone: answers.phone || phoneVal || '',
    state: answers.state || '',
    endReason: answers.endReason || '',
    employmentLength: answers.employmentLength || '',
    applicationStatus: answers.applicationStatus || '',
    eligibilityScore: elig?.score || '',
    eligibilityLikelihood: elig?.likelihood || '',
    appealFirstName: aData.firstName || '',
    appealLastName: aData.lastName || '',
    appealClaimId: aData.claimId || '',
    appealDenialDate: aData.denialDate || '',
    appealWasLayoff: aData.wasLayoff || '',
    appealTermReason: aData.termReason || '',
    lawyerName: lForm.name || '',
    lawyerPhone: lForm.phone || '',
    lawyerEmail: lForm.email || '',
    lawyerSituation: lForm.situation || '',
    ...extra,
  })

  const handleEmailSubmit = async () => {
    setSubmitting(true)
    const payload = sheetPayload({ email: emailVal })
    setAnswers(a => ({ ...a, email: emailVal, firstName: firstNameVal, lastName: lastNameVal, phone: phoneVal }))
    await Promise.all([submitToSheets(payload), submitLead({ ...payload, type: 'eligibility' })])
    setSubmitting(false)
    go('result')
  }

  const handleEmailSkip = async () => {
    const payload = sheetPayload({ email: '(skipped)' })
    setAnswers(a => ({ ...a, firstName: firstNameVal, lastName: lastNameVal, phone: phoneVal }))
    await Promise.all([submitToSheets(payload), submitLead({ ...payload, type: 'eligibility_anonymous' })])
    go('result')
  }

  const handleGenerateLetter = async () => {
    const l = generateAppealLetter({ ...answers, ...aData })
    setLetter(l)
    const payload = sheetPayload()
    await Promise.all([submitToSheets(payload), submitLead({ ...payload, type: 'appeal_letter' })])
    go('appeal_letter')
  }

  const handleLawyerSubmit = async () => {
    const payload = sheetPayload({ lawyerName: lForm.name, lawyerPhone: lForm.phone, lawyerEmail: lForm.email, lawyerSituation: lForm.situation })
    await Promise.all([submitToSheets(payload), submitLead({ ...payload, type: 'attorney_request' })])
    setLSent(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(letter).then(() => { setCpyOk(true); setTimeout(() => setCpyOk(false), 2000) })
  }
  const handlePrint = () => {
    const w = window.open('', '_blank')
    w.document.write(`<pre style="font-family:monospace;font-size:12px;padding:40px;white-space:pre-wrap">${letter}</pre>`)
    w.document.close(); w.print()
  }

  return (
    <div className="app" onScroll={e => setScrolled(e.target.scrollTop > 4)}>

      {/* HEADER */}
      <header className={`hdr${scrolled ? ' sc' : ''}`}>
        <div className="logo" onClick={() => go('home')} style={{ cursor: 'pointer' }}>
          <div className="lmark"><Shld /></div>
          <span className="ltxt">BenefitsPath</span>
        </div>
        <span className="fbadge">100% Free</span>
      </header>
      <div className="pbar"><div className="pfill" style={{ width: `${progress}%` }} /></div>

      {/* ── HOME ── */}
      {screen === 'home' && (
        <div className="scr">
          <div style={{ padding: '12px 0 28px' }}>
            <div className="eyebrow">Benefits Navigator</div>
            <h1 className="htitle">Lost your job?<br />We'll help you figure out <em>what to do next.</em></h1>
            <p className="hsub">Answer a few quick questions and we'll guide you to the right benefits, forms, and support — completely free.</p>
            <div className="hfeats">
              {[['Check if you qualify', 'Takes about 2 minutes'], ['Get your state\'s forms & links', 'Direct to official portals'], ['Generate an appeal letter', 'If your claim was denied'], ['Connect with a lawyer', 'If you think you were wronged']].map(([l, d]) => (
                <div className="hfeat" key={l}><div className="hdot"><Chk /></div><div><strong style={{ color: 'var(--text)', fontSize: 14 }}>{l}</strong> — <span style={{ fontSize: 13 }}>{d}</span></div></div>
              ))}
            </div>
            <button className="btn bp" onClick={() => go('state')}>Check Your Benefits <Arr s={18} /></button>
          </div>
          <div className="trust">
            <div className="tlbl">Who we help</div>
            <div className="titems">
              {[['50', 'States covered'], ['Free', 'Always, forever'], ['5 min', 'Average check time']].map(([n, l]) => (
                <div className="titem" key={l}><div className="tnum">{n}</div><div className="tsub">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="fbanner"><Shld /><p className="fbtxt">This service costs nothing. Access to benefits information should be simple and free for everyone.</p></div>
          <div className="dvdr">or jump to</div>
          <button className="btn bs" style={{ marginBottom: 10 }} onClick={() => go('appeal_intro')}>✉️ Generate an Appeal Letter</button>
          <button className="btn bs" style={{ marginBottom: 16 }} onClick={() => go('lawyer')}>⚖️ Talk to an Employment Lawyer</button>
          <button className="skip" onClick={() => go('privacy')}>Privacy Policy</button>
          {/* SEO Links */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <div className="tlbl" style={{ marginBottom: 12 }}>Helpful Guides</div>
            {[
              ['/how-to-appeal-unemployment-denial', 'How to Appeal an Unemployment Denial'],
              ['/reasons-unemployment-claims-get-denied', 'Why Unemployment Claims Get Denied'],
              ['/unemployment-appeal-letter-example', 'Unemployment Appeal Letter Example'],
              ['/how-to-apply-for-unemployment', 'How to Apply for Unemployment'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: 'var(--green)', marginBottom: 8, textDecoration: 'none' }}>→ {label}</Link>
            ))}
          </div>
        </div>
      )}

      {/* ── STATE ── */}
      {screen === 'state' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('home')}><ArrL /> Back</button>
          <div className="qlbl">Step 1 of 5</div>
          <h2 className="qtitle">What state did you work in?</h2>
          <p className="qsub">We'll find the right benefits rules and links for your state.</p>
          <div className="swrap">
            <select value={answers.state || ''} onChange={e => setAnswers(a => ({ ...a, state: e.target.value }))}>
              <option value="">Select your state…</option>
              {STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
            <div className="sarr"><CvDown /></div>
          </div>
          {answers.state && (
            <div className="ic" style={{ marginBottom: 20 }}>
              <div className="ict">Selected</div>
              <div className="icv">{STATE_DATA[answers.state]?.name}</div>
              <div className="ics">Max weekly: <strong>${STATE_DATA[answers.state]?.weeklyMax?.toLocaleString()}</strong> · Up to <strong>{STATE_DATA[answers.state]?.avgWeeks} weeks</strong></div>
            </div>
          )}
          <div className="bnav">
            <button className="btn bp" disabled={!answers.state} onClick={() => go('situation')} style={{ opacity: answers.state ? 1 : .4 }}>Continue <Arr s={18} /></button>
          </div>
        </div>
      )}

      {/* ── SITUATION ── */}
      {screen === 'situation' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('state')}><ArrL /> Back</button>
          <div className="qlbl">Step 2 of 5</div>
          <h2 className="qtitle">How did your job end?</h2>
          <p className="qsub">This is the most important factor in your eligibility.</p>
          <div className="opts">
            {[
              { v: 'layoff', i: '📦', l: 'Laid off', d: 'Employer reduced workforce or eliminated my position' },
              { v: 'company_closed', i: '🏢', l: 'Company closed or downsized', d: 'Business shut down or had major cuts' },
              { v: 'reduction', i: '✂️', l: 'Hours reduced significantly', d: 'Part-time or major reduction in hours' },
              { v: 'contract_ended', i: '📋', l: 'Contract or temp job ended', d: 'My assignment or contract was not renewed' },
              { v: 'fired', i: '⚠️', l: 'Fired or terminated', d: 'Employer ended my employment' },
              { v: 'quit_good_cause', i: '🚪', l: 'Quit with good cause', d: 'Unsafe conditions, harassment, or major job change' },
              { v: 'quit', i: '👋', l: 'Quit voluntarily', d: 'I chose to leave' },
            ].map(o => (
              <div key={o.v} className={`opt${answers.endReason === o.v ? ' sel' : ''}`} onClick={() => setAnswers(a => ({ ...a, endReason: o.v }))}>
                <div className="oico">{o.i}</div>
                <div className="otxt"><div className="olbl">{o.l}</div><div className="odsc">{o.d}</div></div>
                <div className="ochk" />
              </div>
            ))}
          </div>
          <div className="bnav">
            <button className="btn bp" disabled={!answers.endReason} onClick={() => go('employment')} style={{ opacity: answers.endReason ? 1 : .4 }}>Continue <Arr s={18} /></button>
          </div>
        </div>
      )}

      {/* ── EMPLOYMENT ── */}
      {screen === 'employment' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('situation')}><ArrL /> Back</button>
          <div className="qlbl">Step 3 of 5</div>
          <h2 className="qtitle">How long were you at this job?</h2>
          <p className="qsub">Most states require a minimum amount of work history.</p>
          <div className="opts">
            {[{ v: 'under3', l: 'Less than 3 months', i: '🌱' }, { v: '3to6', l: '3–6 months', i: '📅' }, { v: '6to12', l: '6–12 months', i: '🗓️' }, { v: '1to2', l: '1–2 years', i: '⏳' }, { v: '2plus', l: 'More than 2 years', i: '🏆' }].map(o => (
              <div key={o.v} className={`opt${answers.employmentLength === o.v ? ' sel' : ''}`} onClick={() => setAnswers(a => ({ ...a, employmentLength: o.v }))}>
                <div className="oico">{o.i}</div><div className="otxt"><div className="olbl">{o.l}</div></div><div className="ochk" />
              </div>
            ))}
          </div>
          <div className="bnav">
            <button className="btn bp" disabled={!answers.employmentLength} onClick={() => go('applied')} style={{ opacity: answers.employmentLength ? 1 : .4 }}>Continue <Arr s={18} /></button>
          </div>
        </div>
      )}

      {/* ── APPLIED ── */}
      {screen === 'applied' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('employment')}><ArrL /> Back</button>
          <div className="qlbl">Step 4 of 5</div>
          <h2 className="qtitle">Have you already applied?</h2>
          <p className="qsub">This helps us give you the right next steps.</p>
          <div className="opts">
            {[{ v: 'no', i: '❌', l: "No, I haven't applied yet" }, { v: 'yes_pending', i: '⏳', l: 'Yes, still pending' }, { v: 'yes_approved', i: '✅', l: 'Yes, I was approved' }, { v: 'yes_denied', i: '🚫', l: 'Yes, I was denied' }].map(o => (
              <div key={o.v} className={`opt${answers.applicationStatus === o.v ? ' sel' : ''}`} onClick={() => setAnswers(a => ({ ...a, applicationStatus: o.v }))}>
                <div className="oico">{o.i}</div><div className="otxt"><div className="olbl">{o.l}</div></div><div className="ochk" />
              </div>
            ))}
          </div>
          <div className="bnav">
            <button className="btn bp" disabled={!answers.applicationStatus} onClick={() => go('email_capture')} style={{ opacity: answers.applicationStatus ? 1 : .4 }}>See My Results <Arr s={18} /></button>
          </div>
        </div>
      )}

      {/* ── EMAIL CAPTURE ── */}
      {screen === 'email_capture' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('applied')}><ArrL /> Back</button>
          <div className="qlbl">Step 5 of 5 — Almost there!</div>
          <div className="ehero">
            <div className="eemoji">📬</div>
            <h2 className="etitle">Where should we send your results?</h2>
            <p className="esub">Get your personalized benefits summary and state links delivered to your inbox.</p>
          </div>
          <div className="eperks">
            {[['📋', 'Your eligibility summary & next steps'], ['🔗', "Direct link to your state's application portal"], ['⏰', 'Key filing deadlines for your state'], ['📞', "Your state's unemployment helpline number"]].map(([ico, txt]) => (
              <div className="eperk" key={txt}><div className="epico">{ico}</div><span>{txt}</span></div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div className="ig" style={{ margin: 0 }}><label className="ilbl">First Name</label><input className="inp" type="text" placeholder="Jane" value={firstNameVal} onChange={e => setFirstNameVal(e.target.value)} /></div>
            <div className="ig" style={{ margin: 0 }}><label className="ilbl">Last Name</label><input className="inp" type="text" placeholder="Smith" value={lastNameVal} onChange={e => setLastNameVal(e.target.value)} /></div>
          </div>
          <div className="ig"><label className="ilbl">Cell Phone <span style={{ color: 'var(--text3)', fontWeight: 400 }}>(optional)</span></label><input className="inp" type="tel" placeholder="(555) 000-0000" value={phoneVal} onChange={e => setPhoneVal(e.target.value)} /></div>
          <div className="ig">
            <label className="ilbl">Email Address <span style={{ color: 'var(--text3)', fontWeight: 400 }}>(optional)</span></label>
            <input className="inp" type="email" placeholder="you@example.com" value={emailVal} onChange={e => setEmailVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && emailVal.includes('@') && handleEmailSubmit()} />
            <div className="ihint" style={{ marginTop: 8 }}>We respect your privacy. <button className="pvlink" onClick={() => go('privacy')}>Read our privacy policy →</button></div>
          </div>
          <div className="bnav">
            {submitting ? (
              <div className="subm"><div className="spin" />Saving your results…</div>
            ) : (
              <>
                <button className="btn bp" disabled={!emailVal || !emailVal.includes('@')} onClick={handleEmailSubmit} style={{ opacity: emailVal && emailVal.includes('@') ? 1 : .4 }}><Mlico /> Send My Results</button>
                <button className="skip" onClick={handleEmailSkip}>Skip — just show me my results</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === 'result' && elig && si && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('email_capture')}><ArrL /> Back</button>
          <div className="sectit">Your Eligibility Summary</div>
          <p className="secsub">Based on your answers for <strong>{si.name}</strong></p>
          <div className="rcrd">
            <div className="rmeter">
              <div className="rcirc" style={{ background: elig.color + '22', border: `3px solid ${elig.color}` }}>
                <div className="rpct" style={{ color: elig.color }}>{elig.score}%</div>
                <div className="rlbl2" style={{ color: elig.color }}>likely</div>
              </div>
              <div>
                <div className="rlik" style={{ color: elig.color }}>{elig.likelihood} Likelihood</div>
                <div className="rlsub">of qualifying for benefits</div>
              </div>
            </div>
            <div className="rmsg">{elig.message}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <div className="ic" style={{ margin: 0 }}><div className="ict">Max Weekly</div><div className="icv">${si.weeklyMax.toLocaleString()}</div><div className="ics">per week</div></div>
            <div className="ic" style={{ margin: 0 }}><div className="ict">Up to</div><div className="icv">{si.avgWeeks} wks</div><div className="ics">of benefits</div></div>
          </div>
          {answers.applicationStatus === 'yes_denied' && (
            <div className="dbox"><div className="dboxt">⚠️ You were denied — you can appeal!</div><div className="dboxb">You have <strong>{si.appealDays} days</strong> from your denial date to file an appeal.</div></div>
          )}

          {/* ── AD SLOT: below results ── */}
          <AdSlot slot="result-below" />

          <div style={{ marginBottom: 24 }}>
            <div className="sectit" style={{ fontSize: 18 }}>Your Next Steps</div>
            <div className="steps" style={{ marginTop: 14 }}>
              {(answers.applicationStatus === 'no' ? [
                ['Apply online now', `Visit ${si.name}'s official portal — takes about 20 minutes.`],
                ['Have your info ready', 'Employer name & address, employment dates, separation reason.'],
                ['Certify weekly', 'Certify your job search each week to keep receiving benefits.'],
              ] : answers.applicationStatus === 'yes_denied' ? [
                ['Generate your appeal letter', 'Use our tool below to create a professional appeal letter in minutes.'],
                ['File before the deadline', `You have ${si.appealDays} days from denial to appeal. Don't wait.`],
                ['Consider legal help', 'If you believe you were wrongly denied, an employment lawyer can help.'],
              ] : [
                ['Check your claim status', 'Log in to your state portal to see updates or information requests.'],
                ['Certify weekly', 'Keep certifying each week to continue receiving benefits.'],
                ['Report any income', 'Report any part-time wages when you certify.'],
              ]).map(([t, d], i) => (
                <div className="step" key={i}><div className="snum">{i + 1}</div><div className="sbdy"><div className="stit">{t}</div><div className="sdsc">{d}</div></div></div>
              ))}
            </div>
          </div>

          {/* Attorney cards */}
          <AttorneyCards state={answers.state} />

          <a className="plink" href={si.portal} target="_blank" rel="noopener noreferrer">
            <div className="plink-l"><div className="plico"><GlobeIco /></div><div><div style={{ fontWeight: 600, fontSize: 14 }}>Apply on {si.name}'s official site</div><div style={{ fontSize: 12, color: 'var(--text3)' }}>Official government portal</div></div></div>
            <Ext />
          </a>
          <div className="bnav">
            {answers.applicationStatus === 'yes_denied' && <button className="btn bamb" onClick={() => go('appeal_intro')}>✉️ Generate Appeal Letter</button>}
            <button className="btn bs" onClick={() => go('forms')}>📄 View Required Documents</button>
            {(answers.endReason === 'fired' || answers.endReason === 'quit_good_cause') && <button className="btn bog" onClick={() => go('lawyer')}>⚖️ Talk to a Lawyer</button>}
          </div>
        </div>
      )}

      {/* ── FORMS ── */}
      {screen === 'forms' && si && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('result')}><ArrL /> Back</button>
          <div className="sectit">Documents & Forms</div>
          <p className="secsub">What you'll need to apply in <strong>{si.name}</strong></p>
          <div className="fbanner"><Shld /><p className="fbtxt">All forms and applications are free through official government portals.</p></div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Required Documents</div>
            {[['🪪', 'Photo ID or Social Security Card', 'Government-issued ID or your SSN card'], ['💼', 'Employment information', 'Employer name, address, phone; your job title'], ['📅', 'Work history', 'Start and end dates for jobs in the past 18 months'], ['💵', 'Earnings information', 'Your wages and hours for the last 12–18 months'], ['📝', 'Separation information', 'Reason for separation; any documents from your employer'], ['🏦', 'Bank account details', 'Routing and account number for direct deposit']].map(([ico, t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 20 }}>{ico}</div><div><div style={{ fontWeight: 500, fontSize: 14 }}>{t}</div><div style={{ fontSize: 13, color: 'var(--text2)' }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>How to Apply</div>
            <div className="steps">
              {[['Online (fastest)', `Visit ${si.portal} — most claims are processed faster online.`], ['By phone', `Call ${si.phone}. Have your documents ready.`], ['In person', "Find your local workforce center at your state's labor department website."]].map(([t, d], i) => (
                <div className="step" key={i}><div className="snum">{i + 1}</div><div className="sbdy"><div className="stit">{t}</div><div className="sdsc">{d}</div></div></div>
              ))}
            </div>
          </div>
          <div className="ic amb"><div className="ict">Important Deadlines</div><div className="icv">Apply as soon as possible</div><div className="ics">Most states don't backpay before your application date. Apply within 1–2 weeks of losing your job.</div></div>
          <div className="bnav">
            <a href={si.portal} target="_blank" rel="noopener noreferrer" className="btn bp">Apply Now on {si.name} Portal <Ext /></a>
          </div>
        </div>
      )}

      {/* ── APPEAL INTRO ── */}
      {screen === 'appeal_intro' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go(answers.state ? 'result' : 'home')}><ArrL /> Back</button>
          <div className="sectit">Generate Your Appeal Letter</div>
          <p className="secsub">We'll create a professional, formatted appeal letter tailored to your situation.</p>
          <div className="hnote"><strong>Your benefits can be appealed.</strong> Even if your claim was denied, many denials are overturned with a clear written appeal.</div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>What we'll create</div>
            {['A formal letter addressed to your state\'s appeals office', 'A clear statement of why you should qualify', 'Professional legal tone with proper formatting', "Reference to your state's unemployment law standards"].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--green)' }}><Chk /></div><div style={{ fontSize: 14, color: 'var(--text2)' }}>{item}</div>
              </div>
            ))}
          </div>
          {!answers.state && (
            <div className="ig">
              <label className="ilbl">Your state *</label>
              <div className="swrap">
                <select value={answers.state || ''} onChange={e => setAnswers(a => ({ ...a, state: e.target.value }))}>
                  <option value="">Select state…</option>
                  {STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
                <div className="sarr"><CvDown /></div>
              </div>
            </div>
          )}
          <div className="bnav">
            <button className="btn bp" disabled={!answers.state} onClick={() => go('appeal_form')} style={{ opacity: answers.state ? 1 : .4 }}>Start Building My Letter <Arr s={18} /></button>
          </div>
        </div>
      )}

      {/* ── APPEAL FORM ── */}
      {screen === 'appeal_form' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('appeal_intro')}><ArrL /> Back</button>
          <div className="sectit">Your Information</div>
          <p className="secsub">Fill in what you know — only your name is required.</p>
          {[['firstName', 'First Name *', 'text', 'Your first name'], ['lastName', 'Last Name *', 'text', 'Your last name'], ['claimId', 'Claim / Reference Number', 'text', 'From your denial letter'], ['ssn4', 'Last 4 of SSN', 'text', 'e.g. 1234']].map(([k, l, t, p]) => (
            <div className="ig" key={k}><label className="ilbl">{l}</label><input className="inp" type={t} placeholder={p} maxLength={k === 'ssn4' ? 4 : undefined} value={aData[k] || ''} onChange={e => setAData(a => ({ ...a, [k]: e.target.value }))} /></div>
          ))}
          {[['denialDate', 'Date of Denial Notice'], ['startDate', 'Employment Start Date'], ['endDate', 'Employment End Date']].map(([k, l]) => (
            <div className="ig" key={k}><label className="ilbl">{l}</label><input className="inp" type="date" value={aData[k] || ''} onChange={e => setAData(a => ({ ...a, [k]: e.target.value }))} /></div>
          ))}
          <div className="ig">
            <label className="ilbl">Were you laid off or fired?</label>
            <div className="chips">
              {[['yes', 'Laid off / Downsized'], ['no', 'Fired / Terminated']].map(([v, l]) => (
                <div key={v} className={`chip${aData.wasLayoff === v ? ' on' : ''}`} onClick={() => setAData(a => ({ ...a, wasLayoff: v }))}>{l}</div>
              ))}
            </div>
          </div>
          <div className="ig"><label className="ilbl">Reason given by employer (if any)</label><input className="inp" placeholder="e.g. performance, policy violation, budget cuts…" value={aData.termReason || ''} onChange={e => setAData(a => ({ ...a, termReason: e.target.value }))} /></div>
          <div className="ig"><label className="ilbl">Your explanation of what happened</label><textarea className="inp ta" placeholder="In your own words, explain the situation…" value={aData.userExplanation || ''} onChange={e => setAData(a => ({ ...a, userExplanation: e.target.value }))} /></div>
          <div className="bnav">
            <button className="btn bp" disabled={!aData.firstName || !aData.lastName} onClick={handleGenerateLetter} style={{ opacity: aData.firstName && aData.lastName ? 1 : .4 }}>Generate My Letter <Arr s={18} /></button>
          </div>
        </div>
      )}

      {/* ── APPEAL LETTER ── */}
      {screen === 'appeal_letter' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('appeal_form')}><ArrL /> Edit</button>
          <div className="sectit">Your Appeal Letter</div>
          <p className="secsub" style={{ marginBottom: 12 }}>Review, then copy, print, or email this letter.</p>
          {si && (
            <div className="dbox" style={{ marginBottom: 16 }}>
              <div className="dboxt">⏰ File by your deadline</div>
              <div className="dboxb">{si.name} allows <strong>{si.appealDays} days</strong> from your denial to appeal.<br /><br /><strong>Submit to:</strong> <a href={si.portal} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)' }}>{si.portal}</a> or call {si.phone}</div>
            </div>
          )}
          <div className="ltrbox">{letter}</div>
          {cpyOk && <div className="cpyok">✓ Copied to clipboard!</div>}
          <div className="ltract">
            <button className="btn bs bsm" onClick={handleCopy}><Cpy /> Copy Letter</button>
            <button className="btn bs bsm" onClick={handlePrint}><Prt /> Print / PDF</button>
          </div>
          <div className="hnote"><strong>Tips:</strong> Include supporting documents (pay stubs, emails, termination notice). Keep a copy for your records. Call your state office to confirm receipt.</div>
          <div className="bnav"><button className="btn bog" onClick={() => go('lawyer')}>⚖️ Also speak with a lawyer</button></div>
        </div>
      )}

      {/* ── LAWYER ── */}
      {screen === 'lawyer' && (
        <div className="scr" id="attorney-form">
          <button className="bkbtn" onClick={() => go(answers.state ? 'result' : 'home')}><ArrL /> Back</button>
          <div className="lhero"><div className="lhtit">You may have legal protections.</div><div className="lhsub">Employment law protects workers in many situations. A free consultation can help you understand your options.</div></div>

          {/* Attorney listing cards */}
          <AttorneyCards state={answers.state} />

          {/* Ad slot in sidebar position */}
          <AdSlot slot="attorney-sidebar" />

          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Or submit your own request</div>
          <div className="rlist">
            {[['🚫', 'Wrongfully terminated', 'Fired for illegal reasons: discrimination, retaliation, or whistleblowing'], ['👷', 'Misclassified as a contractor', 'Denied benefits because your employer called you independent contractor'], ['😤', 'Retaliated against', 'Fired after reporting harassment, safety issues, or illegal activity'], ['⚖️', 'Denied benefits unfairly', "Denied unemployment despite qualifying under your state's law"], ['📢', 'Discriminated against', 'Treated differently due to race, gender, age, disability, or religion']].map(([ico, t, d]) => (
              <div className="ritem" key={t}><div className="rico">{ico}</div><div className="rtxt"><strong>{t}</strong>{d}</div></div>
            ))}
          </div>
          {!lSent ? (
            <>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14 }}>Request a Free Consultation</div>
              <div className="hnote"><strong>No fees unless you win.</strong> Most employment lawyers work on contingency.</div>
              {[['name', 'Your Name *', 'text', 'Full name'], ['phone', 'Phone Number', 'tel', 'Best number to reach you'], ['email', 'Email Address', 'email', 'Your email']].map(([k, l, t, p]) => (
                <div className="ig" key={k}><label className="ilbl">{l}</label><input className="inp" type={t} placeholder={p} value={lForm[k]} onChange={e => setLForm(f => ({ ...f, [k]: e.target.value }))} /></div>
              ))}
              <div className="ig"><label className="ilbl">Briefly describe your situation</label><textarea className="inp ta" placeholder="What happened? When were you terminated? Any details…" value={lForm.situation} onChange={e => setLForm(f => ({ ...f, situation: e.target.value }))} /></div>
              <div className="bnav">
                <button className="btn bblu" disabled={!lForm.name} style={{ opacity: lForm.name ? 1 : .4 }} onClick={handleLawyerSubmit}>Request Free Consultation <Arr s={18} /></button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div className="sectit">Request Submitted</div>
              <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>An employment attorney will reach out within 1–2 business days. Most consultations are completely free.</p>
              <div className="hnote">While you wait, keep records of everything: emails, texts, performance reviews, and notes on conversations with your employer.</div>
              <button className="btn bog" onClick={() => go('home')}>Back to Home</button>
            </div>
          )}
        </div>
      )}

      {/* ── PRIVACY ── */}
      {screen === 'privacy' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go(prevScreen || 'home')}><ArrL /> Back</button>
          <div className="sectit">Privacy Policy</div>
          <p className="peff">Effective: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {[
            ['Who we are', 'BenefitsPath is a free service that helps people navigate unemployment benefits in the United States. We are not a government agency, law firm, or insurance provider.'],
            ['What we do not do', null],
          ].slice(0, 1).map(([h, p]) => (
            <div className="psec" key={h}><h3>{h}</h3><p>{p}</p></div>
          ))}
          <div className="psec"><h3>What we do not do</h3><ul><li>We do not sell your personal information to third parties</li><li>We do not share your data with advertisers</li><li>We do not use your information for targeted advertising</li><li>We do not store your SSN digits beyond your session</li></ul></div>
          <div className="psec"><h3>Data storage</h3><p>Responses may be stored in a secure database accessible only to the BenefitsPath team, used solely for service improvement and quality review.</p></div>
          <div className="psec"><h3>Contact</h3><p>Questions? Email <strong>privacy@benefitspath.org</strong></p></div>
          <div className="bnav"><button className="btn bs" onClick={() => go(prevScreen || 'home')}>← Back</button></div>
        </div>
      )}
    </div>
  )
}
