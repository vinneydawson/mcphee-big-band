'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

function formatDisplay(dateStr: string) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export default function DatePicker({ value, onChange, className = '' }: DatePickerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Parse selected date
  const selectedParts = value ? value.split('-').map(Number) : null

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Determine drop direction based on available space
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const calendarHeight = 370 // approximate dropdown height
      setDropUp(spaceBelow < calendarHeight && rect.top > calendarHeight)
    }
  }, [open])

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const selectDay = (day: number) => {
    onChange(formatDate(viewYear, viewMonth, day))
    setOpen(false)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!open && value) {
            const [y, m] = value.split('-').map(Number)
            setViewYear(y)
            setViewMonth(m - 1)
          }
          setOpen(!open)
        }}
        className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent transition-all text-sm cursor-pointer"
      >
        <span className={value ? 'text-white' : 'text-text-muted'}>
          {value ? formatDisplay(value) : 'Select a date'}
        </span>
        <Calendar className="w-4 h-4 text-text-muted" />
      </button>

      {/* Dropdown calendar */}
      {open && (
        <div className={`absolute left-0 z-50 w-72 bg-surface border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-4 ${
          dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-text-muted" />
            </button>
            <span className="text-white text-sm font-semibold">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-text-muted text-xs py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dateStr = formatDate(viewYear, viewMonth, day)
              const isSelected =
                selectedParts &&
                selectedParts[0] === viewYear &&
                selectedParts[1] - 1 === viewMonth &&
                selectedParts[2] === day
              const isToday = dateStr === todayStr
              const isPast =
                new Date(viewYear, viewMonth, day) <
                new Date(today.getFullYear(), today.getMonth(), today.getDate())

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => !isPast && selectDay(day)}
                  disabled={isPast}
                  className={`
                    w-9 h-9 mx-auto rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer
                    ${isPast ? 'text-white/15 cursor-not-allowed' : 'hover:bg-white/10'}
                    ${isSelected ? 'bg-cb-blue text-white font-semibold hover:bg-cb-blue' : ''}
                    ${isToday && !isSelected ? 'text-cb-blue font-semibold ring-1 ring-cb-blue/40' : ''}
                    ${!isSelected && !isToday && !isPast ? 'text-white' : ''}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Today shortcut */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setViewYear(today.getFullYear())
                setViewMonth(today.getMonth())
              }}
              className="text-cb-blue text-xs font-semibold hover:underline cursor-pointer"
            >
              Go to today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
