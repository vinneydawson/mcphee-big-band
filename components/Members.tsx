'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const sections = [
  {
    title: 'Trumpets',
    members: [
      { name: 'Player 1', instrument: 'Lead Trumpet' },
      { name: 'Player 2', instrument: 'Trumpet' },
      { name: 'Player 3', instrument: 'Trumpet' },
      { name: 'Player 4', instrument: 'Trumpet' },
    ],
  },
  {
    title: 'Trombones',
    members: [
      { name: 'Player 5', instrument: 'Lead Trombone' },
      { name: 'Player 6', instrument: 'Trombone' },
      { name: 'Player 7', instrument: 'Trombone' },
      { name: 'Player 8', instrument: 'Bass Trombone' },
    ],
  },
  {
    title: 'Saxophones',
    members: [
      { name: 'Player 9', instrument: 'Alto Sax' },
      { name: 'Player 10', instrument: 'Alto Sax' },
      { name: 'Player 11', instrument: 'Tenor Sax' },
      { name: 'Player 12', instrument: 'Tenor Sax' },
      { name: 'Player 13', instrument: 'Baritone Sax' },
    ],
  },
  {
    title: 'Rhythm Section',
    members: [
      { name: 'Player 14', instrument: 'Piano' },
      { name: 'Player 15', instrument: 'Guitar' },
      { name: 'Player 16', instrument: 'Bass' },
      { name: 'Player 17', instrument: 'Drums' },
    ],
  },
]

export default function Members() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.member-card')

      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, gridRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative noise grain-heavy">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          THE ENSEMBLE
        </p>
        <h2 className="text-white text-4xl font-bold mb-4">The Band.</h2>
        <p className="text-text-muted text-lg mb-12">
          Southern California&apos;s finest young jazz musicians, trained at the
          region&apos;s top conservatories and performing with the skill and commitment of
          working professionals.
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white text-lg font-semibold mb-4 border-b border-white/10 pb-3">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.members.map((member) => (
                  <div
                    key={member.name}
                    className="member-card bg-surface border border-white/10 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{member.name}</p>
                      <p className="text-text-muted text-xs">{member.instrument}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
