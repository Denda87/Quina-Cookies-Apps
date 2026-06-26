"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

const KASIR_ROLES = ["Kasir", "Sub Kasir"];
// Halaman yang boleh diakses Kasir / Sub Kasir
const KASIR_ALLOWED = ["/dashboard/kasir", "/dashboard/kamar", "/dashboard/shift"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/login"); return; }
    // Admin punya akses penuh ke seluruh dashboard.
    if (user.role === "admin") return;
    // Kasir / Sub Kasir hanya boleh mengakses halaman operasional kasir.
    if (KASIR_ROLES.includes(user.jobRole)) {
      if (KASIR_ALLOWED.some(p => pathname.startsWith(p))) return;
      router.push("/dashboard/kasir");
      return;
    }
    // Peran lain tidak boleh masuk dashboard admin.
    router.push("/login");
  }, [router, pathname]);

  return (
    <div
      className="flex min-h-screen"
      style={{
        background:
          "radial-gradient(1100px 560px at 16% -8%, rgba(150,112,30,.20), transparent 58%), radial-gradient(900px 520px at 102% 4%, rgba(110,84,18,.16), transparent 55%), linear-gradient(160deg,#0b0805 0%,#070502 55%,#040301 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
