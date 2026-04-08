'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How far in advance should we book?',
    a: 'We recommend booking at least 6–8 weeks in advance for standard events, and 3–4 months for weddings or large-scale productions. Popular dates fill quickly, especially during wedding season (May–October).',
  },
  {
    q: 'What is the band\'s travel radius?',
    a: 'We\'re based in Los Angeles and regularly perform across Southern California, from Santa Barbara to San Diego. For events outside this range, travel and accommodation can be arranged for an additional fee.',
  },
  {
    q: 'How long does a typical performance last?',
    a: 'A standard booking includes two 45-minute sets with a 15-minute intermission, totaling about two hours of live music. Extended performances of 3–4 hours are available with our Full Big Band and Premium packages.',
  },
  {
    q: 'Can we request specific songs?',
    a: 'Absolutely. We have an extensive repertoire spanning classic swing, jazz standards, and original arrangements. Miles will work with you to build a setlist that fits the tone and flow of your event.',
  },
  {
    q: 'Do you provide your own sound equipment?',
    a: 'Our Full Big Band and Premium packages include a professional sound engineer and PA system suitable for most venues. For larger events (200+ guests or outdoor spaces), we can coordinate with your venue\'s AV team.',
  },
  {
    q: 'What does pricing look like?',
    a: 'Every event is unique, so we provide custom quotes based on your specific needs: ensemble size, duration, travel, and any special requests. Reach out through our contact form for a detailed estimate.',
  },
]

export default function EventFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return

    const ctx = gsap.context(() => {
      const items = listRef.current!.querySelectorAll('.faq-item')

      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true },
        }
      )
    }, listRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <div className="py-24 bg-bg-secondary relative noise grain-heavy">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          COMMON QUESTIONS
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">FAQ.</h2>

        <div ref={listRef} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="faq-item bg-surface border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 cursor-pointer"
              >
                <span className="text-white text-sm font-medium text-left">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-text-muted flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
