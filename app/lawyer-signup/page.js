'use client'
import { useState } from 'react'
import Link from 'next/link'

const S = {
  page: { fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f7f5f0', minHeight: '100vh', color: '#1a1714' },
  wrap: { maxWidth: 560, margin: '0 auto', padding: '40px 24px 80px' },
  card: { background: '#fff', borderRadius: 20, padding: 36, border: '1px solid #e5e0d8', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#5a524a' },
  input: { width: '100%', padding: '11px 14px', border: '1.5px solid #e5e0d8', borderRadius: 10, fontFamily: 'inherit', fontSize: 15, color: '#1a1714', background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 18 },
  textarea: { width: '100%', padding: '11px 14px', border: '1.5px solid #e5e0d8', borderRadius: 10, fontFamily: 'inherit', fontSize: 15, color: '#1a1714', background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 18, minHeight: 90, resize: 'vertical' },
  btn: { width: '100%', padding: '15px 24px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: 12, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  section: { marginBottom: 28 },
  hint: { fontSize: 13, color: '#8a8078', marginTop: -14, marginBottom: 18, display: 'block' },
}

export default function LawyerSignupPage() {
  const [form, setForm] = useState({
    name: '', firm: '', email: '', phone: '', website: '',
    states: '', tags: '', bio: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in your name, email, and phone number.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          firm: form.firm,
          email: form.email,
          phone: form.phone,
          website: form.website,
          states: form.states ? form.states.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean) : ['ALL'],
          tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
          bio: form.bio,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      <div style={S.page}>
        {/* Nav */}
        <nav style={{ background: '#fff', borderBottom: '1px solid #e5e0d8', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, background: '#2d6a4f', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: '#1a1714' }}>BenefitsPath</span>
          </Link>
          <Link href="/for-attorneys" style={{ fontSize: 14, color: '#5a524a', textDecoration: 'none' }}>← Learn more</Link>
        </nav>

        <div style={S.wrap}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, marginBottom: 8 }}>Create your listing</h1>
            <p style={{ color: '#5a524a', fontSize: 16 }}>$25/month · Cancel anytime · No contracts</p>
          </div>

          {/* Price callout */}
          <div style={{ background: '#d8f3dc', border: '1px solid #b7e4c7', borderRadius: 14, padding: '16px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div>
              <div style={{ fontWeight: 600, color: '#1a1714', fontSize: 15 }}>Attorney Listing — $25/mo</div>
              <div style={{ fontSize: 13, color: '#2d6a4f' }}>Reach thousands of unemployed Americans seeking legal help</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={S.card}>
            <div style={S.section}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid #f0ede6' }}>Your information</h2>
              <label style={S.label}>Full Name *</label>
              <input style={S.input} type="text" placeholder="e.g. Sarah Mitchell" value={form.name} onChange={set('name')} required />

              <label style={S.label}>Law Firm Name</label>
              <input style={S.input} type="text" placeholder="e.g. Mitchell Employment Law" value={form.firm} onChange={set('firm')} />

              <label style={S.label}>Email Address *</label>
              <input style={S.input} type="email" placeholder="you@yourfirm.com" value={form.email} onChange={set('email')} required />

              <label style={S.label}>Phone Number *</label>
              <input style={S.input} type="tel" placeholder="1-800-555-0100" value={form.phone} onChange={set('phone')} required />

              <label style={S.label}>Website</label>
              <input style={S.input} type="url" placeholder="https://yourfirm.com" value={form.website} onChange={set('website')} />
            </div>

            <div style={S.section}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid #f0ede6' }}>Listing details</h2>
              <label style={S.label}>States You Practice In</label>
              <input style={S.input} type="text" placeholder="CA, TX, NY  (leave blank for all 50 states)" value={form.states} onChange={set('states')} />
              <span style={S.hint}>Comma-separated abbreviations, e.g. "CA, TX" — or leave blank for all states</span>

              <label style={S.label}>Practice Areas</label>
              <input style={S.input} type="text" placeholder="UI Appeals, Wrongful Termination, Wage Claims" value={form.tags} onChange={set('tags')} />
              <span style={S.hint}>Comma-separated, e.g. "UI Appeals, Wrongful Termination"</span>

              <label style={S.label}>Short Bio</label>
              <textarea style={S.textarea} placeholder="Brief description of your experience and how you help clients..." value={form.bio} onChange={set('bio')} />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#dc2626' }}>
                {error}
              </div>
            )}

            <button type="submit" style={{ ...S.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Redirecting to payment…
                </>
              ) : (
                <>Continue to Payment — $25/mo →</>
              )}
            </button>
            <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#8a8078', marginTop: 14 }}>
              You'll be redirected to Stripe to complete payment securely. Cancel anytime.
            </p>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link href="/for-attorneys" style={{ fontSize: 14, color: '#2d6a4f', textDecoration: 'none' }}>← Back to listing details</Link>
          </div>
        </div>
      </div>
    </>
  )
}
