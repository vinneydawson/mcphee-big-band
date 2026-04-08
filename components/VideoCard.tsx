'use client'

import { Play } from 'lucide-react'
import type { VideoItem } from '@/lib/youtube'

interface VideoCardProps {
  video: VideoItem
  onPlay: (video: VideoItem) => void
  featured?: boolean
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function VideoCard({ video, onPlay, featured = false }: VideoCardProps) {
  return (
    <button
      onClick={() => onPlay(video)}
      className={`group text-left w-full bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-cb-blue/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
        featured ? '' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
            <span className="text-text-muted text-sm">Video Thumbnail</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-cb-blue/80 group-hover:scale-110 transition-all duration-300 ${
              featured ? 'w-20 h-20' : 'w-14 h-14'
            }`}
          >
            <Play
              className={`text-white ml-1 ${featured ? 'w-8 h-8' : 'w-5 h-5'}`}
              fill="white"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className={featured ? 'p-6' : 'p-4'}>
        <h3
          className={`text-white font-semibold mb-1 line-clamp-2 ${
            featured ? 'text-xl' : 'text-sm'
          }`}
        >
          {video.title}
        </h3>
        <p className="text-text-muted text-xs">{formatDate(video.publishedAt)}</p>
        {featured && video.description && (
          <p className="text-text-muted text-sm mt-3 line-clamp-2">{video.description}</p>
        )}
      </div>
    </button>
  )
}
