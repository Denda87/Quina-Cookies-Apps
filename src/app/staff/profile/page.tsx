"use client";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Phone, TrendingUp, Calendar, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="font-serif text-xl font-bold tracking-widest text-[#D4AF37]">PROFILE</h1>
      </div>

      {/* Avatar & Info */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-6 mb-4 text-center">
        <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-3xl mx-auto mb-3">
          {user?.name?.charAt(0) || "B"}
        </div>
        <h2 className="font-serif text-xl font-bold mb-1">{user?.name || "Budi Santoso"}</h2>
        <p className="text-[#D4AF37] text-sm">Therapist</p>
        <p className="text-gray-500 text-xs mt-1">{user?.email}</p>
      </div>

      {/* Info Cards */}
      <div className="space-y-3 mb-6">
        {[
          { icon: Phone, label: "Nomor HP", value: "+62 812-3456-7890" },
          { icon: TrendingUp, label: "Total Hari Ini", value: "3 Customer" },
          { icon: Calendar, label: "Performa Bulanan", value: "30 / 100 Customer (30%)" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-[#111] border border-[#D4AF37]/20 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Icon size={18} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">{label}</p>
              <p className="font-medium text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 font-bold text-black rounded-xl gold-gradient hover:opacity-90 transition-opacity text-sm uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        LOGOUT
      </button>
    </div>
  );
}
