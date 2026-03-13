'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [attorneys, setAttorneys] = useState([])
  const [form, setForm] = useState({ name: '', firm: '', phone: '', email: '', website: '', bio: '', tags: '', states: 'ALL', featured: false, paid_tier: 'basic' })
  const [adminKey, setAdminKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchAttorneys = async () => {
    const res = await fetch('/api/attorneys')
    const data = await res.json()
    setAttorneys(data.attorneys || [])
  }

  useEffect(() => { if (authed) fetchAttorneys() }, [authed])

  const handleSubmit = async () => {
    setLoading(true)
    setMsg('')
    const res = await fetch('/api/attorneys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ ...form, tags: form.tags.split(',').map(t => t.trim()), states: form.states.split(',').map(s => s.trim()) }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setMsg('✅ Attorney added successfully!'); fetchAttorneys(); setForm({ name: '', firm: '', phone: '', email: '', website: '', bio: '', tags: '', states: 'ALL', featured: false, paid_tier: 'basic' }) }
    else setMsg(`❌ Error: ${data.error}`)
  }

  const S = { page: { maxWidth: 700, margin: '0 auto', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }, h1: { fontSize: 28, marginBottom: 8 }, label: { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#5a524a' }, input: { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e0d8', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, marginBottom: 14, boxSizing: 'border-box' }, btn: { padding: '12px 24px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }, card: { background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: 16, marginBottom: 12 } }

  if (!authed) return (
    <div style={S.page}>
      <h1 style={S.h1}>Admin Login</h1>
      <label style={S.label}>Admin Key</label>
      <input style={S.input} type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="Enter your admin key" />
      <button style={S.btn} onClick={() => setAuthed(true)}>Login</button>
    </div>
  )

  return (
    <div style={S.page}>
      <h1 style={S.h1}>Attorney Listings Admin</h1>
      <p style={{ color: '#5a524a', marginBottom: 32 }}>Add and manage paid attorney listings that appear on BenefitsPath.</p>

      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Add New Attorney</h2>
      <div style={{ background: '#f7f5f0', borderRadius: 12, padding: 24, marginBottom: 32 }}>
        {[['name', 'Full Name *', 'text', 'e.g. Sarah Mitchell'], ['firm', 'Law Firm Name', 'text', 'e.g. Mitchell Employment Law'], ['phone', 'Phone Number', 'tel', '1-800-555-0100'], ['email', 'Email', 'email', 'attorney@firm.com'], ['website', 'Website URL', 'url', 'https://firm.com'], ['tags', 'Practice Areas (comma-separated)', 'text', 'UI Appeals, Wrongful Termination'], ['states', 'States (comma-separated or ALL)', 'text', 'CA, TX or ALL']].map(([k, l, t, p]) => (
          <div key={k}><label style={S.label}>{l}</label><input style={S.input} type={t} placeholder={p} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} /></div>
        ))}
        <label style={S.label}>Bio / Description</label>
        <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Brief attorney bio..." />
        <label style={S.label}>Listing Tier</label>
        <select style={S.input} value={form.paid_tier} onChange={e => setForm(f => ({ ...f, paid_tier: e.target.value }))}>
          <option value="basic">Basic ($99/mo)</option>
          <option value="premium">Premium ($299/mo)</option>
          <option value="featured">Featured ($599/mo)</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Show as Featured (⭐ badge)</span>
        </label>
        <button style={{ ...S.btn, opacity: !form.name || loading ? 0.5 : 1 }} disabled={!form.name || loading} onClick={handleSubmit}>{loading ? 'Adding…' : 'Add Attorney Listing'}</button>
        {msg && <p style={{ marginTop: 12, fontSize: 14 }}>{msg}</p>}
      </div>

      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Current Listings ({attorneys.length})</h2>
      {attorneys.length === 0 ? <p style={{ color: '#8a8078' }}>No listings yet.</p> : attorneys.map(a => (
        <div key={a.id} style={S.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <strong style={{ fontSize: 16 }}>{a.name}</strong>
              {a.featured && <span style={{ background: '#d8f3dc', color: '#2d6a4f', fontSize: 11, padding: '2px 8px', borderRadius: 20, marginLeft: 8, fontWeight: 700 }}>FEATURED</span>}
              <div style={{ fontSize: 13, color: '#5a524a', marginTop: 4 }}>{a.firm}</div>
              <div style={{ fontSize: 12, color: '#8a8078', marginTop: 4 }}>{a.phone} · {a.email}</div>
              <div style={{ fontSize: 12, color: '#8a8078' }}>States: {(a.states || []).join(', ')} · Tier: {a.paid_tier}</div>
            </div>
            <span style={{ background: a.active ? '#d8f3dc' : '#fee2e2', color: a.active ? '#2d6a4f' : '#991b1b', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{a.active ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
