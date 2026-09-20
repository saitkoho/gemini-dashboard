/* =========================================================
   SISTEM DIGITAL SMP HULNANI — Data Layer (localStorage)
   Semua data disimpan di browser (localStorage) sehingga
   sistem ini bisa dipakai tanpa server/backend.
   ========================================================= */

const DB_KEY = "smphulnani_db_v1";

const DB = (function () {
  function seedData() {
    return {
      settings: {
        namaSekolah: "SMP HULNANI",
        npsn: "20123456",
        alamat: "Jl. Pendidikan No. 17, Kupang, NTT",
        telepon: "(0380) 123456",
        email: "info@smphulnani.sch.id",
        kepsek: "Drs. Yohanes Bria, M.Pd",
        tahunAjaran: "2026/2027",
        semester: "Ganjil",
      },
      users: [
        { id: "u1", username: "admin", password: "admin123", role: "admin", name: "Administrator", linkedId: null },
        { id: "u2", username: "guru", password: "guru123", role: "guru", name: "Budi Santoso, S.Pd", linkedId: "g1" },
        { id: "u3", username: "siswa", password: "siswa123", role: "siswa", name: "Nisa Amalia", linkedId: "s1" },
      ],
      mapel: [
        { id: "m1", nama: "Matematika", kkm: 75 },
        { id: "m2", nama: "Bahasa Indonesia", kkm: 75 },
        { id: "m3", nama: "Bahasa Inggris", kkm: 70 },
        { id: "m4", nama: "IPA", kkm: 75 },
        { id: "m5", nama: "IPS", kkm: 70 },
        { id: "m6", nama: "PJOK", kkm: 75 },
        { id: "m7", nama: "PAI/Agama", kkm: 75 },
        { id: "m8", nama: "Seni Budaya", kkm: 70 },
      ],
      guru: [
        { id: "g1", nip: "198501122010011001", nama: "Budi Santoso, S.Pd", jk: "L", mapel: "Matematika", telepon: "081234500001", email: "budi.santoso@smphulnani.sch.id", alamat: "Kupang", status: "Aktif", waliKelas: "VII-A" },
        { id: "g2", nip: "198702152011012002", nama: "Siti Rahayu, S.Pd", jk: "P", mapel: "Bahasa Indonesia", telepon: "081234500002", email: "siti.rahayu@smphulnani.sch.id", alamat: "Kupang", status: "Aktif", waliKelas: "VII-B" },
        { id: "g3", nip: "199001202012011003", nama: "Andi Wijaya, S.Pd", jk: "L", mapel: "Bahasa Inggris", telepon: "081234500003", email: "andi.wijaya@smphulnani.sch.id", alamat: "Kupang", status: "Aktif", waliKelas: "VIII-A" },
        { id: "g4", nip: "198812112013012004", nama: "Maria Goreti, S.Si", jk: "P", mapel: "IPA", telepon: "081234500004", email: "maria.goreti@smphulnani.sch.id", alamat: "Kupang", status: "Aktif", waliKelas: "" },
        { id: "g5", nip: "199203302014011005", nama: "Yusuf Kalla, S.Pd", jk: "L", mapel: "IPS", telepon: "081234500005", email: "yusuf.kalla@smphulnani.sch.id", alamat: "Kupang", status: "Aktif", waliKelas: "" },
        { id: "g6", nip: "198609182010012006", nama: "Fitriani, S.Pd", jk: "P", mapel: "PJOK", telepon: "081234500006", email: "fitriani@smphulnani.sch.id", alamat: "Kupang", status: "Cuti", waliKelas: "" },
      ],
      kelas: [
        { id: "k1", nama: "VII-A", tingkat: 7, waliId: "g1", ruang: "R.101" },
        { id: "k2", nama: "VII-B", tingkat: 7, waliId: "g2", ruang: "R.102" },
        { id: "k3", nama: "VIII-A", tingkat: 8, waliId: "g3", ruang: "R.201" },
        { id: "k4", nama: "IX-A", tingkat: 9, waliId: "", ruang: "R.301" },
      ],
      siswa: [
        { id: "s1", nis: "2026001", nama: "Nisa Amalia", kelas: "VII-A", jk: "P", tempatLahir: "Kupang", tglLahir: "2013-04-11", alamat: "Jl. Timor Raya No. 5", telepon: "081211112222", namaOrtu: "Bapak Amir", status: "Aktif" },
        { id: "s2", nis: "2026002", nama: "Rizky Pratama", kelas: "VII-A", jk: "L", tempatLahir: "Kupang", tglLahir: "2013-02-20", alamat: "Jl. Soekarno No. 12", telepon: "081211112223", namaOrtu: "Bapak Hendra", status: "Aktif" },
        { id: "s3", nis: "2026003", nama: "Putri Ayu Lestari", kelas: "VII-A", jk: "P", tempatLahir: "Atambua", tglLahir: "2013-07-09", alamat: "Jl. Cendana No. 3", telepon: "081211112224", namaOrtu: "Ibu Wati", status: "Aktif" },
        { id: "s4", nis: "2026004", nama: "Dimas Aditya", kelas: "VII-A", jk: "L", tempatLahir: "Kupang", tglLahir: "2013-01-30", alamat: "Jl. Timor Raya No. 8", telepon: "081211112225", namaOrtu: "Bapak Dedi", status: "Aktif" },
        { id: "s5", nis: "2026005", nama: "Anisa Fitri", kelas: "VII-B", jk: "P", tempatLahir: "Kupang", tglLahir: "2013-03-15", alamat: "Jl. Adisucipto No. 22", telepon: "081211112226", namaOrtu: "Bapak Slamet", status: "Aktif" },
        { id: "s6", nis: "2026006", nama: "Fajar Nugroho", kelas: "VII-B", jk: "L", tempatLahir: "Ende", tglLahir: "2013-06-18", alamat: "Jl. Frans Seda No. 4", telepon: "081211112227", namaOrtu: "Ibu Sri", status: "Aktif" },
        { id: "s7", nis: "2026007", nama: "Wulan Sari", kelas: "VII-B", jk: "P", tempatLahir: "Kupang", tglLahir: "2013-05-27", alamat: "Jl. El Tari No. 9", telepon: "081211112228", namaOrtu: "Bapak Joko", status: "Pindah" },
        { id: "s8", nis: "2025010", nama: "Bagas Setiawan", kelas: "VIII-A", jk: "L", tempatLahir: "Kupang", tglLahir: "2012-09-12", alamat: "Jl. Timor Raya No. 30", telepon: "081211112229", namaOrtu: "Bapak Agus", status: "Aktif" },
        { id: "s9", nis: "2025011", nama: "Citra Dewi", kelas: "VIII-A", jk: "P", tempatLahir: "Kupang", tglLahir: "2012-11-02", alamat: "Jl. Cendana No. 18", telepon: "081211112230", namaOrtu: "Ibu Nur", status: "Aktif" },
        { id: "s10", nis: "2025012", nama: "Eko Prasetyo", kelas: "VIII-A", jk: "L", tempatLahir: "Soe", tglLahir: "2012-12-25", alamat: "Jl. Soekarno No. 40", telepon: "081211112231", namaOrtu: "Bapak Rudi", status: "Aktif" },
        { id: "s11", nis: "2024015", nama: "Gita Permata", kelas: "IX-A", jk: "P", tempatLahir: "Kupang", tglLahir: "2011-08-08", alamat: "Jl. Adisucipto No. 50", telepon: "081211112232", namaOrtu: "Bapak Wawan", status: "Aktif" },
        { id: "s12", nis: "2024016", nama: "Hafiz Ramadhan", kelas: "IX-A", jk: "L", tempatLahir: "Kupang", tglLahir: "2011-10-19", alamat: "Jl. Timor Raya No. 60", telepon: "081211112233", namaOrtu: "Ibu Yuli", status: "Aktif" },
      ],
      nilai: [
        { id: "n1", siswaId: "s1", mapelId: "m1", jenis: "UH1", nilai: 88, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n2", siswaId: "s1", mapelId: "m1", jenis: "UTS", nilai: 84, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n3", siswaId: "s2", mapelId: "m1", jenis: "UH1", nilai: 70, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n4", siswaId: "s2", mapelId: "m1", jenis: "UTS", nilai: 65, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n5", siswaId: "s3", mapelId: "m1", jenis: "UH1", nilai: 92, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n6", siswaId: "s4", mapelId: "m1", jenis: "UH1", nilai: 76, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n7", siswaId: "s1", mapelId: "m2", jenis: "UH1", nilai: 90, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n8", siswaId: "s2", mapelId: "m2", jenis: "UH1", nilai: 78, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n9", siswaId: "s8", mapelId: "m3", jenis: "UH1", nilai: 81, semester: "Ganjil", tahunAjaran: "2026/2027" },
        { id: "n10", siswaId: "s9", mapelId: "m3", jenis: "UH1", nilai: 74, semester: "Ganjil", tahunAjaran: "2026/2027" },
      ],
      absensi: [
        { id: "a1", siswaId: "s1", tanggal: todayOffset(0), status: "Hadir" },
        { id: "a2", siswaId: "s2", tanggal: todayOffset(0), status: "Hadir" },
        { id: "a3", siswaId: "s3", tanggal: todayOffset(0), status: "Sakit" },
        { id: "a4", siswaId: "s4", tanggal: todayOffset(0), status: "Hadir" },
        { id: "a5", siswaId: "s1", tanggal: todayOffset(-1), status: "Hadir" },
        { id: "a6", siswaId: "s2", tanggal: todayOffset(-1), status: "Alpa" },
        { id: "a7", siswaId: "s3", tanggal: todayOffset(-1), status: "Hadir" },
        { id: "a8", siswaId: "s4", tanggal: todayOffset(-1), status: "Izin" },
      ],
      pengumuman: [
        {
          id: "p1",
          judul: "Libur Semester Ganjil",
          kategori: "Umum",
          isi: "Diberitahukan kepada seluruh siswa/i bahwa libur semester ganjil akan dimulai tanggal 20 Desember 2026. Kegiatan belajar mengajar akan kembali aktif pada 5 Januari 2027.",
          tanggal: todayOffset(-2),
          penulis: "Administrator",
        },
        {
          id: "p2",
          judul: "Jadwal Ujian Tengah Semester",
          kategori: "Akademik",
          isi: "Ujian Tengah Semester (UTS) Ganjil akan dilaksanakan pada tanggal 6-10 Oktober 2026. Siswa diharapkan mempersiapkan diri dengan baik.",
          tanggal: todayOffset(-5),
          penulis: "Administrator",
        },
        {
          id: "p3",
          judul: "Lomba Cerdas Cermat Antar Kelas",
          kategori: "Kegiatan",
          isi: "Dalam rangka memperingati Bulan Bahasa, akan diadakan lomba cerdas cermat antar kelas pada tanggal 28 Oktober 2026 di aula sekolah.",
          tanggal: todayOffset(-8),
          penulis: "Budi Santoso, S.Pd",
        },
      ],
    };
  }

  function todayOffset(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function load() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      const seeded = seedData();
      localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      const seeded = seedData();
      localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
  }

  function save(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }

  function get(collection) {
    const data = load();
    return collection ? data[collection] : data;
  }

  function setCollection(collection, arr) {
    const data = load();
    data[collection] = arr;
    save(data);
  }

  function updateSettings(patch) {
    const data = load();
    data.settings = Object.assign({}, data.settings, patch);
    save(data);
    return data.settings;
  }

  function genId(prefix) {
    return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function insert(collection, item) {
    const data = load();
    if (!item.id) item.id = genId(collection[0]);
    data[collection].push(item);
    save(data);
    return item;
  }

  function update(collection, id, patch) {
    const data = load();
    const idx = data[collection].findIndex((x) => x.id === id);
    if (idx === -1) return null;
    data[collection][idx] = Object.assign({}, data[collection][idx], patch);
    save(data);
    return data[collection][idx];
  }

  function remove(collection, id) {
    const data = load();
    data[collection] = data[collection].filter((x) => x.id !== id);
    save(data);
  }

  function findById(collection, id) {
    return get(collection).find((x) => x.id === id) || null;
  }

  function reset() {
    localStorage.removeItem(DB_KEY);
    load();
  }

  return { load, save, get, setCollection, updateSettings, genId, insert, update, remove, findById, reset };
})();
