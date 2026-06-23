"use client";
import { useState, useEffect } from "react";
import AdminPageShell from "@/components/AdminPageShell";

type Period = "today" | "7days" | "30days";
interface Transaction { inv: string; therapist: string; cart: { name: string; price: number; duration: number }[]; subtotal: number; commission: number; time: string; }
interface TherapistRow { therapist: string; count: number; omzet: number; komisi: number; }

function formatRp(n: number): string { return "Rp " + n.toLocaleString("id-ID"); }
function loadTransactions(): Transaction[] { try { return JSON.parse(localStorage.getItem("kuy_transactions") || "[]"); } catch { return []; } }
function filterByPeriod(txs: Transaction[], period: Period): Transaction[] {
  const now = Date.now();
  const ms: Record<Period, number> = { today: 86400000, "7days": 7 * 86400000, "30days": 30 * 86400000 };
  return txs.filter(t => new Date(t.time).getTime() >= now - ms[period]);
}

export default function KomisiPage() {
  const [period, setPeriod] = useState<Period>("today");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(loadTransactions());
    const id = setInterval(() => setTransactions(loadTransactions()), 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = filterByPeriod(transactions, period);
  const byTherapist: Record<string, TherapistRow> = {};
  for (const tx of filtered) {
    const key = tx.therapist;
    if (!byTherapist[key]) byTherapist[key] = { therapist: key, count: 0, omzet: 0, komisi: 0 };
    byTherapist[key].count += tx.cart.length;
    byTherapist[key].omzet += tx.subtotal;
    byTherapist[key].komisi += tx.commission;
  }
  const rows = Object.values(byTherapist).sort((a, b) => b.komisi - a.komisi);
  const totalKomisi = rows.reduce((s, r) => s + r.komisi, 0);
  const totalTx = filtered.length;
  const avgKomisi = rows.length > 0 ? Math.round(totalKomisi / rows.length) : 0;
  const periodLabels: Record<Period, string> = { today: "Hari Ini", "7days": "7 Hari", "30days": "30 Hari" };

  return (
    <AdminPageShell title="Komisi Terapis">
      <div className="flex gap-2">
        {(["today", "7days", "30days"] as Period[]).map(p => (
          <button key={p} onClick={() => setPeriod(p)} className="px-4 py-2 rounded-lg text-xs font-bold transition-all" style={{ background: period === p ? "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)" : "#0f0e00", color: period === p ? "#080800" : "#666", border: period === p ? "none" : "1px solid #D4AF3730", cursor: "pointer" }}>{periodLabels[p]}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ label: "Total Komisi", value: formatRp(totalKomisi), sub: periodLabels[period] }, { label: "Jumlah Transaksi", value: String(totalTx), sub: "transaksi" }, { label: "Rata-rata per Terapis", value: formatRp(avgKomisi), sub: "per terapis" }].map(({ label, value, sub }) => (
          <div key={label} className="p-5 rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}><p className="text-[10px] tracking-widest text-gray-600 mb-1">{label}</p><p className="text-2xl font-bold" style={{ color: "#f5e070" }}>{value}</p><p className="text-xs text-gray-600 mt-0.5">{sub}</p></div>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
        <div className="p-4" style={{ background: "#0f0e00", borderBottom: "1px solid #D4AF3720" }}><p className="text-[10px] tracking-widest" style={{ color: "#D4AF37" }}>DETAIL KOMISI PER TERAPIS</p></div>
        {rows.length === 0 ? (
          <div className="p-12 text-center" style={{ background: "#0a0a00" }}><p className="text-gray-600 text-sm">Belum ada transaksi. Buat transaksi di Kasir POS.</p></div>
        ) : (
          <table className="w-full" style={{ background: "#0a0a00" }}>
            <thead><tr style={{ borderBottom: "1px solid #D4AF3715" }}>{["Terapis", "Jumlah Treatment", "Total Omzet", "Komisi (35%)", "Status"].map(h => (<th key={h} className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-600">{h}</th>))}</tr></thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.therapist} style={{ borderBottom: "1px solid #D4AF3710", background: idx % 2 === 0 ? "transparent" : "#0d0d00" }}>
                  <td className="px-5 py-4"><p className="text-sm font-medium" style={{ color: "#e0c97f" }}>{row.therapist}</p></td>
                  <td className="px-5 py-4"><p className="text-sm" style={{ color: "#aaa" }}>{row.count}</p></td>
                  <td className="px-5 py-4"><p className="text-sm" style={{ color: "#f5e070" }}>{formatRp(row.omzet)}</p></td>
                  <td className="px-5 py-4"><p className="text-sm font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{formatRp(row.komisi)}</p></td>
                  <td className="px-5 py-4"><span className="text-[10px] px-3 py-1 rounded-full font-bold" style={{ background: "#1a1500", color: "#fbbf24", border: "1px solid #fbbf2430" }}>Belum Dibayar</span></td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr style={{ borderTop: "1px solid #D4AF3730" }}><td className="px-5 py-4 text-xs font-bold text-gray-500" colSpan={2}>TOTAL</td><td className="px-5 py-4"><p className="text-sm font-bold" style={{ color: "#f5e070" }}>{formatRp(rows.reduce((s, r) => s + r.omzet, 0))}</p></td><td className="px-5 py-4"><p className="text-sm font-bold" style={{ color: "#f5e070" }}>{formatRp(totalKomisi)}</p></td><td /></tr></tfoot>
          </table>
        )}
      </div>
    </AdminPageShell>
  );
}
