"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { logout, getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LayoutDashboard, UserCog, Layers, CalendarClock, Target, MapPin, FileText, Settings, LogOut, Search, ShoppingCart, DoorOpen, AlarmClock, Wallet } from "lucide-react";

type NavItem = | { type: "link"; label: string; icon: React.ElementType; href: string } | { type: "divider"; label: string };

// Menu lengkap untuk Admin
const adminNavItems: NavItem[] = [
  { type: "link", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { type: "divider", label: "OPERASIONAL" },
  { type: "link", label: "Kasir POS", icon: ShoppingCart, href: "/dashboard/kasir" },
  { type: "link", label: "Monitor Kamar", icon: DoorOpen, href: "/dashboard/kamar" },
  { type: "link", label: "Shift Kasir", icon: AlarmClock, href: "/dashboard/shift" },
  { type: "link", label: "Terapis / Staf", icon: UserCog, href: "/dashboard/staff" },
  { type: "link", label: "Layanan Spa", icon: Layers, href: "/dashboard/layanan" },
  { type: "link", label: "Reservasi / Booking", icon: CalendarClock, href: "/dashboard/booking" },
  { type: "link", label: "Absensi & Kinerja", icon: Target, href: "/dashboard/absensi" },
  { type: "link", label: "Komisi Terapis", icon: Wallet, href: "/dashboard/komisi" },
  { type: "link", label: "Lokasi Cabang", icon: MapPin, href: "/dashboard/lokasi" },
  { type: "link", label: "Laporan", icon: FileText, href: "/dashboard/laporan" },
  { type: "link", label: "Pengaturan", icon: Settings, href: "/dashboard/pengaturan" },
];

// Menu terbatas untuk Kasir / Sub Kasir
const kasirNavItems: NavItem[] = [
  { type: "divider", label: "OPERASIONAL KASIR" },
  { type: "link", label: "Kasir POS", icon: ShoppingCart, href: "/dashboard/kasir" },
  { type: "link", label: "Monitor Kamar", icon: DoorOpen, href: "/dashboard/kamar" },
  { type: "link", label: "Shift Kasir", icon: AlarmClock, href: "/dashboard/shift" },
];

const KASIR_ROLES = ["Kasir", "Sub Kasir"];

const GOLD_GRAD = "linear-gradient(135deg,#f4d886,#d4af37 55%,#b8860b)";

export default function AdminSidebar() {
  const path = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<{ name: string; jobRole: string } | null>(null);

  useEffect(() => {
    const u = getUser();
    if (u) setProfile({ name: u.name, jobRole: u.jobRole });
  }, []);

  const isKasir = profile ? KASIR_ROLES.includes(profile.jobRole) : false;
  const navItems = isKasir ? kasirNavItems : adminNavItems;
  const displayName = profile?.name || "Admin KuyKuy";
  const displayRole = isKasir ? profile!.jobRole : "Super Admin";

  return (
    <aside
      className="flex flex-col relative"
      style={{
        width: 264,
        flex: "0 0 264px",
        background: "linear-gradient(180deg,#100c06 0%,#0a0703 100%)",
        borderRight: "1px solid rgba(212,175,55,.14)",
        padding: "22px 18px",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 1, height: "100%", background: "linear-gradient(180deg,transparent,rgba(212,175,55,.35),transparent)" }} />

      {/* brand */}
      <div className="flex items-center" style={{ gap: 13, padding: "4px 6px 18px" }}>
        <div style={{ width: 52, height: 52, borderRadius: 13, overflow: "hidden", border: "1px solid rgba(212,175,55,.4)", boxShadow: "0 0 18px rgba(212,175,55,.25)", flex: "0 0 52px", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
          <Logo size={42} />
        </div>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 16, letterSpacing: "1.5px", background: "linear-gradient(135deg,#f9ecbf,#e3c46a 50%,#c79a2e)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>KUYKUY</div>
          <div style={{ fontSize: 10, letterSpacing: "2.5px", color: "#8a8166", textTransform: "uppercase", marginTop: 2 }}>Group Spa</div>
        </div>
      </div>

      {/* search */}
      <div className="flex items-center" style={{ gap: 9, background: "rgba(255,255,255,.035)", border: "1px solid rgba(212,175,55,.16)", borderRadius: 11, padding: "10px 12px", marginBottom: 20 }}>
        <Search size={15} color="#9a8f70" />
        <input className="bg-transparent flex-1 outline-none" style={{ fontSize: 12.5, color: "#c9bfa3" }} placeholder="Quick Search..." />
      </div>

      {/* nav */}
      <nav className="flex flex-col flex-1 overflow-y-auto" style={{ gap: 3 }}>
        {navItems.map((item, idx) => {
          if (item.type === "divider") return (
            <p key={`divider-${idx}`} style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", padding: "8px 13px 4px", color: "#5a5238", marginTop: 6 }}>{item.label}</p>
          );
          const { label, icon: Icon, href } = item;
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center transition-all"
              style={active
                ? { gap: 12, padding: "11px 13px", borderRadius: 11, background: GOLD_GRAD, color: "#1a1305", fontWeight: 700, fontSize: 13, boxShadow: "0 6px 18px rgba(212,175,55,.3)" }
                : { gap: 12, padding: "11px 13px", borderRadius: 11, color: "#9a8f70", fontWeight: 500, fontSize: 13 }}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.8} />
              <span className="flex-1">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* profile card bottom */}
      <div className="flex items-center" style={{ marginTop: 16, gap: 12, padding: 12, borderRadius: 13, background: "linear-gradient(135deg,rgba(212,175,55,.10),rgba(212,175,55,.02))", border: "1px solid rgba(212,175,55,.18)" }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(212,175,55,.4)", flex: "0 0 42px", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
          <Logo size={34} />
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f3ecda", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</div>
          <div style={{ fontSize: 10.5, color: "#c79a2e", letterSpacing: ".5px" }}>{displayRole}</div>
        </div>
        <button onClick={() => { logout(); router.push("/login"); }} title="Logout" style={{ color: "#776d54", display: "flex", padding: 4 }} className="hover:text-red-400 transition-colors">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
