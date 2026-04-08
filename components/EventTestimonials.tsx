'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'The McPhee Big Band was the highlight of our gala. From the moment they started playing, the energy in the room completely transformed. Our guests are still talking about it.',
    name: 'Sarah Chen',
    role: 'Director of Events, Westfield Foundation',
  },
  {
    quote: 'We hired them for our wedding reception and it was the best decision we made. The band read the room perfectly: elegant during dinner, then brought the house down for dancing.',
    name: 'David & Maria Torres',
    role: 'Wedding, The Resort at Pelican Hill',
  },
  {
    quote: 'Professional, punctual, and unbelievably talented. Miles was a pleasure to work with from the first call to the last note. I cannot recommend them highly enough.',
    name: 'James Whitfield',
    role: 'VP Marketing, Meridian Capital',
  },
]

export default function EventTestimonials() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.testimonial-card')

      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, rotation: 1.5 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        }
      )
    }, gridRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative dot-grid grain-light">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          CLIENT REVIEWS
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">What People Say.</h2>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card bg-surface border border-white/10 rounded-2xl p-8"
            >
              <Quote className="w-8 h-8 text-cb-blue/30 mb-4" />
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-text-muted text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
