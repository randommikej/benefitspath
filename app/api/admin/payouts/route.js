import { supabaseAdmin } from '../../../../lib/supabase'

const authorized = (req) => {
  const key = req.headers.get('x-admin-key')
  return Boolean(key) && key === process.env.ADMIN_SECRET_KEY
}

// GET /api/admin/payouts?rep_id=1 — unpaid commission lines for a rep (or all reps), oldest first
export async function GET(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const repId = new URL(request.url).searchParams.get('rep_id')
  let q = supabaseAdmin
    .from('commissions')
    .select('id, rep_id, amount_cents, invoice_paid_at, stripe_invoice_id, attorneys(name, firm)')
    .is('payout_id', null)
    .order('invoice_paid_at', { ascending: true })
  if (repId) q = q.eq('rep_id', repId)
  const { data, error } = await q
  if (error) return Response.json({ error: error.message }, { status: 500 })

  const { data: history } = await supabaseAdmin
    .from('rep_payouts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  return Response.json({ unpaid: data || [], payouts: history || [] })
}

// POST /api/admin/payouts — { rep_id, method?, note? }
// Call AFTER you've sent the money: records a payout covering every unpaid commission
// for that rep and marks those lines paid.
export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { rep_id, method, note } = await request.json()
  if (!rep_id) return Response.json({ error: 'rep_id is required' }, { status: 400 })

  const { data: unpaid, error } = await supabaseAdmin
    .from('commissions')
    .select('id, amount_cents')
    .eq('rep_id', rep_id)
    .is('payout_id', null)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  if (!unpaid?.length) return Response.json({ error: 'Nothing unpaid for this rep' }, { status: 400 })

  const amount = unpaid.reduce((s, c) => s + c.amount_cents, 0)
  const { data: payout, error: pErr } = await supabaseAdmin
    .from('rep_payouts')
    .insert({ rep_id, amount_cents: amount, method: method || null, note: note || null })
    .select()
    .single()
  if (pErr) return Response.json({ error: pErr.message }, { status: 500 })

  const { error: uErr } = await supabaseAdmin
    .from('commissions')
    .update({ payout_id: payout.id })
    .in('id', unpaid.map((c) => c.id))
    .is('payout_id', null)
  if (uErr) return Response.json({ error: uErr.message }, { status: 500 })

  return Response.json({ payout, lines: unpaid.length })
}
