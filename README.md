# 🌌 Midnight Ribbon Gallery

> *Sebuah Digital Shrine — ruang apresiasi malam yang dreamy.*

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| 🎀 Secret Entry | Halaman pembuka "buka amplop surat" sebelum masuk gallery |
| 📷 Polaroid Grid | Layout masonry dengan kartu miring-miring a la foto instax |
| 💌 Surat Kecil | Klik foto untuk reveal hidden caption panjang (seperti buka amplop) |
| 🏷️ Mood Tag | Label lucu per foto: ✦ cantik hari ini, ✦ senyumnya, dll |
| ❤️ Love Counter | Heart per foto, tersimpan di localStorage |
| 🎵 Lofi Music | Ambient drone + vinyl noise via Web Audio API |
| 📅 Memory Date | Tanggal otomatis di bawah polaroid kayak instax asli |
| ✦ Floating Icons | Animasi icon anime melayang di background |
| ⭐ Custom Cursor | Cursor ganti-ganti icon lucu |
| ✨ Sparkle FX | Partikel bintang muncul saat hover/klik foto |
| 📱 Mobile Friendly | Responsive 1–3 kolom |

---

## 🚀 Deploy ke Vercel

### Cara 1 — Via GitHub (Recommended)

1. Upload semua file ini ke repository GitHub baru
2. Buka [vercel.com](https://vercel.com) → **New Project**
3. Import repository GitHub kamu
4. Klik **Deploy** — selesai!

### Cara 2 — Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## 📁 Struktur File

```
/
├── index.html      ← seluruh web (HTML + CSS + JS dalam 1 file)
├── vercel.json     ← konfigurasi Vercel
└── README.md
```

---

## 🔒 Cara Upload Foto (Mode Admin)

1. Klik tombol **＋** di pojok kiri bawah
2. Drag & drop foto, isi caption + mood tag + surat kecil
3. Klik **Simpan** → foto langsung muncul di gallery
4. Semua data tersimpan di **localStorage** browser

> ⚠️ localStorage bersifat per-device. Kalau mau multi-device sync, perlu backend (Supabase, Firebase, dll).

---

## 🎨 Tambahan yang Bisa Dikembangkan

- [ ] Password protection untuk entry page
- [ ] Supabase / Firebase untuk sync antar device
- [ ] Download foto sebagai "Polaroid"
- [ ] Slideshow mode
- [ ] Custom ribbon / sticker per foto

---

*Made with 💙 — Navy Blue Dreams*
