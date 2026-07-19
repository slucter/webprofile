# Harness — Cara Kerja

Harness ini adalah kerangka orkestrasi multi-agent berbasis file Markdown. Tidak ada runtime, tidak ada dependensi, tidak ada fitur IDE khusus — hanya file `.md` yang dibaca dan ditulis oleh agent.

## Filosofi

1. **Tool-agnostic** — semua "kecerdasan" harness ada di file teks biasa. IDE apa pun bisa menjalankannya.
2. **Entry point tunggal** — `AGENTS.md` di root adalah satu-satunya pintu masuk. Pointer di `CLAUDE.md` dan `.cursorrules` hanya mengarahkan ke sana.
3. **Context persistence** — konteks hidup di `.harness/context/`, bukan di jendela percakapan. Sesi boleh mati; progres tidak hilang.
4. **Idempotent** — menjalankan ulang harness tidak merusak state yang sudah ada.

## Anatomi

```
.harness/
├── orchestrator.md      # state machine + routing + guardrail
├── agents.config.md     # peta agent → model (sumber kebenaran)
├── personas/            # definisi peran tiap agent
├── workflows/           # definisi loop yang dapat dijalankan
├── context/             # memori: state, backlog, keputusan, temuan
└── templates/           # template handoff antar-agent
```

## Alur singkat

`PLAN → ANALYZE → CODE → VAPT → REVIEW → (loop / done)`

Orchestrator membaca `context/state.md`, memilih persona sesuai fase, menjalankannya dengan model dari `agents.config.md`, lalu mengevaluasi Definition of Done sebelum memutuskan maju atau mundur. Setiap perpindahan agent wajib melewati handoff.

## Cara memakai

Ketik `start loop` ke agent. Kalau tech stack sudah diketahui, isi dulu `context/CONTEXT.md` supaya planner tidak menebak.

## Cara memperluas

- **Tambah agent baru** — buat `personas/<nama>.md` dengan frontmatter, daftarkan barisnya di `agents.config.md`, sisipkan fasenya di `orchestrator.md`.
- **Ganti model per-agent** — cukup edit kolom `model` di `agents.config.md`. Jangan sentuh file persona.
- **Tambah workflow** — buat `workflows/<nama>.md` dan rujuk dari `AGENTS.md`.
