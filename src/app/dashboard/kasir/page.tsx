"use client";
import { useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";

const TREATMENTS = [
  { name: "Express", price: 330000, duration: 45 },
  { name: "Kuy 60", price: 400000, duration: 60 },
  { name: "Kuy 90", price: 430000, duration: 90 },
  { name: "Exclume", price: 550000, duration: 90 },
  { name: "DShoot", price: 650000, duration: 120 },
];

const THERAPISTS = [
  "Budi Santoso", "Maya Sari", "Rina Kartika", "Dian Pratiwi",
  "Joko Susilo", "Sari Indah", "Dewi Ayu", "Andi Kurnia",
];

const ROOMS = ["Kamar 1", "Kamar 2", "Kamar 3", "Kamar 4", "Kamar 5", "VIP A", "VIP B"];

type PayMethod = "Cash" | "QRIS" | "Transfer";

interface CartItem {
  name: string;
  price: number;
  duration: number;
}

interface Transaction {
  inv: string;
  customerName: string;
  customerPhone: string;
  cart: CartItem[];
  therapist: string;
  room: string;
  subtotal: number;
  commission: number;
  payMethod: string;
  cashReceived: number;
  time: string;
}

function formatRp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

function genInvoice(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `INV-${ymd}-${rand}`;
}

const fieldStyle: React.CSSProperties = {
  background: "#111",
  border: "1px solid #D4AF3740",
  borderRadius: 8,
  color: "#e0c97f",
  padding: "8px 12px",
  width: "100%",
  fontSize: 13,
  outline: "none",
};

export default function KasirPage() {
  const [step, setStep] = useState<"order" | "payment" | "success">("order");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [therapist, setTherapist] = useState(THERAPISTS[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>("Cash");
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [invoice, setInvoice] = useState<Transaction | null>(null);

  const subtotal = cart.reduce((s, i) => s + i.price, 0);
  const commission = Math.round(subtotal * 0.35);
  const change = cashReceived - subtotal;

  function addToCart(t: (typeof TREATMENTS)[0]) {
    setCart(prev => [...prev, { name: t.name, price: t.price, duration: t.duration }]);
  }

  function removeFromCart(idx: number) {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }

  function handlePayment() {
    const inv = genInvoice();
    const tx: Transaction = {
      inv,
      customerName,
      customerPhone,
      cart,
      therapist,
      room,
      subtotal,
      commission,
      payMethod,
      cashReceived: payMethod === "Cash" ? cashReceived : subtotal,
      time: new Date().toISOString(),
    };
    const existing: Transaction[] = JSON.parse(localStorage.getItem("kuy_transactions") || "[]");
    existing.push(tx);
    localStorage.setItem("kuy_transactions", JSON.stringify(existing));
    setInvoice(tx);
    setStep("success");
  }

  function resetTransaction() {
    setStep("order");
    setCustomerName("");
    setCustomerPhone("");
    setTherapist(THERAPISTS[0]);
    setRoom(ROOMS[0]);
    setCart([]);
    setPayMethod("Cash");
    setCashReceived(0);
    setInvoice(null);
  }

  const canPay = payMethod !== "Cash" || cashReceived >= subtotal;

  return (
    <AdminPageShell title="Kasir POS">
      {step === "order" && (
        <div className="flex gap-4" style={{ minHeight: "calc(100vh - 140px)" }}>
          <div className="w-64 shrink-0 flex flex-col gap-4 p-4 rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
            <div>
              <p className="text-[10px] tracking-widest mb-3" style={{ color: "#D4AF37" }}>INFO PELANGGAN</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Nama Pelanggan</label>
                  <input style={fieldStyle} placeholder="Nama pelanggan..." value={customerName} onChange={e => setCustomerName(e.target.value)} />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">No. HP</label>
                  <input style={fieldStyle} placeholder="08xx-xxxx-xxxx" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #D4AF3720", paddingTop: 16 }}>
              <p className="text-[10px] tracking-widest mb-3" style={{ color: "#D4AF37" }}>TERAPIS & KAMAR</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Terapis</label>
                  <select style={fieldStyle} value={therapist} onChange={e => setTherapist(e.target.value)}>
                    {THERAPISTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Kamar</label>
                  <select style={fieldStyle} value={room} onChange={e => setRoom(e.target.value)}>
                    {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <p className="text-[10px] tracking-widest" style={{ color: "#D4AF37" }}>PILIH TREATMENT</p>
            <div className="grid grid-cols-2 gap-3">
              {TREATMENTS.map(t => (
                <button key={t.name} onClick={() => addToCart(t)} className="p-5 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-95" style={{ background: "linear-gradient(135deg,#1a1400,#0f0e00)", border: "1px solid #D4AF3750", cursor: "pointer" }}>
                  <p className="font-bold text-xl" style={{ color: "#f5e070" }}>{t.name}</p>
                  <p className="text-sm font-bold mt-1" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{formatRp(t.price)}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.duration} menit</p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-72 shrink-0 flex flex-col rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
            <div className="p-4" style={{ borderBottom: "1px solid #D4AF3720" }}>
              <p className="text-[10px] tracking-widest" style={{ color: "#D4AF37" }}>KERANJANG ORDER</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {cart.length === 0 && <p className="text-xs text-gray-600 text-center mt-8">Belum ada treatment dipilih</p>}
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #D4AF3720" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#e0c97f" }}>{item.name}</p>
                    <p className="text-xs text-gray-500">{item.duration} mnt</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold" style={{ color: "#f5e070" }}>{formatRp(item.price)}</p>
                    <button onClick={() => removeFromCart(idx)} className="text-gray-600 hover:text-red-400 transition-colors text-xl leading-none">×</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex flex-col gap-3" style={{ borderTop: "1px solid #D4AF3720" }}>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Subtotal</span>
                <span className="text-sm font-bold" style={{ color: "#f5e070" }}>{formatRp(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Komisi Terapis (35%)</span>
                <span className="text-sm" style={{ color: "#C9A84C" }}>{formatRp(commission)}</span>
              </div>
              <button onClick={() => cart.length > 0 && setStep("payment")} disabled={cart.length === 0} className="w-full py-3 rounded-lg font-bold text-sm tracking-wider transition-all" style={{ background: cart.length > 0 ? "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)" : "#222", color: cart.length > 0 ? "#080800" : "#444", cursor: cart.length > 0 ? "pointer" : "not-allowed" }}>BAYAR SEKARANG</button>
            </div>
          </div>
        </div>
      )}

      {step === "payment" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(8,8,0,0.96)" }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-6" style={{ background: "#0f0e00", border: "1px solid #D4AF3750" }}>
            <div>
              <p className="text-[10px] tracking-widest mb-1" style={{ color: "#D4AF37" }}>PROSES PEMBAYARAN</p>
              <h2 className="text-3xl font-bold" style={{ color: "#f5e070" }}>{formatRp(subtotal)}</h2>
            </div>
            <div style={{ borderTop: "1px solid #D4AF3720", paddingTop: 16 }}>
              <p className="text-xs text-gray-500 mb-3">Ringkasan Order</p>
              {cart.map((item, idx) => (<div key={idx} className="flex justify-between py-1"><span className="text-sm text-gray-400">{item.name} ({item.duration} mnt)</span><span className="text-sm" style={{ color: "#e0c97f" }}>{formatRp(item.price)}</span></div>))}
              <div className="flex justify-between pt-2 mt-2" style={{ borderTop: "1px solid #D4AF3715" }}>
                <span className="text-xs text-gray-600">Terapis: {therapist}</span>
                <span className="text-xs text-gray-600">{room}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-3">Metode Pembayaran</p>
              <div className="grid grid-cols-3 gap-3">
                {(["Cash", "QRIS", "Transfer"] as PayMethod[]).map(m => (<button key={m} onClick={() => setPayMethod(m)} className="py-3 rounded-lg text-sm font-bold transition-all" style={{ background: payMethod === m ? "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)" : "#111", color: payMethod === m ? "#080800" : "#666", border: payMethod === m ? "none" : "1px solid #333", cursor: "pointer" }}>{m}</button>))}
              </div>
            </div>
            {payMethod === "Cash" && (
              <div>
                <label className="text-xs text-gray-500 mb-2 block">Uang Diterima</label>
                <input type="number" style={fieldStyle} placeholder="0" value={cashReceived || ""} onChange={e => setCashReceived(Number(e.target.value))} />
                {cashReceived >= subtotal && subtotal > 0 && <p className="text-sm mt-2" style={{ color: "#4ade80" }}>Kembalian: {formatRp(change)}</p>}
                {cashReceived > 0 && cashReceived < subtotal && <p className="text-sm mt-2 text-red-400">Kurang: {formatRp(subtotal - cashReceived)}</p>}
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setStep("order")} className="flex-1 py-3 rounded-lg text-sm" style={{ background: "#111", border: "1px solid #333", color: "#666", cursor: "pointer" }}>Batal</button>
              <button onClick={handlePayment} disabled={!canPay} className="flex-1 py-3 rounded-lg font-bold text-sm tracking-wider" style={{ background: canPay ? "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)" : "#222", color: canPay ? "#080800" : "#444", cursor: canPay ? "pointer" : "not-allowed" }}>PROSES PEMBAYARAN</button>
            </div>
          </div>
        </div>
      )}

      {step === "success" && invoice && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: "#052e16", border: "2px solid #4ade80", color: "#4ade80" }}>✓</div>
          <div className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-4" style={{ background: "#0f0e00", border: "1px solid #D4AF3750" }}>
            <div className="text-center">
              <p className="text-[10px] tracking-widest mb-1" style={{ color: "#4ade80" }}>PEMBAYARAN BERHASIL</p>
              <p className="font-mono text-sm font-bold" style={{ color: "#D4AF37" }}>{invoice.inv}</p>
              <p className="text-xs text-gray-600 mt-1">{new Date(invoice.time).toLocaleString("id-ID")}</p>
            </div>
            <div style={{ borderTop: "1px solid #D4AF3720", paddingTop: 16 }} className="flex flex-col gap-2">
              {[["Pelanggan", invoice.customerName || "-"],["No. HP", invoice.customerPhone || "-"],["Terapis", invoice.therapist],["Kamar", invoice.room]].map(([k, v]) => (<div key={k} className="flex justify-between"><span className="text-xs text-gray-500">{k}</span><span className="text-sm" style={{ color: "#e0c97f" }}>{v}</span></div>))}
            </div>
            <div style={{ borderTop: "1px solid #D4AF3720", paddingTop: 16 }} className="flex flex-col gap-1">
              {invoice.cart.map((item, idx) => (<div key={idx} className="flex justify-between"><span className="text-sm text-gray-400">{item.name} ({item.duration} mnt)</span><span className="text-sm" style={{ color: "#e0c97f" }}>{formatRp(item.price)}</span></div>))}
            </div>
            <div style={{ borderTop: "1px solid #D4AF3720", paddingTop: 16 }} className="flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-sm font-bold" style={{ color: "#f5e070" }}>Total</span><span className="text-xl font-bold" style={{ color: "#f5e070" }}>{formatRp(invoice.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-xs text-gray-500">Metode</span><span className="text-sm" style={{ color: "#C9A84C" }}>{invoice.payMethod}</span></div>
              {invoice.payMethod === "Cash" && (<><div className="flex justify-between"><span className="text-xs text-gray-500">Tunai Diterima</span><span className="text-sm" style={{ color: "#e0c97f" }}>{formatRp(invoice.cashReceived)}</span></div><div className="flex justify-between"><span className="text-xs text-gray-500">Kembalian</span><span className="text-sm" style={{ color: "#4ade80" }}>{formatRp(invoice.cashReceived - invoice.subtotal)}</span></div></>)}
              <div className="flex justify-between"><span className="text-xs text-gray-500">Komisi Terapis (35%)</span><span className="text-sm" style={{ color: "#C9A84C" }}>{formatRp(invoice.commission)}</span></div>
            </div>
            <button onClick={resetTransaction} className="w-full py-3 rounded-lg font-bold text-sm tracking-wider mt-2" style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", color: "#080800", cursor: "pointer" }}>TRANSAKSI BARU</button>
          </div>
        </div>
      )}
    </AdminPageShell>
  );
}
