'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Calendar } from 'lucide-react'
import { nextShow } from '@/lib/shows'

export default function Residency() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div id="residency" className="py-24 bg-bg-secondary relative grain-heavy scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto px-6">
        {/* Left Column */}
        <div ref={leftRef} className="opacity-0">
          <h2 className="text-white text-5xl font-bold mb-6">The Residency.</h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Join us once a month at{' '}
            <strong className="text-white">Roscoe&apos;s Jazz Lounge</strong> in
            Downtown Long Beach. A night of high-octane brass, swinging rhythms, and the
            spirit of jazz alive today.
          </p>

          {/* Event Card */}
          <div className="bg-surface border border-white/10 rounded-2xl p-6 mt-8">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-cb-blue w-5 h-5" />
              <span className="text-white font-semibold">Next Show: {nextShow.shortDate}</span>
            </div>
            <p className="text-text-muted text-sm">Doors {nextShow.doorsTime} · Show {nextShow.showTime} · {nextShow.price} Admission</p>
            <a
              href={nextShow.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-black font-bold rounded-xl py-4 mt-4 hover:bg-gray-100 transition-colors text-center"
            >
              Get Tickets
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightRef} className="opacity-0">
          <div className="bg-surface border border-white/10 rounded-2xl aspect-video overflow-hidden">
            <img src="/images/residency-show.jpg" alt="McPhee Big Band live at the monthly residency" className="w-full h-full object-cover" />
          </div>
          <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mt-6 mb-2">
            LIVE PERFORMANCE
          </p>
          <h3 className="text-white text-3xl font-bold">Full 17-Piece Orchestra.</h3>
        </div>
      </div>
    </div>
  )
}
