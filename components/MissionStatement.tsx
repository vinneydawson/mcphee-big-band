'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function MissionStatement() {
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quoteRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 75%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative glow-blue grain-heavy">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div ref={quoteRef} className="border-l-4 border-cb-blue pl-8 py-4">
          <blockquote className="text-white text-3xl lg:text-4xl font-bold leading-snug mb-6">
            &ldquo;I love dancing. But you can&apos;t dance without the music!&rdquo;
          </blockquote>
          <p className="text-text-muted text-base">
            - Bill Walton, NBA All-Star
          </p>
        </div>
      </div>
    </div>
  )
}
