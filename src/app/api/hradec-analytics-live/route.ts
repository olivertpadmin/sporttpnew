import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { cookies } from 'next/headers'

const HRADEC_SLUGS = new Set([
  'sso', 'ticketing', 'kiosks', 'cashless', 'partnersky-portal',
  'marketing', 'ai-asistent', 'crm', 'mobilni-aplikace', 'pripadove-studie',
])

type RawEvent = {
  type: string
  page?: string
  product?: string
  target?: string
  from?: string
  section?: string
  referrer?: string
  ua?: string
  ts: number
}

function isHradecEvent(ev: RawEvent): boolean {
  if (ev.type === 'page_view') return !!ev.page?.startsWith('/hradec')
  if (ev.type === 'orbit_click') return HRADEC_SLUGS.has(ev.product ?? '')
  if (ev.type === 'breadcrumb_click') return HRADEC_SLUGS.has(ev.from ?? '') || HRADEC_SLUGS.has(ev.target ?? '')
  if (ev.type === 'section_view') return HRADEC_SLUGS.has(ev.product ?? '')
  return false
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const hradec = cookieStore.get('plg_hradec')
  const analyticsAuth = cookieStore.get('plg_hradec_analytics')
  if (hradec?.value !== '1' || analyticsAuth?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const minutes = Math.min(parseInt(searchParams.get('minutes') ?? '120'), 600)
  const since = Date.now() - minutes * 60 * 1000

  const raw: unknown[] = await redis.lrange('analytics:events', 0, 999)
  const events: RawEvent[] = raw.map((r) => {
    try { return typeof r === 'string' ? JSON.parse(r) : r } catch { return null }
  }).filter(Boolean).filter((ev) => {
    const e = ev as RawEvent
    return e.ts >= since && isHradecEvent(e)
  }) as RawEvent[]

  // Bucket by minute for the chart
  const bucketCount = Math.min(minutes, 60)
  const bucketMs = (minutes / bucketCount) * 60 * 1000
  const buckets: { label: string; total: number }[] = []
  for (let i = 0; i < bucketCount; i++) {
    const bucketStart = since + i * bucketMs
    const bucketEnd = bucketStart + bucketMs
    const label = new Date(bucketStart).toLocaleTimeString('cs-CZ', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague',
    })
    buckets.push({
      label,
      total: events.filter((e) => e.ts >= bucketStart && e.ts < bucketEnd).length,
    })
  }

  return NextResponse.json({ events: events.slice(0, 50), buckets, total: events.length })
}
