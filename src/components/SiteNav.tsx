"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Tentang", href: "/tentang" },
  { label: "Cabang", href: "/cabang" },
  { label: "Kontak", href: "/kontak" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 72,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: scrolled ? "rgba(8,7,10,0.97)" : "rgba(8,7,10,0.82)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}
        >
          <Logo size={38} />
          <div style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.12em",
                background: GOLD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              KUYKUY GROUP
            </div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a7a50", textTransform: "uppercase" }}>
              Premium Spa
            </div>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }}>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.06em",
                  color: isActive ? GOLD_COLOR : "#c8b88a",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 20,
                      height: 2,
                      borderRadius: 1,
                      background: GOLD,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/booking"
          style={{
            flexShrink: 0,
            padding: "10px 22px",
            background: GOLD,
            color: "#08070a",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.08em",
            borderRadius: 6,
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 16px rgba(212,175,55,0.3)",
          }}
        >
          Pesan Sekarang
        </Link>
      </div>
    </nav>
  );
}
