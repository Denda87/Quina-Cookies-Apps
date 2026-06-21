"use client";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import GoldHeader from "@/components/GoldHeader";

export default function KinerjaPage() {
  const dailyActual = 3;
  const dailyTarget = 5;
  const monthlyActual = 30;
  const monthlyTarget = 100;

  return (
    <div>
      <GoldHeader title="KINERJA" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Ringkasan */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Hari Ini", value: dailyActual, sub: `dari ${dailyTarget} target` },
            { label: "Bulan Ini", value: monthlyActual, sub: `dari ${monthlyTarget} target` },
            { label: "Rating", value: "4.8★", sub: "Rata-rata pelanggan" },
            { label: "Peringkat", value: "#2", sub: "Di cabang ini" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#141000)", border: "1px solid #D4AF3735" }}>
              <p className="text-gray-600 text-xs mb-1">{label}</p>
              <p className="font-serif font-bold text-2xl" style={{ color: "#D4AF37" }}>{value}</p>
              <p className="text-gray-700 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Target Harian */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center gap-2 mb-3">
            <span>🎯</span>
            <p className="font-semibold text-gray-300 text-sm">Target Harian</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">Hari Ini: <span style={{ color: "#D4AF37" }} className="font-bold">{dailyActual}</span> / {dailyTarget} Customer</p>
              <ProgressBar value={dailyActual} max={dailyTarget} />
              <p className="text-gray-600 text-xs mt-2">{Math.round((dailyActual / dailyTarget) * 100)}% dari target</p>
            </div>
            <CircularProgress value={dailyActual} max={dailyTarget} label="Hari Ini" />
          </div>
        </div>

        {/* Target Bulanan */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center gap-2 mb-3">
            <span>📊</span>
            <p className="font-semibold text-gray-300 text-sm">Target Bulanan</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">April: <span style={{ color: "#D4AF37" }} className="font-bold">{monthlyActual}</span> / {monthlyTarget} Customer</p>
              <ProgressBar value={monthlyActual} max={monthlyTarget} />
              <p className="text-gray-600 text-xs mt-2">{Math.round((monthlyActual / monthlyTarget) * 100)}% dari target</p>
            </div>
            <CircularProgress value={monthlyActual} max={monthlyTarget} label="Bulan Ini" />
          </div>
        </div>

        {/* Riwayat 7 Hari */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3730" }}>
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-3">Riwayat 7 Hari</p>
          <div className="flex items-end justify-between gap-1" style={{ height: 80 }}>
            {[2,4,3,5,3,4,3].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t" style={{ height: `${(v/5)*60}px`, background: i === 6 ? "linear-gradient(180deg,#D4AF37,#B8960C)" : "#D4AF3740" }} />
                <span className="text-[9px] text-gray-600">{["S","S","R","K","J","S","M"][i]}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
