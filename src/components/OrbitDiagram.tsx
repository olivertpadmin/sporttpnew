'use client'

/**
 * Orbit diagram: SSO hub + product ring only.
 *
 * External data sources (label pills, particle streams, second “outer” ring) live
 * exclusively in `ExternalDataCloud.tsx`, rendered by the homepage beside this SVG.
 * Do NOT re-add outer-ring nodes, R_OUTER, OUTER_NODES, DataParticle, or connection
 * lines to this file - that duplicates the cloud and causes a double ring on the hero.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS, type Product } from '@/lib/products'

// ─── Coordinate system ────────────────────────────────────────────────────────
// Everything lives inside a single SVG with viewBox="0 0 720 720".
// The SVG is sized via CSS (min(90vw, 78vh) square).
// ─────────────────────────────────────────────────────────────────────────────

const VB  = 720
const R   = 248   // inner orbit radius
const NR  = 76    // node radius
const CS  = 122   // SSO center diameter
const CX  = VB / 2
const CY  = VB / 2

const RING_START_ANGLE = -90

function orbitXY(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + Math.cos(rad) * R, y: CY + Math.sin(rad) * R }
}

interface OrbitDiagramProps {
  onProductClick: (slug: string) => void
  products?: Product[]
  nodeBg?: string
}

const DEFAULT_NODE_BG = 'linear-gradient(135deg, rgba(65,51,85,0.96) 0%, rgba(52,40,70,0.96) 100%)'

export default function OrbitDiagram({ onProductClick, products: productsProp, nodeBg = DEFAULT_NODE_BG }: OrbitDiagramProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [centerHovered, setCenterHovered] = useState(false)

  const allProducts = productsProp ?? PRODUCTS
  const RING_PRODUCTS = allProducts.filter((p) => p.slug !== 'sso')
  const RING_STEP = 360 / RING_PRODUCTS.length
  const ringAngleForIndex = (index: number) => RING_START_ANGLE + index * RING_STEP

  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      style={{ width: 'min(90vw, 78vh)', height: 'min(90vw, 78vh)' }}
      overflow="visible"
    >
      <defs>
        <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="center-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      {/* ── Orbit ring ── */}
      <circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
      />

      {/* ── Ring connections: adjacent products (octagon) ── */}
      {RING_PRODUCTS.map((p, i) => {
        const next = RING_PRODUCTS[(i + 1) % RING_PRODUCTS.length]
        const a = orbitXY(ringAngleForIndex(i))
        const b = orbitXY(ringAngleForIndex(i + 1))
        const active = hovered === p.slug || hovered === next.slug
        return (
          <motion.line
            key={`ring-${p.slug}`}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            stroke="white"
            strokeWidth={active ? 1.4 : 0.9}
            strokeDasharray="5 5"
            animate={{ opacity: active ? 0.5 : 0.2 }}
            transition={{ duration: 0.25 }}
          />
        )
      })}

      {/* ── Spokes: center → each product ── */}
      {RING_PRODUCTS.map((p, i) => {
        const pt = orbitXY(ringAngleForIndex(i))
        const active = hovered === p.slug
        return (
          <motion.line
            key={`spoke-${p.slug}`}
            x1={CX} y1={CY}
            x2={pt.x} y2={pt.y}
            stroke={p.color}
            strokeWidth={active ? 2 : 1.2}
            strokeDasharray="5 4"
            animate={{ opacity: active ? 0.95 : 0.4 }}
            transition={{ duration: 0.25 }}
          />
        )
      })}

      {/* ── SSO center ── */}
      <motion.g
        style={{ transformOrigin: `${CX}px ${CY}px`, cursor: 'pointer' }}
        animate={{ scale: centerHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setCenterHovered(true)}
        onMouseLeave={() => setCenterHovered(false)}
        onClick={() => onProductClick('sso')}
      >
        {centerHovered && (
          <circle
            cx={CX} cy={CY} r={CS * 1.1}
            fill="#06D373"
            opacity={0.22}
            filter="url(#center-glow)"
          />
        )}
        <circle
          cx={CX} cy={CY} r={CS * 0.85}
          fill={centerHovered ? 'rgba(6,211,115,0.15)' : 'rgba(6,211,115,0.08)'}
          stroke={centerHovered ? 'rgba(6,211,115,0.5)' : 'rgba(6,211,115,0.15)'}
          strokeWidth="1"
          style={{
            animation: 'pulse-ring 3s ease-in-out infinite',
            transition: 'fill 0.2s, stroke 0.2s',
            cursor: 'pointer',
          }}
        />
        <foreignObject
          x={CX - CS / 2}
          y={CY - CS / 2}
          width={CS}
          height={CS}
          style={{ cursor: 'pointer' }}
        >
          <div
            style={{
              width: CS,
              height: CS,
              borderRadius: '50%',
              background: centerHovered
                ? `linear-gradient(135deg, rgba(6,211,115,0.30) 0%, transparent 100%), ${nodeBg}`
                : nodeBg,
              border: `1.5px solid ${centerHovered ? 'rgba(6,211,115,0.9)' : 'transparent'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <span style={{ fontSize: 40, lineHeight: 1 }}>🔐</span>
            <span style={{
              color: centerHovered ? '#06D373' : 'white',
              fontSize: 18,
              fontWeight: 700,
              fontFamily: 'Mulish,sans-serif',
              letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}>
              SSO
            </span>
          </div>
        </foreignObject>
      </motion.g>

      {/* ── Product nodes ── */}
      {RING_PRODUCTS.map((p, i) => {
        const pt = orbitXY(ringAngleForIndex(i))
        const isHovered = hovered === p.slug
        const lines = p.label.split('\n')

        return (
          <motion.g
            key={p.slug}
            style={{ transformOrigin: `${pt.x}px ${pt.y}px`, cursor: 'pointer' }}
            animate={{ scale: isHovered ? 1.12 : 1 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHovered(p.slug)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onProductClick(p.slug)}
          >
            {isHovered && (
              <circle
                cx={pt.x} cy={pt.y}
                r={NR * 1.3}
                fill={p.color}
                opacity={0.22}
                filter="url(#node-glow)"
              />
            )}
            <foreignObject
              x={pt.x - NR}
              y={pt.y - NR}
              width={NR * 2}
              height={NR * 2}
              overflow="visible"
            >
              <div
                style={{
                  width: NR * 2,
                  height: NR * 2,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: isHovered
                    ? `linear-gradient(135deg, ${p.color}45 0%, transparent 65%), ${nodeBg}`
                    : nodeBg,
                  border: `1.5px solid ${isHovered ? p.color : 'transparent'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  transition: 'background 0.2s, border-color 0.2s',
                  animation: `orbit-float 4s ease-in-out ${i * 0.35}s infinite`,
                }}
              >
                <span style={{ fontSize: 36, lineHeight: 1 }}>{p.icon}</span>
                {lines.map((line, li) => (
                  <span
                    key={li}
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textAlign: 'center',
                      display: 'block',
                      color: isHovered ? p.color : 'rgba(255,255,255,0.9)',
                      fontFamily: 'Mulish,sans-serif',
                      letterSpacing: '0.01em',
                      transition: 'color 0.2s',
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </foreignObject>
          </motion.g>
        )
      })}
    </svg>
  )
}
