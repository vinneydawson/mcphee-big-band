'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Check } from 'lucide-react'

const packages = [
  {
    name: 'Jazz Combo',
    size: '4–6 Musicians',
    description: 'An intimate ensemble perfect for cocktail hours, dinners, and smaller gatherings.',
    features: [
      'Rhythm section + 1–2 horns',
      'Up to 2 hours of live music',
      'Standard jazz repertoire',
      'Indoor venues up to 100 guests',
    ],
    highlighted: false,
  },
  {
    name: 'Full Big Band',
    size: '17 Musicians',
    description: 'The complete McPhee Big Band experience: the full power and sound of a professional jazz orchestra.',
    features: [
      'Full 17-piece ensemble',
      'Up to 3 hours of live music',
      'Custom setlist from our repertoire',
      'Original arrangements by Miles McPhee',
      'Sound engineer included',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    size: '17+ Musicians',
    description: 'Everything in the Full Big Band package, plus bespoke arrangements and extended performance.',
    features: [
      'Full 17-piece ensemble + vocalists',
      'Up to 4 hours of live music',
      'Custom arrangements written for your event',
      'Dedicated event coordinator',
      'Sound & lighting coordination',
      'Rehearsal for specialty requests',
    ],
    highlighted: false,
  },
]

export default function EventPackages() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.pkg-card')

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        }
      )
    }, gridRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div id="packages" className="py-24 bg-bg-secondary relative glow-blue grain-heavy scroll-mt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          PACKAGES
        </p>
        <h2 className="text-white text-4xl font-bold mb-4">Choose Your Experience.</h2>
        <p className="text-text-muted text-lg mb-12">
          Every package is fully customizable. Contact us for a detailed quote tailored to your event.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`pkg-card rounded-2xl p-8 flex flex-col ${
                pkg.highlighted
                  ? 'bg-cb-blue/10 border-2 border-cb-blue/40'
                  : 'bg-surface border border-white/10'
              }`}
            >
              {pkg.highlighted && (
                <span className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-3">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-white text-2xl font-bold">{pkg.name}</h3>
              <p className="text-cb-blue text-sm font-semibold mt-1 mb-4">{pkg.size}</p>
              <p className="text-text-muted text-sm leading-relaxed mb-6">{pkg.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-text-muted text-sm">
                    <Check className="w-4 h-4 text-cb-blue mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact#form"
                className={`block text-center rounded-full py-3 font-semibold text-sm transition-colors ${
                  pkg.highlighted
                    ? 'bg-cb-blue text-white hover:bg-blue-600'
                    : 'border border-white/20 text-white hover:border-white/40'
                }`}
              >
                Request a Quote
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
