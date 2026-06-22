import Link from "next/link";
import Logo from "./Logo";
import { MapPin, Phone, Mail, Share2 } from "lucide-react";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";

const QUICK_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Tentang", href: "/tentang" },
  { label: "Cabang", href: "/cabang" },
  { label: "Kontak", href: "/kontak" },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: "#050400", padding: "72px 0 32px", borderTop: "1px solid rgba(212,175,55,0.12)" }}>
      <style>{`.footer-link { color: #8a7a50; text-decoration: none; }`}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr", gap: 56, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Logo size={44} />
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.12em", background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                KUYKUY GROUP
              </div>
            </div>
            <p style={{ color: "#6b5f3e", fontSize: 14, lineHeight: 1.8, maxWidth: 300, marginBottom: 24 }}>
              Pengalaman relaksasi premium di Jabodetabek. Layanan spa berkualitas tinggi dengan sentuhan tradisional dan modern untuk kesejahteraan Anda.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[Share2, Phone, Mail].map((Icon, i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon size={16} color={GOLD_COLOR} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: GOLD_COLOR, textTransform: "uppercase", marginBottom: 20 }}>Navigasi</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link" style={{ fontSize: 14 }}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: GOLD_COLOR, textTransform: "uppercase", marginBottom: 20 }}>Kontak</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <Phone size={14} color={GOLD_COLOR} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#8a7a50", fontSize: 14 }}>+62 21 555-0100</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <Mail size={14} color={GOLD_COLOR} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#8a7a50", fontSize: 14 }}>hello@kuykuygroup.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <MapPin size={14} color={GOLD_COLOR} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#8a7a50", fontSize: 14 }}>Bekasi · Bogor · Cikarang</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#4a4030", fontSize: 13, letterSpacing: "0.04em" }}>© 2025 Kuykuy Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
