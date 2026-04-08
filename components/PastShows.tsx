'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MapPin } from 'lucide-react'
import { pastShows } from '@/lib/shows'

export default function PastShows() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return

    const ctx = gsap.context(() => {
      const items = listRef.current!.querySelectorAll('.show-item')

      items.forEach((item, i) => {
        const fromX = i % 2 === 0 ? -30 : 30
        gsap.fromTo(
          item,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    }, listRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          PAST PERFORMANCES
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">Recent Shows.</h2>

        <div ref={listRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-6">
            {pastShows.map((show) => (
              <div key={show.date + show.venue} className="show-item flex gap-6 items-start pl-6 relative">
                {/* Dot */}
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-cb-blue bg-bg-primary flex-shrink-0" />

                <div className="bg-surface border border-white/10 rounded-xl px-5 py-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <span className="text-white font-semibold text-sm">{show.date}</span>
                    <span className="text-text-muted text-xs">{show.note}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <MapPin className="w-3.5 h-3.5 text-cb-blue flex-shrink-0" />
                    <span>{show.venue} · {show.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
