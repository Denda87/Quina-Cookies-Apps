"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { login } from "@/lib/auth";
import { Eye, EyeOff, Mail, Lock, LayoutGrid, ClipboardList, BarChart2, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
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
      className="min-h-screen flex flex-col max-w-[430px] mx-auto"
      style={{ background: "linear-gradient(170deg, #110e00 0%, #0a0a0a 35%, #100c00 100%)" }}
    >
      {/* HEADER */}
      <div
        className="flex flex-col items-center justify-center pt-14 pb-8 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1e1600 0%, #141000 60%, #0a0a0a 100%)",
          borderBottom: "1.5px solid #D4AF3740",
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, #D4AF3722 0%, transparent 70%)" }}/>
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #D4AF3780, transparent)" }}/>
        <div className="relative z-10" style={{ filter: "drop-shadow(0 0 24px #D4AF3760)" }}>
          <Logo size={100} />
        </div>
        <div className="relative z-10 mt-5 flex flex-col items-center gap-1">
          <h1
            className="font-serif text-2xl font-bold tracking-[0.18em]"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #f5e070, #D4AF37, #B8960C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome Back
          </h1>
          <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}/>
          <p className="text-gray-600 text-xs tracking-widest mt-1">KUYKUY GROUP</p>
        </div>
      </div>

      {/* FORM */}
      <div className="flex-1 px-6 pt-8 pb-4 flex flex-col gap-5">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Email / No. Handphone</label>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-4"
              style={{
                background: "linear-gradient(135deg, #141000, #0f0d00)",
                border: "1px solid #D4AF3750",
                boxShadow: "inset 0 1px 3px #00000060",
              }}
            >
              <Mail size={17} color="#D4AF3780" />
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-700"
                placeholder="Email / No. Handphone"
                required
                autoComplete="username"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-600 text-xs tracking-widest uppercase pl-1">Password</label>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-4"
              style={{
                background: "linear-gradient(135deg, #141000, #0f0d00)",
                border: "1px solid #D4AF3750",
                boxShadow: "inset 0 1px 3px #00000060",
              }}
            >
              <Lock size={17} color="#D4AF3780" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-700"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="p-1">
                {showPass ? <EyeOff size={16} color="#555" /> : <Eye size={16} color="#555" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="rounded-xl px-4 py-3 text-center" style={{ background: "#cc000020", border: "1px solid #cc000040" }}>
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.3em] disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #f5e070 35%, #D4AF37 65%, #B8960C 100%)",
              boxShadow: "0 6px 28px #D4AF3760, 0 2px 8px #00000060",
            }}
          >
            {loading ? "Memuat..." : "LOGIN"}
          </button>
        </form>
        <div className="rounded-xl px-4 py-3 text-center" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
          <p className="text-gray-700 text-xs mb-1 tracking-wider">Demo Akun:</p>
          <p className="text-gray-600 text-[11px]">Staff: staff@kuykuy.com / kuykuy123</p>
          <p className="text-gray-600 text-[11px]">Admin: admin@kuykuy.com / admin123</p>
        </div>
      </div>

      {/* BOTTOM NAV decorative */}
      <div
        className="flex justify-around items-center py-4 px-4"
        style={{ borderTop: "1.5px solid #D4AF3728", background: "linear-gradient(180deg, #0a0a0a, #050500)" }}
      >
        {[
          { icon: LayoutGrid, label: "Dashboard" },
          { icon: ClipboardList, label: "Absensi" },
          { icon: BarChart2, label: "Kinerja" },
          { icon: User, label: "Profile" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon size={20} color="#333" strokeWidth={1.8} />
            <span className="text-[10px] tracking-wider" style={{ color: "#333" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
