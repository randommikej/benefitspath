import { supabase, supabaseAdmin } from '../../../lib/supabase'
import { Resend } from 'resend'

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      type, email, firstName, lastName, phone,
      state, endReason, employmentLength, applicationStatus,
      eligibilityScore, eligibilityLikelihood,
      lawyerName, lawyerPhone, lawyerEmail, lawyerSituation,
      appealFirstName, appealLastName,
    } = body

    // ── Save to Supabase ──────────────────────────────────────────────────────
    // Uses supabaseAdmin when service role key is available, otherwise anon client
    // RLS policy allows anon inserts for lead form submissions
    const client = supabaseAdmin || supabase
    const { error } = await client
      .from('leads')
      .insert({
        type: type || 'general',
        email: email || null,
        first_name: firstName || null,
        last_name: lastName || null,
        phone: phone || null,
        state: state || null,
        end_reason: endReason || null,
        employment_length: employmentLength || null,
        application_status: applicationStatus || null,
        eligibility_score: eligibilityScore || null,
        eligibility_likelihood: eligibilityLikelihood || null,
        lawyer_name: lawyerName || null,
        lawyer_phone: lawyerPhone || null,
        lawyer_email: lawyerEmail || null,
        lawyer_situation: lawyerSituation || null,
        appeal_first_name: appealFirstName || null,
        appeal_last_name: appealLastName || null,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Supabase insert error:', error)
      // Don't fail the request — still send email
    }

    // ── Email Michael when someone asks to hear from an attorney ──────────────
    // The connect form sends lawyerName/lawyerEmail/lawyerPhone; eligibility answers may be empty.
    if (type === 'attorney_request' && process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
      const name = lawyerName || [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous'
      const rows = [
        ['Name', name],
        ['Email', lawyerEmail || email || 'Not provided'],
        ['Phone', lawyerPhone || phone || 'Not provided'],
        ['State', state || 'Unknown'],
        ['What happened', lawyerSituation || 'Not provided'],
        ['End reason (quiz)', endReason || '—'],
        ['Eligibility (quiz)', eligibilityScore ? `${eligibilityScore}% — ${eligibilityLikelihood || ''}` : '—'],
      ]
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'BenefitsPath <noreply@benefitspath.org>',
        to: process.env.ADMIN_EMAIL,
        subject: `New attorney request: ${String(name).slice(0, 60)} (${state || 'unknown state'})`,
        html: `
          <h2>New attorney request</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
            ${rows.map(([k, v]) => `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">${k}</td><td style="padding:8px;border:1px solid #eee;white-space:pre-wrap;">${esc(v)}</td></tr>`).join('')}
          </table>
          <p style="margin-top:16px;font-size:12px;color:#999;">Submitted ${new Date().toISOString()}</p>
        `,
      })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
