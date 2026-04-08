'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Radio } from 'lucide-react'
import type { LiveStreamStatus } from '@/lib/youtube'

const POLL_INTERVAL = 30_000 // 30 seconds

export default function LivePlayer({ initial }: { initial: LiveStreamStatus }) {
  const [status, setStatus] = useState(initial)
  const containerRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  // Poll for live status
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch('/api/live')
        const data = await res.json()
        setStatus(data)
      } catch {
        // Silently fail, keep last known status
      }
    }

    const interval = setInterval(poll, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(
      containerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
  }, [])

  // Pulse animation on the live dot
  useEffect(() => {
    if (!pulseRef.current || !status.isLive) return
    gsap.to(pulseRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 1.2,
      ease: 'power1.out',
      repeat: -1,
    })
  }, [status.isLive])

  return (
    <div ref={containerRef} className="opacity-0">
      {status.isLive && status.videoId ? (
        <>
          {/* Live indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div ref={pulseRef} className="absolute inset-0 w-3 h-3 rounded-full bg-red-500" />
            </div>
            <span className="text-red-500 text-sm font-bold uppercase tracking-widest">
              Live Now
            </span>
          </div>

          {/* Player */}
          <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${status.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={status.title || 'Live Stream'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            {status.title && (
              <div className="p-6">
                <h2 className="text-white text-xl font-semibold">{status.title}</h2>
                <p className="text-text-muted text-sm mt-1">Streaming live on YouTube</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Offline state */
        <div className="bg-surface border border-white/10 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Radio className="w-7 h-7 text-text-muted" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">
            Not Currently Live
          </h2>
          <p className="text-text-muted text-base max-w-lg mx-auto mb-6">
            The McPhee Big Band isn&apos;t streaming right now. When a live performance begins, the stream will appear here&nbsp;automatically.
          </p>
          <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
            <div className="w-2 h-2 rounded-full bg-text-muted animate-pulse" />
            <span>Checking every 30 seconds</span>
          </div>
        </div>
      )}
    </div>
  )
}
