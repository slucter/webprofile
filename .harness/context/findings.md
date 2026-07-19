# Findings

Severity: `Low` | `Medium` | `High` | `Critical`
Status: `Terbuka` | `Sedang diperbaiki` | `Selesai` | `Diterima (won't fix)`

Format tiap temuan:

```
### F-<id> — <judul>
- **Lokasi:** <path/file:baris>
- **Severity:** <Low/Medium/High/Critical>
- **Dampak:** <skenario kegagalan konkret>
- **Rekomendasi:** <perbaikan>
- **Status:** <Terbuka/...>
```

## Analisis

### F-01 — Konten desain acuan seluruhnya fiktif
- **Lokasi:** `index-v2.html`
- **Dampak:** Nama, perusahaan, dan testimoni pada acuan (Ardan Reyes, Nexara,
  CyberVault, SecurePath) adalah placeholder. Bila ikut ter-port, situs
  menampilkan riwayat kerja palsu.
- **Rekomendasi:** Ganti total dengan data CV asli.
- **Status:** Selesai — seluruh konten kini berasal dari `src/content/profile.ts`.

### F-02 — CV tidak memuat tech stack per project
- **Lokasi:** `src/content/profile.ts` (`projects`)
- **Dampak:** Mengisi stack dengan tebakan berarti memalsukan klaim teknis di
  portfolio profesional — risiko integritas saat ditanya pewawancara.
- **Rekomendasi:** Pakai tag domain/fitur yang terdukung isi CV; minta pemilik
  mengisi teknologi asli.
- **Status:** Terbuka — lihat T-10. Sementara memakai tag domain yang jujur.

### F-03 — Tautan project mengarah ke `#`
- **Lokasi:** desain acuan
- **Dampak:** Tautan mati merusak kepercayaan; project internal perusahaan
  memang tidak punya URL publik.
- **Rekomendasi:** Jadikan tautan opsional dan sembunyikan bila tidak ada.
- **Status:** Selesai — `liveUrl`/`sourceUrl` bertipe nullable, baris tautan
  hanya dirender bila ada isinya.

## VAPT

### F-04 — Endpoint form tanpa proteksi penyalahgunaan
- **Lokasi:** `src/app/api/contact/route.ts`
- **Severity:** Medium
- **Dampak:** Endpoint publik yang mengirim email bisa dipakai membanjiri inbox
  pemilik atau menghabiskan kuota Resend.
- **Rekomendasi:** Rate limit per IP, honeypot, dan batas panjang input.
- **Status:** Selesai — 5 permintaan / 10 menit per IP, honeypot `company`,
  batas panjang di server (bukan hanya di klien).

### F-05 — Rate limit in-memory tidak dibagi antar-instance
- **Lokasi:** `src/app/api/contact/route.ts`
- **Severity:** Low
- **Dampak:** Di serverless tiap instance punya Map sendiri dan bisa direset,
  sehingga penyerang gigih bisa melewati batas dengan memicu instance baru.
- **Rekomendasi:** Pindah ke store bersama (Vercel KV / Upstash Redis) bila
  situs mulai ramai atau terlihat disalahgunakan.
- **Status:** Diterima (won't fix) — memadai untuk situs portfolio; sudah
  didokumentasikan di komentar kode.

### F-06 — Risiko header injection lewat input form
- **Lokasi:** `src/app/api/contact/route.ts`
- **Severity:** Medium
- **Dampak:** CR/LF pada `email` atau `subject` yang masuk ke header email bisa
  menyisipkan header tambahan (mis. Bcc) — jalur klasik email injection.
- **Rekomendasi:** Buang CR/LF dari semua nilai yang masuk ke header.
- **Status:** Selesai — `sanitizeHeader()` diterapkan pada `replyTo` dan `subject`.

### F-07 — Risiko injeksi HTML pada badan email
- **Lokasi:** `src/app/api/contact/route.ts`
- **Severity:** Low
- **Dampak:** Bila badan email dirender sebagai HTML, masukan penyerang bisa
  menyisipkan markup/tautan menyesatkan di inbox pemilik.
- **Rekomendasi:** Kirim sebagai teks murni.
- **Status:** Selesai — memakai field `text`, tidak ada `html` sama sekali.

### F-08 — Header keamanan belum diset
- **Lokasi:** `next.config.mjs`
- **Severity:** Low
- **Dampak:** Tanpa `X-Frame-Options` situs bisa di-iframe untuk clickjacking;
  tanpa `nosniff` browser bisa menebak tipe konten.
- **Rekomendasi:** Set header keamanan dasar di level framework.
- **Status:** Selesai — `nosniff`, `DENY`, `Referrer-Policy`,
  `Permissions-Policy`, dan HSTS.

### F-09 — Pesan galat berpotensi membocorkan konfigurasi
- **Lokasi:** `src/app/api/contact/route.ts`
- **Severity:** Low
- **Dampak:** Membalas "RESEND_API_KEY belum diset" ke klien memberi tahu
  penyerang detail internal.
- **Rekomendasi:** Detail ke log server, pesan umum ke klien.
- **Status:** Selesai.

### F-10 — Secret berpotensi ter-commit
- **Lokasi:** `.gitignore`, `.env.example`
- **Severity:** High (bila terjadi)
- **Dampak:** API key Resend yang ter-push ke repo publik bisa langsung dipakai
  pihak lain.
- **Rekomendasi:** Abaikan semua varian `.env`, sediakan `.env.example` kosong.
- **Status:** Selesai — `.env`, `.env*.local`, `.env.production` diabaikan; belum
  pernah ada nilai rahasia yang masuk ke riwayat git.
