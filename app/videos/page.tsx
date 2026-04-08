import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import VideoGallery from '@/components/VideoGallery'
import { fetchVideos } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Watch the McPhee Big Band: performances, original arrangements, rehearsals, and behind-the-scenes from Southern California\'s premier jazz orchestra.',
}

export const revalidate = 3600

export default async function VideosPage() {
  const { videos, nextPageToken } = await fetchVideos(undefined, 13)

  return (
    <>
      <PageHeader
        label="WATCH"
        title="Live Performances."
        subtitle="From our monthly residency at Roscoe's to rehearsal sessions and original arrangements. See the McPhee Big Band in action."
      />
      <VideoGallery videos={videos} initialNextPageToken={nextPageToken} />
    </>
  )
}
