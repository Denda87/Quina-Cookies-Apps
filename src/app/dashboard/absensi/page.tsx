"use client";
import { useState, useEffect } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { getAttendance, type AttendanceRecord } from "@/lib/store";

const BRANCHES = ["Semua", "KUY BM", "KUY BETOS", "CRYSTAL KUY", "KUY STORY", "XI-KUY", "Strawberry Spa & Therapy"];

export default function AbsensiPage() {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("Semua");
  const [lastRefresh, setLastRefresh] = useState("");

  const refresh = () => {
    setData(getAttendance());
    setLastRefresh(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);
    return () => { clearInterval(interval); window.removeEventListener("storage", onStorage); };
  }, []);

  const filtered = selectedBranch === "Semua" ? data : data.filter(r => r.branch === selectedBranch);
  const hadir = data.filter(r => r.checkedIn).length;
  const total = data.length;
  const avgCustomers = total ? Math.round(data.reduce((s, r) => s + r.customersToday, 0) / total) : 0;
  const pctTarget = total ? Math.round(data.filter(r => r.targetDaily > 0).reduce((s, r) => s + (r.customersToday / r.targetDaily), 0) / Math.max(1, data.filter(r => r.targetDaily > 0).length) * 100) : 0;

  return (
    <AdminPageShell title="Absensi & Kinerja">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-2">
        {[
          { label: "Staf Hadir Hari Ini", value: `${hadir}/${total}` },
          { label: "Rata-rata Customer/Staf", value: `${avgCustomers} orang` },
          { label: "Pencapaian Target", value: `${pctTarget}%` },
          { label: "Total Customer Hari Ini", value: `${data.reduce((s, r) => s + r.customersToday, 0)} orang` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3740" }}>
            <p className="text-gray-500 text-xs mb-2">{label}</p>
            <p className="font-serif font-bold text-white text-xl">{value}</p>
            <div className="mt-2 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,transparent)" }} />
          </div>
        ))}
      </div>

      {/* Filter & Refresh */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {BRANCHES.map(b => (
            <button key={b} onClick={() => setSelectedBranch(b)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={selectedBranch === b
                ? { background: "linear-gradient(135deg,#C9A84C,#D4AF37)", color: "#000" }
                : { background: "#D4AF3715", color: "#D4AF3780", border: "1px solid #D4AF3730" }}>
              {b}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-[10px]">Update: {lastRefresh}</span>
          <button onClick={refresh} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#D4AF3720", border: "1px solid #D4AF3740" }}>
            <RefreshCw size={12} color="#D4AF37" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
        <div className="px-5 py-3" style={{ background: "#D4AF3710", borderBottom: "1px solid #D4AF3720" }}>
          <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>
            DETAIL KINERJA — {selectedBranch.toUpperCase()} ({filtered.length} staf)
          </h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid #D4AF3718", background: "#1a1800" }}>
              {["Nama", "Role", "Cabang", "Status", "Jam Masuk", "Jam Keluar", "Customer", "Target Harian", "Komisi Est."].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-500 uppercase" style={{ fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.staffId} style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }} className="hover:bg-[#D4AF3710]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs shrink-0" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>{s.name[0]}</div>
                    <span className="text-gray-200">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{s.role}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ background: "#D4AF3715", color: "#D4AF37", border: "1px solid #D4AF3730" }}>{s.branch}</span>
                </td>
                <td className="px-4 py-3">
                  {s.checkedIn
                    ? <span className="flex items-center gap-1 text-green-400"><CheckCircle size={12} /> Hadir</span>
                    : <span className="flex items-center gap-1 text-red-400"><XCircle size={12} /> Absen</span>}
                </td>
                <td className="px-4 py-3 text-gray-400">{s.checkInTime || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{s.checkOutTime || "—"}</td>
                <td className="px-4 py-3 font-bold" style={{ color: "#D4AF37" }}>{s.customersToday}</td>
                <td className="px-4 py-3">
                  {s.targetDaily > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 rounded-full h-1.5" style={{ background: "#222" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, (s.customersToday / s.targetDaily) * 100)}%`, background: "linear-gradient(90deg,#C9A84C,#D4AF37)" }} />
                      </div>
                      <span className="text-gray-500">{s.customersToday}/{s.targetDaily}</span>
                    </div>
                  ) : <span className="text-gray-700">—</span>}
                </td>
                <td className="px-4 py-3 font-bold" style={{ color: "#D4AF37" }}>
                  {s.targetDaily > 0 ? `Rp ${(s.customersToday * 10000).toLocaleString("id-ID")}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
}
