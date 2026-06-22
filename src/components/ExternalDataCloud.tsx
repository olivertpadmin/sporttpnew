'use client'

import { useEffect, useRef } from 'react'

const REF_W = 1440
const REF_H = 900
const OX = 720
const OY = 515
const RING_R = 242

export interface DataNode {
  lines: string[]
  x: number
  y: number
}

const DEFAULT_NODES: DataNode[] = [
  { lines: ['Betting', 'Data'],        x: 172,  y: 148 },
  { lines: ['Sports Stats', 'Data'],   x: 346,  y: 305 },
  { lines: ['Social', 'Data'],         x: 182,  y: 462 },
  { lines: ['Fanshop'],                x: 349,  y: 618 },
  { lines: ['Partner', 'Website'],     x: 177,  y: 776 },
  { lines: ['Marketing', 'Tools'],     x: 1268, y: 155 },
  { lines: ['Payment', 'Gateway'],     x: 1092, y: 295 },
  { lines: ['Turnstiles'],             x: 1256, y: 432 },
  { lines: ['Analytics', 'Data'],      x: 1098, y: 568 },
  { lines: ['Any API'],                x: 1264, y: 706 },
  { lines: ['Custom', 'Integrations'], x: 1108, y: 822 },
]

function ringEntry(lx: number, ly: number) {
  const dx = lx - OX
  const dy = ly - OY
  const mag = Math.sqrt(dx * dx + dy * dy)
  return { x: OX + (dx / mag) * RING_R, y: OY + (dy / mag) * RING_R }
}

// Point on box edge facing the orbit ring (so line starts flush with the box)
function boxEdge(node: DataNode) {
  const e = ringEntry(node.x, node.y)
  const dx = e.x - node.x
  const dy = e.y - node.y
  const mag = Math.sqrt(dx * dx + dy * dy)
  const offset = 74 // ~half box width (138/2) + small gap
  return { x: node.x + (dx / mag) * offset, y: node.y + (dy / mag) * offset }
}

interface Pulse {
  sx: number; sy: number
  ex: number; ey: number
  interval: number
  duration: number
  timer: number
  active: boolean
  progress: number
  outward: boolean
}

function makePulse(sx: number, sy: number, ex: number, ey: number, delay: number, outward: boolean): Pulse {
  return {
    sx, sy, ex, ey,
    interval: 3.8 + Math.random() * 2.2,
    duration: 1.5 + Math.random() * 0.6,
    timer:    -delay,
    active:   false,
    progress: 0,
    outward,
  }
}

function updatePulse(p: Pulse, dt: number): boolean {
  p.timer += dt
  if (!p.active) {
    if (p.timer >= 0) { p.active = true; p.progress = 0; p.timer = 0 }
  } else {
    p.progress = p.timer / p.duration
    if (p.progress >= 1) { p.active = false; p.timer = -p.interval; return true }
  }
  return false
}

