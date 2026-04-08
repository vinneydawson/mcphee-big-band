'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react'
import { nextShow, venue } from '@/lib/shows'

export default function HomeNextShow() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
        }
      )
    })

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative noise grain-heavy">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6">
        {/* Left — Info */}
        <div ref={leftRef} className="opacity-0">
          <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
            NEXT SHOW
          </p>
          <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">
            The Monthly Residency.
          </h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Once a month, the McPhee Big Band takes the stage at Roscoe&apos;s Jazz Lounge
            in Downtown Long Beach. An intimate room. A full 17-piece orchestra.
            The way big band was meant to be heard.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-cb-blue flex-shrink-0" />
              <span className="text-white text-sm font-medium">{nextShow.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-cb-blue flex-shrink-0" />
              <span className="text-text-muted text-sm">{venue.name} · {venue.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-cb-blue flex-shrink-0" />
              <span className="text-text-muted text-sm">Doors {nextShow.doorsTime} · Show {nextShow.showTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <Ticket className="w-4 h-4 text-cb-blue flex-shrink-0" />
              <span className="text-text-muted text-sm">{nextShow.price} at the door</span>
            </div>
          </div>

          <a
            href={nextShow.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-bold rounded-xl px-8 py-4 inline-block hover:bg-gray-100 transition-colors"
          >
            Get Tickets
          </a>
        </div>

        {/* Right — Visual placeholder */}
        <div ref={rightRef} className="opacity-0">
          <div className="bg-surface border border-white/10 rounded-2xl aspect-[4/3] overflow-hidden relative">
            <Image src="/images/venue-show.jpg" alt="McPhee Big Band performing live at Roscoe's Jazz Lounge" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
