'use client'

import { motion } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#22D3EE'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// Scanning Visual: ticket QR → laser sweep → Valid ✓ badge
// ─────────────────────────────────────────────────────────
const QR_MATRIX = [
  [1,1,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,1,0,1],
  [1,0,1,1,0,1,1,0,1],
  [0,0,0,1,0,0,0,0,0],
  [1,0,1,0,1,0,0,1,0],
  [0,0,0,1,1,0,1,0,1],
  [1,1,1,0,0,1,0,0,0],
  [1,0,1,0,1,1,1,1,0],
  [1,1,1,0,0,0,0,1,1],
]

function ScanningVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>

      {/* Ticket card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 40, top: 40,
          width: 130, height: 160,
          borderRadius: 12,
          background: 'linear-gradient(160deg, #0a1a1f 0%, #061114 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
          padding: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 7, color: ACCENT, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 8 }}>TICKET</div>
        <div style={{ fontSize: 9, fontWeight: 800, color: 'white', fontFamily: "'Panel Sans', sans-serif", marginBottom: 8, lineHeight: 1.2 }}>
          Sparta vs Slavia<br/>
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Sector A · Row 8 · Seat 14</span>
        </div>

        {/* QR Code */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 1.5, padding: '2px' }}>
          {QR_MATRIX.flat().map((cell, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                paddingBottom: '100%',
                background: cell ? 'rgba(255,255,255,0.85)' : 'transparent',
                borderRadius: 0.5,
              }}
            />
          ))}
        </div>

        {/* Scanning laser line */}
        <motion.div
          style={{
            position: 'absolute',
            left: 12, right: 12,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            boxShadow: `0 0 8px ${ACCENT}`,
            top: 60,
          }}
          animate={{ top: [60, 150, 60] }}
          transition={{ duration: 2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Corner scan brackets */}
        {[
          { top: 55, left: 12 }, { top: 55, right: 12 },
          { bottom: 12, left: 12 }, { bottom: 12, right: 12 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', ...pos,
            width: 10, height: 10,
            borderTop: i < 2 ? `2px solid ${ACCENT}` : undefined,
            borderBottom: i >= 2 ? `2px solid ${ACCENT}` : undefined,
            borderLeft: i % 2 === 0 ? `2px solid ${ACCENT}` : undefined,
            borderRight: i % 2 === 1 ? `2px solid ${ACCENT}` : undefined,
          }} />
        ))}
      </motion.div>

      {/* Phone scanning */}
      <motion.div
        initial={{ opacity: 0, x: 40, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', right: 20, top: 30,
          width: 80, height: 140,
          borderRadius: 14,
          background: 'linear-gradient(160deg, #1a1a2e 0%, #0d0d1a 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 24, height: 7, background: '#0d0d1a',
          borderBottomLeftRadius: 5, borderBottomRightRadius: 5, zIndex: 10,
        }} />
        <div style={{
          margin: '16px 8px 6px',
          height: 80,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 6,
          border: `1px solid ${ACCENT}40`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {[{ top: 4, left: 4 }, { top: 4, right: 4 }, { bottom: 4, left: 4 }, { bottom: 4, right: 4 }].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', ...pos, width: 8, height: 8,
              borderTop: i < 2 ? `1.5px solid ${ACCENT}` : undefined,
              borderBottom: i >= 2 ? `1.5px solid ${ACCENT}` : undefined,
              borderLeft: i % 2 === 0 ? `1.5px solid ${ACCENT}` : undefined,
              borderRight: i % 2 === 1 ? `1.5px solid ${ACCENT}` : undefined,
            }} />
          ))}
          <motion.div
            style={{
              position: 'absolute', left: 4, right: 4, height: 1.5,
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            }}
            animate={{ top: [8, 64, 8] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div style={{ textAlign: 'center', fontSize: 6, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
          SCANNING...
        </div>
      </motion.div>

      {/* Valid badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.0, type: 'spring', stiffness: 300 }}
        style={{
          position: 'absolute', left: 120, bottom: 10,
          background: '#16a34a',
          borderRadius: 999,
          padding: '6px 14px',
          boxShadow: '0 4px 24px rgba(22,163,74,0.5)',
        }}
      >
        <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>✓ Valid</span>
      </motion.div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────
const STEPS = [
  {
    step: '01',
    title: 'Load the Event',
    desc: 'Staff log in or scan a setup QR code from another device, with no password needed. All valid codes sync to the device and are ready for offline use.',
  },
  {
    step: '02',
    title: 'Scan at the Gate',
    desc: 'Point camera at QR/barcode, use the laser reader on a Zebra or Honeywell device, or enter a code manually. Result appears in under 0.3s.',
  },
  {
    step: '03',
    title: 'Instant Colour-Coded Result',
    desc: 'Green = can enter. Orange = wrong zone or additional permit required. Red = not valid or duplicate. Audio and vibration alerts leave no ambiguity for gate staff.',
  },
  {
    step: '04',
    title: 'Live Overview for Organisers',
    desc: 'Real-time dashboard shows codes inside, gate throughput per device, and capacity status, updating with every scan across all gates simultaneously.',
  },
]

const SCAN_RESULTS = [
  { color: '#16a34a', label: 'OK: Can Enter', desc: 'Valid ticket, no previous entry (or re-entry allowed). Gate opens.' },
  { color: '#d97706', label: 'Already Inside', desc: 'Valid but no exit recorded. Staff can manually allow exit or reject re-entry.' },
  { color: '#dc2626', label: 'Not Valid', desc: 'Invalid code, unknown ticket, or wrong event. Entry blocked.' },
  { color: '#d97706', label: 'Wrong Zone', desc: 'Valid ticket but not for this gate or zone. Redirect to correct entrance.' },
  { color: '#d97706', label: 'Permit Required', desc: 'Two-step authorisation needed. Staff grant an additional permit before entry.' },
]

const USE_CASES = [
  { icon: '🏟', title: 'Stadiums & Arenas', desc: 'Multi-gate simultaneous scanning with zone control, turnstile integration, and panic mode for safety.' },
  { icon: '🎪', title: 'Festival Zones', desc: 'Area-specific checking for stages, VIP, and day passes. Offline-first for field conditions.' },
  { icon: '🎭', title: 'Theatres & Clubs', desc: 'Single-entrance events with sector and discount tracking, manual code entry fallback.' },
]

const BACKOFFICE = [
  { icon: '📡', title: 'Real-time Overview', desc: 'Live donut chart and table: how many attendees are inside, outside, and not yet authorised, per event, per gate, per device.' },
  { icon: '📈', title: 'Passages Statistics', desc: 'Filter by time period, zone, sector, discount, gate, or staff member. Bar chart shows entry flow across the event timeline.' },
  { icon: '📋', title: 'Passages Log', desc: 'Full record of every scan: code, direction (entry/exit/rejected), timestamp, device, and staff user. Export to CSV.' },
  { icon: '⚙️', title: 'Event & Device Setup', desc: 'Configure checking profiles, assign devices to gates, set zone rules, and push settings to all devices from a single web interface.' },
  { icon: '👤', title: 'Staff Management', desc: 'Add and manage checking users, set permissions per event, and control whether devices are server-controlled or locally managed.' },
  { icon: '🔌', title: 'External Integrations', desc: 'Connect to third-party ticketing providers via API. Events and ticket codes import automatically, with no manual data entry.' },
]

const ADVANCED = [
  { icon: '🎫', title: 'Event Groups', desc: 'Link multiple events so a one-time ticket can only be used once across the group, ideal for multi-day festivals or series.' },
  { icon: '🔐', title: 'Additional Permits', desc: 'Two-step entry: the ticket is scanned first, then a separate permit code is required before access is granted.' },
  { icon: '🚨', title: 'Panic Mode', desc: 'Instantly release all turnstile arms across the venue in an emergency, triggered remotely from the BackOffice.' },
  { icon: '⏱', title: 'Scheduled Auto-Exit', desc: 'Automatically record an exit for selected ticket types at a set time, useful for timed slots or sessions.' },
  { icon: '📦', title: 'Batch Passages', desc: 'Insert bulk entry or exit records for a list of codes, including time, device, and direction, directly in the BackOffice.' },
  { icon: '🏷', title: 'Code Channels', desc: 'Distinguish tickets sold through different channels (app, web, print) using configurable prefix/suffix profiles per channel.' },
]

const FEATURES = [
  { icon: '🔎', title: 'QR & Barcode Scanning', desc: 'Instant ticket validation via camera. Works with all PLG-issued tickets, digital and printed.' },
  { icon: '⚡', title: 'Offline Mode', desc: 'Downloads all valid codes to the device. Full validation runs locally, with no internet needed mid-event.' },
  { icon: '👥', title: 'Multi-staff Support', desc: 'Multiple staff scan simultaneously at different entry gates, all connected to one event.' },
  { icon: '🚨', title: 'Fraud Detection', desc: 'Duplicate and already-used tickets flagged instantly with colour, sound, and vibration alert.' },
  { icon: '📊', title: 'Live Entry Stats', desc: 'Real-time organiser dashboard: attendees inside, gate throughput, capacity status per device.' },
  { icon: '🔗', title: 'Platform Connected', desc: 'Tied directly to ticketing backend; cancellations and updates reflect in real time across all devices.' },
]

// ─────────────────────────────────────────────────────────
export default function ScanningAppsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="scanning-apps" />

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #04191d 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{
          right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`, filter: 'blur(40px)',
        }} />
        <div className="absolute" style={{
          left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Product 03
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Scanning<br />Apps
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              The tool our staff and venue teams use at the gates.{' '}
              <span className="text-white/85 font-medium">Fast, reliable entry control</span>
              {' '}that works even when the internet doesn&rsquo;t.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <ScanningVisual />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>
                  &lt;0.3s
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Scan speed</p>
                <p className="text-xs text-white/25 mt-1">Per ticket validation</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-6xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  100<span className="text-3xl" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Offline capable</p>
                <p className="text-xs text-white/25 mt-1">Local DB, no internet needed</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-5xl md:text-6xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  QR <span style={{ color: ACCENT }}>+</span> laser
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Input methods</p>
                <p className="text-xs text-white/25 mt-1">Camera, laser reader, manual entry</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pb-24">

        {/* ── Device explainer ── */}
        <motion.section id="checkticket" {...fade(0.15)} className="pt-16 mb-16">
          <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #04191d 0%, #071e26 100%)', border: `1px solid ${ACCENT}22` }}>
            <div className="p-8 md:p-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>CheckTicket</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Runs on any device.<br />Built for the gate.
              </h2>
              <p className="text-white/60 leading-relaxed max-w-2xl text-sm mb-8">
                CheckTicket runs on consumer Android and iOS phones, on industrial handheld scanners from Zebra and Honeywell with built-in laser readers, and on dedicated turnstile hardware. One app, every gate configuration.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🤖', label: 'Android' },
                  { icon: '🍎', label: 'iOS' },
                  { icon: '📡', label: 'Zebra / Honeywell' },
                  { icon: '🚧', label: 'Turnstile' },
                ].map((d) => (
                  <div key={d.label} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(34,211,238,0.05)', border: `1px solid ${ACCENT}18` }}>
                    <div className="text-2xl mb-2">{d.icon}</div>
                    <div className="text-xs font-semibold text-white/50">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── How It Works ── */}
        <motion.section id="how-it-works" {...fade(0.2)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">How It Works</h2>
          <div className="space-y-3">
            {STEPS.map((s) => (
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
        </motion.section>

        {/* ── Scan Results ── */}
        <motion.section id="scan-results" {...fade(0.25)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-2">Scan Results</h2>
          <p className="text-sm text-[#3A3342]/55 mb-6 max-w-lg">Every scan returns one of five states, colour-coded, with audio and vibration feedback.</p>
          <div className="space-y-2">
            {SCAN_RESULTS.map((r) => (
              <div key={r.label} className="flex items-center gap-4 p-4 rounded-2xl border border-[#11002B]/8">
                <div className="shrink-0 w-3 h-3 rounded-full" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}80` }} />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="font-semibold text-sm text-[#11002B] w-48 shrink-0">{r.label}</span>
                  <span className="text-sm text-[#3A3342]/55">{r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Where We Use It ── */}
        <motion.section id="where-we-use" {...fade(0.3)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Where We Use It</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {USE_CASES.map((u) => (
              <div key={u.title} className="p-6 rounded-2xl border border-[#11002B]/8 hover:border-[#22D3EE]/30 transition-colors text-center">
                <span className="text-4xl mb-3 block">{u.icon}</span>
                <h3 className="font-bold text-[#11002B] mb-2">{u.title}</h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── BackOffice ── */}
        <motion.section id="backoffice" {...fade(0.35)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-2">BackOffice Dashboard</h2>
          <p className="text-sm text-[#3A3342]/55 mb-6 max-w-lg">A companion web app for organisers: set up events, monitor entry in real time, and pull reports after the event.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BACKOFFICE.map((b) => (
              <div key={b.title} className="flex gap-4 p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#22D3EE]/30 transition-colors">
                <span className="text-2xl shrink-0">{b.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#11002B] text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-[#3A3342]/55 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Advanced ── */}
        <motion.section id="advanced" {...fade(0.4)} className="mb-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-2">Advanced Capabilities</h2>
          <p className="text-sm text-[#3A3342]/55 mb-6 max-w-lg">For complex events that need more than basic entry control.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADVANCED.map((a) => (
              <div key={a.title} className="flex gap-4 p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#22D3EE]/30 transition-colors">
                <span className="text-2xl shrink-0">{a.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#11002B] text-sm mb-1">{a.title}</h3>
                  <p className="text-xs text-[#3A3342]/55 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Features ── */}
        <motion.section id="features" {...fade(0.45)}>
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#22D3EE]/30 transition-colors">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#11002B] text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-[#3A3342]/55 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',          label: 'Hero' },
          { id: 'checkticket',   label: 'CheckTicket' },
          { id: 'how-it-works',  label: 'How It Works' },
          { id: 'scan-results',  label: 'Scan Results' },
          { id: 'where-we-use',  label: 'Where We Use It' },
          { id: 'backoffice',    label: 'BackOffice' },
          { id: 'advanced',      label: 'Advanced' },
          { id: 'features',      label: 'Features' },
        ]}
      />
    </div>
  )
}
