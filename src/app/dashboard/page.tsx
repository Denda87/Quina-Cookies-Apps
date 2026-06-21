"use client";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { staffList, weeklyCustomers } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, UserCheck, TrendingUp, Building2, LogOut, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const user = getUser();
  const handleLogout = () => { logout(); router.push("/login"); };
  const totalCustomers = staffList.reduce((a, s) => a + s.customersToday, 0);
  const targetAchieved = staffList.filter(s => s.customersToday >= s.targetDaily).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#D4AF37]">Dashboard Admin</h1>
          <p className="text-gray-400 mt-1">Selamat datang, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Staff", value: staffList.length, icon: Users, color: "text-blue-400" },
          { label: "Customer Hari Ini", value: totalCustomers, icon: UserCheck, color: "text-green-400" },
          { label: "Target Tercapai", value: `${targetAchieved}/${staffList.length}`, icon: TrendingUp, color: "text-[#D4AF37]" },
          { label: "Cabang Aktif", value: 3, icon: Building2, color: "text-purple-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-[#D4AF37]/20 rounded-xl p-5">
            <div className={`mb-3 ${color}`}><Icon size={24} /></div>
            <div className="text-2xl font-bold font-serif mb-1">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#111] border border-[#D4AF37]/20 rounded-xl p-6">
          <h2 className="font-serif font-bold text-lg mb-4">Customer Per Hari (Minggu Ini)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyCustomers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#666" tick={{fill: "#999", fontSize: 12}} />
              <YAxis stroke="#666" tick={{fill: "#999", fontSize: 12}} />
              <Tooltip contentStyle={{background: "#1a1a1a", border: "1px solid #D4AF3740", borderRadius: 8}} />
              <Bar dataKey="customers" fill="#D4AF37" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-[#111] border border-[#D4AF37]/20 rounded-xl p-6">
          <h2 className="font-serif font-bold text-lg mb-4">Aktivitas Terkini</h2>
          <div className="space-y-3">
            {[
              { msg: "Sari Dewi mencapai target harian", time: "10:30", type: "success" },
              { msg: "Maya Sari check-in pagi", time: "07:55", type: "info" },
              { msg: "Ahmad Fauzi belum check-in", time: "09:00", type: "warn" },
              { msg: "3 customer baru terdaftar", time: "11:00", type: "success" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type === "success" ? "bg-green-400" : a.type === "warn" ? "bg-yellow-400" : "bg-blue-400"}`} />
                <div className="flex-1">
                  <p className="text-gray-300">{a.msg}</p>
                  <p className="text-gray-500 text-xs">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#D4AF37]/10">
          <h2 className="font-serif font-bold text-lg">Daftar Staff</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/10">
                {["Nama", "Role", "Status Check-In", "Jam Masuk", "Customer Hari Ini", "Progress Target"].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {staffList.map(s => (
                <tr key={s.id} className="hover:bg-[#D4AF37]/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{s.role}</td>
                  <td className="px-6 py-4">
                    {s.checkedIn
                      ? <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle size={14}/> Sudah</span>
                      : <span className="flex items-center gap-1 text-red-400 text-sm"><XCircle size={14}/> Belum</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{s.checkInTime || "-"}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#D4AF37]">{s.customersToday}</td>
                  <td className="px-6 py-4 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full gold-gradient" style={{width: `${(s.customersToday/s.targetDaily)*100}%`}} />
                      </div>
                      <span className="text-xs text-gray-400">{s.customersToday}/{s.targetDaily}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
