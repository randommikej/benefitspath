'use client'

import { useState } from 'react'
import { SeoLayout } from '../../components/SeoTemplate'

export default function LawyerSignupPage() {
  const [form, setForm] = useState({ name: '', firm: '', email: '', phone: '', states: '', specialty: '', website: '', bio: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/attorney-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <SeoLayout>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, marginBottom: 12 }}>Application Received</h1>
          <p style={{ fontSize: 16, color: '#5a524a', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.7 }}>
            Thank you for applying to list your practice on BenefitsPath. Our team will review your application and reach out within 1-2 business days to complete setup.
          </p>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2d6a4f', color: '#fff', padding: '13px 24px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>Back to Home</a>
        </div>
      </SeoLayout>
    )
  }

  const tiers = [
    { tier: 'Basic', price: '$99', desc: 'Standard listing with contact info, bio, and practice areas.' },
    { tier: 'Premium', price: '$299', desc: 'Priority placement, highlighted listing, and lead notifications.' },
    { tier: 'Featured', price: '$599', desc: 'Top placement, featured badge, phone call button, maximum visibility.', featured: true },
  ]

  return (
    <SeoLayout>
      <div style={{ background: 'linear-gradient(135deg, #1a3c2b 0%, #2d6a4f 100%)', borderRadius: 20, padding: '48px 40px', marginBottom: 40, color: '#fff' }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>FOR EMPLOYMENT ATTORNEYS</p>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, margin: '0 0 16px', lineHeight: 1.2 }}>Reach Workers Who Need You Right Now</h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 520 }}>
          BenefitsPath connects newly unemployed workers to employment attorneys at the moment they need legal help. Get listed and start receiving qualified leads.
        </p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, marginBottom: 8 }}>Simple, Transparent Pricing</h2>
        <p style={{ color: '#5a524a', marginBottom: 20 }}>Choose the tier that fits your practice. Cancel anytime.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {tiers.map(({ tier, price, desc, featured }) => (
            <div key={tier} style={{ background: featured ? '#1a3c2b' : '#fff', color: featured ? '#fff' : '#1a1714', border: featured ? 'none' : '1px solid #e5e0d8', borderRadius: 16, padding: '24px 20px', position: 'relative' }}>
              {featured && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#c77c3c', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>MOST POPULAR</div>}
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{tier}</div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, marginBottom: 8 }}>{price}<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: featured ? 'rgba(255,255,255,0.8)' : '#5a524a', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: 20, padding: '36px 32px' }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, marginBottom: 6 }}>Apply to List Your Practice</h2>
        <p style={{ color: '#5a524a', fontSize: 15, marginBottom: 28 }}>Fill out the form. Our team will contact you within 1-2 business days to complete setup and select your plan.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Jane Smith" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Law Firm</label>
              <input value={form.firm} onChange={e => setForm(f => ({ ...f, firm: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Smith & Associates" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="jane@smithlaw.com" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Phone *</label>
              <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="(555) 123-4567" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>States You Practice In *</label>
              <input required value={form.states} onChange={e => setForm(f => ({ ...f, states: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="CA, NY, TX (or ALL)" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Website</label>
              <input type="url" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="https://smithlaw.com" />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Practice Areas</label>
            <input value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Employment law, wrongful termination, unemployment appeals..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Short Bio</label>
            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e0d8', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} placeholder="Tell workers about your experience and how you can help..." />
          </div>
          {status === 'error' && <p style={{ color: '#dc2626', fontSize: 14, margin: 0 }}>{error || 'Something went wrong.'}</p>}
          <button type="submit" disabled={status === 'submitting'} style={{ background: status === 'submitting' ? '#8a8078' : '#2d6a4f', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
            {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
          </button>
          <p style={{ fontSize: 13, color: '#8a8078', margin: 0 }}>Our team responds within 1-2 business days to complete your listing setup.</p>
        </form>
      </div>
    </SeoLayout>
  )
}
