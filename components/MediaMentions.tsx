'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ExternalLink } from 'lucide-react'

const mentions = [
  {
    outlet: 'LA Weekly',
    headline: 'The Young Jazz Musicians Keeping Big Band Alive in Long Beach',
    excerpt: 'A new generation of players is proving that the 17-piece orchestra is anything but a relic.',
    date: 'November 2024',
  },
  {
    outlet: 'Long Beach Post',
    headline: 'Roscoe\'s Jazz Lounge Launches Monthly Big Band Residency',
    excerpt: 'The McPhee Big Band brings a packed house to Downtown Long Beach\'s newest jazz venue every second Saturday.',
    date: 'September 2024',
  },
  {
    outlet: 'DownBeat Magazine',
    headline: 'Rising Arrangers: Miles McPhee and the SoCal Jazz Renaissance',
    excerpt: 'McPhee\'s charts balance deep respect for the tradition with an unmistakable contemporary voice.',
    date: 'August 2024',
  },
  {
    outlet: 'KCRW Music Blog',
    headline: 'Five LA Bands to See This Fall',
    excerpt: 'If you haven\'t caught the McPhee Big Band at Roscoe\'s yet, you\'re missing one of the best nights out in the city.',
    date: 'October 2024',
  },
]

export default function MediaMentions() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return

    const ctx = gsap.context(() => {
      const items = listRef.current!.querySelectorAll('.mention-card')

      gsap.fromTo(
        items,
        { x: -25, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true },
        }
      )
    }, listRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative noise grain-heavy">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          IN THE PRESS
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">Media Mentions.</h2>

        <div ref={listRef} className="space-y-4">
          {mentions.map((m) => (
            <div
              key={m.headline}
              className="mention-card bg-surface border border-white/10 rounded-xl px-6 py-5 group hover:border-cb-blue/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cb-blue text-xs font-semibold">{m.outlet}</span>
                    <span className="text-text-muted text-xs">·</span>
                    <span className="text-text-muted text-xs">{m.date}</span>
                  </div>
                  <h3 className="text-white text-base font-semibold mb-1">{m.headline}</h3>
                  <p className="text-text-muted text-sm">{m.excerpt}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-cb-blue flex-shrink-0 mt-1 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
