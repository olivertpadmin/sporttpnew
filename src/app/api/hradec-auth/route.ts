import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === 'votroci') {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('plg_hradec', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return res
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
