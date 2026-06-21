"use client";
import { getUser } from "@/lib/auth";
import { staffList, weeklyCustomers } from "@/lib/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Users, TrendingUp, Target, FileText, Bell, Mail, Star } from "lucide-react";

const pieData = [
  { name: "Pijat Aromaterapi", value: 25 },
  { name: "Batu Panas", value: 23 },
  { name: "Bonus Target", value: 22 },
  { name: "Komisi Produk", value: 18 },
  { name: "Lainnya", value: 12 },
];
const PIE_COLORS = ["#D4AF37", "#C9A84C", "#f0d060", "#B8960C", "#666"];

const trendData = [
  { month: "Jul", reservasi: 250 }, { month: "Agu", reservasi: 400 },
  { month: "Sep", reservasi: 320 }, { month: "Okt", reservasi: 600 },
  { month: "Nov", reservasi: 800 }, { month: "Des", reservasi: 1100 },
  { month: "Jan", reservasi: 950 },
];

const statuses = [
  { name: "Budi Santoso", cabang: "Jakarta Selatan", status: "Online", absensi: "Tepat Waktu", harian: "3/5", bulanan: "30/100", rating: 4 },
  { name: "Sari Dewi", cabang: "Jakarta Selatan", status: "Memijat", absensi: "Terlambat", harian: "3/5", bulanan: "30/100", rating: 4 },
  { name: "Rina Rina", cabang: "Jakarta", status: "Memijat", absensi: "Terlambat", harian: "3/5", bulanan: "30/100", rating: 3 },
  { name: "Maya Sari", cabang: "Jakarta", status: "Online", absensi: "Terlambat", harian: "3/5", bulanan: "30/100", rating: 2 },
];

const reservasi = [
  { id: "10000001", name: "Rina", layanan: "Massage", waktu: "13:00-13:00", cabang: "Jakarta", status: "Selesai" },
  { id: "10100002", name: "Budi Santoso", layanan: "Pijat", waktu: "16:00-15:00", cabang: "Jakarta", status: "Selesai" },
  { id: "10100003", name: "Customer", layanan: "Layanan", waktu: "19:30-12:90", cabang: "Jakarta", status: "Baru" },
  { id: "10100004", name: "Budi Santoso", layanan: "Message", waktu: "19:50-18:90", cabang: "Jakarta", status: "Baru" },
  { id: "10100005", name: "Budi Santoso", layanan: "Layanan", waktu: "19:50-17:90", cabang: "Jakarta", status: "Selesai" },
];

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3740" }}>
      <p className="text-gray-500 text-xs mb-3 leading-snug">{label}</p>
      <p className="font-serif font-bold text-white" style={{ fontSize: 24 }}>{value}</p>
      <div className="mt-3 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,#B8960C,transparent)" }} />
    </div>
  );
}

