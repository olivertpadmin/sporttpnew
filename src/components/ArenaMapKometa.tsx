'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

const SECTION_LABELS: Record<string, string> = {
  svg_19116: '113', svg_19117: '114', svg_19118: '112', svg_19119: '115',
  svg_19120: '116', svg_19121: '101', svg_19122: '102', svg_19123: '103',
  svg_19124: '104', svg_19125: '105', svg_19126: '106', svg_19127: '107',
  svg_19128: '108', svg_19129: '109', svg_19130: '110', svg_19131: '111',
  svg_19148: '515', svg_19149: '516', svg_19150: '517', svg_19151: '518',
  svg_19152: '519', svg_19153: '520', svg_19154: '501', svg_19155: '502',
  svg_19156: '503', svg_19157: '504', svg_19158: '505', svg_19159: '506',
  svg_19160: '507', svg_19161: '508', svg_19162: '509', svg_19163: '510',
  svg_19165: '511', svg_19166: '512', svg_19167: '513', svg_19168: '514',
}

function getCategory(section: string) {
  const n = parseInt(section)
  if (n >= 101 && n <= 116) return { label: '1. patro — Přízemí', color: '#004587' }
  if (n >= 501 && n <= 520) return { label: '5. patro — Balkon', color: '#cc2222' }
  return { label: 'Ostatní', color: '#555' }
}

