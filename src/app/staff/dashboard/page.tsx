"use client";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import { getUser } from "@/lib/auth";
import { CheckCircle } from "lucide-react";

export default function StaffDashboard() {
  const user = getUser();
  const customersToday = 3;
  const targetDaily = 5;

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <Logo size={48} />
        </div>
        <h1 className="font-serif text-xl font-bold tracking-widest text-[#D4AF37]">KUYKUY STAFF</h1>
      </div>

      {/* Welcome */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-xl">
            {user?.name?.charAt(0) || "B"}
          </div>
          <div>
            <p className="text-gray-400 text-sm">Selamat datang,</p>
            <h2 className="font-serif text-lg font-bold">{user?.name || "Budi Santoso"}</h2>
            <p className="text-[#D4AF37] text-xs">Therapist</p>
          </div>
        </div>
      </div>

      {/* Check-in Status */}
      <div className="bg-[#111] border border-green-500/30 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3">
          <CheckCircle size={24} className="text-green-400" />
          <div>
            <p className="font-semibold text-green-400">Sudah Check-In</p>
            <p className="text-gray-400 text-sm">08:15</p>
          </div>
        </div>
      </div>

      {/* Customer Today */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-1">Customer Hari Ini</p>
            <div className="text-3xl font-bold font-serif text-[#D4AF37] mb-3">
              {customersToday} <span className="text-gray-500 text-xl">/ {targetDaily}</span>
            </div>
            <ProgressBar value={customersToday} max={targetDaily} />
          </div>
          <div className="ml-6">
            <CircularProgress value={customersToday} max={targetDaily} />
          </div>
        </div>
      </div>

      {/* Target Harian */}
      <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-1">Target Harian</p>
        <div className="text-2xl font-bold font-serif">
          <span className="text-[#D4AF37]">{targetDaily}</span>
          <span className="text-gray-500"> / {targetDaily} Customer</span>
        </div>
        <p className="text-gray-500 text-xs mt-2">Tetap semangat! Kamu sudah {customersToday} dari {targetDaily} customer.</p>
      </div>
    </div>
  );
}
