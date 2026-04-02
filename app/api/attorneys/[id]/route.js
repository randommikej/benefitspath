import { supabaseAdmin } from '../../../../lib/supabase'

// PATCH /api/attorneys/[id] — admin toggle active, change tier, etc.
export async function PATCH(request, { params }) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params
  const body = await request.json()
  const allowed = ['active', 'featured', 'paid_tier', 'name', 'firm', 'phone', 'email', 'website', 'bio', 'tags', 'states']
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)))

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.from('attorneys').update(updates).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ attorney: data })
}

// DELETE /api/attorneys/[id] — admin remove listing
export async function DELETE(request, { params }) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params
  const { error } = await supabaseAdmin.from('attorneys').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ deleted: true })
}
