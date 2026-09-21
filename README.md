# Sistem Digital SMP Hulnani

Sistem informasi administrasi sekolah **dalam satu file HTML tunggal** (`sistem-digital-smp-hulnani.html`). Tidak memerlukan server, build tools, maupun instalasi apa pun — cukup buka filenya langsung di browser. Seluruh HTML, CSS, dan JavaScript sudah digabung menjadi satu file, dan data disimpan di `localStorage` browser.

## Cara Menjalankan

Cukup buka file `sistem-digital-smp-hulnani.html` langsung dengan browser (double click, atau `File > Open`). Bisa juga di-hosting sebagai file statis di mana saja (GitHub Pages, Netlify, dsb) karena tidak ada dependensi eksternal.

## Akun Demo

| Peran  | Username | Password  |
|--------|----------|-----------|
| Admin  | admin    | admin123  |
| Guru   | guru     | guru123   |
| Tenaga Pendidik | tendik | tendik123 |
| Kepala Sekolah | kepsek | kepsek123 |

## Fitur

- **Login multi-peran**: Admin, Guru, Tenaga Pendidik, dan Kepala Sekolah (sesi disimpan di `sessionStorage`).
- **Dashboard** ringkasan data sesuai peran pengguna.
- **Arsip Tahun Ajaran & Semester** — seluruh transaksi operasional diberi penanda tahun ajaran dan semester. Pilih periode pada selector di topbar untuk membuka data lama; tampilan arsip bersifat baca saja agar riwayat tidak berubah.
- **Menu "Administrator"** (khusus Admin) — menu induk collapsible di sidebar yang mengelompokkan submenu manajemen data:
  - **Data Siswa** — CRUD lengkap, pencarian, filter kelas, dan detail siswa.
  - **Data Guru** — CRUD lengkap.
  - **Tenaga Pendidik** — CRUD data tenaga kependidikan non-guru (TU, Pustakawan, Laboran, Satpam, Petugas Kebersihan, dll).
  - **Manajemen Pengguna** — buat, ubah, nonaktifkan, atau hapus akun login; atur username, kata sandi, serta peran Administrator, Guru, Tenaga Pendidik, atau Kepala Sekolah; tautkan tiap akun ke data profilnya.
  - **Data Kelas** — kelola rombongan belajar & wali kelas.
  - **Pengumuman** — buat & kelola pengumuman sekolah.
  - **Pengaturan** — profil sekolah, manajemen tahun ajaran aktif, tambah tahun ajaran baru, ekspor/impor data (backup JSON), dan reset data.
- **Menu "Guru Mata Pelajaran"** (Admin dan Guru) — menu induk collapsible untuk kebutuhan pembelajaran per mapel:
  - **Jurnal Mengajar** — catat tanggal, kelas, mata pelajaran, jam ke, materi yang diajarkan, serta catatan pembelajaran.
  - **Absensi Siswa** — catat kehadiran siswa per kelas, tanggal, guru, dan mata pelajaran.
  - **Input Nilai** — input nilai per siswa, lengkap dengan jenis penilaian dan indikator KKM.
  - Admin menetapkan **Kelas yang Diampu** pada data Guru. Guru hanya dapat melihat dan mengolah siswa, jurnal, absensi, serta nilai pada kelas yang ditetapkan dan mata pelajaran yang tercantum pada profilnya; pilihan mata pelajaran otomatis terkunci.
- **Data Akademik Siswa** — nilai dan kehadiran siswa dikelola oleh Guru melalui modul Guru Mata Pelajaran serta Wali Kelas. Riwayat nilai lama dimigrasikan otomatis ke Input Nilai Mata Pelajaran.
- **Wali Kelas** (Admin/Guru) — Ringkasan Kelas, **Monitoring Mapel**, Siswa Binaan, serta Catatan Wali Kelas. Monitoring Mapel otomatis menampilkan nilai, kehadiran per mata pelajaran, dan jurnal mengajar yang diinput Guru Mata Pelajaran untuk kelas binaan. Guru hanya melihat kelas yang diwalikan; Admin dapat memantau seluruh kelas.
- **Perpustakaan** (Admin/Guru) — Koleksi Buku (CRUD), Peminjaman & Pengembalian, Anggota dari data Siswa/Guru, serta laporan sirkulasi. Guru bertugas sebagai petugas perpustakaan.
- **TU & Persuratan Digital** (Admin/Tenaga Pendidik) — Surat Masuk, Surat Keluar, Disposisi & Arsip Digital, serta laporan persuratan. Tenaga Pendidik bertugas mengelola operasional persuratan.
- **Sarana & Prasarana** (Admin/Tenaga Pendidik) — Inventaris Barang, Peminjaman Aset, Kondisi & Pemeliharaan, serta laporan Sarpras. Tenaga Pendidik bertugas mengelola operasional Sarpras.
- **Kepala Sekolah** (Admin/Kepala Sekolah) — Dashboard monitoring, akademik, kehadiran, Sarpras, dan laporan sekolah dalam mode baca saja.
- **Data Kepala Sekolah** — akun Kepala Sekolah menggunakan data contoh yang konsisten dengan nama Kepala Sekolah pada Pengaturan sekolah.
- **Otomasi operasional** — stok buku dan unit aset tersedia dihitung otomatis berdasarkan pinjaman aktif; pengembalian langsung memperbarui ketersediaan; status surat masuk disinkronkan otomatis dengan disposisi; rekap dashboard dan monitoring mengambil data transaksi terbaru.
- **Profil Saya** — Guru, Tenaga Pendidik, dan Kepala Sekolah dapat melihat data pribadi & mengganti kata sandi.

