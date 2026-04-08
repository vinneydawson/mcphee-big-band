'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const milestones = [
  {
    year: '2025',
    title: 'The McPhee Big Band Is Founded',
    description: 'Miles McPhee assembles a 17-piece ensemble from Southern California\'s top young jazz musicians.',
  },
  {
    year: '2025',
    title: 'First Performances',
    description: 'The band begins performing live across Southern California, capturing early performances on video.',
  },
  {
    year: '2025',
    title: 'Roscoe\'s Jazz Lounge Residency',
    description: 'The band begins performing at Roscoe\'s Jazz Lounge in Downtown Long Beach, building a dedicated local following.',
  },
  {
    year: '2025',
    title: 'Private Events Launch',
    description: 'Corporate events, weddings, and private parties begin booking the band across Southern California.',
  },
]

export default function BandTimeline() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return

    const ctx = gsap.context(() => {
      const items = listRef.current!.querySelectorAll('.timeline-item')

      items.forEach((item, i) => {
        const fromX = i % 2 === 0 ? -30 : 30
        gsap.fromTo(
          item,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }, listRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative dot-grid grain-light">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          MILESTONES
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">Our Journey.</h2>

        <div ref={listRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.title} className="timeline-item flex gap-6 items-start pl-6 relative">
                {/* Dot */}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-cb-blue bg-bg-primary flex-shrink-0" />

                <div>
                  <span className="text-cb-blue text-xs font-semibold">{m.year}</span>
                  <h3 className="text-white text-lg font-semibold mt-1 mb-2">{m.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
