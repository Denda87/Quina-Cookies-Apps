"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { supabase, type Attendance } from "@/lib/supabase";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Mail, Bell, ChevronDown, CalendarDays, Coins, Users, Star,
  UserPlus, Megaphone, Plus, CalendarPlus, Download, RefreshCw,
  MapPin, ExternalLink, Navigation,
} from "lucide-react";

/* ---------- design tokens ---------- */
const GOLD = "#d4af37";
const GOLD_BRIGHT = "#f4d886";
const GOLD_GRAD = "linear-gradient(135deg,#f4d886,#d4af37 55%,#b8860b)";
const GOLD_TEXT_GRAD = "linear-gradient(135deg,#f9ecbf,#e3c46a 50%,#c79a2e)";
const STAT_BG = "linear-gradient(155deg,#1a1509 0%,#0f0b05 100%)";
const PANEL_BG = "linear-gradient(155deg,#15110a 0%,#0d0a05 100%)";
const CARD_BORDER = "1px solid rgba(212,175,55,.16)";
const CARD_SHADOW = "0 14px 34px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,220,150,.06)";

const goldTextStyle: React.CSSProperties = {
  background: GOLD_TEXT_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
};
const cinzel = "'Cinzel', serif";

/* ---------- mock data (no API yet) ---------- */
const trendData = [
  { month: "Jan", reservasi: 380, pendapatan: 3 },
  { month: "Feb", reservasi: 680, pendapatan: 5 },
  { month: "Mar", reservasi: 560, pendapatan: 7 },
  { month: "Apr", reservasi: 920, pendapatan: 9 },
  { month: "Mei", reservasi: 800, pendapatan: 12 },
  { month: "Jun", reservasi: 1180, pendapatan: 15 },
];

const serviceDist = [
  { label: "Aromaterapi", pct: 25, color: "#f0d488" },
  { label: "Tradisional", pct: 22, color: "#d4af37" },
  { label: "Refleksi", pct: 18, color: "#c79a2e" },
  { label: "Lulur", pct: 15, color: "#a8801f" },
  { label: "Batu Panas", pct: 13, color: "#8c6a18" },
  { label: "Lainnya", pct: 7, color: "#6b5012" },
];

const reservations = [
  { id: "#KK10042", name: "Rina Melati", layanan: "Aromaterapi", waktu: "13.00–14.00", status: "Selesai" },
  { id: "#KK10043", name: "Andi Pratama", layanan: "Batu Panas", waktu: "14.30–15.30", status: "Proses" },
  { id: "#KK10044", name: "Sari Dewi", layanan: "Refleksi", waktu: "15.00–16.00", status: "Baru" },
  { id: "#KK10045", name: "Budi Hartono", layanan: "Lulur Spa", waktu: "16.00–17.30", status: "Proses" },
  { id: "#KK10046", name: "Maya Sari", layanan: "Tradisional", waktu: "17.00–18.00", status: "Selesai" },
];

