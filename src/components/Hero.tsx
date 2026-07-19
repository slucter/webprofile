'use client'

import { useEffect, useState } from 'react'
import { profile, hero } from '@/content/profile'
import { DownloadIcon } from './Icons'

const TYPE_SPEED = 55

export function Hero() {
  const [typed, setTyped] = useState('')
  const [hideCursor, setHideCursor] = useState(false)
  const [shown, setShown] = useState<number>(0)

  // Stagger tiga baris heading, lalu jalankan typewriter di baris pertama.
  useEffect(() => {
    const timers = [
      setTimeout(() => setShown(1), 200),
      setTimeout(() => setShown(2), 700),
      setTimeout(() => setShown(3), 1100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (shown < 1) return

    // Hormati preferensi reduced motion: tampilkan nama langsung.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTyped(profile.name)
      setHideCursor(true)
      return
    }

    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(profile.name.slice(0, i))
      if (i >= profile.name.length) {
        clearInterval(id)
        setTimeout(() => setHideCursor(true), 2000)
      }
    }, TYPE_SPEED)

    return () => clearInterval(id)
  }, [shown])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-texture" />

      <div className="hero-est">
        <div className="hero-est-line" />
        <span className="hero-est-text">EST. {profile.since}</span>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {profile.availability}
        </div>

        <h1 className="hero-heading">
          <span className={`hero-line hero-line-1${shown >= 1 ? ' show' : ''}`}>
            {/* Nama lengkap tetap dirender untuk SEO & screen reader, walau efeknya bertahap. */}
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true">{typed}</span>
            <span
              className={`typewriter-cursor${hideCursor ? ' hide' : ''}`}
              aria-hidden="true"
            />
          </span>
          <span className={`hero-line hero-line-2${shown >= 2 ? ' show' : ''}`}>
            {profile.role}
          </span>
          <span className={`hero-line hero-line-3${shown >= 3 ? ' show' : ''}`}>
            {profile.secondaryRole}
          </span>
        </h1>

        <p className="hero-sub">{hero.tagline}</p>

        <div className="hero-cta">
          <a href="#projects" className="btn-primary">
            View Work
          </a>
          <a href="/cv-muhamad-irhashdianto.pdf" className="btn-outline" download>
            <DownloadIcon size={14} />
            Download CV
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-text">SCROLL</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
