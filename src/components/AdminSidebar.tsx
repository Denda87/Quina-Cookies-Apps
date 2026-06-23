"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LayoutDashboard, UserCog, Layers, CalendarClock, Target, MapPin, FileText, Settings, LogOut, Search, ShoppingCart, DoorOpen, AlarmClock, Wallet } from "lucide-react";

type NavItem = | { type: "link"; label: string; icon: React.ElementType; href: string } | { type: "divider"; label: string };

const navItems: NavItem[] = [
  { type: "link", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { type: "divider", label: "— OPERASIONAL —" },
  { type: "link", label: "Kasir POS", icon: ShoppingCart, href: "/dashboard/kasir" },
  { type: "link", label: "Monitor Kamar", icon: DoorOpen, href: "/dashboard/kamar" },
  { type: "link", label: "Shift Kasir", icon: AlarmClock, href: "/dashboard/shift" },
  { type: "link", label: "Terapis/Staf", icon: UserCog, href: "/dashboard/staff" },
  { type: "link", label: "Layanan Spa", icon: Layers, href: "/dashboard/layanan" },
  { type: "link", label: "Reservasi/Booking", icon: CalendarClock, href: "/dashboard/booking" },
  { type: "link", label: "Absensi & Kinerja", icon: Target, href: "/dashboard/absensi" },
  { type: "link", label: "Komisi Terapis", icon: Wallet, href: "/dashboard/komisi" },
  { type: "link", label: "Lokasi Cabang", icon: MapPin, href: "/dashboard/lokasi" },
  { type: "link", label: "Laporan", icon: FileText, href: "/dashboard/laporan" },
  { type: "link", label: "Pengaturan", icon: Settings, href: "/dashboard/pengaturan" },
];

export default function AdminSidebar() {
  const path = usePathname();
  const router = useRouter();
  return (
    <aside className="w-52 shrink-0 flex flex-col" style={{ background: "linear-gradient(180deg,#1a1400 0%,#0d0d00 100%)", borderRight: "1px solid #D4AF3730", minHeight: "100vh" }}>
      <div className="flex flex-col items-center py-5 px-3" style={{ borderBottom: "1px solid #D4AF3725" }}>
        <Logo size={72} />
        <p className="text-[10px] tracking-widest mt-1" style={{ color: "#D4AF37" }}>KUYKUY GROUP</p>
      </div>
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "#111", border: "1px solid #D4AF3725" }}>
          <Search size={12} color="#555" />
          <input className="bg-transparent text-xs text-gray-400 flex-1 outline-none placeholder:text-gray-700" placeholder="Quick Search..." />
        </div>
      </div>
      <nav className="flex-1 px-2 overflow-y-auto">
        {navItems.map((item, idx) => {
          if (item.type === "divider") return (<p key={`divider-${idx}`} className="text-[9px] tracking-widest uppercase px-3 py-2 mt-2" style={{ color: "#333" }}>{item.label}</p>);
          const { label, icon: Icon, href } = item;
          const active = path === href;
          return (<Link key={href} href={href} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 transition-all" style={active ? { background: "linear-gradient(90deg,#D4AF3728,#D4AF3710)", borderLeft: "2.5px solid #D4AF37", color: "#D4AF37" } : { color: "#666" }}><Icon size={14} /><span className="text-xs font-medium">{label}</span></Link>);
        })}
      </nav>
      <div className="px-3 pb-5" style={{ borderTop: "1px solid #D4AF3720" }}>
        <button onClick={() => { logout(); router.push("/login"); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg mt-3 text-gray-600 hover:text-red-400 transition-colors"><LogOut size={14} /><span className="text-xs">Logout</span></button>
      </div>
    </aside>
  );
}
