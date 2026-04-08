'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function FeaturedMusician() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative glow-blue grain-light">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          MUSICIAN SPOTLIGHT
        </p>
        <h2 className="text-white text-4xl font-bold mb-10">Featured Player.</h2>

        <div
          ref={containerRef}
          className="bg-surface border border-white/10 rounded-2xl overflow-hidden opacity-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Photo */}
            <div className="lg:col-span-2 overflow-hidden">
              <img src="/images/ewan-mcphee.jpg" alt="Ewan McPhee, Lead Trumpet" className="w-full h-full object-cover min-h-[300px]" />
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 p-8 flex flex-col justify-center">
              <span className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-2">
                LEAD TRUMPET
              </span>
              <h3 className="text-white text-3xl font-bold mb-4">Ewan McPhee</h3>
              <p className="text-text-muted text-base leading-relaxed mb-4">
                Ewan McPhee holds down the lead trumpet chair in the McPhee Big Band,
                bringing a commanding tone and effortless upper register to the front of the
                brass section. A product of the acclaimed Mira Costa High School jazz program
                in Manhattan Beach, Ewan was named Outstanding Musician at the 2024 National
                Jazz Festival in Philadelphia, where the Grammy Award-winning Mira Costa Jazz 1
                ensemble took first place in the Large Ensemble division. He served as president
                of the jazz band and brings nine years of trumpet experience and four years of
                French horn to the bandstand. Ewan currently studies jazz at Louisiana State
                University while continuing to perform with the McPhee Big Band.
              </p>
              <p className="text-text-muted text-sm">
                <span className="text-white font-medium">Credits:</span> Mira Costa Jazz 1 (Grammy Award-winning),
                2024 National Jazz Festival Outstanding Musician, LSU Jazz Ensemble
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
