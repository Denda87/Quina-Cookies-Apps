"use client";
import { useState, useEffect } from "react";
import GoldHeader from "@/components/GoldHeader";
import { CheckCircle, Clock, Calendar, LogIn, LogOut } from "lucide-react";
import { getUser } from "@/lib/auth";
import { getAttendance, updateAttendance, getMyRecord, type AttendanceRecord } from "@/lib/store";

function nowTime() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function AbsensiPage() {
  const user = getUser();
  const staffId = user?.staffId || "ss-2";

  const [record, setRecord] = useState<AttendanceRecord | undefined>(undefined);
  const [customers, setCustomers] = useState(0);
  const [service, setService] = useState("Massage");
  const [saved, setSaved] = useState(false);

  const refresh = () => {
    const r = getMyRecord(staffId);
    setRecord(r);
    if (r) setCustomers(r.customersToday);
  };

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckIn = () => {
    updateAttendance(staffId, { checkedIn: true, checkInTime: nowTime() });
    refresh();
  };

  const handleCheckOut = () => {
    updateAttendance(staffId, { checkOutTime: nowTime() });
    refresh();
  };

  const handleSave = () => {
    updateAttendance(staffId, { customersToday: customers });
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const history = getAttendance()
    .filter(r => r.staffId === staffId || r.name === (user?.name || "Budi Santoso"))
    .slice(0, 1)
    .map(r => ({
      date: "Hari Ini",
      in: r.checkInTime || "-",
      out: r.checkOutTime || "-",
      customers: r.customersToday,
      status: r.checkedIn ? "Hadir" : "Belum",
    }));

  return (
    <div>
      <GoldHeader title="ABSENSI" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Info Cabang */}
        <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#1a1800,#111)", border: "1px solid #D4AF3730" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "#D4AF37" }} />
          <p className="text-gray-400 text-xs flex-1">Cabang: <span style={{ color: "#D4AF37" }} className="font-semibold">{record?.branch || user?.branch || "-"}</span></p>
        </div>

        {/* Status Check-In */}
        {record?.checkedIn ? (
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0a1a0a,#0d110d)", border: "1px solid #22c55e40" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={22} color="#4ade80" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">Sudah Check-In</p>
                  <p className="text-gray-500 text-xs">Jam masuk: {record.checkInTime}</p>
                </div>
              </div>
              {!record.checkOutTime && (
                <button onClick={handleCheckOut} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-black" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
                  <LogOut size={13} /> Check-Out
                </button>
              )}
            </div>
            {record.checkOutTime && (
              <p className="text-gray-600 text-xs mt-2 ml-9">Jam keluar: {record.checkOutTime} 🔒</p>
            )}
          </div>
        ) : (
          <button onClick={handleCheckIn} className="rounded-2xl p-4 flex items-center justify-center gap-3 w-full" style={{ background: "linear-gradient(135deg,#1a1000,#111)", border: "1px solid #D4AF3730" }}>
            <LogIn size={20} color="#D4AF37" />
            <p className="text-white font-semibold text-sm">Tap untuk Check-In Sekarang</p>
          </button>
        )}

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

          <button onClick={handleSave} disabled={!record?.checkedIn} className="w-full py-3.5 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.2em] disabled:opacity-40" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", boxShadow: "0 4px 20px #D4AF3750" }}>
            {saved ? "✓ TERSIMPAN & TERKIRIM!" : "SIMPAN & KIRIM KE ADMIN"}
          </button>
          {!record?.checkedIn && <p className="text-gray-700 text-xs text-center mt-2">Check-in terlebih dahulu</p>}
        </div>

        {/* Total */}
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center gap-3">
            <Clock size={18} color="#D4AF37" />
            <p className="text-white font-semibold text-sm">Total Hari Ini</p>
          </div>
          <p className="font-serif font-bold text-xl" style={{ color: "#D4AF37" }}>{record?.customersToday ?? 0} Customer</p>
        </div>

        {/* Riwayat */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3730" }}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} color="#D4AF37" />
            <p className="text-gray-400 text-xs tracking-widest uppercase">Status Absensi</p>
          </div>
          <div className="flex flex-col gap-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: "#ffffff06", border: "1px solid #ffffff08" }}>
                <div className="shrink-0" style={{ minWidth: 60 }}>
                  <p className="text-xs font-bold" style={{ color: "#D4AF37" }}>{h.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs">Masuk: {h.in} · Keluar: {h.out}</p>
                  <p className="text-gray-600 text-[10px]">{h.customers} customer</p>
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
