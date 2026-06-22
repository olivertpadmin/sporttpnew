'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#06D373'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// SSO Visual: browser login → authenticated → radiating connections
// ─────────────────────────────────────────────────────────

const ICONS = [
  { icon: '🎟', label: 'Ticketing', x: -100, y: -55 },
  { icon: '📱', label: 'Apps',      x: 100,  y: -55 },
  { icon: '💳', label: 'Cashless',  x: -100, y: 65  },
  { icon: '🏟', label: 'Venues',    x: 100,  y: 65  },
]

function SSOVisual() {
  return (
    <div className="relative select-none" style={{ width: 340, height: 270 }}>

      {/* Connecting SVG lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        viewBox="0 0 340 270"
      >
        {ICONS.map((ic, i) => {
          const cx = 170 + ic.x
          const cy = 135 + ic.y
          return (
            <motion.line
              key={i}
              x1={170} y1={135}
              x2={cx} y2={cy}
              stroke={ACCENT}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 1.8 + i * 0.15, ease: 'easeOut' }}
            />
          )
        })}
      </svg>

      {/* Product icon badges */}
      {ICONS.map((ic, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 2.0 + i * 0.15, type: 'spring', stiffness: 260 }}
          style={{
            position: 'absolute',
            left: 170 + ic.x - 40,
            top: 135 + ic.y - 18,
            width: 80,
            height: 36,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 15 }}>{ic.icon}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{ic.label}</span>
        </motion.div>
      ))}

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 110, top: 60,
          width: 120, height: 140,
          borderRadius: 14,
          background: 'linear-gradient(160deg, #0f1a12 0%, #091409 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          padding: '12px 10px',
        }}
      >
        {/* URL bar */}
        <div style={{
          height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.06)',
          marginBottom: 10, display: 'flex', alignItems: 'center', paddingLeft: 6,
        }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, marginRight: 4 }} />
          <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>plg.auth</span>
        </div>

        {/* Email field */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Email</div>
          <motion.div
            style={{
              height: 18, borderRadius: 4,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', paddingLeft: 6, overflow: 'hidden',
            }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden' }}
            >
              fan@example.com
            </motion.span>
          </motion.div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Password</div>
          <div style={{
            height: 18, borderRadius: 4,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', paddingLeft: 6, gap: 3,
          }}>
            {[0,1,2,3,4,5,6,7].map((d) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + d * 0.06, type: 'spring', stiffness: 400 }}
                style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }}
              />
            ))}
          </div>
        </div>

        {/* Sign in button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            height: 20, borderRadius: 5,
            background: ACCENT,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 7, fontWeight: 700, color: '#001a0a' }}>Sign In</span>
        </motion.div>
      </motion.div>

      {/* Authenticated badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.7, type: 'spring', stiffness: 260 }}
        style={{
          position: 'absolute', left: 116, top: 184,
          background: '#04a858',
          borderRadius: 999,
          padding: '4px 10px',
          boxShadow: `0 4px 20px ${ACCENT}50`,
        }}
      >
        <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>✓ SSO Active</span>
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
// Problem cards data
// ─────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l5 5M13 13l5 5" />
      </svg>
    ),
    title: 'Fragmented Identity',
    desc: 'Fans create separate accounts for every touchpoint: website, mobile app, fanshop, kiosk. Nothing is connected, nothing is shared.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
    title: 'Lost Fan Data',
    desc: 'Without a single profile, there is no personalization, no cross-selling, and no way to understand what a fan actually does across your channels.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
    title: 'Security Gaps',
    desc: 'Multiple password stores, inconsistent security policies, no central audit trail. Every separate system is a separate liability.',
  },
]

// ─────────────────────────────────────────────────────────
// Benefits data
// ─────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'One Fan = One Profile',
    desc: 'All interactions from every channel (tickets, merch, food, app usage) are unified in a single identity. You finally see the full picture.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Your Brand, Your Login',
    desc: 'Custom logo, colors, and branded emails for every login screen. Fans see your club, not ours. Complete white-label experience.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Instant Onboarding',
    desc: 'Fans register once and access everything: tickets, merch, stadium services, loyalty programs. No friction, no re-registration.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'GDPR Compliant',
    desc: 'Account deletion, consent management, and data ownership are built in from day one. Your legal team will thank you.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Cross-Channel Insights',
    desc: 'See what a fan does across ticketing, app, fanshop, and cashless in one unified view. Data-driven decisions, not guesswork.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Zero Development Cost',
    desc: 'We build and maintain the SSO infrastructure. You configure and use it. No dev team needed on your side.',
  },
]

// ─────────────────────────────────────────────────────────
// Platform features data
// ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    slug: 'login',
    accent: '#06D373',
    title: 'Login & Registration',
    subtitle: 'Branded and frictionless',
    desc: 'Custom login screens with your logo and colors. Social auth via Google and Apple, magic-link login, email validation, and smart password policies. Fans get in fast.',
    image: '/media/sso-login.png',
  },
  {
    slug: 'profile',
    accent: '#7C5CBF',
    title: 'User Profile',
    subtitle: 'One profile, every source',
    desc: 'A single fan profile showing data from all connected sources: ticket history, fanshop orders, cashless spend, event attendance, loyalty status. Available on web and in the mobile app. Fans manage their own data and consents.',
    image: '/media/sso-profile.png',
  },
  {
    slug: 'loyalty',
    accent: '#E8A838',
    title: 'Loyalty Program',
    subtitle: 'Reward your most loyal fans',
    desc: 'Built-in loyalty system with points collection, tiers (Gold, Silver, Bronze), and rewards redeemable across all channels. Fans earn points from tickets, merch, food, and app engagement. Everything tied to their SSO profile.',
    image: '/media/sso-loyalty.png',
  },
]

// ─────────────────────────────────────────────────────────
// Branded experience data
// ─────────────────────────────────────────────────────────
const BRAND_EXAMPLES = [
  { name: 'Slavia Praha', image: '/media/sso-slavia.png' },
  { name: 'Sparta Praha', image: '/media/sso-sparta.png' },
  { name: 'Ticketportal', image: '/media/sso-tp.png' },
  { name: 'PLG Ecosystem', image: '/media/sso-plg.png' },
]

// ─────────────────────────────────────────────────────────
// Integration hub data
// ─────────────────────────────────────────────────────────
const INTEGRATIONS = [
  { name: 'Ticketing', color: '#F59E0B', desc: 'Fan accounts for ticket purchases' },
  { name: 'Ticket Apps', color: '#EF4444', desc: 'Mobile app authentication' },
  { name: 'Scanning', color: '#22D3EE', desc: 'Staff login for gate operations' },
  { name: 'Cashless', color: '#EA580C', desc: 'Wallet linked to fan identity' },
  { name: 'Kiosks', color: '#2563EB', desc: 'Self-service terminal auth' },
  { name: 'AI Assistant', color: '#BE185D', desc: 'Promoter tool access control' },
  { name: 'CRM', color: '#0D9488', desc: 'Fan data flows from SSO profiles' },
  { name: 'Venue Apps', color: '#7C3AED', desc: 'Club and arena app login' },
]

// ─────────────────────────────────────────────────────────
// How It Works: layered architecture visual
// ─────────────────────────────────────────────────────────
const ARCH_LAYERS = [
  {
    title: 'Your Channels',
    subtitle: 'Integration Layer',
    desc: 'Website, mobile app, fanshop, kiosk, CRM',
    items: ['Website', 'App', 'Fanshop', 'Kiosk', 'CRM'],
  },
  {
    title: 'OAuth 2.0 / OIDC',
    subtitle: 'Protocol Layer',
    desc: 'Secure, token-based, industry standard',
  },
  {
    title: 'Identity Provider',
    subtitle: 'SSO Core',
    desc: 'Login, registration, 2FA, password reset, magic links',
  },
]

function ArchitectureDiagram() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Integration Layer (top) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative mb-3"
      >
        <div className="rounded-2xl px-6 py-5" style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Integration Layer</p>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Your Channels</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Website', 'Mobile App', 'Fanshop', 'Kiosk', 'CRM'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 260 }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Connecting dashes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <div className="flex flex-col items-center gap-1 py-1">
          {[0,1,2].map((d) => (
            <div key={d} style={{ width: 2, height: 4, borderRadius: 1, background: `${ACCENT}40` }} />
          ))}
        </div>
      </motion.div>

      {/* OAuth Layer (middle) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative mb-3"
      >
        <div className="rounded-2xl px-6 py-5" style={{
          background: `${ACCENT}08`,
          border: `1px solid ${ACCENT}25`,
        }}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}15` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Protocol Layer</p>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>OAuth 2.0 / OpenID Connect</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Secure, token-based, industry-standard authentication protocol</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connecting dashes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <div className="flex flex-col items-center gap-1 py-1">
          {[0,1,2].map((d) => (
            <div key={d} style={{ width: 2, height: 4, borderRadius: 1, background: `${ACCENT}40` }} />
          ))}
        </div>
      </motion.div>

      {/* Identity Provider (bottom / foundation) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-2xl" style={{
          background: `radial-gradient(ellipse at center, ${ACCENT}15 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }} />
        <div className="relative rounded-2xl px-6 py-6" style={{
          background: `linear-gradient(135deg, ${ACCENT}15 0%, ${ACCENT}08 100%)`,
          border: `1px solid ${ACCENT}35`,
        }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}20` }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: ACCENT }}>SSO Core</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Identity Provider</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Login, registration, 2FA, password reset, magic links, social auth</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

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
          SSO
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
export default function SSOPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="sso" />

      {/* ── 1. Hero ── */}
      <section id="hero" className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #01190e 100%)' }}>
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
          background: 'radial-gradient(circle, rgba(6,211,115,0.1) 0%, transparent 70%)', filter: 'blur(40px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Core Infrastructure
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              SSO
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Give your fans one account that works everywhere.{' '}
              <span className="text-white/85 font-medium">Branded login, unified profile, seamless access</span>
              {' '}across your website, app, fanshop, and every touchpoint.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <SSOVisual />
          </motion.div>
        </div>

        {/* ── Stats Strip (feature highlights) ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                { headline: ['One Login,', 'All Channels'], sub: 'Website, app, fanshop, kiosks', detail: 'Fans authenticate once and move freely across every touchpoint' },
                { headline: ['Fully', 'Branded'], sub: 'Your logo, your colors, your identity', detail: 'Every login screen, email, and profile matches your brand' },
                { headline: ['Built-in', 'Security'], sub: 'OAuth 2.0, 2FA, GDPR-ready', detail: 'Enterprise-grade auth with zero effort from your side' },
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

      {/* ── 2. Showcase Mockup ── */}
      <section id="showcase" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)}>
            <img
              src="/media/sso-hero.png"
              alt="SSO Branded Login"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. The Opportunity ── */}
      <section id="opportunity" className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)}>
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              The problem with fan identity
            </h2>
            <p className="text-base text-[#3A3342]/55 mb-12 max-w-lg">
              Fans create a new account for every channel. Passwords pile up. Data stays siloed.
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
              One identity. Every channel.<br />
              <span style={{ color: ACCENT }}>Complete fan profile.</span>
            </h3>
            <p className="text-base text-[#3A3342]/55 mt-4 max-w-md mx-auto">
              SSO connects all your channels so fans log in once and you see everything.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. How It Works ── */}
      <section id="how-it-works" className="relative py-24 px-8 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #0a0f1a 45%, #01190e 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />
        <div className="absolute" style={{
          left: '50%', top: '60%', width: 500, height: 500, borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 70%)`, filter: 'blur(60px)',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div {...fade(0.1)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-white mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              How it works
            </h2>
            <p className="text-base text-white/40 max-w-lg mx-auto">
              Three layers. One seamless experience.
            </p>
          </motion.div>

          <ArchitectureDiagram />
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
              Everything your club needs from a modern identity platform.
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
              What SSO can do
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg">
              A complete identity platform with everything fans and admins need.
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

      {/* ── 7. Branded Experience ── */}
      <section id="branding" className="py-24 px-8" style={{ background: '#F0FDF4' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Your brand, your login
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg mx-auto">
              Every client gets a fully customized SSO experience. Same platform, unique identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRAND_EXAMPLES.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={brand.image}
                  alt={`${brand.name} branded login`}
                  className="w-full rounded-2xl"
                  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Ecosystem Integration ── */}
      <section id="integration" className="py-24 px-8" style={{ background: '#F0FDFA' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade(0.1)} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl text-[#11002B] mb-3 leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Connected to every product
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg mx-auto">
              SSO is the identity layer for the entire PLG ecosystem. Every product authenticates through it.
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
          { id: 'hero', label: 'SSO' },
          { id: 'showcase', label: 'Overview' },
          { id: 'opportunity', label: 'The Problem' },
          { id: 'how-it-works', label: 'How It Works' },
          { id: 'benefits', label: 'Key Benefits' },
          { id: 'features', label: 'Platform' },
          { id: 'branding', label: 'Branding' },
          { id: 'integration', label: 'Integration' },
        ]}
      />
    </div>
  )
}
