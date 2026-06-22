'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { track } from '@/lib/track'

const ACCENT = '#16A34A'
const ACCENT_LIGHT = '#22C55E'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    name: 'Ticketingový systém',
    icon: '🎟️',
    items: [
      { label: 'Implementace',      bezna: '100 000 Kč' },
      { label: 'Provoz (12 měsíců)', bezna: '120 000 Kč' },
    ],
  },
  {
    name: 'Mobilní aplikace',
    icon: '📱',
    items: [
      { label: 'Implementace',      bezna: '1 200 000 Kč' },
      { label: 'Provoz (12 měsíců)', bezna: '300 000 Kč' },
    ],
  },
  {
    name: 'CRM',
    icon: '📊',
    items: [
      { label: 'Implementace',      bezna: '150 000 Kč' },
      { label: 'Provoz (12 měsíců)', bezna: '180 000 Kč' },
    ],
  },
  {
    name: 'Akreditace',
    icon: '🪪',
    items: [
      { label: 'Implementace',      bezna: '30 000 Kč' },
      { label: 'Provoz (12 měsíců)', bezna: '100 000 Kč' },
    ],
  },
  {
    name: 'SSO',
    icon: '🔐',
    items: [
      { label: 'Implementace',      bezna: '700 000 Kč' },
      { label: 'Provoz (12 měsíců)', bezna: '300 000 Kč' },
    ],
  },
  {
    name: 'Partnerský portál',
    icon: '🤝',
    items: [
      { label: 'Implementace',      bezna: '100 000 Kč' },
      { label: 'Provoz (12 měsíců)', bezna: '120 000 Kč' },
    ],
  },
]

