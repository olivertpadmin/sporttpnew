import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import type { TrackEvent } from '@/lib/track'
import { parseReferrer, parseDevice } from '@/lib/track'

const VALID_TYPES = ['page_view', 'orbit_click', 'breadcrumb_click', 'section_view'] as const

export async function POST(request: NextRequest) {
  let event: TrackEvent
  try {
    event = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!VALID_TYPES.includes(event.type as typeof VALID_TYPES[number])) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const today = new Date().toISOString().slice(0, 10)

  const writes: Promise<unknown>[] = [
    redis.lpush('analytics:events', JSON.stringify(event)),
    redis.ltrim('analytics:events', 0, 999),
    redis.hincrby(`analytics:daily:${today}`, event.type, 1),
  ]

  if (event.type === 'page_view') {
    writes.push(redis.hincrby('analytics:page_views', event.page, 1))
    const referrer = parseReferrer(event.referrer ?? '')
    const device = parseDevice(event.ua ?? '')
    writes.push(redis.hincrby('analytics:referrers', referrer, 1))
    writes.push(redis.hincrby('analytics:devices', device, 1))
  } else if (event.type === 'orbit_click') {
    writes.push(redis.hincrby('analytics:orbit_clicks', event.product, 1))
  } else if (event.type === 'breadcrumb_click') {
    writes.push(redis.hincrby('analytics:breadcrumb_clicks', event.target, 1))
  } else if (event.type === 'section_view') {
    writes.push(redis.hincrby('analytics:section_views', `${event.product}:${event.section}`, 1))
  }

  await Promise.all(writes)

  return NextResponse.json({ ok: true })
}
