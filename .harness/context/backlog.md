# Backlog

Format tiap task:

```
### T-<id> — <judul>
- **Deskripsi:** <apa yang dikerjakan>
- **Kriteria sukses:** <cara memverifikasi, harus objektif>
- **Dependensi:** <T-xx / none>
- **Cara test:** <diisi coder>
```

## TODO

### T-08 — Konfigurasi kredensial Resend
- **Deskripsi:** Daftar di resend.com, verifikasi domain `irhash.my.id`, isi
  `RESEND_API_KEY` dan `CONTACT_FROM_EMAIL` di Vercel Environment Variables.
- **Kriteria sukses:** Kirim form dari situs produksi → email masuk ke
  dev.irhashdianto@gmail.com. Tanpa ini API balas 503 dengan pesan ramah.
- **Dependensi:** none
- **Blocker:** butuh aksi pemilik (akun Resend + akses DNS).

### T-09 — Sediakan file CV PDF
- **Deskripsi:** Taruh PDF di `public/cv-muhamad-irhashdianto.pdf` lalu
  aktifkan kembali tombol Download CV di hero.
- **Kriteria sukses:** Tombol mengunduh PDF yang benar, bukan 404.
- **Dependensi:** none
- **Blocker:** butuh file dari pemilik.

### T-10 — Verifikasi isi Projects
- **Deskripsi:** Tag `stack` project saat ini berisi domain/fitur, bukan
  teknologi, karena CV tidak menyebutkannya. Pemilik perlu mengganti dengan
  teknologi asli, dan mengisi `liveUrl`/`sourceUrl` bila ada yang publik.
- **Kriteria sukses:** Tiap project mencerminkan teknologi yang benar-benar dipakai.
- **Dependensi:** none
- **Blocker:** hanya pemilik yang tahu faktanya.

### T-11 — Gambar Open Graph
- **Deskripsi:** Buat `public/og-image.png` (1200x630). Metadata sudah menunjuk
  ke sana tapi filenya belum ada.
- **Kriteria sukses:** Pratinjau tautan di WhatsApp/LinkedIn menampilkan gambar.
- **Dependensi:** none

### T-12 — Remote git + deploy Vercel
- **Deskripsi:** Tambah remote, push, hubungkan ke Vercel.
- **Kriteria sukses:** Situs live di domain produksi.
- **Dependensi:** T-08 (agar form tidak error di produksi)
- **Blocker:** menunggu URL remote dari pemilik.

## DOING

_(kosong)_

## DONE

### T-01 — Inisialisasi git + baseline
- **Kriteria sukses:** Repo lokal di branch `main`, `.gitignore` mengabaikan
  `node_modules`, `.next`, dan semua file `.env`. **Terpenuhi.**

### T-02 — Scaffold Next.js 15 + TypeScript
- **Cara test:** `npm run build` dan `npx tsc --noEmit`. **Keduanya lolos.**

### T-03 — Port konten CV ke data terpusat
- **Kriteria sukses:** Seluruh experience, skill+level, education, certificate,
  dan language dari CV muncul di situs, sumbernya satu file. **Terpenuhi**
  (`src/content/profile.ts`).

### T-04 — Buang section Testimoni
- **Kriteria sukses:** Nol referensi `testimonial` di markup maupun CSS. **Terpenuhi.**

### T-05 — Rombak UI ke minimal dua warna
- **Kriteria sukses:** Hanya `--bg` dan `--fg` sebagai warna dasar; hero mengikuti
  referensi; navbar & container dipertahankan; section bergaya tabel bergaris
  rambut. **Terpenuhi**, diverifikasi lewat screenshot.

### T-06 — API route form kontak
- **Cara test:** `POST /api/contact` tanpa env → 503 pesan ramah; payload tidak
  valid → 400; >5 kirim dalam 10 menit → 429. **Terpenuhi.**

### T-07 — Perbaiki alignment hero
- **Deskripsi:** `.container` di dalam `.hero` menyusut karena jadi flex item,
  membuat teks hero tidak sejajar navbar.
- **Cara test:** Screenshot 1440px — teks hero dan brand navbar sama-sama mulai
  di x=212. **Terpenuhi.**