const SUMMARY_ROWS = [
  { label: 'Implementace celkem',   value: '2 280 000 Kč', highlight: false },
  { label: 'Provoz celkem',          value: '1 120 000 Kč', highlight: false },
  { label: 'Budget dle využití',     value: '300 000 Kč',   highlight: false, note: 'HC Kometa – aplikace, CRM, marketing, čtečky atd.' },
]

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function NabidkaPage() {
  const router = useRouter()

  useEffect(() => {
    track({
      type: 'page_view',
      page: '/kometa/nabidka',
      ts: Date.now(),
      referrer: document.referrer || '',
      ua: navigator.userAgent,
    })
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #030f06 0%, #041a09 50%, #021005 100%)' }}
    >
      {/* Dot grid texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${ACCENT_LIGHT} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Topbar */}
      <motion.nav
        className="sticky top-0 w-full z-50 flex items-center gap-3 px-6 py-3"
        style={{
          background: 'rgba(3,15,6,0.95)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => router.push('/kometa')}
          className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
        >
          ← Digitální ekosystém
        </button>
        <span className="text-white/20 font-light shrink-0">/</span>
        <span className="text-sm font-semibold" style={{ color: ACCENT_LIGHT }}>Nabídka</span>
      </motion.nav>

      {/* Page header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT_LIGHT }}>
            Cenová nabídka
          </span>
          <h1
            className="text-5xl md:text-7xl mt-4 mb-5 leading-none text-white"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}
          >
            Nabídka<br />pro HC Kometa Brno
          </h1>
          <p className="text-lg text-white/40 max-w-xl leading-relaxed">
            Kompletní digitální ekosystém zahrnutý v provizi z prodeje vstupenek.
            Žádné vstupní investice, žádné skryté poplatky.
          </p>
        </motion.div>
      </div>

      {/* ── PART 1: Products table ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-6">

        {/* Table header */}
        <motion.div {...iv(0.05)}>
          <div
            className="hidden md:grid rounded-xl px-6 py-3 mb-2"
            style={{
              gridTemplateColumns: '1fr 180px 200px 200px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Produkt / Položka</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 text-center">Typ</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-center" style={{ color: `${ACCENT_LIGHT}99` }}>PLG cena</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 text-right">Běžná cena</span>
          </div>
        </motion.div>

        {/* Product rows */}
        <div className="flex flex-col gap-2">
          {PRODUCTS.map((product, pi) => (
            <motion.div
              key={product.name}
              {...iv(0.06 + pi * 0.05)}
              className="rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              {/* Product name row */}
              <div
                className="flex items-center gap-3 px-6 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)' }}
              >
                <span className="text-lg">{product.icon}</span>
                <span
                  className="text-base font-bold text-white"
                  style={{ fontFamily: "'Panel Sans', sans-serif" }}
                >
                  {product.name}
                </span>
              </div>

              {/* Line items */}
              {product.items.map((item, ii) => (
                <div
                  key={item.label}
                  className="grid items-center px-6 py-4 gap-3"
                  style={{
                    gridTemplateColumns: '1fr',
                    borderTop: ii > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                  }}
                >
                  {/* Mobile layout */}
                  <div className="flex flex-col md:hidden gap-2">
                    <span className="text-sm text-white/50">{item.label}</span>
                    <div className="flex items-center justify-between">
                      <IncludedBadge />
                      <span className="text-sm text-white/25 line-through">{item.bezna}</span>
                    </div>
                  </div>
                  {/* Desktop layout */}
                  <div
                    className="hidden md:grid items-center"
                    style={{ gridTemplateColumns: '1fr 180px 200px 200px' }}
                  >
                    <span className="text-sm text-white/50 pl-0">{item.label}</span>
                    <div />
                    <div className="flex justify-center">
                      <IncludedBadge />
                    </div>
                    <span className="text-sm text-white/25 text-right tabular-nums line-through">{item.bezna}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PART 2: Summary ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-8">
        <motion.div {...iv(0.1)}>
          <div
            className="rounded-2xl overflow-hidden mt-4"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="px-6 py-4"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Shrnutí investice — Celková hodnota Ticketportal
              </span>
            </div>
            {SUMMARY_ROWS.map((row, i) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-6 py-4"
                style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
              >
                <div>
                  <span className="text-sm font-semibold text-white/60">{row.label}</span>
                  {row.note && (
                    <p className="text-xs text-white/25 mt-0.5">{row.note}</p>
                  )}
                </div>
                <span
                  className="text-lg font-black tabular-nums"
                  style={{ fontFamily: "'Panel Sans', sans-serif", color: 'rgba(255,255,255,0.55)' }}
                >
                  {row.value}
                </span>
              </div>
            ))}
            {/* Total */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-6 py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-sm font-semibold text-white/50">Celková hodnota ekosystému</span>
              <span
                className="text-2xl font-black tabular-nums text-white"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}
              >
                3 700 000 Kč
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Commission highlight ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <motion.div {...iv(0.12)}>
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT}08 100%)`,
              border: `1.5px solid ${ACCENT}40`,
              boxShadow: `0 0 80px ${ACCENT}18`,
            }}
          >
            <div className="flex-1">
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: ACCENT_LIGHT }}
              >
                Hlavní podmínka spolupráce
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-white mt-3 mb-3 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}
              >
                Veškerý ekosystém<br />
                <span style={{ color: ACCENT_LIGHT }}>zahrnuto v provizi</span>
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                Implementaci ani provoz celého digitálního ekosystému v hodnotě{' '}
                <span className="text-white/80 font-semibold">3 700 000 Kč</span>{' '}
                neplatíte dopředu. Vše je pokryto provizí z prodeje vstupenek.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-2">
              <div
                className="rounded-2xl px-10 py-7 text-center"
                style={{
                  background: `${ACCENT}20`,
                  border: `2px solid ${ACCENT}50`,
                }}
              >
                <div
                  className="text-6xl md:text-7xl font-black leading-none"
                  style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT_LIGHT }}
                >
                  1,99 %
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mt-2">
                  provize z prodeje vstupenek
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function IncludedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
      style={{
        background: 'rgba(34,197,94,0.12)',
        color: '#22C55E',
        border: '1px solid rgba(34,197,94,0.25)',
      }}
    >
      <span style={{ fontSize: 10 }}>✓</span>
      Zahrnuto v provizi
    </span>
  )
}
