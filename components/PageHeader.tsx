'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface PageHeaderProps {
  label: string
  title: string
  subtitle: string
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    const els = containerRef.current.children

    tl.fromTo(els[0], { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo(els[1], { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.25')
      .fromTo(els[2], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
  }, [])

  return (
    <div className="py-20 bg-bg-primary relative noise grain-light">
      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-cb-blue text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-0">
          {label}
        </p>
        <h1 className="text-white text-5xl lg:text-6xl font-bold mb-6 opacity-0">
          {title}
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto opacity-0">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
