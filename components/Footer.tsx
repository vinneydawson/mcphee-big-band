'use client'

import Logo from '@/components/Logo'
import EmailSignup from '@/components/EmailSignup'

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-white/[0.08] pt-12 pb-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {/* Left — Logo + tagline */}
        <div>
          <div className="mb-2">
            <Logo size="lg" />
          </div>
          <p className="text-text-muted text-sm mt-2">
            Southern California&apos;s finest young jazz musicians.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <a href="https://www.youtube.com/@McPheeMusic" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-text-muted hover:text-white transition-colors">
              <YouTubeIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/mcpheebigband/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-muted hover:text-white transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/mcpheebigband" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-muted hover:text-white transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Center — Quick Links */}
        <div>
          <p className="text-white text-sm font-semibold mb-3">Quick Links</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { label: 'Shows', href: '/shows' },
              { label: 'Events', href: '/events' },
              { label: 'Videos', href: '/videos' },
              { label: 'Members', href: '/members' },
              { label: 'Press', href: '/press' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-muted text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Email Signup */}
        <EmailSignup />
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.08] my-8 mx-6" />

      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 max-w-7xl mx-auto gap-2">
        <p className="text-text-muted text-sm">
          Copyright &copy; {new Date().getFullYear()} McPhee Big Band | Designed with ♡ by{' '}
          <a
            href="https://www.uxgrowthlab.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cb-blue transition-colors"
          >
            UX Growth Lab
          </a>
        </p>
        <p className="text-text-muted text-sm">
          <a
            href="mailto:info@mcpheebigband.com"
            className="hover:text-white transition-colors"
          >
            info@mcpheebigband.com
          </a>
          {' · Los Angeles, CA'}
        </p>
      </div>
    </footer>
  )
}