// ─────────────────────────────────────────────────────────
// Core interactive map (used inside modal)
// ─────────────────────────────────────────────────────────
function ArenaMapCore({ height = 560 }: { height?: number }) {
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const mapAreaRef = useRef<HTMLDivElement>(null)
  // Transform stored in ref; applied directly to DOM to avoid re-render lag
  const tRef = useRef({ x: 0, y: 0, scale: 1 })
  const [ready, setReady] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set())

  const applyTransform = useCallback(() => {
    const el = svgContainerRef.current
    if (!el) return
    const { x, y, scale } = tRef.current
    el.style.transform = `translate(${x}px,${y}px) scale(${scale})`
  }, [])

  // Load SVG
  useEffect(() => {
    const container = svgContainerRef.current
    if (!container) return
    fetch('/arena/arena-combined.svg')
      .then(r => r.text())
      .then(html => {
        container.innerHTML = html
        const svg = container.querySelector('svg') as SVGSVGElement | null
        if (!svg) return
        svg.removeAttribute('width')
        svg.removeAttribute('height')
        svg.style.width = '100%'
        svg.style.height = '100%'
        svg.style.display = 'block'

        const sektory = svg.getElementById('_svg_sektory')
        if (sektory) {
          sektory.querySelectorAll('path').forEach(path => {
            if (!SECTION_LABELS[path.id]) return
            path.setAttribute('fill', '#ffffff')
            path.setAttribute('fill-opacity', '0')
            path.setAttribute('stroke', '#ffffff')
            path.setAttribute('stroke-width', '20')
            path.setAttribute('stroke-opacity', '0')
            path.style.cursor = 'pointer'
          })
        }
        setReady(true)
      })
  }, [])

  // Sync visual state to SVG paths
  useEffect(() => {
    const container = svgContainerRef.current
    if (!container || !ready) return
    const svg = container.querySelector('svg')
    if (!svg) return
    const sektory = svg.getElementById('_svg_sektory')
    if (!sektory) return
    sektory.querySelectorAll('path').forEach(path => {
      if (!SECTION_LABELS[path.id]) return
      if (path.id === selected) {
        path.setAttribute('fill-opacity', '0.55')
        path.setAttribute('stroke-opacity', '0.8')
      } else if (path.id === hovered) {
        path.setAttribute('fill-opacity', '0.3')
        path.setAttribute('stroke-opacity', '0.5')
      } else {
        path.setAttribute('fill-opacity', '0')
        path.setAttribute('stroke-opacity', '0')
      }
    })
  }, [selected, hovered, ready])

  // Section hover / click via native listeners on SVG paths
  useEffect(() => {
    const container = svgContainerRef.current
    if (!container || !ready) return
    const svg = container.querySelector('svg')
    const sektory = svg?.getElementById('_svg_sektory')
    if (!sektory) return

    const enter = (e: Event) => {
      const id = (e.target as Element).id
      if (SECTION_LABELS[id]) setHovered(id)
    }
    const leave = (e: Event) => {
      const id = (e.target as Element).id
      if (SECTION_LABELS[id]) setHovered(p => p === id ? null : p)
    }
    const click = (e: Event) => {
      e.stopPropagation()
      const id = (e.target as Element).id
      if (SECTION_LABELS[id]) setSelected(p => p === id ? null : id)
    }

    sektory.querySelectorAll('path').forEach(path => {
      if (!SECTION_LABELS[path.id]) return
      path.addEventListener('mouseenter', enter)
      path.addEventListener('mouseleave', leave)
      path.addEventListener('click', click)
    })
    return () => {
      sektory.querySelectorAll('path').forEach(path => {
        path.removeEventListener('mouseenter', enter)
        path.removeEventListener('mouseleave', leave)
        path.removeEventListener('click', click)
      })
    }
  }, [ready])

  // Drag, wheel, click-to-deselect — all native to avoid React/SVG event issues
  useEffect(() => {
    const el = mapAreaRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      tRef.current.scale = Math.min(10, Math.max(0.4,
        tRef.current.scale * (e.deltaY > 0 ? 0.88 : 1.14)
      ))
      applyTransform()
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      let lx = e.clientX, ly = e.clientY

      const handleMove = (ev: MouseEvent) => {
        tRef.current.x += ev.clientX - lx
        tRef.current.y += ev.clientY - ly
        lx = ev.clientX
        ly = ev.clientY
        applyTransform()
      }
      const handleUp = () => {
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleUp)
      }
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleUp)
    }

    // Deselect when clicking empty map area (section clicks stopPropagation before this)
    const handleClick = () => setSelected(null)

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('click', handleClick)
    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('mousedown', handleMouseDown)
      el.removeEventListener('click', handleClick)
    }
  }, [applyTransform])

  // Clear seat selection when section changes
  useEffect(() => { setSelectedSeats(new Set()) }, [selected])

  // Generate demo seats for the selected section
  useEffect(() => {
    const container = svgContainerRef.current
    if (!container || !ready) return
    const svg = container.querySelector('svg') as SVGSVGElement
    if (!svg) return

    svg.getElementById('_demo_seats')?.remove()
    if (!selected) return

    const path = svg.getElementById(selected) as SVGPathElement | null
    if (!path) return
    const bbox = path.getBBox()

    const ROWS = 6, COLS = 10
    const r = Math.min(bbox.width / (COLS * 2.6), bbox.height / (ROWS * 2.6))
    const catColor = getCategory(SECTION_LABELS[selected] ?? '').color

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.id = '_demo_seats'

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cx = bbox.x + bbox.width * (col + 0.5) / COLS
        const cy = bbox.y + bbox.height * (row + 0.5) / ROWS
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        const seatId = `r${row}c${col}`
        circle.setAttribute('cx', String(cx))
        circle.setAttribute('cy', String(cy))
        circle.setAttribute('r', String(r))
        circle.setAttribute('fill', catColor)
        circle.setAttribute('fill-opacity', '0.8')
        circle.setAttribute('stroke', '#fff')
        circle.setAttribute('stroke-width', String(Math.max(1, r * 0.2)))
        circle.setAttribute('stroke-opacity', '0.5')
        circle.style.cursor = 'pointer'
        circle.addEventListener('click', (e) => {
          e.stopPropagation()
          const isSel = circle.getAttribute('data-sel') === '1'
          if (isSel) {
            circle.setAttribute('data-sel', '0')
            circle.setAttribute('fill', catColor)
            circle.setAttribute('fill-opacity', '0.8')
            setSelectedSeats(prev => { const s = new Set(prev); s.delete(seatId); return s })
          } else {
            circle.setAttribute('data-sel', '1')
            circle.setAttribute('fill', '#f59e0b')
            circle.setAttribute('fill-opacity', '1')
            setSelectedSeats(prev => new Set([...prev, seatId]))
          }
        })
        g.appendChild(circle)
      }
    }

    svg.appendChild(g)
    return () => { svg.getElementById('_demo_seats')?.remove() }
  }, [selected, ready])

  const reset = () => {
    tRef.current = { x: 0, y: 0, scale: 1 }
    applyTransform()
  }

  const selLabel = selected ? SECTION_LABELS[selected] : null
  const hovLabel = hovered ? SECTION_LABELS[hovered] : null

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.03)' }}>
        <div className="flex items-center gap-4">
          {[{ color: '#004587', label: '1. patro' }, { color: '#cc2222', label: '5. patro' }].map(z => (
            <div key={z.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: z.color }} />
              <span className="text-[11px] text-[#3A3342]/50 font-medium">{z.label}</span>
            </div>
          ))}
        </div>
        <button onClick={reset}
          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg hover:opacity-70 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.07)', color: 'rgba(0,0,0,0.4)' }}>
          Reset
        </button>
      </div>

      {/* Map area — no React event handlers, all handled by native listeners above */}
      <div
        ref={mapAreaRef}
        className="relative flex-1 overflow-hidden"
        style={{ cursor: 'grab', minHeight: height, background: '#f2f0f7' }}
      >
        <div
          ref={svgContainerRef}
          style={{ position: 'absolute', inset: 0, transformOrigin: 'center center' }}
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#3A3342]/30 text-sm">Načítám hlediště…</span>
          </div>
        )}

        {/* Hover tooltip */}
        {hovLabel && !selected && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 20 }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(10,10,20,0.92)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
              <span className="text-xs text-white/50">Sekce</span>
              <span className="text-sm font-bold text-white">{hovLabel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected section panel */}
      {selected && selLabel && (
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: `${getCategory(selLabel).color}12` }}>
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 rounded-full" style={{ background: getCategory(selLabel).color }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3A3342]/40 mb-0.5">Vybraná sekce</p>
              <p className="text-2xl font-black text-[#11002B] leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                Sekce {selLabel}
              </p>
              <p className="text-xs mt-0.5" style={{ color: getCategory(selLabel).color }}>{getCategory(selLabel).label}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedSeats.size > 0 && (
              <div className="text-center">
                <p className="text-lg font-black text-[#11002B] leading-none">{selectedSeats.size}</p>
                <p className="text-[10px] text-[#3A3342]/40 mt-0.5">sedadel</p>
              </div>
            )}
            <button onClick={e => { e.stopPropagation(); setSelected(null) }}
              className="text-[#11002B]/25 hover:text-[#11002B]/70 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Fullscreen modal wrapper