function drawPulse(ctx: CanvasRenderingContext2D, p: Pulse) {
  if (!p.active) return
  const t  = p.progress
  const px = p.sx + (p.ex - p.sx) * t
  const py = p.sy + (p.ey - p.sy) * t

  let alpha: number
  if      (t < 0.15) alpha = t / 0.15
  else if (t < 0.85) alpha = 1
  else               alpha = (1 - t) / 0.15

  // Outward pulses use a warmer tint
  const [r, g, b] = p.outward ? [140, 220, 180] : [120, 200, 255]

  const glow = ctx.createRadialGradient(px, py, 0, px, py, 12)
  glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.35})`)
  glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2)
  ctx.fillStyle = glow; ctx.fill()

  const core = ctx.createRadialGradient(px, py, 0, px, py, 3.5)
  core.addColorStop(0,   `rgba(220,240,255,${alpha})`)
  core.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.9})`)
  core.addColorStop(1,   `rgba(${r},${g},${b},0)`)
  ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2)
  ctx.fillStyle = core; ctx.fill()

  for (let i = 1; i <= 6; i++) {
    const tt = Math.max(0, t - i * 0.018)
    const tx = p.sx + (p.ex - p.sx) * tt
    const ty = p.sy + (p.ey - p.sy) * tt
    ctx.beginPath(); ctx.arc(tx, ty, Math.max(0.1, 2 - i * 0.2), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha * (1 - i / 7) * 0.4})`
    ctx.fill()
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExternalDataCloud({ nodes }: { nodes?: DataNode[] }) {
  const NODES = nodes ?? DEFAULT_NODES
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      canvas!.width  = rect.width
      canvas!.height = rect.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Two pulses per node: one inward, one outward (staggered)
    const pulses: Pulse[] = []
    NODES.forEach((n, i) => {
      const be = boxEdge(n)
      const re = ringEntry(n.x, n.y)
      pulses.push(makePulse(be.x, be.y, re.x, re.y, i * 0.38,          false))
      pulses.push(makePulse(re.x, re.y, be.x, be.y, i * 0.38 + 1.9,    true))
    })

    const flashes: { x: number; y: number; t: number; outward: boolean }[] = []

    let last = performance.now()
    let raf: number

    function frame(now: number) {
      if (!ctx) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const cw = canvas!.width
      const ch = canvas!.height
      const scale = Math.max(cw / REF_W, ch / REF_H)
      const ox = (cw - REF_W * scale) / 2
      const oy = (ch - REF_H * scale) / 2

      ctx.clearRect(0, 0, cw, ch)
      ctx.save()
      ctx.translate(ox, oy)
      ctx.scale(scale, scale)

      // Static connector lines (box edge → ring entry)
      ctx.lineWidth = 0.75 / scale
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'
      NODES.forEach(n => {
        const be = boxEdge(n)
        const re = ringEntry(n.x, n.y)
        ctx.beginPath(); ctx.moveTo(be.x, be.y); ctx.lineTo(re.x, re.y); ctx.stroke()
      })

      // Connector dots right at box edge
      NODES.forEach(n => {
        const be = boxEdge(n)
        ctx.beginPath(); ctx.arc(be.x, be.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fill()
      })

      // Pulses
      pulses.forEach(p => {
        const arrived = updatePulse(p, dt)
        if (arrived) flashes.push({ x: p.ex, y: p.ey, t: 0, outward: p.outward })
        drawPulse(ctx, p)
      })

      // Arrival flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const a = flashes[i]
        a.t += dt
        const life = 0.5
        if (a.t > life) { flashes.splice(i, 1); continue }
        const alpha = (1 - a.t / life) * 0.7
        const rad = 6 + a.t * 20
        const [r, g, b] = a.outward ? [100, 220, 150] : [100, 200, 255]
        const gr = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, rad)
        gr.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        gr.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(a.x, a.y, rad, 0, Math.PI * 2)
        ctx.fillStyle = gr; ctx.fill()
      }

      ctx.restore()
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 5,
        }}
      />

      {NODES.map((node, i) => {
        const isRight = node.x > OX
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(node.x / REF_W) * 100}%`,
              top:  `${(node.y / REF_H) * 100}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 6,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              width: 138,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: '6px 10px 7px',
            }}>
              {/* LIVE status row */}
              <div style={{
                display: 'flex',
                justifyContent: isRight ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                gap: 4,
                marginBottom: 4,
              }}>
                <span style={{
                  display: 'inline-block',
                  width: 5, height: 5,
                  borderRadius: '50%',
                  background: '#06D373',
                  boxShadow: '0 0 4px #06D373',
                  flexShrink: 0,
                }} className="animate-pulse" />
                <span style={{
                  fontSize: 7,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Mulish, sans-serif',
                  textTransform: 'uppercase',
                }}>Live</span>
              </div>

              {/* Label lines */}
              {node.lines.map((line, li) => (
                <div key={li} style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Mulish, sans-serif',
                  letterSpacing: '0.13em',
                  lineHeight: 1.3,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textAlign: isRight ? 'right' : 'left',
                }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}
