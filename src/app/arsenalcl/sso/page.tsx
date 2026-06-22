'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#06D373'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const ICONS = [
  { icon: '🎟', label: 'Ticketing', x: -100, y: -55 },
  { icon: '📱', label: 'Aplikace',  x: 100,  y: -55 },
  { icon: '💳', label: 'Cashless',  x: -100, y: 65  },
  { icon: '🏟', label: 'Arény',     x: 100,  y: 65  },
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
          <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>E-mail</div>
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
          <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Heslo</div>
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
          <span style={{ fontSize: 7, fontWeight: 700, color: '#001a0a' }}>Přihlásit se</span>
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
        <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>✓ SSO aktivní</span>
      </motion.div>

    </div>
  )
}

const PROBLEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l5 5M13 13l5 5" />
      </svg>
    ),
    title: 'Roztříštěná identita',
    desc: 'Fanoušci si vytvářejí samostatné účty pro každý kontaktní bod: web, mobilní aplikaci, fanshop i kiosk. Nic není propojené, nic se nesdílí.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
    title: 'Ztracená fanouškovská data',
    desc: 'Bez jednotného profilu není možná personalizace, cross-sell ani skutečné pochopení toho, co fanoušek napříč vašimi kanály dělá.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
    title: 'Bezpečnostní mezery',
    desc: 'Více úložišť hesel, nejednotné bezpečnostní politiky a žádná centrální auditní stopa. Každý oddělený systém představuje samostatné riziko.',
  },
]

const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Jeden fanoušek = jeden profil',
    desc: 'Všechny interakce ze všech kanálů (vstupenky, merch, občerstvení, používání aplikace) se sjednotí pod jednou identitou. Konečně vidíte celý obrázek.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Vaše značka, vaše přihlášení',
    desc: 'Vlastní logo, barvy a brandované e-maily pro každou přihlašovací obrazovku. Fanoušci vidí váš klub, ne nás. Kompletní white-label řešení.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Okamžitý onboarding',
    desc: 'Fanoušci se zaregistrují jednou a získají přístup ke všemu: vstupenkám, merchi, stadionovým službám i věrnostním programům. Bez tření, bez opakované registrace.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'V souladu s GDPR',
    desc: 'Mazání účtů, správa souhlasů i vlastnictví dat jsou součástí řešení od prvního dne. Vaše právní oddělení to ocení.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Přehled napříč kanály',
    desc: 'V jednom sjednoceném pohledu vidíte, co fanoušek dělá v ticketingu, aplikaci, fanshopu i cashless. Rozhodování na základě dat, ne odhadů.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Nulové náklady na vývoj',
    desc: 'SSO infrastrukturu vybudujeme a spravujeme my. Vy ji jen nastavíte a používáte. Na vaší straně není potřeba vývojový tým.',
  },
]

const FEATURES = [
  {
    slug: 'login',
    accent: '#06D373',
    title: 'Přihlášení a registrace',
    subtitle: 'Brandovaný a bez tření',
    desc: 'Vlastní přihlašovací obrazovky s vaším logem a barvami. Sociální přihlášení přes Google a Apple, magic link login, ověření e-mailu a chytré politiky hesel. Fanoušci se dostanou dovnitř rychle.',
    image: '/media/sso-login.png',
  },
  {
    slug: 'profile',
    accent: '#7C5CBF',
    title: 'Uživatelský profil',
    subtitle: 'Jeden profil, všechny zdroje',
    desc: 'Jeden fanouškovský profil zobrazující data ze všech připojených zdrojů: historii vstupenek, objednávky z fanshopu, cashless útratu, účast na akcích i věrnostní status. Dostupný na webu i v mobilní aplikaci. Fanoušci si sami spravují svá data i souhlasy.',
    image: '/media/sso-profile.png',
  },
  {
    slug: 'loyalty',
    accent: '#E8A838',
    title: 'Věrnostní program',
    subtitle: 'Odměňte své nejvěrnější fanoušky',
    desc: 'Vestavěný věrnostní systém se sbíráním bodů, úrovněmi (Gold, Silver, Bronze) a odměnami uplatnitelnými napříč všemi kanály. Fanoušci získávají body za vstupenky, merch, občerstvení i aktivitu v aplikaci. Vše je navázané na jejich SSO profil.',
    image: '/media/sso-loyalty.png',
  },
]

const BRAND_EXAMPLES = [
  { name: 'Slavia Praha', image: '/media/sso-slavia.png' },
  { name: 'Sparta Praha', image: '/media/sso-sparta.png' },
  { name: 'Ticketportal', image: '/media/sso-tp.png' },
  { name: 'PLG Ecosystem', image: '/media/sso-plg.png' },
]

