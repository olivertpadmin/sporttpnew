import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Analytics section — separate password
  if (pathname.startsWith('/analytics/login') || pathname.startsWith('/api/analytics-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/analytics')) {
    const analyticsAuth = request.cookies.get('plg_analytics')
    if (analyticsAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/analytics/login', request.url))
  }

  // Kometa analytics — separate password (must come before general /kometa check)
  if (pathname.startsWith('/kometa/analytics/login') || pathname.startsWith('/api/kometa-analytics-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/kometa/analytics')) {
    const kometaAuth = request.cookies.get('plg_kometa')
    if (kometaAuth?.value !== '1') return NextResponse.redirect(new URL('/kometa/login', request.url))
    const analyticsAuth = request.cookies.get('plg_kometa_analytics')
    if (analyticsAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/kometa/analytics/login', request.url))
  }

  // Kometa section — separate password
  if (pathname.startsWith('/kometa/login') || pathname.startsWith('/api/kometa-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/kometa')) {
    const kometaAuth = request.cookies.get('plg_kometa')
    if (kometaAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/kometa/login', request.url))
  }

  // Slovan analytics — separate password (must come before general /slovan check)
  if (pathname.startsWith('/slovan/analytics/login') || pathname.startsWith('/api/slovan-analytics-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/slovan/analytics')) {
    const slovanAuth = request.cookies.get('plg_slovan')
    if (slovanAuth?.value !== '1') return NextResponse.redirect(new URL('/slovan/login', request.url))
    const analyticsAuth = request.cookies.get('plg_slovan_analytics')
    if (analyticsAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/slovan/analytics/login', request.url))
  }

  // Slovan section — separate password
  if (pathname.startsWith('/slovan/login') || pathname.startsWith('/api/slovan-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/slovan')) {
    const slovanAuth = request.cookies.get('plg_slovan')
    if (slovanAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/slovan/login', request.url))
  }

  // Arsenal ČL analytics — separate password (must come before general /arsenalcl check)
  if (pathname.startsWith('/arsenalcl/analytics/login') || pathname.startsWith('/api/arsenalcl-analytics-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/arsenalcl/analytics')) {
    const arsenalclAuth = request.cookies.get('plg_arsenalcl')
    if (arsenalclAuth?.value !== '1') return NextResponse.redirect(new URL('/arsenalcl/login', request.url))
    const analyticsAuth = request.cookies.get('plg_arsenalcl_analytics')
    if (analyticsAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/arsenalcl/analytics/login', request.url))
  }

  // Arsenal ČL section — separate password
  if (pathname.startsWith('/arsenalcl/login') || pathname.startsWith('/api/arsenalcl-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/arsenalcl')) {
    const arsenalclAuth = request.cookies.get('plg_arsenalcl')
    if (arsenalclAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/arsenalcl/login', request.url))
  }

  // Hradec analytics — separate password (must come before general /hradec check)
  if (pathname.startsWith('/hradec/analytics/login') || pathname.startsWith('/api/hradec-analytics-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/hradec/analytics')) {
    const hradecAuth = request.cookies.get('plg_hradec')
    if (hradecAuth?.value !== '1') return NextResponse.redirect(new URL('/hradec/login', request.url))
    const analyticsAuth = request.cookies.get('plg_hradec_analytics')
    if (analyticsAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/hradec/analytics/login', request.url))
  }

  // Hradec section — separate password
  if (pathname.startsWith('/hradec/login') || pathname.startsWith('/api/hradec-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/hradec')) {
    const hradecAuth = request.cookies.get('plg_hradec')
    if (hradecAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/hradec/login', request.url))
  }

  // Sport analytics — separate password (must come before general /sport check)
  if (pathname.startsWith('/sport/analytics/login') || pathname.startsWith('/api/sport-analytics-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/sport/analytics')) {
    const sportAuth = request.cookies.get('plg_sport')
    if (sportAuth?.value !== '1') return NextResponse.redirect(new URL('/sport/login', request.url))
    const analyticsAuth = request.cookies.get('plg_sport_analytics')
    if (analyticsAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/sport/analytics/login', request.url))
  }

  // Sport section — separate password
  if (pathname.startsWith('/sport/login') || pathname.startsWith('/api/sport-auth')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/sport')) {
    const sportAuth = request.cookies.get('plg_sport')
    if (sportAuth?.value === '1') return NextResponse.next()
    return NextResponse.redirect(new URL('/sport/login', request.url))
  }

  // Main site
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  const auth = request.cookies.get('plg_auth')
  if (auth?.value === '1') return NextResponse.next()

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.woff|.*\\.woff2).*)'],
}
