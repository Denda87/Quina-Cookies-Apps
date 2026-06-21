import AdminPageShell from "@/components/AdminPageShell";
import { MapPin, Phone } from "lucide-react";

const branches = [
  { id: 1, name: "Cabang Pusat - Jakarta Selatan", address: "Jl. Sudirman No. 123, Jakarta Selatan", phone: "(021) 555-0101", staff: 12, status: "Aktif" },
  { id: 2, name: "Cabang Bandung", address: "Jl. Braga No. 45, Bandung", phone: "(022) 555-0202", staff: 8, status: "Aktif" },
  { id: 3, name: "Cabang Surabaya", address: "Jl. Pemuda No. 78, Surabaya", phone: "(031) 555-0303", staff: 8, status: "Aktif" },
];

export default function LokasiPage() {
  return (
    <AdminPageShell title="Lokasi Cabang">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {branches.map((b) => (
          <div key={b.id} className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3740" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#D4AF3720" }}>
                <MapPin size={16} color="#D4AF37" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-black font-bold text-xs" style={{ background: "#D4AF37" }}>{b.status}</span>
            </div>
            <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: 13 }}>{b.name}</h3>
            <div className="flex items-start gap-1.5 text-gray-500 text-xs mb-1">
              <MapPin size={11} className="mt-0.5 shrink-0" />
              <span>{b.address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
              <Phone size={11} />
              <span>{b.phone}</span>
            </div>
            <div className="pt-3" style={{ borderTop: "1px solid #D4AF3720" }}>
              <p className="text-gray-600 text-xs">Total Staf: <span style={{ color: "#D4AF37" }} className="font-bold">{b.staff} orang</span></p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl flex items-center justify-center" style={{ height: 280, background: "#111", border: "1px solid #D4AF3730" }}>
        <div className="text-center text-gray-600">
          <MapPin size={48} className="mx-auto mb-3" style={{ color: "#D4AF3740" }} />
          <p className="text-sm">Peta Lokasi Cabang</p>
          <p className="text-xs mt-1">Google Maps Integration</p>
        </div>
      </div>
    </AdminPageShell>
  );
}
