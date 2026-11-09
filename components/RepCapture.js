'use client'
import { useEffect } from 'react'

const KEY = 'bp_rep'
const TTL_MS = 30 * 24 * 60 * 60 * 1000 // a rep's link is remembered for 30 days

const clean = (v) => (typeof v === 'string' && /^[a-z0-9-]{2,40}$/i.test(v.trim()) ? v.trim().toLowerCase() : '')

// Saves ?rep=CODE from the URL so a later signup is credited to that rep.
// The most recent rep link wins.
export function captureRepFromUrl() {
  try {
    const code = clean(new URLSearchParams(window.location.search).get('rep'))
    if (code) window.localStorage.setItem(KEY, JSON.stringify({ code, at: Date.now() }))
    return code
  } catch {
    return ''
  }
}

export function getStoredRep() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) || 'null')
    if (saved && clean(saved.code) && Date.now() - saved.at < TTL_MS) return saved.code
  } catch {}
  return ''
}

export default function RepCapture() {
  useEffect(() => { captureRepFromUrl() }, [])
  return null
}
