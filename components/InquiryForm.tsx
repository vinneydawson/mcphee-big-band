'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import DatePicker from '@/components/DatePicker'
import Select from '@/components/Select'

const eventTypeOptions = [
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'wedding', label: 'Wedding / Celebration' },
  { value: 'private', label: 'Private Party' },
  { value: 'fundraiser', label: 'Fundraiser / Benefit' },
  { value: 'other', label: 'Other' },
]

const baseInputClass =
  'w-full bg-surface rounded-xl px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm'

const MIN_SUBMIT_TIME = 3

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  eventType?: string
  eventDate?: string
  message?: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string): boolean {
  if (!phone) return true // optional field
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10
}

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    venue: '',
    guestCount: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTimeRef = useRef(0)
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    loadTimeRef.current = Date.now()
  }, [])

  // Validate on every form change (after first submit attempt or field blur)
  useEffect(() => {
    const newErrors: FormErrors = {}

    if ((attemptedSubmit || touched.name) && !form.name.trim()) {
      newErrors.name = 'Please enter your name'
    }

    if (attemptedSubmit || touched.email) {
      if (!form.email.trim()) {
        newErrors.email = 'Please enter your email'
      } else if (!validateEmail(form.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if ((attemptedSubmit || touched.phone) && form.phone && !validatePhone(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)'
    }

    if ((attemptedSubmit || touched.eventType) && !form.eventType) {
      newErrors.eventType = 'Please select an event type'
    }

    if ((attemptedSubmit || touched.eventDate) && !form.eventDate) {
      newErrors.eventDate = 'Please select an event date'
    }

    if ((attemptedSubmit || touched.message) && !form.message.trim()) {
      newErrors.message = 'Please include a brief message about your event'
    } else if ((attemptedSubmit || touched.message) && form.message.trim().length < 10) {
      newErrors.message = 'Please provide a bit more detail (at least 10 characters)'
    }

    setErrors(newErrors)
  }, [form, touched, attemptedSubmit])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const inputClass = (field: keyof FormErrors) =>
    `${baseInputClass} ${
      errors[field]
        ? 'border border-red-500/60 focus:ring-red-500'
        : 'border border-white/10 focus:ring-cb-blue'
    }`

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAttemptedSubmit(true)

    // Run validation
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'Please enter your name'
    if (!form.email.trim()) newErrors.email = 'Please enter your email'
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email address'
    if (form.phone && !validatePhone(form.phone)) newErrors.phone = 'Please enter a valid phone number'
    if (!form.eventType) newErrors.eventType = 'Please select an event type'
    if (!form.eventDate) newErrors.eventDate = 'Please select an event date'
    if (!form.message.trim()) newErrors.message = 'Please include a brief message about your event'
    else if (form.message.trim().length < 10) newErrors.message = 'Please provide a bit more detail'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // Spam checks — silently succeed
    const elapsed = (Date.now() - loadTimeRef.current) / 1000
    if (honeypot || elapsed < MIN_SUBMIT_TIME) {
      setSubmitState('success')
      return
    }

    setSubmitState('submitting')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      })
      if (res.ok) {
        setSubmitState('success')
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }

  const hasErrors = Object.keys(errors).length > 0 && attemptedSubmit

  if (submitState === 'success') {
    return (
      <div id="form" className="py-24 bg-bg-secondary relative grain-heavy scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-surface border border-white/10 rounded-2xl p-12">
            <div className="w-14 h-14 rounded-full bg-cb-blue/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-cb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold mb-3">Inquiry Sent!</h2>
            <p className="text-text-muted text-base mb-6">
              Thank you for reaching out. We typically respond within 24 hours.
            </p>
            <button
              onClick={() => {
                setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', venue: '', guestCount: '', message: '' })
                setErrors({})
                setTouched({})
                setAttemptedSubmit(false)
                setSubmitState('idle')
                loadTimeRef.current = Date.now()
              }}
              className="text-cb-blue text-sm font-semibold hover:underline cursor-pointer"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="form" className="py-24 bg-bg-secondary relative grain-heavy scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-cb-blue text-xs font-semibold tracking-widest uppercase mb-4">
          GET IN TOUCH
        </p>
        <h2 className="text-white text-4xl font-bold mb-10">Request a Quote.</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <div className="absolute opacity-0 -z-10" style={{ top: '-9999px', left: '-9999px' }} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder="Your name"
                className={inputClass('name')}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p id="name-error" role="alert" className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="you@example.com"
                className={inputClass('email')}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p id="email-error" role="alert" className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                placeholder="(555) 000-0000"
                className={inputClass('phone')}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p id="phone-error" role="alert" className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
            </div>

            {/* Event Type */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">
                Event Type <span className="text-red-400">*</span>
              </label>
              <Select
                value={form.eventType}
                onChange={(val) => {
                  setForm({ ...form, eventType: val })
                  setTouched((prev) => ({ ...prev, eventType: true }))
                }}
                options={eventTypeOptions}
                placeholder="Select event type"
                className={errors.eventType ? '[&>button]:border-red-500/60' : ''}
                ariaDescribedBy={errors.eventType ? 'eventType-error' : undefined}
                ariaInvalid={!!errors.eventType}
              />
              {errors.eventType && <p id="eventType-error" role="alert" className="text-red-400 text-xs mt-1.5">{errors.eventType}</p>}
            </div>

            {/* Event Date */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">
                Event Date <span className="text-red-400">*</span>
              </label>
              <DatePicker
                value={form.eventDate}
                onChange={(val) => {
                  setForm({ ...form, eventDate: val })
                  setTouched((prev) => ({ ...prev, eventDate: true }))
                }}
                className={errors.eventDate ? '[&>button]:border-red-500/60' : ''}
                ariaDescribedBy={errors.eventDate ? 'eventDate-error' : undefined}
                ariaInvalid={!!errors.eventDate}
              />
              {errors.eventDate && <p id="eventDate-error" role="alert" className="text-red-400 text-xs mt-1.5">{errors.eventDate}</p>}
            </div>

            {/* Venue / Location */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">Venue / Location</label>
              <input
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="Venue name or city"
                className={`${baseInputClass} border border-white/10 focus:ring-cb-blue`}
              />
            </div>

            {/* Guest Count */}
            <div>
              <label className="text-text-muted text-sm mb-2 block">Estimated Guest Count</label>
              <input
                type="text"
                name="guestCount"
                value={form.guestCount}
                onChange={handleChange}
                placeholder="e.g. 150"
                className={`${baseInputClass} border border-white/10 focus:ring-cb-blue`}
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="text-text-muted text-sm mb-2 block">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                placeholder="Tell us about your event..."
                className={inputClass('message')}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p id="message-error" role="alert" className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
            </div>
          </div>

          {/* Submit error summary */}
          {hasErrors && (
            <div role="alert" className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm text-center">
                Please fill in all required fields before submitting.
              </p>
            </div>
          )}

          {submitState === 'error' && (
            <div role="alert" className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or email us directly at info@mcpheebigband.com.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitState === 'submitting'}
            className="w-full bg-cb-blue text-white rounded-full py-4 font-semibold text-base hover:bg-blue-600 transition-colors mt-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitState === 'submitting' ? 'Sending...' : 'Send Inquiry'}
          </button>
          <p className="text-text-muted text-sm text-center mt-4">
            We typically respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  )
}
