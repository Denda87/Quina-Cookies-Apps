"use client";
import { useState } from "react";
import GoldHeader from "@/components/GoldHeader";
import { Bell, Lock, Globe, Moon, ChevronRight, Shield, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function ToggleRow({ label, sub, value, onChange }: { label: string; sub?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #D4AF3715" }}>
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        {sub && <p className="text-gray-600 text-xs mt-0.5">{sub}</p>}
      </div>
      <button onClick={() => onChange(!value)} className="w-12 h-6 rounded-full relative" style={{ background: value ? "linear-gradient(135deg,#C9A84C,#D4AF37)" : "#222" }}>
        <div className="absolute top-0.5 w-5 h-5 rounded-full" style={{ background: value ? "#000" : "#555", left: value ? "calc(100% - 22px)" : "2px" }} />
      </button>
    </div>
  );
}

function LinkRow({ icon: Icon, label, sub }: { icon: LucideIcon; label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5" style={{ borderBottom: "1px solid #D4AF3715" }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#D4AF3715" }}>
        <Icon size={17} color="#D4AF37" />
      </div>
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{label}</p>
        {sub && <p className="text-gray-600 text-xs mt-0.5">{sub}</p>}
      </div>
      <ChevronRight size={16} color="#444" />
    </div>
  );
}

export default function SettingsPage() {
  const [notifAbsensi, setNotifAbsensi] = useState(true);
  const [notifTarget, setNotifTarget] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div>
      <GoldHeader title="PENGATURAN" />
      <div className="px-4 py-4 flex flex-col gap-4">

        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3730" }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #D4AF3725" }}>
            <Bell size={16} color="#D4AF37" />
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">Notifikasi</p>
          </div>
          <ToggleRow label="Notifikasi Absensi" sub="Pengingat check-in & check-out" value={notifAbsensi} onChange={setNotifAbsensi} />
          <ToggleRow label="Notifikasi Target" sub="Update pencapaian customer harian" value={notifTarget} onChange={setNotifTarget} />
          <ToggleRow label="Notifikasi Promo" sub="Info promo & event Kuykuy Group" value={notifPromo} onChange={setNotifPromo} />
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3730" }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #D4AF3725" }}>
            <Moon size={16} color="#D4AF37" />
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">Tampilan</p>
          </div>
          <ToggleRow label="Mode Gelap" sub="Tema hitam emas premium" value={darkMode} onChange={setDarkMode} />
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3730" }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #D4AF3725" }}>
            <Shield size={16} color="#D4AF37" />
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">Akun &amp; Keamanan</p>
          </div>
          <LinkRow icon={Lock} label="Ubah Password" sub="Perbarui kata sandi akun" />
          <LinkRow icon={Globe} label="Bahasa" sub="Bahasa Indonesia" />
          <LinkRow icon={HelpCircle} label="Bantuan & Dukungan" sub="FAQ dan kontak support" />
        </div>

        <div className="text-center py-2">
          <p className="text-gray-700 text-xs">Kuykuy Group Staff App v1.0.0</p>
          <p className="text-gray-800 text-[10px] mt-0.5">© 2024 Kuykuy Group</p>
        </div>

      </div>
    </div>
  );
}
