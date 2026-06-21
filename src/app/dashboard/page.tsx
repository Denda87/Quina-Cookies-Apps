"use client";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { staffList, weeklyCustomers } from "@/lib/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import {
  Users, TrendingUp, Building2, LogOut, CheckCircle, XCircle,
  Search, LayoutDashboard, UserCog, Layers, CalendarClock,
  Target, FileText, Settings, Star, Bell, Mail
} from "lucide-react";
import Logo from "@/components/Logo";

const pieData = [
  { name: "Pijat Aromaterapi", value: 25 },
  { name: "Batu Panas", value: 23 },
  { name: "Bonus Target", value: 22 },
  { name: "Komisi Produk", value: 18 },
  { name: "Lainnya", value: 12 },
];
const PIE_COLORS = ["#D4AF37", "#C9A84C", "#B8960C", "#f0d060", "#888"];

const trendData = [
  { month: "Jul", reservasi: 250, pendapatan: 3 },
  { month: "Agu", reservasi: 400, pendapatan: 5 },
  { month: "Sep", reservasi: 320, pendapatan: 4 },
  { month: "Okt", reservasi: 600, pendapatan: 7 },
  { month: "Nov", reservasi: 800, pendapatan: 9 },
  { month: "Des", reservasi: 1100, pendapatan: 13 },
  { month: "Jan", reservasi: 950, pendapatan: 11 },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Terapis/Staf", icon: UserCog, href: "/dashboard/staff" },
  { label: "Layanan Spa", icon: Layers, href: "#" },
  { label: "Reservasi/Booking", icon: CalendarClock, href: "#" },
  { label: "Absensi & Kinerja", icon: Target, href: "#" },
  { label: "Lokasi Cabang", icon: Building2, href: "#" },
  { label: "Laporan", icon: FileText, href: "#" },
  { label: "Pengaturan", icon: Settings, href: "#" },
];

const statuses = [
  { name: "Budi Santoso", cabang: "Jakarta", status: "Online", absensi: "Tepat Waktu", harian: "3/5", bulanan: "30/100", rating: 8 },
  { name: "Sari Dewi", cabang: "Jakarta", status: "Memijat", absensi: "Terlambat", harian: "3/5", bulanan: "30/100", rating: 8 },
  { name: "Rina Rina", cabang: "Jakarta", status: "Memijat", absensi: "Terlambat", harian: "3/5", bulanan: "30/100", rating: 5 },
  { name: "Maya Sari", cabang: "Jakarta", status: "Online", absensi: "Terlambat", harian: "3/5", bulanan: "30/100", rating: 4 },
];

