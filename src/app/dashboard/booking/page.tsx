import AdminPageShell from "@/components/AdminPageShell";
import BookingTable from "./BookingTable";
import { supabase, type Booking } from "@/lib/supabase";

export const revalidate = 0;

export default async function BookingPage() {
  const { data } = await supabase
    .from("bookings")
    .select("*, services(name, price_idr), branches(name)")
    .order("scheduled_at", { ascending: false })
    .limit(100);

  const bookings = (data as Booking[]) ?? [];
  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    done: bookings.filter(b => b.status === "done").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  return (
    <AdminPageShell title="Reservasi / Booking">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-3 mb-2">
        {[
          { label: "Total", value: counts.total, color: "#D4AF37" },
          { label: "Pending", value: counts.pending, color: "#f59e0b" },
          { label: "Dikonfirmasi", value: counts.confirmed, color: "#3b82f6" },
          { label: "Selesai", value: counts.done, color: "#22c55e" },
          { label: "Dibatalkan", value: counts.cancelled, color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4 text-center" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <p className="font-serif font-bold text-2xl" style={{ color }}>{value}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <BookingTable bookings={bookings} />
    </AdminPageShell>
  );
}
