# Workflow: Loop Utama

Dipicu oleh perintah `start loop` atau `next`.

## Langkah

1. Baca `.harness/context/state.md` → tentukan fase & task aktif.
2. Jalankan agent sesuai fase (persona terkait di `.harness/personas/`), dengan model dari `.harness/agents.config.md`.
3. Agent tulis output ke `.harness/context/` + isi `.harness/templates/handoff.md`.
4. Orchestrator evaluasi: lolos DoD? → maju. Gagal? → balik/perbaiki sesuai aturan routing di `orchestrator.md`.
5. Update `state.md` (increment iterasi).
6. Ulangi sampai backlog kosong **ATAU** kondisi *done* tercapai **ATAU** batas iterasi (10) tercapai.
7. Di akhir tiap iterasi: ringkas hasil ke `CONTEXT.md` agar hemat konteks.

## Kondisi berhenti

| Kondisi | Aksi |
|---|---|
| *Done* terpenuhi (lihat `orchestrator.md`) | Minta konfirmasi user, lalu tulis fase `DONE` |
| `## TODO` dan `## DOING` kosong tapi ada temuan High/Critical terbuka | Kembali ke `PLAN` untuk membuat task perbaikan |
| Iterasi mencapai 10 | Hentikan, tulis fase `IDLE`, laporkan sisa pekerjaan |
| Task mundur >3 kali | Hentikan, minta keputusan manusia |
| User mengetik `stop` | Tulis fase `IDLE`, hentikan |

## Perintah `next`

Menjalankan **satu** iterasi saja (langkah 1–7 sekali jalan), lalu berhenti dan lapor. Berguna untuk mengawasi loop selangkah demi selangkah.

## Ringkasan ke CONTEXT.md

Di langkah 7, tulis hanya fakta yang bernilai lintas-sesi: keputusan yang mengikat, kendala yang ditemukan, konvensi yang disepakati. Jangan menyalin isi handoff atau log kerja mentah — itu sudah ada di `backlog.md` dan `findings.md`.
