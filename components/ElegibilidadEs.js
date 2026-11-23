'use client'
// Spanish eligibility check (/es). Same questions and scoring as the English flow in
// BenefitsApp.js (computeEligibility in lib/data.js), with Spanish text.
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { STATE_DATA, STATES, computeEligibility } from '../lib/data'
import { STATES_ES } from '../lib/statesEs'
import CertReminderSignup from './CertReminderSignup'

const Arr = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
const ArrL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
const Shld = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
const Ext = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
const CvDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>

const LIKELIHOOD = {
  High: ['Alta', 'Es muy probable que califique para beneficios de desempleo. A la mayoría de las personas en su situación se los aprueban.'],
  Moderate: ['Moderada', 'Es posible que califique. Su situación tiene factores que normalmente llevan a una aprobación, aunque su estado podría revisar su caso.'],
  Lower: ['Más baja', 'Calificar puede ser más difícil en su situación, pero vale la pena solicitar. Muchas personas en situaciones parecidas sí reciben beneficios.'],
  Uncertain: ['Incierta', 'Calificar puede ser difícil, pero aun así debería solicitar. Cada caso se revisa por separado y los resultados varían.'],
}

const REASONS = [
  { v: 'layoff', i: '📦', l: 'Me despidieron por recorte (layoff)', d: 'El empleador redujo personal o eliminó mi puesto' },
  { v: 'company_closed', i: '🏢', l: 'La empresa cerró o hizo recortes', d: 'El negocio cerró o hubo grandes recortes' },
  { v: 'reduction', i: '✂️', l: 'Me redujeron mucho las horas', d: 'Pasé a medio tiempo o me cortaron muchas horas' },
  { v: 'contract_ended', i: '📋', l: 'Terminó mi contrato o trabajo temporal', d: 'No renovaron mi asignación o contrato' },
  { v: 'fired', i: '⚠️', l: 'Me despidieron (por una razón)', d: 'El empleador terminó mi empleo' },
  { v: 'quit_good_cause', i: '🚪', l: 'Renuncié con una buena razón', d: 'Condiciones inseguras, acoso o un cambio grande en el trabajo' },
  { v: 'quit', i: '👋', l: 'Renuncié por decisión propia', d: 'Yo decidí irme' },
]
const LENGTHS = [{ v: 'under3', l: 'Menos de 3 meses', i: '🌱' }, { v: '3to6', l: '3 a 6 meses', i: '📅' }, { v: '6to12', l: '6 a 12 meses', i: '🗓️' }, { v: '1to2', l: '1 a 2 años', i: '⏳' }, { v: '2plus', l: 'Más de 2 años', i: '🏆' }]
const APPLIED = [{ v: 'no', i: '❌', l: 'No, todavía no he solicitado' }, { v: 'yes_pending', i: '⏳', l: 'Sí, y sigue pendiente' }, { v: 'yes_approved', i: '✅', l: 'Sí, y me lo aprobaron' }, { v: 'yes_denied', i: '🚫', l: 'Sí, y me lo negaron' }]

async function saveLead(payload) {
  try {
    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  } catch { /* the result still shows if this fails */ }
}

