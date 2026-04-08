interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  withBackground?: boolean
  className?: string
}

const sizes = {
  sm: { container: 'w-10 h-10', svg: 24 },
  md: { container: 'w-12 h-12', svg: 30 },
  lg: { container: 'w-16 h-16', svg: 40 },
}

function LogoMark({ size = 24, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/*
        M monogram where the right stroke rises into a musical eighth note.
        Left leg | center V | right leg extends up → curves into a note flag
        with a filled oval note head at the base of the right stroke.
      */}

      {/* Left vertical stroke of M */}
      <path
        d="M10 54 L10 14 L14 14 L14 54 Z"
        fill={color}
      />

      {/* Left diagonal of M (down to center) */}
      <path
        d="M14 14 L30 38 L26 38 L10 14 Z"
        fill={color}
      />

      {/* Right diagonal of M (center back up) */}
      <path
        d="M30 38 L46 14 L50 14 L34 38 Z"
        fill={color}
      />

      {/* Right stroke — extends up into note stem */}
      <path
        d="M46 54 L46 8 L50 8 L50 54 Z"
        fill={color}
      />

      {/* Eighth note flag — curves out from top of right stem */}
      <path
        d="M50 8 C50 8 58 10 58 18 C58 24 52 24 50 22"
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Note head — filled oval at base of right stroke */}
      <ellipse
        cx="43"
        cy="54"
        rx="5.5"
        ry="4"
        transform="rotate(-20 43 54)"
        fill={color}
      />
    </svg>
  )
}

export default function Logo({ size = 'sm', withBackground = true, className = '' }: LogoProps) {
  const s = sizes[size]

  if (!withBackground) {
    return <LogoMark size={s.svg} />
  }

  return (
    <div
      className={`${s.container} bg-cb-blue rounded-lg flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <LogoMark size={s.svg} />
    </div>
  )
}

export { LogoMark }
