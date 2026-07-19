'use client'

import { useRef, useState, useEffect } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!%&+/\\{}<>@#$^*~'
const DURATION = 800
const INTERVAL = 40

/**
 * Tautan dengan efek scramble teks saat hover — dipertahankan dari desain asli.
 * Teks asli selalu ada di DOM sejak render pertama, jadi aman untuk SSR,
 * screen reader, dan crawler; scramble hanya efek visual sementara.
 */
export function GlitchLink({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string
  children: string
  className?: string
  onClick?: () => void
}) {
  const [display, setDisplay] = useState(children)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const running = useRef(false)

  // Bersihkan interval bila komponen unmount di tengah animasi.
  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  // Teks bisa berubah dari luar; jaga agar tampilan tetap sinkron saat idle.
  useEffect(() => {
    if (!running.current) setDisplay(children)
  }, [children])

  function scramble() {
    if (running.current) return
    running.current = true

    const original = children
    const totalSteps = DURATION / INTERVAL
    let step = 0

    timer.current = setInterval(() => {
      step++
      const progress = step / totalSteps
      let result = ''

      for (let i = 0; i < original.length; i++) {
        if (original[i] === ' ') {
          result += ' '
        } else if (progress > (i / original.length) * 0.8 + 0.2) {
          result += original[i]
        } else {
          result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
      }
      setDisplay(result)

      if (step >= totalSteps) {
        if (timer.current) clearInterval(timer.current)
        setDisplay(original)
        running.current = false
      }
    }, INTERVAL)
  }

  return (
    <a
      href={href}
      className={`glitch-link ${className}`.trim()}
      onMouseEnter={scramble}
      onClick={onClick}
    >
      {display}
    </a>
  )
}
