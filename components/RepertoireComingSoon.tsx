'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { Music, Bell, Send, ArrowLeft } from 'lucide-react'

export default function RepertoireComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
  }, [])

  // Animate form in when toggled
  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [showForm])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // TODO: Wire to email service
    console.log('Setlist request:', { name, email })
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all text-sm'

  return (
    <div className="py-24 bg-bg-primary relative grain-light">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div
          ref={containerRef}
          className="bg-surface border border-white/10 border-dashed rounded-2xl p-12 text-center opacity-0"
        >
          {!showForm && !submitted && (
            <>
              <div className="w-16 h-16 rounded-full bg-cb-blue/10 flex items-center justify-center mx-auto mb-6">
                <Music className="w-7 h-7 text-cb-blue" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-3">Coming Soon</h2>
              <p className="text-text-muted text-base max-w-md mx-auto mb-8">
                We&apos;re putting together a full browsable repertoire list featuring original
                arrangements by Miles McPhee and classic charts from Sammy Nestico, Bill Holman,
                the Airmen of Note, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/videos"
                  className="inline-flex items-center justify-center gap-2 bg-cb-blue text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  <Music className="w-4 h-4" />
                  Watch Performances
                </Link>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-6 py-3 text-sm font-semibold hover:border-white/40 transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  Request a Setlist
                </button>
              </div>
            </>
          )}

          {showForm && !submitted && (
            <div ref={formRef} className="opacity-0">
              <button
                onClick={() => setShowForm(false)}
                className="inline-flex items-center gap-1 text-text-muted text-sm hover:text-white transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="w-14 h-14 rounded-full bg-cb-blue/10 flex items-center justify-center mx-auto mb-5">
                <Bell className="w-6 h-6 text-cb-blue" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Request a Setlist</h3>
              <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
                Share your email and we&apos;ll send over our current repertoire list.
              </p>

              <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3 text-left">
                <div>
                  <label className="text-text-muted text-xs mb-1 block">Name (optional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-text-muted text-xs mb-1 block">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="you@email.com"
                    className={`${inputClass} ${error ? 'border-red-500/60' : ''}`}
                  />
                  {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-cb-blue text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </form>
            </div>
          )}

          {submitted && (
            <div>
              <div className="w-14 h-14 rounded-full bg-cb-blue/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-cb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Request Sent!</h3>
              <p className="text-text-muted text-sm mb-6">
                We&apos;ll send the setlist to your inbox shortly.
              </p>
              <button
                onClick={() => {
                  setShowForm(false)
                  setSubmitted(false)
                  setEmail('')
                  setName('')
                }}
                className="text-cb-blue text-sm font-semibold hover:underline cursor-pointer"
              >
                Back to repertoire
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
