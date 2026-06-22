'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AnalyticsLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/analytics-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/analytics')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #1a0040 0%, #11002B 60%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #06D373 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-6">
        <Image src="/plglogo.svg" alt="PLG" width={48} height={16} priority />

        <div className="flex flex-col items-center gap-1 text-center">
          <h1
            className="text-3xl text-white leading-tight"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}
          >
            Analytics
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: '#F640C4' }}
          >
            Restricted Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: error ? '1px solid #F640C4' : '1px solid rgba(255,255,255,0.12)',
              fontFamily: "'Mulish', sans-serif",
              // @ts-expect-error ring color via CSS variable
              '--tw-ring-color': '#06D373',
            }}
          />

          {error && (
            <p className="text-xs text-center" style={{ color: '#F640C4' }}>
              Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg py-3 text-sm font-semibold text-black transition-opacity disabled:opacity-40"
            style={{
              background: '#06D373',
              fontFamily: "'Mulish', sans-serif",
            }}
          >
            {loading ? 'Entering…' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
