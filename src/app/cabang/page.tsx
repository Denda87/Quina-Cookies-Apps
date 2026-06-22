import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { supabase, type Branch } from "@/lib/supabase";
import { MapPin, Phone, ExternalLink } from "lucide-react";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";
const BG = "#08070a";

const BRANCH_MAPS: Record<string, string> = {
  "KUY BM": "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",
  "KUY BETOS": "https://maps.app.goo.gl/vWqKNtksLgPRdye16",
  "CRYSTAL KUY": "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",
  "KUY STORY": "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",
  "XI-KUY": "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",
  "Strawberry Spa & Therapy": "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",
  "V PHOENIX": "https://maps.app.goo.gl/4z7PPgg5myAM4TCE7",
  "SIERRA": "https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7",
  "VIERZHEN": "https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8",
  "INFINITY": "https://maps.app.goo.gl/fYaPmGRKddJkLjbg8",
};

function toWaLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? "62" + digits.slice(1) : digits;
  return `https://wa.me/${normalized}`;
}

export default async function CabangPage() {
  const { data: branches } = await supabase
    .from("branches")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  const list: Branch[] = branches ?? [];

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e8d9b0" }}>
      <SiteNav />

      <section
        style={{
          paddingTop: 72,
          background: "linear-gradient(160deg, #12100a 0%, #1a1500 50%, #08070a 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "80px 24px 72px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: GOLD_COLOR, textTransform: "uppercase", marginBottom: 16 }}>
            Kuykuy Group
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 900,
              letterSpacing: "0.1em",
              background: GOLD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 18,
            }}
          >
            LOKASI CABANG
          </h1>
          <p style={{ fontSize: 17, color: "#8a7a50", lineHeight: 1.7 }}>
            11 Cabang Premium di Jabodetabek
          </p>
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, #0e0c07 0%, #131008 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
          }}
        >
          {[
            { value: "11 Cabang", label: "Tersebar Strategis" },
            { value: "Bekasi · Bogor · Cikarang", label: "Area Pelayanan" },
            { value: "Buka 7 Hari", label: "09:00 – 22:00 WIB" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "24px",
                borderLeft: i > 0 ? "1px solid rgba(212,175,55,0.1)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  fontWeight: 800,
                  background: GOLD,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#6b5f3e", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {list.map((branch) => {
            const mapUrl = BRANCH_MAPS[branch.name] ?? branch.map_url ?? "#";
            const waUrl = toWaLink(branch.phone ?? "");
            return (
              <div
                key={branch.id}
                style={{
                  background: "linear-gradient(160deg, #13110c, #0e0c07)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 5,
                    background: GOLD,
                  }}
                />
                <div style={{ padding: "28px 24px 24px" }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: GOLD_COLOR,
                      letterSpacing: "0.06em",
                      marginBottom: 18,
                    }}
                  >
                    {branch.name}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 }}>
                    {branch.address && (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <MapPin size={14} color={GOLD_COLOR} style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#8a7a50", lineHeight: 1.6 }}>{branch.address}</span>
                      </div>
                    )}
                    {branch.phone && (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Phone size={14} color={GOLD_COLOR} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#8a7a50" }}>{branch.phone}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "10px 0",
                        border: "1px solid rgba(212,175,55,0.35)",
                        borderRadius: 8,
                        color: GOLD_COLOR,
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                      }}
                    >
                      <ExternalLink size={13} />
                      Buka Google Maps
                    </a>
                    {branch.phone && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          padding: "10px 0",
                          background: GOLD,
                          borderRadius: 8,
                          color: "#08070a",
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: "none",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Hubungi WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
