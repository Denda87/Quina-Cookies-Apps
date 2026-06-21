"use client";
import { getUser } from "@/lib/auth";
import { getMyRecord } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle, Clock, Star, Bell, Zap, TrendingUp,
  Calendar, MapPin, DollarSign, Users, Award, ChevronRight, Phone
} from "lucide-react";

const schedule = [
  { time: "09:00", name: "Rina Kusuma", service: "Reflexologi Kaki", duration: "60 mnt", done: true },
  { time: "10:30", name: "Dodi Pratama", service: "Full Body Massage", duration: "90 mnt", done: true },
  { time: "13:00", name: "Sari Wulandari", service: "Hot Stone Therapy", duration: "90 mnt", done: true },
  { time: "15:00", name: "Budi Haryono", service: "Lulur Premium", duration: "120 mnt", done: false },
  { time: "16:30", name: "Lina Agustina", service: "Reflexologi Kaki", duration: "60 mnt", done: false },
];

const notifications = [
  { text: "Pelanggan Rina Kusuma memberi rating bintang 5!", time: "09:32", type: "rating" },
  { text: "Jadwal baru: Lina Agustina pukul 16:30", time: "08:00", type: "schedule" },
];

export default function StaffDashboard() {
  const [user, setUser] = useState<{ name: string; email: string; branch: string; staffId: string } | null>(null);
  const [record, setRecord] = useState<ReturnType<typeof getMyRecord>>(undefined);
  const [now, setNow] = useState("");

  useEffect(() => {
    const u = getUser();
    setUser(u as typeof user);
    if (u?.staffId) setRecord(getMyRecord(u.staffId));
    const tick = () => {
      const d = new Date();
      setNow(d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  const name = user?.name || "Budi Santoso";
  const branch = record?.branch || user?.branch || "Strawberry Spa & Therapy";
  const checkedIn = record?.checkedIn ?? false;
  const checkInTime = record?.checkInTime || "";
  const customers = record?.customersToday ?? 3;
  const target = record?.targetDaily ?? 5;
  const pct = Math.round((customers / target) * 100);
  const komisi = customers * 15000;
  const doneCount = schedule.filter(s => s.done).length;

  const statCards = [
    { icon: Users, label: "Customer", value: `${customers}/${target}`, color: "#D4AF37" },
    { icon: Star, label: "Rating", value: "4.8", color: "#f59e0b" },
    { icon: DollarSign, label: "Komisi", value: `Rp ${(komisi / 1000).toFixed(0)}k`, color: "#22c55e" },
    { icon: Award, label: "Target", value: `${pct}%`, color: "#3b82f6" },
  ];

  return (
    <div style={{ background: "#08070a", minHeight: "100vh", paddingBottom: 100 }}>

      {/* ── HERO HEADER ── */}
      <div style={{
        background: "linear-gradient(160deg, #1e1600 0%, #140f00 40%, #0c0a00 100%)",
        borderBottom: "1px solid #D4AF3730",
        padding: "0 0 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Gold shimmer bg */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% -10%, #D4AF3718 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 0" }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#D4AF3780", textTransform: "uppercase" }}>Kuykuy Group</div>
            <div style={{ fontSize: 11, color: "#D4AF37", fontWeight: 600, marginTop: 2 }}>Staff Portal</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif", letterSpacing: 2 }}>{now}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
              {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
            </div>
          </div>
        </div>

        {/* Profile section */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "24px 20px 0" }}>
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%", overflow: "hidden",
              border: "3px solid #D4AF37", boxShadow: "0 0 24px #D4AF3760",
              background: "linear-gradient(135deg,#C9A84C,#f5e070,#D4AF37,#B8960C)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, fontWeight: 700, color: "#000", fontFamily: "Georgia,serif",
            }}>
              {name.charAt(0)}
            </div>
            {/* Online dot */}
            <div style={{
              position: "absolute", bottom: 4, right: 4, width: 14, height: 14,
              borderRadius: "50%", background: checkedIn ? "#22c55e" : "#ef4444",
              border: "2px solid #08070a",
            }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#D4AF3790", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Welcome back,</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif", lineHeight: 1.2 }}>{name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "#D4AF3720", color: "#D4AF37", border: "1px solid #D4AF3740", fontWeight: 600 }}>
                Senior Therapist
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Star size={11} fill="#D4AF37" color="#D4AF37" />
                <span style={{ fontSize: 11, color: "#D4AF37", fontWeight: 600 }}>4.8</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
              <MapPin size={11} color="#D4AF3780" />
              <span style={{ fontSize: 11, color: "#888" }}>{branch}</span>
            </div>
          </div>

          {/* Bell */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#D4AF3715", border: "1px solid #D4AF3730", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={18} color="#D4AF37" />
            </div>
            <div style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>2</div>
          </div>
        </div>

        {/* Check-in banner */}
        <div style={{ margin: "20px 20px 0", padding: "14px 16px", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", background: checkedIn ? "linear-gradient(135deg,#052010,#071a0a)" : "linear-gradient(135deg,#200505,#1a0707)", border: `1px solid ${checkedIn ? "#22c55e40" : "#ef444440"}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: checkedIn ? "#22c55e20" : "#ef444420" }}>
              <CheckCircle size={22} color={checkedIn ? "#4ade80" : "#ef4444"} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: checkedIn ? "#4ade80" : "#ef4444" }}>{checkedIn ? "Sudah Check-In" : "Belum Check-In"}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{checkedIn ? `Masuk pukul ${checkInTime}` : "Tap untuk check-in"}</div>
            </div>
          </div>
          <Link href="/staff/absensi" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: checkedIn ? "#4ade80" : "#ef4444", textDecoration: "none", fontWeight: 600 }}>
            {checkedIn ? "Detail" : "Check-In"} <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── 4 STAT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <div key={label} style={{ background: "linear-gradient(135deg,#141108,#0f0d00)", border: "1px solid #D4AF3725", borderRadius: 16, padding: "16px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}18`, flexShrink: 0 }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "Georgia,serif" }}>{value}</div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 2, letterSpacing: "0.1em" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PROGRESS TARGET ── */}
        <div style={{ background: "linear-gradient(135deg,#1a1800,#141000)", border: "1px solid #D4AF3740", borderRadius: 20, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: "#D4AF3790", letterSpacing: "0.25em", textTransform: "uppercase" }}>Target Hari Ini</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#D4AF37", fontFamily: "Georgia,serif", marginTop: 4 }}>
                {customers} <span style={{ fontSize: 16, color: "#555" }}>/ {target} customer</span>
              </div>
            </div>
            <div style={{ width: 64, height: 64, position: "relative" }}>
              <svg viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="#D4AF3720" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#D4AF37" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#D4AF37" }}>{pct}%</div>
            </div>
          </div>
          {/* progress bar */}
          <div style={{ height: 8, background: "#D4AF3715", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#C9A84C,#f5e070,#D4AF37)", borderRadius: 8, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontSize: 11, color: "#888" }}>{target - customers} customer lagi untuk capai target</span>
            <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>+Rp {komisi.toLocaleString("id-ID")} komisi</span>
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div>
          <div style={{ fontSize: 10, color: "#D4AF3780", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Menu Cepat</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[
              { href: "/staff/absensi", icon: CheckCircle, label: "Absensi", color: "#22c55e" },
              { href: "/staff/kinerja", icon: TrendingUp, label: "Kinerja", color: "#3b82f6" },
              { href: "/staff/profile", icon: Star, label: "Profil", color: "#D4AF37" },
              { href: "/staff/settings", icon: Zap, label: "Jadwal", color: "#f59e0b" },
            ].map(({ href, icon: Icon, label, color }) => (
              <Link key={href} href={href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px", background: "linear-gradient(135deg,#141108,#0f0d00)", border: "1px solid #D4AF3720", borderRadius: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}18` }}>
                  <Icon size={22} color={color} />
                </div>
                <span style={{ fontSize: 10, color: "#aaa", textAlign: "center" }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── NOTIFIKASI ── */}
        <div style={{ background: "linear-gradient(135deg,#141108,#0f0d00)", border: "1px solid #D4AF3725", borderRadius: 20, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: "#D4AF3780", letterSpacing: "0.3em", textTransform: "uppercase" }}>Notifikasi</div>
            <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: "#ef444420", color: "#ef4444", fontWeight: 600 }}>{notifications.length} baru</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notifications.map((n, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px", borderRadius: 12, background: "#D4AF3708", border: "1px solid #D4AF3715" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: n.type === "rating" ? "#D4AF3720" : "#3b82f620", flexShrink: 0 }}>
                  {n.type === "rating" ? <Star size={14} color="#D4AF37" /> : <Calendar size={14} color="#3b82f6" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>{n.text}</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 3 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── JADWAL HARI INI ── */}
        <div style={{ background: "linear-gradient(135deg,#141108,#0f0d00)", border: "1px solid #D4AF3725", borderRadius: 20, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: "#D4AF3780", letterSpacing: "0.3em", textTransform: "uppercase" }}>Jadwal Hari Ini</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{doneCount} dari {schedule.length} sesi selesai</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, background: "#D4AF3715", border: "1px solid #D4AF3730" }}>
              <Clock size={12} color="#D4AF37" />
              <span style={{ fontSize: 11, color: "#D4AF37", fontWeight: 600 }}>Live</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {schedule.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderRadius: 14, border: `1px solid ${s.done ? "#ffffff08" : "#D4AF3730"}`,
                background: s.done ? "#ffffff04" : "linear-gradient(135deg,#1a1800,#141000)",
                opacity: s.done ? 0.55 : 1,
              }}>
                <div style={{ textAlign: "center", minWidth: 38 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: s.done ? "#555" : "#D4AF37", fontFamily: "Georgia,serif" }}>{s.time}</div>
                </div>
                <div style={{ width: 1, height: 36, background: s.done ? "#333" : "#D4AF3740", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: s.done ? "#555" : "#fff", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "#666" }}>{s.service}</span>
                    <span style={{ fontSize: 9, color: "#444" }}>·</span>
                    <span style={{ fontSize: 11, color: "#555" }}>{s.duration}</span>
                  </div>
                </div>
                {s.done
                  ? <CheckCircle size={16} color="#16a34a" />
                  : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: "#D4AF3720", color: "#D4AF37", fontWeight: 600, whiteSpace: "nowrap" }}>Akan Datang</span>
                      <a href={`tel:08123456789`} style={{ display: "flex", alignItems: "center", gap: 3, textDecoration: "none" }}>
                        <Phone size={10} color="#3b82f6" />
                        <span style={{ fontSize: 9, color: "#3b82f6" }}>Hubungi</span>
                      </a>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* ── KOMISI SUMMARY ── */}
        <div style={{ background: "linear-gradient(135deg,#052010,#071a0a)", border: "1px solid #22c55e30", borderRadius: 20, padding: 20 }}>
          <div style={{ fontSize: 10, color: "#4ade8090", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Estimasi Komisi Hari Ini</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#4ade80", fontFamily: "Georgia,serif" }}>Rp {komisi.toLocaleString("id-ID")}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>{customers} sesi × Rp 15.000</div>
            </div>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#22c55e20", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={28} color="#4ade80" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
