import { redis } from '@/lib/redis'
import LiveSection from './LiveSection'

export const dynamic = 'force-dynamic'

const SLOVAN_PRODUCTS: Record<string, { label: string; color: string }> = {
  sso:                 { label: 'SSO',               color: '#06D373' },
  ticketing:           { label: 'Ticketing weby',    color: '#F59E0B' },
  kiosks:              { label: 'Kiosky',            color: '#2563EB' },
  cashless:            { label: 'Cashless',          color: '#EA580C' },
  'partnersky-portal': { label: 'Partneři',          color: '#6366F1' },
  marketing:           { label: 'Marketing',         color: '#10B981' },
  'ai-asistent':       { label: 'AI asistent',       color: '#BE185D' },
  crm:                 { label: 'CRM',              color: '#0D9488' },
  'mobilni-aplikace':  { label: 'Mobilní aplikace', color: '#7C3AED' },
  'pripadove-studie':  { label: 'Případové studie', color: '#B45309' },
}

const SLOVAN_SLUGS = new Set(Object.keys(SLOVAN_PRODUCTS))

function Bar({ label, value, max, color, wideLabel }: {
  label: string; value: number; max: number; color: string; wideLabel?: boolean
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-3 py-1">
      <span className={`text-white/60 text-xs shrink-0 ${wideLabel ? 'w-52' : 'w-32 truncate'}`}>{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-white text-xs w-6 text-right shrink-0">{value}</span>
    </div>
  )
}

function StatCard({ label, value, accent, sub }: { label: string; value: number | string; accent: string; sub?: string }) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">{label}</span>
      <span className="text-4xl font-bold" style={{ color: accent, fontFamily: "'Panel Sans', sans-serif" }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      {sub && <span className="text-white/30 text-xs">{sub}</span>}
    </div>
  )
}

