'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/products'
import { track } from '@/lib/track'

const MINI_R = 26

function pos(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * MINI_R, y: Math.sin(rad) * MINI_R }
}

interface ProductBreadcrumbProps {
  activeSlug: string
}

export default function ProductBreadcrumb({ activeSlug }: ProductBreadcrumbProps) {
  const router = useRouter()
  const svgSize = (MINI_R + 14) * 2
  const cx = svgSize / 2
  const cy = svgSize / 2

  return (
    <motion.nav
      data-product-nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3"
      style={{
        background: 'rgba(17,0,43,0.9)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mini orbit map - click to go home */}
      <button
        onClick={() => { track({ type: 'breadcrumb_click', target: 'home', from: activeSlug, ts: Date.now() }); router.push('/') }}
        className="relative shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
        title="Back to ecosystem overview"
        style={{ width: svgSize, height: svgSize }}
      >
        <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r={MINI_R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
          {/* Ring connections */}
          {PRODUCTS.map((p, i) => {
            const next = PRODUCTS[(i + 1) % PRODUCTS.length]
            const p1 = pos(p.angle)
            const p2 = pos(next.angle)
            return (
              <line
                key={`r-${p.slug}`}
                x1={cx + p1.x} y1={cy + p1.y}
                x2={cx + p2.x} y2={cy + p2.y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />
            )
          })}
          {/* Spokes */}
          {PRODUCTS.map((p) => {
            const pt = pos(p.angle)
            const isActive = p.slug === activeSlug
            return (
              <line
                key={`s-${p.slug}`}
                x1={cx} y1={cy}
                x2={cx + pt.x} y2={cy + pt.y}
                stroke={p.color}
                strokeWidth="0.75"
                opacity={isActive ? 1 : 0.2}
              />
            )
          })}
          {/* Center SSO dot - active when on /sso */}
          <circle
            cx={cx} cy={cy}
            r={activeSlug === 'sso' ? 5 : 3.5}
            fill="#06D373"
            opacity={activeSlug === 'sso' ? 1 : 0.9}
          />
          {/* Product dots */}
          {PRODUCTS.map((p) => {
            const pt = pos(p.angle)
            const isActive = p.slug === activeSlug
            return (
              <circle
                key={`d-${p.slug}`}
                cx={cx + pt.x} cy={cy + pt.y}
                r={isActive ? 4.5 : 2.5}
                fill={p.color}
                opacity={isActive ? 1 : 0.3}
              />
            )
          })}
        </svg>
      </button>

      <span className="text-white/20 font-light shrink-0">/</span>

      {/* Scrollable product pills - SSO first, then orbit products */}
      <div className="flex items-center gap-1.5 overflow-x-auto min-w-0" style={{ scrollbarWidth: 'none' }}>
        {/* SSO pill */}
        {(() => {
          const isActive = activeSlug === 'sso'
          return (
            <button
              onClick={() => { track({ type: 'breadcrumb_click', target: 'sso', from: activeSlug, ts: Date.now() }); router.push('/sso') }}
              className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer"
              style={{
                background: isActive ? '#06D373' : 'rgba(255,255,255,0.06)',
                color: isActive ? '#11002B' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${isActive ? '#06D373' : 'transparent'}`,
              }}
            >
              SSO
            </button>
          )
        })()}
        {PRODUCTS.filter((p) => p.slug !== 'sso').map((p) => {
          const isActive = p.slug === activeSlug
          return (
            <button
              key={p.slug}
              onClick={() => { track({ type: 'breadcrumb_click', target: p.slug, from: activeSlug, ts: Date.now() }); router.push(`/${p.slug}`) }}
              className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer"
              style={{
                background: isActive ? p.color : 'rgba(255,255,255,0.06)',
                color: isActive ? '#11002B' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${isActive ? p.color : 'transparent'}`,
              }}
            >
              {p.shortLabel}
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}
