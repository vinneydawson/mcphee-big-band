'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function MilesBio() {
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
    <div className="py-24 bg-bg-primary relative grain-light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
        {/* Left — Portrait */}
        <div ref={leftRef} className="opacity-0">
          <div className="bg-surface border border-white/10 rounded-2xl aspect-square overflow-hidden">
            <img src="/images/miles-mcphee.jpg" alt="Miles McPhee, Music Director and Arranger" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right — Bio */}
        <div ref={rightRef} className="opacity-0">
          <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-3">
            FOUNDER, MUSIC DIRECTOR &amp; ARRANGER
          </p>
          <h2 className="text-white text-5xl font-bold mb-6">Miles McPhee.</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            Miles McPhee is the founder, arranger, and music director of the McPhee Big
            Band. A saxophonist and composer from the acclaimed Mira Costa High School
            jazz program in Manhattan Beach, Miles was selected for the National Jazz
            Festival Diplomat All-Star Band directed by Wayne Tucker as part of the
            Grammy Award-winning Mira Costa Jazz 1 ensemble that took first place at
            the 2024 National Jazz Festival in Philadelphia. He writes all original
            arrangements for the band and has built a dedicated following through the
            monthly residency at Roscoe&apos;s Jazz Lounge in Downtown Long Beach.
          </p>
          <p className="text-text-muted text-sm">
            <span className="text-white font-medium">Credits:</span> Mira Costa Jazz 1 (Grammy Award-winning),
            National Jazz Festival Diplomat All-Star Band, McPhee Big Band Founder
          </p>
        </div>
      </div>
    </div>
  )
}
