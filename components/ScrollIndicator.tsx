'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        y: 8,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(wrapRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
    >
      <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
      <ChevronDown className="w-5 h-5 text-text-muted" />
    </div>
  )
}
