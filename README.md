# KapalKu — Sistem Reservasi Tiket Kapal

Project Capstone — Vue.js + Express.js + MySQL (Prisma)

## Tech Stack

- Frontend: Vue 3, Vite, Pinia, Vue Router, Tailwind CSS
- Backend: Express.js, Prisma ORM
- Database: MySQL

## Struktur Folder

```
KapalKu/
├── client/      # Vue.js frontend
├── server/      # Express.js backend
└── docs/        # Dokumentasi tambahan
```

## CARA SETUP CODE (Untuk Anggota Tim)

### 1. Clone & Masuk Folder

```bash
git clone https://github.com/MuhammadAidil24/KapalKu.git
cd KapalKu
git checkout develop
git pull origin develop
```

### 2. Setup Backend

```bash
cd server
npm install
```

Buat file `.env` (copy dari `.env.example`), isi sesuai database lokal kamu:

```
DATABASE_URL="mysql://root:@localhost:3306/Kapalku"
```

Buat database bernama **`Kapalku`** di MySQL lokal kamu (lewat HeidiSQL/phpMyAdmin/dll), lalu jalankan:

```bash
npx prisma migrate dev
npx prisma db seed
```

Jalankan server:

```bash
npm run dev
```

Backend aktif di `http://localhost:3000`

### 3. Setup Frontend

Buka terminal baru:

```bash
cd client
npm install
npm run dev
```

Frontend aktif di `http://localhost:5173`

## Alur Kerja Git (WAJIB DIIKUTI)

1. **Jangan pernah push langsung ke `main` atau `develop`** — akan otomatis ditolak GitHub.
2. Selalu mulai dari `develop` terbaru:

```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nama-fitur-kamu
```

3. Kerja di branch itu, commit seperlunya:

```bash
   git add .
   git commit -m "feat: deskripsi singkat"
   git push origin feature/nama-fitur-kamu
```

4. Buka Pull Request di GitHub: `feature/nama-fitur-kamu` → `develop`
5. Minta review ke anggota lain sebelum merge (kalau project lead belum sempat, kabari di grup)
6. Setelah merge, hapus branch fitur tersebut

## Pembagian Modul

| Orang    | Modul                                     |
| -------- | ----------------------------------------- |
| Person 1 | Auth, Jadwal Kapal                        |
| Person 2 | Booking Penumpang, Booking Barang, Refund |
| Person 3 | Payment Online & Offline                  |
| Person 4 | QR Code, Validasi Check-in                |
| Person 5 | Frontend Dashboard Admin, Chatbot(+AN)    |

## Catatan Database

Semua anggota wajib pakai nama database yang sama: **`Kapalku`** (perhatikan huruf besar/kecil).
