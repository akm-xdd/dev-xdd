// app/curl-response/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const body = `👋 Hello CLI user!
You hit this endpoint because you’re using curl/wget.`
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
