'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MapPin, Music } from 'lucide-react'
import { venue } from '@/lib/shows'
import VenueMap from '@/components/VenueMap'

const details = [
  { icon: MapPin, label: 'Location', value: venue.address },
  { icon: Music, label: 'Vibe', value: `Intimate, ${venue.capacity}` },
]

export default function VenueSpotlight() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative noise grain-heavy">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          OUR HOME
        </p>
        <h2 className="text-white text-4xl font-bold mb-10">Roscoe&apos;s Jazz Lounge.</h2>

        <div ref={cardRef} className="bg-surface border border-white/10 rounded-2xl overflow-hidden opacity-0">
          {/* Map inside the card */}
          <VenueMap />

          {/* Content */}
          <div className="p-8">
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Roscoe&apos;s Jazz Lounge is an intimate listening room in the heart of
              Downtown Long Beach. With warm acoustics, low lighting, and great drinks, it&apos;s the
              perfect setting for the full power of a 17-piece orchestra. This is where the McPhee
              Big Band comes alive.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {details.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cb-blue flex-shrink-0" />
                    <span className="text-text-muted text-sm">{d.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
