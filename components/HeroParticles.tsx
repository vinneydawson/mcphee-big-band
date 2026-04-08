'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const PARTICLE_COUNT = 30

// Music symbols drawn via canvas paths
type SymbolType = 'eighth' | 'quarter' | 'sharp' | 'flat'

// Weighted distribution: mostly eighth and quarter notes, occasional sharp/flat
const SYMBOL_POOL: SymbolType[] = [
  'eighth', 'eighth', 'eighth', 'eighth', 'eighth',
  'quarter', 'quarter', 'quarter', 'quarter',
  'sharp',
  'flat',
]

function drawSymbol(
  ctx: CanvasRenderingContext2D,
  type: SymbolType,
  x: number,
  y: number,
  size: number,
  opacity: number
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.globalAlpha = opacity
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
  ctx.fillStyle = 'rgba(255, 255, 255, 1)'
  ctx.lineWidth = size * 0.12
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const s = size

  switch (type) {
    case 'eighth': {
      // Filled oval note head
      ctx.beginPath()
      ctx.ellipse(0, s * 0.35, s * 0.22, s * 0.15, -0.3, 0, Math.PI * 2)
      ctx.fill()
      // Stem
      ctx.beginPath()
      ctx.moveTo(s * 0.18, s * 0.3)
      ctx.lineTo(s * 0.18, -s * 0.4)
      ctx.stroke()
      // Flag
      ctx.beginPath()
      ctx.moveTo(s * 0.18, -s * 0.4)
      ctx.quadraticCurveTo(s * 0.45, -s * 0.2, s * 0.3, s * 0.05)
      ctx.stroke()
      break
    }
    case 'quarter': {
      // Filled oval note head
      ctx.beginPath()
      ctx.ellipse(0, s * 0.35, s * 0.22, s * 0.15, -0.3, 0, Math.PI * 2)
      ctx.fill()
      // Stem
      ctx.beginPath()
      ctx.moveTo(s * 0.18, s * 0.3)
      ctx.lineTo(s * 0.18, -s * 0.4)
      ctx.stroke()
      break
    }
    case 'sharp': {
      // Two vertical lines
      ctx.lineWidth = size * 0.1
      ctx.beginPath()
      ctx.moveTo(-s * 0.1, -s * 0.35)
      ctx.lineTo(-s * 0.1, s * 0.35)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(s * 0.1, -s * 0.35)
      ctx.lineTo(s * 0.1, s * 0.35)
      ctx.stroke()
      // Two horizontal lines (slightly angled)
      ctx.lineWidth = size * 0.14
      ctx.beginPath()
      ctx.moveTo(-s * 0.25, -s * 0.08)
      ctx.lineTo(s * 0.25, -s * 0.15)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-s * 0.25, s * 0.15)
      ctx.lineTo(s * 0.25, s * 0.08)
      ctx.stroke()
      break
    }
    case 'flat': {
      // Vertical line
      ctx.beginPath()
      ctx.moveTo(-s * 0.05, -s * 0.4)
      ctx.lineTo(-s * 0.05, s * 0.35)
      ctx.stroke()
      // Curved body
      ctx.beginPath()
      ctx.moveTo(-s * 0.05, s * 0.05)
      ctx.quadraticCurveTo(s * 0.3, -s * 0.05, s * 0.2, s * 0.2)
      ctx.quadraticCurveTo(s * 0.1, s * 0.35, -s * 0.05, s * 0.35)
      ctx.stroke()
      break
    }
  }

  ctx.restore()
}

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  symbol: SymbolType
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const initParticles = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 12 + 8,
        opacity: Math.random() * 0.12,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.15 - 0.03,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        symbol: SYMBOL_POOL[Math.floor(Math.random() * SYMBOL_POOL.length)],
      }))

      // Animate opacity pulsing per particle
      particles.forEach((p) => {
        const pulse = () => {
          gsap.to(p, {
            opacity: Math.random() * 0.15 + 0.03,
            duration: Math.random() * 4 + 3,
            ease: 'sine.inOut',
            onComplete: pulse,
          })
        }
        pulse()
      })
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        // Wrap around edges
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.translate(-p.x, -p.y)

        drawSymbol(ctx, p.symbol, p.x, p.y, p.size, p.opacity)

        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 2 }}
    />
  )
}
