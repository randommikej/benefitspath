import { supabase, supabaseAdmin } from '../../../lib/supabase'

// GET /api/attorneys — fetch active listings (optionally filtered by state)
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get('state')

  let query = supabase
    .from('attorneys')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (state) query = query.or(`states.cs.{${state}},states.cs.{ALL}`)

  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ attorneys: data })
}

// POST /api/attorneys — create a new attorney listing (admin only)
export async function POST(request) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, firm, phone, email, website, bio, tags, states, featured, paid_tier } = body

  const { data, error } = await supabaseAdmin
    .from('attorneys')
    .insert({
      name, firm, phone, email, website, bio,
      tags: tags || [],
      states: states || ['ALL'],
      featured: featured || false,
      paid_tier: paid_tier || 'basic',
      active: true,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ attorney: data }, { status: 201 })
}
