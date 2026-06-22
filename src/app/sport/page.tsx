'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OrbitDiagram from '@/components/OrbitDiagram'
import ExternalDataCloud, { type DataNode } from '@/components/ExternalDataCloud'
import { track } from '@/lib/track'
import type { Product } from '@/lib/products'

const SPORT_PRODUCTS: Product[] = [
  {
    slug: 'sso',
    label: 'SSO',
    shortLabel: 'SSO',
    color: '#06D373',
    angle: -130,
    icon: '🔐',
    description: 'Unified identity layer',
  },
  {
    slug: 'prodejni-system',
    label: 'Prodejní\nsystém',
    shortLabel: 'Prodejní systém',
    color: '#0EA5E9',
    angle: -90,
    icon: '🗄️',
    description: 'Prodejní systém',
  },
  {
    slug: 'ticketing',
    label: 'Ticketingové\nweby',
    shortLabel: 'Ticketing weby',
    color: '#F59E0B',
    angle: -54,
    icon: '🎟️',
    description: '9 značek · 7 trhů',
  },
  {
    slug: 'kiosks',
    label: 'Kiosky',
    shortLabel: 'Kiosky',
    color: '#2563EB',
    angle: -18,
    icon: '🖥',
    description: 'Samoobslužné terminály',
  },
  {
    slug: 'cashless',
    label: 'Cashless',
    shortLabel: 'Cashless',
    color: '#EA580C',
    angle: 18,
    icon: '💳',
    description: 'Festivaly a arény',
  },
  {
    slug: 'partnersky-portal',
    label: 'Partnerský\nportál',
    shortLabel: 'Partneři',
    color: '#6366F1',
    angle: 54,
    icon: '🤝',
    description: 'B2B partnerský portál',
  },
  {
    slug: 'marketing',
    label: 'Marketingová\npodpora',
    shortLabel: 'Marketing. podpora',
    color: '#10B981',
    angle: 90,
    icon: '📣',
    description: 'Marketingové nástroje',
  },
  {
    slug: 'ai-asistent',
    label: 'AI asistent\npro promotéry',
    shortLabel: 'AI asistent',
    color: '#BE185D',
    angle: 126,
    icon: '✨',
    description: 'Chytré nástroje pro promotéry',
  },
  {
    slug: 'crm',
    label: 'CRM',
    shortLabel: 'CRM',
    color: '#0D9488',
    angle: 162,
    icon: '📊',
    description: 'B2B partner hub',
  },
  {
    slug: 'mobilni-aplikace',
    label: 'Mobilní\naplikace',
    shortLabel: 'Mobilní aplikace',
    color: '#7C3AED',
    angle: 198,
    icon: '📱',
    description: 'Kluby, arény & festivaly',
  },
  {
    slug: 'pripadove-studie',
    label: 'Případové\nstudie',
    shortLabel: 'Případové studie',
    color: '#B45309',
    angle: 234,
    icon: '🏆',
    description: 'Úspěšné projekty',
  },
]

const SPORT_SUBPAGES = new Set(['ticketing', 'crm', 'mobilni-aplikace', 'pripadove-studie', 'marketing', 'partnersky-portal', 'ai-asistent', 'cashless', 'kiosks', 'sso', 'prodejni-system'])

const SPORT_NODES: DataNode[] = [
  { lines: ['Sázková', 'data'],           x: 172,  y: 148 },
  { lines: ['Sportovní', 'statistiky'],   x: 346,  y: 305 },
  { lines: ['Sociální', 'data'],          x: 182,  y: 462 },
  { lines: ['Platební', 'metody'],        x: 349,  y: 618 },
  { lines: ['Fanshop'],                   x: 172,  y: 776 },
  { lines: ['Web', 'partnera'],           x: 346,  y: 930 },
  { lines: ['Marketingové', 'nástroje'],  x: 1268, y: 155 },
  { lines: ['Platební', 'brána'],         x: 1092, y: 295 },
  { lines: ['Turnikety'],                 x: 1256, y: 432 },
  { lines: ['Analytická', 'data'],        x: 1098, y: 568 },
  { lines: ['Jakékoliv API'],             x: 1264, y: 706 },
  { lines: ['Vlastní', 'integrace'],      x: 1108, y: 822 },
]

