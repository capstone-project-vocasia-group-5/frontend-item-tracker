# Item Tracker

[![Stars](https://img.shields.io/github/stars/capstone-project-vocasia-group-5/frontend-item-tracker.svg)](https://github.com/capstone-project-vocasia-group-5/frontend-item-tracker/stargazers)
[![Forks](https://img.shields.io/github/forks/capstone-project-vocasia-group-5/frontend-item-tracker.svg)](https://github.com/capstone-project-vocasia-group-5/frontend-item-tracker/network/members)
[![Watchers](https://img.shields.io/github/watchers/capstone-project-vocasia-group-5/frontend-item-tracker.svg)](https://github.com/capstone-project-vocasia-group-5/frontend-item-tracker/watchers)
[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/capstone-project-vocasia-group-5/frontend-item-tracker/blob/main/LICENSE)
[![platform](https://img.shields.io/badge/platform-MERN-blue.svg)](https://mern.io/)

**Item Tracker** adalah aplikasi website yang dirancang untuk mempermudah pengguna dalam melaporkan barang hilang, mencari barang yang ditemukan, dan berkomunikasi dengan pihak terkait. Proyek ini merupakan bagian dari **Project Akhir MSIB Batch 7 Vocasia Full Stack Web Development**.

Star ⭐ repository ini jika Anda menyukai apa yang Anda lihat 😉.

![Item Tracker Preview](https://via.placeholder.com/800x400)

## ✨ Tentang Item Tracker

**Item Tracker** memberikan solusi cerdas untuk menemukan dan melacak barang Anda. Dengan fitur-fitur inovatif, aplikasi ini membantu pengguna melaporkan barang hilang, mencari barang yang ditemukan, dan berkomunikasi dengan mudah.

## 🏦 Fitur Utama

### 🔐 Fitur Autentikasi
Pastikan akun Anda aman dengan sistem autentikasi yang kuat.

### 📃 Fitur Laporan Barang
Laporkan barang hilang Anda dengan mudah.

### 🔍 Fitur Pencarian
Cari barang hilang menggunakan sistem pencarian yang efisien.

### 💬 Fitur Komunikasi
Hubungi penemu barang melalui fitur chat bawaan.

### 🔧 Fitur Manajemen Akun
Kelola profil dan informasi akun Anda dengan mudah.

### 🙌 Fitur Donasi
Bantu sesama dengan fitur donasi terpercaya.

### 🌐 Fitur Pengajuan Kepemilikan
Ajukan kepemilikan barang yang ditemukan dengan sistem verifikasi.

### 📊 Fitur Manajemen Laporan
Pantau laporan barang hilang Anda melalui dashboard khusus.

### 🔟 Fitur Manajemen Kategori
Kelola kategori barang hilang untuk pencarian lebih terarah.

### 🔔 Fitur Notifikasi
Dapatkan notifikasi real-time terkait laporan Anda.

## 🛠️ Tech Stack

### Backend
Berikut adalah teknologi yang digunakan di sisi backend:
- **Node.js**: Server-side runtime.
- **Express.js**: Framework untuk pengembangan backend.
- **MongoDB**: Database NoSQL untuk menyimpan data.
- **Dependencies:**
```json
{
  "bcryptjs": "^2.4.3",
  "body-parser": "^1.20.3",
  "cloudinary": "^2.5.1",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "fs-extra": "^11.2.0",
  "http-status-codes": "^2.3.0",
  "joi": "^17.13.3",
  "joi-objectid": "^4.0.2",
  "jsonwebtoken": "^9.0.2",
  "midtrans-client": "^1.4.2",
  "mongoose": "^8.8.2",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "mustache": "^4.2.0",
  "nodemailer": "^6.9.16",
  "nodemon": "^3.1.7",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1",
  "uuid": "^11.0.3"
}
```

### Frontend
Berikut adalah teknologi yang digunakan di sisi frontend:
- **React.js**: Framework untuk pengembangan frontend.
- **Tailwind CSS**: Untuk styling responsif dan modern.
- **Dependencies:**
```json
{
  "@fortawesome/fontawesome-svg-core": "^6.7.1",
  "@fortawesome/free-brands-svg-icons": "^6.7.1",
  "@fortawesome/free-solid-svg-icons": "^6.7.1",
  "@fortawesome/react-fontawesome": "^0.2.2",
  "axios": "^1.7.9",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.53.2",
  "react-router-dom": "^7.0.1",
  "react-toastify": "^10.0.6",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^3.23.8"
}
```

## Screenshots

| | | |
|:--:|:--:|:--:|
| **Halaman Login** | **Dashboard Laporan** | **Halaman Chat** |
| ![Halaman Login](images/login_screen.png) | ![Dashboard Laporan](images/dashboard_screen.png) | ![Halaman Chat](images/chat_screen.png) |
| **Halaman Donasi** | **Pencarian Barang** | **Halaman Notifikasi** |
| ![Halaman Donasi](images/donation_screen.png) | ![Pencarian Barang](images/search_screen.png) | ![Halaman Notifikasi](images/notification_screen.png) |

## 🚀 Cara Menjalankan

### Backend
1. Clone repository.
2. Masuk ke direktori backend.
3. Install dependencies: `npm install`.
4. Buat file `.env` dan tambahkan konfigurasi berikut:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5. Jalankan server: `npm start`.

### Frontend
1. Masuk ke direktori frontend.
2. Install dependencies: `npm install`.
3. Jalankan aplikasi: `npm run dev`.

## 📚 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

---

Terima kasih telah menggunakan **Item Tracker**! Jika Anda memiliki pertanyaan, silakan buat isu di repository ini atau hubungi kami melalui email.

