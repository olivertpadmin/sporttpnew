import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === 'sportak') {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('plg_sport_analytics', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return res
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
