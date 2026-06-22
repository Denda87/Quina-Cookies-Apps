import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";
const BG = "#08070a";

const STATS = [
  { value: "6", label: "Cabang Aktif" },
  { value: "5000+", label: "Pelanggan Puas" },
  { value: "10+", label: "Tahun Pengalaman" },
];

const TEAM = [
  { name: "Maya Putri", role: "Senior Therapist", years: "5 tahun", initials: "MP" },
  { name: "Andi Saputra", role: "Hot Stone Specialist", years: "4 tahun", initials: "AS" },
  { name: "Sinta Rahayu", role: "Facial Expert", years: "3 tahun", initials: "SR" },
];

const FEATURES = [
  { emoji: "💻", title: "Sistem Digital", desc: "Manajemen booking dan absensi berbasis teknologi modern untuk efisiensi operasional." },
  { emoji: "🎓", title: "Pelatihan Pro", desc: "Program pelatihan berkelanjutan untuk memastikan standar pelayanan tertinggi." },
  { emoji: "🎁", title: "Reward Program", desc: "Program loyalitas eksklusif untuk menghargai kepercayaan pelanggan setia kami." },
];

export default function TentangPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e8d9b0" }}>
      <SiteNav />
      <section style={{ paddingTop: 72, background: "linear-gradient(160deg, #12100a 0%, #1a1500 50%, #08070a 100%)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 72px", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: GOLD_COLOR, textTransform: "uppercase", marginBottom: 16 }}>Kuykuy Group</p>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "0.1em", background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>TENTANG KAMI</h1>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 24 }}>Cerita Kami</h2>
            <p style={{ fontSize: 16, color: "#8a7a50", lineHeight: 1.9, marginBottom: 18 }}>Kuykuy Group lahir dari semangat menghadirkan pengalaman relaksasi berkualitas tinggi yang terjangkau bagi masyarakat Jabodetabek. Berawal dari satu cabang kecil di Bekasi, kami tumbuh menjadi jaringan spa premium yang dipercaya ribuan pelanggan.</p>
            <p style={{ fontSize: 16, color: "#8a7a50", lineHeight: 1.9, marginBottom: 18 }}>Dengan lebih dari 10 tahun pengalaman di industri wellness, Kuykuy Group telah membangun reputasi sebagai merek spa terpercaya di Jabodetabek. Kini kami hadir di 6 cabang strategis di Bekasi, Bogor, dan Cikarang.</p>
            <p style={{ fontSize: 16, color: "#8a7a50", lineHeight: 1.9 }}>Setiap sesi perawatan kami dirancang dengan memadukan kearifan tradisional dan teknik modern, menggunakan bahan-bahan alami pilihan untuk memberikan manfaat terbaik bagi tubuh dan pikiran Anda.</p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(212,175,55,0.5)", boxShadow: "0 0 48px rgba(212,175,55,0.2), 0 0 96px rgba(212,175,55,0.08)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80" alt="Kuykuy Group Spa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #0e0c07 0%, #131008 100%)", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "32px 24px", borderLeft: i > 0 ? "1px solid rgba(212,175,55,0.1)" : "none" }}>
              <div style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 900, background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: "#6b5f3e", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: GOLD_COLOR, textTransform: "uppercase", textAlign: "center", marginBottom: 48 }}>Tim Kami</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {TEAM.map((m, i) => (
            <div key={i} style={{ background: "linear-gradient(160deg, #13110c, #0e0c07)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 16, padding: "36px 28px", textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 26, fontWeight: 800, color: "#08070a", boxShadow: "0 4px 20px rgba(212,175,55,0.3)" }}>{m.initials}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#e8d9b0", marginBottom: 6 }}>{m.name}</h3>
              <p style={{ fontSize: 13, color: GOLD_COLOR, marginBottom: 8 }}>{m.role}</p>
              <p style={{ fontSize: 12, color: "#4a4030" }}>{m.years} pengalaman</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "linear-gradient(160deg, #0e0c07 0%, #13110c 100%)", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: GOLD_COLOR, textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>Kemitraan</h2>
          <p style={{ textAlign: "center", color: "#6b5f3e", marginBottom: 48, fontSize: 15 }}>Bergabung sebagai mitra dan nikmati berbagai keuntungan eksklusif</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: "#08070a", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 18 }}>{f.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e8d9b0", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#6b5f3e", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/login" style={{ display: "inline-block", padding: "14px 40px", background: GOLD, color: "#08070a", fontWeight: 700, fontSize: 15, letterSpacing: "0.08em", borderRadius: 8, textDecoration: "none", boxShadow: "0 4px 24px rgba(212,175,55,0.35)" }}>Akses Portal Staff</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
