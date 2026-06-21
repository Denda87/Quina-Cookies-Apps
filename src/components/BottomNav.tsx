"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart2, User } from "lucide-react";

const navItems = [
  { href: "/staff/dashboard", label: "Dashboard", icon: Home },
  { href: "/staff/absensi", label: "Absensi", icon: Clock },
  { href: "/staff/kinerja", label: "Kinerja", icon: BarChart2 },
  { href: "/staff/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#D4AF37]/30 flex justify-around py-2 z-50">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = path === href;
        return (
          <Link key={href} href={href} className={`flex flex-col items-center gap-1 px-4 py-1 ${active ? "text-[#D4AF37]" : "text-gray-500"}`}>
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
