# Sistem Digital SMP Hulnani

Sistem informasi administrasi sekolah **dalam satu file HTML tunggal** (`sistem-digital-smp-hulnani.html`). Tidak memerlukan server, build tools, maupun instalasi apa pun — cukup buka filenya langsung di browser. Seluruh HTML, CSS, dan JavaScript sudah digabung menjadi satu file, dan data disimpan di `localStorage` browser.

## Cara Menjalankan

Cukup buka file `sistem-digital-smp-hulnani.html` langsung dengan browser (double click, atau `File > Open`). Bisa juga di-hosting sebagai file statis di mana saja (GitHub Pages, Netlify, dsb) karena tidak ada dependensi eksternal.

## Akun Demo

| Peran  | Username | Password  |
|--------|----------|-----------|
| Admin  | admin    | admin123  |
| Guru   | guru     | guru123   |
| Siswa  | siswa    | siswa123  |
| Tenaga Pendidik | tendik | tendik123 |
| Kepala Sekolah | kepsek | kepsek123 |

## Fitur

- **Login multi-peran**: Admin, Guru, Tenaga Pendidik, Kepala Sekolah, dan Siswa (sesi disimpan di `sessionStorage`).
- **Dashboard** ringkasan data sesuai peran pengguna.
- **Menu "Administrator"** (khusus Admin) — menu induk collapsible di sidebar yang mengelompokkan submenu manajemen data:
  - **Data Siswa** — CRUD lengkap, pencarian, filter kelas, dan detail siswa.
  - **Data Guru** — CRUD lengkap.
  - **Tenaga Pendidik** — CRUD data tenaga kependidikan non-guru (TU, Pustakawan, Laboran, Satpam, Petugas Kebersihan, dll).
  - **Data Kelas** — kelola rombongan belajar & wali kelas.
  - **Pengumuman** — buat & kelola pengumuman sekolah.
  - **Pengaturan** — profil sekolah, ekspor/impor data (backup JSON), reset data.
- **Nilai Akademik** — input nilai (Admin/Guru), lihat nilai (Siswa), otomatis badge lulus/tidak KKM.
- **Absensi** — input kehadiran harian per kelas (Admin/Guru), riwayat kehadiran (Siswa).
- **Menu "Guru Mata Pelajaran"** (Admin dan Guru) — menu induk collapsible untuk kebutuhan pembelajaran per mapel:
  - **Jurnal Mengajar** — catat tanggal, kelas, mata pelajaran, jam ke, materi yang diajarkan, serta catatan pembelajaran.
  - **Absensi Siswa** — catat kehadiran siswa per kelas, tanggal, guru, dan mata pelajaran.
  - **Input Nilai** — input nilai per siswa, lengkap dengan jenis penilaian dan indikator KKM.
  - Admin dapat mengakses seluruh data; Guru hanya mengelola jurnal, absensi, dan nilai miliknya sendiri pada mapel yang diampu.
- **Wali Kelas** (Admin/Guru) — Ringkasan Kelas, Siswa Binaan, Absensi & Rekap, serta Catatan Wali Kelas. Guru hanya melihat kelas yang diwalikan; Admin dapat memantau seluruh kelas.
- **Perpustakaan** (Admin/Guru) — Koleksi Buku (CRUD), Peminjaman & Pengembalian, Anggota dari data Siswa/Guru, serta laporan sirkulasi. Guru bertugas sebagai petugas perpustakaan.
- **TU & Persuratan Digital** (Admin/Tenaga Pendidik) — Surat Masuk, Surat Keluar, Disposisi & Arsip Digital, serta laporan persuratan. Tenaga Pendidik bertugas mengelola operasional persuratan.
- **Sarana & Prasarana** (Admin/Tenaga Pendidik) — Inventaris Barang, Peminjaman Aset, Kondisi & Pemeliharaan, serta laporan Sarpras. Tenaga Pendidik bertugas mengelola operasional Sarpras.
- **Kepala Sekolah** (Admin/Kepala Sekolah) — Dashboard monitoring, akademik, kehadiran, Sarpras, dan laporan sekolah dalam mode baca saja.
- **Data Kepala Sekolah** — akun Kepala Sekolah menggunakan data contoh yang konsisten dengan nama Kepala Sekolah pada Pengaturan sekolah.
- **Profil Saya** — Guru/Siswa dapat melihat data pribadi & ganti kata sandi.

> Catatan: menu **Guru Mata Pelajaran** tersedia untuk Admin dan Guru. Halaman khusus ini terpisah dari menu umum **Absensi** dan **Nilai Akademik** yang sudah ada. Untuk peran **Guru** dan **Siswa**, menu **Data Siswa** dan **Pengumuman** tetap tampil langsung di sidebar (tidak dikelompokkan), karena bukan bagian dari menu Administrator.

## Arsitektur

File tunggal ini berbentuk **SPA (Single Page Application)** dengan hash-routing (`#dashboard`, `#siswa`, `#guru`, dst) — berpindah menu tidak memuat ulang halaman, cukup berganti konten di dalam satu dokumen. Struktur kode di dalamnya:

1. **`<style>`** — seluruh stylesheet (layout login, sidebar, topbar, tabel, modal, responsif).
2. **Markup HTML** — layar login, shell aplikasi (sidebar + topbar + area konten), dan semua modal form (siswa, guru, kelas, nilai, pengumuman).
3. **`<script>`** — dibagi menjadi beberapa bagian:
   - **Data Layer (`DB`)** — akses `localStorage`, data contoh awal (seed), fungsi CRUD generik.
   - **Auth** — login/logout berbasis `sessionStorage`.
   - **Util** — helper format tanggal, escape HTML, toast, dialog konfirmasi, dsb.
   - **Router** — hash-based routing dengan pembatasan akses per peran.
   - **Route renderers** — fungsi render untuk tiap menu (dashboard, siswa, guru, kelas, nilai, absensi, pengumuman, profil, pengaturan).

## Catatan

- Data tersimpan di `localStorage` browser (per perangkat/browser). Gunakan fitur **Ekspor/Impor Data** di halaman Pengaturan untuk mencadangkan atau memindahkan data antar perangkat/browser.
- Untuk mengembalikan ke data contoh awal, gunakan tombol **Reset ke Data Awal** di halaman Pengaturan.
- Karena berbentuk single file, cukup bagikan file `.html` ini untuk memindahkan seluruh aplikasi (tanpa data) ke perangkat lain.
