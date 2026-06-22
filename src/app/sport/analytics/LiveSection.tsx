'use client'

import { useEffect, useState, useCallback } from 'react'

const WINDOWS = [
  { label: '30 min', minutes: 30 },
  { label: '2 hod', minutes: 120 },
  { label: '10 hod', minutes: 600 },
]

type Bucket = { label: string; total: number }
type LiveEvent = {
  type: string
  page?: string
  product?: string
  from?: string
  target?: string
  section?: string
  referrer?: string
  ua?: string
  ts: number
}

const EVENT_COLOR: Record<string, string> = {
  page_view:        '#9333EA',
  orbit_click:      '#F59E0B',
  breadcrumb_click: '#10B981',
  section_view:     '#BE185D',
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('cs-CZ', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Prague',
  })
}

function LiveChart({ buckets }: { buckets: Bucket[] }) {
  const max = Math.max(...buckets.map((b) => b.total), 1)
  const chartH = 72
  const barW = Math.max(8, Math.floor(560 / buckets.length) - 3)
  const gap = 3

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg height={chartH + 24} width={buckets.length * (barW + gap)} style={{ display: 'block', minWidth: '100%' }}>
        {buckets.map((b, i) => {
          const barH = max > 0 ? Math.round((b.total / max) * chartH) : 0
          const x = i * (barW + gap)
          const y = chartH - barH
          const isLast = i === buckets.length - 1
          return (
            <g key={i}>
              <rect x={x} y={0} width={barW} height={chartH} rx={3} fill="rgba(255,255,255,0.04)" />
              {barH > 0 && (
                <rect x={x} y={y} width={barW} height={barH} rx={3}
                  fill={isLast ? '#9333EA' : '#4a0d8f'} opacity={isLast ? 1 : 0.75} />
              )}
              {i % Math.ceil(buckets.length / 8) === 0 && (
                <text x={x + barW / 2} y={chartH + 16} textAnchor="middle" fontSize={8}
                  fill="rgba(255,255,255,0.3)" fontFamily="Mulish, sans-serif">
                  {b.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function LiveSection() {
  const [windowIdx, setWindowIdx] = useState(1)
  const [buckets, setBuckets] = useState<Bucket[]>([])
  const [events, setEvents] = useState<LiveEvent[]>([])
  const [total, setTotal] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)

  const fetch_ = useCallback(async () => {
    const minutes = WINDOWS[windowIdx].minutes
    try {
      const res = await fetch(`/api/sport-analytics-live?minutes=${minutes}`)
      if (!res.ok) return
      const data = await res.json()
      setBuckets(data.buckets)
      setEvents(data.events)
      setTotal(data.total)
      setLastUpdated(new Date())
    } catch { /* silent */ }
    setLoading(false)
  }, [windowIdx])

  useEffect(() => {
    setLoading(true)
    fetch_()
    const interval = setInterval(fetch_, 30_000)
    return () => clearInterval(interval)
  }, [fetch_])

  const win = WINDOWS[windowIdx]

  return (
    <div className="rounded-xl p-6 space-y-5"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(147,51,234,0.3)' }}>

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
          </span>
          <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">
            Live · {win.label}
          </h2>
          {!loading && (
            <span className="text-[11px] text-white/30">
              {total} {total === 1 ? 'událost' : total < 5 ? 'události' : 'událostí'}
            </span>
          )}
        </div>

        {/* Window selector */}
        <div className="flex gap-1.5">
          {WINDOWS.map((w, i) => (
            <button key={w.minutes} onClick={() => setWindowIdx(i)}
              className="text-xs px-3 py-1 rounded-full font-semibold transition-all"
              style={{
                background: i === windowIdx ? 'rgba(147,51,234,0.4)' : 'rgba(255,255,255,0.05)',
                color: i === windowIdx ? '#7DB3F0' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${i === windowIdx ? 'rgba(147,51,234,0.65)' : 'transparent'}`,
              }}>
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <div className="h-24 flex items-center justify-center">
          <span className="text-white/20 text-xs">Načítám…</span>
        </div>
      ) : buckets.length === 0 || total === 0 ? (
        <div className="h-24 flex items-center justify-center">
          <span className="text-white/20 text-xs">Žádná aktivita v tomto období</span>
        </div>
      ) : (
        <LiveChart buckets={buckets} />
      )}

      {/* Recent events */}
      {events.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-white/5">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-2">Poslední události</p>
          {events.slice(0, 15).map((ev, i) => {
            const detail =
              ev.type === 'page_view'        ? ev.page :
              ev.type === 'orbit_click'       ? ev.product :
              ev.type === 'breadcrumb_click'  ? `${ev.from} → ${ev.target}` :
              ev.type === 'section_view'      ? `${ev.product} · ${ev.section}` : ''

            return (
              <div key={i} className="flex items-center gap-2.5 text-xs">
                <span className="text-white/30 shrink-0 tabular-nums">{formatTime(ev.ts)}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0"
                  style={{ background: (EVENT_COLOR[ev.type] ?? '#fff') + '20', color: EVENT_COLOR[ev.type] ?? '#fff' }}>
                  {ev.type.replace(/_/g, ' ')}
                </span>
                <span className="text-white/50 truncate">{detail}</span>
                {ev.referrer && ev.type === 'page_view' && (
                  <span className="text-white/20 shrink-0 truncate max-w-[120px]">{ev.referrer || 'přímý'}</span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {lastUpdated && (
        <p className="text-white/15 text-[10px] text-right">
          Aktualizováno: {formatTime(lastUpdated.getTime())} · každých 30 s
        </p>
      )}
    </div>
  )
}