const NAVIGABLE_SLUGS = new Set(['ticketing', 'cashless', 'kiosks', 'ai-asistent', 'crm', 'mobilni-aplikace', 'sso', 'pripadove-studie', 'partnersky-portal'])

const ringProducts = SPORT_PRODUCTS.filter((p) => p.slug !== 'sso')

const STARS = Array.from({ length: 160 }, (_, i) => {
  const a = (i * 9301 + 49297) % 233280
  const b = (a * 9301 + 49297) % 233280
  const c = (b * 9301 + 49297) % 233280
  const d = (c * 9301 + 49297) % 233280
  return {
    x: (a / 233280) * 100,
    y: (b / 233280) * 100,
    r: 0.4 + (c / 233280) * 1.4,
    opacity: 0.3 + (d / 233280) * 0.7,
    dur: 2 + (a / 233280) * 4,
    delay: (b / 233280) * 4,
  }
})

const PLANETS = [
  { x: 8,  y: 18, size: 18, color: '#0f3460', glow: '#2563EB', dur: 18, ring: false },
  { x: 88, y: 12, size: 11, color: '#3b0764', glow: '#7C3AED', dur: 24, ring: false },
  { x: 92, y: 78, size: 22, color: '#0c3547', glow: '#0EA5E9', dur: 30, ring: true  },
  { x: 6,  y: 80, size: 10, color: '#052e16', glow: '#10B981', dur: 14, ring: false },
]

