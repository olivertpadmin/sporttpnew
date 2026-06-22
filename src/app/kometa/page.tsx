'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OrbitDiagram from '@/components/OrbitDiagram'
import ExternalDataCloud, { type DataNode } from '@/components/ExternalDataCloud'
import { track } from '@/lib/track'
import type { Product } from '@/lib/products'

const KOMETA_PRODUCTS: Product[] = [
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
    slug: 'ticketing',
    label: 'Ticketingové\nweby',
    shortLabel: 'Ticketing weby',
    color: '#F59E0B',
    angle: -90,
    icon: '🎟️',
    description: '9 značek · 7 trhů',
  },
  {
    slug: 'kiosks',
    label: 'Kiosky',
    shortLabel: 'Kiosky',
    color: '#2563EB',
    angle: -54,
    icon: '🖥',
    description: 'Samoobslužné terminály',
  },
  {
    slug: 'cashless',
    label: 'Cashless',
    shortLabel: 'Cashless',
    color: '#EA580C',
    angle: -18,
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

// Slugs with kometa-specific sub-pages; others fall back to the shared product pages
const KOMETA_SUBPAGES = new Set(['ticketing', 'crm', 'mobilni-aplikace', 'pripadove-studie', 'marketing', 'nabidka', 'partnersky-portal', 'ai-asistent', 'cashless', 'kiosks', 'sso'])

const KOMETA_NODES: DataNode[] = [
  { lines: ['Sázková', 'data'],           x: 172,  y: 148 },
  { lines: ['Sportovní', 'statistiky'],   x: 346,  y: 305 },
  { lines: ['Sociální', 'data'],          x: 182,  y: 462 },
  { lines: ['Fanshop'],                   x: 349,  y: 618 },
  { lines: ['Web', 'partnera'],           x: 177,  y: 776 },
  { lines: ['Marketingové', 'nástroje'],  x: 1268, y: 155 },
  { lines: ['Platební', 'brána'],         x: 1092, y: 295 },
  { lines: ['Turnikety'],                 x: 1256, y: 432 },
  { lines: ['Analytická', 'data'],        x: 1098, y: 568 },
  { lines: ['Jakékoliv API'],             x: 1264, y: 706 },
  { lines: ['Vlastní', 'integrace'],      x: 1108, y: 822 },
]
const NAVIGABLE_SLUGS = new Set(['ticketing', 'cashless', 'kiosks', 'ai-asistent', 'crm', 'mobilni-aplikace', 'sso', 'pripadove-studie', 'nabidka', 'partnersky-portal'])

const ringProducts = KOMETA_PRODUCTS.filter((p) => p.slug !== 'sso')

export default function Kometa() {
  const router = useRouter()

  const handleProductClick = (slug: string) => {
    track({ type: 'orbit_click', product: slug, ts: Date.now() })
    if (KOMETA_SUBPAGES.has(slug)) router.push(`/kometa/${slug}`)
    else if (NAVIGABLE_SLUGS.has(slug)) router.push(`/${slug}`)
  }

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex flex-col items-center"
      style={{ background: 'linear-gradient(160deg, #001228 0%, #003060 50%, #004687 100%)' }}
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.018) 40px,
            rgba(255,255,255,0.018) 41px
          )`,
        }}
      />
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: 700, height: 350,
        background: 'radial-gradient(ellipse at center bottom, rgba(0,102,172,0.2) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      {/* Topbar */}
      <motion.nav
        className="relative w-full z-50 flex items-center gap-3 px-6 py-3 shrink-0"
        style={{
          background: 'rgba(0,18,40,0.85)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <button
          onClick={() => router.push('/kometa')}
          className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
          title="Kometa ekosystém"
        >
          <img src="/media/kometa-logo.png" alt="HC Kometa Brno" style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }} />
        </button>
        <span className="text-white/20 font-light shrink-0">/</span>
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => handleProductClick('sso')}
            className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer"
            style={{
              background: 'rgba(0,102,172,0.18)',
              color: '#0066AC',
              border: '1px solid rgba(0,102,172,0.4)',
            }}
          >
            SSO
          </button>
          {ringProducts.map((p) => (
            <button
              key={p.slug}
              onClick={() => handleProductClick(p.slug)}
              className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer hover:opacity-80"
              style={{
                background: `${p.color}18`,
                color: 'rgba(255,255,255,0.5)',
                border: `1px solid ${p.color}40`,
              }}
            >
              {p.shortLabel}
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push('/kometa/analytics')}
          className="shrink-0 ml-auto hover:opacity-80 transition-opacity cursor-pointer px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(0,102,172,0.15)', color: 'rgba(0,150,255,0.6)', border: '1px solid rgba(0,102,172,0.25)' }}
          title="Kometa Analytics"
        >
          Analytics
        </button>
      </motion.nav>

      {/* Header */}
      <motion.div
        className="relative flex flex-col items-center gap-2 z-10 shrink-0 pt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/kometa-logo.png" alt="HC Kometa Brno" style={{ height: 56, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }} />
        <h1
          className="text-3xl md:text-4xl text-white text-center leading-tight"
          style={{ fontFamily: "'Panel Sans', sans-serif" }}
        >
          Digitální ekosystém
        </h1>
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase text-center"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Naše produkty spolu nejen komunikují,<br />ale jsou propojené s celým vaším světem.
        </p>
      </motion.div>

      {/* Gap between headline and orbit */}
      <div className="shrink-0" style={{ height: 'clamp(10px, 1.5vh, 22px)' }} />

      {/* External data source labels + particle streams */}
      <ExternalDataCloud nodes={KOMETA_NODES} />

      {/* Orbit diagram */}
      <motion.div
        className="relative z-10 flex-1 flex items-center justify-center w-full min-h-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <OrbitDiagram
          onProductClick={handleProductClick}
          products={KOMETA_PRODUCTS}
          nodeBg="linear-gradient(135deg, rgba(0,40,80,0.95) 0%, rgba(0,20,50,0.95) 100%)"
        />
      </motion.div>

      {/* Nabídka banner — bottom */}
      <div className="relative w-full shrink-0 flex items-center justify-center px-6 py-3 z-50" style={{ background: 'rgba(0,12,30,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.button
          onClick={() => router.push('/kometa/nabidka')}
          className="flex items-center gap-3 cursor-pointer group"
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.06) 100%)',
            border: '1px solid rgba(251,191,36,0.4)',
            borderRadius: 10,
            padding: '8px 20px 8px 14px',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          whileHover={{ borderColor: 'rgba(251,191,36,0.75)', backgroundColor: 'rgba(251,191,36,0.14)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <rect x="2.5" y="1.5" width="11" height="15" rx="1.5" stroke="#FBBF24" strokeWidth="1.25"/>
            <path d="M5 6h8M5 9h8M5 12h5" stroke="#FBBF24" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
          <span className="text-sm font-semibold" style={{ fontFamily: "'Mulish', sans-serif", color: 'rgba(255,255,255,0.85)' }}>
            Připravili jsme pro vás kompletní cenovou nabídku
          </span>
          <span className="text-sm font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform" style={{ fontFamily: "'Mulish', sans-serif" }}>
            →
          </span>
        </motion.button>
      </div>

    </main>
  )
}
