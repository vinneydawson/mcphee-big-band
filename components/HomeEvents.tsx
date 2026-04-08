'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Check } from 'lucide-react'

const eventTypes = [
  'Corporate events & galas',
  'Wedding receptions & rehearsal dinners',
  'Private parties & milestone celebrations',
  'Fundraisers & benefit concerts',
  'Festival & concert appearances',
]

export default function HomeEvents() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative glow-blue grain-light">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6">
        {/* Left — Placeholder */}
        <div className="bg-surface border border-white/10 rounded-2xl aspect-[4/3] overflow-hidden order-2 lg:order-1 relative">
          <Image src="/images/event-performance.jpg" alt="McPhee Big Band at a private event" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>

        {/* Right — Content */}
        <div ref={containerRef} className="opacity-0 order-1 lg:order-2">
          <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
            PRIVATE BOOKINGS
          </p>
          <h2 className="text-white text-4xl font-bold mb-6">
            Book the Band.
          </h2>
          <p className="text-text-muted text-lg mb-8">
            The McPhee Big Band brings the full sound, sophistication, and energy of a
            professional jazz orchestra to your event, from intimate gatherings to
            grand productions.
          </p>

          <ul className="space-y-3 mb-8">
            {eventTypes.map((t) => (
              <li key={t} className="flex items-center gap-3 text-text-muted text-sm">
                <Check className="w-4 h-4 text-cb-blue flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/events#packages"
              className="bg-cb-blue text-white rounded-full px-8 py-4 font-semibold hover:bg-blue-600 transition-colors"
            >
              View Packages
            </Link>
            <Link
              href="/contact#form"
              className="border border-white/20 text-white rounded-full px-8 py-4 font-semibold hover:border-white/40 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
