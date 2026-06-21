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

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_TEXT: React.CSSProperties = {
  background: GOLD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default async function LandingPage() {
  const { services, branches, testimonials } = await getData();

  return (
    <div style={{ backgroundColor: "#08070a", color: "#fff", minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        .nav-link { color: #c8bfa8; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #D4AF37; }
        .hero-outline-btn:hover { background: rgba(212,175,55,0.1) !important; }
        .service-circle { transition: all 0.3s; }
        .service-circle:hover { border-color: rgba(212,175,55,0.9) !important; box-shadow: 0 0 60px rgba(212,175,55,0.3) !important; }
        .service-card { transition: all 0.3s; }
        .service-card:hover { border-color: rgba(212,175,55,0.6) !important; transform: translateY(-6px); box-shadow: 0 20px 60px rgba(212,175,55,0.15) !important; }
        .branch-card { transition: all 0.3s; }
        .branch-card:hover { border-color: rgba(212,175,55,0.5) !important; box-shadow: 0 12px 40px rgba(212,175,55,0.1) !important; }
        .testimonial-card { transition: all 0.3s; }
        .testimonial-card:hover { border-color: rgba(212,175,55,0.45) !important; box-shadow: 0 16px 50px rgba(212,175,55,0.1) !important; }
        .team-card { transition: all 0.3s; }
        .team-card:hover { border-color: rgba(212,175,55,0.5) !important; transform: translateY(-4px); }
        .partner-card { transition: all 0.3s; }
        .partner-card:hover { border-color: rgba(212,175,55,0.5) !important; }
        .social-icon { transition: all 0.2s; }
        .social-icon:hover { background: rgba(212,175,55,0.12) !important; border-color: rgba(212,175,55,0.5) !important; }
        .footer-link { color: #8a7a50; text-decoration: none; font-family: sans-serif; font-size: 13px; transition: color 0.2s; }
        .footer-link:hover { color: #D4AF37; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(8,7,10,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212,175,55,0.18)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={38} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.12em", color: "#D4AF37" }}>KUYKUY GROUP</div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a7a50", textTransform: "uppercase" }}>Premium Spa</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 36, fontSize: 13, letterSpacing: "0.06em" }}>
            {[["Home","#home"],["Tentang Kami","#tentang"],["Layanan Spa","#layanan"],["Menu Pijat","#menu"],["Lokasi Cabang","#lokasi"],["Kontak","#kontak"]].map(([label, href]) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
          </div>

          <Link href="/booking" style={{
            padding: "10px 24px", borderRadius: 999,
            background: GOLD,
            color: "#1a1100", fontWeight: 700, fontSize: 13,
            letterSpacing: "0.08em", textDecoration: "none",
            boxShadow: "0 4px 24px rgba(212,175,55,0.35)",
          }}>
            Pesan Sekarang
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
          alt="Spa background"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center right", zIndex: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse at 20% 60%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem", paddingTop: 72, width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 20, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-block", width: 40, height: 1, background: "#D4AF37", verticalAlign: "middle" }} />
              Premium Spa & Wellness Experience
            </div>
            <h1 style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px 0" }}>
              <span style={{ display: "block", color: "#fff", letterSpacing: "0.04em" }}>TEMUKAN</span>
              <span style={{ display: "block", ...GOLD_TEXT, letterSpacing: "0.04em" }}>KETENANGAN</span>
              <span style={{ display: "block", color: "#fff", letterSpacing: "0.04em" }}>SEJATI</span>
            </h1>
            <p style={{ fontSize: 17, color: "#c8bfa8", lineHeight: 1.75, marginBottom: 40, fontFamily: "sans-serif", fontWeight: 300 }}>
              Nikmati pengalaman relaksasi mewah bersama tim terapis profesional kami.<br />
              6 cabang premium di seluruh Jabodetabek siap melayani Anda.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/booking" style={{
                padding: "14px 36px", borderRadius: 999, background: GOLD,
                color: "#1a1100", fontWeight: 700, fontSize: 13,
                letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase",
                boxShadow: "0 8px 32px rgba(212,175,55,0.45)", fontFamily: "sans-serif",
              }}>
                Reservasi Sekarang
              </Link>
              <a href="#menu" className="hero-outline-btn" style={{
                padding: "14px 36px", borderRadius: 999,
                border: "1px solid rgba(212,175,55,0.5)",
                color: "#D4AF37", fontWeight: 600, fontSize: 13,
                letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase",
                fontFamily: "sans-serif", background: "transparent", transition: "background 0.2s",
              }}>
                Lihat Layanan
              </a>
            </div>

            <div style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(212,175,55,0.15)" }}>
              {[["6+", "Cabang Aktif"], ["5000+", "Pelanggan Puas"], ["10+", "Tahun Pengalaman"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 800, ...GOLD_TEXT }}>{num}</div>
                  <div style={{ fontSize: 11, color: "#8a7a50", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a7a50", fontFamily: "sans-serif" }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)" }} />
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.6 }} />

      {/* ── LAYANAN SPA ────────────────────────────────────── */}
      <section id="layanan" style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Layanan Kami ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: 12 }}>Layanan Spa Premium</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto", opacity: 0.7 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {services.map((s) => {
              const imgSrc = SERVICE_IMAGES[s.icon || ""] || "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80";
              return (
                <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: "pointer" }}>
                  <div className="service-circle" style={{
                    width: 148, height: 148, borderRadius: "50%",
                    border: "2px solid rgba(212,175,55,0.4)",
                    overflow: "hidden", position: "relative",
                    boxShadow: "0 0 40px rgba(212,175,55,0.12)",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                      {SERVICE_ICONS[s.icon || ""] || "✨"}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "#D4AF37", fontWeight: 600, fontSize: 14, letterSpacing: "0.06em" }}>{s.name}</div>
                    <div style={{ color: "#6b5f40", fontSize: 12, fontFamily: "sans-serif", marginTop: 4 }}>{s.duration_minutes} menit</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.35 }} />

      {/* ── MENU PIJAT ─────────────────────────────────────── */}
      <section id="menu" style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Pilihan Terbaik ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: 12 }}>Menu Pijat</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto", opacity: 0.7 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {services.map((s) => (
              <div key={s.id} className="service-card" style={{
                background: "linear-gradient(145deg, #131008, #1a1600)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 20, overflow: "hidden",
              }}>
                <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SERVICE_IMAGES[s.icon || ""] || "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80"}
                    alt={s.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(8,7,10,0.7))" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 16, fontSize: 26 }}>{SERVICE_ICONS[s.icon || ""] || "✨"}</div>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#D4AF37", marginBottom: 6 }}>{s.name}</h3>
                  <div style={{ fontSize: 12, color: "#8a7a50", marginBottom: 8, fontFamily: "sans-serif", letterSpacing: "0.06em" }}>{s.duration_minutes} MENIT</div>
                  {s.description && (
                    <p style={{ fontSize: 13, color: "#7a7060", lineHeight: 1.65, marginBottom: 12, fontFamily: "sans-serif" }}>{s.description}</p>
                  )}
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16, fontFamily: "sans-serif" }}>
                    Rp {s.price_idr.toLocaleString("id-ID")}
                  </div>
                  <Link href="/booking" style={{
                    display: "block", width: "100%", padding: "10px 0",
                    borderRadius: 999, textAlign: "center", background: GOLD,
                    color: "#1a1100", fontWeight: 700, fontSize: 12,
                    letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase",
                    fontFamily: "sans-serif",
                  }}>
                    Pesan Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.35 }} />

      {/* ── LOKASI CABANG ──────────────────────────────────── */}
      <section id="lokasi" style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Temukan Kami ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: 8 }}>Lokasi Cabang</h2>
            <p style={{ color: "#8a7a50", fontFamily: "sans-serif", fontSize: 14, marginBottom: 16 }}>6 Cabang di wilayah Jabodetabek</p>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto", opacity: 0.7 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {branches.map((b) => (
              <div key={b.id} className="branch-card" style={{
                background: "linear-gradient(145deg, #131008, #100e00)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 16, padding: "24px 28px",
              }}>
                <div style={{ width: 32, height: 3, background: GOLD, borderRadius: 2, marginBottom: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#D4AF37", marginBottom: 14, letterSpacing: "0.04em" }}>{b.name}</h3>
                <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <MapPin size={14} style={{ color: "rgba(212,175,55,0.7)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#a09070", fontSize: 13, lineHeight: 1.6, fontFamily: "sans-serif" }}>{b.address}</span>
                </div>
                {b.phone && (
                  <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
                    <Phone size={14} style={{ color: "rgba(212,175,55,0.7)", flexShrink: 0 }} />
                    <span style={{ color: "#a09070", fontSize: 13, fontFamily: "sans-serif" }}>{b.phone}</span>
                  </div>
                )}
                <a
                  href={b.map_url || BRANCH_MAPS[b.name] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#D4AF37", textDecoration: "none", letterSpacing: "0.06em", fontFamily: "sans-serif", textTransform: "uppercase" }}>
                  <ExternalLink size={12} /> Buka Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.35 }} />

      {/* ── TENTANG KAMI ───────────────────────────────────── */}
      <section id="tentang" style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 16, textTransform: "uppercase", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ display: "inline-block", width: 32, height: 1, background: "#D4AF37" }} />
                Tentang Kuykuy Group
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
                Keahlian & Kepedulian<br />
                <span style={GOLD_TEXT}>Dalam Setiap Sentuhan</span>
              </h2>
              <p style={{ color: "#9a8a6a", fontSize: 15, lineHeight: 1.85, marginBottom: 20, fontFamily: "sans-serif" }}>
                Kuykuy Group adalah pelopor layanan spa dan wellness premium di Jabodetabek. Dengan 6 cabang aktif di Bekasi, Bogor, dan Cikarang, kami berkomitmen memberikan pengalaman relaksasi terbaik untuk setiap pelanggan.
              </p>
              <p style={{ color: "#9a8a6a", fontSize: 15, lineHeight: 1.85, marginBottom: 40, fontFamily: "sans-serif" }}>
                Tim terapis profesional kami terlatih dengan standar tinggi, menggunakan bahan-bahan alami berkualitas untuk memastikan setiap sesi memberikan manfaat maksimal bagi tubuh dan pikiran Anda.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[["6", "Cabang Aktif"], ["5000+", "Pelanggan Puas"], ["10+", "Tahun Pengalaman"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center", padding: "20px 12px", background: "linear-gradient(145deg, #131008, #1a1600)", borderRadius: 12, border: "1px solid rgba(212,175,55,0.15)" }}>
                    <div style={{ fontSize: 30, fontWeight: 800, ...GOLD_TEXT }}>{n}</div>
                    <div style={{ color: "#8a7a50", fontSize: 11, marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.15)", position: "absolute", top: -20, left: -20 }} />
                <div style={{ width: 300, height: 300, borderRadius: "50%", border: "3px solid rgba(212,175,55,0.5)", overflow: "hidden", boxShadow: "0 0 80px rgba(212,175,55,0.18), inset 0 0 60px rgba(0,0,0,0.4)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80" alt="Spa experience" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", top: -8, right: -8, width: 88, height: 88, borderRadius: "50%", background: GOLD, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#1a1100", fontWeight: 700, fontSize: 11, lineHeight: 1.3, textAlign: "center", fontFamily: "sans-serif", letterSpacing: "0.04em", boxShadow: "0 8px 24px rgba(212,175,55,0.5)" }}>
                  <span>Premium</span><span>Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.35 }} />

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Testimonial ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: 12 }}>Kata Pelanggan Kami</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto", opacity: 0.7 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card" style={{
                background: "linear-gradient(145deg, #131008, #100e00)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 20, padding: "32px 28px",
              }}>
                <div style={{ fontSize: 56, color: "rgba(212,175,55,0.15)", lineHeight: 1, marginBottom: 8, fontFamily: "Georgia" }}>&quot;</div>
                <div style={{ display: "flex", marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                  ))}
                </div>
                <p style={{ color: "#b0a080", fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontFamily: "sans-serif", fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ borderTop: "1px solid rgba(212,175,55,0.12)", paddingTop: 16 }}>
                  <div style={{ fontWeight: 700, color: "#D4AF37", fontSize: 14, letterSpacing: "0.06em" }}>{t.name}</div>
                  {t.role && <div style={{ color: "#6b5f40", fontSize: 12, marginTop: 3, fontFamily: "sans-serif" }}>{t.role}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.35 }} />

      {/* ── TIM KAMI ───────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Tim Kami ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: 12 }}>Terapis Berpengalaman</h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto", opacity: 0.7 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
            {teamMembers.map((m, i) => (
              <div key={i} className="team-card" style={{
                textAlign: "center",
                background: "linear-gradient(145deg, #131008, #1a1600)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 20, padding: "40px 28px",
              }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28, fontWeight: 800, color: "#1a1100", boxShadow: "0 8px 32px rgba(212,175,55,0.35)", fontFamily: "sans-serif" }}>
                  {m.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{m.name}</h3>
                <div style={{ color: "#D4AF37", fontSize: 13, marginBottom: 6, letterSpacing: "0.04em" }}>{m.role}</div>
                <div style={{ color: "#6b5f40", fontSize: 12, fontFamily: "sans-serif" }}>Pengalaman {m.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.35 }} />

      {/* ── KEMITRAAN ──────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#0f0d00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#D4AF37", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Bergabung Bersama Kami ✦</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: 16 }}>Kemitraan & Solusi Staff</h2>
          <p style={{ color: "#9a8a6a", maxWidth: 600, margin: "0 auto 56px", lineHeight: 1.85, fontFamily: "sans-serif", fontSize: 15 }}>
            Bergabunglah dengan jaringan Kuykuy Group dan dapatkan manfaat eksklusif sebagai mitra atau terapis profesional. Kami menyediakan pelatihan, dukungan, dan sistem manajemen terdepan.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 48 }}>
            {[
              ["★", "Sistem Digital", "Kelola absensi dan kinerja secara digital real-time"],
              ["◆", "Pelatihan Pro", "Pelatihan terapis berstandar internasional"],
              ["✦", "Reward Program", "Bonus dan insentif menarik untuk performa terbaik"],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="partner-card" style={{
                background: "linear-gradient(145deg, #131008, #1a1600)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 16, padding: "32px 24px",
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 20, color: "#1a1100", boxShadow: "0 6px 20px rgba(212,175,55,0.4)" }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#D4AF37", marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "#8a7a50", fontSize: 13, lineHeight: 1.7, fontFamily: "sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/login" style={{
            display: "inline-block", padding: "14px 40px", borderRadius: 999, background: GOLD,
            color: "#1a1100", fontWeight: 700, fontSize: 13,
            letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase",
            fontFamily: "sans-serif", boxShadow: "0 8px 32px rgba(212,175,55,0.4)",
          }}>
            Akses Portal Staff
          </Link>
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.6 }} />

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer id="kontak" style={{ background: "#050400", padding: "72px 0 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <Logo size={44} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.12em", color: "#D4AF37" }}>KUYKUY GROUP</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#6b5f40", textTransform: "uppercase" }}>Premium Spa & Wellness</div>
                </div>
              </div>
              <p style={{ color: "#8a7a50", fontSize: 13, lineHeight: 1.85, marginBottom: 24, fontFamily: "sans-serif", maxWidth: 320 }}>
                Layanan spa dan pijat premium untuk ketenangan tubuh dan jiwa. 6 cabang di Bekasi, Bogor, dan Cikarang.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[Share2, Share2, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="social-icon" style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", background: "transparent",
                  }}>
                    <Icon size={14} style={{ color: "#D4AF37" }} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#D4AF37", marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>Layanan</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {services.map(s => (
                  <li key={s.id} style={{ marginBottom: 10 }}>
                    <a href="#menu" className="footer-link">{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#D4AF37", marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>Kontak</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Phone size={14} style={{ color: "rgba(212,175,55,0.7)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#8a7a50", fontSize: 13, fontFamily: "sans-serif" }}>+62 21 555-0100</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Mail size={14} style={{ color: "rgba(212,175,55,0.7)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#8a7a50", fontSize: 13, fontFamily: "sans-serif" }}>hello@kuykuygroup.com</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <MapPin size={14} style={{ color: "rgba(212,175,55,0.7)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#8a7a50", fontSize: 13, fontFamily: "sans-serif" }}>Bekasi · Bogor · Cikarang</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "#4a4030", fontSize: 12, fontFamily: "sans-serif" }}>© 2025 Kuykuy Group. All rights reserved.</div>
            <div style={{ color: "#4a4030", fontSize: 12, fontFamily: "sans-serif", letterSpacing: "0.06em" }}>Premium Spa & Wellness Indonesia</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
