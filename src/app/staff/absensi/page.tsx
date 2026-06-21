"use client";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AbsensiPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState(3);
  const [service, setService] = useState("Massage");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-serif text-xl font-bold tracking-widest text-[#D4AF37]">ABSENSI</h1>
      </div>

      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-6 mb-4">
        <h2 className="font-serif font-bold text-lg mb-5">Input Data Hari Ini</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Jumlah Customer</label>
            <input
              type="number"
              min={0}
              max={20}
              value={customers}
              onChange={e => setCustomers(Number(e.target.value))}
              className="w-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Jenis Layanan</label>
            <select
              value={service}
              onChange={e => setService(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
            >
              <option value="Massage">Massage</option>
              <option value="Facial">Facial</option>
              <option value="Hot Stone">Hot Stone</option>
              <option value="Manicure">Manicure</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="w-full py-3 font-bold text-black rounded-xl gold-gradient hover:opacity-90 transition-opacity text-sm uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Save size={16} />
            {saved ? "TERSIMPAN!" : "SIMPAN"}
          </button>
        </div>
      </div>

      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-1">Total Hari Ini</p>
        <div className="text-3xl font-bold font-serif text-[#D4AF37]">{customers} <span className="text-gray-400 text-xl">Customer</span></div>
        <p className="text-gray-500 text-xs mt-2">Layanan: {service}</p>
      </div>
    </div>
  );
}
