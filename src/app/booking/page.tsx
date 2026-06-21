import BookingForm from "./BookingForm";
import { supabase, type Service, type Branch } from "@/lib/supabase";
import Logo from "@/components/Logo";
import Link from "next/link";

export default async function BookingPage() {
  const [{ data: services }, { data: branches }] = await Promise.all([
    supabase.from("services").select("id,name,price_idr,duration_minutes").eq("active", true).order("sort_order"),
    supabase.from("branches").select("id,name").eq("active", true).order("sort_order"),
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#D4AF37]/20 bg-[#111]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-serif text-lg font-bold text-[#D4AF37]">KUYKUY GROUP</span>
          </Link>
          <span className="text-gray-500 text-sm">Reservasi Online</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] text-[#D4AF37] mb-3 uppercase">Reservasi</div>
          <h1 className="font-serif text-3xl font-bold mb-3">Pesan Layanan Spa</h1>
          <p className="text-gray-400 text-sm">Isi formulir di bawah dan tim kami akan menghubungi Anda untuk konfirmasi</p>
        </div>

        <BookingForm
          services={(services as Pick<Service, "id" | "name" | "price_idr" | "duration_minutes">[]) ?? []}
          branches={(branches as Pick<Branch, "id" | "name">[]) ?? []}
        />
      </div>
    </div>
  );
}
