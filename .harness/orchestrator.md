# Orchestrator

Otak harness. Dibaca **setiap kali** agent masuk ke repo ini, tepat setelah `AGENTS.md`.

## State machine

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ▼                                              │
IDLE → PLAN → ANALYZE → CODE → VAPT → REVIEW → done? ──┘ (tidak → PLAN/CODE)
                 ▲        ▲      │       │
                 │        └──────┘       │
                 └───────────────────────┘
```

Fase valid: `IDLE`, `PLAN`, `ANALYZE`, `CODE`, `VAPT`, `REVIEW`, `DONE`.

| Fase | Agent | Tanggung jawab |
|---|---|---|
| `PLAN` | planner | Pecah goal jadi task berurutan + kriteria sukses |
| `ANALYZE` | analyst | Analisis codebase/requirement, risiko, dependensi |
| `CODE` | coder | Implementasi task aktif + cara test |
| `VAPT` | vapt | Audit keamanan defensif atas kode yang baru ditulis |
| `REVIEW` | orchestrator | Evaluasi DoD, putuskan maju / mundur / selesai |

## Aturan routing

- `IDLE` → `PLAN` saat user mengetik `start loop` atau `plan <fitur>`.
- `PLAN` → `ANALYZE` setelah `backlog.md` berisi minimal satu task dengan kriteria sukses.
- `ANALYZE` → `CODE` setelah `findings.md` bagian `## Analisis` terisi untuk task aktif.
- `CODE` → `VAPT` setelah implementasi task selesai dan cara test tertulis.
- `VAPT` → `REVIEW` setelah audit selesai dan temuan tercatat.
- **Mundur:** `VAPT` menemukan severity `High`/`Critical` → kembali ke `CODE` dengan task perbaikan baru di `backlog.md`.
- **Mundur:** `CODE` menemukan rencana tidak layak (asumsi planner salah) → kembali ke `PLAN`, catat alasannya di `decisions.md`.
- **Mundur:** `ANALYZE` menemukan dependensi yang belum direncanakan → kembali ke `PLAN`.
- `REVIEW` → `PLAN` bila `## TODO` di `backlog.md` masih terisi.
- `REVIEW` → `DONE` bila kondisi *done* terpenuhi.

## Definisi *done*

Loop berhenti ketika **semua** berikut benar:

1. `backlog.md` bagian `## TODO` dan `## DOING` kosong.
2. Tidak ada temuan VAPT berstatus terbuka dengan severity `High` atau `Critical`.
3. Semua task di `## DONE` memenuhi kriteria sukses yang ditetapkan planner.

## Membaca & menulis `state.md`

`state.md` adalah sumber kebenaran posisi loop. Formatnya key-value sederhana. Aturan:

- **Baca dulu, selalu.** Jangan pernah berasumsi fase dari percakapan.
- **Tulis sekali di akhir giliran agent** — jangan menulis parsial di tengah kerja.
- Field `updated` selalu diisi tanggal hari ini (format `YYYY-MM-DD`).
- `iterasi` di-increment oleh orchestrator saat menutup fase `REVIEW`, bukan oleh agent lain.

## Pemilihan model

Sebelum menjalankan sebuah agent, orchestrator **wajib** membaca `agents.config.md` untuk agent tersebut:

- Jika kolom `model` bernilai `inherit` → pakai model default sesi/IDE yang sedang berjalan.
- Jika kolom `model` berisi nama model spesifik → jalankan agent itu dengan model tersebut.
- Jika baris di config kosong/tidak ada → barulah pakai default dari frontmatter persona.

`agents.config.md` adalah sumber kebenaran. Frontmatter persona hanya deklarasi default dan **tidak menimpanya**.

## Aturan handoff

Setiap agent **wajib** mengisi `.harness/templates/handoff.md` sebelum menyerahkan kendali ke agent berikutnya. Handoff yang kosong atau tidak lengkap = fase belum selesai; orchestrator menolak transisi dan meminta agent melengkapinya.

## Guardrail

- **Batas iterasi maksimum: 10.** Setelah iterasi ke-10, hentikan loop, tulis fase `IDLE`, dan laporkan ke user apa yang tersisa.
- **Batas mundur: 3 kali per task.** Bila sebuah task mundur lebih dari 3 kali, hentikan dan minta keputusan manusia.
- **Minta konfirmasi manusia sebelum:** menghapus file, mengubah dependensi/lockfile, mengubah konfigurasi deploy atau CI, menyentuh apa pun yang menyerupai kredensial, dan sebelum menandai loop `DONE`.
- **Jangan menulis kode di luar fase `CODE`.**
- **VAPT bersifat defensif saja** — audit dan perbaikan, bukan pembuatan exploit untuk menyerang pihak lain.