export default function Sport() {
  const router = useRouter()

  const handleProductClick = (slug: string) => {
    track({ type: 'orbit_click', product: slug, ts: Date.now() })
    if (SPORT_SUBPAGES.has(slug)) router.push(`/sport/${slug}`)
    else if (NAVIGABLE_SLUGS.has(slug)) router.push(`/${slug}`)
  }

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex flex-col items-center"
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #2a0060 0%, #100030 30%, #050010 60%, #010008 100%)' }}
    >
      {/* ── KOMBINOVANÉ POZADÍ: SLUNCE + NEBULA ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="nebCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5010CC" stopOpacity="0.45"/>
            <stop offset="50%" stopColor="#3008AA" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#100040" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="nebLeft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.22"/>
            <stop offset="60%" stopColor="#FF4400" stopOpacity="0.10"/>
            <stop offset="100%" stopColor="#CC2200" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="nebRight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00CCFF" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#0044CC" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEE80" stopOpacity="0.35"/>
            <stop offset="40%" stopColor="#FF9900" stopOpacity="0.20"/>
            <stop offset="100%" stopColor="#FF4400" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="nebBottom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF40CC" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#AA0088" stopOpacity="0"/>
          </radialGradient>
          <filter id="pglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="mglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Hlavní fialová nebula – střed */}
        <ellipse cx="50%" cy="55%" rx="45%" ry="35%" fill="url(#nebCenter)" opacity="1"/>
        {/* Sluneční záře – vlevo nahoře */}
        <ellipse cx="20%" cy="30%" rx="30%" ry="25%" fill="url(#nebLeft)" opacity="1"/>
        {/* Azurová nebula – vpravo */}
        <ellipse cx="80%" cy="65%" rx="25%" ry="22%" fill="url(#nebRight)" opacity="1"/>
        {/* Růžová nebula – dole uprostřed */}
        <ellipse cx="50%" cy="85%" rx="28%" ry="18%" fill="url(#nebBottom)" opacity="1"/>
        {/* Sluneční záře kolem středu orbity */}
        <ellipse cx="50%" cy="52%" rx="18%" ry="15%" fill="url(#sunGlow)" opacity="1"/>

        {/* Hvězdy – fixní pozice */}
        {[
          [42,28,0.9,1.0], [120,55,0.7,0.6], [200,18,0.8,1.1], [310,35,0.6,0.7],
          [450,22,0.85,1.0], [580,40,0.7,0.8], [640,15,0.9,1.1], [65,120,0.65,0.6],
          [160,390,0.75,0.8], [520,380,0.8,0.7], [620,350,0.6,0.6], [30,300,0.7,0.9],
          [670,200,0.65,0.7], [90,200,0.8,0.5], [600,120,0.7,0.6], [400,400,0.6,0.7],
          [250,380,0.7,0.5], [480,60,0.8,0.8], [150,160,0.6,0.6], [700,320,0.7,0.9],
          [355,10,0.9,1.0], [18,380,0.65,0.8], [695,80,0.75,0.7], [280,410,0.6,0.6],
          [75,60,0.8,0.5], [500,410,0.7,0.7], [630,410,0.6,0.8],
        ].map(([x,y,op,r], i) => (
          <circle key={i} cx={`${(x as number/7.2).toFixed(1)}%`} cy={`${(y as number/4.2).toFixed(1)}%`} r={r as number} fill="white" opacity={op as number}>
            <animate attributeName="opacity"
              values={`${op};${+((op as number)*0.2).toFixed(2)};${op}`}
              dur={`${2+(i%5)}s`} begin={`${(i*0.3)%4}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Padající hvězdy */}
        {[
          { x1: 20, y1: 5,  x2: 28, y2: 12, dur: 6,  begin: 2  },
          { x1: 65, y1: 3,  x2: 71, y2: 9,  dur: 8,  begin: 5  },
          { x1: 40, y1: 8,  x2: 48, y2: 15, dur: 10, begin: 9  },
          { x1: 55, y1: 2,  x2: 61, y2: 8,  dur: 7,  begin: 14 },
        ].map((s, i) => (
          <line key={i} x1={`${s.x1}%`} y1={`${s.y1}%`} x2={`${s.x2}%`} y2={`${s.y2}%`}
            stroke="white" strokeWidth="0.7" opacity="0" strokeLinecap="round">
            <animate attributeName="opacity" values="0;0.75;0" dur={`${s.dur}s`} begin={`${s.begin}s`} repeatCount="indefinite"/>
          </line>
        ))}

        {/* Planety */}
        <g filter="url(#pglow)">
          <circle cx="8%" cy="18%" r="18" fill="#0f3460" opacity="0.88"/>
          <circle cx="8%" cy="18%" r="40" fill="#FF8C00" opacity="0.08"/>
          <animate attributeName="cy" values="18%;17.3%;18%" dur="18s" repeatCount="indefinite"/>
        </g>
        <g filter="url(#pglow)">
          <circle cx="88%" cy="12%" r="11" fill="#3b0764" opacity="0.88"/>
          <circle cx="88%" cy="12%" r="25" fill="#7C3AED" opacity="0.10"/>
        </g>
        <g filter="url(#pglow)">
          <circle cx="92%" cy="78%" r="22" fill="#0c3547" opacity="0.88"/>
          <circle cx="92%" cy="78%" r="48" fill="#0EA5E9" opacity="0.10"/>
          <ellipse cx="92%" cy="78%" rx="40" ry="8" fill="none" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.28"/>
        </g>
        <g filter="url(#pglow)">
          <circle cx="6%" cy="80%" r="10" fill="#1a1000" opacity="0.88"/>
          <circle cx="6%" cy="80%" r="22" fill="#FF8C00" opacity="0.10"/>
        </g>

        {/* Sluneční paprsky – jemné, kolem středu */}
        <g opacity="0.12" stroke="#FFC200" strokeWidth="1" strokeLinecap="round">
          <line x1="50%" y1="52%" x2="50%" y2="20%"/>
          <line x1="50%" y1="52%" x2="50%" y2="84%"/>
          <line x1="50%" y1="52%" x2="18%" y2="52%"/>
          <line x1="50%" y1="52%" x2="82%" y2="52%"/>
          <line x1="50%" y1="52%" x2="27%" y2="29%"/>
          <line x1="50%" y1="52%" x2="73%" y2="75%"/>
          <line x1="50%" y1="52%" x2="73%" y2="29%"/>
          <line x1="50%" y1="52%" x2="27%" y2="75%"/>
        </g>

        {/* Měsíc – vpravo nahoře */}
        <g filter="url(#mglow)">
          <circle cx="85%" cy="14%" r="30" fill="#a8c4e0" opacity="0.07"/>
          <circle cx="85%" cy="14%" r="20" fill="#c8ddf0" opacity="0.10"/>
          <circle cx="85%" cy="14%" r="14" fill="#ddeaf8" opacity="0.90">
            <animate attributeName="opacity" values="0.90;0.80;0.90" dur="9s" repeatCount="indefinite"/>
          </circle>
          <circle cx="83.2%" cy="12.5%" r="3.2" fill="#b0c8e4" opacity="0.45"/>
          <circle cx="87%"   cy="15.5%" r="2.0" fill="#b0c8e4" opacity="0.38"/>
          <circle cx="84%"   cy="16.5%" r="1.4" fill="#b0c8e4" opacity="0.32"/>
          <circle cx="86.8%" cy="14%"   r="14"  fill="#000a1e" opacity="0.48"/>
        </g>
      </svg>

      {/* Textura */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(255,255,255,0.010) 40px, rgba(255,255,255,0.010) 41px)`,
      }} />

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        zIndex: 1, width: 700, height: 350,
        background: 'radial-gradient(ellipse at center bottom, rgba(100,30,200,0.20) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      {/* Topbar */}
      <motion.nav
        className="relative w-full flex items-center gap-3 px-6 py-3 shrink-0"
        style={{ zIndex: 50, background: 'rgba(10,0,28,0.90)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <button onClick={() => router.push('/sport')} className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer" title="PLG ekosystém">
          <img src="/plglogo.svg" alt="PLG ecosystem" style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }} />
        </button>
        <span className="text-white/20 font-light shrink-0">/</span>
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => handleProductClick('sso')}
            className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer"
            style={{ background: 'rgba(120,40,200,0.22)', color: '#B080FF', border: '1px solid rgba(120,40,200,0.5)' }}
          >
            SSO
          </button>
          {ringProducts.map((p) => (
            <button
              key={p.slug}
              onClick={() => handleProductClick(p.slug)}
              className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer hover:opacity-80"
              style={{ background: `${p.color}18`, color: 'rgba(255,255,255,0.5)', border: `1px solid ${p.color}40` }}
            >
              {p.shortLabel}
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push('/sport/analytics')}
          className="shrink-0 ml-auto hover:opacity-80 transition-opacity cursor-pointer px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(120,40,200,0.2)', color: 'rgba(176,128,255,0.85)', border: '1px solid rgba(120,40,200,0.35)' }}
        >
          Analytics
        </button>
      </motion.nav>

      {/* Header */}
      <motion.div
        className="relative flex flex-col items-center gap-1 shrink-0 pt-2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/plglogo.svg" alt="PLG ecosystem" style={{ height: 40, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }} />
        <h1 className="text-2xl md:text-3xl text-white text-center leading-tight" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
          Digitální ekosystém
        </h1>
        <p className="text-[10px] font-semibold tracking-[0.20em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Naše produkty spolu nejen komunikují,&nbsp; ale jsou propojené s celým vaším světem.
        </p>
      </motion.div>

      <div className="shrink-0" style={{ height: 4 }} />

      <ExternalDataCloud nodes={SPORT_NODES} />

      <motion.div
        className="relative flex-1 flex items-center justify-center w-full min-h-0"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <OrbitDiagram
          onProductClick={handleProductClick}
          products={SPORT_PRODUCTS}
          nodeBg="linear-gradient(135deg, rgba(0,20,60,0.97) 0%, rgba(0,8,30,0.97) 100%)"
        />
      </motion.div>
    </main>
  )
}
