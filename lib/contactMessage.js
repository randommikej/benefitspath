// Builds the plain-language message a user sends (from their own email app) to a legal aid
// office, referral service or attorney. Nothing here is sent by BenefitsPath.

export const END_REASON_LABELS = {
  layoff: 'Laid off',
  company_closed: 'Company closed or downsized',
  reduction: 'Hours reduced significantly',
  contract_ended: 'Contract or temp job ended',
  fired: 'Fired or terminated',
  quit_good_cause: 'Quit with good cause',
  quit: 'Quit voluntarily',
}

export const EMPLOYMENT_LENGTH_LABELS = {
  under3: 'Less than 3 months',
  '3to6': '3–6 months',
  '6to12': '6–12 months',
  '1to2': '1–2 years',
  '2plus': 'More than 2 years',
}

export const APPLICATION_STATUS_LABELS = {
  no: "I haven't applied yet",
  yes_pending: 'I applied and my claim is still pending',
  yes_approved: 'I applied and was approved',
  yes_denied: 'I applied and was denied',
}

const MAX_SITUATION = 900

export function buildContactMessage({ recipientName, stateName, details = {}, answers = {}, appeal = {}, eligibility }) {
  const name = (details.name || '').trim()
  const lines = []

  lines.push(`Hello${recipientName ? ` ${recipientName}` : ''},`)
  lines.push('')
  lines.push(
    `I found you through BenefitsPath.org, a free website that helps people understand unemployment benefits. ` +
    `BenefitsPath is not a law firm and is not connected to your office. It listed you as a place that may help ` +
    `people in ${stateName || 'my state'} with unemployment benefit problems, so I'm reaching out directly.`
  )
  lines.push('')
  lines.push('A quick summary of my situation:')
  if (stateName) lines.push(`- State: ${stateName}`)
  if (answers.endReason) lines.push(`- How my job ended: ${END_REASON_LABELS[answers.endReason] || answers.endReason}`)
  if (answers.employmentLength) lines.push(`- How long I worked there: ${EMPLOYMENT_LENGTH_LABELS[answers.employmentLength] || answers.employmentLength}`)
  if (answers.applicationStatus) lines.push(`- Unemployment claim: ${APPLICATION_STATUS_LABELS[answers.applicationStatus] || answers.applicationStatus}`)
  if (appeal.denialDate) lines.push(`- Date of denial notice: ${appeal.denialDate}`)
  if (appeal.claimId) lines.push(`- Claim ID: ${appeal.claimId}`)
  if (eligibility?.likelihood) lines.push(`- BenefitsPath's general eligibility estimate: ${eligibility.likelihood} (an automated estimate, not legal advice)`)

  const situation = (details.situation || '').trim()
  if (situation) {
    lines.push('')
    lines.push('What happened, in my own words:')
    lines.push(situation.length > MAX_SITUATION ? situation.slice(0, MAX_SITUATION) + '…' : situation)
  }

  lines.push('')
  lines.push(
    'Could you tell me whether you can help with this (or who can), whether there is any cost for a first ' +
    'conversation, and what I should do next? If there is an appeal deadline, I want to make sure I don\'t miss it.'
  )
  lines.push('')
  lines.push('Thank you,')
  lines.push(name || '[Your name]')
  if (details.phone) lines.push(`Phone: ${details.phone}`)
  if (details.email) lines.push(`Email: ${details.email}`)

  return lines.join('\n')
}

export function buildSubject(stateName) {
  return `Unemployment benefits help request${stateName ? ` — ${stateName}` : ''} (found via BenefitsPath.org)`
}

export function mailtoHref(email, subject, body) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function telHref(phone) {
  const digits = (phone || '').replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}
