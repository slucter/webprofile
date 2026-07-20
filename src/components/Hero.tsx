'use client'

import { useEffect, useState } from 'react'
import { profile, hero } from '@/content/profile'
import { ArrowRightIcon, DownloadIcon } from './Icons'

const TYPE_SPEED = 60

export function Hero() {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  // Eyebrow diketik seperti perintah terminal, mengikuti pola `$ ...` referensi.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTyped(hero.prompt)
      setDone(true)
      return
    }

    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(hero.prompt.slice(0, i))
      if (i >= hero.prompt.length) {
        clearInterval(id)
        setTimeout(() => setDone(true), 1600)
      }
    }, TYPE_SPEED)

    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-prompt">$</span>
            {/* Teks utuh untuk screen reader; versi animasi disembunyikan darinya. */}
            <span className="sr-only">{hero.prompt}</span>
            <span aria-hidden="true">{typed}</span>
            <span className={`hero-caret${done ? ' hide' : ''}`} aria-hidden="true" />
          </p>

          <h1 className="hero-title">
            {profile.name}
            <span className="hero-role">
              {profile.role} &middot; {profile.secondaryRole}
            </span>
          </h1>

          <p className="hero-sub">
            {hero.tagline.map((seg, i) =>
              seg.code ? (
                <code key={i}>{seg.text}</code>
              ) : seg.em ? (
                <strong key={i}>{seg.text}</strong>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              Lihat karya
              <ArrowRightIcon size={15} />
            </a>
            <a href={profile.cvPath} className="btn-ghost" download>
              <DownloadIcon size={13} />
              Download CV
            </a>
          </div>

          <div className="hero-meta">
            {hero.meta.map((m) => (
              <span className="hero-meta-item" key={m.label}>
                {m.label} <b>{m.value}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
