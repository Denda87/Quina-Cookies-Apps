"use client";
import { useState } from "react";
import { supabase, type Service, type Branch } from "@/lib/supabase";
import { CheckCircle, User, Phone, Mail, Calendar, Clock, MapPin, FileText } from "lucide-react";
import Link from "next/link";

type Props = {
  services: Pick<Service, "id" | "name" | "price_idr" | "duration_minutes">[];
  branches: Pick<Branch, "id" | "name">[];
};

export default function BookingForm({ services, branches }: Props) {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    service_id: "",
    branch_id: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const selectedService = services.find(s => s.id === form.service_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const scheduled_at = `${form.date}T${form.time}:00`;

    const { error: err } = await supabase.from("bookings").insert({
      customer_name: form.customer_name,
      phone: form.phone,
      email: form.email || null,
      service_id: form.service_id || null,
      branch_id: form.branch_id || null,
      scheduled_at,
      notes: form.notes || null,
      status: "pending",
    });

    setLoading(false);
    if (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(135deg,#0a1a0a,#0d110d)", border: "1px solid #22c55e40" }}>
        <CheckCircle size={56} color="#4ade80" className="mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-white mb-3">Reservasi Berhasil!</h2>
        <p className="text-gray-400 mb-2">Terima kasih, <span className="text-white font-semibold">{form.customer_name}</span>.</p>
        <p className="text-gray-400 text-sm mb-6">Tim kami akan menghubungi Anda di <span className="text-[#D4AF37]">{form.phone}</span> untuk konfirmasi.</p>
        <div className="rounded-xl p-4 mb-6 text-left" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
          <p className="text-gray-500 text-xs mb-1">Layanan: <span className="text-white">{selectedService?.name}</span></p>
          <p className="text-gray-500 text-xs mb-1">Cabang: <span className="text-white">{branches.find(b => b.id === form.branch_id)?.name}</span></p>
          <p className="text-gray-500 text-xs">Jadwal: <span className="text-white">{form.date} pukul {form.time}</span></p>
        </div>
        <Link href="/" className="inline-block px-8 py-3 text-sm font-semibold text-black rounded-full" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const inputClass = "w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-700";
  const fieldStyle = { background: "linear-gradient(135deg,#141000,#0f0d00)", border: "1px solid #D4AF3745", boxShadow: "inset 0 1px 3px #00000040" };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Nama */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Nama Lengkap *</label>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
          <User size={16} color="#D4AF3780" />
          <input className={inputClass} placeholder="Nama lengkap Anda" required value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Nomor WhatsApp *</label>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
          <Phone size={16} color="#D4AF3780" />
          <input className={inputClass} placeholder="08xx-xxxx-xxxx" required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Email (opsional)</label>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
          <Mail size={16} color="#D4AF3780" />
          <input className={inputClass} placeholder="email@contoh.com" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>

      {/* Layanan */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Pilih Layanan *</label>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
          <span className="text-lg">✨</span>
          <select required className={`${inputClass} flex-1`} value={form.service_id} onChange={e => setForm(f => ({ ...f, service_id: e.target.value }))}>
            <option value="" style={{ background: "#111" }}>-- Pilih layanan --</option>
            {services.map(s => (
              <option key={s.id} value={s.id} style={{ background: "#111" }}>
                {s.name} — Rp {s.price_idr.toLocaleString("id-ID")} ({s.duration_minutes} mnt)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cabang */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Pilih Cabang *</label>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
          <MapPin size={16} color="#D4AF3780" />
          <select required className={`${inputClass} flex-1`} value={form.branch_id} onChange={e => setForm(f => ({ ...f, branch_id: e.target.value }))}>
            <option value="" style={{ background: "#111" }}>-- Pilih cabang --</option>
            {branches.map(b => (
              <option key={b.id} value={b.id} style={{ background: "#111" }}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tanggal & Waktu */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Tanggal *</label>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
            <Calendar size={16} color="#D4AF3780" />
            <input className={inputClass} type="date" required min={new Date().toISOString().split("T")[0]} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ colorScheme: "dark" }} />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Jam *</label>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
            <Clock size={16} color="#D4AF3780" />
            <select required className={`${inputClass} flex-1`} value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}>
              <option value="" style={{ background: "#111" }}>-- Pilih --</option>
              {["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(t => (
                <option key={t} value={t} style={{ background: "#111" }}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Catatan */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Catatan (opsional)</label>
        <div className="flex items-start gap-3 rounded-2xl px-4 py-4" style={fieldStyle}>
          <FileText size={16} color="#D4AF3780" className="mt-0.5 shrink-0" />
          <textarea className={inputClass} placeholder="Informasi tambahan (alergi, preferensi terapis, dll)" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: "none" }} />
        </div>
      </div>

      {/* Summary */}
      {selectedService && form.branch_id && form.date && form.time && (
        <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#D4AF3710", border: "1px solid #D4AF3730" }}>
          <p className="text-gray-400 text-xs mb-1">Ringkasan Reservasi:</p>
          <p className="text-white font-semibold">{selectedService.name} — Rp {selectedService.price_idr.toLocaleString("id-ID")}</p>
          <p className="text-gray-400 text-xs">{branches.find(b => b.id === form.branch_id)?.name} · {form.date} pukul {form.time}</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl px-4 py-3 text-center" style={{ background: "#cc000020", border: "1px solid #cc000040" }}>
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.2em] disabled:opacity-60 mt-2"
        style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#D4AF37,#B8960C)", boxShadow: "0 6px 28px #D4AF3750" }}
      >
        {loading ? "Mengirim..." : "KONFIRMASI RESERVASI"}
      </button>

      <p className="text-center text-gray-700 text-xs">Tim kami akan menghubungi Anda via WhatsApp dalam 1×24 jam</p>
    </form>
  );
}
