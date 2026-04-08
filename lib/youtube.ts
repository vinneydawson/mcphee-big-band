export interface VideoItem {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  description: string
}

export interface YouTubeResponse {
  videos: VideoItem[]
  nextPageToken: string | null
}

export interface LiveStreamStatus {
  isLive: boolean
  videoId: string | null
  title: string | null
  thumbnail: string | null
}

const API_KEY = process.env.YOUTUBE_API_KEY || ''
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || ''

// Only show videos published on or after this date (Jun 29, 2025)
const PUBLISHED_AFTER = '2025-06-29T00:00:00Z'

export async function fetchVideos(
  pageToken?: string,
  maxResults = 12
): Promise<YouTubeResponse> {
  if (!API_KEY || !CHANNEL_ID) {
    return { videos: FALLBACK_VIDEOS, nextPageToken: null }
  }

  // Request extra results to account for filtering out live/upcoming entries
  const params = new URLSearchParams({
    part: 'snippet',
    channelId: CHANNEL_ID,
    order: 'date',
    maxResults: (maxResults + 4).toString(),
    type: 'video',
    publishedAfter: PUBLISHED_AFTER,
    key: API_KEY,
  })

  if (pageToken) {
    params.set('pageToken', pageToken)
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    console.error('YouTube API error:', res.status, await res.text())
    return { videos: FALLBACK_VIDEOS, nextPageToken: null }
  }

  const data = await res.json()

  // Filter out live and upcoming broadcasts, keep only regular uploads
  const videos: VideoItem[] = (data.items || [])
    .filter(
      (item: { snippet: { liveBroadcastContent: string } }) =>
        item.snippet.liveBroadcastContent === 'none'
    )
    .slice(0, maxResults)
    .map(
      (item: {
        id: { videoId: string }
        snippet: {
          title: string
          thumbnails: { high: { url: string } }
          publishedAt: string
          description: string
        }
      }) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      })
    )

  return {
    videos,
    nextPageToken: data.nextPageToken || null,
  }
}

export async function checkLiveStream(): Promise<LiveStreamStatus> {
  if (!API_KEY || !CHANNEL_ID) {
    return { isLive: false, videoId: null, title: null, thumbnail: null }
  }

  const params = new URLSearchParams({
    part: 'snippet',
    channelId: CHANNEL_ID,
    type: 'video',
    eventType: 'live',
    maxResults: '1',
    key: API_KEY,
  })

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
    { next: { revalidate: 30 } }
  )

  if (!res.ok) {
    return { isLive: false, videoId: null, title: null, thumbnail: null }
  }

  const data = await res.json()

  if (data.items && data.items.length > 0) {
    const item = data.items[0]
    return {
      isLive: true,
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || null,
    }
  }

  return { isLive: false, videoId: null, title: null, thumbnail: null }
}

export const FALLBACK_VIDEOS: VideoItem[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'McPhee Big Band 6-28-25 at Roscoe\'s Jazz Lounge Pt 01',
    thumbnail: '',
    publishedAt: '2025-06-29T03:00:00Z',
    description: 'Part 1 of our June 2025 performance at Roscoe\'s Jazz Lounge in Downtown Long Beach.',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'McPhee Big Band 6-28-25 at Roscoe\'s Jazz Lounge Pt 02',
    thumbnail: '',
    publishedAt: '2025-06-29T03:30:00Z',
    description: 'Part 2 of our June 2025 performance at Roscoe\'s Jazz Lounge in Downtown Long Beach.',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'McPhee Big Band — July Residency Highlights',
    thumbnail: '',
    publishedAt: '2025-07-15T20:00:00Z',
    description: 'Highlights from the July residency show.',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'McPhee Big Band — Original Arrangement Showcase',
    thumbnail: '',
    publishedAt: '2025-08-02T18:00:00Z',
    description: 'New original arrangements by Miles McPhee performed live.',
  },
]
