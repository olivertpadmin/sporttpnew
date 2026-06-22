'use client'

import { motion } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#0D9488'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// CRM Visual: dashboard card with line chart animation
// ─────────────────────────────────────────────────────────

const CHART_POINTS = [
  [0, 60], [30, 50], [60, 55], [90, 35], [120, 40], [150, 20], [180, 28], [210, 10],
]

function buildPath(points: number[][]) {
  if (points.length < 2) return ''
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const cpx = (x0 + x1) / 2
    d += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`
  }
  return d
}

const CHART_PATH = buildPath(CHART_POINTS)

function CRMVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 10, top: 20,
          width: 280, height: 200,
          borderRadius: 16,
          background: 'linear-gradient(160deg, #091a18 0%, #05120f 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          padding: '14px 16px',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 120, height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}25 0%, transparent 70%)`,
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 3 }}>REVENUE YTD</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", lineHeight: 1 }}>
              22 M <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>CZK</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, type: 'spring', stiffness: 300 }}
            style={{
              background: '#16a34a22',
              border: '1px solid #16a34a50',
              borderRadius: 6,
              padding: '3px 7px',
              fontSize: 8, color: '#4ade80', fontWeight: 700,
            }}
          >
            ↑ 18%
          </motion.div>
        </div>

        <div style={{ marginBottom: 12, position: 'relative' }}>
          <svg width="248" height="70" viewBox="0 0 210 70" style={{ overflow: 'visible' }}>
            {[20, 40, 60].map((y) => (
              <line key={y} x1="0" y1={y} x2="210" y2={y}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            <motion.path
              d={`${CHART_PATH} L 210 70 L 0 70 Z`}
              fill={`${ACCENT}18`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            />
            <motion.path
              d={CHART_PATH}
              fill="none"
              stroke={ACCENT}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            />
            <motion.circle
              cx="210" cy="10" r="4"
              fill={ACCENT}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, type: 'spring' }}
            />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
          {[
            { label: 'Fan profiles', value: '110 k+' },
            { label: 'Active markets', value: '7' },
            { label: 'Partners', value: '9' },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1,
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
              paddingRight: i < 2 ? 10 : 0,
              paddingLeft: i > 0 ? 10 : 0,
            }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 + i * 0.2 }}
                style={{ fontSize: 12, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", lineHeight: 1.2 }}
              >
                {s.value}
              </motion.div>
              <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 14, right: 16, display: 'flex' }}>
          {['#0D9488', '#7C3AED', '#EF4444', '#F59E0B'].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 + i * 0.1, type: 'spring', stiffness: 260 }}
              style={{
                width: 18, height: 18, borderRadius: '50%',
                background: `${c}99`,
                border: '1.5px solid rgba(0,0,0,0.4)',
                marginLeft: i > 0 ? -6 : 0,
              }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            style={{ marginLeft: 4, fontSize: 7, color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}
          >
            +110k
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Placeholder for screenshots (user will replace with Figma exports)
// ─────────────────────────────────────────────────────────
function ScreenPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full rounded-2xl border border-[#11002B]/8 flex items-center justify-center"
      style={{
        aspectRatio: '4 / 3',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #ebebeb 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      }}
    >
      <span className="text-sm font-medium text-[#3A3342]/30">{label}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Feature data
// ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    slug: 'dashboard',
    accent: '#0D9488',
    title: 'Dashboard',
    subtitle: 'Everything at a glance',
    desc: 'Revenue trends, fan growth, event attendance, mobile app metrics, and team notes on one customisable dashboard. Every widget is configurable per user.',
    image: '/media/crm-dashboard.png',
  },
  {
    slug: 'fans',
    accent: '#7C5CBF',
    title: 'Fan Profiles',
    subtitle: 'One profile, every interaction',
    desc: 'Unified fan records with ticket history, cashless spend, app engagement, communication history, and marketing consent. Searchable and filterable in seconds. Create smart segments based on any combination of data.',
    image: '/media/crm-fans.png',
  },
  {
    slug: 'marketing',
    accent: '#E8A838',
    title: 'Marketing',
    subtitle: 'Campaigns that convert',
    desc: 'Email campaigns with a built-in visual editor, push notifications, SMS, and promo codes. Build audiences from real fan behaviour: who attended, who bought, who opened. Automated scenarios trigger the right message at the right time.',
    image: '/media/crm-mrk.png',
  },
  {
    slug: 'reports',
    accent: '#2A9D8F',
    title: 'Reports',
    subtitle: 'Data that drives decisions',
    desc: 'Revenue by event, club, or market. Attendance trends, season ticket performance, cashless spend per head. Drill down, compare periods, and export in one click.',
    image: '/media/crm-reports.png',
  },
  {
    slug: 'cube',
    accent: '#06D373',
    title: 'Arena Cube Messages',
    subtitle: 'Broadcast to the stadium',
    desc: 'Compose and schedule messages for in-venue LED cube displays. Target by event or gate section. Real-time broadcast to the entire arena.',
    image: '/media/crm-cube.png',
  },
  {
    slug: 'helpdesk',
    accent: '#3B82F6',
    title: 'Helpdesk',
    subtitle: 'Every fan enquiry, handled',
    desc: 'Ticket-based support system built right into the CRM. Fans write in via email, forms, or the mobile app. Every message becomes a trackable ticket with status, assignee, and full conversation history.',
    image: '/media/crm-helpdesk.png',
  },
]

// ─────────────────────────────────────────────────────────
// Benefits data
// ─────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'Higher Revenue per Fan',
    desc: 'See exactly what each fan buys across tickets, F&B, and merch. Identify upsell opportunities automatically.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20" />
      </svg>
    ),
    title: 'Smarter Targeting',
    desc: 'Segment fans by behaviour, not guesswork. Season ticket holders who never buy food? Now you can reach them.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
    title: 'Faster Communication',
    desc: 'Email, push, SMS, all from one place. Automated scenarios trigger based on real fan actions.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Complete Visibility',
    desc: 'One dashboard shows revenue, attendance, and trends across all your events and venues. No spreadsheets.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Membership Made Easy',
    desc: 'Create and manage membership tiers with associated benefits. Reward your most loyal fans.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'Built-in Helpdesk',
    desc: 'Handle fan enquiries from email, forms, and in-app messages. Everything tracked, nothing lost.',
  },
]

