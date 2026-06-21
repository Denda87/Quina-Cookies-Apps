import AdminPageShell from "@/components/AdminPageShell";
import { staffList } from "@/lib/mockData";
import { CheckCircle, XCircle } from "lucide-react";

export default function AbsensiPage() {
  return (
    <AdminPageShell title="Absensi & Kinerja">
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Total Terapis Aktif", value: "28/30" },
          { label: "Rata-rata Rating", value: "4.8/5.0" },
          { label: "Pencapaian Target", value: "92%" },
          { label: "Produktivitas", value: "120%" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3740" }}>
            <p className="text-gray-500 text-xs mb-2">{label}</p>
            <p className="font-serif font-bold text-white text-xl">{value}</p>
            <div className="mt-2 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,transparent)" }} />
          </div>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
        <div className="px-5 py-3" style={{ background: "#D4AF3710", borderBottom: "1px solid #D4AF3720" }}>
          <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>DETAIL KINERJA TERAPIS HARI INI</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid #D4AF3718", background: "#1a1800" }}>
              {["Nama","Role","Status","Jam Masuk","Customer","Target Harian","Target Bulanan","Komisi Est."].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-500 uppercase" style={{ fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staffList.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }} className="hover:bg-[#D4AF3710]">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>{s.name[0]}</div>
                    <span className="text-gray-200">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500">{s.role}</td>
                <td className="px-4 py-4">
                  {s.checkedIn
                    ? <span className="flex items-center gap-1 text-green-400"><CheckCircle size={12} /> Hadir</span>
                    : <span className="flex items-center gap-1 text-red-400"><XCircle size={12} /> Absen</span>}
                </td>
                <td className="px-4 py-4 text-gray-400">{s.checkInTime || "-"}</td>
                <td className="px-4 py-4 font-bold" style={{ color: "#D4AF37" }}>{s.customersToday}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 rounded-full h-1.5" style={{ background: "#222" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${(s.customersToday/s.targetDaily)*100}%`, background: "linear-gradient(90deg,#C9A84C,#D4AF37)" }} />
                    </div>
                    <span className="text-gray-500">{s.customersToday}/{s.targetDaily}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-400">30/100</td>
                <td className="px-4 py-4 font-bold" style={{ color: "#D4AF37" }}>Rp {(s.customersToday * 10000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
}
