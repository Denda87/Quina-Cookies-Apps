"use client";
import { useState } from "react";
import { supabase, type Booking } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Dikonfirmasi",
  done: "Selesai",
  cancelled: "Dibatalkan",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  done: "#22c55e",
  cancelled: "#ef4444",
};

export default function BookingTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    setUpdating(id);
    await supabase.from("bookings").update({ status }).eq("id", id);
    setUpdating(null);
    router.refresh();
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#D4AF3710", borderBottom: "1px solid #D4AF3720" }}>
        <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>DAFTAR RESERVASI</h3>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "done", "cancelled"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1 rounded-full text-[10px] font-semibold transition-all"
              style={filter === s
                ? { background: "linear-gradient(135deg,#C9A84C,#D4AF37)", color: "#000" }
                : { background: "#D4AF3715", color: "#D4AF3780", border: "1px solid #D4AF3720" }}>
              {s === "all" ? "Semua" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <p className="text-sm">Belum ada reservasi</p>
        </div>
      ) : (
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid #D4AF3718", background: "#1a1800" }}>
              {["Waktu", "Customer", "Layanan", "Cabang", "Status", "Aksi"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-500 uppercase" style={{ fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }} className="hover:bg-[#D4AF3710]">
                <td className="px-4 py-4 text-gray-400">
                  <p>{new Date(b.scheduled_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</p>
                  <p className="text-gray-600">{new Date(b.scheduled_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-gray-200 font-medium">{b.customer_name}</p>
                  <p className="text-gray-600">{b.phone}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-gray-300">{b.services?.name || "—"}</p>
                  {b.services?.price_idr && <p className="text-[#D4AF37]" style={{ fontSize: 10 }}>Rp {b.services.price_idr.toLocaleString("id-ID")}</p>}
                </td>
                <td className="px-4 py-4 text-gray-400">{b.branches?.name || "—"}</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full text-white font-semibold" style={{ fontSize: 9, background: STATUS_COLORS[b.status] || "#666" }}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <select
                    disabled={updating === b.id}
                    value={b.status}
                    onChange={e => updateStatus(b.id, e.target.value as Booking["status"])}
                    className="text-[10px] rounded-lg px-2 py-1 focus:outline-none disabled:opacity-50"
                    style={{ background: "#1a1600", color: "#D4AF37", border: "1px solid #D4AF3740" }}
                  >
                    <option value="pending" style={{ background: "#111" }}>Pending</option>
                    <option value="confirmed" style={{ background: "#111" }}>Konfirmasi</option>
                    <option value="done" style={{ background: "#111" }}>Selesai</option>
                    <option value="cancelled" style={{ background: "#111" }}>Batalkan</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
