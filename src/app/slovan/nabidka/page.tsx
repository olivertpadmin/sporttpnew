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
      { label: 'Implementace' },
      { label: 'Provoz (12 měsíců)' },
    ],
  },
  {
    name: 'Mobilní aplikace',
    icon: '📱',
    items: [
      { label: 'Implementace' },
      { label: 'Provoz (12 měsíců)' },
    ],
  },
  {
    name: 'CRM',
    icon: '📊',
    items: [
      { label: 'Implementace' },
      { label: 'Provoz (12 měsíců)' },
    ],
  },
  {
    name: 'Akreditace',
    icon: '🪪',
    items: [
      { label: 'Implementace' },
      { label: 'Provoz (12 měsíců)' },
    ],
  },
  {
    name: 'SSO',
    icon: '🔐',
    items: [
      { label: 'Implementace' },
      { label: 'Provoz (12 měsíců)' },
    ],
  },
  {
    name: 'Partnerský portál',
    icon: '🤝',
    items: [
      { label: 'Implementace' },
      { label: 'Provoz (12 měsíců)' },
    ],
  },
]

const SUMMARY_ROWS = [
  { label: 'Roční obrat přes platformu', value: '20 000 000 Kč', note: 'Předpokládaný obrat v sezóně' },
  { label: 'Provize platformy',          value: '4,5 %',          note: 'Z celkového obratu vstupenek = 765 000 Kč' },
  { label: 'Provize z permanentek',      value: '2 %',            note: 'Z obratu permanentek (3 000 000 Kč) = 60 000 Kč' },
  { label: 'Podpora mládeže',            value: '275 000 Kč',     note: 'Vyplaceno před sezónou · V rámci partnerství požadujeme 3× 10s spot na LED banneru na zápas' },
  { label: 'Kickback z obratu (0,8 %)', value: '160 000 Kč',     note: 'Vyplaceno po skončení sezóny' },
]

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function NabidkaPage() {
  const router = useRouter()

  useEffect(() => {
    track({
      type: 'page_view',
      page: '/slovan/nabidka',
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
          onClick={() => router.push('/slovan')}
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
            Nabídka<br />pro FC Slovan Liberec
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
              gridTemplateColumns: '1fr 180px 200px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Produkt / Položka</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 text-center">Typ</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-center" style={{ color: `${ACCENT_LIGHT}99` }}>PLG cena</span>
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
                    <IncludedBadge />
                  </div>
                  {/* Desktop layout */}
                  <div
                    className="hidden md:grid items-center"
                    style={{ gridTemplateColumns: '1fr 180px 200px' }}
                  >
                    <span className="text-sm text-white/50 pl-0">{item.label}</span>
                    <div />
                    <div className="flex justify-center">
                      <IncludedBadge />
                    </div>
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
                Obchodní podmínky spolupráce
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
                  style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT_LIGHT }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Commission highlight ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <motion.div {...iv(0.12)}>
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-8"
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
                Reálný dopad na Ticketportal
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-white mt-3 mb-3 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}
              >
                Veškerý ekosystém<br />
                <span style={{ color: ACCENT_LIGHT }}>zahrnuto v provizi</span>
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-lg mb-6">
                Implementaci ani provoz celého digitálního ekosystému neplatíte dopředu.
                Vše je pokryto provizí z prodeje vstupenek. Součástí spolupráce je také{' '}
                <span className="text-white/80 font-semibold">275 000 Kč na podporu mládeže vyplaceno před sezónou</span>{' '}
                a kickback <span className="text-white/80 font-semibold">160 000 Kč po sezóně</span>{' '}
                při splnění obratu v sezóně{' '}
                <span className="text-white/80 font-semibold">20 000 000 Kč</span>.
              </p>

              {/* Výpočtový breakdown */}
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Podpora mládeže – vyplaceno před sezónou', value: '+ 275 000 Kč' },
                  { label: 'Kickback z obratu (0,8 %)', value: '+ 160 000 Kč' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{
                      background: `${ACCENT}10`,
                      border: `1px solid ${ACCENT}25`,
                    }}
                  >
                    <span className="text-xs text-white/50">{row.label}</span>
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: ACCENT_LIGHT, fontFamily: "'Panel Sans', sans-serif" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                {/* Součet – příjem pro klub */}
                <div
                  className="flex items-center justify-between px-4 py-4 rounded-xl mt-1"
                  style={{
                    background: `${ACCENT}25`,
                    border: `2px solid ${ACCENT}60`,
                  }}
                >
                  <div>
                    <span className="text-sm font-bold text-white">🤝 Partnerský budget</span>
                    <p className="text-[10px] text-white/35 mt-0.5">Podpora mládeže + kickback po sezóně</p>
                  </div>
                  <span
                    className="text-xl font-black tabular-nums"
                    style={{ color: ACCENT_LIGHT, fontFamily: "'Panel Sans', sans-serif" }}
                  >
                    + 435 000 Kč
                  </span>
                </div>
              </div>
            </div>

            {/* Hlavní číslo */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-3">
              <div
                className="rounded-2xl px-8 py-8 text-center"
                style={{
                  background: `${ACCENT}22`,
                  border: `2px solid ${ACCENT}55`,
                }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">
                  Finální provize PLG
                </div>
                <div
                  className="text-6xl md:text-7xl font-black leading-none"
                  style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT_LIGHT }}
                >
                  1,95 %
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 mt-2">
                  z obratu vstupenek
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
