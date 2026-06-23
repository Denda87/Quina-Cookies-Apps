"use client";
import { useState, useEffect } from "react";
import AdminPageShell from "@/components/AdminPageShell";

interface Shift {
  id: string;
  openedAt: string;
  openingCash: number;
  cashierId: string;
}

interface ClosedShift extends Shift {
  closedAt: string;
  closingCash: number;
  totalTransaksi: number;
  omzet: number;
}

interface Transaction {
  inv: string;
  customerName: string;
  subtotal: number;
  commission: number;
  payMethod: string;
  time: string;
}

function formatRp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDuration(from: string): string {
  const diff = Math.floor((Date.now() - new Date(from).getTime()) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function loadShift(): Shift | null {
  try { return JSON.parse(localStorage.getItem("kuy_shift") || "null"); } catch { return null; }
}
function loadTransactions(): Transaction[] {
  try { return JSON.parse(localStorage.getItem("kuy_transactions") || "[]"); } catch { return []; }
}
function loadClosedShifts(): ClosedShift[] {
  try { return JSON.parse(localStorage.getItem("kuy_closed_shifts") || "[]"); } catch { return []; }
}

export default function ShiftPage() {
  const [shift, setShift] = useState<Shift | null>(null);
  const [closedShifts, setClosedShifts] = useState<ClosedShift[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openingCash, setOpeningCash] = useState<number>(0);
  const [tick, setTick] = useState(0);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closingCash, setClosingCash] = useState<number>(0);

  useEffect(() => {
    setShift(loadShift());
    setClosedShifts(loadClosedShifts());
    setTransactions(loadTransactions());
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setTransactions(loadTransactions());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function openShift() {
    const s: Shift = {
      id: `SHIFT-${Date.now()}`,
      openedAt: new Date().toISOString(),
      openingCash,
      cashierId: "Admin",
    };
    localStorage.setItem("kuy_shift", JSON.stringify(s));
    setShift(s);
  }

  function closeShift() {
    if (!shift) return;
    const shiftTx = transactions.filter(t => t.time >= shift.openedAt);
    const omzet = shiftTx.reduce((s, t) => s + t.subtotal, 0);
    const closed: ClosedShift = {
      ...shift,
      closedAt: new Date().toISOString(),
      closingCash,
      totalTransaksi: shiftTx.length,
      omzet,
    };
    const prev = loadClosedShifts();
    prev.unshift(closed);
    localStorage.setItem("kuy_closed_shifts", JSON.stringify(prev));
    localStorage.removeItem("kuy_shift");
    setShift(null);
    setClosedShifts(prev);
    setShowCloseModal(false);
    setClosingCash(0);
  }

  const shiftTx = shift ? transactions.filter(t => t.time >= shift.openedAt) : [];
  const omzet = shiftTx.reduce((s, t) => s + t.subtotal, 0);
  const totalKomisi = shiftTx.reduce((s, t) => s + t.commission, 0);
  const cashTotal = shiftTx.filter(t => t.payMethod === "Cash").reduce((s, t) => s + t.subtotal, 0);
  const qrisTotal = shiftTx.filter(t => t.payMethod === "QRIS").reduce((s, t) => s + t.subtotal, 0);
  const transferTotal = shiftTx.filter(t => t.payMethod === "Transfer").reduce((s, t) => s + t.subtotal, 0);

  const fieldStyle: React.CSSProperties = {
    background: "#111", border: "1px solid #D4AF3740", borderRadius: 8,
    color: "#e0c97f", padding: "10px 14px", fontSize: 14, outline: "none", width: "100%",
  };

  return (
    <AdminPageShell title="Shift Kasir">
      {/* Header status */}
      <div className="flex items-center gap-4 p-5 rounded-xl mb-2" style={{
        background: shift ? "linear-gradient(135deg,#002200,#001a00)" : "#0f0e00",
        border: `1px solid ${shift ? "#4ade8040" : "#D4AF3730"}`,
      }}>
        <div className={`w-3 h-3 rounded-full ${shift ? "animate-pulse" : ""}`} style={{ background: shift ? "#4ade80" : "#555" }} />
        <div>
          <p className="text-xs tracking-widest font-bold" style={{ color: shift ? "#4ade80" : "#555" }}>
            {shift ? "SHIFT AKTIF" : "SHIFT BELUM DIBUKA"}
          </p>
          {shift && (
            <p className="text-xs text-gray-500 mt-0.5">
              Dibuka: {new Date(shift.openedAt).toLocaleString("id-ID")} · Durasi: {formatDuration(shift.openedAt)}
            </p>
          )}
        </div>
        {shift && (
          <button
            onClick={() => setShowCloseModal(true)}
            className="ml-auto px-5 py-2 rounded-lg text-xs font-bold"
            style={{ background: "#1a0a0a", border: "1px solid #f8717140", color: "#f87171", cursor: "pointer" }}
          >
            Tutup Shift
          </button>
        )}
      </div>

      {!shift && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-xl flex flex-col gap-4" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
            <p className="text-xs tracking-widest" style={{ color: "#D4AF37" }}>BUKA SHIFT BARU</p>
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Kasir</label>
              <input style={fieldStyle} value="Admin" readOnly />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Modal Awal (Kas)</label>
              <input
                type="number"
                style={fieldStyle}
                placeholder="0"
                value={openingCash || ""}
                onChange={e => setOpeningCash(Number(e.target.value))}
              />
            </div>
            <button
              onClick={openShift}
              className="py-3 rounded-lg font-bold text-sm tracking-wider"
              style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", color: "#080800", cursor: "pointer" }}
            >
              BUKA SHIFT SEKARANG
            </button>
          </div>

          {closedShifts.length > 0 && (
            <div className="p-6 rounded-xl flex flex-col gap-3" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
              <p className="text-xs tracking-widest mb-1" style={{ color: "#D4AF37" }}>SHIFT TERAKHIR</p>
              {closedShifts.slice(0, 3).map(cs => (
                <div key={cs.id} className="p-3 rounded-lg flex flex-col gap-1" style={{ background: "#111", border: "1px solid #D4AF3720" }}>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{new Date(cs.openedAt).toLocaleDateString("id-ID")}</span>
                    <span className="text-xs font-bold" style={{ color: "#f5e070" }}>{formatRp(cs.omzet)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] text-gray-600">{cs.totalTransaksi} transaksi</span>
                    <span className="text-[11px] text-gray-600">{cs.cashierId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {shift && (
        <div className="flex flex-col gap-4">
          {/* Totals */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Transaksi", value: String(shiftTx.length), unit: "transaksi" },
              { label: "Omzet", value: formatRp(omzet), unit: "" },
              { label: "Total Komisi", value: formatRp(totalKomisi), unit: "" },
              { label: "Modal Awal", value: formatRp(shift.openingCash), unit: "" },
            ].map(({ label, value, unit }) => (
              <div key={label} className="p-4 rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
                <p className="text-[10px] tracking-widest text-gray-600 mb-1">{label}</p>
                <p className="text-xl font-bold" style={{ color: "#f5e070" }}>{value}</p>
                {unit && <p className="text-xs text-gray-600">{unit}</p>}
              </div>
            ))}
          </div>

          {/* Payment breakdown */}
          <div className="p-5 rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
            <p className="text-[10px] tracking-widest mb-4" style={{ color: "#D4AF37" }}>BREAKDOWN PEMBAYARAN</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Cash", value: cashTotal, color: "#4ade80" },
                { label: "QRIS", value: qrisTotal, color: "#60a5fa" },
                { label: "Transfer", value: transferTotal, color: "#a78bfa" },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-4 rounded-lg" style={{ background: "#111", border: `1px solid ${color}20` }}>
                  <p className="text-xs mb-1" style={{ color }}>{label}</p>
                  <p className="text-lg font-bold" style={{ color: "#f5e070" }}>{formatRp(value)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Last transactions */}
          <div className="p-5 rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
            <p className="text-[10px] tracking-widest mb-4" style={{ color: "#D4AF37" }}>TRANSAKSI TERAKHIR</p>
            {shiftTx.length === 0 ? (
              <p className="text-xs text-gray-600">Belum ada transaksi dalam shift ini.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {[...shiftTx].reverse().slice(0, 5).map(tx => (
                  <div key={tx.inv} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #D4AF3715" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#e0c97f" }}>{tx.customerName || "Pelanggan"}</p>
                      <p className="text-xs text-gray-600">{new Date(tx.time).toLocaleTimeString("id-ID")} · {tx.inv}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: "#f5e070" }}>{formatRp(tx.subtotal)}</p>
                      <p className="text-xs" style={{ color: "#C9A84C" }}>{tx.payMethod}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Close shift modal */}
      {showCloseModal && shift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(8,8,0,0.96)" }}>
          <div className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-6" style={{ background: "#0f0e00", border: "1px solid #D4AF3750" }}>
            <p className="text-xs tracking-widest" style={{ color: "#D4AF37" }}>TUTUP SHIFT</p>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Total Transaksi</span>
                <span className="text-sm" style={{ color: "#f5e070" }}>{shiftTx.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Total Omzet</span>
                <span className="text-sm font-bold" style={{ color: "#f5e070" }}>{formatRp(omzet)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Cash In</span>
                <span className="text-sm" style={{ color: "#4ade80" }}>{formatRp(cashTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Modal Awal</span>
                <span className="text-sm" style={{ color: "#e0c97f" }}>{formatRp(shift.openingCash)}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">Kas Penutup (hitung fisik)</label>
              <input
                type="number"
                style={fieldStyle}
                placeholder="0"
                value={closingCash || ""}
                onChange={e => setClosingCash(Number(e.target.value))}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCloseModal(false)}
                className="flex-1 py-3 rounded-lg text-sm text-gray-500"
                style={{ background: "#111", border: "1px solid #333", cursor: "pointer" }}
              >
                Batal
              </button>
              <button
                onClick={closeShift}
                className="flex-1 py-3 rounded-lg font-bold text-sm"
                style={{ background: "#1a0a0a", border: "1px solid #f8717150", color: "#f87171", cursor: "pointer" }}
              >
                Tutup Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPageShell>
  );
}
