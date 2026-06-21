"use client";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";

export default function KinerjaPage() {
  const dailyActual = 3;
  const dailyTarget = 5;
  const monthlyActual = 30;
  const monthlyTarget = 100;

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="font-serif text-xl font-bold tracking-widest text-[#D4AF37]">KINERJA</h1>
      </div>

      {/* Target Harian */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-5 mb-4">
        <p className="text-gray-400 text-sm mb-3">Target Harian</p>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-2xl font-bold font-serif mb-1">
              Hari Ini: <span className="text-[#D4AF37]">{dailyActual}</span> / {dailyTarget} Customer
            </div>
            <ProgressBar value={dailyActual} max={dailyTarget} className="mt-3" />
            <p className="text-gray-500 text-xs mt-2">{Math.round((dailyActual/dailyTarget)*100)}% dari target tercapai</p>
          </div>
          <div className="ml-6">
            <CircularProgress value={dailyActual} max={dailyTarget} label="Hari Ini" />
          </div>
        </div>
      </div>

      {/* Target Bulanan */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-3">Target Bulanan</p>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-2xl font-bold font-serif mb-1">
              April: <span className="text-[#D4AF37]">{monthlyActual}</span> / {monthlyTarget} Customer
            </div>
            <ProgressBar value={monthlyActual} max={monthlyTarget} className="mt-3" />
            <p className="text-gray-500 text-xs mt-2">{Math.round((monthlyActual/monthlyTarget)*100)}% dari target bulanan tercapai</p>
          </div>
          <div className="ml-6">
            <CircularProgress value={monthlyActual} max={monthlyTarget} label="Bulan Ini" />
          </div>
        </div>
      </div>
    </div>
  );
}
