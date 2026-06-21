"use client";
import { useState } from "react";
import GoldHeader from "@/components/GoldHeader";
import { CheckCircle, Clock, Calendar } from "lucide-react";

const history = [
  { date: "21 Jun", in: "08:15", out: "17:00", customers: 3, status: "Hadir" },
  { date: "20 Jun", in: "08:00", out: "17:10", customers: 5, status: "Hadir" },
  { date: "19 Jun", in: "08:20", out: "16:55", customers: 4, status: "Hadir" },
  { date: "18 Jun", in: "-", out: "-", customers: 0, status: "Libur" },
  { date: "17 Jun", in: "08:05", out: "17:05", customers: 5, status: "Hadir" },
];

export default function AbsensiPage() {
  const [customers, setCustomers] = useState(3);
  const [service, setService] = useState("Massage");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <GoldHeader title="ABSENSI" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Status Hari Ini */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0a1a0a,#0d110d)", border: "1px solid #22c55e40" }}>
          <div className="flex items-center gap-3">
            <CheckCircle size={22} color="#4ade80" />
            <div>
              <p className="text-green-400 font-semibold text-sm">Sudah Check-In</p>
              <p className="text-gray-500 text-xs">Senin, 21 Juni 2024 · 08:15</p>
            </div>
          </div>
        </div>

        {/* Input Customer */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">Input Data Hari Ini</p>

          <div className="flex items-center justify-between mb-4">
            <p className="text-white text-sm">Jumlah Customer</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setCustomers(Math.max(0, customers - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>−</button>
              <span className="font-serif font-bold text-xl w-8 text-center" style={{ color: "#D4AF37" }}>{customers}</span>
              <button onClick={() => setCustomers(Math.min(20, customers + 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>+</button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-white text-sm">Jenis Layanan</p>
            <select value={service} onChange={e => setService(e.target.value)} className="bg-transparent text-right text-sm focus:outline-none" style={{ color: "#D4AF37" }}>
              {["Massage","Facial","Hot Stone","Manicure","Pedicure"].map(s => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
            </select>
          </div>

          <button onClick={handleSave} className="w-full py-3.5 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.2em]" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", boxShadow: "0 4px 20px #D4AF3750" }}>
            {saved ? "✓ TERSIMPAN!" : "SIMPAN"}
          </button>
        </div>

        {/* Total */}
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center gap-3">
            <Clock size={18} color="#D4AF37" />
            <p className="text-white font-semibold text-sm">Total Hari Ini</p>
          </div>
          <p className="font-serif font-bold text-xl" style={{ color: "#D4AF37" }}>{customers} Customer</p>
        </div>

        {/* Riwayat */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3730" }}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} color="#D4AF37" />
            <p className="text-gray-400 text-xs tracking-widest uppercase">Riwayat Absensi</p>
          </div>
          <div className="flex flex-col gap-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: "#ffffff06", border: "1px solid #ffffff08" }}>
                <div className="shrink-0" style={{ minWidth: 40 }}>
                  <p className="text-xs font-bold" style={{ color: "#D4AF37" }}>{h.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs">{h.in} – {h.out}</p>
                  <p className="text-gray-600 text-[10px]">{h.customers} customer · {h.service ?? ""}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={h.status === "Hadir" ? { background: "#16a34a20", color: "#4ade80" } : { background: "#D4AF3720", color: "#D4AF37" }}>{h.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
