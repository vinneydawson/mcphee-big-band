'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Newspaper, ArrowRight } from 'lucide-react'

export default function PressEmpty() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative noise grain-heavy">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          IN THE PRESS
        </p>
        <h2 className="text-white text-4xl font-bold mb-10">Media Mentions.</h2>

        <div
          ref={containerRef}
          className="bg-surface border border-white/10 border-dashed rounded-2xl p-12 text-center opacity-0"
        >
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-6 h-6 text-text-muted" />
          </div>
          <h3 className="text-white text-xl font-semibold mb-3">
            Write About the McPhee Big Band
          </h3>
          <p className="text-text-muted text-base max-w-lg mx-auto mb-6">
            Are you a journalist, blogger, or media outlet covering jazz, live music, or the
            Southern California arts scene? We&apos;d love to be featured. Press materials are
            available above, and we&apos;re always happy to arrange interviews or provide additional
            information.
          </p>
          <a
            href="mailto:info@mcpheebigband.com"
            className="inline-flex items-center gap-2 text-cb-blue text-sm font-semibold hover:underline"
          >
            Reach out at info@mcpheebigband.com
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
