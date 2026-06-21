"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { login } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

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
    await new Promise(r => setTimeout(r, 600));
    const user = login(email, password);
    if (user) {
      router.push(user.role === "admin" ? "/dashboard" : "/staff/dashboard");
    } else {
      setError("Email atau password salah.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={64} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#D4AF37] mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Masuk ke portal Kuykuy Group</p>
        </div>

        <div className="bg-[#111] border border-[#D4AF37]/20 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email / No. Handphone</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors placeholder:text-gray-600"
                placeholder="staff@kuykuy.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors placeholder:text-gray-600 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-bold text-black rounded-xl gold-gradient hover:opacity-90 transition-opacity text-sm uppercase tracking-widest disabled:opacity-60"
            >
              {loading ? "Memuat..." : "LOGIN"}
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Demo: staff@kuykuy.com / kuykuy123</p>
            <p>Admin: admin@kuykuy.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
