export const CREDENTIALS = {
  staff: { email: "staff@kuykuy.com", password: "kuykuy123", role: "staff", name: "Budi Santoso", staffId: "ss-2", branch: "Strawberry Spa & Therapy" },
  admin: { email: "admin@kuykuy.com", password: "admin123", role: "admin", name: "Admin Kuykuy", staffId: "", branch: "" },
};

export type UserSession = { role: string; name: string; email: string; staffId: string; branch: string };

export function login(email: string, password: string): { role: string; name: string } | null {
  if (typeof window === "undefined") return null;
  for (const cred of Object.values(CREDENTIALS)) {
    if (cred.email === email && cred.password === password) {
      const session: UserSession = { role: cred.role, name: cred.name, email, staffId: cred.staffId, branch: cred.branch };
      localStorage.setItem("kuykuy_user", JSON.stringify(session));
      return { role: cred.role, name: cred.name };
    }
  }
  return null;
}

export function getUser(): UserSession | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("kuykuy_user");
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem("kuykuy_user");
}