// ─────────────────────────────────────────────────────────
// Problem cards data
// ─────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    title: 'Scattered Data',
    desc: 'Fan info lives in 5 different systems: ticketing, cashless, mobile app, fanshop, turnstiles. No single source of truth.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 15h8M9 9h.01M15 9h.01" />
      </svg>
    ),
    title: 'Blind Marketing',
    desc: 'Campaigns go to everyone or no one. No segmentation, no personalisation, no idea what works.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'Missing Revenue',
    desc: "Without data, you can't upsell season tickets, target food and drink offers, or grow merchandise sales.",
  },
]

// ─────────────────────────────────────────────────────────
// Integration hub data
// ─────────────────────────────────────────────────────────
const INTEGRATIONS = [
  { name: 'Ticketing', color: '#E8A838', desc: 'Purchase history and event attendance' },
  { name: 'Mobile Apps', color: '#7C5CBF', desc: 'App usage, device data, push tokens' },
  { name: 'Cashless', color: '#E76F51', desc: 'F&B and merchandise spend' },
  { name: 'Scanning', color: '#22D3EE', desc: 'Gate entry and stadium presence' },
  { name: 'Kiosks', color: '#EC4899', desc: 'On-site self-service transactions' },
  { name: 'SSO', color: '#06D373', desc: 'Unified identity across all products' },
  { name: 'Venue Apps', color: '#7C3AED', desc: 'Partner-side event management' },
]

