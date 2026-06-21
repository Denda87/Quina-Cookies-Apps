"use client";
import GoldHeader from "@/components/GoldHeader";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import { getUser } from "@/lib/auth";
import { CheckCircle, ChevronRight, Clock, Star, Bell, Zap } from "lucide-react";

const schedule = [
  { time: "09:00", name: "Rina Kusuma", service: "Massage", duration: "60 mnt", done: true },
  { time: "10:30", name: "Dodi Pratama", service: "Facial", duration: "45 mnt", done: true },
  { time: "13:00", name: "Sari Wulandari", service: "Hot Stone", duration: "90 mnt", done: true },
  { time: "15:00", name: "Budi Haryono", service: "Massage", duration: "60 mnt", done: false },
  { time: "16:30", name: "Lina Agustina", service: "Manicure", duration: "45 mnt", done: false },
];

export default function StaffDashboard() {
  const user = getUser();
  const customersToday = 3;
  const targetDaily = 5;
  const rating = 4.8;

  return (
    <div>
      <GoldHeader title="KUYKUY STAFF" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Welcome card */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, #1e1800, #141000, #1a1400)",
            border: "1px solid #D4AF3740",
            boxShadow: "0 4px 20px #00000060",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-widest uppercase">Welcome</p>
              <h2 className="font-serif text-xl font-bold text-white leading-tight mt-0.5">
                {user?.name || "Budi Santoso"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "#D4AF3722", color: "#D4AF37", border: "1px solid #D4AF3740" }}>
                  Therapist
                </span>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#D4AF37" color="#D4AF37" />
                  <span className="text-xs" style={{ color: "#D4AF37" }}>{rating}</span>
                </div>
              </div>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-black font-bold text-2xl shrink-0 font-serif"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #f5e070, #D4AF37, #B8960C)",
                boxShadow: "0 0 20px #D4AF3750",
              }}
            >
              {user?.name?.charAt(0) || "B"}
            </div>
          </div>
        </div>

        {/* Notification */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #1a1000, #111)", border: "1px solid #D4AF3730" }}
        >
          <Bell size={16} color="#D4AF37" />
          <p className="text-gray-400 text-xs flex-1">Pelanggan Rina Kusuma memberi rating bintang 5!</p>
          <span className="text-[10px] text-gray-700">09:32</span>
        </div>

        {/* Check-in */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #0a1a0a, #0d110d)", border: "1px solid #22c55e40" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "#16a34a25" }}>
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-400 text-sm">Sudah Check-In</p>
              <p className="text-gray-500 text-xs">08:15 🔒</p>
            </div>
          </div>
          <ChevronRight size={18} color="#444" />
        </div>

        {/* Customer Hari Ini */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, #1a1800, #161200)", border: "1px solid #D4AF3740" }}
        >
          <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">Customer Hari Ini</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="font-serif font-bold mb-2" style={{ fontSize: 36, color: "#D4AF37" }}>
                {customersToday}
                <span className="text-gray-600 ml-2" style={{ fontSize: 20 }}>/ {targetDaily}</span>
              </div>
              <ProgressBar value={customersToday} max={targetDaily} />
              <p className="text-gray-600 text-xs mt-2">
                {targetDaily - customersToday} customer lagi untuk capai target
              </p>
            </div>
            <CircularProgress value={customersToday} max={targetDaily} />
          </div>
        </div>

        {/* Target Harian */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #1a1800, #161200)", border: "1px solid #D4AF3735" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#D4AF3715" }}>
              <Zap size={18} color="#D4AF37" />
            </div>
            <div>
              <p className="text-gray-500 text-xs tracking-wider">Target Harian</p>
              <p className="font-serif font-bold text-white text-base mt-0.5">
                <span style={{ color: "#D4AF37" }}>{targetDaily}</span> / {targetDaily} Customer
              </p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#D4AF3715", color: "#D4AF37" }}>
            60%
          </span>
        </div>

        {/* Jadwal */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, #141000, #111)", border: "1px solid #D4AF3730" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-xs tracking-widest uppercase">Jadwal Hari Ini</p>
            <Clock size={14} color="#D4AF3780" />
          </div>
          <div className="flex flex-col gap-2">
            {schedule.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={{
                  background: s.done ? "#ffffff06" : "#D4AF3710",
                  border: `1px solid ${s.done ? "#ffffff0a" : "#D4AF3730"}`,
                  opacity: s.done ? 0.6 : 1,
                }}
              >
                <div className="text-center shrink-0" style={{ minWidth: 42 }}>
                  <p className="text-xs font-bold" style={{ color: s.done ? "#666" : "#D4AF37" }}>{s.time}</p>
                </div>
                <div className="w-px h-8 self-stretch" style={{ background: "#D4AF3730" }}/>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${s.done ? "text-gray-600" : "text-white"}`}>
                    {s.name}
                  </p>
                  <p className="text-xs text-gray-600">{s.service} · {s.duration}</p>
                </div>
                {s.done
                  ? <CheckCircle size={15} className="text-green-600 shrink-0" />
                  : <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: "#D4AF3720", color: "#D4AF37" }}>Akan Datang</span>
                }
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
