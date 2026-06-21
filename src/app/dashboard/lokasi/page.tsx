import AdminPageShell from "@/components/AdminPageShell";
import { MapPin, ExternalLink } from "lucide-react";

const branches = [
  {
    id: 1,
    name: "KUY BM",
    address: "Ruko Bekasi Mas, Jl. Ahmad Yani No.24 Blok B, Rt 004/Rw 003, Marga Jaya, Kec. Bekasi Selatan, Kota Bekasi, Jawa Barat 17141",
    mapsUrl: "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",
    status: "Aktif",
  },
  {
    id: 2,
    name: "KUY BETOS",
    address: "Jl. Cut Mutia No.23 Blok G, Rt 003/Rw 009, Kel. Margahayu, Kec. Bekasi Timur, Kota Bekasi, Jawa Barat 17113",
    mapsUrl: "https://maps.app.goo.gl/vWqKNtksLgPRdye16",
    status: "Aktif",
  },
  {
    id: 3,
    name: "CRYSTAL KUY",
    address: "Ruko Sentral Niaga Kalimalang Blok B1 No.16, Jl. Sentra Niaga Kalimalang No.15, RT.006/RW.011, Kayuringin Jaya, Kec. Bekasi Sel., Kota Bekasi, Jawa Barat 17144",
    mapsUrl: "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",
    status: "Aktif",
  },
  {
    id: 4,
    name: "KUY STORY",
    address: "Ruko Commpark Kota Wisata Blok H No.29, Limus Nunggal, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820",
    mapsUrl: "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",
    status: "Aktif",
  },
  {
    id: 5,
    name: "XI-KUY",
    address: "Jalan Niaga Raya Jababeka 2 Ruko CBD, Blok D No.16-17, Desa Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",
    mapsUrl: "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Strawberry Spa & Therapy",
    address: "Ruko Kawasan Niaga Citra Grand Cibubur, Jl. Alternatif Cibubur No.26, RT.002/RW.008, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435",
    mapsUrl: "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",
    status: "Aktif",
  },
];

export default function LokasiPage() {
  return (
    <AdminPageShell title="Lokasi Cabang">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {branches.map((b) => (
          <div key={b.id} className="rounded-xl p-5 flex flex-col" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3740" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#D4AF3720" }}>
                <MapPin size={16} color="#D4AF37" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-black font-bold text-xs" style={{ background: "#D4AF37" }}>{b.status}</span>
            </div>
            <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: 14 }}>{b.name}</h3>
            <div className="flex items-start gap-1.5 text-gray-500 text-xs mb-3 flex-1">
              <MapPin size={11} className="mt-0.5 shrink-0" />
              <span className="leading-relaxed">{b.address}</span>
            </div>
            <a
              href={b.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold mt-auto"
              style={{ background: "#D4AF3720", color: "#D4AF37", border: "1px solid #D4AF3740" }}
            >
              <ExternalLink size={12} />
              Buka Google Maps
            </a>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
}
