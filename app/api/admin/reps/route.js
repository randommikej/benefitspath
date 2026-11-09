import { supabaseAdmin } from '../../../../lib/supabase'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.benefitspath.org'
const authorized = (req) => {
  const key = req.headers.get('x-admin-key')
  return Boolean(key) && key === process.env.ADMIN_SECRET_KEY
}
const unauthorized = () => Response.json({ error: 'Unauthorized' }, { status: 401 })

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24) || 'rep'
const randomSuffix = () => Math.random().toString(36).slice(2, 6)
const repLink = (code) => `${BASE}/for-attorneys?rep=${code}`

// GET /api/admin/reps — every rep with their link, active listings, and commission totals
export async function GET(request) {
  if (!authorized(request)) return unauthorized()

  const [{ data: reps, error }, { data: attorneys }, { data: commissions }] = await Promise.all([
    supabaseAdmin.from('reps').select('*').order('created_at', { ascending: true }),
    supabaseAdmin.from('attorneys').select('id, rep_id, active').not('rep_id', 'is', null),
    supabaseAdmin.from('commissions').select('rep_id, amount_cents, payout_id'),
  ])
  if (error) return Response.json({ error: error.message }, { status: 500 })

  const rows = (reps || []).map((r) => {
    const mine = (attorneys || []).filter((a) => a.rep_id === r.id)
    const comm = (commissions || []).filter((c) => c.rep_id === r.id)
    const sum = (list) => list.reduce((s, c) => s + c.amount_cents, 0)
    return {
      ...r,
      link: repLink(r.code),
      active_listings: mine.filter((a) => a.active).length,
      total_listings: mine.length,
      unpaid_cents: sum(comm.filter((c) => !c.payout_id)),
      unpaid_count: comm.filter((c) => !c.payout_id).length,
      paid_cents: sum(comm.filter((c) => c.payout_id)),
    }
  })
  return Response.json({ reps: rows })
}

// POST /api/admin/reps — add a rep; returns their unique signup link
export async function POST(request) {
  if (!authorized(request)) return unauthorized()
  const { name, email, phone, notes } = await request.json()
  if (!name?.trim()) return Response.json({ error: 'Name is required' }, { status: 400 })

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = `${slugify(name)}-${randomSuffix()}`
    const { data, error } = await supabaseAdmin
      .from('reps')
      .insert({ name: name.trim(), email: email || null, phone: phone || null, notes: notes || null, code })
      .select()
      .single()
    if (!error) return Response.json({ rep: { ...data, link: repLink(data.code) } })
    if (error.code !== '23505') return Response.json({ error: error.message }, { status: 500 })
  }
  return Response.json({ error: 'Could not generate a unique code, try again' }, { status: 500 })
}

// PATCH /api/admin/reps — { id, active } turns a rep's link on or off.
// Turning a rep off stops NEW credited signups; commissions on existing listings continue.
export async function PATCH(request) {
  if (!authorized(request)) return unauthorized()
  const { id, active } = await request.json()
  if (!id || typeof active !== 'boolean') return Response.json({ error: 'id and active are required' }, { status: 400 })
  const { data, error } = await supabaseAdmin.from('reps').update({ active }).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ rep: data })
}
