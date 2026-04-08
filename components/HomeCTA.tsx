'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function HomeCTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 30, opacity: 0, scale: 0.97 },
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
    <div className="py-24 bg-bg-primary relative grain-light">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={containerRef}
          className="bg-surface border border-white/10 rounded-2xl p-12 text-center relative overflow-hidden glow-blue opacity-0"
        >
          <div className="relative z-10">
            <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
              READY?
            </p>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
              Let&apos;s Make Something Happen.
            </h2>
            <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">
              Whether it&apos;s your next event, a collaboration, or just coming out to hear live
              jazz, we&apos;d love to connect.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                href="/contact#form"
                className="bg-cb-blue text-white rounded-full px-8 py-4 font-semibold hover:bg-blue-600 transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/shows"
                className="border border-white/20 text-white rounded-full px-8 py-4 font-semibold hover:border-white/40 transition-colors"
              >
                See Upcoming Shows
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
