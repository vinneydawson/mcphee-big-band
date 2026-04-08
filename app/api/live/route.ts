import { NextResponse } from 'next/server'
import { checkLiveStream } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const status = await checkLiveStream()
    return NextResponse.json(status)
  } catch (error) {
    console.error('Live stream check error:', error)
    return NextResponse.json(
      { isLive: false, videoId: null, title: null, thumbnail: null },
      { status: 500 }
    )
  }
}
