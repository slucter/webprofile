# Agents Config

**Sumber kebenaran pemilihan model.** Orchestrator membaca tabel ini sebelum menjalankan agent mana pun. Untuk mengganti model sebuah agent, edit kolom `model` di sini — jangan menyentuh file persona.

| agent    | model    | reasoning_effort | catatan                          |
|----------|----------|------------------|----------------------------------|
| planner  | inherit  | high             | boleh diganti mis. ke model kuat |
| analyst  | inherit  | medium           |                                  |
| coder    | inherit  | medium           |                                  |
| vapt     | inherit  | high             | butuh ketelitian keamanan        |

## Aturan

- `inherit` berarti pakai model default sesi/IDE yang sedang berjalan.
- Jika kolom `model` diisi nama model spesifik, orchestrator/agent runner memakai model itu untuk agent tersebut.
- Frontmatter di file persona hanya mendeklarasikan default dan **tidak menimpa** tabel ini.
- Bila sebuah agent tidak punya baris di tabel ini, barulah frontmatter personanya dipakai.
- `reasoning_effort` bersifat anjuran; abaikan bila tool yang dipakai tidak mendukungnya.
