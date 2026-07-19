'use client'

import { useEffect, useState } from 'react'
import { ArrowUpIcon } from './Icons'

/**
 * Efek scroll global — tidak merender apa pun selain tombol back-to-top.
 *  1. Reveal bertahap tiap elemen .anim-item / .anim-label saat section terlihat.
 *  2. Tombol kembali ke atas.
 */
export function ScrollEffects() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function reveal(section: Element) {
      const items = section.querySelectorAll('.anim-item, .anim-label')
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('is-visible'), reduced ? 0 : i * 70)
      })
    }

    const sections = document.querySelectorAll('.section')

    // Tanpa IntersectionObserver: tampilkan semua, jangan sampai konten tak terlihat.
    if (!('IntersectionObserver' in window)) {
      sections.forEach(reveal)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    sections.forEach((s) => observer.observe(s))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-to-top${showTop ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={showTop ? 0 : -1}
    >
      <ArrowUpIcon size={15} />
    </button>
  )
}
