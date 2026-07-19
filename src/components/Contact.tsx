'use client'

import { useState, type FormEvent } from 'react'
import { profile } from '@/content/profile'
import { SectionHead } from './SectionHead'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from './Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return

    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          // Honeypot: diisi bot, dikosongkan manusia.
          company: data.get('company'),
        }),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        setErrorMsg(body?.error ?? 'Gagal mengirim pesan. Coba lagi.')
        setStatus('error')
        return
      }

      form.reset()
      setStatus('sent')
    } catch {
      setErrorMsg('Tidak dapat terhubung ke server. Coba lagi.')
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHead label="Contact" />

        <div className="contact-body">
          <div className="anim-item">
            <p className="contact-lead">Let&rsquo;s work together</p>
            <p className="contact-note">
              Terbuka untuk peluang full-time maupun proyek lepas. Balasan biasanya dalam 1&ndash;2
              hari kerja.
            </p>

            <div className="contact-list">
              <a className="contact-item" href={`mailto:${profile.email}`}>
                <MailIcon size={14} />
                {profile.email}
              </a>
              <a
                className="contact-item"
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PhoneIcon size={14} />
                {profile.phone}
              </a>
              <div className="contact-item">
                <MapPinIcon size={14} />
                {profile.location}
              </div>
              <a
                className="contact-item"
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={14} />
                github.com/slcuter
              </a>
              <a
                className="contact-item"
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={14} />
                linkedin.com/in/irhashdianto
              </a>
            </div>
          </div>

          <form className="anim-item" onSubmit={handleSubmit} noValidate={false}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Nama kamu"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="kamu@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={150}
                placeholder="Project inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                placeholder="Ceritakan singkat kebutuhanmu..."
              />
            </div>

            {/* Honeypot — disembunyikan dari manusia, menjebak bot. */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button className="form-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Mengirim...' : 'Kirim pesan'}
              {status !== 'sending' && <ArrowRightIcon size={15} />}
            </button>

            <p aria-live="polite">
              {status === 'sent' && (
                <span className="form-note form-note--ok">
                  <CheckCircleIcon size={14} />
                  Pesan terkirim. Terima kasih!
                </span>
              )}
              {status === 'error' && <span className="form-note form-note--err">{errorMsg}</span>}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
