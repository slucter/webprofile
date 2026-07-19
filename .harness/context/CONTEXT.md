# CONTEXT — Memori Jangka Panjang Project

> Diisi & diperbarui oleh agent di akhir tiap iterasi. Simpan hanya fakta yang bernilai lintas-sesi.

## Identitas

- **Nama project:** myprofileweb — web portfolio pribadi
- **Tujuan:** Menggantikan CV statis dengan portfolio web yang di-deploy ke Vercel
- **Pemilik:** Muhamad Irhashdianto (Software Engineer, Bandung)

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Bahasa:** TypeScript (strict)
- **Styling:** CSS vanilla di `src/app/globals.css` — TIDAK memakai Tailwind
- **Font:** `next/font/google` — Inter + JetBrains Mono
- **Email form:** Resend via route handler `src/app/api/contact/route.ts`
- **Deploy target:** Vercel
- **Node:** v22

## Fakta penting

- **`src/content/profile.ts` adalah sumber tunggal seluruh konten.** Komponen tidak
  menyimpan teks apa pun. Mengubah isi situs = mengedit file ini saja.
- **Palet tepat dua warna:** `--bg #0D0D0D` dan `--fg #F2F0ED`. Semua nada lain
  (dim/muted/faint/garis/permukaan) adalah turunan opasitas `--fg`. Jangan
  memperkenalkan hue ketiga — itu melanggar arahan desain.
- Bahasa visual: minimal, section berbentuk tabel dengan garis rambut
  (`--line` / `--line-soft`), label section mono berprefiks `//`.
- `index-v2.html` di root adalah **referensi desain lama** (tema teal/cream) yang
  sudah ditinggalkan. Disimpan sebagai arsip, bukan bagian dari build.
- Section Testimoni sengaja dibuang atas permintaan pemilik.
- Teks About sengaja DIPERTAHANKAN dari desain lama — bukan summary dari CV.
- Tag `stack` pada projects berisi domain/fitur, bukan teknologi, karena CV tidak
  menyebut tech stack per project. Ini keputusan integritas, jangan diisi tebakan.
- `liveUrl`/`sourceUrl` project bernilai `null` (project internal perusahaan);
  baris tautan otomatis tidak dirender bila keduanya null.
- Hero adalah flex container — `.hero > .container` wajib `width: 100%`, kalau
  tidak teks hero tidak sejajar dengan navbar.

## Konvensi

- Komentar kode ditulis dalam Bahasa Indonesia, mengikuti gaya pemilik.
- Komponen server secara default; `'use client'` hanya bila benar-benar butuh
  interaktivitas (Navbar, Hero, Projects, Contact, ScrollEffects, GlitchLink).
- Commit message: Bahasa Indonesia, format Conventional Commits.

## Glosarium

| Istilah | Arti |
|---|---|
| SIMPATI | Web app terintegrasi POLRI untuk manajemen tahanan & barang bukti |
| SPK | Surat Perintah Kerja — modul work-order pada Digi PDAM App |
| PDAM | Perusahaan Daerah Air Minum (utilitas air daerah) |
