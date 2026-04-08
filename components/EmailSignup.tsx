'use client'

import { useState, FormEvent } from 'react'
import { Send } from 'lucide-react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error')
      return
    }

    // TODO: Wire to email service (Resend, Mailchimp, etc.)
    console.log('Email signup:', email)
    setState('success')
    setEmail('')
  }

  return (
    <div>
      <p className="text-white text-sm font-semibold mb-2">Stay in the loop</p>
      <p className="text-text-muted text-xs mb-3">Get notified about upcoming shows and events.</p>

      {state === 'success' ? (
        <p className="text-cb-blue text-sm">You&apos;re on the list!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') setState('idle')
            }}
            placeholder="you@email.com"
            className={`flex-1 bg-surface border rounded-lg px-3 py-2 text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all ${
              state === 'error' ? 'border-red-500/60' : 'border-white/10'
            }`}
          />
          <button
            type="submit"
            className="bg-cb-blue text-white rounded-lg px-3 py-2 hover:bg-blue-600 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Subscribe"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
      {state === 'error' && (
        <p className="text-red-400 text-xs mt-1">Please enter a valid email</p>
      )}
    </div>
  )
}