// Data cabang asli (sinkron dengan halaman /cabang) — dipakai untuk Live GPS Google Maps
type Outlet = { no: number; name: string; staf: number; address: string; mapUrl: string };
const outlets: Outlet[] = [
  { no: 1, name: "KUY BM", staf: 5, address: "Ruko Bekasi Mas, Jl. Ahmad Yani No.24 Blok B, Marga Jaya, Kec. Bekasi Selatan, Kota Bekasi, Jawa Barat 17141", mapUrl: "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6" },
  { no: 2, name: "KUY BETOS", staf: 3, address: "Jl. Cut Mutia No.23 Blok G, Margahayu, Kec. Bekasi Timur, Kota Bekasi, Jawa Barat 17113", mapUrl: "https://maps.app.goo.gl/vWqKNtksLgPRdye16" },
  { no: 3, name: "CRYSTAL KUY", staf: 4, address: "Ruko Sentral Niaga Kalimalang Blok B1 No.16, Jl. Sentra Niaga Kalimalang No.15, Kayuringin Jaya, Kec. Bekasi Sel., Kota Bekasi, Jawa Barat 17144", mapUrl: "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6" },
  { no: 4, name: "KUY STORY", staf: 2, address: "Ruko Commpark Kota Wisata Blok H No.29, Limus Nunggal, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820", mapUrl: "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8" },
  { no: 5, name: "XI-KUY", staf: 3, address: "Jalan Niaga Raya Jababeka 2 Ruko CBD, Blok D No.16-17, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530", mapUrl: "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8" },
  { no: 6, name: "Strawberry Spa & Therapy", staf: 2, address: "Ruko Kawasan Niaga Citra Grand Cibubur, Jl. Alternatif Cibubur No.26, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435", mapUrl: "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7" },
  { no: 7, name: "V PHOENIX", staf: 3, address: "Plaza Amsterdam, Jl. MH. Thamrin No.57 Blok A.21, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16710", mapUrl: "https://maps.app.goo.gl/4z7PPgg5myAM4TCE7" },
  { no: 8, name: "SIERRA", staf: 2, address: "Ruko Podium, Jl. Mataram Blok B.1 & B.2, Cibatu, Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530", mapUrl: "https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7" },
  { no: 9, name: "VIERZHEN", staf: 2, address: "Jl. Niaga Raya Ruko CBD Jababeka Kav AA3 Blok A88, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530", mapUrl: "https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8" },
  { no: 10, name: "MIRACLE KUY", staf: 2, address: "Ruko Cibinong Center, Blok E No.7, Pakansari, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16915", mapUrl: "https://maps.app.goo.gl/TfF55aGh7N4TPEXC6" },
  { no: 11, name: "INFINITY", staf: 2, address: "Ruko Plaza Amsterdam City, Blok C8, Sentul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810", mapUrl: "https://maps.app.goo.gl/fYaPmGRKddJkLjbg8" },
];

// Peta tertanam Google Maps via query alamat (tanpa perlu API key)
function mapEmbedSrc(o: Outlet) {
  const q = encodeURIComponent(`Kuykuy ${o.name}, ${o.address}`);
  return `https://www.google.com/maps?q=${q}&z=15&output=embed`;
}

const quickActions = [
  { label: "Undang Staf Baru", icon: UserPlus },
  { label: "Buat Promo Website", icon: Megaphone },
  { label: "Tambah Layanan", icon: Plus },
  { label: "Jadwalkan Booking", icon: CalendarPlus },
  { label: "Ekspor Laporan", icon: Download },
];

const STATUS_PILL: Record<string, React.CSSProperties> = {
  Tersedia: { color: "#5fae7d", background: "rgba(63,166,106,.12)", border: "1px solid rgba(63,166,106,.3)" },
  Selesai: { color: "#5fae7d", background: "rgba(63,166,106,.12)", border: "1px solid rgba(63,166,106,.3)" },
  Sibuk: { color: "#e0726a", background: "rgba(192,36,31,.12)", border: "1px solid rgba(192,36,31,.32)" },
  Istirahat: { color: "#e8c874", background: "rgba(212,175,55,.12)", border: "1px solid rgba(212,175,55,.32)" },
  Proses: { color: "#e8c874", background: "rgba(212,175,55,.12)", border: "1px solid rgba(212,175,55,.32)" },
  Baru: { color: "#6fa8d4", background: "rgba(74,144,184,.12)", border: "1px solid rgba(74,144,184,.32)" },
};