const INTEGRATIONS = [
  { name: 'Ticketing', color: '#F59E0B', desc: 'Fanouškovské účty pro nákup vstupenek' },
  { name: 'Ticket Apps', color: '#EF4444', desc: 'Autentizace mobilní aplikace' },
  { name: 'Scanning', color: '#22D3EE', desc: 'Přihlášení obsluhy u vstupních bran' },
  { name: 'Cashless', color: '#EA580C', desc: 'Peněženka napojená na identitu fanouška' },
  { name: 'Kiosks', color: '#2563EB', desc: 'Autentizace samoobslužných terminálů' },
  { name: 'AI Assistant', color: '#BE185D', desc: 'Řízení přístupu k nástrojům promotérů' },
  { name: 'CRM', color: '#0D9488', desc: 'Data fanoušků plynou ze SSO profilů' },
  { name: 'Venue Apps', color: '#7C3AED', desc: 'Přihlášení do klubových a arénových aplikací' },
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
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Integrační vrstva</p>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Vaše kanály</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Web', 'Mobilní aplikace', 'Fanshop', 'Kiosek', 'CRM'].map((item, i) => (
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
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Protokolová vrstva</p>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>OAuth 2.0 / OpenID Connect</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Bezpečný autentizační protokol založený na tokenech a průmyslových standardech</p>
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
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: ACCENT }}>Jádro SSO</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Poskytovatel identity</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Přihlášení, registrace, 2FA, reset hesla, magic linky a sociální přihlášení</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function HubDiagram() {
  const cx = 250
  const cy = 250
  const radius = 180
  const nodeCount = INTEGRATIONS.length

  return (
    <div className="w-full flex justify-center">
      <svg viewBox="0 0 500 500" className="w-full max-w-lg" style={{ overflow: 'visible' }}>
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

export default function ArsenalCLSSOPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>

      {/* Arsenal ČL nav */}
      <motion.nav
        data-product-nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-2 px-8 h-14 text-sm font-medium"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={() => router.push('/arsenalcl')}
          className="flex items-center gap-1.5 transition-colors hover:opacity-70"
          style={{ color: ACCENT }}
        >
          ← Digitální ekosystém
        </button>
        <span className="text-[#3A3342]/30">/</span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: `${ACCENT}20`, color: ACCENT }}>
          SSO
        </span>
      </motion.nav>

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
              Základní infrastruktura
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
              Dejte fanouškům jeden účet, který funguje všude.{' '}
              <span className="text-white/85 font-medium">Brandovaný login, sjednocený profil a bezproblémový přístup</span>
              {' '}napříč webem, aplikací, fanshopem i každým dalším kontaktním bodem.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <SSOVisual />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                { headline: ['Jeden login,', 'všechny kanály'], sub: 'Web, aplikace, fanshop i kiosky', detail: 'Fanoušci se přihlásí jednou a plynule se pohybují napříč všemi kontaktními body.' },
                { headline: ['Plně ve', 'vaší značce'], sub: 'Vaše logo, barvy, identita', detail: 'Každá přihlašovací obrazovka, e-mail i profil odpovídá vaší značce.' },
                { headline: ['Vestavěné', 'zabezpečení'], sub: 'OAuth 2.0, 2FA, GDPR', detail: 'Podnikové zabezpečení bez nároků na váš tým.' },
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
              alt="SSO brandovaný login"
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
              Problém fanouškovské identity
            </h2>
            <p className="text-base text-[#3A3342]/55 mb-12 max-w-lg">
              Fanoušci si zakládají nový účet pro každý kanál. Hesla se vrší. Data zůstávají oddělená.
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
              Jedna identita. Každý kanál.<br />
              <span style={{ color: ACCENT }}>Kompletní profil fanouška.</span>
            </h3>
            <p className="text-base text-[#3A3342]/55 mt-4 max-w-md mx-auto">
              SSO propojí všechny vaše kanály, takže se fanoušci přihlásí jednou a vy vidíte vše na jednom místě.
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
              Jak to funguje
            </h2>
            <p className="text-base text-white/40 max-w-lg mx-auto">
              Tři vrstvy. Jedna bezproblémová zkušenost.
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
              Hlavní přínosy
            </h2>
            <p className="text-base text-[#3A3342]/55 mb-12 max-w-lg">
              Vše, co váš klub potřebuje od moderní identitní platformy.
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
              Co SSO umí
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg">
              Kompletní identitní platforma se vším, co potřebují fanoušci i administrátoři.
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
                    <div className="w-full rounded-2xl border border-[#11002B]/8 flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #f5f5f5 0%, #ebebeb 100%)' }}>
                      <span className="text-sm font-medium text-[#3A3342]/30">{f.title}</span>
                    </div>
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
              Vaše značka, vaše přihlášení
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg mx-auto">
              Každý klient získá plně přizpůsobené SSO prostředí. Stejná platforma, jedinečná identita.
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
                  alt={`${brand.name} brandovaný login`}
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
              Propojeno s každým produktem
            </h2>
            <p className="text-base text-[#3A3342]/55 max-w-lg mx-auto">
              SSO je identitní vrstva celého PLG ekosystému. Každý produkt se přes něj autentizuje.
            </p>
          </motion.div>

          <motion.div {...fade(0.2)} className="mb-12">
            <HubDiagram />
          </motion.div>
        </div>
      </section>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',         label: 'SSO' },
          { id: 'showcase',     label: 'Přehled' },
          { id: 'opportunity',  label: 'Problém' },
          { id: 'how-it-works', label: 'Jak to funguje' },
          { id: 'benefits',     label: 'Hlavní přínosy' },
          { id: 'features',     label: 'Platforma' },
          { id: 'branding',     label: 'Branding' },
          { id: 'integration',  label: 'Integrace' },
        ]}
      />
    </div>
  )
}
