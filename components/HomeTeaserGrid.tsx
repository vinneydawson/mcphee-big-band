'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Users, Music, PartyPopper, UserCircle, FileText, Mail, ArrowRight } from 'lucide-react'

const teasers = [
  {
    href: '/about',
    icon: Users,
    title: 'About the Band',
    description: 'A collective of Southern California\'s finest young jazz musicians keeping big band alive.',
  },
  {
    href: '/shows',
    icon: Music,
    title: 'Upcoming Shows',
    description: 'Catch us every second Saturday at Roscoe\'s Jazz Lounge in Downtown Long Beach.',
  },
  {
    href: '/events',
    icon: PartyPopper,
    title: 'Private Events',
    description: 'From black-tie galas to wedding receptions, bring the full big band sound to your event.',
  },
  {
    href: '/members',
    icon: UserCircle,
    title: 'The Musicians',
    description: 'Meet the 17-piece ensemble and music director Miles McPhee.',
  },
  {
    href: '/press',
    icon: FileText,
    title: 'Press Kit',
    description: 'Band bio, press photos, repertoire list, and technical rider for media and venues.',
  },
  {
    href: '/contact',
    icon: Mail,
    title: 'Get in Touch',
    description: 'Request a quote or inquire about booking for your next event.',
  },
]

export default function HomeTeaserGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.teaser-card')

      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
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
        <p className="text-cb-blue text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          EXPLORE
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">Discover More.</h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teasers.map((teaser) => {
            const Icon = teaser.icon
            return (
              <Link
                key={teaser.href}
                href={teaser.href}
                className="teaser-card group bg-surface border border-white/10 rounded-2xl p-6 hover:border-cb-blue/30 transition-colors"
              >
                <Icon className="text-cb-blue w-6 h-6 mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
                  {teaser.title}
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-cb-blue group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {teaser.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
