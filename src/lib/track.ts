export type TrackEvent =
  | { type: 'page_view'; page: string; ts: number; referrer?: string; ua?: string }
  | { type: 'orbit_click'; product: string; ts: number }
  | { type: 'breadcrumb_click'; target: string; from: string; ts: number }
  | { type: 'section_view'; product: string; section: string; ts: number }

export function track(event: TrackEvent): void {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => {})
}

export function parseReferrer(ref: string): string {
  if (!ref) return 'Přímý přístup'
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (host.includes('google')) return 'Google'
    if (host.includes('facebook') || host.includes('fb.com')) return 'Facebook'
    if (host.includes('linkedin')) return 'LinkedIn'
    if (host.includes('t.co') || host.includes('twitter') || host.includes('x.com')) return 'X / Twitter'
    if (host.includes('instagram')) return 'Instagram'
    if (host.includes('plg.partners') || host.includes('localhost')) return 'Interní'
    return host
  } catch {
    return 'Neznámý'
  }
}

export function parseDevice(ua: string): string {
  if (!ua) return 'Neznámý'
  if (/tablet|ipad/i.test(ua)) return 'Tablet'
  if (/mobile|iphone|android/i.test(ua)) return 'Mobil'
  return 'Desktop'
}
