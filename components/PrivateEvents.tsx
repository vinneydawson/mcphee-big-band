'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function PrivateEvents() {
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rightRef.current) return

    const tween = gsap.fromTo(
      rightRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative grain-light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6">
        {/* Left — Placeholder */}
        <div className="bg-surface border border-white/10 rounded-2xl aspect-video overflow-hidden relative">
          <Image src="/images/band-wide.jpg" alt="McPhee Big Band full ensemble performance" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>

        {/* Right — Content */}
        <div ref={rightRef} className="opacity-0">
          <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
            PRIVATE BOOKINGS
          </p>
          <h2 className="text-white text-4xl font-bold mb-6">
            Make Your Event Unforgettable.
          </h2>
          <p className="text-text-muted text-lg mb-8">
            From black-tie corporate galas to wedding receptions, the McPhee Big Band
            brings the full sound, sophistication, and energy of a professional jazz
            orchestra to your event.
          </p>
          <ul className="text-text-muted text-base space-y-3">
            <li>Corporate events &amp; galas</li>
            <li>Wedding receptions &amp; rehearsal dinners</li>
            <li>Private parties &amp; milestone celebrations</li>
            <li>Fundraisers &amp; benefit concerts</li>
          </ul>
          <Link
            href="/contact#form"
            className="bg-cb-blue text-white rounded-full px-8 py-4 font-semibold mt-8 inline-block hover:bg-blue-600 transition-colors"
          >
            Inquire About Booking
          </Link>
        </div>
      </div>
    </div>
  )
}
