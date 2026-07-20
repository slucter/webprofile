# Decisions — ADR Ringkas

Format:

```
# <judul keputusan> — <YYYY-MM-DD>

**Konteks:** <situasi & masalah yang memaksa keputusan>

**Keputusan:** <apa yang diputuskan, tegas>

**Konsekuensi:** <dampak positif & negatif, apa yang jadi lebih sulit>
```

---

# Adopsi agentic harness — 2026-07-20

**Konteks:** Project butuh alur kerja multi-agent yang konsisten lintas-sesi dan lintas-tool, tanpa bergantung pada fitur eksklusif satu IDE.

**Keputusan:** Pakai harness berbasis file Markdown di `.harness/`, dengan `AGENTS.md` sebagai entry point tunggal dan `.harness/context/` sebagai memori persisten.

**Konsekuensi:** Konteks bertahan antar-sesi dan portabel antar-tool. Biayanya: agent wajib membaca beberapa file di awal tiap giliran, dan file konteks harus disiplin diperbarui — kalau tidak, harness jadi menyesatkan.

---

_(keputusan berikutnya ditambahkan di bawah, terbaru di bawah)_

---

# Next.js 15 + TypeScript, CSS vanilla (bukan Tailwind) — 2026-07-20

**Konteks:** Perlu stack yang mulus di Vercel. Desain acuan sudah berupa ~1200
baris CSS vanilla dengan estetika yang sangat spesifik.

**Keputusan:** Next.js App Router + TypeScript, styling tetap CSS vanilla di satu
global stylesheet. Tailwind tidak dipakai.

**Konsekuensi:** Tidak ada terjemahan lossy dari CSS ke utility, dan saat desain
dirombak total, cukup satu file yang ditulis ulang. Biayanya: tidak ada
pembatasan lingkup gaya otomatis — penamaan class harus disiplin.

---

# Konten dipusatkan di satu file data — 2026-07-20

**Konteks:** Konten CV tersebar di banyak section, dan pemilik akan sering
memperbaruinya sendiri.

**Keputusan:** `src/content/profile.ts` jadi sumber tunggal bertipe. Komponen
tidak boleh menyimpan teks konten.

**Konsekuensi:** Pemilik bisa memperbarui situs tanpa menyentuh JSX, dan
perombakan UI besar tidak menyentuh konten sama sekali — terbukti saat pivot
desain: seluruh UI berubah, `profile.ts` nyaris tidak tersentuh.

---

# Palet dipangkas jadi tepat dua warna — 2026-07-20

**Konteks:** Pemilik memberi referensi visual minimal dan meminta "dua warna
seperti referensi", menggantikan tema teal/cream/tan sebelumnya.

**Keputusan:** Hanya `--bg #0D0D0D` dan `--fg #F2F0ED`. Semua nada lain adalah
turunan opasitas `--fg`. Serif (Playfair) dibuang; tinggal Inter + JetBrains Mono.
Section dijadikan bergaya tabel dengan garis rambut.

**Konsekuensi:** Tampilan jauh lebih tenang dan konsisten, dan mustahil "keluar
palet" secara tidak sengaja. Biayanya: hierarki visual sepenuhnya bergantung pada
opasitas, ukuran, dan spasi — kontras teks redup harus dijaga agar tetap terbaca.

---

# Tag project memakai domain, bukan teknologi — 2026-07-20

**Konteks:** Section Projects diturunkan dari pengalaman kerja di CV, tetapi CV
tidak menyebut tech stack satu pun project.

**Keputusan:** Isi tag dengan domain/fitur yang benar-benar terdukung isi CV
(mis. "PWA", "Realtime Chat"), bukan teknologi hasil tebakan. Tautan project
dibuat nullable dan disembunyikan bila kosong.

**Konsekuensi:** Portfolio tidak memuat klaim teknis yang tidak bisa
dipertanggungjawabkan saat wawancara. Biayanya: tag terasa kurang spesifik sampai
pemilik mengisinya sendiri (T-10).

---

# Tingkat opasitas teks ditetapkan dari rasio kontras — 2026-07-20

**Konteks:** Setelah palet dipangkas jadi dua warna, seluruh hierarki visual
bergantung pada opasitas. Nilai awal dipilih berdasarkan selera dan ternyata
terlalu redup: pemilik mengeluh sulit dibaca. Pengukuran membenarkan keluhan itu
— `--fg-muted` hanya 3.72:1 dan `--fg-faint` 1.98:1, dua-duanya gagal WCAG AA
(4.5:1 untuk teks kecil).

**Keputusan:** Setiap tingkat opasitas yang dipakai untuk teks wajib lolos 4.5:1
terhadap `--bg`. Nilai baru: dim 0.80 (11.0:1), muted 0.62 (6.9:1), faint 0.48
(4.53:1). Rasio dicatat sebagai komentar tepat di sebelah tokennya.

**Konsekuensi:** Situs tetap terasa tenang tapi benar-benar terbaca, dan angka
kontras jadi bagian kontrak desain — bukan preferensi yang bisa digeser diam-diam.
Biayanya: ruang gerak untuk membuat sesuatu "sangat redup" jadi sempit; pembedaan
harus lebih mengandalkan ukuran, spasi, dan huruf mono ketimbang sekadar
menurunkan opasitas.
