"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { supabase, type Attendance } from "@/lib/supabase";
import { weeklyCustomers } from "@/lib/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Users, TrendingUp, Target, FileText, Bell, Mail, Star, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const pieData = [
  { name: "Pijat Aromaterapi", value: 25 },
  { name: "Batu Panas", value: 23 },
  { name: "Facial", value: 22 },
  { name: "Manicure", value: 18 },
  { name: "Lainnya", value: 12 },
];
const PIE_COLORS = ["#D4AF37", "#C9A84C", "#f0d060", "#B8960C", "#666"];

const trendData = [
  { month: "Jul", reservasi: 250 }, { month: "Agu", reservasi: 400 },
  { month: "Sep", reservasi: 320 }, { month: "Okt", reservasi: 600 },
  { month: "Nov", reservasi: 800 }, { month: "Des", reservasi: 1100 },
  { month: "Jan", reservasi: 950 },
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
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [lastRefresh, setLastRefresh] = useState("");

  const fetchAttendance = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("date", today)
      .order("checked_in", { ascending: false });
    if (data) setAttendance(data as Attendance[]);
    setLastRefresh(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
  };

  useEffect(() => {
    fetchAttendance();
    // Realtime subscription — update immediately when any staff checks in
    const channel = supabase
      .channel("attendance-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "attendance" }, () => fetchAttendance())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const hadir = attendance.filter(r => r.checked_in).length;
  const totalStaf = attendance.length;
  const totalCustomers = attendance.reduce((s, r) => s + r.customers_today, 0);

  const displayStaff = [...attendance]
    .sort((a, b) => (b.checked_in ? 1 : 0) - (a.checked_in ? 1 : 0))
    .slice(0, 8);

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
            style={{ fontSize: 30, background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            DASHBOARD ADMIN
          </h1>
          <p className="text-gray-600 text-xs tracking-[0.2em]">KUYKUY GROUP</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#D4AF37" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            <span className="text-gray-600">Live · {lastRefresh}</span>
            <button onClick={fetchAttendance} className="ml-1"><RefreshCw size={12} color="#555" /></button>
          </div>
          <Mail size={18} color="#555" className="cursor-pointer" />
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
          <StatCard label="Staf Hadir Hari Ini" value={`${hadir}/${totalStaf}`} />
          <StatCard label="Total Customer Hari Ini" value={`${totalCustomers} orang`} />
          <StatCard label="Pendapatan Bulan Ini" value="Rp 435.000.000" />
          <StatCard label="Pencapaian Target Rata-rata" value={`${totalStaf ? Math.round(attendance.filter(r => r.target_daily > 0).reduce((s, r) => s + (r.customers_today / r.target_daily), 0) / Math.max(1, attendance.filter(r => r.target_daily > 0).length) * 100) : 0}%`} />
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
            <button key={label} className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-black transition-all hover:opacity-85" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)", boxShadow: "0 2px 16px #D4AF3728" }}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* TABLES */}
        <div className="grid grid-cols-2 gap-4">
          {/* Status Staf Live */}
          <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #D4AF3720", background: "#D4AF3710" }}>
              <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>STATUS STAF REAL-TIME</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                <span className="text-[9px] text-gray-600">LIVE</span>
              </div>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #D4AF3718" }}>
                  {["Nama", "Cabang", "Status", "Masuk", "Customer", "Target"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-gray-600 uppercase" style={{ fontSize: 9 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayStaff.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid #D4AF3710" }} className="hover:bg-[#D4AF3708]">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-[10px]" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>{s.name[0]}</div>
                        <span className="text-gray-300" style={{ fontSize: 11 }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-gray-600" style={{ fontSize: 9 }}>{s.branch.replace("Strawberry Spa & Therapy", "Strawberry")}</td>
                    <td className="px-2 py-3">
                      {s.checked_in
                        ? <span className="flex items-center gap-0.5 text-green-400"><CheckCircle size={10} /> Hadir</span>
                        : <span className="flex items-center gap-0.5 text-red-400"><XCircle size={10} /> Absen</span>}
                    </td>
                    <td className="px-2 py-3 text-gray-500" style={{ fontSize: 10 }}>{s.check_in_time || "—"}</td>
                    <td className="px-2 py-3 font-bold" style={{ color: "#D4AF37", fontSize: 11 }}>{s.customers_today}</td>
                    <td className="px-2 py-3">
                      {s.target_daily > 0 ? (
                        <div className="flex items-center gap-1">
                          <div className="w-10 rounded-full h-1" style={{ background: "#222" }}>
                            <div className="h-1 rounded-full" style={{ width: `${Math.min(100, (s.customers_today / s.target_daily) * 100)}%`, background: "#D4AF37" }} />
                          </div>
                          <span className="text-gray-600" style={{ fontSize: 9 }}>{s.customers_today}/{s.target_daily}</span>
                        </div>
                      ) : <span className="text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Per Cabang Summary */}
          <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid #D4AF3720", background: "#D4AF3710" }}>
              <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>RINGKASAN PER CABANG</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #D4AF3718" }}>
                  {["Cabang", "Staf Hadir", "Total Customer", "Pencapaian"].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-gray-600 uppercase" style={{ fontSize: 9 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["KUY BM", "KUY BETOS", "CRYSTAL KUY", "KUY STORY", "XI-KUY", "Strawberry Spa & Therapy"].map((branch, i) => {
                  const branchData = attendance.filter(r => r.branch === branch);
                  const hadirCount = branchData.filter(r => r.checked_in).length;
                  const custCount = branchData.reduce((s, r) => s + r.customers_today, 0);
                  const therapists = branchData.filter(r => r.target_daily > 0);
                  const pct = therapists.length ? Math.round(therapists.reduce((s, r) => s + (r.customers_today / r.target_daily), 0) / therapists.length * 100) : 0;
                  return (
                    <tr key={branch} style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }} className="hover:bg-[#D4AF3708]">
                      <td className="px-4 py-3 text-gray-200" style={{ fontSize: 11 }}>{branch.replace("Strawberry Spa & Therapy", "Strawberry Spa")}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold" style={{ color: hadirCount > 0 ? "#4ade80" : "#ef4444" }}>{hadirCount}</span>
                        <span className="text-gray-600">/{branchData.length}</span>
                      </td>
                      <td className="px-4 py-3 font-bold" style={{ color: "#D4AF37" }}>{custCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-14 rounded-full h-1.5" style={{ background: "#222" }}>
                            <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: pct >= 80 ? "#D4AF37" : pct >= 50 ? "#f59e0b" : "#ef4444" }} />
                          </div>
                          <span className="text-gray-500" style={{ fontSize: 9 }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