export default function ElegibilidadEs() {
  const [screen, setScreen] = useState('home')
  const [a, setA] = useState({})
  const go = (s) => { setScreen(s); window.scrollTo(0, 0) }

  // /es?estado=NV (from a Spanish state guide) preselects the state.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('estado')
    if (code && STATE_DATA[code.toUpperCase()]) setA(x => ({ ...x, state: code.toUpperCase() }))
  }, [])

  const si = a.state ? STATE_DATA[a.state] : null
  const nameEs = si ? (STATES_ES[si.slug]?.name || si.name) : ''
  const elig = a.state && a.endReason && a.employmentLength ? computeEligibility(a) : null
  const steps = { home: 0, state: 1, situation: 2, employment: 3, applied: 4, result: 5 }
  const stateList = STATES.map(s => ({ ...s, name: STATES_ES[s.slug]?.name || s.name })).sort((x, y) => x.name.localeCompare(y.name, 'es'))

  const finish = () => {
    const e = computeEligibility(a)
    saveLead({ type: 'eligibility_anonymous', state: a.state, endReason: a.endReason, employmentLength: a.employmentLength, applicationStatus: a.applicationStatus, eligibilityScore: e.score, eligibilityLikelihood: e.likelihood, lang: 'es' })
    go('result')
  }

  const Options = ({ field, list, next }) => (
    <>
      <div className="opts">
        {list.map(o => (
          <div key={o.v} role="button" tabIndex={0} className={`opt${a[field] === o.v ? ' sel' : ''}`}
            onClick={() => setA(x => ({ ...x, [field]: o.v }))}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setA(x => ({ ...x, [field]: o.v }))}>
            <div className="oico">{o.i}</div>
            <div className="otxt"><div className="olbl">{o.l}</div>{o.d && <div className="odsc">{o.d}</div>}</div>
            <div className="ochk" />
          </div>
        ))}
      </div>
      <div className="bnav">
        <button className="btn bp" disabled={!a[field]} onClick={next} style={{ opacity: a[field] ? 1 : .4 }}>Continuar <Arr s={18} /></button>
      </div>
    </>
  )

  return (
    <div className="app" lang="es">
      <header className="hdr">
        <Link href="/es" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="lmark"><Shld /></div>
          <span className="ltxt">BenefitsPath</span>
        </Link>
        <nav className="topnav-links">
          <a href="/" className="topnav-link" hrefLang="en" lang="en">English</a>
          <a href="/legal-help" className="topnav-link">Ayuda legal</a>
          <span className="fbadge">Gratis</span>
        </nav>
      </header>
      <div className="pbar"><div className="pfill" style={{ width: `${((steps[screen] || 0) / 5) * 100}%` }} /></div>

      {screen === 'home' && (
        <div className="scr">
          <div style={{ padding: '12px 0 28px' }}>
            <div className="eyebrow">Guía de beneficios</div>
            <h1 className="htitle">¿Perdió su trabajo?<br />Le ayudamos a saber <em>qué hacer ahora.</em></h1>
            <p className="hsub">Conteste unas preguntas rápidas y vea si probablemente califica para beneficios de desempleo en su estado, cuánto podría recibir y cuáles son sus próximos pasos. Es completamente gratis.</p>
            <div className="hfeats">
              {[['Vea si califica', 'Toma unos 2 minutos'], ['Enlaces oficiales de su estado', 'Directo al portal del gobierno'], ['Plazos importantes', 'Para solicitar y para apelar'], ['Recordatorios semanales', 'Para no perder un pago']].map(([l, d], i) => (
                <div className="hfeat" key={l}><span className="hnum">{String(i + 1).padStart(2, '0')}</span><div><strong>{l}</strong><span className="hfd">{d}</span></div></div>
              ))}
            </div>
            <button className="btn bp" onClick={() => go('state')}>Verificar mis beneficios <Arr s={18} /></button>
          </div>
          <div className="fbanner"><Shld /><p className="fbtxt">Este servicio no cuesta nada. BenefitsPath no es una agencia del gobierno.</p></div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <div className="tlbl" style={{ marginBottom: 12 }}>Guías en español</div>
            <Link href="/es/audiencia-de-apelacion" style={{ display: 'block', fontSize: 14, color: 'var(--green)', marginBottom: 8, textDecoration: 'none' }}>→ Audiencia de apelación de desempleo: preguntas y qué llevar</Link>
            {[['california', 'California'], ['texas', 'Texas'], ['florida', 'Florida'], ['new-york', 'Nueva York'], ['illinois', 'Illinois'], ['arizona', 'Arizona']].map(([slug, n]) => (
              <Link key={slug} href={`/es/desempleo/${slug}`} style={{ display: 'block', fontSize: 14, color: 'var(--green)', marginBottom: 8, textDecoration: 'none' }}>→ Desempleo en {n}</Link>
            ))}
          </div>
        </div>
      )}

      {screen === 'state' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('home')}><ArrL /> Atrás</button>
          <div className="qlbl">Paso 1 de 4</div>
          <h2 className="qtitle">¿En qué estado trabajaba?</h2>
          <p className="qsub">Así encontramos las reglas y los enlaces de su estado.</p>
          <div className="swrap">
            <select aria-label="Estado" value={a.state || ''} onChange={e => setA(x => ({ ...x, state: e.target.value }))}>
              <option value="">Elija su estado…</option>
              {stateList.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
            <div className="sarr"><CvDown /></div>
          </div>
          {si && (
            <div className="ic" style={{ marginBottom: 20 }}>
              <div className="ict">Seleccionado</div>
              <div className="icv">{nameEs}</div>
              <div className="ics">Máximo semanal: <strong>${si.weeklyMax.toLocaleString('en-US')}</strong> · Hasta <strong>{STATES_ES[si.slug]?.weeks || si.avgWeeks} semanas</strong></div>
            </div>
          )}
          <div className="bnav">
            <button className="btn bp" disabled={!a.state} onClick={() => go('situation')} style={{ opacity: a.state ? 1 : .4 }}>Continuar <Arr s={18} /></button>
          </div>
        </div>
      )}

      {screen === 'situation' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('state')}><ArrL /> Atrás</button>
          <div className="qlbl">Paso 2 de 4</div>
          <h2 className="qtitle">¿Cómo terminó su trabajo?</h2>
          <p className="qsub">Esto es lo que más influye en si califica.</p>
          <Options field="endReason" list={REASONS} next={() => go('employment')} />
        </div>
      )}

      {screen === 'employment' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('situation')}><ArrL /> Atrás</button>
          <div className="qlbl">Paso 3 de 4</div>
          <h2 className="qtitle">¿Cuánto tiempo estuvo en ese trabajo?</h2>
          <p className="qsub">La mayoría de los estados piden un mínimo de historial de trabajo.</p>
          <Options field="employmentLength" list={LENGTHS} next={() => go('applied')} />
        </div>
      )}

      {screen === 'applied' && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('employment')}><ArrL /> Atrás</button>
          <div className="qlbl">Paso 4 de 4</div>
          <h2 className="qtitle">¿Ya solicitó el desempleo?</h2>
          <p className="qsub">Así le damos los pasos correctos.</p>
          <Options field="applicationStatus" list={APPLIED} next={finish} />
        </div>
      )}

      {screen === 'result' && elig && si && (
        <div className="scr">
          <button className="bkbtn" onClick={() => go('applied')}><ArrL /> Atrás</button>
          <div className="sectit">Su resultado</div>
          <p className="secsub">Según sus respuestas para <strong>{nameEs}</strong></p>
          <div className="rcrd">
            <div className="rmeter">
              <div className="rcirc" style={{ background: elig.color + '22', border: `3px solid ${elig.color}` }}>
                <div className="rpct" style={{ color: elig.color }}>{elig.score}%</div>
                <div className="rlbl2" style={{ color: elig.color }}>probable</div>
              </div>
              <div>
                <div className="rlik" style={{ color: elig.color }}>Probabilidad {LIKELIHOOD[elig.likelihood][0].toLowerCase()}</div>
                <div className="rlsub">de calificar para beneficios</div>
              </div>
            </div>
            <div className="rmsg">{LIKELIHOOD[elig.likelihood][1]}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <div className="ic" style={{ margin: 0 }}><div className="ict">Máximo semanal</div><div className="icv">${si.weeklyMax.toLocaleString('en-US')}</div><div className="ics">por semana</div></div>
            <div className="ic" style={{ margin: 0 }}><div className="ict">Hasta</div><div className="icv">{STATES_ES[si.slug]?.weeks || si.avgWeeks} sem.</div><div className="ics">de beneficios</div></div>
          </div>
          {a.applicationStatus === 'yes_denied' && (
            <div className="dbox"><div className="dboxt">⚠️ Se lo negaron, pero puede apelar</div><div className="dboxb">Tiene <strong>{si.appealDays} días</strong> desde la fecha de la negación para apelar. No espere.</div></div>
          )}

          <div style={{ marginBottom: 24 }}>
            <div className="sectit" style={{ fontSize: 18 }}>Sus próximos pasos</div>
            <div className="steps" style={{ marginTop: 14 }}>
              {(a.applicationStatus === 'no' ? [
                ['Solicite en línea hoy', `Entre al portal oficial de ${nameEs}. Toma unos 20 minutos. Si necesita ayuda en español, llame al ${si.phone} y pida un intérprete.`],
                ['Tenga su información lista', 'Nombre y dirección del empleador, fechas de trabajo y la razón por la que terminó.'],
                ['Certifique cada semana', 'Debe certificar cada semana para seguir recibiendo pagos. Abajo puede pedir un recordatorio.'],
              ] : a.applicationStatus === 'yes_denied' ? [
                ['Apele antes del plazo', `Tiene ${si.appealDays} días desde la negación. Presente la apelación por escrito aunque todavía esté juntando documentos.`],
                ['Prepárese para la audiencia', 'Lea nuestra guía en español sobre qué le van a preguntar y qué documentos llevar.'],
                ['Considere ayuda legal', 'Si cree que se lo negaron injustamente, un abogado laboral o una oficina de ayuda legal gratuita puede ayudarle.'],
              ] : [
                ['Revise el estado de su reclamo', 'Entre al portal de su estado para ver novedades o pedidos de información.'],
                ['Certifique cada semana', 'Siga certificando cada semana para seguir recibiendo pagos.'],
                ['Reporte cualquier ingreso', 'Reporte lo que gane en trabajos de medio tiempo cada vez que certifique.'],
              ]).map(([t, d], i) => (
                <div className="step" key={i}><div className="snum">{i + 1}</div><div className="sbdy"><div className="stit">{t}</div><div className="sdsc">{d}</div></div></div>
              ))}
            </div>
          </div>

          <a className="plink" href={si.portal} target="_blank" rel="noopener noreferrer">
            <div className="plink-l"><div><div style={{ fontWeight: 600, fontSize: 14 }}>Portal oficial de {nameEs}</div><div style={{ fontSize: 12, color: 'var(--text3)' }}>Sitio del gobierno (puede estar en inglés)</div></div></div>
            <Ext />
          </a>
          <div className="bnav">
            <Link className="btn bs" href={`/es/desempleo/${si.slug}`}>📄 Guía completa de {nameEs}</Link>
            {a.applicationStatus === 'yes_denied' && <Link className="btn bamb" href="/es/audiencia-de-apelacion">🗂️ Guía de la audiencia de apelación</Link>}
            {(a.endReason === 'fired' || a.endReason === 'quit_good_cause' || a.applicationStatus === 'yes_denied') && <Link className="btn bog" href={`/legal-help/${si.slug}`}>⚖️ Buscar ayuda legal (en inglés)</Link>}
          </div>

          <CertReminderSignup lang="es" defaultState={a.state} source="es-result" />
        </div>
      )}
    </div>
  )
}
