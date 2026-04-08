'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ArrowRight } from 'lucide-react'

export default function HomeAbout() {
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
    <div className="py-24 bg-bg-primary relative grain-light">
      <div ref={containerRef} className="max-w-3xl mx-auto text-center px-6 opacity-0">
        <p className="text-cb-blue text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          WHO WE ARE
        </p>
        <h2 className="text-white text-4xl font-bold mb-8">Keeping Big Band Alive.</h2>
        <p className="text-text-muted text-lg leading-relaxed mb-6">
          The McPhee Big Band is a 17-piece jazz orchestra made up of Southern California&apos;s
          top young musicians. Led by arranger and music director Miles McPhee, we
          perform original arrangements alongside classics from the jazz canon, played with
          precision and the energy of a late-night club.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-cb-blue text-sm font-semibold hover:underline"
        >
          Learn more about the band
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
