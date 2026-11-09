'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [attorneys, setAttorneys] = useState([])
  const [form, setForm] = useState({ name: '', firm: '', phone: '', email: '', website: '', bio: '', tags: '', states: 'ALL', featured: false, paid_tier: 'standard' })
  const [adminKey, setAdminKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [reps, setReps] = useState([])
  const [repForm, setRepForm] = useState({ name: '', email: '', phone: '' })
  const [repMsg, setRepMsg] = useState('')
  const [loginError, setLoginError] = useState('')

  const fetchReps = async (key = adminKey) => {
    const res = await fetch('/api/admin/reps', { headers: { 'x-admin-key': key } })
    if (res.status === 401) return false
    const data = await res.json()
    setReps(data.reps || [])
    return true
  }

  const login = async () => {
    setLoginError('')
    const ok = await fetchReps(adminKey)
    if (ok) setAuthed(true)
    else setLoginError('That admin key was not accepted.')
  }

  const addRep = async () => {
    setRepMsg('')
    const res = await fetch('/api/admin/reps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify(repForm),
    })
    const data = await res.json()
    if (!res.ok) return setRepMsg(`Error: ${data.error}`)
    setRepMsg(`Added ${data.rep.name}. Their link: ${data.rep.link}`)
    setRepForm({ name: '', email: '', phone: '' })
    fetchReps()
  }

  const toggleRep = async (r) => {
    await fetch('/api/admin/reps', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ id: r.id, active: !r.active }),
    })
    fetchReps()
  }

  const recordPayout = async (r) => {
    const amount = (r.unpaid_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    const method = window.prompt(`Record a ${amount} payout to ${r.name}? Only do this after you've sent the money.\n\nHow did you pay them? (e.g. Zelle, ACH)`)
    if (method === null) return
    const res = await fetch('/api/admin/payouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ rep_id: r.id, method }),
    })
    const data = await res.json()
    setRepMsg(res.ok ? `Recorded ${amount} paid to ${r.name} (${data.lines} commissions).` : `Error: ${data.error}`)
    fetchReps()
  }

  const copy = (text) => { try { navigator.clipboard.writeText(text); setRepMsg('Link copied.') } catch {} }
  const usd = (cents) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  const repName = (id) => reps.find((r) => r.id === id)?.name

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
    if (res.ok) { setMsg('✅ Attorney added successfully!'); fetchAttorneys(); setForm({ name: '', firm: '', phone: '', email: '', website: '', bio: '', tags: '', states: 'ALL', featured: false, paid_tier: 'standard' }) }
    else setMsg(`❌ Error: ${data.error}`)
  }

  const S = { page: { maxWidth: 700, margin: '0 auto', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }, h1: { fontSize: 28, marginBottom: 8 }, label: { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#5a524a' }, input: { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e0d8', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, marginBottom: 14, boxSizing: 'border-box' }, btn: { padding: '12px 24px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }, card: { background: '#fff', border: '1px solid #e5e0d8', borderRadius: 12, padding: 16, marginBottom: 12 } }

  if (!authed) return (
    <div style={S.page}>
      <h1 style={S.h1}>Admin Login</h1>
      <label style={S.label}>Admin Key</label>
      <input style={S.input} type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="Enter your admin key" />
      <button style={S.btn} onClick={login}>Login</button>
      {loginError && <p style={{ color: '#991b1b', fontSize: 14, marginTop: 12 }}>{loginError}</p>}
    </div>
  )

  return (
    <div style={S.page}>
      <h1 style={S.h1}>BenefitsPath Admin</h1>
      <p style={{ color: '#5a524a', marginBottom: 32 }}>Add and manage paid attorney listings that appear on BenefitsPath.</p>


      <h2 style={{ fontSize: 20, marginBottom: 6 }}>Sales Reps ({reps.length})</h2>
      <p style={{ color: '#5a524a', fontSize: 14, marginBottom: 16 }}>Each rep gets a unique link. Attorneys who sign up through it earn that rep $100 for every paid month. "Unpaid" is what you owe them right now.</p>
      <div style={{ background: '#f7f5f0', borderRadius: 12, padding: 24, marginBottom: 16 }}>
        {[['name', 'Rep Name *', 'text', 'e.g. Jordan Lee'], ['email', 'Email', 'email', 'jordan@email.com'], ['phone', 'Phone', 'tel', '702-555-0100']].map(([k, l, t, p]) => (
          <div key={k}><label style={S.label}>{l}</label><input style={S.input} type={t} placeholder={p} value={repForm[k]} onChange={e => setRepForm(f => ({ ...f, [k]: e.target.value }))} /></div>
        ))}
        <button style={{ ...S.btn, opacity: !repForm.name ? 0.5 : 1 }} disabled={!repForm.name} onClick={addRep}>Add Rep &amp; Create Link</button>
      </div>
      {repMsg && <p style={{ fontSize: 14, marginBottom: 16, wordBreak: 'break-all' }}>{repMsg}</p>}
      {reps.map(r => (
        <div key={r.id} style={{ ...S.card, opacity: r.active ? 1 : 0.6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0 }}>
              <strong style={{ fontSize: 16 }}>{r.name}</strong>{!r.active && <span style={{ fontSize: 12, color: '#991b1b', marginLeft: 8 }}>Link off</span>}
              <div style={{ fontSize: 12, color: '#8a8078', marginTop: 4 }}>{[r.email, r.phone].filter(Boolean).join(' · ')}</div>
              <div style={{ fontSize: 12, color: '#2d6a4f', marginTop: 4, wordBreak: 'break-all', cursor: 'pointer' }} onClick={() => copy(r.link)} title="Click to copy">{r.link}</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 13 }}>
              <div><strong>{r.active_listings}</strong> active listings</div>
              <div style={{ color: r.unpaid_cents ? '#92400e' : '#5a524a' }}>Unpaid: <strong>{usd(r.unpaid_cents)}</strong></div>
              <div style={{ color: '#8a8078' }}>Paid to date: {usd(r.paid_cents)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={{ ...S.btn, padding: '8px 14px', fontSize: 13, opacity: r.unpaid_cents ? 1 : 0.4 }} disabled={!r.unpaid_cents} onClick={() => recordPayout(r)}>Record payout</button>
            <button style={{ ...S.btn, padding: '8px 14px', fontSize: 13, background: '#fff', color: '#5a524a', border: '1px solid #e5e0d8' }} onClick={() => toggleRep(r)}>{r.active ? 'Turn link off' : 'Turn link on'}</button>
          </div>
        </div>
      ))}
      <div style={{ height: 32 }} />

      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Add New Attorney</h2>
      <div style={{ background: '#f7f5f0', borderRadius: 12, padding: 24, marginBottom: 32 }}>
        {[['name', 'Full Name *', 'text', 'e.g. Sarah Mitchell'], ['firm', 'Law Firm Name', 'text', 'e.g. Mitchell Employment Law'], ['phone', 'Phone Number', 'tel', '1-800-555-0100'], ['email', 'Email', 'email', 'attorney@firm.com'], ['website', 'Website URL', 'url', 'https://firm.com'], ['tags', 'Practice Areas (comma-separated)', 'text', 'UI Appeals, Wrongful Termination'], ['states', 'States (comma-separated or ALL)', 'text', 'CA, TX or ALL']].map(([k, l, t, p]) => (
          <div key={k}><label style={S.label}>{l}</label><input style={S.input} type={t} placeholder={p} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} /></div>
        ))}
        <label style={S.label}>Bio / Description</label>
        <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Brief attorney bio..." />
        <label style={S.label}>Listing Tier</label>
        <select style={S.input} value={form.paid_tier} onChange={e => setForm(f => ({ ...f, paid_tier: e.target.value }))}>
          <option value="standard">Standard ($250/mo)</option>
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
              <div style={{ fontSize: 12, color: '#8a8078' }}>States: {(a.states || []).join(', ')} · Tier: {a.paid_tier}{a.rep_id ? ` · Rep: ${repName(a.rep_id) || a.rep_id}` : ''}</div>
            </div>
            <span style={{ background: a.active ? '#d8f3dc' : '#fee2e2', color: a.active ? '#2d6a4f' : '#991b1b', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{a.active ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
