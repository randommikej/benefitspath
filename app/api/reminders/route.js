import { supabaseAdmin } from '../../../lib/supabase'
import { STATE_DATA } from '../../../lib/data'
import { Resend } from 'resend'
import { FROM, REPLY_TO, welcomeEmail, unsubscribeHeaders } from '../../../lib/certReminders'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// POST /api/reminders — sign up (or update) weekly certification reminders.
export async function POST(request) {
  let body
  try { body = await request.json() } catch { return Response.json({ ok: false, error: 'bad_json' }, { status: 400 }) }

  const email = String(body.email || '').trim().toLowerCase()
  const state = String(body.state || '').trim().toUpperCase()
  const weekday = Number(body.weekday)
  const lang = body.lang === 'es' ? 'es' : 'en'
  const source = String(body.source || '').slice(0, 80) || null
  if (body.website) return Response.json({ ok: true }) // honeypot field: bots fill it, people don't

  if (!EMAIL_RE.test(email) || email.length > 254) return Response.json({ ok: false, error: 'email' }, { status: 400 })
  if (!STATE_DATA[state]) return Response.json({ ok: false, error: 'state' }, { status: 400 })
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) return Response.json({ ok: false, error: 'weekday' }, { status: 400 })

  const db = supabaseAdmin
  const { data: existing, error: selErr } = await db.from('cert_reminders').select('id, token').eq('email', email).maybeSingle()
  if (selErr) { console.error('cert_reminders select', selErr); return Response.json({ ok: false, error: 'db' }, { status: 500 }) }

  let token
  if (existing) {
    const { error } = await db.from('cert_reminders')
      .update({ state, weekday, lang, active: true, unsubscribed_at: null, updated_at: new Date().toISOString(), source })
      .eq('id', existing.id)
    if (error) { console.error('cert_reminders update', error); return Response.json({ ok: false, error: 'db' }, { status: 500 }) }
    token = existing.token
  } else {
    const { data, error } = await db.from('cert_reminders')
      .insert({ email, state, weekday, lang, source })
      .select('token').single()
    if (error) { console.error('cert_reminders insert', error); return Response.json({ ok: false, error: 'db' }, { status: 500 }) }
    token = data.token
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const msg = welcomeEmail({ state, weekday, lang, token })
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({ from: FROM, reply_to: REPLY_TO, to: email, subject: msg.subject, html: msg.html, headers: unsubscribeHeaders(token) })
    } catch (err) { console.error('welcome email', err) }
  }

  return Response.json({ ok: true })
}
