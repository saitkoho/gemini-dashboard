# Sistem Digital SMP Hulnani

Sistem informasi administrasi sekolah berbasis web statis (HTML, CSS, JavaScript) untuk **SMP Hulnani**. Tidak memerlukan server/backend — seluruh data disimpan di browser menggunakan `localStorage`, sehingga bisa langsung dibuka dari file `index.html` atau di-hosting sebagai situs statis.

## Fitur

- **Login multi-peran**: Admin, Guru, dan Siswa (sesi disimpan di `sessionStorage`).
- **Dashboard** ringkasan data sesuai peran pengguna.
- **Data Siswa** — CRUD lengkap, pencarian, filter kelas, dan detail siswa.
- **Data Guru** — CRUD lengkap (khusus Admin).
- **Data Kelas** — kelola rombongan belajar & wali kelas (khusus Admin).
- **Nilai Akademik** — input nilai (Admin/Guru), lihat nilai (Siswa), otomatis badge lulus/tidak KKM.
- **Absensi** — input kehadiran harian per kelas (Admin/Guru), riwayat kehadiran (Siswa).
- **Pengumuman** — buat & kelola pengumuman sekolah.
- **Profil Saya** — Guru/Siswa dapat melihat data pribadi & ganti kata sandi.
- **Pengaturan** — profil sekolah, ekspor/impor data (backup JSON), reset data (khusus Admin).

## Akun Demo

| Peran  | Username | Password  |
|--------|----------|-----------|
| Admin  | admin    | admin123  |
| Guru   | guru     | guru123   |
| Siswa  | siswa    | siswa123  |

## Cara Menjalankan

Karena ini website statis, cukup buka `index.html` langsung di browser, atau jalankan server statis sederhana, misalnya:

```bash
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080` di browser.

## Struktur Proyek

```
├── index.html          # Halaman login
├── dashboard.html       # Dashboard utama
├── siswa.html           # Data siswa
├── guru.html             # Data guru
├── kelas.html            # Data kelas
├── nilai.html            # Nilai akademik
├── absensi.html          # Absensi harian
├── pengumuman.html       # Pengumuman sekolah
├── profil.html           # Profil pengguna (guru/siswa)
├── pengaturan.html       # Pengaturan sistem (admin)
└── assets/
    ├── css/style.css     # Stylesheet utama
    └── js/
        ├── db.js         # Data layer (localStorage)
        ├── auth.js       # Autentikasi & sesi
        └── app.js        # Layout shell, toast, modal, util
```

## Catatan

- Data tersimpan di `localStorage` browser (per perangkat/browser). Gunakan fitur **Ekspor/Impor Data** di halaman Pengaturan untuk mencadangkan atau memindahkan data.
- Untuk mengembalikan ke data contoh awal, gunakan tombol **Reset ke Data Awal** di halaman Pengaturan.
