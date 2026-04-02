import { supabaseAdmin, supabase } from '../../../lib/supabase'
import { Resend } from 'resend'

// POST /api/attorney-signup — public attorney listing application
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, firm, email, phone, states, specialty, website, bio } = body

    if (!name || !email || !phone || !states) {
      return Response.json({ error: 'Name, email, phone, and states are required.' }, { status: 400 })
    }

    const statesArray = states.split(/[s,]+/).map(s => s.trim().toUpperCase()).filter(Boolean)

    const client = supabaseAdmin || supabase
    const { data, error } = await client
      .from('attorneys')
      .insert({
        name: name.trim(),
        firm: firm ? firm.trim() : null,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        website: website ? website.trim() : null,
        bio: bio ? bio.trim() : null,
        tags: specialty ? specialty.split(/[,;]+/).map(s => s.trim()).filter(Boolean) : [],
        states: statesArray,
        featured: false,
        paid_tier: null,
        active: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase attorney signup error:', error)
      return Response.json({ error: 'Failed to save application. Please try again.' }, { status: 500 })
    }

    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'BenefitsPath <noreply@benefitspath.org>',
          to: process.env.ADMIN_EMAIL,
          subject: `New Attorney Application — ${name} (${statesArray.join(', ')})`,
          html: `<h2>New Attorney Listing Application</h2>
<p>Name: ${name}<br>Firm: ${firm || 'N/A'}<br>Email: ${email}<br>Phone: ${phone}<br>States: ${statesArray.join(', ')}<br>Specialty: ${specialty || 'N/A'}</p>
<p style="font-size:12px;color:#999;">Activate in admin panel after payment collected.</p>`,
        })
      } catch (emailErr) {
        console.error('Admin email error:', emailErr)
      }
    }

    return Response.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Attorney signup error:', err)
    return Response.json({ error: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}
