'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#F59E0B'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

function CountUp({ to, suffix = '', duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)
  useEffect(() => {
    const unsub = mv.on('change', (v) => { if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}` })
    return unsub
  }, [mv, suffix])
  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => ctrl.stop()
  }, [isInView, mv, to, duration])
  return <span ref={ref}>0{suffix}</span>
}

// ─────────────────────────────────────────────────────────
// Ticketing Visual: event card → ticket tears off → confetti
// ─────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#F59E0B', '#EF4444', '#22D3EE', '#06D373', '#A855F7', '#EC4899']

function TicketingVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>

      {/* Confetti particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 150, y: 100, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: 150 + (Math.random() - 0.5) * 200,
            y: 100 + (Math.random() - 0.5) * 180,
            scale: [0, 1, 0.5],
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.2, delay: 2.2 + Math.random() * 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 6 + Math.random() * 6,
            height: 6 + Math.random() * 6,
            borderRadius: Math.random() > 0.5 ? '50%' : 2,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          }}
        />
      ))}

      {/* Event card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: 'absolute', left: 24, top: 40,
          width: 180, height: 120,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #1a0f00 0%, #2d1a00 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
          padding: '14px 16px',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -20, right: -20,
          width: 80, height: 80, borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`,
        }} />
        <div style={{ fontSize: 8, color: `${ACCENT}`, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 }}>LIVE EVENT</div>
        <div style={{ fontSize: 14, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", marginBottom: 4, lineHeight: 1.2 }}>
          Oktagon MMA 58
        </div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Eden Arena · Prague</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>From</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: ACCENT, fontFamily: "'Panel Sans', sans-serif" }}>990 Kč</div>
          </div>
          <div style={{
            fontSize: 7, fontWeight: 700, color: '#001a0a',
            background: ACCENT, borderRadius: 4, padding: '2px 6px',
          }}>
            Buy →
          </div>
        </div>
      </motion.div>

      {/* Ticket tearing off */}
      <motion.div
        initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
        animate={{ opacity: [0, 1, 1], x: 90, y: -15, rotate: 14 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 110, top: 100,
          width: 110, height: 60,
          borderRadius: '8px 8px 8px 8px',
          background: 'linear-gradient(135deg, #fff8e1 0%, #fffde7 100%)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          padding: '8px 10px',
          overflow: 'hidden',
        }}
      >
        {/* Perforated left edge */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 8,
          backgroundImage: 'radial-gradient(circle, transparent 4px, #fffde7 4px)',
          backgroundSize: '8px 8px',
        }} />
        <div style={{ marginLeft: 10 }}>
          <div style={{ fontSize: 6, fontWeight: 700, color: '#5a3e00', marginBottom: 3 }}>TICKET</div>
          {/* Barcode lines */}
          <div style={{ display: 'flex', gap: 1.5, marginBottom: 4 }}>
            {[2,4,2,3,2,4,3,2,4,2,3].map((w, i) => (
              <div key={i} style={{ width: w, height: 16, background: '#2a1a00', borderRadius: 0.5 }} />
            ))}
          </div>
          <div style={{ fontSize: 5, color: '#8a6a20', letterSpacing: '0.15em' }}>PLG-2024-MMA58</div>
        </div>
      </motion.div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────
const MARKETS = [
  { country: 'Estonia',        brands: ['Piletilevi.ee'],               flag: '🇪🇪' },
  { country: 'Latvia',         brands: ['Bilesuserviss.lv'],            flag: '🇱🇻' },
  { country: 'Lithuania',      brands: ['Bilietai.lt'],                 flag: '🇱🇹' },
  { country: 'Poland',         brands: ['Biletomat.pl'],                flag: '🇵🇱' },
  { country: 'Romania',        brands: ['Bilete.ro', 'Entertix.ro', 'Myticket.ro'], flag: '🇷🇴' },
  { country: 'Czech Republic', brands: ['Ticketportal.cz', 'Goout.net'], flag: '🇨🇿' },
  { country: 'Slovakia',       brands: ['Ticketportal.sk'],              flag: '🇸🇰' },
]

const PILLARS = [
  { title: 'B2C Marketplace', desc: 'Ticket buyers discover events, buy tickets, and manage their experiences across all markets through strong local brands.' },
  { title: 'B2B Organiser Tools', desc: 'Event organisers get a full admin suite: event creation, pricing, reporting, and audience management.' },
  { title: 'Internal Operations', desc: 'Our teams manage B2B partners, handle support, and monitor platform health through dedicated internal tools.' },
  { title: 'On-site Experience', desc: 'Ticket checking apps and terminal integrations for smooth venue entry and cashless operations on the ground.' },
]

const FEATURES = [
  {
    icon: '🎟',
    title: 'Ticket Resale',
    desc: 'Let your attendees safely resell tickets under your conditions and your control. No black market, full traceability.',
  },
  {
    icon: '📈',
    title: 'Dynamic Pricing',
    desc: 'Set pricing that reflects sales velocity and other criteria over time, maximising revenue for every event.',
  },
  {
    icon: '✅',
    title: 'Accreditation System',
    desc: 'We provide a complete on-site ticketing authorisation service, including hardware and software rental.',
  },
  {
    icon: '📊',
    title: 'Detailed Data',
    desc: 'Your event, your data. Use audience insights for targeted marketing campaigns and pre-event communication.',
  },
  {
    icon: '🔗',
    title: 'Ecosystem Integration',
    desc: 'Ticketing is tightly connected to every other solution in the PLG ecosystem: one platform, zero silos.',
  },
  {
    icon: '🛒',
    title: 'Sales Scenarios',
    desc: 'Sell in waves, enable priority purchase for selected groups, presale windows, and much more.',
  },
]

// ─────────────────────────────────────────────────────────
export default function TicketingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="ticketing" />

      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #1c1200 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{
          right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 70%)`, filter: 'blur(40px)',
        }} />
        <div className="absolute" style={{
          left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Product 01
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Ticketing<br />Websites
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              A two-sided marketplace connecting event organisers with ticket buyers.{' '}
              <span className="text-white/85 font-medium">7 European markets, 9 strong local brands</span>
              {', '}built on one shared platform.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <TicketingVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={9} />
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Brands</p>
                <p className="text-xs text-white/25 mt-1">Strong local ticketing identities</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={7} />
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Markets</p>
                <p className="text-xs text-white/25 mt-1">Across Central & Eastern Europe</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>
                  B2B + B2C
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Two-sided platform</p>
                <p className="text-xs text-white/25 mt-1">Organisers & buyers in one place</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <motion.section id="markets" {...fade(0.3)} className="mb-16 pt-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Markets &amp; Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARKETS.map((m) => (
              <div key={m.country} className="flex items-start gap-4 p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#E8A838]/40 transition-colors">
                <span className="text-3xl mt-0.5">{m.flag}</span>
                <div>
                  <div className="font-semibold text-[#11002B]">{m.country}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.brands.map((b) => (
                      <span key={b} className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: `${ACCENT}18`, color: ACCENT }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="offer" {...fade(0.4)} className="mb-20">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-[#F8F6FC]">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: ACCENT }} />
                <h3 className="font-bold text-[#11002B] mb-2">{p.title}</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Next-gen ticketing intro */}
        <motion.section
          id="platform"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #07000f 0%, #1c1200 100%)', padding: '56px 48px' }}
        >
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Platform</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-5 leading-none"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Next-generation<br />ticketing
          </h2>
          <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Ticketportal builds on <span className="text-white/80 font-medium">20+ years of market experience</span>. Whether you need ticketing for a concert, theatre, show, festival, or sport, we provide a complete solution from strategy setup to on-site accreditation, including hardware and software.{' '}
            Become part of the Ticketportal family and gain a strong partner for your event or club.
          </p>
        </motion.section>

        {/* Features grid */}
        <motion.section
          id="features"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl border border-[#11002B]/8 hover:border-[#F59E0B]/30 transition-colors"
                style={{ background: '#faf8ff' }}
              >
                <span className="text-2xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-[#11002B] mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',     label: 'Hero' },
          { id: 'markets',  label: 'Markets & Brands' },
          { id: 'offer',    label: 'What We Offer' },
          { id: 'platform', label: 'Platform' },
          { id: 'features', label: 'Features' },
        ]}
      />
    </div>
  )
}
