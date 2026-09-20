/* =========================================================
   SISTEM DIGITAL SMP HULNANI — App Shell & Util Bersama
   ========================================================= */

const NAV_ITEMS = [
  { key: "dashboard", href: "dashboard.html", icon: "📊", label: "Dashboard", roles: ["admin", "guru", "siswa"] },
  { key: "siswa", href: "siswa.html", icon: "🧑‍🎓", label: "Data Siswa", roles: ["admin", "guru"] },
  { key: "guru", href: "guru.html", icon: "🧑‍🏫", label: "Data Guru", roles: ["admin"] },
  { key: "kelas", href: "kelas.html", icon: "🏫", label: "Data Kelas", roles: ["admin"] },
  { key: "nilai", href: "nilai.html", icon: "📝", label: "Nilai Akademik", roles: ["admin", "guru", "siswa"] },
  { key: "absensi", href: "absensi.html", icon: "🗓️", label: "Absensi", roles: ["admin", "guru", "siswa"] },
  { key: "pengumuman", href: "pengumuman.html", icon: "📣", label: "Pengumuman", roles: ["admin", "guru", "siswa"] },
  { key: "profil", href: "profil.html", icon: "👤", label: "Profil Saya", roles: ["guru", "siswa"] },
  { key: "pengaturan", href: "pengaturan.html", icon: "⚙️", label: "Pengaturan", roles: ["admin"] },
];

const ROLE_LABEL = { admin: "Administrator", guru: "Guru", siswa: "Siswa" };

function initials(name) {
  if (!name) return "?";
  const parts = name.replace(/[.,]/g, "").trim().split(/\s+/);
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateTimeRelative(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((now - d) / 86400000);
  if (diff === 0) return "Hari ini";
  if (diff === 1) return "Kemarin";
  if (diff > 1) return `${diff} hari lalu`;
  return formatDate(dateStr);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------------- Layout renderer ---------------- */
function renderShell(activeKey, pageTitle, pageSub) {
  const session = Auth.requireLogin();
  if (!session) return null;
  const settings = DB.get("settings");

  const navHtml = NAV_ITEMS.filter((item) => item.roles.includes(session.role))
    .map(
      (item) => `
      <a href="${item.href}" class="${item.key === activeKey ? "active" : ""}">
        <span class="ic">${item.icon}</span>
        <span>${item.label}</span>
      </a>`
    )
    .join("");

  const shellHtml = `
  <div class="overlay-backdrop" id="overlayBackdrop"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="logo-badge">🎓</div>
      <div class="brand-text">
        <b>${escapeHtml(settings.namaSekolah)}</b>
        <span>Sistem Digital Sekolah</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-title">Menu Utama</div>
      ${navHtml}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="avatar">${initials(session.name)}</div>
        <div>
          <div class="name">${escapeHtml(session.name)}</div>
          <div class="role">${ROLE_LABEL[session.role] || session.role}</div>
        </div>
      </div>
      <button class="btn-logout" id="btnLogout">⏻ Keluar</button>
    </div>
  </aside>
  <div class="main-wrap">
    <header class="topbar">
      <div class="flex" style="gap:12px; align-items:center;">
        <button class="hamburger" id="btnHamburger">☰</button>
        <div>
          <div class="page-title">${pageTitle}</div>
          <div class="page-sub">${pageSub || ""}</div>
        </div>
      </div>
      <div class="topbar-right">
        <div class="icon-btn" title="Notifikasi">🔔<span class="dot"></span></div>
        <div class="topbar-user">
          <div class="avatar">${initials(session.name)}</div>
          <div>
            <div class="name">${escapeHtml(session.name)}</div>
            <div class="role">${ROLE_LABEL[session.role] || session.role}</div>
          </div>
        </div>
      </div>
    </header>
    <main class="content" id="pageContent"></main>
  </div>
  <div class="toast-wrap" id="toastWrap"></div>
  `;

  document.getElementById("appShell").innerHTML = shellHtml;

  document.getElementById("btnLogout").addEventListener("click", () => {
    confirmDialog({
      title: "Keluar dari sistem?",
      message: "Anda perlu login kembali untuk mengakses dashboard.",
      confirmText: "Ya, Keluar",
      onConfirm: () => Auth.logout(),
    });
  });

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlayBackdrop");
  document.getElementById("btnHamburger").addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });

  return session;
}

/* ---------------- Toast ---------------- */
function showToast(message, type = "info") {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  const icon = type === "success" ? "✅" : type === "error" ? "⚠️" : "ℹ️";
  el.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity .25s";
    setTimeout(() => el.remove(), 250);
  }, 2600);
}

/* ---------------- Confirm dialog ---------------- */
function confirmDialog({ title, message, confirmText = "Ya", cancelText = "Batal", onConfirm }) {
  const existing = document.getElementById("confirmModalBackdrop");
  if (existing) existing.remove();

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop show";
  backdrop.id = "confirmModalBackdrop";
  backdrop.innerHTML = `
    <div class="modal" style="max-width:380px; text-align:center;">
      <div class="modal-body" style="padding-top:28px;">
        <div class="confirm-icon">⚠️</div>
        <h3 style="margin:0 0 8px;">${escapeHtml(title)}</h3>
        <p class="text-muted" style="font-size:13px; margin:0 0 20px;">${escapeHtml(message)}</p>
        <div class="flex gap-12" style="justify-content:center;">
          <button class="btn btn-outline" id="confirmCancelBtn">${escapeHtml(cancelText)}</button>
          <button class="btn btn-danger-outline" style="background:var(--danger); color:#fff; border-color:var(--danger);" id="confirmOkBtn">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(backdrop);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
  document.getElementById("confirmCancelBtn").addEventListener("click", () => backdrop.remove());
  document.getElementById("confirmOkBtn").addEventListener("click", () => {
    backdrop.remove();
    if (onConfirm) onConfirm();
  });
}

/* ---------------- Modal helpers ---------------- */
function openModal(id) {
  document.getElementById(id).classList.add("show");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

/* Close modal when clicking backdrop */
document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("modal-backdrop")) {
    e.target.classList.remove("show");
  }
});

/* simple debounce */
function debounce(fn, delay = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
