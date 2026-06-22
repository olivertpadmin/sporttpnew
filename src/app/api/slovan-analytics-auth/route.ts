import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  if (password === 'gremlica') {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('plg_slovan_analytics', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return res
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
