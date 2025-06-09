// middleware.ts
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const { ua } = userAgent(request)
  const isCli = /\b(curl|wget|httpie)\b/i.test(ua)

  const hasFetch = request.headers.has('sec-fetch-site')

  if (isCli && !hasFetch) {
    const url = request.nextUrl.clone()
    url.pathname = '/curl-response'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
