import { redis } from '@/lib/redis'
import { PRODUCTS } from '@/lib/products'
import { revalidatePath } from 'next/cache'
import ClearDataButton from './ClearDataButton'

export const dynamic = 'force-dynamic'

type RawEvent = {
  type: string
  page?: string
  product?: string
  target?: string
  from?: string
  section?: string
  ts: number
}

async function clearData() {
  'use server'
  await redis.flushdb()
  revalidatePath('/analytics')
}

function formatTime(ts: number, tz: string): string {
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    timeZone: tz,
  })
}

function Bar({ label, value, max, color, wideLabel }: {
  label: string; value: number; max: number; color: string; wideLabel?: boolean
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-3 py-1">
      <span className={`text-white/60 text-xs shrink-0 ${wideLabel ? 'w-52' : 'w-28 truncate'}`}>{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-white text-xs w-6 text-right shrink-0">{value}</span>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">{label}</span>
      <span className="text-4xl font-bold" style={{ color: accent, fontFamily: "'Panel Sans', sans-serif" }}>
        {value.toLocaleString()}
      </span>
    </div>
  )
}

function DailyChart({ days }: { days: { date: string; total: number }[] }) {
  const max = Math.max(...days.map((d) => d.total), 1)
  const chartH = 80
  const barW = 22
  const gap = 6
  const totalW = days.length * (barW + gap) - gap
  const labelEvery = 5

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg
        width={totalW}
        height={chartH + 28}
        style={{ display: 'block', minWidth: '100%' }}
      >
        {days.map((d, i) => {
          const barH = max > 0 ? Math.round((d.total / max) * chartH) : 0
          const x = i * (barW + gap)
          const y = chartH - barH
          const isToday = i === days.length - 1
          const showLabel = i % labelEvery === 0 || isToday
          const label = d.date.slice(5) // MM-DD

          return (
            <g key={d.date}>
              {/* Background track */}
              <rect x={x} y={0} width={barW} height={chartH} rx={4} fill="rgba(255,255,255,0.04)" />
              {/* Value bar */}
              {barH > 0 && (
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={4}
                  fill={isToday ? '#06D373' : '#F640C4'}
                  opacity={isToday ? 1 : 0.6}
                />
              )}
              {/* Count label on top of bar */}
              {d.total > 0 && barH > 14 && (
                <text
                  x={x + barW / 2}
                  y={y + 11}
                  textAnchor="middle"
                  fontSize={9}
                  fill="rgba(255,255,255,0.7)"
                  fontFamily="Mulish, sans-serif"
                  fontWeight={700}
                >
                  {d.total}
                </text>
              )}
              {/* Date label below */}
              {showLabel && (
                <text
                  x={x + barW / 2}
                  y={chartH + 18}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isToday ? '#06D373' : 'rgba(255,255,255,0.3)'}
                  fontFamily="Mulish, sans-serif"
                >
                  {label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default async function AnalyticsPage() {
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  // Generate last 30 days
  const last30: string[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    last30.push(d.toISOString().slice(0, 10))
  }

  let pageViews: Record<string, number> | null = null
  let orbitClicks: Record<string, number> | null = null
  let breadcrumbClicks: Record<string, number> | null = null
  let sectionViews: Record<string, number> | null = null
  let recentRaw: unknown[] = []
  let todayStats: Record<string, number> | null = null
  let dailyRaw: (Record<string, number> | null)[] = []
  let redisError: string | null = null

  try {
    const dailyPromises = last30.map((d) =>
      redis.hgetall<Record<string, number>>(`analytics:daily:${d}`)
    )
    ;[pageViews, orbitClicks, breadcrumbClicks, sectionViews, recentRaw, todayStats, ...dailyRaw] =
      await Promise.all([
        redis.hgetall<Record<string, number>>('analytics:page_views'),
        redis.hgetall<Record<string, number>>('analytics:orbit_clicks'),
        redis.hgetall<Record<string, number>>('analytics:breadcrumb_clicks'),
        redis.hgetall<Record<string, number>>('analytics:section_views'),
        redis.lrange('analytics:events', 0, 29),
        redis.hgetall<Record<string, number>>(`analytics:daily:${todayStr}`),
        ...dailyPromises,
      ])
  } catch (err) {
    redisError = err instanceof Error ? err.message : 'Unknown error'
  }

  if (redisError) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-8"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0040 0%, #11002B 70%)' }}
      >
        <div
          className="rounded-xl p-8 max-w-lg w-full text-center space-y-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(246,64,196,0.3)' }}
        >
          <p className="text-2xl" style={{ fontFamily: "'Panel Sans', sans-serif", color: '#F640C4' }}>
            Redis not configured
          </p>
          <p className="text-white/50 text-sm">
            Add <code className="text-white/80">UPSTASH_REDIS_REST_URL</code> and{' '}
            <code className="text-white/80">UPSTASH_REDIS_REST_TOKEN</code> to your Vercel environment variables, then redeploy.
          </p>
          <p className="text-white/30 text-xs font-mono break-all">{redisError}</p>
        </div>
      </main>
    )
  }

  const sum = (obj: Record<string, number> | null) =>
    obj ? Object.values(obj).reduce((a, b) => a + b, 0) : 0

  const totalPageViews = pageViews
    ? Object.entries(pageViews).filter(([p]) => !p.startsWith('/analytics')).reduce((a, [, b]) => a + b, 0)
    : 0
  const totalOrbitClicks = sum(orbitClicks)
  const totalSectionViews = sum(sectionViews)
  const todayTotal = sum(todayStats)

  // Daily chart data
  const dailyData = last30.map((date, i) => ({
    date,
    total: sum(dailyRaw[i] ?? null),
  }))

  // Sort helpers
  const sorted = (obj: Record<string, number> | null) =>
    obj ? Object.entries(obj).sort((a, b) => b[1] - a[1]) : []

  // Exclude /analytics from page views
  const topPages = sorted(pageViews).filter(([page]) => !page.startsWith('/analytics'))
  const topOrbits = sorted(orbitClicks)
  const topBreadcrumbs = sorted(breadcrumbClicks)
  const topSections = sorted(sectionViews).slice(0, 10)

  const maxOrbits = topOrbits[0]?.[1] ?? 1
  const maxPages = topPages[0]?.[1] ?? 1
  const maxBreadcrumbs = topBreadcrumbs[0]?.[1] ?? 1
  const maxSections = topSections[0]?.[1] ?? 1

  const recentEvents: RawEvent[] = recentRaw.map((r) => {
    try { return typeof r === 'string' ? JSON.parse(r) : r } catch { return null }
  }).filter(Boolean).filter((ev) => {
    const e = ev as RawEvent
    return !(e.type === 'page_view' && e.page?.startsWith('/analytics'))
  }) as RawEvent[]

  const productColor = (slug: string) =>
    PRODUCTS.find((p) => p.slug === slug)?.color ?? '#06D373'

  const eventBadgeColor: Record<string, string> = {
    page_view: '#06D373',
    orbit_click: '#F640C4',
    breadcrumb_click: '#F59E0B',
    section_view: '#22D3EE',
  }

  return (
    <main
      className="min-h-screen px-8 py-10"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0040 0%, #11002B 70%)' }}
    >
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              Analytics
            </h1>
            <p className="text-white/40 text-sm mt-1">
              PLG Ecosystem · visitor behaviour
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              ← Back to Ecosystem
            </a>
            <ClearDataButton action={clearData} />
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Page Views" value={totalPageViews} accent="#06D373" />
          <StatCard label="Orbit Clicks" value={totalOrbitClicks} accent="#F640C4" />
          <StatCard label="Section Views" value={totalSectionViews} accent="#22D3EE" />
          <StatCard label="Today" value={todayTotal} accent="#F59E0B" />
        </div>

        {/* Daily visits chart */}
        <div
          className="rounded-xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">
              Visits per Day — Last 30 Days
            </h2>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#F640C4', opacity: 0.6 }} />
                Past days
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#06D373' }} />
                Today
              </span>
            </div>
          </div>
          <DailyChart days={dailyData} />
        </div>

        {/* Product interest */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Orbit clicks */}
          <div
            className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">
              Orbit Clicks by Product
            </h2>
            {topOrbits.length === 0 && <p className="text-white/30 text-xs">No data yet</p>}
            {topOrbits.map(([slug, count]) => (
              <Bar
                key={slug}
                label={PRODUCTS.find((p) => p.slug === slug)?.shortLabel ?? slug}
                value={count}
                max={maxOrbits}
                color={productColor(slug)}
              />
            ))}
          </div>

          {/* Page views */}
          <div
            className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">
              Most Visited Pages
            </h2>
            {topPages.length === 0 && <p className="text-white/30 text-xs">No data yet</p>}
            {topPages.map(([page, count]) => {
              const slug = page.replace(/^\//, '')
              return (
                <Bar
                  key={page}
                  label={page === '/' ? 'Home' : (PRODUCTS.find((p) => p.slug === slug)?.shortLabel ?? page)}
                  value={count}
                  max={maxPages}
                  color={page === '/' ? '#06D373' : productColor(slug)}
                />
              )
            })}
          </div>
        </div>

        {/* Breadcrumb clicks + Section engagement */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Breadcrumb clicks */}
          <div
            className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">
              Breadcrumb Navigation
            </h2>
            {topBreadcrumbs.length === 0 && <p className="text-white/30 text-xs">No data yet</p>}
            {topBreadcrumbs.map(([target, count]) => (
              <Bar
                key={target}
                label={target === 'home' ? 'Home ←' : (PRODUCTS.find((p) => p.slug === target)?.shortLabel ?? target)}
                value={count}
                max={maxBreadcrumbs}
                color={target === 'home' ? '#06D373' : productColor(target)}
              />
            ))}
          </div>

          {/* Section engagement */}
          <div
            className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">
              Top Sections
            </h2>
            {topSections.length === 0 && <p className="text-white/30 text-xs">No data yet</p>}
            {topSections.map(([key, count]) => {
              const [productSlug, sectionId] = key.split(':')
              return (
                <Bar
                  key={key}
                  label={`${PRODUCTS.find((p) => p.slug === productSlug)?.shortLabel ?? productSlug} · ${sectionId}`}
                  value={count}
                  max={maxSections}
                  color={productColor(productSlug)}
                  wideLabel
                />
              )
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div
          className="rounded-xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70 mb-4">
            Recent Activity
          </h2>
          {recentEvents.length === 0 && <p className="text-white/30 text-xs">No events yet</p>}
          <div className="space-y-2">
            {recentEvents.map((ev, i) => {
              const detail =
                ev.type === 'page_view' ? ev.page :
                ev.type === 'orbit_click' ? ev.product :
                ev.type === 'breadcrumb_click' ? `${ev.from} → ${ev.target}` :
                ev.type === 'section_view' ? `${ev.product} · ${ev.section}` : ''

              return (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <div className="shrink-0 flex flex-col gap-0.5">
                    <span className="text-white/40">{formatTime(ev.ts, 'Europe/Prague')} <span className="text-white/20">PRG</span></span>
                    <span className="text-white/25">{formatTime(ev.ts, 'Europe/Tallinn')} <span className="text-white/15">TLL</span></span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                    style={{
                      background: (eventBadgeColor[ev.type] ?? '#fff') + '20',
                      color: eventBadgeColor[ev.type] ?? '#fff',
                    }}
                  >
                    {ev.type.replace('_', ' ')}
                  </span>
                  <span className="text-white/60 truncate">{detail}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </main>
  )
}
