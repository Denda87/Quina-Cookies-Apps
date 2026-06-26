"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") router.push("/login");
  }, [router]);

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
