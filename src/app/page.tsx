import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { MapPin, Star, ChevronRight, Sparkles, Shield, Heart } from "lucide-react";
import { supabase, type Service } from "@/lib/supabase";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_TEXT: React.CSSProperties = {
  background: GOLD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const SERVICE_IMAGES: Record<string, string> = {
  leaf: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500&q=80",
  sparkles: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80",
  flame: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&q=80",
  hand: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80",
};
const SERVICE_ICONS: Record<string, string> = {
  leaf: "🌸", sparkles: "✨", flame: "🔥", hand: "💅",
};

async function getServices() {
  const { data } = await supabase.from("services").select("*").eq("active", true).order("sort_order").limit(3);
  return (data as Service[]) ?? [];
}

export default async function HomePage() {
  const services = await getServices();

  return (
    <div style={{ backgroundColor: "#08070a", color: "#fff", minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        .hero-outline-btn:hover { background: rgba(212,175,55,0.12) !important; }
        .service-card { transition: all 0.35s; }
        .service-card:hover { transform: translateY(-8px); border-color: rgba(212,175,55,0.6) !important; box-shadow: 0 24px 60px rgba(212,175,55,0.18) !important; }
        .feature-card { transition: all 0.3s; }
        .feature-card:hover { border-color: rgba(212,175,55,0.5) !important; transform: translateY(-4px); }
        .gold-btn { transition: all 0.2s; }
        .gold-btn:hover { box-shadow: 0 12px 40px rgba(212,175,55,0.6) !important; transform: translateY(-1px); }
        @keyframes scrollLine { 0%,100% { opacity:0.3; } 50% { opacity:1; } }
        .scroll-line { animation: scrollLine 2s ease-in-out infinite; }
      `}</style>

      <SiteNav />

      {/* HERO WITH VIDEO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          poster="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
        >
          <source src="https://videos.pexels.com/video-files/3997799/3997799-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/5309803/5309803-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(110deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.30) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse at 15% 55%, rgba(212,175,55,0.10) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: GOLD, zIndex: 3 }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem", paddingTop: 72, width: "100%" }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 22, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 14, fontFamily: "sans-serif" }}>
              <span style={{ display: "inline-block", width: 48, height: 1, background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
              Premium Spa & Wellness Experience
              <span style={{ display: "inline-block", width: 48, height: 1, background: "linear-gradient(270deg, #D4AF37, transparent)" }} />
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 800, lineHeight: 1.05, margin: "0 0 28px 0", letterSpacing: "0.02em" }}>
              <span style={{ display: "block", color: "#fff" }}>TEMUKAN</span>
              <span style={{ display: "block", ...GOLD_TEXT }}>KETENANGAN</span>
              <span style={{ display: "block", color: "#fff" }}>SEJATI</span>
            </h1>
            <p style={{ fontSize: 17, color: "#c8bfa8", lineHeight: 1.8, marginBottom: 44, fontFamily: "sans-serif", fontWeight: 300, maxWidth: 540 }}>
              Nikmati pengalaman relaksasi mewah bersama tim terapis profesional kami.
              6 cabang premium di seluruh Jabodetabek siap melayani Anda.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
              <Link href="/layanan" className="gold-btn" style={{ padding: "15px 40px", borderRadius: 999, background: GOLD, color: "#1a1100", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase", boxShadow: "0 8px 32px rgba(212,175,55,0.45)", fontFamily: "sans-serif" }}>Lihat Layanan</Link>
              <Link href="/cabang" className="hero-outline-btn" style={{ padding: "15px 40px", borderRadius: 999, border: "1.5px solid rgba(212,175,55,0.55)", color: "#D4AF37", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase", fontFamily: "sans-serif", background: "transparent", transition: "background 0.2s" }}>Cari Cabang</Link>
            </div>
            <div style={{ display: "flex", gap: 48, paddingTop: 32, borderTop: "1px solid rgba(212,175,55,0.18)" }}>
              {[["6+", "Cabang Aktif"], ["5000+", "Pelanggan Puas"], ["10+", "Tahun Pengalaman"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 32, fontWeight: 800, ...GOLD_TEXT, lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 10, color: "#8a7a50", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "sans-serif", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#8a7a50", fontFamily: "sans-serif" }}>SCROLL</div>
          <div className="scroll-line" style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #D4AF37, transparent)" }} />
        </div>
      </section>

      <div style={{ height: 2, background: GOLD, opacity: 0.7 }} />

      {/* KEUNGGULAN */}
      <section style={{ padding: "100px 0", background: "#0c0b00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 14, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Mengapa Kuykuy Group ✦</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", fontWeight: 700, marginBottom: 14 }}>Standar Premium,<br /><span style={GOLD_TEXT}>Pengalaman Tak Terlupakan</span></h2>
            <div style={{ width: 60, height: 2, background: GOLD, margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              { icon: Sparkles, title: "Terapis Bersertifikat", desc: "Seluruh terapis kami telah melalui pelatihan intensif dan bersertifikat resmi dengan standar internasional." },
              { icon: Shield, title: "Bahan Alami Premium", desc: "Kami hanya menggunakan produk dan bahan alami pilihan untuk memastikan pengalaman terbaik dan aman." },
              { icon: Heart, title: "Kepuasan Pelanggan", desc: "Lebih dari 5.000 pelanggan puas mempercayakan relaksasi mereka kepada tim profesional Kuykuy Group." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card" style={{ background: "linear-gradient(145deg, #131008, #1a1600)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 24, padding: "40px 32px" }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Icon size={28} color="#D4AF37" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#D4AF37", marginBottom: 12 }}>{title}</h3>
                <p style={{ color: "#8a7a60", fontSize: 14, lineHeight: 1.8, fontFamily: "sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(212,175,55,0.2)" }} />

      {/* LAYANAN FEATURED */}
      <section style={{ padding: "100px 0", background: "#08070a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 14, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Layanan Unggulan ✦</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}>Pilihan Spa<br /><span style={GOLD_TEXT}>Terpopuler</span></h2>
            </div>
            <Link href="/layanan" style={{ display: "flex", alignItems: "center", gap: 6, color: "#D4AF37", textDecoration: "none", fontSize: 13, fontFamily: "sans-serif", fontWeight: 600 }}>Lihat Semua <ChevronRight size={16} /></Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {services.map((s) => {
              const imgSrc = SERVICE_IMAGES[s.icon || ""] || SERVICE_IMAGES.leaf;
              return (
                <div key={s.id} className="service-card" style={{ background: "linear-gradient(145deg, #131008, #1a1600)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(8,7,10,0.85))" }} />
                    <div style={{ position: "absolute", bottom: 14, left: 18, fontSize: 32 }}>{SERVICE_ICONS[s.icon || ""] || "✨"}</div>
                    <div style={{ position: "absolute", top: 14, right: 14, padding: "4px 12px", borderRadius: 999, background: "rgba(212,175,55,0.2)", border: "1px solid rgba(212,175,55,0.4)", fontSize: 11, color: "#D4AF37", fontFamily: "sans-serif", fontWeight: 600 }}>{s.duration_minutes} mnt</div>
                  </div>
                  <div style={{ padding: "22px 24px 28px" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{s.name}</h3>
                    {s.description && <p style={{ fontSize: 13, color: "#7a7060", lineHeight: 1.7, marginBottom: 16, fontFamily: "sans-serif" }}>{s.description}</p>}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, ...GOLD_TEXT, fontFamily: "sans-serif" }}>Rp {s.price_idr.toLocaleString("id-ID")}</div>
                      <Link href="/layanan" style={{ padding: "8px 20px", borderRadius: 999, background: GOLD, color: "#1a1100", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", fontFamily: "sans-serif" }}>Pesan</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(212,175,55,0.2)" }} />

      {/* TESTIMONI */}
      <section style={{ padding: "80px 0", background: "#0c0b00" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="#D4AF37" color="#D4AF37" />)}
          </div>
          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", color: "#c8bfa8", fontStyle: "italic", maxWidth: 700, margin: "0 auto 20px", lineHeight: 1.7 }}>&ldquo;Pelayanan luar biasa! Terapis sangat profesional dan tempatnya sangat nyaman. Pasti akan kembali lagi!&rdquo;</p>
          <div style={{ color: "#D4AF37", fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}>— Sari W. · Pelanggan Setia</div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(212,175,55,0.2)" }} />

      {/* CTA BANNER */}
      <section style={{ padding: "80px 2rem", textAlign: "center", background: "linear-gradient(135deg, #1a1400 0%, #0f0c00 50%, #1a1400 100%)", borderTop: "1px solid rgba(212,175,55,0.25)", borderBottom: "1px solid rgba(212,175,55,0.25)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#D4AF37", marginBottom: 20, textTransform: "uppercase", fontFamily: "sans-serif" }}>✦ Mulai Perjalanan Relaksasi Anda ✦</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>Rasakan Perbedaan<br /><span style={GOLD_TEXT}>Sentuhan Premium</span></h2>
          <p style={{ color: "#9a8a6a", fontSize: 15, lineHeight: 1.8, marginBottom: 40, fontFamily: "sans-serif" }}>Temukan cabang terdekat kami dan buat reservasi hari ini. Tim kami siap menyambut Anda.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/cabang" className="gold-btn" style={{ padding: "15px 44px", borderRadius: 999, background: GOLD, color: "#1a1100", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase", fontFamily: "sans-serif", boxShadow: "0 8px 32px rgba(212,175,55,0.4)" }}>Cari Cabang Terdekat</Link>
            <Link href="/kontak" style={{ display: "flex", alignItems: "center", gap: 6, padding: "15px 44px", borderRadius: 999, border: "1.5px solid rgba(212,175,55,0.4)", color: "#D4AF37", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase", fontFamily: "sans-serif" }}><MapPin size={15} /> Hubungi Kami</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
