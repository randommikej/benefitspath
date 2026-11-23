'use client'
import { useState } from 'react'
import { STATES } from '../lib/data'
import { STATES_ES } from '../lib/statesEs'

const T = {
  en: {
    title: 'Never miss a weekly certification',
    sub: "Missing your weekly certification is one of the most common reasons payments stop. We'll email you a reminder on the day you certify, with a link to your state's portal. Free, and you can stop anytime.",
    email: 'Email address', state: 'State', day: 'I certify on',
    chooseState: 'Choose your state', btn: 'Remind me every week', sending: 'Saving…',
    done: (d) => `You're set. Check your inbox for a confirmation. We'll remind you every ${d}.`,
    err: "That didn't go through. Check your email address and try again.",
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    fine: 'We only use your email for these reminders.',
  },
  es: {
    title: 'No olvide nunca su certificación semanal',
    sub: 'Olvidar la certificación semanal es una de las razones más comunes por las que se detienen los pagos. Le enviaremos un recordatorio por correo el día que certifica, con el enlace al portal de su estado. Es gratis y puede cancelar cuando quiera.',
    email: 'Correo electrónico', state: 'Estado', day: 'Certifico los',
    chooseState: 'Elija su estado', btn: 'Recordarme cada semana', sending: 'Guardando…',
    done: (d) => `Listo. Revise su correo para la confirmación. Le recordaremos cada ${d}.`,
    err: 'No se pudo guardar. Revise su correo electrónico e intente de nuevo.',
    days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    fine: 'Solo usamos su correo para estos recordatorios.',
  },
}

export default function CertReminderSignup({ lang = 'en', defaultState = '', source = '' }) {
  const t = T[lang] || T.en
  const [email, setEmail] = useState('')
  const [state, setState] = useState(defaultState)
  const [weekday, setWeekday] = useState('')
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle')

  const ready = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) && state && weekday !== ''
  const stateList = lang === 'es'
    ? STATES.map(s => ({ ...s, name: STATES_ES[s.slug]?.name || s.name })).sort((a, b) => a.name.localeCompare(b.name, 'es'))
    : STATES

  const submit = async (e) => {
    e.preventDefault()
    if (!ready || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), state, weekday: Number(weekday), lang, source, website: hp }),
      })
      const j = await res.json().catch(() => ({}))
      setStatus(res.ok && j.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  const box = { background: '#fff', border: '1px solid #e5e0d8', borderRadius: 14, padding: '20px 20px 18px', margin: '32px 0' }
  if (status === 'done') {
    return <div style={box} role="status"><strong style={{ color: '#2d6a4f' }}>✓</strong> {t.done(t.days[Number(weekday)])}</div>
  }

  return (
    <form style={box} onSubmit={submit} aria-labelledby={`crs-${source}`}>
      <div id={`crs-${source}`} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, lineHeight: 1.2, marginBottom: 6, color: '#1a1714' }}>{t.title}</div>
      <p style={{ fontSize: 14, color: '#5a524a', lineHeight: 1.6, margin: '0 0 14px' }}>{t.sub}</p>
      <div className="ig">
        <label className="ilbl" htmlFor={`crs-email-${source}`}>{t.email}</label>
        <input id={`crs-email-${source}`} className="inp" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="ig">
          <label className="ilbl" htmlFor={`crs-state-${source}`}>{t.state}</label>
          <select id={`crs-state-${source}`} className="inp" value={state} onChange={e => setState(e.target.value)}>
            <option value="">{t.chooseState}</option>
            {stateList.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
        </div>
        <div className="ig">
          <label className="ilbl" htmlFor={`crs-day-${source}`}>{t.day}</label>
          <select id={`crs-day-${source}`} className="inp" value={weekday} onChange={e => setWeekday(e.target.value)}>
            <option value="">—</option>
            {t.days.map((d, i) => <option key={d} value={i}>{d}</option>)}
          </select>
        </div>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={e => setHp(e.target.value)} style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} aria-hidden="true" />
      <button type="submit" className="btn bp" disabled={!ready || status === 'sending'} style={{ opacity: ready ? 1 : .45 }}>
        {status === 'sending' ? t.sending : t.btn}
      </button>
      {status === 'error' && <p role="alert" style={{ fontSize: 13, color: '#b91c1c', margin: '10px 0 0' }}>{t.err}</p>}
      <p style={{ fontSize: 12, color: '#8a8078', margin: '10px 0 0' }}>{t.fine}</p>
    </form>
  )
}

