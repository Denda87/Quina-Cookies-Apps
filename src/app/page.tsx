import Link from "next/link";
import Logo from "@/components/Logo";
import { MapPin, Phone, Mail, Star, ExternalLink, Share2 } from "lucide-react";
import { supabase, type Service, type Branch, type Testimonial } from "@/lib/supabase";

async function getData() {
  const [{ data: services }, { data: branches }, { data: testimonials }] = await Promise.all([
    supabase.from("services").select("*").eq("active", true).order("sort_order"),
    supabase.from("branches").select("*").eq("active", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("active", true).order("sort_order"),
  ]);
  return {
    services: (services as Service[]) ?? [],
    branches: (branches as Branch[]) ?? [],
    testimonials: (testimonials as Testimonial[]) ?? [],
  };
}

const BRANCH_MAPS: Record<string, string> = {
  "KUY BM": "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",
  "KUY BETOS": "https://maps.app.goo.gl/vWqKNtksLgPRdye16",
  "CRYSTAL KUY": "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",
  "KUY STORY": "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",
  "XI-KUY": "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",
  "Strawberry Spa & Therapy": "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",
};

const SERVICE_ICONS: Record<string, string> = {
  leaf: "🌸",
  sparkles: "✨",
  flame: "🔥",
  hand: "💅",
};

const teamMembers = [
  { name: "Maya Putri", role: "Senior Therapist", exp: "5 tahun" },
  { name: "Andi Saputra", role: "Hot Stone Specialist", exp: "4 tahun" },
  { name: "Sinta Rahayu", role: "Facial Expert", exp: "3 tahun" },
];

export default async function LandingPage() {
  const { services, branches, testimonials } = await getData();

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-serif text-xl font-bold text-[#D4AF37]">KUYKUY GROUP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#tentang" className="hover:text-[#D4AF37] transition-colors">Tentang Kami</a>
            <a href="#layanan" className="hover:text-[#D4AF37] transition-colors">Layanan Spa</a>
            <a href="#menu" className="hover:text-[#D4AF37] transition-colors">Menu Pijat</a>
            <a href="#lokasi" className="hover:text-[#D4AF37] transition-colors">Lokasi Cabang</a>
            <a href="#kontak" className="hover:text-[#D4AF37] transition-colors">Kontak</a>
          </div>
          <Link href="/booking" className="px-5 py-2 text-sm font-semibold text-black rounded-full" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)" }}>
            Pesan Sekarang
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #D4AF3715 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-6 flex justify-center" style={{ filter: "drop-shadow(0 0 40px #D4AF3760)" }}>
            <Logo size={90} />
          </div>
          <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-4 uppercase">Premium Spa & Wellness</div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            TEMUKAN KETENANGAN<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              SEJATI DI KUYKUY SPA
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 font-light">Pelayanan Mewah · Pengalaman Tak Terlupakan · 6 Cabang Jabodetabek</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="px-8 py-4 font-semibold text-black rounded-full text-sm uppercase tracking-widest" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)" }}>
              Reservasi Sekarang
            </Link>
            <a href="#menu" className="px-8 py-4 font-semibold text-[#D4AF37] rounded-full border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors text-sm uppercase tracking-widest">
              Lihat Layanan
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37]/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#D4AF37]/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Service Circles */}
      <section id="layanan" className="py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Layanan Kami</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Layanan Spa Premium</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] flex flex-col items-center justify-center text-center p-4 hover:bg-[#D4AF37]/10 transition-colors cursor-pointer gap-2">
                  <span className="text-3xl">{SERVICE_ICONS[s.icon || ""] || "✨"}</span>
                  <span className="text-[#D4AF37] font-serif text-xs leading-tight">{s.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Pijat */}
      <section id="menu" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Pilihan Terbaik</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Menu Pijat</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.id} className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37]/60 transition-all hover:-translate-y-1 duration-300">
                <div className="text-4xl mb-4">{SERVICE_ICONS[s.icon || ""] || "✨"}</div>
                <h3 className="font-serif text-lg font-bold text-[#D4AF37] mb-2">{s.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{s.duration_minutes} menit</p>
                {s.description && <p className="text-gray-500 text-xs mb-3 leading-relaxed">{s.description}</p>}
                <div className="text-2xl font-bold text-white">Rp {s.price_idr.toLocaleString("id-ID")}</div>
                <Link href="/booking" className="mt-4 block w-full py-2 text-xs font-semibold text-black rounded-full text-center uppercase tracking-widest" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
                  Pesan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi Cabang */}
      <section id="lokasi" className="py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Temukan Kami</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Lokasi Cabang</h2>
            <p className="text-gray-400 mt-3 text-sm">6 Cabang di wilayah Jabodetabek</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((b) => (
              <div key={b.id} className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="font-serif font-bold text-[#D4AF37] mb-3">{b.name}</h3>
                <div className="flex items-start gap-2 text-gray-400 text-sm mb-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#D4AF37]/60" />
                  <span className="leading-relaxed">{b.address}</span>
                </div>
                {b.phone && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Phone size={14} className="shrink-0 text-[#D4AF37]/60" />
                    <span>{b.phone}</span>
                  </div>
                )}
                <a
                  href={b.map_url || BRANCH_MAPS[b.name] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold mt-2"
                  style={{ color: "#D4AF37" }}
                >
                  <ExternalLink size={12} /> Buka Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="tentang" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Tentang Kuykuy Group</div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Keahlian & Kepedulian<br />Dalam Setiap Sentuhan
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Kuykuy Group adalah pelopor layanan spa dan wellness premium di Jabodetabek. Dengan 6 cabang aktif di Bekasi, Bogor, dan Cikarang, kami berkomitmen memberikan pengalaman relaksasi terbaik untuk setiap pelanggan.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Tim terapis profesional kami terlatih dengan standar tinggi, menggunakan bahan-bahan alami berkualitas untuk memastikan setiap sesi memberikan manfaat maksimal bagi tubuh dan pikiran Anda.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["6", "Cabang Aktif"], ["5000+", "Pelanggan Puas"], ["10+", "Tahun Pengalaman"]].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] font-serif">{n}</div>
                    <div className="text-gray-400 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full border-4 border-[#D4AF37]/40 flex items-center justify-center bg-[#1a1a1a]" style={{ boxShadow: "0 0 60px #D4AF3720" }}>
                  <Logo size={120} />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-black font-bold text-xs text-center leading-tight p-2" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
                  Premium Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Testimonial</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Kata Pelanggan Kami</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="#D4AF37" className="text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4 leading-relaxed">&quot;{t.quote}&quot;</p>
                <div className="font-semibold text-[#D4AF37]">— {t.name}</div>
                {t.role && <div className="text-gray-600 text-xs mt-0.5">{t.role}</div>}
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Tim Kami</div>
            <h2 className="font-serif text-3xl font-bold">Terapis Berpengalaman</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((m, i) => (
              <div key={i} className="text-center bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl p-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-black" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-serif font-bold text-lg mb-1">{m.name}</h3>
                <div className="text-[#D4AF37] text-sm mb-1">{m.role}</div>
                <div className="text-gray-400 text-xs">Pengalaman {m.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kemitraan */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Bergabung Bersama Kami</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Kemitraan & Solusi Staff</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bergabunglah dengan jaringan Kuykuy Group dan dapatkan manfaat eksklusif sebagai mitra atau terapis profesional. Kami menyediakan pelatihan, dukungan, dan sistem manajemen terdepan.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              ["Sistem Digital", "Kelola absensi dan kinerja secara digital real-time"],
              ["Pelatihan Pro", "Pelatihan terapis berstandar internasional"],
              ["Reward Program", "Bonus dan insentif menarik untuk performa terbaik"],
            ].map(([title, desc]) => (
              <div key={title} className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>★</div>
                <h3 className="font-serif font-bold text-[#D4AF37] mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <Link href="/login" className="inline-block px-8 py-4 font-semibold text-black rounded-full text-sm uppercase tracking-widest" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)" }}>
            Akses Portal Staff
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-[#111] border-t border-[#D4AF37]/20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Logo size={40} />
                <div>
                  <div className="font-serif text-xl font-bold text-[#D4AF37]">KUYKUY GROUP</div>
                  <div className="text-gray-400 text-xs">Premium Spa & Wellness</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Layanan spa dan pijat premium untuk ketenangan tubuh dan jiwa. 6 cabang di Bekasi, Bogor, dan Cikarang.
              </p>
              <div className="flex gap-3">
                {[Share2, Share2, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 border border-[#D4AF37]/30 rounded-full flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors">
                    <Icon size={14} className="text-[#D4AF37]" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#D4AF37] mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {services.map(s => (
                  <li key={s.id}><a href="#menu" className="hover:text-white transition-colors">{s.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#D4AF37] mb-4">Kontak</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <Phone size={14} className="mt-0.5 text-[#D4AF37] shrink-0" />
                  <span>+62 21 555-0100</span>
                </div>
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <Mail size={14} className="mt-0.5 text-[#D4AF37] shrink-0" />
                  <span>hello@kuykuygroup.com</span>
                </div>
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin size={14} className="mt-0.5 text-[#D4AF37] shrink-0" />
                  <span>Bekasi · Bogor · Cikarang</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D4AF37]/10 pt-6 text-center text-gray-500 text-sm">
            © 2025 Kuykuy Group. All rights reserved. | Premium Spa & Wellness Indonesia
          </div>
        </div>
      </footer>
    </div>
  );
}
