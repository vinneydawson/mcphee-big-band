'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Logo from '@/components/Logo'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shows', href: '/shows' },
  { label: 'Events', href: '/events' },
  { label: 'Videos', href: '/videos' },
  { label: 'Live', href: '/live' },
  { label: 'Repertoire', href: '/repertoire' },
  { label: 'Members', href: '/members' },
  { label: 'Press', href: '/press' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll + keyboard handling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false)
      }
      document.addEventListener('keydown', handleKey)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKey)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const trigger = ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => {
        if (self.scroll() > 80) {
          nav.style.backgroundColor = 'rgba(10,11,13,0.85)'
          nav.style.backdropFilter = 'blur(12px)'
          nav.style.borderBottom = '1px solid rgba(255,255,255,0.08)'
        } else {
          nav.style.backgroundColor = 'transparent'
          nav.style.backdropFilter = 'none'
          nav.style.borderBottom = '1px solid transparent'
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-colors"
        style={{ backgroundColor: 'transparent', borderBottom: '1px solid transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left — Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Center — Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:text-white transition-colors text-sm ${
                  pathname === link.href ? 'text-white font-semibold' : 'text-text-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-cb-blue text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Book the Band
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-16 right-0 bottom-0 w-72 bg-bg-primary border-l border-white/10 overflow-y-auto">
            <div className="p-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-base transition-colors ${
                    pathname === link.href
                      ? 'text-white font-semibold bg-white/5'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="block w-full bg-cb-blue text-white rounded-xl px-4 py-3 text-center font-semibold hover:bg-blue-600 transition-colors"
                >
                  Book the Band
                </Link>
              </div>

              <div className="pt-4">
                <p className="text-text-muted text-xs px-4">
                  info@mcpheebigband.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
