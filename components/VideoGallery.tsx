'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { VideoItem } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import VideoModal from '@/components/VideoModal'

interface VideoGalleryProps {
  videos: VideoItem[]
  initialNextPageToken?: string | null
}

export default function VideoGallery({ videos, initialNextPageToken = null }: VideoGalleryProps) {
  const [allVideos, setAllVideos] = useState(videos)
  const [nextPageToken, setNextPageToken] = useState(initialNextPageToken)
  const [loading, setLoading] = useState(false)
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { y: 30, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: featuredRef.current, start: 'top 85%', once: true },
          }
        )
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.video-grid-card')
        gsap.fromTo(
          cards,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
          }
        )
      }
    })

    return () => { ctx.revert() }
  }, [])

  const loadMore = async () => {
    if (!nextPageToken || loading) return
    setLoading(true)

    try {
      const res = await fetch(`/api/youtube?pageToken=${nextPageToken}`)
      const data = await res.json()
      setAllVideos((prev) => [...prev, ...data.videos])
      setNextPageToken(data.nextPageToken)
    } catch (err) {
      console.error('Failed to load more videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const featured = allVideos[0]
  const gridVideos = allVideos.slice(1)

  return (
    <>
      {/* Featured Video */}
      {featured && (
        <div className="py-12 bg-bg-primary relative grain-light">
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div ref={featuredRef} className="opacity-0">
              <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
                LATEST VIDEO
              </p>
              <VideoCard video={featured} onPlay={setActiveVideo} featured />
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      {gridVideos.length > 0 && (
        <div className="py-16 bg-bg-secondary relative noise grain-heavy">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
              MORE VIDEOS
            </p>
            <h2 className="text-white text-3xl font-bold mb-10">From the Archive.</h2>

            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {gridVideos.map((video, i) => (
                <div key={`${video.id}-${i}`} className="video-grid-card">
                  <VideoCard video={video} onPlay={setActiveVideo} />
                </div>
              ))}
            </div>

            {/* Load More */}
            {nextPageToken && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="border border-white/20 text-white rounded-full px-8 py-3 font-semibold text-sm hover:border-white/40 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Loading...' : 'Load More Videos'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}
