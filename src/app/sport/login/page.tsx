'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function SportLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/sport-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/sport')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 55%, #1e0a4a 0%, #12063a 45%, #080020 100%)' }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)`,
      }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
        width: 600, height: 300,
        background: 'radial-gradient(ellipse at center bottom, rgba(120,40,200,0.30) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-7 w-full max-w-sm px-6">
        {/* PLG Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/plglogo.svg" alt="PLG ecosystem" style={{ width: 120, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(120,40,200,0.5))' }} />

        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-4xl text-white leading-tight tracking-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Digitální ekosystém PLG
          </h1>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Prezentace PLG ecosystem
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)' }} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Vložte heslo"
            autoFocus
            className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.14)',
              fontFamily: "'Mulish', sans-serif",
            }}
            onFocus={e => {
              if (!error) e.currentTarget.style.border = '1px solid rgba(120,40,200,0.8)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(120,40,200,0.2)'
            }}
            onBlur={e => {
              e.currentTarget.style.border = error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.14)'
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
                ? 'rgba(120,40,200,0.5)'
                : 'linear-gradient(135deg, #7828C8 0%, #4a0d8f 100%)',
              fontFamily: "'Mulish', sans-serif",
              letterSpacing: '0.06em',
              boxShadow: loading || !password ? 'none' : '0 4px 20px rgba(120,40,200,0.4)',
            }}
          >
            {loading ? 'Vstupuji…' : 'Vstoupit'}
          </button>
        </form>

        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Powered by PLG ecosystem
        </p>
      </div>
    </main>
  )
}
