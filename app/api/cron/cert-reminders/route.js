import { supabaseAdmin } from '../../../../lib/supabase'
import { Resend } from 'resend'
import { FROM, REPLY_TO, reminderEmail, unsubscribeHeaders, easternWeekday } from '../../../../lib/certReminders'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Daily at 14:00 UTC (vercel.json). Sends the weekly certification reminder to everyone
// whose chosen day is today. Vercel sends "Authorization: Bearer $CRON_SECRET".
export async function GET(request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 })
  }
  if (!process.env.RESEND_API_KEY) return Response.json({ ok: false, error: 'no_resend_key' }, { status: 500 })

  const weekday = easternWeekday()
  const cutoff = new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() // never twice in one day
  const { data: rows, error } = await supabaseAdmin
    .from('cert_reminders')
    .select('id, email, state, weekday, lang, token, send_count')
    .eq('active', true)
    .eq('weekday', weekday)
    .or(`last_sent_at.is.null,last_sent_at.lt.${cutoff}`)
    .limit(2000)
  if (error) { console.error('cert cron select', error); return Response.json({ ok: false, error: 'db' }, { status: 500 }) }

  const resend = new Resend(process.env.RESEND_API_KEY)
  let sent = 0
  let failed = 0
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100)
    const msgs = []
    const ids = []
    for (const r of chunk) {
      const m = reminderEmail(r)
      if (!m) continue
      msgs.push({ from: FROM, reply_to: REPLY_TO, to: r.email, subject: m.subject, html: m.html, headers: unsubscribeHeaders(r.token) })
      ids.push(r)
    }
    if (!msgs.length) continue
    const { error: sendErr } = await resend.batch.send(msgs)
    if (sendErr) { console.error('cert cron send', sendErr); failed += msgs.length; continue }
    const now = new Date().toISOString()
    await Promise.all(ids.map(r => supabaseAdmin.from('cert_reminders')
      .update({ last_sent_at: now, send_count: (r.send_count || 0) + 1 }).eq('id', r.id)))
    sent += msgs.length
  }

  return Response.json({ ok: true, weekday, due: rows.length, sent, failed })
}
