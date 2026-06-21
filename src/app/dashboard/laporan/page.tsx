import AdminPageShell from "@/components/AdminPageShell";
import { TrendingUp, Users, DollarSign, Star } from "lucide-react";

export default function LaporanPage() {
  return (
    <AdminPageShell title="Laporan">
      <div className="grid grid-cols-2 gap-4 mb-5">
        {[
          { label: "Total Pendapatan Bulan Ini", value: "Rp 435.000.000", sub: "+12% dari bulan lalu", icon: DollarSign, positive: true },
          { label: "Total Customer Bulan Ini", value: "1.250", sub: "+8% dari bulan lalu", icon: Users, positive: true },
          { label: "Rating Rata-rata", value: "4.8 / 5.0", sub: "Berdasarkan 320 ulasan", icon: Star, positive: true },
          { label: "Produktivitas Terapis", value: "92%", sub: "+5% dari bulan lalu", icon: TrendingUp, positive: true },
        ].map(({ label, value, sub, icon: Icon, positive }) => (
          <div key={label} className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3740" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs mb-2">{label}</p>
                <p className="font-serif font-bold text-white text-2xl">{value}</p>
                <p className="text-xs mt-1" style={{ color: positive ? "#22c55e" : "#dc2626" }}>{sub}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#D4AF3718" }}>
                <Icon size={20} color="#D4AF37" />
              </div>
            </div>
            <div className="mt-3 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,transparent)" }} />
          </div>
        ))}
      </div>
      <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm" style={{ color: "#D4AF37" }}>Laporan Bulanan</h3>
          <button className="px-4 py-1.5 rounded-lg text-black text-xs font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>Export PDF</button>
        </div>
        {["Januari","Februari","Maret","April","Mei","Juni"].map((bulan, i) => (
          <div key={bulan} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #D4AF3710" }}>
            <span className="text-gray-400 text-sm">{bulan} 2024</span>
            <span style={{ color: "#D4AF37" }} className="font-bold text-sm">Rp {((i + 3) * 50_000_000).toLocaleString()}</span>
            <span className="text-green-400 text-xs">+{(i + 1) * 3}%</span>
            <button className="text-xs px-3 py-1 rounded-lg" style={{ background: "#D4AF3720", color: "#D4AF37", border: "1px solid #D4AF3740" }}>Lihat Detail</button>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
}
