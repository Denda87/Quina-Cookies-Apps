import AdminPageShell from "@/components/AdminPageShell";

const bookings = [
  { id: "BK-001", customer: "Rina Wijaya", layanan: "Pijat Aromaterapi", terapis: "Budi Santoso", waktu: "10:00 - 11:00", cabang: "Jakarta Selatan", status: "Selesai" },
  { id: "BK-002", customer: "Budi Hartono", layanan: "Pijat Batu Panas", terapis: "Sari Dewi", waktu: "13:00 - 14:30", cabang: "Jakarta Selatan", status: "Berlangsung" },
  { id: "BK-003", customer: "Dewi Lestari", layanan: "Perawatan Wajah", terapis: "Maya Sari", waktu: "15:00 - 16:00", cabang: "Bandung", status: "Menunggu" },
  { id: "BK-004", customer: "Ahmad Fauzi", layanan: "Manikur & Pedikur", terapis: "Sari Dewi", waktu: "16:30 - 17:30", cabang: "Jakarta", status: "Menunggu" },
  { id: "BK-005", customer: "Sinta Rahayu", layanan: "Pijat Aromaterapi", terapis: "Budi Santoso", waktu: "09:00 - 10:00", cabang: "Surabaya", status: "Selesai" },
];

const statusColor: Record<string, string> = {
  "Selesai": "#D4AF37",
  "Berlangsung": "#22c55e",
  "Menunggu": "#f59e0b",
};

export default function BookingPage() {
  return (
    <AdminPageShell title="Reservasi / Booking">
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#D4AF3710", borderBottom: "1px solid #D4AF3720" }}>
          <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>DAFTAR RESERVASI HARI INI</h3>
          <button className="px-4 py-1.5 rounded-lg text-black text-xs font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>+ Buat Reservasi</button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid #D4AF3718", background: "#1a1800" }}>
              {["ID","Customer","Layanan","Terapis","Waktu","Cabang","Status"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-500 uppercase" style={{ fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }} className="hover:bg-[#D4AF3710]">
                <td className="px-4 py-4 text-gray-500">{b.id}</td>
                <td className="px-4 py-4 text-gray-200 font-medium">{b.customer}</td>
                <td className="px-4 py-4 text-gray-400">{b.layanan}</td>
                <td className="px-4 py-4 text-gray-400">{b.terapis}</td>
                <td className="px-4 py-4 text-gray-400">{b.waktu}</td>
                <td className="px-4 py-4 text-gray-500">{b.cabang}</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full text-black font-bold" style={{ fontSize: 9, background: statusColor[b.status] || "#666" }}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
}