// ─────────────────────────────────────────────────────────
// Hub-and-spoke SVG diagram
// ─────────────────────────────────────────────────────────
function HubDiagram() {
  const cx = 250
  const cy = 250
  const radius = 180
  const nodeCount = INTEGRATIONS.length

  return (
    <div className="w-full flex justify-center">
      <svg viewBox="0 0 500 500" className="w-full max-w-lg" style={{ overflow: 'visible' }}>
        {/* Connection lines */}
        {INTEGRATIONS.map((item, i) => {
          const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2
          const nx = cx + radius * Math.cos(angle)
          const ny = cy + radius * Math.sin(angle)
          return (
            <motion.line
              key={`line-${item.name}`}
              x1={cx} y1={cy} x2={nx} y2={ny}
              stroke={`${item.color}40`}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            />
          )
        })}

        {/* Center hub */}
        <motion.circle
          cx={cx} cy={cy} r="40"
          fill={ACCENT}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize="14" fontWeight="900" fontFamily="'Panel Sans', sans-serif">
          CRM
        </text>

        {/* Product nodes */}
        {INTEGRATIONS.map((item, i) => {
          const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2
          const nx = cx + radius * Math.cos(angle)
          const ny = cy + radius * Math.sin(angle)
          return (
            <motion.g
              key={item.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 + i * 0.08 }}
            >
              <circle cx={nx} cy={ny} r="8" fill={item.color} />
              <text
                x={nx}
                y={ny + 22}
                textAnchor="middle"
                fill="#11002B"
                fontSize="11"
                fontWeight="700"
                fontFamily="Mulish, sans-serif"
              >
                {item.name}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function CRMPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="crm" />

      {/* ── 1. Hero ── */}
      <section id="hero" className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #011210 100%)' }}>
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
          background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Product 07
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              CRM
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Know every fan. Grow every revenue stream.{' '}
              <span className="text-white/85 font-medium">One platform that unifies fan data, automates marketing, and turns insights into action</span>
              {' '}across every club, venue, and market.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <CRMVisual />
          </motion.div>
        </div>

        {/* ── 2. Stats Strip (feature highlights) ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                { headline: ['360°', 'Fan View'], sub: 'Unified profiles', detail: 'Every ticket, purchase, and interaction in one place' },
                { headline: ['Automated', 'Campaigns'], sub: 'Email, push, SMS, promo', detail: 'Built on real fan behaviour, sent in one click' },
                { headline: ['Live', 'Reporting'], sub: 'Revenue, attendance, trends', detail: 'Filter any way you need, export instantly' },
              ].map((stat, i) => (
                <div key={stat.headline.join(' ')} className={`py-10 flex flex-col ${i === 0 ? 'md:pr-10' : i === 1 ? 'md:px-10' : 'md:pl-10'}`}
                  style={i < 2 ? { borderRight: '1px solid rgba(255,255,255,0.08)' } : undefined}>
                  <div className="text-2xl md:text-3xl font-black text-white leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                    {stat.headline[0]}<br />{stat.headline[1]}
                  </div>
                  <p className="text-sm font-semibold mt-3" style={{ color: ACCENT }}>{stat.sub}</p>
                  <p className="text-xs text-white/30 mt-1">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. CRM Mockup Showcase ── */}
      <section id="showcase" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)}>
            <img
              src="/media/crm-hero.png"
              alt="CRM Dashboard"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 4. The Opportunity ── */}
      <section id="opportunity" className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)}>
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              The problem with fan data
            </h2>
            <p className="text-base text-[#3A3342]/55 mb-12 max-w-lg">
              Most clubs know their fans bought a ticket. That&apos;s where it ends.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fade(0.15 + i * 0.1)}
                className="rounded-2xl border border-[#11002B]/6 p-7"
                style={{ background: i === 1 ? '#FFFBF0' : '#FFF5F5' }}
              >
                <div className="mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-[#11002B] mb-2">{p.title}</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.4)} className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-black text-[#11002B] leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              One platform. Every touchpoint.<br />
              <span style={{ color: ACCENT }}>Full picture of every fan.</span>
            </h3>
            <p className="text-base text-[#3A3342]/55 mt-4 max-w-md mx-auto">
              Our CRM connects it all so you can turn data into revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. Key Benefits ── */}
      <section id="benefits" className="py-24 px-8" style={{ background: '#FAFBFC' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)}>
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Key benefits
            </h2>
            <p className="text-base text-[#3A3342]/55 mb-12 max-w-lg">
              Everything your club needs to understand, engage, and grow its fanbase.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                {...fade(0.1 + i * 0.06)}
                className="rounded-2xl border border-[#11002B]/6 bg-white p-7"
              >
                <div className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}10` }}>
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-[#11002B] mb-2">{b.title}</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Platform Features ── */}
      <section id="features" className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)} className="mb-16">
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              What can our CRM do
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg">
              A full-featured CRM with modules that cover all important client needs.
            </p>
          </motion.div>

          <div className="space-y-28">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.slug}
                {...fade(0.1)}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-16 items-center`}
              >
                <div className="flex-1 min-w-0">
                  <div className="w-8 h-1 rounded-full mb-5" style={{ background: f.accent }} />
                  <p className="text-sm font-semibold mb-2" style={{ color: f.accent }}>{f.subtitle}</p>
                  <h3 className="text-3xl md:text-4xl text-[#11002B] mb-4 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                    {f.title}
                  </h3>
                  <p className="text-base text-[#3A3342]/60 leading-relaxed">{f.desc}</p>
                </div>

                <div className="flex-1 min-w-0">
                  {f.image ? (
                    <img src={f.image} alt={`${f.title} screen`} className="w-full rounded-2xl" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }} />
                  ) : (
                    <ScreenPlaceholder label={`${f.title} screen`} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Ecosystem Integration ── */}
      <section id="integration" className="py-24 px-8" style={{ background: '#F0FDFA' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Connected to every product
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg mx-auto">
              The CRM pulls live data from the entire PLG ecosystem. No manual imports, no data silos.
            </p>
          </motion.div>

          <motion.div {...fade(0.2)} className="mb-12">
            <HubDiagram />
          </motion.div>

        </div>
      </section>

      {/* ── SectionNav ── */}
      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'CRM' },
          { id: 'showcase', label: 'Overview' },
          { id: 'opportunity', label: 'The Opportunity' },
          { id: 'benefits', label: 'Key Benefits' },
          { id: 'features', label: 'Platform' },
          { id: 'integration', label: 'Integration' },
        ]}
      />
    </div>
  )
}
