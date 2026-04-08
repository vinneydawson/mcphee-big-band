'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function AboutStrip() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative grain-light">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6">
        {/* Left — Text */}
        <div ref={leftRef} className="opacity-0">
          <p className="text-cb-blue text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            WHO WE ARE
          </p>
          <h2 className="text-white text-4xl font-bold mb-8">Keeping Big Band Alive.</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            The McPhee Big Band is a collective of Southern California&apos;s top
            young jazz musicians, led by arranger and music director Miles McPhee. We
            perform original arrangements alongside the work of legends like Sammy Nestico,
            Bill Holman, and the Airmen of Note, played with precision and the energy of a
            late-night club.
          </p>
          <p className="text-text-muted text-lg leading-relaxed">
            Based in Los Angeles with a residency at Roscoe&apos;s Jazz Lounge in
            Downtown Long Beach, we bring the full power of the big band tradition to
            concert stages and private events across Southern California.
          </p>
        </div>

        {/* Right — Image */}
        <div ref={rightRef} className="opacity-0">
          <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden relative aspect-[4/3]">
            <Image
              src="/images/about-band.jpg"
              alt="McPhee Big Band performing live"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
