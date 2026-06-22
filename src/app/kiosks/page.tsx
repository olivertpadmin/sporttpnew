'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#2563EB'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// Kiosk Visual: terminal → ticket count → card tap → ticket prints
// ─────────────────────────────────────────────────────────
function KioskVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 260 }}>

      {/* Kiosk terminal body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 90, top: 10,
          width: 100, height: 190,
          borderRadius: '12px 12px 4px 4px',
          background: 'linear-gradient(160deg, #0a1530 0%, #050e22 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'visible',
        }}
      >
        {/* Screen */}
        <div style={{
          margin: '8px 8px 0',
          height: 132,
          borderRadius: '6px 6px 0 0',
          background: 'linear-gradient(135deg, #0f1f3d 0%, #0a1428 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '7px 7px',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 5, color: `${ACCENT}`, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 3 }}>
            SELECT TICKETS
          </div>
          <div style={{ fontSize: 6, fontWeight: 800, color: 'white', fontFamily: "'Panel Sans', sans-serif", marginBottom: 2, lineHeight: 1.25 }}>
            Sparta Praha<br/>vs Slavia Praha
          </div>
          <div style={{ fontSize: 5, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Sector A · 990 Kč</div>

          {/* Ticket counter */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 5, padding: '3px 5px',
          }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Qty</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>−</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ fontSize: 10, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", width: 12, textAlign: 'center' }}
              >
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  2
                </motion.span>
              </motion.div>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'white', fontWeight: 700 }}>+</div>
            </div>
          </div>
        </div>

        {/* Card reader slot */}
        <div style={{
          margin: '0 16px',
          height: 28,
          borderRadius: 4,
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          {/* Card tap ripple */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, delay: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }}
          />
          <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>TAP CARD</span>
        </div>

        {/* Base / stand */}
        <div style={{
          position: 'absolute', bottom: -10, left: -10, right: -10, height: 14,
          background: 'linear-gradient(160deg, #0d1d3d 0%, #07111f 100%)',
          borderRadius: '0 0 8px 8px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: 'none',
        }} />
      </motion.div>

      {/* Ticket printing out */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 56, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 114, top: 194,
          width: 52,
          background: '#f8f5e4',
          borderRadius: '0 0 4px 4px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          style={{ padding: '4px 5px' }}
        >
          <div style={{ fontSize: 4.5, fontWeight: 700, color: '#3a2000', marginBottom: 2, letterSpacing: '0.1em' }}>YOUR TICKET</div>
          <div style={{ display: 'flex', gap: 1 }}>
            {[2,3,1,2,3,1,2,2,3,1,2].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, background: '#2a1a00', borderRadius: 0.5 }} />
            ))}
          </div>
          <div style={{ fontSize: 4, color: '#8a6020', marginTop: 2 }}>×2 ADULT</div>
        </motion.div>
      </motion.div>

      {/* Card tap approved badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 2.1, type: 'spring', stiffness: 300 }}
        style={{
          position: 'absolute', left: 162, top: 118,
          background: '#16a34a', borderRadius: 999,
          padding: '4px 10px',
          boxShadow: '0 4px 16px rgba(22,163,74,0.4)',
        }}
      >
        <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>✓ Paid</span>
      </motion.div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────
const STEPS_TICKETING = [
  { step: '01', title: 'Browse & Select', desc: 'Attendees browse available events and select tickets directly on the kiosk touchscreen.' },
  { step: '02', title: 'Choose Seats', desc: 'Interactive seat map lets customers pick their exact location, the same experience as the website.' },
  { step: '03', title: 'Pay', desc: 'Card payment on the integrated terminal. Fast, contactless, no cash handling.' },
  { step: '04', title: 'Print or Digital', desc: 'Ticket printed on the spot or sent to mobile; the customer chooses.' },
]

const STEPS_CASHLESS = [
  { step: '01', title: 'Browse the Menu', desc: 'Attendee browses food and drink options on the kiosk touchscreen, with no staff interaction needed.' },
  { step: '02', title: 'Build Your Order', desc: 'Add items, choose quantities, and customise. Order is sent directly to the kitchen or bar.' },
  { step: '03', title: 'Pay with Wristband', desc: 'Tap the cashless wristband or event card on the NFC reader to pay instantly from their balance.' },
  { step: '04', title: 'Collect', desc: 'Order confirmation printed or shown on screen. Attendee picks up at the counter when ready.' },
]

const USE_CASES = [
  { icon: '🏟', title: 'Venues & Arenas', desc: 'Reduce queue pressure at box offices with always-on self-service terminals.' },
  { icon: '🎵', title: 'Festival Entrances', desc: 'Last-minute buyers can purchase and collect without staff involvement.' },
  { icon: '🛍', title: 'Retail Locations', desc: 'Deploy in shopping centres and partner locations to extend our sales reach.' },
]

const SPECS = [
  { label: 'Display', value: '21.5" 1080×1920 capacitive touch' },
  { label: 'Processor', value: 'Quad-Core ARM 2.0 GHz' },
  { label: 'Memory', value: '4 GB RAM · 64 GB ROM' },
  { label: 'OS', value: 'Android 11' },
  { label: 'Payment', value: 'NFC · chip card · contactless reader' },
  { label: 'Scanner', value: '1D/2D barcode module' },
  { label: 'Printer', value: '80 mm thermal printer' },
  { label: 'Mounting', value: 'Floor standing (stationary or wheeled)' },
]

function HowItWorksTabs() {
  const [tab, setTab] = useState<'ticketing' | 'cashless'>('ticketing')
  const steps = tab === 'ticketing' ? STEPS_TICKETING : STEPS_CASHLESS
  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(['ticketing', 'cashless'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: tab === t ? ACCENT : `${ACCENT}12`,
              color: tab === t ? 'white' : ACCENT,
            }}
          >
            {t === 'ticketing' ? '🎟 Ticketing' : '💳 Cashless'}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-5 p-5 rounded-2xl bg-[#F8F6FC] items-start">
            <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
              style={{ background: `${ACCENT}18`, color: ACCENT, fontFamily: "'Panel Sans', sans-serif" }}>
              {s.step}
            </div>
            <div>
              <h3 className="font-bold text-[#11002B] mb-1">{s.title}</h3>
              <p className="text-sm text-[#3A3342]/60 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
export default function KiosksPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="kiosks" />

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #040c1c 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{
          right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`, filter: 'blur(40px)',
        }} />
        <div className="absolute" style={{
          left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Product 05
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Kiosks
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Self-service ticketing terminals for venues and events.{' '}
              <span className="text-white/85 font-medium">Buy, pay, and collect</span>
              {'. '}No staff needed, no queues.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <KioskVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>
                  24/7
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Always available</p>
                <p className="text-xs text-white/25 mt-1">No staff hours required</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-6xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  Zero<br/><span style={{ color: ACCENT }}>cash</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Card & NFC only</p>
                <p className="text-xs text-white/25 mt-1">Contactless payment terminal</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-4xl md:text-5xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  Print <span style={{ color: ACCENT }}>+ app</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Customer chooses</p>
                <p className="text-xs text-white/25 mt-1">Paper or mobile delivery</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Hardware: AF910 ── */}
      <section id="hardware" className="max-w-5xl mx-auto px-8 pt-24 pb-16">
        <motion.div {...fade(0.1)} className="flex flex-col md:flex-row gap-16 items-center">
          {/* Product image */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl" style={{
                background: `radial-gradient(ellipse at 50% 80%, ${ACCENT}22 0%, transparent 70%)`,
                filter: 'blur(24px)',
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.nexgoglobal.com/static/upload/image/20230627/1687856718581698.png"
                alt="AF910 self-service kiosk"
                style={{ width: 220, height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 24px 48px rgba(37,99,235,0.18))' }}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="flex-1">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>Hardware</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              AF910 Kiosk
            </h2>
            <p className="text-base text-[#3A3342]/65 leading-relaxed mb-8 max-w-md">
              A full-featured 21.5" self-service terminal purpose-built for ticketing and cashless payments.
              Modular design: add the peripherals you need (thermal printer, barcode scanner, NFC reader, and chip card terminal).
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {SPECS.map((s) => (
                <div key={s.label} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid #11002B10' }}>
                  <span className="text-xs font-semibold text-[#3A3342]/40 uppercase tracking-wide w-24 shrink-0 pt-0.5">{s.label}</span>
                  <span className="text-sm font-medium text-[#11002B]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Apps inside the kiosk ── */}
      <section id="kiosk-apps" className="max-w-5xl mx-auto px-8 pb-20">
        <motion.div {...fade(0.15)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-2">Apps Inside the Kiosk</h2>
          <p className="text-sm text-[#3A3342]/55 mb-8 max-w-lg">
            Two PLG apps run side by side on every kiosk, so attendees pick what they need from a single terminal.
          </p>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Ticketing App */}
            <div className="rounded-3xl overflow-hidden border border-[#11002B]/8 bg-[#F8F6FC]">
              <div className="px-7 py-6 flex items-center gap-4" style={{ borderBottom: '1px solid #11002B0A' }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: `${ACCENT}18` }}>
                  🎟
                </div>
                <div>
                  <h3 className="font-bold text-[#11002B] text-base">Ticketing App</h3>
                  <p className="text-xs text-[#3A3342]/50 mt-0.5">Event browsing · seat selection · print & mobile</p>
                </div>
              </div>
              <ul className="px-7 py-5 space-y-3 text-sm text-[#3A3342]/65">
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Browse events and select ticket category</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Interactive seat map, same UX as the website</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Pay by card or NFC, then print or send to mobile</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Supports last-minute walk-up purchases</li>
              </ul>
            </div>

            {/* Cashless App */}
            <div className="rounded-3xl overflow-hidden border border-[#11002B]/8 bg-[#F8F6FC]">
              <div className="px-7 py-6 flex items-center gap-4" style={{ borderBottom: '1px solid #11002B0A' }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: `${ACCENT}18` }}>
                  💳
                </div>
                <div>
                  <h3 className="font-bold text-[#11002B] text-base">Cashless App</h3>
                  <p className="text-xs text-[#3A3342]/50 mt-0.5">Catering orders · NFC payment · connected to cashless</p>
                </div>
              </div>
              <ul className="px-7 py-5 space-y-3 text-sm text-[#3A3342]/65">
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Browse and order food & drinks directly from the kiosk</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Order sent straight to the kitchen or bar, no staff needed</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Pay by tapping a cashless wristband or event card</li>
                <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Fully integrated with the PLG Cashless solution</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <motion.section id="how-it-works" {...fade(0.2)} className="mb-14">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">How It Works</h2>
          <HowItWorksTabs />
        </motion.section>

        <motion.section id="where-we-deploy" {...fade(0.3)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Where We Deploy</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {USE_CASES.map((u) => (
              <div key={u.title} className="p-6 rounded-2xl border border-[#11002B]/8 hover:border-[#3B82F6]/30 transition-colors text-center">
                <span className="text-4xl mb-3 block">{u.icon}</span>
                <h3 className="font-bold text-[#11002B] mb-2">{u.title}</h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',            label: 'Hero' },
          { id: 'hardware',        label: 'Hardware' },
          { id: 'kiosk-apps',      label: 'Kiosk Apps' },
          { id: 'how-it-works',    label: 'How It Works' },
          { id: 'where-we-deploy', label: 'Where We Deploy' },
        ]}
      />
    </div>
  )
}
