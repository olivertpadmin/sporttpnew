'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function KometaAnalyticsLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/kometa-analytics-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/kometa/analytics')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #001228 0%, #002450 50%, #003a70 100%)' }}
    >
      <div className="relative z-10 flex flex-col items-center gap-7 w-full max-w-sm px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/kometa-logo.png"
          alt="HC Kometa Brno"
          style={{ width: 100, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))' }}
        />

        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl text-white leading-tight tracking-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Analytics
          </h1>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Kometa Brno · interní přístup
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)' }} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Vložte heslo"
            autoFocus
            className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.12)',
              fontFamily: "'Mulish', sans-serif",
              boxShadow: error ? '0 0 0 3px rgba(248,113,113,0.15)' : undefined,
            }}
            onFocus={e => {
              if (!error) e.currentTarget.style.border = '1px solid rgba(0,102,172,0.8)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,102,172,0.2)'
            }}
            onBlur={e => {
              e.currentTarget.style.border = error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.12)'
              e.currentTarget.style.boxShadow = error ? '0 0 0 3px rgba(248,113,113,0.15)' : 'none'
            }}
          />

          {error && (
            <p className="text-xs text-center" style={{ color: '#f87171' }}>
              Nesprávné heslo. Zkuste to prosím znovu.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{
              background: loading || !password
                ? 'rgba(0,70,135,0.5)'
                : 'linear-gradient(135deg, #0066AC 0%, #004687 100%)',
              fontFamily: "'Mulish', sans-serif",
              letterSpacing: '0.06em',
              boxShadow: loading || !password ? 'none' : '0 4px 20px rgba(0,102,172,0.35)',
            }}
          >
            {loading ? 'Vstupuji…' : 'Vstoupit'}
          </button>
        </form>
      </div>
    </main>
  )
}
