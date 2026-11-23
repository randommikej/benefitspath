import { supabaseAdmin } from '../../../../lib/supabase'
export const dynamic = 'force-dynamic'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function unsubscribe(token) {
  if (!UUID_RE.test(token || '')) return { ok: false, lang: 'en' }
  const { data, error } = await supabaseAdmin
    .from('cert_reminders')
    .update({ active: false, unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('token', token)
    .select('lang')
    .maybeSingle()
  if (error) console.error('unsubscribe', error)
  return { ok: !error && !!data, lang: data?.lang || 'en' }
}

function page(ok, lang) {
  const es = lang === 'es'
  const title = ok ? (es ? 'Recordatorios cancelados' : 'Reminders stopped') : (es ? 'Enlace no válido' : 'Link not valid')
  const msg = ok
    ? (es ? 'Ya no recibirá recordatorios semanales de BenefitsPath. Puede volver a inscribirse cuando quiera.' : "You won't get any more weekly reminders from BenefitsPath. You can sign up again any time.")
    : (es ? 'No encontramos esa inscripción. Escríbanos a support@benefitspath.org y la cancelamos.' : "We couldn't find that signup. Email support@benefitspath.org and we'll remove it.")
  const home = es ? '/es' : '/'
  const back = es ? 'Volver a BenefitsPath' : 'Back to BenefitsPath'
  return `<!doctype html><html lang="${es ? 'es' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="margin:0;background:#f7f5f0;font-family:Arial,Helvetica,sans-serif;color:#1a1714"><main style="max-width:480px;margin:80px auto;padding:0 20px;text-align:center">
<h1 style="font-weight:normal;font-size:28px">${title}</h1><p style="line-height:1.6;color:#5a524a">${msg}</p>
<p><a href="${home}" style="color:#2d6a4f">${back}</a></p></main></body></html>`
}

// GET: link in the email footer. POST: one-click unsubscribe from the mail app (RFC 8058).
export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token')
  const { ok, lang } = await unsubscribe(token)
  return new Response(page(ok, lang), { status: ok ? 200 : 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

export async function POST(request) {
  const token = new URL(request.url).searchParams.get('token')
  const { ok } = await unsubscribe(token)
  return Response.json({ ok }, { status: ok ? 200 : 404 })
}
