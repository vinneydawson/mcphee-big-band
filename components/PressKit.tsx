'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { FileText, Image, Music, Settings } from 'lucide-react'

const items = [
  { icon: FileText, label: 'Full Band Bio', cta: 'Download PDF', active: true },
  { icon: Image, label: 'Press Photos', cta: 'Download ZIP', active: true },
  { icon: Music, label: 'Repertoire List', cta: 'Download PDF', active: true },
  { icon: Settings, label: 'Technical Rider', cta: 'Available upon request', active: false },
]

export default function PressKit() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const rows = containerRef.current!.querySelectorAll('.press-row')

      gsap.fromTo(
        rows,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative grain-light">
      <div ref={containerRef} className="max-w-4xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          FOR MEDIA &amp; VENUES
        </p>
        <h2 className="text-white text-4xl font-bold mb-4">Press Kit.</h2>
        <p className="text-text-muted text-lg mb-10">
          For booking inquiries, media requests, and technical information, everything
          you need is here.
        </p>

        <div className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="press-row bg-surface border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-text-muted w-5 h-5" />
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
                <span
                  className={
                    item.active
                      ? 'text-cb-blue text-sm font-semibold cursor-pointer hover:underline'
                      : 'text-text-muted text-sm'
                  }
                >
                  {item.cta}
                </span>
              </div>
            )
          })}
        </div>

        <p className="text-text-muted text-sm mt-8 text-center">
          For booking and press:{' '}
          <a
            href="mailto:info@mcpheebigband.com"
            className="text-cb-blue hover:underline"
          >
            info@mcpheebigband.com
          </a>
        </p>
      </div>
    </div>
  )
}
