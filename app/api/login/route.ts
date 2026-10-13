import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = 'CTC'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === PASSWORD) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('shopps_auth', PASSWORD, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return res
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
