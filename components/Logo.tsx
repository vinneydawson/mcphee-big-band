interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

export function NoteIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Stem */}
      <rect x="34" y="8" width="4" height="40" rx="2" fill="white" />
      {/* Flag */}
      <path
        d="M38 8 C38 8 50 10 50 20 C50 28 40 28 38 24"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Note head */}
      <ellipse
        cx="28"
        cy="48"
        rx="10"
        ry="7"
        transform="rotate(-20 28 48)"
        fill="white"
      />
    </svg>
  )
}

export default function Logo({ size = 'sm', className = '' }: LogoProps) {
  return (
    <span
      className={`font-[var(--font-playfair)] font-black tracking-tight text-white ${sizes[size]} ${className}`}
      style={{ fontFamily: 'var(--font-playfair)' }}
    >
      McPhee Big Band
    </span>
  )
}