// ─────────────────────────────────────────────────────────
function ArenaModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: '#f2f0f7',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          maxHeight: '90vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0 bg-white"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div>
            <h3 className="text-base font-bold text-[#11002B]" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              T-Mobile Aréna — Hlediště
            </h3>
            <p className="text-xs text-[#3A3342]/40 mt-0.5">Klikněte na sekci pro výběr · Scroll = zoom · Tažení = pohyb</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#11002B]/30 hover:text-[#11002B] hover:bg-black/5 transition-all text-xl leading-none"
          >
            ×
          </button>
        </div>

        <ArenaMapCore height={540} />
      </div>
    </div>,
    document.body
  )
}

// ─────────────────────────────────────────────────────────
// Public export — thumbnail + open button
// ─────────────────────────────────────────────────────────
export default function ArenaMapKometa() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Thumbnail preview card */}
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: '#0a0a14',
          border: '1px solid rgba(255,255,255,0.08)',
          aspectRatio: '16/7',
        }}
        onClick={() => setOpen(true)}
      >
        {/* Blurred arena background — <img> renders SVG; CSS background-image does not */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arena/arena-combined.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '110%', height: '110%',
            top: '-5%', left: '-5%',
            objectFit: 'cover',
            filter: 'blur(12px)',
            opacity: 0.6,
          }}
        />

        {/* Dark scrim */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,18,0.55)' }} />

        {/* Overlay CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm text-white group-hover:scale-105 transition-transform"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
          >
            <span>🏟</span>
            Prohlédnout hlediště
          </div>
        </div>
      </div>

      {open && <ArenaModal onClose={() => setOpen(false)} />}
    </>
  )
}