function StatusPill({ status }: { status: string }) {
  return (
    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap", ...STATUS_PILL[status] }}>{status}</span>
  );
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

/* ---------- stat card ---------- */
function StatCard({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", background: STAT_BG, border: CARD_BORDER, borderRadius: 16, padding: "20px 20px 22px", boxShadow: CARD_SHADOW, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,175,55,.16),transparent 70%)" }} />
      <div className="flex justify-between items-start" style={{ marginBottom: 14, position: "relative" }}>
        <span style={{ fontSize: 11.5, color: "#9a8f70", fontWeight: 500 }}>{label} {sub && <span style={{ color: "#6f6650" }}>{sub}</span>}</span>
      </div>
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [lastRefresh, setLastRefresh] = useState("");
  const [activeOutlet, setActiveOutlet] = useState<Outlet>(outlets[0]);

  const fetchAttendance = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("attendance").select("*").eq("date", today)
      .order("checked_in", { ascending: false });
    if (data) setAttendance(data as Attendance[]);
    setLastRefresh(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
  };

  useEffect(() => {
    setUser(getUser() as { name?: string } | null);
    fetchAttendance();
    const channel = supabase
      .channel("attendance-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "attendance" }, () => fetchAttendance())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const hadir = attendance.filter(r => r.checked_in).length;
  const totalStaf = attendance.length || 30;
  const presentPct = Math.round((hadir / totalStaf) * 100) || 0;
  const therapists = attendance.filter(r => r.target_daily > 0);
  const kinerja = therapists.length
    ? Math.round(therapists.reduce((s, r) => s + r.customers_today / r.target_daily, 0) / therapists.length * 100)
    : 92;

  const liveStaff = [...attendance]
    .sort((a, b) => (b.checked_in ? 1 : 0) - (a.checked_in ? 1 : 0))
    .slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ===== TOPBAR ===== */}
      <header className="flex items-center justify-between" style={{ padding: "22px 30px 16px" }}>
        <div>
          <div style={{ fontSize: 12, color: "#8a8166", letterSpacing: ".5px", marginBottom: 3 }}>Selamat datang kembali,</div>
          <h1 style={{ fontFamily: cinzel, fontSize: 26, fontWeight: 700, letterSpacing: "1px", ...goldTextStyle }}>Dashboard</h1>
        </div>
        <div className="flex items-center" style={{ gap: 16 }}>
          <div className="flex items-center" style={{ gap: 6, fontSize: 11, color: "#776d54" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5fae7d", boxShadow: "0 0 8px #5fae7d" }} className="animate-pulse" />
            Live · {lastRefresh}
            <button onClick={fetchAttendance} className="ml-1" title="Refresh"><RefreshCw size={12} color="#776d54" /></button>
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,.04)", border: CARD_BORDER, color: "#c9bfa3" }} className="flex items-center justify-center cursor-pointer">
            <Mail size={18} strokeWidth={1.8} />
          </button>
          <button style={{ position: "relative", width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,.04)", border: CARD_BORDER, color: "#c9bfa3" }} className="flex items-center justify-center cursor-pointer">
            <Bell size={18} strokeWidth={1.8} />
            <span style={{ position: "absolute", top: -3, right: -3, minWidth: 18, height: 18, padding: "0 4px", borderRadius: 9, background: "linear-gradient(135deg,#e0352b,#a8201a)", color: "#fff", fontSize: 10, fontWeight: 700, border: "2px solid #0a0703" }} className="flex items-center justify-center">3</span>
          </button>
          <div style={{ width: 1, height: 30, background: "rgba(212,175,55,.18)" }} />
          <div className="flex items-center cursor-pointer" style={{ gap: 11 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: GOLD_GRAD, color: "#1a1305", fontWeight: 800, boxShadow: "0 0 14px rgba(212,175,55,.22)" }} className="flex items-center justify-center">
              {initials(user?.name || "Admin KuyKuy")}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f3ecda" }}>{user?.name || "Admin KuyKuy"}</div>
              <div style={{ fontSize: 10.5, color: "#c79a2e" }}>Super Admin</div>
            </div>
            <ChevronDown size={14} color="#8a8166" />
          </div>
        </div>
      </header>

      <div style={{ padding: "6px 30px 34px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ===== STAT CARDS ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          <StatCard label="Total Reservasi" sub="(Bulan Ini)">
            <CalendarDays size={20} color={GOLD} strokeWidth={1.8} style={{ position: "absolute", top: 20, right: 20 }} />
            <div style={{ fontSize: 34, fontWeight: 800, color: "#f5efe0", letterSpacing: "-.5px" }}>1,250</div>
            <div style={{ height: 3, borderRadius: 3, marginTop: 12, background: "linear-gradient(90deg,#f4d886,#d4af37 60%,transparent)" }} />
            <div style={{ marginTop: 10, fontSize: 11, color: "#5fae7d", fontWeight: 600 }}>▲ 12% dari bulan lalu</div>
          </StatCard>

          <StatCard label="Pendapatan" sub="(Bulan Ini)">
            <Coins size={20} color={GOLD} strokeWidth={1.8} style={{ position: "absolute", top: 20, right: 20 }} />
            <div style={{ fontSize: 27, fontWeight: 800, color: "#f5efe0", letterSpacing: "-.5px" }}>Rp 435<span style={{ fontSize: 18, color: "#c9bfa3" }}>.000.000</span></div>
            <div style={{ height: 3, borderRadius: 3, marginTop: 18, background: "linear-gradient(90deg,#f4d886,#d4af37 60%,transparent)" }} />
            <div style={{ marginTop: 10, fontSize: 11, color: "#5fae7d", fontWeight: 600 }}>▲ 8% dari bulan lalu</div>
          </StatCard>

          <StatCard label="Staf Aktif" sub="(Hari Ini)">
            <Users size={20} color={GOLD} strokeWidth={1.8} style={{ position: "absolute", top: 20, right: 20 }} />
            <div style={{ fontSize: 34, fontWeight: 800, color: "#f5efe0", letterSpacing: "-.5px" }}>{hadir}<span style={{ fontSize: 20, color: "#776d54" }}>/{totalStaf}</span></div>
            <div style={{ height: 3, borderRadius: 3, marginTop: 12, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
              <div style={{ width: `${presentPct}%`, height: "100%", background: "linear-gradient(90deg,#f4d886,#d4af37)" }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#9a8f70", fontWeight: 600 }}>{presentPct}% kehadiran</div>
          </StatCard>

          <StatCard label="Kinerja Rata-rata" sub="Terapis">
            <Star size={20} color={GOLD} strokeWidth={1.8} style={{ position: "absolute", top: 20, right: 20 }} />
            <div style={{ fontSize: 34, fontWeight: 800, color: "#f5efe0", letterSpacing: "-.5px" }}>{kinerja}<span style={{ fontSize: 22, color: "#c79a2e" }}>%</span></div>
            <div style={{ height: 3, borderRadius: 3, marginTop: 12, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, kinerja)}%`, height: "100%", background: "linear-gradient(90deg,#f4d886,#d4af37)" }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#5fae7d", fontWeight: 600 }}>{kinerja >= 85 ? "Sangat Baik" : kinerja >= 60 ? "Baik" : "Perlu Perhatian"}</div>
          </StatCard>
        </div>

        {/* ===== ROW 2: chart | donut | quick mgmt ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1.15fr 1.15fr", gap: 18 }}>

          {/* LINE CHART */}
          <div style={{ background: PANEL_BG, border: CARD_BORDER, borderRadius: 16, padding: "20px 22px", boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
              <h3 style={{ fontFamily: cinzel, fontSize: 15, fontWeight: 600, letterSpacing: ".6px", color: "#e8d49a" }}>Tren Reservasi &amp; Pendapatan</h3>
              <span style={{ fontSize: 11, color: "#776d54", background: "rgba(212,175,55,.08)", border: CARD_BORDER, padding: "4px 10px", borderRadius: 8 }}>6 Bulan Terakhir</span>
            </div>
            <div className="flex" style={{ gap: 18, margin: "8px 0 6px" }}>
              <div className="flex items-center" style={{ gap: 7, fontSize: 11, color: "#9a8f70" }}><span style={{ width: 18, height: 3, borderRadius: 2, background: "linear-gradient(90deg,#f4d886,#d4af37)" }} />Reservasi</div>
              <div className="flex items-center" style={{ gap: 7, fontSize: 11, color: "#9a8f70" }}><span style={{ width: 18, height: 3, borderRadius: 2, background: "rgba(192,36,31,.7)" }} />Pendapatan</div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={trendData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(212,175,55,.32)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" vertical={false} />
                <XAxis dataKey="month" stroke="transparent" tick={{ fill: "#8a8166", fontSize: 10 }} />
                <YAxis yAxisId="left" stroke="transparent" tick={{ fill: "#6f6650", fontSize: 9 }} />
                <YAxis yAxisId="right" orientation="right" stroke="transparent" tick={{ fill: "#6f6650", fontSize: 9 }} tickFormatter={(v) => `${v}M`} />
                <Tooltip contentStyle={{ background: "#15110a", border: "1px solid rgba(212,175,55,.4)", borderRadius: 10, color: "#f3ecda", fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="reservasi" stroke="#e8c874" strokeWidth={2.6} dot={{ fill: "#1a1305", stroke: "#f4d886", strokeWidth: 2.4, r: 4 }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="pendapatan" stroke="rgba(192,36,31,.7)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* DONUT */}
          <div style={{ background: PANEL_BG, border: CARD_BORDER, borderRadius: 16, padding: "20px 22px", boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
            <h3 style={{ fontFamily: cinzel, fontSize: 15, fontWeight: 600, letterSpacing: ".6px", color: "#e8d49a", marginBottom: 8 }}>Layanan Terpopuler</h3>
            <div className="flex items-center" style={{ gap: 14 }}>
              <svg viewBox="0 0 180 180" style={{ width: 130, height: 130, flex: "0 0 130px", transform: "rotate(-90deg)" }}>
                <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="22" />
                {(() => {
                  const C = 2 * Math.PI * 70;
                  let offset = 0;
                  return serviceDist.map((s) => {
                    const len = (s.pct / 100) * C;
                    const el = (
                      <circle key={s.label} cx="90" cy="90" r="70" fill="none" stroke={s.color} strokeWidth="22"
                        strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
                    );
                    offset += len;
                    return el;
                  });
                })()}
              </svg>
              <div className="flex flex-col flex-1" style={{ gap: 7 }}>
                {serviceDist.map((s) => (
                  <div key={s.label} className="flex items-center" style={{ gap: 7, fontSize: 11, color: "#c9bfa3" }}>
                    <span style={{ width: 9, height: 9, borderRadius: 2, background: s.color }} />{s.label}
                    <b style={{ marginLeft: "auto", color: "#e8d49a" }}>{s.pct}%</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK MANAGEMENT */}
          <div style={{ background: PANEL_BG, border: CARD_BORDER, borderRadius: 16, padding: "20px 22px", boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
            <h3 style={{ fontFamily: cinzel, fontSize: 15, fontWeight: 600, letterSpacing: ".6px", color: "#e8d49a", marginBottom: 14 }}>Quick Management</h3>
            <div className="flex flex-col" style={{ gap: 10 }}>
              {quickActions.map(({ label, icon: Icon }) => (
                <button key={label} className="flex items-center transition-all hover:brightness-125" style={{ gap: 11, padding: "11px 13px", borderRadius: 11, background: "rgba(212,175,55,.06)", border: CARD_BORDER, color: "#e3d8bb", fontSize: 12.5, fontWeight: 600, textAlign: "left" }}>
                  <Icon size={17} color={GOLD} strokeWidth={1.8} />{label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ROW 3: two tables ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

          {/* STATUS STAF (LIVE) */}
          <div style={{ background: PANEL_BG, border: CARD_BORDER, borderRadius: 16, boxShadow: "0 14px 34px rgba(0,0,0,.5)", overflow: "hidden" }}>
            <div className="flex justify-between items-center" style={{ padding: "16px 20px 14px", borderBottom: "1px solid rgba(212,175,55,.14)", background: "linear-gradient(90deg,rgba(212,175,55,.06),transparent)" }}>
              <h3 style={{ fontFamily: cinzel, fontSize: 14, fontWeight: 600, letterSpacing: "1px", color: "#e8d49a", textTransform: "uppercase" }}>Status Terapis Saat Ini</h3>
              <span className="flex items-center" style={{ gap: 6, fontSize: 10, color: "#5fae7d" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5fae7d", boxShadow: "0 0 6px #5fae7d" }} className="animate-pulse" />LIVE</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".8px", color: "#776d54" }}>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontWeight: 600 }}>Terapis</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>Cabang</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>Customer</th>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 12, color: "#c9bfa3" }}>
                {liveStaff.length === 0 && (
                  <tr><td colSpan={4} style={{ padding: "20px", textAlign: "center", color: "#776d54" }}>Belum ada data absensi hari ini</td></tr>
                )}
                {liveStaff.map((s) => (
                  <tr key={s.id} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                    <td style={{ padding: "11px 20px" }}>
                      <div className="flex items-center" style={{ gap: 10 }}>
                        <span style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#3a2f12,#1a1305)", border: "1px solid rgba(212,175,55,.35)", color: "#e8c874", fontWeight: 700, fontSize: 11 }} className="flex items-center justify-center">{initials(s.name)}</span>
                        <span style={{ color: "#f3ecda", fontWeight: 600 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 8px" }}>{s.branch.replace("Strawberry Spa & Therapy", "Strawberry")}</td>
                    <td style={{ padding: "11px 8px", color: GOLD, fontWeight: 700 }}>{s.customers_today}</td>
                    <td style={{ padding: "11px 20px" }}><StatusPill status={s.checked_in ? "Tersedia" : "Istirahat"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RESERVASI TERBARU */}
          <div style={{ background: PANEL_BG, border: CARD_BORDER, borderRadius: 16, boxShadow: "0 14px 34px rgba(0,0,0,.5)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px 14px", borderBottom: "1px solid rgba(212,175,55,.14)", background: "linear-gradient(90deg,rgba(212,175,55,.06),transparent)" }}>
              <h3 style={{ fontFamily: cinzel, fontSize: 14, fontWeight: 600, letterSpacing: "1px", color: "#e8d49a", textTransform: "uppercase" }}>Reservasi Terbaru</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".8px", color: "#776d54" }}>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontWeight: 600 }}>ID</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>Customer</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600 }}>Waktu</th>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 12, color: "#c9bfa3" }}>
                {reservations.map((r) => (
                  <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                    <td style={{ padding: "12px 20px", color: "#c79a2e", fontWeight: 700 }}>{r.id}</td>
                    <td style={{ padding: "12px 8px" }}>
                      <div style={{ color: "#f3ecda", fontWeight: 600 }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: "#776d54" }}>{r.layanan}</div>
                    </td>
                    <td style={{ padding: "12px 8px" }}>{r.waktu}</td>
                    <td style={{ padding: "12px 20px" }}><StatusPill status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== MAP (Live GPS — Google Maps asli) ===== */}
        <div style={{ position: "relative", background: PANEL_BG, border: CARD_BORDER, borderRadius: 16, boxShadow: "0 14px 34px rgba(0,0,0,.5)", overflow: "hidden" }}>
          <div className="flex justify-between items-center" style={{ padding: "16px 20px 14px", borderBottom: "1px solid rgba(212,175,55,.14)", background: "linear-gradient(90deg,rgba(212,175,55,.06),transparent)" }}>
            <h3 style={{ fontFamily: cinzel, fontSize: 14, fontWeight: 600, letterSpacing: "1px", color: "#e8d49a", textTransform: "uppercase" }}>Jaringan {outlets.length} Cabang — Live GPS</h3>
            <span className="flex items-center" style={{ gap: 6, fontSize: 11, color: "#5fae7d" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5fae7d", boxShadow: "0 0 8px #5fae7d" }} className="animate-pulse" />Live GPS · Google Maps</span>
          </div>
          <div className="flex items-stretch flex-wrap">
            {/* map area — peta Google Maps asli untuk cabang terpilih */}
            <div style={{ position: "relative", flex: 1, minWidth: 420, height: 440, background: "#0a0906" }}>
              <iframe
                key={activeOutlet.no}
                title={`Peta ${activeOutlet.name}`}
                src={mapEmbedSrc(activeOutlet)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{ border: 0, width: "100%", height: "100%", filter: "grayscale(0.25) contrast(1.05) brightness(0.92)" }}
              />
              {/* overlay info cabang aktif */}
              <div style={{ position: "absolute", top: 16, left: 16, maxWidth: 320, borderRadius: 12, border: "1px solid rgba(212,175,55,.3)", background: "rgba(10,8,4,.82)", backdropFilter: "blur(6px)", padding: "12px 14px", boxShadow: "0 8px 22px rgba(0,0,0,.5)" }}>
                <div className="flex items-center" style={{ gap: 8, marginBottom: 6 }}>
                  <MapPin size={14} color={GOLD} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#f3ecda", letterSpacing: ".3px" }}>{activeOutlet.name}</span>
                </div>
                <div style={{ fontSize: 11, color: "#b3a884", lineHeight: 1.5, marginBottom: 10 }}>{activeOutlet.address}</div>
                <a href={activeOutlet.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" style={{ gap: 7, padding: "8px 0", background: GOLD_GRAD, borderRadius: 8, color: "#1a1305", fontSize: 12, fontWeight: 800, textDecoration: "none" }}>
                  <Navigation size={13} /> Buka Rute di Google Maps <ExternalLink size={12} />
                </a>
              </div>
              <div style={{ position: "absolute", bottom: 8, left: 14, fontSize: 10, color: "rgba(255,255,255,.4)" }}>KuyKuy Maps · Live Tracking</div>
            </div>

            {/* directory — klik untuk memuat data realtime cabang */}
            <aside style={{ width: 300, flex: "0 0 300px", height: 440, borderLeft: "1px solid rgba(212,175,55,.14)", background: "linear-gradient(180deg,#13100a,#0c0905)" }} className="flex flex-col">
              <div className="flex justify-between items-center" style={{ padding: "15px 18px 12px", borderBottom: "1px solid rgba(212,175,55,.12)" }}>
                <span style={{ fontFamily: cinzel, fontSize: 13, fontWeight: 600, letterSpacing: ".6px", color: "#e8d49a" }}>Direktori Cabang</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#1a1305", background: "linear-gradient(135deg,#f4d886,#d4af37)", padding: "3px 9px", borderRadius: 20 }}>{outlets.length} Outlet</span>
              </div>
              <div className="flex flex-col flex-1 overflow-y-auto" style={{ padding: "10px 12px", gap: 7 }}>
                {outlets.map((o) => {
                  const active = o.no === activeOutlet.no;
                  return (
                    <button key={o.no} onClick={() => setActiveOutlet(o)} className="flex items-center text-left transition-all" style={{ gap: 11, padding: "8px 10px", borderRadius: 10, cursor: "pointer", background: active ? "rgba(212,175,55,.14)" : "rgba(255,255,255,.022)", border: active ? "1px solid rgba(212,175,55,.45)" : "1px solid rgba(212,175,55,.1)", boxShadow: active ? "0 0 16px rgba(212,175,55,.18)" : "none" }}>
                      <span style={{ width: 26, height: 26, flex: "0 0 26px", borderRadius: 8, background: "linear-gradient(135deg,#f4d886,#c79a2e)", color: "#1a1305", fontWeight: 800, fontSize: 12 }} className="flex items-center justify-center">{o.no}</span>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: active ? "#f9ecbf" : "#f3ecda", letterSpacing: ".3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.name}</div>
                        <div style={{ fontSize: 10, color: "#8a8166" }}>{o.staf} terapis aktif</div>
                      </div>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5fae7d", boxShadow: "0 0 7px #5fae7d" }} />
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between" style={{ padding: "12px 18px", borderTop: "1px solid rgba(212,175,55,.14)", fontSize: 11, color: "#9a8f70" }}>
                <span>Total Terapis Aktif</span><b style={{ color: "#f3ecda" }}>{hadir || 28}</b>
              </div>
            </aside>
          </div>
        </div>

      </div>
    </div>
  );
}
