# AGENTS.md — Entry Point

> **Sebelum melakukan tugas apa pun di repo ini, baca file ini sampai habis, lalu baca `.harness/orchestrator.md`.**

Repo ini menggunakan **agentic harness**: sebuah kerangka kerja berbasis file Markdown biasa yang mendefinisikan persona agent, state machine orkestrasi, dan memori jangka panjang. Harness ini bersifat *tool-agnostic* — tidak bergantung pada fitur eksklusif IDE atau AI tertentu. Agent apa pun (Claude Code, Cursor, Codex, Windsurf, Cline, dll) cukup membaca file-file `.md` di `.harness/` untuk tahu harus berperan sebagai siapa, membaca apa, dan menulis ke mana. Semua konteks disimpan di disk, bukan di memori sesi, sehingga pekerjaan bisa dilanjutkan lintas sesi dan lintas tool.

## Peta `.harness/`

| File | Kapan dibaca |
|---|---|
| `.harness/README.md` | Saat ingin memahami cara kerja harness secara utuh |
| `.harness/orchestrator.md` | **Selalu**, tepat setelah file ini — otak routing & state machine |
| `.harness/agents.config.md` | Sebelum menjalankan agent — sumber kebenaran pemilihan model |
| `.harness/personas/planner.md` | Saat fase `PLAN` |
| `.harness/personas/analyst.md` | Saat fase `ANALYZE` |
| `.harness/personas/coder.md` | Saat fase `CODE` |
| `.harness/personas/vapt.md` | Saat fase `VAPT` |
| `.harness/workflows/loop.md` | Saat menjalankan loop utama |
| `.harness/context/CONTEXT.md` | **Selalu** — memori jangka panjang project |
| `.harness/context/state.md` | **Selalu, paling awal** — posisi loop saat ini |
| `.harness/context/backlog.md` | Saat memilih / memperbarui task |
| `.harness/context/decisions.md` | Saat mengambil / mencatat keputusan arsitektural |
| `.harness/context/findings.md` | Saat fase `ANALYZE` dan `VAPT` |
| `.harness/templates/handoff.md` | Saat serah-terima antar-agent |

## Aturan wajib untuk semua agent

1. Baca `.harness/context/state.md` untuk tahu sedang di fase mana, agent mana yang aktif, dan task mana yang sedang dikerjakan.
2. Baca `.harness/context/CONTEXT.md` untuk memuat konteks project (tujuan, tech stack, fakta penting).
3. Ambil peran sesuai fase dari `.harness/personas/` — patuhi Role, Input, Output, Definition of Done, dan larangan yang tertulis di sana.
4. Setelah kerja selesai, **update** `state.md`, `backlog.md`, dan `decisions.md`/`findings.md` yang relevan, lalu isi handoff memakai `.harness/templates/handoff.md`.

Agent tidak boleh melompati fase, menulis kode di luar fase `CODE`, atau menyelesaikan loop tanpa memenuhi Definition of Done.

## Perintah pemicu

User dapat mengetik perintah natural berikut:

| Perintah | Arti |
|---|---|
| `start loop` | Mulai loop dari fase `PLAN` sesuai `.harness/workflows/loop.md` |
| `next` | Jalankan satu iterasi berikutnya dari fase saat ini |
| `plan <fitur>` | Masuk fase `PLAN` untuk fitur tertentu |
| `analyze` | Paksa masuk fase `ANALYZE` |
| `code` | Paksa masuk fase `CODE` untuk task aktif |
| `vapt` | Paksa masuk fase `VAPT` (audit keamanan defensif) |
| `status` | Laporkan isi `state.md` + ringkasan `backlog.md` tanpa mengubah apa pun |
| `stop` | Hentikan loop, tulis fase `IDLE` ke `state.md` |
