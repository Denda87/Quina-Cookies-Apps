import AdminPageShell from "@/components/AdminPageShell";
import { staffList } from "@/lib/mockData";
import { CheckCircle, XCircle, Star } from "lucide-react";

export default function StaffPage() {
  return (
    <AdminPageShell title="Terapis / Staf">
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
        <div className="px-5 py-3" style={{ background: "#D4AF3710", borderBottom: "1px solid #D4AF3720" }}>
          <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>DAFTAR TERAPIS AKTIF</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid #D4AF3718", background: "#1a1800" }}>
              {["#","Avatar","Nama","Role","Check-In","Jam Masuk","Customer Hari Ini","Target","Progress"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-500 uppercase" style={{ fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staffList.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }} className="hover:bg-[#D4AF3710]">
                <td className="px-4 py-4 text-gray-600">{i + 1}</td>
                <td className="px-4 py-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>{s.name[0]}</div>
                </td>
                <td className="px-4 py-4 text-gray-200 font-medium">{s.name}</td>
                <td className="px-4 py-4 text-gray-500">{s.role}</td>
                <td className="px-4 py-4">
                  {s.checkedIn
                    ? <span className="flex items-center gap-1 text-green-400"><CheckCircle size={13} /> Sudah</span>
                    : <span className="flex items-center gap-1 text-red-400"><XCircle size={13} /> Belum</span>}
                </td>
                <td className="px-4 py-4 text-gray-400">{s.checkInTime || "-"}</td>
                <td className="px-4 py-4 font-bold" style={{ color: "#D4AF37" }}>{s.customersToday}</td>
                <td className="px-4 py-4 text-gray-400">{s.targetDaily}</td>
                <td className="px-4 py-4 w-28">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-full h-1.5" style={{ background: "#222" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${(s.customersToday / s.targetDaily) * 100}%`, background: "linear-gradient(90deg,#C9A84C,#D4AF37)" }} />
                    </div>
                    <span className="text-gray-500" style={{ fontSize: 9 }}>{s.customersToday}/{s.targetDaily}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
}
