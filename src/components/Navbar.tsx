'use client'

import { useEffect, useState } from 'react'
import { navLinks } from '@/content/profile'
import { GlitchLink } from './GlitchLink'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  // Sorot tautan nav sesuai section yang sedang terlihat.
  useEffect(() => {
    function onScroll() {
      const sections = document.querySelectorAll<HTMLElement>('section[id]')
      let current = ''
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 100) current = section.id
      })
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Kunci scroll body selagi menu mobile terbuka.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Tutup menu dengan Escape.
  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          <a href="#hero" className="navbar-brand">
            <div className="wordmark">
              <span className="wordmark-first">HASH</span>
              <span className="wordmark-last">CODE</span>
            </div>
          </a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <GlitchLink
                  href={link.href}
                  className={activeId && `#${activeId}` === link.href ? 'active' : ''}
                >
                  {link.label}
                </GlitchLink>
              </li>
            ))}
          </ul>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link) => (
          <GlitchLink
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </GlitchLink>
        ))}
      </div>
    </>
  )
}
