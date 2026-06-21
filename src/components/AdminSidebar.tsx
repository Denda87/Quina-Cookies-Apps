"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { LayoutDashboard, Users, Clock, BarChart2, FileText, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/staff", label: "Staff", icon: Users },
  { href: "/dashboard/absensi", label: "Absensi", icon: Clock },
  { href: "/dashboard/kinerja", label: "Kinerja", icon: BarChart2 },
  { href: "/dashboard/laporan", label: "Laporan", icon: FileText },
  { href: "/dashboard/pengaturan", label: "Pengaturan", icon: Settings },
];

export default function AdminSidebar() {
  const path = usePathname();
  return (
    <aside className="w-64 bg-[#111] border-r border-[#D4AF37]/20 flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#D4AF37]/20">
        <Logo size={36} />
        <div>
          <div className="text-[#D4AF37] font-serif font-bold text-lg leading-tight">KUYKUY</div>
          <div className="text-gray-400 text-xs">Admin Panel</div>
        </div>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${active ? "text-[#D4AF37] bg-[#D4AF37]/10 border-r-2 border-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