export default function AdminDashboard() {
  const user = getUser();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#080800" }}>
      {/* HEADER */}
      <div
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
        style={{ background: "linear-gradient(90deg,#1a1400,#0d0d00)", borderBottom: "1px solid #D4AF3730" }}
      >
        <div>
          <h1
            className="font-serif font-bold leading-tight"
            style={{
              fontSize: 30,
              background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            DASHBOARD ADMIN
          </h1>
          <p className="text-gray-600 text-xs tracking-[0.2em]">KUYKUY GROUP</p>
        </div>
        <div className="flex items-center gap-4">
          <Mail size={18} color="#555" className="cursor-pointer hover:text-[#D4AF37]" />
          <div className="relative cursor-pointer">
            <Bell size={18} color="#555" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold text-black" style={{ background: "#D4AF37" }}>3</span>
          </div>
          <div className="flex items-center gap-2.5 pl-3" style={{ borderLeft: "1px solid #D4AF3730" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>A</div>
            <div>
              <p className="text-white text-xs font-semibold">{user?.name || "Admin Kuykuy"}</p>
              <p className="text-gray-600 text-[10px]">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Reservasi (Bulan Ini)" value="1,250" />
          <StatCard label="Pendapatan (Bulan Ini)" value="Rp 435.000.000" />
          <StatCard label="Staf Aktif (Hari Ini)" value="28/30" />
          <StatCard label="Kinerja Rata-rata Terapis" value="92%" />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#D4AF37" }}>Tren Reservasi & Pendapatan (6 Bulan)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2500" />
                <XAxis dataKey="month" stroke="#444" tick={{ fill: "#777", fontSize: 11 }} />
                <YAxis stroke="#444" tick={{ fill: "#777", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#1a1400", border: "1px solid #D4AF3750", borderRadius: 8, color: "#fff" }} />
                <Line type="monotone" dataKey="reservasi" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: "#D4AF37" }}>Distribusi Layanan Terpopuler</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={38} outerRadius={65} dataKey="value" paddingAngle={2}>
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1400", border: "1px solid #D4AF3750", fontSize: 11, color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-gray-500" style={{ fontSize: 10 }}>{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK MANAGEMENT */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Undang Staf Baru", icon: Users },
            { label: "Buat Promo Website", icon: TrendingUp },
            { label: "Laporan Bulanan", icon: FileText },
            { label: "Buat Target Baru", icon: Target },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-black transition-all hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)", boxShadow: "0 2px 16px #D4AF3728" }}
            >
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* TABLES */}
        <div className="grid grid-cols-2 gap-4">
          {/* Status Terapis */}
          <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid #D4AF3720", background: "#D4AF3710" }}>
              <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>STATUS TERAPIS SAAT INI</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #D4AF3718" }}>
                  {["Foto","Nama","Cabang","Status","Absensi","Target","Rating"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-gray-600 uppercase" style={{ fontSize: 9 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {statuses.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #D4AF3710" }} className="hover:bg-[#D4AF3708]">
                    <td className="px-3 py-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>{s.name[0]}</div>
                    </td>
                    <td className="px-2 py-3 text-gray-300" style={{ fontSize: 11 }}>{s.name}</td>
                    <td className="px-2 py-3 text-gray-500" style={{ fontSize: 10 }}>{s.cabang}</td>
                    <td className="px-2 py-3">
                      <span className="px-2 py-0.5 rounded-full text-black font-bold" style={{ fontSize: 9, background: s.status === "Online" ? "#22c55e" : "#D4AF37" }}>{s.status}</span>
                    </td>
                    <td className="px-2 py-3">
                      <span className="px-2 py-0.5 rounded-full text-white" style={{ fontSize: 9, background: s.absensi === "Tepat Waktu" ? "#16a34a" : "#dc2626" }}>{s.absensi}</span>
                    </td>
                    <td className="px-2 py-3 text-gray-400" style={{ fontSize: 10 }}>{s.harian}</td>
                    <td className="px-2 py-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={10} fill={j < s.rating ? "#D4AF37" : "none"} color={j < s.rating ? "#D4AF37" : "#333"} />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reservasi Terbaru */}
          <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid #D4AF3720", background: "#D4AF3710" }}>
              <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>RESERVASI TERBARU</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #D4AF3718" }}>
                  {["ID Booking","Customer","Layanan","Waktu","Cabang","Status"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-gray-600 uppercase" style={{ fontSize: 9 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservasi.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #D4AF3710" }} className="hover:bg-[#D4AF3708]">
                    <td className="px-3 py-3 text-gray-600" style={{ fontSize: 9 }}>{r.id}</td>
                    <td className="px-2 py-3 text-gray-300" style={{ fontSize: 11 }}>{r.name}</td>
                    <td className="px-2 py-3 text-gray-500" style={{ fontSize: 10 }}>{r.layanan}</td>
                    <td className="px-2 py-3 text-gray-500" style={{ fontSize: 10 }}>{r.waktu}</td>
                    <td className="px-2 py-3 text-gray-500" style={{ fontSize: 10 }}>{r.cabang}</td>
                    <td className="px-2 py-3">
                      <span className="px-2 py-0.5 rounded-full text-black font-bold" style={{ fontSize: 9, background: r.status === "Selesai" ? "#D4AF37" : "#22c55e" }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
