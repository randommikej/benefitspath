// Weekly certification reminders: shared email content for the signup route and the daily cron.
import { STATE_DATA } from './data'
import { STATES_ES } from './statesEs'

export const SITE = 'https://www.benefitspath.org'
export const FROM = 'BenefitsPath <noreply@benefitspath.org>'
export const REPLY_TO = 'support@benefitspath.org'

export const DAYS = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
}

export function unsubscribeUrl(token) {
  return `${SITE}/api/reminders/unsubscribe?token=${encodeURIComponent(token)}`
}

function stateNames(code, lang) {
  const s = STATE_DATA[code]
  if (!s) return null
  const name = lang === 'es' ? (STATES_ES[s.slug]?.name || s.name) : s.name
  const guide = lang === 'es' ? `${SITE}/es/desempleo/${s.slug}` : `${SITE}/unemployment-benefits-${s.slug}`
  return { ...s, displayName: name, guide }
}

const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

function shell({ lang, preheader, body, token }) {
  const unsub = unsubscribeUrl(token)
  const footer = lang === 'es'
    ? `Recibe este correo porque se inscribió para recordatorios semanales en BenefitsPath. BenefitsPath no es una agencia del gobierno. <a href="${unsub}" style="color:#5a524a">Cancelar recordatorios</a>`
    : `You're getting this because you signed up for weekly reminders on BenefitsPath. BenefitsPath is not a government agency. <a href="${unsub}" style="color:#5a524a">Stop these reminders</a>`
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#f7f5f0;font-family:Arial,Helvetica,sans-serif;color:#1a1714">
<span style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e5e0d8;border-radius:14px">
<tr><td style="padding:22px 26px 8px;font-size:15px;font-weight:bold;color:#2d6a4f">BenefitsPath</td></tr>
<tr><td style="padding:4px 26px 24px;font-size:15px;line-height:1.6">${body}</td></tr>
</table>
<p style="max-width:520px;font-size:12px;line-height:1.5;color:#8a8078;margin:14px auto 0">${footer}</p>
</td></tr></table></body></html>`
}

function button(href, label) {
  return `<p style="margin:20px 0"><a href="${href}" style="display:inline-block;background:#2d6a4f;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px">${esc(label)}</a></p>`
}

// The weekly reminder itself.
export function reminderEmail({ state, weekday, lang = 'en', token }) {
  const s = stateNames(state, lang)
  if (!s) return null
  const day = DAYS[lang][weekday]
  if (lang === 'es') {
    const subject = `Recordatorio: certifique hoy sus beneficios de desempleo de ${s.displayName}`
    const body = `<h1 style="font-size:21px;margin:6px 0 10px;font-weight:normal">Hoy es ${esc(day)}: es hora de certificar</h1>
<p>Si sigue recibiendo beneficios de desempleo de ${esc(s.displayName)}, presente su certificación semanal hoy. Si no la presenta, sus pagos pueden detenerse.</p>
${button(s.portal, `Ir al portal de ${s.displayName}`)}
<p style="margin:0 0 6px"><strong>Antes de enviar:</strong></p>
<ul style="margin:0 0 14px;padding-left:20px">
<li>Reporte todo lo que ganó esta semana, aunque sea poco o aún no le hayan pagado.</li>
<li>Tenga a mano su registro de búsqueda de empleo.</li>
<li>Conteste con la verdad si estuvo disponible y en condiciones de trabajar.</li>
</ul>
<p style="font-size:14px;color:#5a524a">¿Problemas o una negación? Teléfono de ${esc(s.displayName)}: ${esc(s.phone)}. <a href="${s.guide}" style="color:#2d6a4f">Guía de ${esc(s.displayName)}</a></p>
<p style="font-size:14px;color:#5a524a">¿Ya consiguió trabajo o terminó su reclamo? Puede cancelar estos recordatorios abajo.</p>`
    return { subject, html: shell({ lang, preheader: `No olvide su certificación semanal de ${s.displayName}.`, body, token }) }
  }
  const subject = `Reminder: certify for your ${s.displayName} unemployment benefits today`
  const body = `<h1 style="font-size:21px;margin:6px 0 10px;font-weight:normal">It's ${esc(day)}: time to certify</h1>
<p>If you're still collecting ${esc(s.displayName)} unemployment, file your weekly certification today. Missing it can stop your payments.</p>
${button(s.portal, `Go to the ${s.displayName} portal`)}
<p style="margin:0 0 6px"><strong>Before you submit:</strong></p>
<ul style="margin:0 0 14px;padding-left:20px">
<li>Report everything you earned this week, even small amounts or pay you haven't received yet.</li>
<li>Have your work search log ready.</li>
<li>Answer honestly about whether you were able and available to work.</li>
</ul>
<p style="font-size:14px;color:#5a524a">Problems or a denial? ${esc(s.displayName)} claims line: ${esc(s.phone)}. <a href="${s.guide}" style="color:#2d6a4f">${esc(s.displayName)} guide</a></p>
<p style="font-size:14px;color:#5a524a">Found a job or finished your claim? You can stop these reminders below.</p>`
  return { subject, html: shell({ lang, preheader: `Don't miss your weekly ${s.displayName} certification.`, body, token }) }
}

// Sent once, right after signup.
export function welcomeEmail({ state, weekday, lang = 'en', token }) {
  const s = stateNames(state, lang)
  if (!s) return null
  const day = DAYS[lang][weekday]
  if (lang === 'es') {
    const subject = 'Sus recordatorios semanales están activados'
    const body = `<h1 style="font-size:21px;margin:6px 0 10px;font-weight:normal">Listo. Le recordaremos cada ${esc(day)}.</h1>
<p>Cada ${esc(day)} por la mañana le enviaremos un recordatorio para presentar su certificación semanal de ${esc(s.displayName)}, con el enlace al portal oficial.</p>
${button(s.portal, `Portal de ${s.displayName}`)}
<p style="font-size:14px;color:#5a524a">¿No se inscribió usted? Ignore este correo o cancele con el enlace de abajo.</p>`
    return { subject, html: shell({ lang, preheader: `Recordatorios cada ${day} para ${s.displayName}.`, body, token }) }
  }
  const subject = 'Your weekly certification reminders are on'
  const body = `<h1 style="font-size:21px;margin:6px 0 10px;font-weight:normal">You're set. We'll remind you every ${esc(day)}.</h1>
<p>Every ${esc(day)} morning we'll email you a reminder to file your weekly ${esc(s.displayName)} certification, with a link to the official portal.</p>
${button(s.portal, `${s.displayName} portal`)}
<p style="font-size:14px;color:#5a524a">Didn't sign up? Ignore this email or use the link below to stop reminders.</p>`
  return { subject, html: shell({ lang, preheader: `Reminders every ${day} for ${s.displayName}.`, body, token }) }
}

export function unsubscribeHeaders(token) {
  return {
    'List-Unsubscribe': `<${unsubscribeUrl(token)}>, <mailto:${REPLY_TO}?subject=unsubscribe>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  }
}

// Day of week in US Eastern time (the cron runs at 14:00 UTC, which is the same calendar
// day in every US time zone).
export function easternWeekday(date = new Date()) {
  const name = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/New_York' }).format(date)
  return DAYS.en.indexOf(name)
}
