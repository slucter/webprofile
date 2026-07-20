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

### T-13 — Rotate API key Resend
- **Deskripsi:** Kunci lama dibagikan sebagai plaintext lewat chat, jadi harus
  dianggap bocor. Buat kunci baru di dashboard Resend, cabut yang lama, lalu
  perbarui `.env.local` dan Environment Variables di Vercel.
- **Kriteria sukses:** Kunci lama dicabut; form tetap berfungsi dengan kunci baru.
- **Dependensi:** none
- **Blocker:** butuh aksi pemilik.

### T-14 — Verifikasi domain di Resend
- **Deskripsi:** Saat ini memakai `onboarding@resend.dev`, yang HANYA bisa
  mengirim ke alamat pemilik akun Resend. Setelah `irhash.my.id` diverifikasi,
  ubah `CONTACT_FROM_EMAIL` jadi `noreply@irhash.my.id`.
- **Kriteria sukses:** Form bisa mengirim ke alamat tujuan mana pun, bukan hanya
  email pemilik akun.
- **Dependensi:** T-13
- **Blocker:** butuh akses DNS pemilik.

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

### T-08 — Konfigurasi kredensial Resend
- **Cara test:** `POST /api/contact` dengan payload valid → `{"ok":true}` dan
  email benar-benar terkirim. **Terpenuhi**, diverifikasi dengan pengiriman nyata
  ke dev.irhashdianto@gmail.com. Memakai `onboarding@resend.dev` (lihat T-14).

### T-09 — Sediakan file CV PDF
- **Deskripsi:** File dari pemilik dinamai ulang dari `Muhamad Irhashdianto.pdf`
  jadi `cv-muhamad-irhashdianto.pdf` agar aman sebagai URL (tanpa spasi).
- **Cara test:** `GET /cv-muhamad-irhashdianto.pdf` → 200, `application/pdf`,
  26735 byte, 2 halaman. **Terpenuhi.** Tombol Download CV aktif kembali di hero.

### T-15 — Perbaiki username GitHub yang salah
- **Deskripsi:** HTML desain lama memakai `github.com/slcuter`; API GitHub
  mengembalikan 404. Username yang benar `slucter`.
- **Cara test:** `api.github.com/users/slucter` → 200, `slcuter` → 404.
  **Terpenuhi.** Teks tampilan kini diturunkan dari `profile.socials` lewat
  `displayUrl()` supaya tidak bisa melenceng lagi dari URL sebenarnya.

### T-12 — Remote git + push
- **Kriteria sukses:** Repo lokal terhubung ke github.com/slucter/webprofile dan
  `main` ter-push. **Terpenuhi.**
