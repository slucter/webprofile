import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { profile } from '@/content/profile'

export const runtime = 'nodejs'

/* ------------------------------------------------------------------
   Rate limit sederhana, in-memory.

   CATATAN: pada serverless, memori tidak dibagi antar-instance dan bisa
   direset kapan saja — ini penghambat kasar, bukan jaminan. Bila situs
   ramai atau mulai disalahgunakan, ganti dengan store bersama
   (Vercel KV / Upstash Redis).
------------------------------------------------------------------- */
const WINDOW_MS = 10 * 60 * 1000 // 10 menit
const MAX_PER_WINDOW = 5

const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)

  // Cegah Map tumbuh tanpa batas.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/** Cegah header injection: buang CR/LF dari nilai yang masuk ke header email. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ')
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.' },
      { status: 429 }
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Format permintaan tidak valid.' }, { status: 400 })
  }

  const body = payload as Record<string, unknown>

  // Honeypot terisi -> hampir pasti bot. Balas sukses agar bot tidak belajar.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const name = asString(body.name)
  const email = asString(body.email)
  const subject = asString(body.subject)
  const message = asString(body.message)

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Semua kolom wajib diisi.' }, { status: 400 })
  }
  if (name.length > 100 || subject.length > 150 || email.length > 200) {
    return NextResponse.json({ error: 'Isian terlalu panjang.' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Pesan terlalu panjang (maks 5000 karakter).' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Alamat email tidak valid.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  // Domain pengirim harus sudah diverifikasi di Resend.
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email

  if (!apiKey || !from) {
    // Jangan bocorkan detail konfigurasi ke klien; cukup catat di log server.
    console.error('[contact] RESEND_API_KEY atau CONTACT_FROM_EMAIL belum diset')
    return NextResponse.json(
      { error: 'Form belum dikonfigurasi. Sementara ini hubungi lewat email langsung.' },
      { status: 503 }
    )
  }

  try {
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to: [to],
      replyTo: sanitizeHeader(email),
      subject: sanitizeHeader(`[Portfolio] ${subject}`),
      // Kirim sebagai teks murni — tidak ada HTML, jadi tidak ada jalur injeksi HTML.
      text: [
        `Nama    : ${name}`,
        `Email   : ${email}`,
        `Subject : ${subject}`,
        '',
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Gagal mengirim pesan. Coba lagi nanti.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Gagal mengirim pesan. Coba lagi nanti.' }, { status: 500 })
  }
}
