"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { login } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

const GOLD = "#caa23d";
const GOLD_GRAD = "linear-gradient(150deg,#7c5418 0%,#c8902b 16%,#f7e08c 50%,#c8902b 84%,#7c5418 100%)";
const FIELD_BG = "linear-gradient(160deg,#161616,#101010)";
const FIELD_BORDER = "1px solid rgba(202,162,61,.22)";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 700));
    const user = login(email, password);
    if (user) {
      router.push(user.role === "admin" ? "/dashboard" : "/staff/dashboard");
    } else {
      setError("Email atau password salah.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "radial-gradient(120% 90% at 50% -10%, #1a1712 0%, #0c0c0d 46%, #060606 100%)",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 392,
          display: "flex",
          flexDirection: "column",
          padding: "10px 28px 0",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            height: 300,
            background: "radial-gradient(closest-side, rgba(201,150,43,.3), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", alignSelf: "center", filter: "drop-shadow(0 10px 24px rgba(0,0,0,.6))" }}>
          <Logo size={110} />
        </div>

        {/* Title */}
        <h1
          style={{
            position: "relative",
            margin: "18px 0 0",
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: ".5px",
            color: "#f3ead4",
          }}
        >
          Welcome Back
        </h1>
        <p style={{ position: "relative", margin: "7px 0 0", textAlign: "center", fontSize: 13.5, color: "#8a8475" }}>
          Kuykuy Group · Staff Portal
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ position: "relative", marginTop: 34, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Email */}
          <label style={{ display: "flex", alignItems: "center", gap: 12, height: 56, padding: "0 16px", borderRadius: 13, background: FIELD_BG, border: FIELD_BORDER }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.7">
              <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
              <path d="M3 8l9 5 9-5" />
            </svg>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              autoComplete="username"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#ece5d4", font: "500 15px 'Manrope'" }}
            />
          </label>

          {/* Password */}
          <label style={{ display: "flex", alignItems: "center", gap: 12, height: 56, padding: "0 16px", borderRadius: 13, background: FIELD_BG, border: FIELD_BORDER }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.7">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
              <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
            </svg>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#ece5d4", font: "500 15px 'Manrope'" }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}>
              {showPass ? <EyeOff size={16} color="#7c766a" /> : <Eye size={16} color="#7c766a" />}
            </button>
          </label>

          {error && (
            <div style={{ borderRadius: 11, padding: "11px 14px", textAlign: "center", background: "rgba(192,57,43,.12)", border: "1px solid rgba(192,57,43,.3)" }}>
              <p style={{ color: "#e07a6f", fontSize: 12, margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="kkBtn"
            style={{
              position: "relative",
              marginTop: 12,
              height: 56,
              border: "none",
              borderRadius: 13,
              cursor: loading ? "default" : "pointer",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: 3,
              color: "#2a1d05",
              background: GOLD_GRAD,
              boxShadow: "0 14px 30px -10px rgba(200,144,43,.55), inset 0 1px 0 rgba(255,255,255,.5)",
              opacity: loading ? 0.7 : 1,
              overflow: "hidden",
            }}
          >
            {loading ? "MEMUAT..." : "LOGIN"}
          </button>
        </form>

        {/* Lupa password / demo accounts toggle */}
        <button
          type="button"
          onClick={() => setShowAccounts(s => !s)}
          style={{ position: "relative", margin: "18px auto 0", fontSize: 12.5, color: "#7c766a", background: "none", border: "none", cursor: "pointer" }}
        >
          {showAccounts ? "Sembunyikan akun demo" : "Lupa password?"}
        </button>

        {showAccounts && (
          <div style={{ position: "relative", marginTop: 14, borderRadius: 13, padding: "14px 16px", background: FIELD_BG, border: FIELD_BORDER }}>
            <p style={{ fontSize: 10, letterSpacing: ".15em", color: GOLD, textAlign: "center", margin: "0 0 10px", textTransform: "uppercase" }}>Akun Demo</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Admin", "admin@kuykuy.com", "admin123"],
                ["Therapist", "staff@kuykuy.com", "kuykuy123"],
                ["Kasir", "kasir@kuykuy.com", "kuykuy123"],
                ["Sub Kasir", "subkasir@kuykuy.com", "kuykuy123"],
                ["GRO", "gro@kuykuy.com", "kuykuy123"],
                ["Office Boy", "ob@kuykuy.com", "kuykuy123"],
              ].map(([role, em, pw]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => { setEmail(em); setPassword(pw); }}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, background: "rgba(202,162,61,.05)", border: "1px solid rgba(202,162,61,.1)", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}
                >
                  <span style={{ color: GOLD, fontSize: 10, minWidth: 64, textAlign: "left" }}>{role}</span>
                  <span style={{ color: "#8a8475", fontSize: 10, flex: 1, textAlign: "center" }}>{em}</span>
                  <span style={{ color: "#5a5448", fontSize: 10 }}>{pw}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .kkBtn::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 40%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent);
          animation: kkShine 4s ease-in-out infinite;
        }
        @keyframes kkShine {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(240%); }
        }
      `}</style>
    </div>
  );
}
