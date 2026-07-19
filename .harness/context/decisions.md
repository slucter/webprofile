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