> Catatan: menu lama **Nilai Akademik** dan **Absensi** telah dihapus dari navigasi. Nilai dikelola dari **Guru Mata Pelajaran → Input Nilai** dan kehadiran dicatat dari **Guru Mata Pelajaran → Absensi Siswa**. Wali Kelas membaca rekapnya melalui **Wali Kelas → Monitoring Mapel**. Guru yang belum ditetapkan sebagai wali kelas tidak melihat grup Wali Kelas.

## Mengelola Tahun Ajaran dan Arsip

1. Masuk sebagai **Admin**, lalu buka **Administrator → Pengaturan**.
2. Pada **Tahun Ajaran & Arsip Semester**, masukkan format `YYYY/YYYY` (misalnya `2027/2028`) untuk menambah tahun ajaran baru. Tahun baru awalnya tersimpan sebagai arsip.
3. Klik **Jadikan Aktif** saat tahun tersebut mulai digunakan. Semester aktif dapat dipilih pada formulir Profil Sekolah. Transaksi baru otomatis tercatat pada periode aktif.
4. Gunakan selector tahun ajaran/semester di topbar untuk melihat semester berjalan maupun arsip. Ketika periode selain periode aktif dipilih, aplikasi menandainya sebagai **Tampilan Arsip** dan mencegah perubahan transaksi.

Riwayat transaksi yang sudah ada dari versi sebelumnya akan otomatis diberi periode sesuai pengaturan tahun ajaran dan semester yang saat itu tersimpan. Cadangan JSON juga menyertakan katalog tahun ajaran serta seluruh arsip transaksi.

## Manajemen Pengguna dan Role

Admin dapat membuka **Administrator → Manajemen Pengguna** untuk membuat atau mengubah akun login. **Siswa tidak memiliki peran maupun akun login**; data siswa dipakai oleh petugas sekolah untuk pengelolaan akademik dan administrasi. Pilih peran yang sesuai lalu hubungkan akun dengan data Guru, Tenaga Pendidik, atau Kepala Sekolah; nama akun akan mengikuti profil yang dipilih. Akun Administrator dapat dibuat tanpa profil pegawai. Kata sandi dapat diganti melalui tombol kunci tanpa menampilkannya di tabel, dan akun dapat dinonaktifkan tanpa menghapus data profil. Sistem menjaga agar selalu ada minimal satu Administrator aktif serta mencegah satu profil dipasangkan ke lebih dari satu akun.

## Arsitektur

File tunggal ini berbentuk **SPA (Single Page Application)** dengan hash-routing (`#dashboard`, `#siswa`, `#guru`, dst) — berpindah menu tidak memuat ulang halaman, cukup berganti konten di dalam satu dokumen. Struktur kode di dalamnya:

1. **`<style>`** — seluruh stylesheet (layout login, sidebar, topbar, tabel, modal, responsif).
2. **Markup HTML** — layar login, shell aplikasi (sidebar + topbar + area konten), serta modal form data utama.
3. **`<script>`** — dibagi menjadi beberapa bagian:
   - **Data Layer (`DB`)** — akses `localStorage`, data contoh awal (seed), migrasi ringan data lama, katalog tahun ajaran, penanda periode transaksi, dan fungsi CRUD generik.
   - **Auth** — login/logout berbasis `sessionStorage`.
   - **Util** — helper format tanggal, escape HTML, toast, dialog konfirmasi, dsb.
   - **Router** — hash-based routing dengan pembatasan akses per peran.
   - **Route renderers** — fungsi render untuk dashboard, akademik, wali kelas, perpustakaan, persuratan, Sarpras, monitoring Kepala Sekolah, serta menu administrasi.

## Catatan

- Data tersimpan di `localStorage` browser (per perangkat/browser). Gunakan fitur **Ekspor/Impor Data** di halaman Pengaturan untuk mencadangkan atau memindahkan data antar perangkat/browser.
- Untuk mengembalikan ke data contoh awal, gunakan tombol **Reset ke Data Awal** di halaman Pengaturan.
- Karena berbentuk single file, cukup bagikan file `.html` ini untuk memindahkan seluruh aplikasi (tanpa data) ke perangkat lain.
