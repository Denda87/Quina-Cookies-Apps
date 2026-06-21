"use client";
import { useState, useEffect, useCallback } from "react";
import GoldHeader from "@/components/GoldHeader";
import { CheckCircle, Clock, Calendar, LogIn, LogOut, Wifi, WifiOff } from "lucide-react";
import { getUser } from "@/lib/auth";
import { supabase, type Attendance } from "@/lib/supabase";

function today() {
  return new Date().toISOString().split("T")[0];
}
function nowTime() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function AbsensiPage() {
  const user = getUser();
  const staffId = user?.staffId || "ss-2";
  const staffName = user?.name || "Budi Santoso";
  const staffBranch = user?.branch || "Strawberry Spa & Therapy";

  const [record, setRecord] = useState<Attendance | null>(null);
  const [customers, setCustomers] = useState(0);
  const [service, setService] = useState("Reflexologi Kaki");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);

  const fetchRecord = useCallback(async () => {
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("staff_id", staffId)
      .eq("date", today())
      .single();
    if (data) {
      setRecord(data as Attendance);
      setCustomers((data as Attendance).customers_today);
    }
    setLoading(false);
    setOnline(true);
  }, [staffId]);

  useEffect(() => {
    fetchRecord();
    // realtime subscription
    const channel = supabase
      .channel("attendance-staff")
      .on("postgres_changes", { event: "*", schema: "public", table: "attendance", filter: `staff_id=eq.${staffId}` }, () => fetchRecord())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchRecord]);

  const upsertRecord = async (updates: Partial<Omit<Attendance, "id" | "created_at" | "updated_at">>) => {
    if (record) {
      const { error } = await supabase.from("attendance").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", record.id);
      if (!error) fetchRecord();
      else setOnline(false);
    } else {
      const { error } = await supabase.from("attendance").insert({
        staff_id: staffId,
        name: staffName,
        role: "Therapist",
        branch: staffBranch,
        date: today(),
        checked_in: false,
        customers_today: 0,
        target_daily: 5,
        ...updates,
      });
      if (!error) fetchRecord();
      else setOnline(false);
    }
  };

  const handleCheckIn = () => upsertRecord({ checked_in: true, check_in_time: nowTime() });
  const handleCheckOut = () => upsertRecord({ check_out_time: nowTime() });
  const handleSave = async () => {
    await upsertRecord({ customers_today: customers });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div>
        <GoldHeader title="ABSENSI" />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-t-[#D4AF37] border-[#D4AF3720] animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-xs">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GoldHeader title="ABSENSI" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Status koneksi */}
        <div className="rounded-xl px-4 py-2.5 flex items-center gap-2" style={{ background: online ? "#052010" : "#200505", border: `1px solid ${online ? "#22c55e30" : "#ef444430"}` }}>
          {online ? <Wifi size={13} color="#4ade80" /> : <WifiOff size={13} color="#ef4444" />}
          <span className="text-xs" style={{ color: online ? "#4ade80" : "#ef4444" }}>
            {online ? "Terhubung ke server — data real-time" : "Offline — cek koneksi internet"}
          </span>
        </div>

        {/* Info Cabang */}
        <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#1a1800,#111)", border: "1px solid #D4AF3730" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "#D4AF37" }} />
          <p className="text-gray-400 text-xs flex-1">
            <span className="text-gray-600">Cabang: </span>
            <span style={{ color: "#D4AF37" }} className="font-semibold">{record?.branch || staffBranch}</span>
          </p>
          <p className="text-gray-600 text-xs">{today()}</p>
        </div>

        {/* Status Check-In */}
        {record?.checked_in ? (
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0a1a0a,#0d110d)", border: "1px solid #22c55e40" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#22c55e20" }}>
                  <CheckCircle size={24} color="#4ade80" />
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-sm">Sudah Check-In</p>
                  <p className="text-gray-500 text-xs">Jam masuk: {record.check_in_time}</p>
                </div>
              </div>
              {!record.check_out_time && (
                <button onClick={handleCheckOut} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-black" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
                  <LogOut size={13} /> Check-Out
                </button>
              )}
            </div>
            {record.check_out_time && (
              <p className="text-gray-600 text-xs mt-2 ml-14">Jam keluar: {record.check_out_time} 🔒</p>
            )}
          </div>
        ) : (
          <button onClick={handleCheckIn} className="rounded-2xl p-5 flex flex-col items-center justify-center gap-2 w-full" style={{ background: "linear-gradient(135deg,#1a1000,#0f0d00)", border: "1px solid #D4AF3740" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#D4AF3720", border: "2px solid #D4AF3760" }}>
              <LogIn size={28} color="#D4AF37" />
            </div>
            <p className="text-white font-semibold text-sm">Tap untuk Check-In Sekarang</p>
            <p className="text-gray-600 text-xs">{nowTime()} · {staffBranch}</p>
          </button>
        )}

        {/* Input Customer */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#141000)", border: "1px solid #D4AF3740" }}>
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">Input Data Hari Ini</p>

          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white text-sm font-medium">Jumlah Customer</p>
              <p className="text-gray-600 text-xs mt-0.5">Target: {record?.target_daily ?? 5} customer</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setCustomers(Math.max(0, customers - 1))} className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-lg" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>−</button>
              <span className="font-serif font-bold w-10 text-center" style={{ fontSize: 32, color: "#D4AF37" }}>{customers}</span>
              <button onClick={() => setCustomers(Math.min(20, customers + 1))} className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-lg" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>+</button>
            </div>
          </div>

          {/* progress bar */}
          <div className="mb-5">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#D4AF3715" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (customers / (record?.target_daily ?? 5)) * 100)}%`, background: "linear-gradient(90deg,#C9A84C,#f5e070,#D4AF37)" }} />
            </div>
            <p className="text-gray-600 text-xs mt-1 text-right">{Math.round((customers / (record?.target_daily ?? 5)) * 100)}% dari target</p>
          </div>

          <div className="flex items-center justify-between mb-5">
            <p className="text-white text-sm">Jenis Layanan</p>
            <select value={service} onChange={e => setService(e.target.value)} className="bg-transparent text-right text-sm focus:outline-none" style={{ color: "#D4AF37" }}>
              {["Reflexologi Kaki", "Full Body Massage", "Hot Stone Therapy", "Lulur Premium", "Facial", "Manicure", "Pedicure"].map(s => (
                <option key={s} value={s} style={{ background: "#111" }}>{s}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={!record?.checked_in}
            className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.2em] disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", boxShadow: "0 4px 20px #D4AF3750" }}
          >
            {saved ? "✓ TERSIMPAN & TERKIRIM KE ADMIN!" : "SIMPAN & KIRIM KE ADMIN"}
          </button>
          {!record?.checked_in && <p className="text-gray-700 text-xs text-center mt-2">Check-in terlebih dahulu sebelum input data</p>}
        </div>

        {/* Total */}
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#1a1800,#141000)", border: "1px solid #D4AF3740" }}>
          <div className="flex items-center gap-3">
            <Clock size={18} color="#D4AF37" />
            <div>
              <p className="text-white font-semibold text-sm">Total Hari Ini</p>
              <p className="text-gray-600 text-xs">Komisi: Rp {((record?.customers_today ?? 0) * 15000).toLocaleString("id-ID")}</p>
            </div>
          </div>
          <p className="font-serif font-bold text-2xl" style={{ color: "#D4AF37" }}>{record?.customers_today ?? 0} <span className="text-sm text-gray-600">customer</span></p>
        </div>

        {/* Status */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#141000,#0f0d00)", border: "1px solid #D4AF3725" }}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} color="#D4AF37" />
            <p className="text-gray-400 text-xs tracking-widest uppercase">Status Absensi Hari Ini</p>
          </div>
          <div className="rounded-xl px-4 py-3" style={{ background: "#ffffff05", border: "1px solid #ffffff08" }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-xs">Jam Masuk</span>
              <span className="text-white text-xs font-semibold">{record?.check_in_time || "—"}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-xs">Jam Keluar</span>
              <span className="text-white text-xs font-semibold">{record?.check_out_time || "—"}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-xs">Customer</span>
              <span className="font-bold text-sm" style={{ color: "#D4AF37" }}>{record?.customers_today ?? 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">Status</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={record?.checked_in ? { background: "#16a34a20", color: "#4ade80" } : { background: "#D4AF3720", color: "#D4AF37" }}>
                {record?.checked_in ? "Hadir" : "Belum Check-In"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
