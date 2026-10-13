import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = 'CTC'
const COOKIE = 'shopps_auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login page and API through
  if (pathname.startsWith('/login') || pathname.startsWith('/api/login')) {
    return NextResponse.next()
  }

  // Check auth cookie
  if (req.cookies.get(COOKIE)?.value === PASSWORD) {
    return NextResponse.next()
  }

  // Redirect to login
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.mp4|.*\\.webm).*)'],
}
