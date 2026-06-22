import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { MapPin, ExternalLink } from "lucide-react";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";
const BG = "#08070a";

type Branch = {
  name: string;
  address: string;
  mapUrl: string;
};

// Semua cabang Kuykuy Group — tampil langsung tanpa bergantung database
const BRANCHES: Branch[] = [
  {
    name: "KUY BM",
    address:
      "Ruko Bekasi Mas, Jl. Ahmad Yani No.24 Blok B, Marga Jaya, Kec. Bekasi Selatan, Kota Bekasi, Jawa Barat 17141",
    mapUrl: "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",
  },
  {
    name: "KUY BETOS",
    address:
      "Jl. Cut Mutia No.23 Blok G, Margahayu, Kec. Bekasi Timur, Kota Bekasi, Jawa Barat 17113",
    mapUrl: "https://maps.app.goo.gl/vWqKNtksLgPRdye16",
  },
  {
    name: "CRYSTAL KUY",
    address:
      "Ruko Sentral Niaga Kalimalang Blok B1 No.16, Jl. Sentra Niaga Kalimalang No.15, Kayuringin Jaya, Kec. Bekasi Sel., Kota Bekasi, Jawa Barat 17144",
    mapUrl: "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",
  },
  {
    name: "KUY STORY",
    address:
      "Ruko Commpark Kota Wisata Blok H No.29, Limus Nunggal, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820",
    mapUrl: "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",
  },
  {
    name: "XI-KUY",
    address:
      "Jalan Niaga Raya Jababeka 2 Ruko CBD, Blok D No.16-17, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",
    mapUrl: "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",
  },
  {
    name: "Strawberry Spa & Therapy",
    address:
      "Ruko Kawasan Niaga Citra Grand Cibubur, Jl. Alternatif Cibubur No.26, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435",
    mapUrl: "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",
  },
  {
    name: "V PHOENIX",
    address:
      "Plaza Amsterdam, Jl. MH. Thamrin No.57 Blok A.21, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16710",
    mapUrl: "https://maps.app.goo.gl/4z7PPgg5myAM4TCE7",
  },
  {
    name: "SIERRA",
    address:
      "Ruko Podium, Jl. Mataram Blok B.1 & B.2, Cibatu, Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",
    mapUrl: "https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7",
  },
  {
    name: "VIERZHEN",
    address:
      "Jl. Niaga Raya Ruko CBD Jababeka Kav AA3 Blok A88, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",
    mapUrl: "https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8",
  },
  {
    name: "MIRACLE KUY",
    address:
      "Ruko Cibinong Center, Blok E No.7, Pakansari, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16915",
    mapUrl: "https://maps.app.goo.gl/TfF55aGh7N4TPEXC6",
  },
  {
    name: "INFINITY",
    address:
      "Ruko Plaza Amsterdam City, Blok C8, Sentul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810",
    mapUrl: "https://maps.app.goo.gl/fYaPmGRKddJkLjbg8",
  },
];

function embedSrc(branch: Branch) {
  // Peta tertanam via query alamat (tanpa API key)
  const q = encodeURIComponent(`Kuykuy ${branch.name}, ${branch.address}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export default function CabangPage() {
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
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 28,
          }}
        >
          {BRANCHES.map((branch) => (
            <div
              key={branch.name}
              style={{
                background: "linear-gradient(160deg, #13110c, #0e0c07)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: 5, background: GOLD }} />

              {/* Peta tertanam */}
              <div style={{ position: "relative", height: 200, background: "#0a0906" }}>
                <iframe
                  src={embedSrc(branch)}
                  title={`Peta ${branch.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "100%",
                    filter: "grayscale(0.3) contrast(1.05)",
                  }}
                  allowFullScreen
                />
              </div>

              <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: GOLD_COLOR,
                    letterSpacing: "0.06em",
                    marginBottom: 14,
                  }}
                >
                  {branch.name}
                </h3>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22, flex: 1 }}>
                  <MapPin size={15} color={GOLD_COLOR} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#8a7a50", lineHeight: 1.65 }}>{branch.address}</span>
                </div>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "11px 0",
                    background: GOLD,
                    borderRadius: 8,
                    color: "#08070a",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  <ExternalLink size={14} />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
