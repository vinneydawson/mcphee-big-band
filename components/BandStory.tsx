'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function BandStory() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const items = containerRef.current!.querySelectorAll('.story-item')

      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
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
    <div className="pt-0 pb-24 bg-bg-secondary relative grain-heavy">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Image */}
          <div className="story-item">
            <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
              <img
                src="/images/about-stage.jpg"
                alt="McPhee Big Band on stage"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Right — Text */}
          <div>
            <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4 story-item">
              OUR STORY
            </p>
            <h2 className="text-white text-4xl font-bold mb-10 story-item">
              About the McPhee Big Band.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6 story-item">
              The McPhee Big Band was founded by arranger and music director Miles McPhee
              with a single conviction: that big band music, performed at the highest level,
              is as alive and relevant today as it has ever been.
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-6 story-item">
              Our ensemble brings together some of the most talented young jazz musicians
              in Southern California, players from the region&apos;s most respected music
              programs and award-winning ensembles. Every musician in the band was chosen
              not just for technical ability, but for the rare ability to swing.
            </p>
            <p className="text-text-muted text-lg leading-relaxed story-item">
              We perform original arrangements written by Miles McPhee alongside charts from
              the jazz canon (Sammy Nestico, Bill Holman, the Airmen of Note), treated not
              as museum pieces, but as living material that still has something to say.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
