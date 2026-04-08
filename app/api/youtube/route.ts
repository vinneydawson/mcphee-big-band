import { NextRequest, NextResponse } from 'next/server'
import { fetchVideos } from '@/lib/youtube'

export async function GET(request: NextRequest) {
  const pageToken = request.nextUrl.searchParams.get('pageToken') || undefined

  try {
    const data = await fetchVideos(pageToken)
    return NextResponse.json(data)
  } catch (error) {
    console.error('YouTube API route error:', error)
    return NextResponse.json(
      { videos: [], nextPageToken: null },
      { status: 500 }
    )
  }
}
