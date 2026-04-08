'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'

const contactItems = [
  { icon: Mail, label: 'Email', value: 'info@mcpheebigband.com', href: 'mailto:info@mcpheebigband.com' },
  { icon: Phone, label: 'Phone', value: '(310) 555-0172', href: 'tel:+13105550172' },
  { icon: MapPin, label: 'Based In', value: 'Los Angeles & Long Beach, CA', href: null },
  { icon: Clock, label: 'Response Time', value: 'Typically within 24 hours', href: null },
]

export default function ContactInfo() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const items = gridRef.current!.querySelectorAll('.contact-item')

      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        }
      )
    }, gridRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-primary relative grain-light">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactItems.map((item) => {
            const Icon = item.icon
            const content = (
              <div className="contact-item bg-surface border border-white/10 rounded-xl p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cb-blue/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-cb-blue" />
                </div>
                <div className="min-w-0">
                  <p className="text-text-muted text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-white text-sm font-medium break-words">{item.value}</p>
                </div>
              </div>
            )

            if (item.href) {
              return (
                <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">
                  {content}
                </a>
              )
            }
            return <div key={item.label}>{content}</div>
          })}
        </div>
      </div>
    </div>
  )
}
