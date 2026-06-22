"use client";

import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";
const BG = "#08070a";

const CONTACT_ITEMS = [
  { icon: Phone, title: "Telepon", value: "+62 21 555-0100", sub: "Senin – Minggu, 09:00 – 22:00" },
  { icon: Mail, title: "Email", value: "hello@kuykuygroup.com", sub: "Respons dalam 24 jam" },
  { icon: MapPin, title: "Lokasi", value: "Bekasi · Bogor · Cikarang", sub: "6 cabang di Jabodetabek" },
  { icon: Clock, title: "Jam Operasional", value: "09:00 – 22:00 WIB", sub: "Buka setiap hari" },
];

export default function KontakPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 16px", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, color: "#e8d9b0", fontSize: 14, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e8d9b0" }}>
      <SiteNav />
      <section style={{ paddingTop: 72, background: "linear-gradient(160deg, #12100a 0%, #1a1500 50%, #08070a 100%)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 72px", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: GOLD_COLOR, textTransform: "uppercase", marginBottom: 16 }}>Kuykuy Group</p>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "0.1em", background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 18 }}>HUBUNGI KAMI</h1>
          <p style={{ fontSize: 17, color: "#8a7a50", lineHeight: 1.7 }}>Kami siap melayani Anda setiap hari</p>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 32 }}>Informasi Kontak</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ background: "linear-gradient(160deg, #13110c, #0e0c07)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 12, padding: "20px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} color={GOLD_COLOR} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#6b5f3e", textTransform: "uppercase", marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#e8d9b0", marginBottom: 2 }}>{item.value}</div>
                      <div style={{ fontSize: 12, color: "#4a4030" }}>{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: "linear-gradient(160deg, #13110c, #0e0c07)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 16, padding: "40px 36px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 12 }}>Pesan terkirim!</h3>
                <p style={{ color: "#6b5f3e", fontSize: 15, lineHeight: 1.7 }}>Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.</p>
                <button onClick={() => { setSubmitted(false); setName(""); setPhone(""); setMessage(""); }} style={{ marginTop: 28, padding: "12px 32px", background: GOLD, color: "#08070a", fontWeight: 700, fontSize: 14, border: "none", borderRadius: 8, cursor: "pointer" }}>Kirim Pesan Lain</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 700, background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 32 }}>Kirim Pesan</h2>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, letterSpacing: "0.1em", color: "#6b5f3e", textTransform: "uppercase", marginBottom: 8 }}>Nama Lengkap</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama Anda" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, letterSpacing: "0.1em", color: "#6b5f3e", textTransform: "uppercase", marginBottom: 8 }}>Nomor Telepon</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62 8xx xxxx xxxx" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, letterSpacing: "0.1em", color: "#6b5f3e", textTransform: "uppercase", marginBottom: 8 }}>Pesan</label>
                    <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tulis pesan Anda di sini..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <button type="submit" style={{ padding: "14px 0", background: GOLD, color: "#08070a", fontWeight: 700, fontSize: 15, letterSpacing: "0.08em", border: "none", borderRadius: 8, cursor: "pointer", boxShadow: "0 4px 20px rgba(212,175,55,0.3)", marginTop: 4 }}>Kirim Pesan</button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
