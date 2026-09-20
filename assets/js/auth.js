/* =========================================================
   SISTEM DIGITAL SMP HULNANI — Auth (sessionStorage)
   ========================================================= */

const AUTH_KEY = "smphulnani_session_v1";

const Auth = (function () {
  function login(username, password) {
    const users = DB.get("users");
    const found = users.find(
      (u) => u.username.toLowerCase() === String(username).toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, message: "Username atau kata sandi salah." };
    const session = { id: found.id, username: found.username, role: found.role, name: found.name, linkedId: found.linkedId };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { ok: true, session };
  }

  function current() {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = "index.html";
  }

  function requireLogin() {
    const s = current();
    if (!s) {
      window.location.href = "index.html";
      return null;
    }
    return s;
  }

  function requireRole(roles) {
    const s = requireLogin();
    if (!s) return null;
    if (roles && roles.length && !roles.includes(s.role)) {
      window.location.href = "dashboard.html";
      return null;
    }
    return s;
  }

  return { login, current, logout, requireLogin, requireRole };
})();
