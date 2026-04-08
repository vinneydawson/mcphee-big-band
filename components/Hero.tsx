'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import ScrollIndicator from '@/components/ScrollIndicator'
import HeroParticles from '@/components/HeroParticles'

export default function Hero() {
  const pillRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const goldRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      pillRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(
        btnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      )

    // Subtle gradient shimmer on the gold text
    if (goldRef.current) {
      gsap.to(goldRef.current, {
        backgroundPosition: '200% center',
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden hero-gradient"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {/* Layer 1: Performance photo (heavily darkened) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/venue-show.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.15]"
        />
      </div>

      {/* Layer 2: Animated gradient overlay */}
      <div className="absolute inset-0 z-[1] hero-gradient opacity-80" />

      {/* Layer 3: Floating particles */}
      <HeroParticles />

      {/* Layer 4: Noise grain texture */}
      <div className="absolute inset-0 z-[3] noise pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 pb-16">
        {/* Pill Badge */}
        <div
          ref={pillRef}
          className="bg-cb-blue/10 border border-cb-blue/30 text-cb-blue text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-8 opacity-0"
        >
          LOS ANGELES, CA
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="text-6xl md:text-7xl lg:text-8xl font-bold opacity-0">
          <span className="text-white block">Los Angeles&apos; Next</span>
          <span
            ref={goldRef}
            className="block gold-shimmer"
          >
            Great Big Band.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-text-muted text-lg md:text-xl max-w-2xl text-center mt-6 opacity-0"
        >
          Live jazz. Extraordinary events. Original arrangements from Southern
          California&apos;s finest young musicians.
        </p>

        {/* CTA Buttons */}
        <div
          ref={btnsRef}
          className="mt-8 md:mt-10 flex gap-4 flex-wrap justify-center opacity-0"
        >
          <Link
            href="/shows"
            className="bg-cb-blue text-white rounded-full px-8 py-4 font-semibold hover:bg-blue-600 transition-colors"
          >
            See Upcoming Shows
          </Link>
          <Link
            href="/events"
            className="border border-white/20 text-white rounded-full px-8 py-4 font-semibold hover:border-white/40 transition-colors"
          >
            Book a Private Event
          </Link>
        </div>
      </div>

      <ScrollIndicator />
    </div>
  )
}