export default async function SlovanAnalyticsPage() {
  let pageViews: Record<string, number> | null = null
  let orbitClicks: Record<string, number> | null = null
  let sectionViews: Record<string, number> | null = null
  let referrers: Record<string, number> | null = null
  let devices: Record<string, number> | null = null
  let redisError: string | null = null

  try {
    ;[pageViews, orbitClicks, sectionViews, referrers, devices] = await Promise.all([
      redis.hgetall<Record<string, number>>('analytics:page_views'),
      redis.hgetall<Record<string, number>>('analytics:orbit_clicks'),
      redis.hgetall<Record<string, number>>('analytics:section_views'),
      redis.hgetall<Record<string, number>>('analytics:referrers'),
      redis.hgetall<Record<string, number>>('analytics:devices'),
    ])
  } catch (err) {
    redisError = err instanceof Error ? err.message : 'Unknown error'
  }

  if (redisError) {
    return (
      <main className="min-h-screen flex items-center justify-center px-8"
        style={{ background: 'linear-gradient(160deg, #00102B 0%, #002966 50%, #1959B0 100%)' }}>
        <div className="rounded-xl p-8 max-w-lg w-full text-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(25,89,176,0.4)' }}>
          <p className="text-2xl text-white mb-2" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Redis není dostupný</p>
          <p className="text-white/30 text-xs font-mono break-all">{redisError}</p>
        </div>
      </main>
    )
  }

  const slovanPageViews = Object.fromEntries(
    Object.entries(pageViews ?? {}).filter(([p]) => p.startsWith('/slovan') && !p.startsWith('/slovan/analytics'))
  )
  // Orbit/section events don't carry the client path; only events that arrived while
  // the user was on a /slovan/* page are recorded here, so we still filter by slug set.
  const slovanOrbitClicks = Object.fromEntries(
    Object.entries(orbitClicks ?? {}).filter(([slug]) => SLOVAN_SLUGS.has(slug))
  )
  const slovanSectionViews = Object.fromEntries(
    Object.entries(sectionViews ?? {}).filter(([key]) => SLOVAN_SLUGS.has(key.split(':')[0]))
  )

  const sum = (obj: Record<string, number>) => Object.values(obj).reduce((a, b) => a + b, 0)
  const sorted = (obj: Record<string, number>) => Object.entries(obj).sort((a, b) => b[1] - a[1])

  const totalPageViews = sum(slovanPageViews)
  const nabidkaViews = slovanPageViews['/slovan/nabidka'] ?? 0
  const totalOrbitClicks = sum(slovanOrbitClicks)
  const totalSectionViews = sum(slovanSectionViews)

  const topPages = sorted(slovanPageViews)
  const topOrbits = sorted(slovanOrbitClicks)
  const topSections = sorted(slovanSectionViews).slice(0, 10)
  const topReferrers = sorted(referrers ?? {})
  const topDevices = sorted(devices ?? {})

  const maxPages = topPages[0]?.[1] ?? 1
  const maxOrbits = topOrbits[0]?.[1] ?? 1
  const maxSections = topSections[0]?.[1] ?? 1
  const maxReferrers = topReferrers[0]?.[1] ?? 1
  const maxDevices = topDevices[0]?.[1] ?? 1

  const productColor = (slug: string) => SLOVAN_PRODUCTS[slug]?.color ?? '#1959B0'
  const productLabel = (slug: string) => SLOVAN_PRODUCTS[slug]?.label ?? slug

  const deviceColor: Record<string, string> = { Desktop: '#1959B0', Mobil: '#F59E0B', Tablet: '#10B981', Neznámý: '#ffffff30' }
  const referrerColor = '#6366F1'

  return (
    <main className="min-h-screen px-8 py-10"
      style={{ background: 'linear-gradient(160deg, #00102B 0%, #002450 60%, #003F8A 100%)' }}>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Slovan Analytics
            </h1>
            <p className="text-white/40 text-sm mt-1">FC Slovan Liberec · návštěvnost ekosystému</p>
          </div>
          <a href="/slovan" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Zpět na ekosystém
          </a>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Zobrazení stránek" value={totalPageViews} accent="#1959B0" />
          <StatCard label="Nabídka zobrazena" value={nabidkaViews}   accent="#F59E0B" sub="celkem otevření" />
          <StatCard label="Zájem o produkty"  value={totalOrbitClicks} accent="#10B981" />
          <StatCard label="Sekce prohlédnuty" value={totalSectionViews} accent="#BE185D" />
        </div>

        {/* Live section — client component */}
        <LiveSection />

        {/* Odkud přišli + Zařízení */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">Odkud přišli</h2>
            {topReferrers.length === 0 && <p className="text-white/30 text-xs">Zatím žádná data</p>}
            {topReferrers.map(([ref, count]) => (
              <Bar key={ref} label={ref} value={count} max={maxReferrers} color={referrerColor} />
            ))}
          </div>

          <div className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">Zařízení</h2>
            {topDevices.length === 0 && <p className="text-white/30 text-xs">Zatím žádná data</p>}
            {topDevices.map(([device, count]) => (
              <Bar key={device} label={device} value={count} max={maxDevices} color={deviceColor[device] ?? '#fff'} />
            ))}
          </div>
        </div>

        {/* Orbit clicks + Page views */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">Zájem o produkty (orbit)</h2>
            {topOrbits.length === 0 && <p className="text-white/30 text-xs">Zatím žádná data</p>}
            {topOrbits.map(([slug, count]) => (
              <Bar key={slug} label={productLabel(slug)} value={count} max={maxOrbits} color={productColor(slug)} />
            ))}
          </div>

          <div className="rounded-xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">Nejnavštěvovanější stránky</h2>
            {topPages.length === 0 && <p className="text-white/30 text-xs">Zatím žádná data</p>}
            {topPages.map(([page, count]) => {
              const slug = page.replace(/^\/slovan\/?/, '') || 'home'
              return (
                <Bar key={page}
                  label={slug === 'home' || slug === '' ? 'Slovan home' : (productLabel(slug) || page)}
                  value={count} max={maxPages}
                  color={slug === 'home' || slug === '' ? '#1959B0' : productColor(slug)} />
              )
            })}
          </div>
        </div>

        {/* Section engagement */}
        <div className="rounded-xl p-6 space-y-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-white text-sm font-bold uppercase tracking-widest opacity-70">Nejprohlíženější sekce</h2>
          {topSections.length === 0 && <p className="text-white/30 text-xs">Zatím žádná data</p>}
          {topSections.map(([key, count]) => {
            const [productSlug, sectionId] = key.split(':')
            return (
              <Bar key={key} label={`${productLabel(productSlug)} · ${sectionId}`}
                value={count} max={maxSections} color={productColor(productSlug)} wideLabel />
            )
          })}
        </div>

      </div>
    </main>
  )
}
