import { supabase, supabaseAdmin } from '../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // ── Send email notification (attorney requests only) ──────────────────────
    if (type === 'attorney_request' && process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'BenefitsPath <noreply@benefitspath.org>',
        to: process.env.ADMIN_EMAIL,
        subject: `🆕 New Attorney Request — ${firstName || 'Anonymous'} (${state || 'Unknown state'})`,
        html: `
          <h2>New Attorney Consultation Request</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #eee;">${firstName || ''} ${lastName || ''}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #eee;">${email || 'Not provided'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">State</td><td style="padding:8px;border:1px solid #eee;">${state || 'Unknown'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Situation</td><td style="padding:8px;border:1px solid #eee;">${lawyerSituation || 'Not provided'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">End Reason</td><td style="padding:8px;border:1px solid #eee;">${endReason || 'Unknown'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Eligibility Score</td><td style="padding:8px;border:1px solid #eee;">${eligibilityScore || 'N/A'}% — ${eligibilityLikelihood || 'N/A'}</td></tr>
          </table>
          <p style="margin-top:16px;font-size:12px;color:#999;">Submitted at ${new Date().toLocaleString()}</p>
        `,
      })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
