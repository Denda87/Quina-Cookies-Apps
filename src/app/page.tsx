import Link from "next/link";
import Logo from "@/components/Logo";
import { MapPin, Phone, Mail, Star, ExternalLink, Share2 } from "lucide-react";
import { supabase, type Service, type Branch, type Testimonial } from "@/lib/supabase";

async function getData() {
  const [{ data: services }, { data: branches }, { data: testimonials }] = await Promise.all([
    supabase.from("services").select("*").eq("active", true).order("sort_order"),
    supabase.from("branches").select("*").eq("active", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("active", true).order("sort_order"),
  ]);
  return {
    services: (services as Service[]) ?? [],
    branches: (branches as Branch[]) ?? [],
    testimonials: (testimonials as Testimonial[]) ?? [],
  };
}

const BRANCH_MAPS: Record<string, string> = {
  "KUY BM": "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",
  "KUY BETOS": "https://maps.app.goo.gl/vWqKNtksLgPRdye16",
  "CRYSTAL KUY": "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",
  "KUY STORY": "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",
  "XI-KUY": "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",
  "Strawberry Spa & Therapy": "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",
};

const SERVICE_ICONS: Record<string, string> = {
  leaf: "🌸",
  sparkles: "✨",
  flame: "🔥",
  hand: "💅",
};

const SERVICE_IMAGES: Record<string, string> = {
  leaf: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80",
  sparkles: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80",
  flame: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80",
  hand: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
};

const teamMembers = [
  { name: "Maya Putri", role: "Senior Therapist", exp: "5 tahun" },
  { name: "Andi Saputra", role: "Hot Stone Specialist", exp: "4 tahun" },
  { name: "Sinta Rahayu", role: "Facial Expert", exp: "3 tahun" },
];

export default async function LandingPage() {
  const { services, branches, testimonials } = await getData();

  return (
    <div style={{ background: "#08070a", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(8,7,10,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #D4AF3728",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={38} />
            <div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "#D4AF37", letterSpacing: "0.1em" }}>KuyKuy Spa</div>
              <div style={{ fontSize: 9, color: "#D4AF3780", letterSpacing: "0.25em" }}>PREMIUM SPA & WELLNESS</div>
            </div>
          </div>
          {/* Links */}
          <div style={{ display: "flex", gap: 36, fontSize: 13, color: "#ccc" }}>
            {[["#home","Home"],["#tentang","Tentang Kami"],["#layanan","Layanan Spa"],["#menu","Menu Pijat"],["#lokasi","Lokasi Cabang"],["#kontak","Kontak"]].map(([href, label]) => (
              <a key={href} href={href} style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ccc")}>
                {label}
              </a>
            ))}
          </div>
          {/* CTA */}
          <Link href="/booking" style={{
            padding: "10px 24px", borderRadius: 40, fontSize: 13, fontWeight: 700,
            color: "#000", textDecoration: "none", letterSpacing: "0.08em",
            background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)",
            boxShadow: "0 4px 20px #D4AF3750",
          }}>Pesan Sekarang</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* BG Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
          alt="Spa hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 20% 60%, #D4AF3712 0%, transparent 60%)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 64px", width: "100%", paddingTop: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 20, textTransform: "uppercase" }}>Premium Spa & Wellness</div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(48px,7vw,96px)", fontWeight: 700, lineHeight: 1.05, margin: 0 }}>
            <span style={{ display: "block", color: "#fff" }}>TEMUKAN</span>
            <span style={{ display: "block", background: "linear-gradient(135deg,#C9A84C,#f5e070,#D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KETENANGAN</span>
            <span style={{ display: "block", color: "#fff" }}>SEJATI</span>
          </h1>
          <p style={{ color: "#ccc", fontSize: 17, marginTop: 24, marginBottom: 40, fontWeight: 300, maxWidth: 480, lineHeight: 1.6 }}>
            Pelayanan Mewah · Pengalaman Tak Terlupakan<br />6 Cabang di Jabodetabek
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/booking" style={{
              padding: "14px 36px", borderRadius: 40, fontSize: 13, fontWeight: 700, color: "#000",
              textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase",
              background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)",
              boxShadow: "0 6px 30px #D4AF3760",
            }}>Reservasi Sekarang</Link>
            <a href="#menu" style={{
              padding: "14px 36px", borderRadius: 40, fontSize: 13, fontWeight: 600, color: "#D4AF37",
              textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase",
              border: "1.5px solid #D4AF3760", background: "rgba(212,175,55,0.06)",
            }}>Lihat Layanan</a>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 48, marginTop: 60, paddingTop: 40, borderTop: "1px solid #D4AF3725" }}>
            {[["6","Cabang Aktif"],["5000+","Pelanggan Puas"],["10+","Tahun Pengalaman"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 36, fontWeight: 700, color: "#D4AF37" }}>{n}</div>
                <div style={{ fontSize: 12, color: "#888", letterSpacing: "0.1em", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "bounce 2s infinite" }}>
          <div style={{ width: 24, height: 40, border: "2px solid #D4AF3750", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 4, height: 10, background: "#D4AF37", borderRadius: 2 }} />
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── LAYANAN (circles) ── */}
      <section id="layanan" style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase" }}>Layanan Kami</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: 0 }}>Layanan Spa Premium</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, justifyItems: "center" }}>
            {services.map((s) => (
              <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 160, height: 160, borderRadius: "50%", overflow: "hidden", position: "relative",
                  border: "2px solid #D4AF3760", boxShadow: "0 0 30px #D4AF3725",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 50px #D4AF3760"; (e.currentTarget as HTMLDivElement).style.borderColor = "#D4AF37"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px #D4AF3725"; (e.currentTarget as HTMLDivElement).style.borderColor = "#D4AF3760"; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SERVICE_IMAGES[s.icon || ""] || SERVICE_IMAGES.leaf} alt={s.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                    {SERVICE_ICONS[s.icon || ""] || "✨"}
                  </div>
                </div>
                <div style={{ fontFamily: "Georgia,serif", color: "#D4AF37", fontWeight: 600, textAlign: "center", fontSize: 14 }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── MENU PIJAT ── */}
      <section id="menu" style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase" }}>Pilihan Terbaik</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: 0 }}>Menu Pijat</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {services.map((s) => (
              <div key={s.id} style={{
                background: "#141108", border: "1px solid #D4AF3725", borderRadius: 20,
                overflow: "hidden", transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(-6px)"; el.style.borderColor="#D4AF3770"; el.style.boxShadow="0 16px 40px #D4AF3720"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="none"; el.style.borderColor="#D4AF3725"; el.style.boxShadow="none"; }}
              >
                <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SERVICE_IMAGES[s.icon || ""] || SERVICE_IMAGES.leaf} alt={s.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #141108, transparent)" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: "#D4AF37", margin: "0 0 6px" }}>{s.name}</h3>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{s.duration_minutes} menit</div>
                  {s.description && <p style={{ fontSize: 12, color: "#666", marginBottom: 16, lineHeight: 1.6, margin: "0 0 16px" }}>{s.description}</p>}
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Rp {s.price_idr.toLocaleString("id-ID")}</div>
                  <Link href="/booking" style={{
                    display: "block", width: "100%", padding: "10px 0", borderRadius: 40,
                    textAlign: "center", fontSize: 11, fontWeight: 700, color: "#000",
                    textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase",
                    background: "linear-gradient(135deg,#C9A84C,#D4AF37)",
                  }}>Pesan</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── LOKASI CABANG ── */}
      <section id="lokasi" style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase" }}>Temukan Kami</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: 0 }}>Lokasi Cabang</h2>
            <p style={{ color: "#888", marginTop: 12, fontSize: 14 }}>6 Cabang di wilayah Jabodetabek</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {branches.map((b) => (
              <div key={b.id} style={{
                background: "#141108", border: "1px solid #D4AF3725", borderRadius: 16,
                padding: 24, transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#D4AF3760"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#D4AF3725"}
              >
                <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 700, color: "#D4AF37", marginBottom: 12, margin: "0 0 12px" }}>{b.name}</h3>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "#888", fontSize: 13, marginBottom: 12 }}>
                  <MapPin size={14} style={{ marginTop: 2, flexShrink: 0, color: "#D4AF3780" }} />
                  <span style={{ lineHeight: 1.6 }}>{b.address}</span>
                </div>
                {b.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13, marginBottom: 12 }}>
                    <Phone size={14} style={{ flexShrink: 0, color: "#D4AF3780" }} />
                    <span>{b.phone}</span>
                  </div>
                )}
                <a href={b.map_url || BRANCH_MAPS[b.name] || "#"} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#D4AF37", textDecoration: "none" }}>
                  <ExternalLink size={12} /> Buka Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── TENTANG KAMI ── */}
      <section id="tentang" style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 16, textTransform: "uppercase" }}>Tentang Kuykuy Group</div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: "0 0 24px", lineHeight: 1.2 }}>Keahlian & Kepedulian<br />Dalam Setiap Sentuhan</h2>
              <p style={{ color: "#888", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                Kuykuy Group adalah pelopor layanan spa dan wellness premium di Jabodetabek. Dengan 6 cabang aktif di Bekasi, Bogor, dan Cikarang, kami berkomitmen memberikan pengalaman relaksasi terbaik.
              </p>
              <p style={{ color: "#888", lineHeight: 1.8, marginBottom: 40, fontSize: 15 }}>
                Tim terapis profesional kami terlatih dengan standar tinggi, menggunakan bahan-bahan alami berkualitas untuk memastikan setiap sesi memberikan manfaat maksimal.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, paddingTop: 32, borderTop: "1px solid #D4AF3720" }}>
                {[["6","Cabang Aktif"],["5000+","Pelanggan"],["10+","Tahun"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 32, fontWeight: 700, color: "#D4AF37" }}>{n}</div>
                    <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 380, height: 480, borderRadius: 24, overflow: "hidden",
                  border: "2px solid #D4AF3750", boxShadow: "0 0 60px #D4AF3720",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80" alt="Spa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{
                  position: "absolute", bottom: -16, right: -16, padding: "12px 20px",
                  background: "linear-gradient(135deg,#C9A84C,#D4AF37)", borderRadius: 12,
                  fontSize: 12, fontWeight: 700, color: "#000",
                }}>Premium Quality ★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── TESTIMONIAL ── */}
      <section style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase" }}>Testimoni</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: 0 }}>Kata Pelanggan Kami</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 80 }}>
            {testimonials.map((t) => (
              <div key={t.id} style={{ background: "#141108", border: "1px solid #D4AF3725", borderRadius: 20, padding: 32 }}>
                <div style={{ display: "flex", marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                  ))}
                </div>
                <p style={{ color: "#ccc", fontStyle: "italic", marginBottom: 20, lineHeight: 1.7, fontSize: 14 }}>&quot;{t.quote}&quot;</p>
                <div style={{ fontWeight: 600, color: "#D4AF37", fontSize: 14 }}>— {t.name}</div>
                {t.role && <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{t.role}</div>}
              </div>
            ))}
          </div>

          {/* Team */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase" }}>Tim Kami</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: 0 }}>Terapis Berpengalaman</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {teamMembers.map((m, i) => (
              <div key={i} style={{ textAlign: "center", background: "#141108", border: "1px solid #D4AF3725", borderRadius: 20, padding: 40 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: 28, fontWeight: 700, color: "#000",
                  background: "linear-gradient(135deg,#C9A84C,#D4AF37)",
                }}>{m.name.charAt(0)}</div>
                <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: 18, marginBottom: 6, margin: "0 0 6px" }}>{m.name}</h3>
                <div style={{ color: "#D4AF37", fontSize: 13, marginBottom: 6 }}>{m.role}</div>
                <div style={{ color: "#666", fontSize: 12 }}>Pengalaman {m.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── KEMITRAAN ── */}
      <section style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase" }}>Bergabung Bersama Kami</div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: 38, fontWeight: 700, margin: "0 0 16px" }}>Kemitraan & Solusi Staff</h2>
          <p style={{ color: "#888", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.8, fontSize: 15 }}>
            Bergabunglah dengan jaringan Kuykuy Group dan dapatkan manfaat eksklusif sebagai mitra atau terapis profesional.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 48 }}>
            {[["Sistem Digital","Kelola absensi dan kinerja secara digital real-time"],["Pelatihan Pro","Pelatihan terapis berstandar internasional"],["Reward Program","Bonus dan insentif menarik untuk performa terbaik"]].map(([title, desc]) => (
              <div key={title} style={{ background: "#141108", border: "1px solid #D4AF3725", borderRadius: 16, padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 20, color: "#000", fontWeight: 700, background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>★</div>
                <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 700, color: "#D4AF37", marginBottom: 8, margin: "0 0 8px" }}>{title}</h3>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/login" style={{
            display: "inline-block", padding: "14px 40px", borderRadius: 40, fontSize: 13,
            fontWeight: 700, color: "#000", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase",
            background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)",
            boxShadow: "0 6px 30px #D4AF3750",
          }}>Akses Portal Staff</Link>
        </div>
      </section>

      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />

      {/* ── FOOTER ── */}
      <footer id="kontak" style={{ background: "#060504", borderTop: "1px solid #D4AF3718", padding: "80px 0 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 64, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Logo size={42} />
                <div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 20, fontWeight: 700, color: "#D4AF37" }}>KUYKUY GROUP</div>
                  <div style={{ fontSize: 10, color: "#D4AF3780", letterSpacing: "0.2em" }}>Premium Spa & Wellness</div>
                </div>
              </div>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.8, maxWidth: 320, marginBottom: 20 }}>
                Layanan spa dan pijat premium untuk ketenangan tubuh dan jiwa. 6 cabang di Bekasi, Bogor, dan Cikarang.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[Share2, Share2, Mail].map((Icon, i) => (
                  <a key={i} href="#" style={{
                    width: 36, height: 36, border: "1px solid #D4AF3730", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#D4AF37", textDecoration: "none",
                  }}><Icon size={14} /></a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Georgia,serif", fontWeight: 700, color: "#D4AF37", marginBottom: 20, margin: "0 0 20px" }}>Layanan</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {services.map(s => (
                  <li key={s.id}><a href="#menu" style={{ color: "#666", textDecoration: "none", fontSize: 13 }}>{s.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: "Georgia,serif", fontWeight: 700, color: "#D4AF37", marginBottom: 20, margin: "0 0 20px" }}>Kontak</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[[Phone,"+62 21 555-0100"],[Mail,"hello@kuykuygroup.com"],[MapPin,"Bekasi · Bogor · Cikarang"]].map(([Icon, text], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#666", fontSize: 13 }}>
                    {/* @ts-expect-error icon component */}
                    <Icon size={14} style={{ marginTop: 2, flexShrink: 0, color: "#D4AF3780" }} />
                    <span>{text as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #D4AF3710", paddingTop: 24, textAlign: "center", color: "#444", fontSize: 12 }}>
            © 2025 Kuykuy Group. All rights reserved. | Premium Spa & Wellness Indonesia
          </div>
        </div>
      </footer>
    </div>
  );
}
