'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { pastShows } from '@/lib/shows'

// Dynamic stats — performances count updates automatically from pastShows data
const SONGS_PER_SHOW = 16

const stats = [
  { value: 17, suffix: '', label: 'Musicians on Stage' },
  { value: pastShows.length, suffix: '+', label: 'Performances' },
  { value: pastShows.length * SONGS_PER_SHOW, suffix: '+', label: 'Songs Performed' },
  { value: 2025, suffix: '', label: 'Year Founded' },
]

export default function BandStats() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const cells = gridRef.current!.querySelectorAll('.stat-cell')

      gsap.fromTo(
        cells,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        }
      )

      // Counter animation for each number
      const numbers = gridRef.current!.querySelectorAll('.stat-number')
      numbers.forEach((el, i) => {
        const target = stats[i].value
        const obj = { val: 0 }

        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            (el as HTMLElement).textContent = Math.round(obj.val).toString() + stats[i].suffix
          },
        })
      })
    }, gridRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-20 bg-bg-primary relative glow-blue grain-light">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-cell text-center">
              <p className="stat-number text-white text-5xl font-bold mb-2">
                0{stat.suffix}
              </p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
