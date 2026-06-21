export const CREDENTIALS = {
  staff: { email: "staff@kuykuy.com", password: "kuykuy123", role: "staff", name: "Budi Santoso" },
  admin: { email: "admin@kuykuy.com", password: "admin123", role: "admin", name: "Admin Kuykuy" },
};

export function login(email: string, password: string): { role: string; name: string } | null {
  if (typeof window === "undefined") return null;
  for (const cred of Object.values(CREDENTIALS)) {
    if (cred.email === email && cred.password === password) {
      localStorage.setItem("kuykuy_user", JSON.stringify({ role: cred.role, name: cred.name, email }));
      return { role: cred.role, name: cred.name };
    }
  }
  return null;
}

export function getUser(): { role: string; name: string; email: string } | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("kuykuy_user");
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem("kuykuy_user");
}