export default function AdminDashboard() {
  const router = useRouter();
  const user = getUser();

  return (
    <div className="flex min-h-screen" style={{ background: "#0a0a06", fontFamily: "sans-serif" }}>

      {/* ====== SIDEBAR ====== */}
      <aside className="w-56 shrink-0 flex flex-col" style={{ background: "linear-gradient(180deg,#1a1400 0%,#0d0d00 100%)", borderRight: "1px solid #D4AF3730" }}>
        {/* Logo */}
        <div className="flex flex-col items-center py-6 px-3" style={{ borderBottom: "1px solid #D4AF3725" }}>
          <Logo size={70} />
        </div>
        {/* Search */}
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "#111", border: "1px solid #D4AF3730" }}>
            <Search size={13} color="#666" />
            <input className="bg-transparent text-xs text-gray-400 flex-1 outline-none placeholder:text-gray-700" placeholder="Quick Search..." />
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-2 pb-4">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 text-left transition-all"
              style={active
                ? { background: "linear-gradient(90deg,#D4AF3730,#D4AF3710)", borderLeft: "2px solid #D4AF37", color: "#D4AF37" }
                : { color: "#666" }}
            >
              <Icon size={14} />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </nav>
        {/* User */}
        <div className="px-3 pb-4" style={{ borderTop: "1px solid #D4AF3720" }}>
          <div className="flex flex-col items-center gap-1 pt-4">
            <Logo size={36} />
            <p className="text-xs text-gray-400">{user?.name || "Admin Kuykuy"}</p>
            <p className="text-[10px] text-gray-700">Super Admin</p>
          </div>
        </div>
      </aside>

      {/* ====== MAIN ====== */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* ---- TOP HEADER ---- */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{ background: "linear-gradient(90deg,#1a1400,#0d0d00)", borderBottom: "1px solid #D4AF3730" }}
        >
          <div className="flex items-center gap-4">
            <Logo size={52} />
            <div>
              <h1
                className="font-serif font-bold leading-tight"
                style={{ fontSize: 28, background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                DASHBOARD ADMIN
              </h1>
              <p className="text-gray-600 text-xs tracking-wider">KUYKUY GROUP</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <Mail size={20} color="#666" />
            </div>
            <div className="relative cursor-pointer">
              <Bell size={20} color="#666" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold text-black" style={{ background: "#D4AF37" }}>3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
                A
              </div>
              <div>
                <p className="text-white text-xs font-semibold">{user?.name || "Admin Kuykuy"}</p>
                <p className="text-gray-600 text-[10px]">Super Admin</p>
              </div>
            </div>
            <button onClick={() => { logout(); router.push("/login"); }} className="flex items-center gap-1 text-gray-600 hover:text-red-400 text-xs">
              <LogOut size={14} />
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">

          {/* ---- STATS CARDS ---- */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Reservasi (Bulan Ini)", value: "1,250", sub: "" },
              { label: "Pendapatan (Bulan Ini)", value: "Rp 435.000.000", sub: "" },
              { label: "Staf Aktif (Hari Ini)", value: "28/30", sub: "" },
              { label: "Kinerja Rata-rata Terapis", value: "92%", sub: "" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{ background: "linear-gradient(135deg,#1c1800,#141400)", border: "1px solid #D4AF3740" }}
              >
                <p className="text-gray-500 text-xs mb-2 leading-tight">{label}</p>
                <p className="font-serif font-bold text-white" style={{ fontSize: 22 }}>{value}</p>
                <div className="mt-3 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,#B8960C,transparent)" }} />
              </div>
            ))}
          </div>

          {/* ---- CHARTS ROW ---- */}
          <div className="grid grid-cols-3 gap-4">
            {/* Line Chart */}
            <div className="col-span-2 rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#141400)", border: "1px solid #D4AF3730" }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#D4AF37" }}>Tren Reservasi & Pendapatan (6 Bulan)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2500" />
                  <XAxis dataKey="month" stroke="#555" tick={{ fill: "#888", fontSize: 11 }} />
                  <YAxis stroke="#555" tick={{ fill: "#888", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#1a1400", border: "1px solid #D4AF3750", borderRadius: 8, color: "#fff" }} />
                  <Line type="monotone" dataKey="reservasi" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", r: 4 }} name="Reservasi" />
                  <Line type="monotone" dataKey="pendapatan" stroke="#C9A84C" strokeWidth={2} strokeDasharray="4 2" dot={false} name="Pendapatan (Juta)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#141400)", border: "1px solid #D4AF3730" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "#D4AF37" }}>Distribusi Layanan Terpopuler</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1a1400", border: "1px solid #D4AF3750", fontSize: 11, color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-1">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-gray-400" style={{ fontSize: 10 }}>{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---- QUICK MANAGEMENT ---- */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Undang Staf Baru", icon: Users },
              { label: "Buat Promo Website", icon: TrendingUp },
              { label: "Laporan Bulanan", icon: FileText },
              { label: "Buat Target Baru", icon: Target },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)", boxShadow: "0 2px 12px #D4AF3730" }}
              >
                <Icon size={14} />
                <span style={{ fontSize: 11 }}>{label}</span>
              </button>
            ))}
          </div>

          {/* ---- TABLES ROW ---- */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status Terapis */}
            <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1800,#141400)", border: "1px solid #D4AF3730" }}>
              <div className="px-5 py-3" style={{ borderBottom: "1px solid #D4AF3720" }}>
                <h3 className="font-semibold text-sm" style={{ color: "#D4AF37" }}>STATUS TERAPIS SAAT INI</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #D4AF3720" }}>
                      {["Nama", "Cabang", "Status", "Absensi", "Target", "Rating"].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-gray-500 uppercase tracking-wider" style={{ fontSize: 10 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {statuses.map((s, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #D4AF3710" }} className="hover:bg-[#D4AF3708]">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>{s.name.charAt(0)}</div>
                            <span className="text-gray-300" style={{ fontSize: 11 }}>{s.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-400">{s.cabang}</td>
                        <td className="px-3 py-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-black font-bold"
                            style={{ fontSize: 9, background: s.status === "Online" ? "#22c55e" : "#D4AF37" }}
                          >{s.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-white font-semibold"
                            style={{ fontSize: 9, background: s.absensi === "Tepat Waktu" ? "#16a34a" : "#dc2626" }}
                          >{s.absensi}</span>
                        </td>
                        <td className="px-3 py-3 text-gray-400">{s.harian}</td>
                        <td className="px-3 py-3">
                          <span style={{ color: "#D4AF37", fontSize: 11 }}>{"★".repeat(Math.min(s.rating, 5))}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reservasi Terbaru */}
            <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1800,#141400)", border: "1px solid #D4AF3730" }}>
              <div className="px-5 py-3" style={{ borderBottom: "1px solid #D4AF3720" }}>
                <h3 className="font-semibold text-sm" style={{ color: "#D4AF37" }}>RESERVASI TERBARU</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #D4AF3720" }}>
                      {["ID", "Customer", "Layanan", "Waktu", "Status"].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-gray-500 uppercase tracking-wider" style={{ fontSize: 10 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "10000001", name: "Rina", layanan: "Massage", waktu: "13:00", status: "Selesai" },
                      { id: "10100002", name: "Budi Santoso", layanan: "Pijat", waktu: "16:00", status: "Selesai" },
                      { id: "10100003", name: "Customer", layanan: "Layanan", waktu: "19:30", status: "Baru" },
                      { id: "10100004", name: "Budi Santoso", layanan: "Massage", waktu: "19:50", status: "Baru" },
                      { id: "10100005", name: "Budi Santoso", layanan: "Layanan", waktu: "19:50", status: "Baru" },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #D4AF3710" }} className="hover:bg-[#D4AF3708]">
                        <td className="px-3 py-3 text-gray-500" style={{ fontSize: 10 }}>{r.id}</td>
                        <td className="px-3 py-3 text-gray-300" style={{ fontSize: 11 }}>{r.name}</td>
                        <td className="px-3 py-3 text-gray-400">{r.layanan}</td>
                        <td className="px-3 py-3 text-gray-400">{r.waktu}</td>
                        <td className="px-3 py-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-black font-bold"
                            style={{ fontSize: 9, background: r.status === "Selesai" ? "#D4AF37" : "#22c55e" }}
                          >{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
