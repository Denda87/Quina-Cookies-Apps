export const CREDENTIALS = {
  admin:    { email: "admin@kuykuy.com",    password: "admin123",   role: "admin",  jobRole: "Admin",     name: "Admin Kuykuy",   staffId: "",      branch: "" },
  staff:    { email: "staff@kuykuy.com",    password: "kuykuy123",  role: "staff",  jobRole: "Therapist", name: "Budi Santoso",   staffId: "ss-1",  branch: "Strawberry Spa & Therapy" },
  kasir:    { email: "kasir@kuykuy.com",    password: "kuykuy123",  role: "staff",  jobRole: "Kasir",     name: "Rina Kartika",   staffId: "ss-10", branch: "KUY BM" },
  subkasir: { email: "subkasir@kuykuy.com", password: "kuykuy123",  role: "staff",  jobRole: "Sub Kasir", name: "Dian Pratiwi",   staffId: "ss-11", branch: "KUY BETOS" },
  gro:      { email: "gro@kuykuy.com",      password: "kuykuy123",  role: "staff",  jobRole: "GRO",       name: "Maya Sari",      staffId: "ss-12", branch: "CRYSTAL KUY" },
  ob:       { email: "ob@kuykuy.com",       password: "kuykuy123",  role: "staff",  jobRole: "Office Boy", name: "Joko Susilo",   staffId: "ss-13", branch: "KUY STORY" },
};

export type UserSession = { role: string; jobRole: string; name: string; email: string; staffId: string; branch: string };

export function login(email: string, password: string): { role: string; name: string } | null {
  if (typeof window === "undefined") return null;
  for (const cred of Object.values(CREDENTIALS)) {
    if (cred.email === email.trim() && cred.password === password.trim()) {
      const session: UserSession = { role: cred.role, jobRole: cred.jobRole, name: cred.name, email, staffId: cred.staffId, branch: cred.branch };
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
