"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Phone, UserCog, DoorOpen, CreditCard, Banknote, QrCode, CheckCircle2, Trash2, Plus, Clock, ExternalLink, ChevronDown, Search, Printer, RotateCcw, Tag, Calendar, Star, Users, LayoutDashboard } from "lucide-react";

const OUTLETS = [
  "V Phoenix",
  "Sierra",
  "Vierzhen",
  "Crystal",
  "Miracle",
  "Kuy Cibi",
  "Xi Kuy",
  "Kyu Betos",
  "Infinity",
  "B Kuy",
];

const TREATMENTS = [
  { id: 1, name: "Express Massage", short: "Express", price: 330000, duration: 45, category: "Massage", desc: "Pijat relaksasi cepat seluruh tubuh", popular: true },
  { id: 2, name: "Kuy 60 Signature", short: "Kuy 60", price: 400000, duration: 60, category: "Signature", desc: "Signature massage dengan teknik tradisional", popular: true },
  { id: 3, name: "Kuy 90 Premium", short: "Kuy 90", price: 430000, duration: 90, category: "Signature", desc: "Premium full-body treatment 90 menit", popular: false },
  { id: 4, name: "Exclume Body", short: "Exclume", price: 550000, duration: 90, category: "Premium", desc: "Exclusive scrub & massage kombinasi", popular: false },
  { id: 5, name: "D-Shoot Deep", short: "DShoot", price: 650000, duration: 120, category: "VIP", desc: "Deep tissue therapy 2 jam intensif", popular: true },
  { id: 6, name: "Reflexologi Kaki", short: "Refleksi", price: 250000, duration: 45, category: "Refleksi", desc: "Pijat refleksi kaki & betis", popular: false },
  { id: 7, name: "Aromaterapi", short: "Aroma", price: 480000, duration: 75, category: "Premium", desc: "Massage dengan essential oil pilihan", popular: false },
  { id: 8, name: "Royal Package", short: "Royal", price: 850000, duration: 150, category: "VIP", desc: "Full royal spa experience eksklusif", popular: false },
];

const CATEGORY_COLORS: Record<string, string> = {
  Massage: "rgba(95,174,125,.15)",
  Signature: "rgba(212,175,55,.15)",
  Premium: "rgba(111,168,212,.15)",
  VIP: "rgba(192,100,180,.15)",
  Refleksi: "rgba(200,150,80,.15)",
};
const CATEGORY_TEXT: Record<string, string> = {
  Massage: "#5fae7d",
  Signature: "#d4af37",
  Premium: "#6fa8d4",
  VIP: "#c064b4",
  Refleksi: "#c89650",
};

const THERAPISTS = [
  "Budi Santoso", "Maya Sari", "Rina Kartika", "Dian Pratiwi",
  "Joko Susilo", "Sari Indah", "Dewi Ayu", "Andi Kurnia",
  "Lita Permata", "Hendra Wijaya",
];

const ROOMS = ["Kamar 1", "Kamar 2", "Kamar 3", "Kamar 4", "Kamar 5", "VIP Suite A", "VIP Suite B", "Royal Room"];

const CATEGORIES = ["Semua", "Massage", "Signature", "Premium", "VIP", "Refleksi"];

type PayMethod = "Cash" | "QRIS" | "Transfer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  duration: number;
  qty: number;
}

interface Transaction {
  inv: string;
  outlet: string;
  customerName: string;
  customerPhone: string;
  cart: CartItem[];
  therapist: string;
  room: string;
  subtotal: number;
  discount: number;
  total: number;
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

const BG_PAGE = "radial-gradient(1100px 560px at 16% -8%, rgba(150,112,30,.20), transparent 58%), radial-gradient(900px 520px at 102% 4%, rgba(110,84,18,.16), transparent 55%), linear-gradient(160deg,#0b0805 0%,#070502 55%,#040301 100%)";
const GOLD_GRAD = "linear-gradient(135deg,#f4d886,#d4af37 55%,#b8860b)";
const CARD_BG = "linear-gradient(155deg,#1a1509 0%,#0f0b05 100%)";
const PANEL_BG = "linear-gradient(155deg,#15110a 0%,#0d0a05 100%)";
const BORDER = "1px solid rgba(212,175,55,.16)";
const SHADOW = "0 8px 24px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,220,150,.05)";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.03)",
  border: "1px solid rgba(212,175,55,.18)",
  borderRadius: 9,
  color: "#c9bfa3",
  padding: "9px 12px",
  width: "100%",
  fontSize: 13,
  outline: "none",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: "none",
};

export default function KasirPage() {
  const [outlet, setOutlet] = useState(OUTLETS[0]);
  const [outletOpen, setOutletOpen] = useState(false);
  const [step, setStep] = useState<"order" | "payment" | "success">("order");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [therapist, setTherapist] = useState(THERAPISTS[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>("Cash");
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [invoice, setInvoice] = useState<Transaction | null>(null);
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const todayStr = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const filtered = TREATMENTS.filter(t => {
    const matchCat = category === "Semua" || t.category === category;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * discountPct / 100);
  const total = subtotal - discountAmt;
  const commission = Math.round(total * 0.35);
  const change = cashReceived - total;
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  function addToCart(t: typeof TREATMENTS[0]) {
    setCart(prev => {
      const existing = prev.find(i => i.id === t.id);
      if (existing) return prev.map(i => i.id === t.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: t.id, name: t.name, price: t.price, duration: t.duration, qty: 1 }];
    });
  }

  function changeQty(id: number, delta: number) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function handlePayment() {
    const inv = genInvoice();
    const tx: Transaction = {
      inv, outlet, customerName, customerPhone, cart, therapist, room,
      subtotal, discount: discountAmt, total, commission, payMethod,
      cashReceived: payMethod === "Cash" ? cashReceived : total,
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
    setDiscountPct(0);
  }

  const canPay = cart.length > 0 && (payMethod !== "Cash" || cashReceived >= total);

  return (
    <div style={{ minHeight: "100vh", background: BG_PAGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* TOPBAR */}
      <div style={{ padding: "16px 28px", borderBottom: "1px solid rgba(212,175,55,.12)", background: "rgba(11,8,5,.7)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 40, display: "flex", alignItems: "center", gap: 20 }}>
        {/* Left: title */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "2.5px", color: "#5a5238", textTransform: "uppercase", marginBottom: 2 }}>Point of Sale</div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg,#f9ecbf,#e3c46a 50%,#c79a2e)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 1 }}>Kasir POS</h1>
        </div>

        {/* Center: clock + date */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#d4af37", letterSpacing: 2 }}>{now}</div>
          <div style={{ fontSize: 10.5, color: "#776d54", marginTop: 1 }}>{todayStr}</div>
        </div>

        {/* Right: outlet picker + external links */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
          {/* Outlet selector */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOutletOpen(o => !o)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: CARD_BG, border: BORDER, color: "#e3c46a", fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              <DoorOpen size={14} />
              {outlet}
              <ChevronDown size={13} style={{ color: "#776d54" }} />
            </button>
            {outletOpen && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: "#120e08", border: BORDER, borderRadius: 12, padding: 6, zIndex: 100, minWidth: 200, boxShadow: "0 16px 40px rgba(0,0,0,.7)" }}>
                {OUTLETS.map(o => (
                  <button key={o} onClick={() => { setOutlet(o); setOutletOpen(false); }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 13px", borderRadius: 8, background: o === outlet ? "rgba(212,175,55,.12)" : "transparent", color: o === outlet ? "#e3c46a" : "#9a8f70", fontSize: 12.5, cursor: "pointer", border: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >{o}</button>
                ))}
              </div>
            )}
          </div>

          {/* Staff dashboard link */}
          <a href="/staff/dashboard" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 10, background: "rgba(95,174,125,.08)", border: "1px solid rgba(95,174,125,.2)", color: "#5fae7d", fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            <Users size={13} />
            Staff Portal
            <ExternalLink size={11} />
          </a>

          {/* Booking website link */}
          <a href="https://kuykuygroup-apps.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 10, background: "rgba(111,168,212,.08)", border: "1px solid rgba(111,168,212,.2)", color: "#6fa8d4", fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            <Calendar size={13} />
            Booking Online
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ display: "flex", gap: 0, minHeight: "calc(100vh - 72px)" }}>

        {/* === LEFT PANEL: Customer + Assignment === */}
        <div style={{ width: 268, flexShrink: 0, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16, borderRight: "1px solid rgba(212,175,55,.10)", background: "rgba(10,7,3,.3)" }}>

          {/* Customer Info */}
          <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 14, padding: 16, boxShadow: SHADOW }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(212,175,55,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={14} color="#d4af37" />
              </div>
              <span style={{ fontSize: 9.5, letterSpacing: "2px", textTransform: "uppercase", color: "#5a5238", fontWeight: 700 }}>Info Pelanggan</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 10.5, color: "#776d54", display: "block", marginBottom: 5 }}>Nama Pelanggan</label>
                <input style={inputStyle} placeholder="Nama pelanggan..." value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 10.5, color: "#776d54", display: "block", marginBottom: 5 }}>No. HP / WhatsApp</label>
                <div style={{ position: "relative" }}>
                  <Phone size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#776d54" }} />
                  <input style={{ ...inputStyle, paddingLeft: 28 }} placeholder="08xx-xxxx-xxxx" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Therapist + Room */}
          <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 14, padding: 16, boxShadow: SHADOW }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(212,175,55,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserCog size={14} color="#d4af37" />
              </div>
              <span style={{ fontSize: 9.5, letterSpacing: "2px", textTransform: "uppercase", color: "#5a5238", fontWeight: 700 }}>Penugasan</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 10.5, color: "#776d54", display: "block", marginBottom: 5 }}>Terapis</label>
                <div style={{ position: "relative" }}>
                  <select style={selectStyle} value={therapist} onChange={e => setTherapist(e.target.value)}>
                    {THERAPISTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#776d54", pointerEvents: "none" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 10.5, color: "#776d54", display: "block", marginBottom: 5 }}>Kamar / Ruangan</label>
                <div style={{ position: "relative" }}>
                  <select style={selectStyle} value={room} onChange={e => setRoom(e.target.value)}>
                    {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#776d54", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Discount */}
          <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 14, padding: 16, boxShadow: SHADOW }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(212,175,55,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Tag size={14} color="#d4af37" />
              </div>
              <span style={{ fontSize: 9.5, letterSpacing: "2px", textTransform: "uppercase", color: "#5a5238", fontWeight: 700 }}>Diskon</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[0, 10, 15, 20, 25, 30].map(d => (
                <button key={d} onClick={() => setDiscountPct(d)}
                  style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: d === discountPct ? "none" : "1px solid rgba(212,175,55,.2)", background: d === discountPct ? GOLD_GRAD : "rgba(212,175,55,.06)", color: d === discountPct ? "#1a1305" : "#9a8f70" }}
                >{d === 0 ? "Tanpa" : `${d}%`}</button>
              ))}
            </div>
            {discountPct > 0 && subtotal > 0 && (
              <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 9, background: "rgba(95,174,125,.08)", border: "1px solid rgba(95,174,125,.2)", fontSize: 12, color: "#5fae7d" }}>
                Hemat {formatRp(discountAmt)}
              </div>
            )}
          </div>

          {/* Quick nav */}
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", borderRadius: 10, background: "rgba(212,175,55,.06)", border: "1px solid rgba(212,175,55,.14)", color: "#9a8f70", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
              <LayoutDashboard size={13} />
              Dashboard Admin
            </Link>
            <a href="/staff/dashboard" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", borderRadius: 10, background: "rgba(95,174,125,.06)", border: "1px solid rgba(95,174,125,.15)", color: "#5fae7d", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
              <Users size={13} />
              Portal Staff
              <ExternalLink size={11} style={{ marginLeft: "auto" }} />
            </a>
            <a href="https://kuykuygroup-apps.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", borderRadius: 10, background: "rgba(111,168,212,.06)", border: "1px solid rgba(111,168,212,.15)", color: "#6fa8d4", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
              <Calendar size={13} />
              Website Booking
              <ExternalLink size={11} style={{ marginLeft: "auto" }} />
            </a>
          </div>
        </div>

        {/* === CENTER: Treatment Catalog === */}
        <div style={{ flex: 1, padding: "20px 20px", display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          {/* Search + Category filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#776d54" }} />
              <input
                style={{ ...inputStyle, paddingLeft: 34 }}
                placeholder="Cari treatment..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{ padding: "8px 14px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", border: cat === category ? "none" : "1px solid rgba(212,175,55,.16)", background: cat === category ? GOLD_GRAD : "rgba(212,175,55,.06)", color: cat === category ? "#1a1305" : "#9a8f70", whiteSpace: "nowrap" }}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Treatment grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 13, flex: 1, alignContent: "start" }}>
            {filtered.map(t => {
              const inCart = cart.find(c => c.id === t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => addToCart(t)}
                  style={{ textAlign: "left", padding: "16px", borderRadius: 14, background: CARD_BG, border: inCart ? "1px solid rgba(212,175,55,.45)" : BORDER, cursor: "pointer", boxShadow: inCart ? "0 0 20px rgba(212,175,55,.15)" : SHADOW, transition: "all .2s", position: "relative", overflow: "hidden" }}
                >
                  {t.popular && (
                    <div style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", gap: 3 }}>
                      <Star size={10} color="#d4af37" fill="#d4af37" />
                      <span style={{ fontSize: 9, color: "#d4af37", fontWeight: 700 }}>POPULER</span>
                    </div>
                  )}
                  <div style={{ display: "inline-block", padding: "3px 9px", borderRadius: 5, fontSize: 10, fontWeight: 700, marginBottom: 10, background: CATEGORY_COLORS[t.category] || "rgba(212,175,55,.1)", color: CATEGORY_TEXT[t.category] || "#d4af37" }}>{t.category}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, color: "#f3ecda", marginBottom: 4, lineHeight: 1.3 }}>{t.short}</div>
                  <div style={{ fontSize: 11, color: "#776d54", marginBottom: 10, lineHeight: 1.4 }}>{t.desc}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatRp(t.price)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                    <Clock size={11} color="#776d54" />
                    <span style={{ fontSize: 11, color: "#776d54" }}>{t.duration} menit</span>
                    {inCart && (
                      <span style={{ marginLeft: "auto", background: GOLD_GRAD, borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 700, color: "#1a1305" }}>x{inCart.qty}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* === RIGHT PANEL: Cart + Summary === */}
        <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(212,175,55,.10)", background: "rgba(10,7,3,.3)" }}>
          {/* Cart header */}
          <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(212,175,55,.10)", display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingCart size={16} color="#d4af37" />
            <span style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "#5a5238", fontWeight: 700, flex: 1 }}>Keranjang Order</span>
            {totalQty > 0 && (
              <span style={{ background: GOLD_GRAD, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, color: "#1a1305" }}>{totalQty}</span>
            )}
          </div>

          {/* Cart items */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {cart.length === 0 && (
              <div style={{ textAlign: "center", marginTop: 60, color: "#5a5238" }}>
                <ShoppingCart size={36} style={{ margin: "0 auto 12px", opacity: .3 }} />
                <p style={{ fontSize: 12.5 }}>Pilih treatment dari katalog</p>
              </div>
            )}
            {cart.map(item => (
              <div key={item.id} style={{ background: PANEL_BG, border: BORDER, borderRadius: 11, padding: "12px 12px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f3ecda", marginBottom: 2 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#776d54" }}>{item.duration} menit</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ color: "#5a5238", cursor: "pointer", background: "none", border: "none", padding: 2 }}>
                    <Trash2 size={13} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(212,175,55,.08)", borderRadius: 8, border: "1px solid rgba(212,175,55,.15)" }}>
                    <button onClick={() => changeQty(item.id, -1)} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", color: "#9a8f70", fontSize: 16 }}>−</button>
                    <span style={{ minWidth: 20, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#e3c46a" }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", color: "#9a8f70" }}>
                      <Plus size={13} />
                    </button>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatRp(item.price * item.qty)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary + Pay */}
          <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(212,175,55,.10)", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#9a8f70" }}>
              <span>Subtotal</span>
              <span style={{ color: "#c9bfa3" }}>{formatRp(subtotal)}</span>
            </div>
            {discountAmt > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                <span style={{ color: "#5fae7d" }}>Diskon {discountPct}%</span>
                <span style={{ color: "#5fae7d" }}>− {formatRp(discountAmt)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#9a8f70" }}>
              <span>Komisi Terapis (35%)</span>
              <span style={{ color: "#c89650" }}>{formatRp(commission)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid rgba(212,175,55,.12)", marginTop: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#f3ecda" }}>Total</span>
              <span style={{ fontSize: 16, fontWeight: 800, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatRp(total)}</span>
            </div>
            <button
              onClick={() => cart.length > 0 && setStep("payment")}
              disabled={cart.length === 0}
              style={{ width: "100%", padding: "13px", borderRadius: 12, fontWeight: 800, fontSize: 13, letterSpacing: "1.5px", cursor: cart.length > 0 ? "pointer" : "not-allowed", background: cart.length > 0 ? GOLD_GRAD : "rgba(212,175,55,.08)", color: cart.length > 0 ? "#1a1305" : "#5a5238", border: "none", transition: "all .2s", boxShadow: cart.length > 0 ? "0 6px 20px rgba(212,175,55,.3)" : "none" }}
            >
              BAYAR SEKARANG
            </button>
          </div>
        </div>
      </div>

      {/* === PAYMENT MODAL === */}
      {step === "payment" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(5,3,1,.92)", backdropFilter: "blur(8px)" }}>
          <div style={{ width: "100%", maxWidth: 520, background: "linear-gradient(160deg,#15110a,#0a0703)", border: "1px solid rgba(212,175,55,.3)", borderRadius: 20, padding: 32, boxShadow: "0 32px 80px rgba(0,0,0,.8)", display: "flex", flexDirection: "column", gap: 22, maxHeight: "90vh", overflowY: "auto" }}>
            {/* Header */}
            <div>
              <div style={{ fontSize: 9.5, letterSpacing: "2.5px", textTransform: "uppercase", color: "#5a5238", marginBottom: 6 }}>Proses Pembayaran</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 700, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatRp(total)}</div>
              {discountAmt > 0 && <div style={{ fontSize: 12, color: "#5fae7d", marginTop: 4 }}>Hemat {formatRp(discountAmt)} · Diskon {discountPct}%</div>}
            </div>

            {/* Order summary */}
            <div style={{ background: "rgba(212,175,55,.04)", border: "1px solid rgba(212,175,55,.10)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, letterSpacing: "2px", color: "#5a5238", textTransform: "uppercase", marginBottom: 12 }}>Ringkasan Order</div>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(212,175,55,.06)" }}>
                  <span style={{ fontSize: 13, color: "#9a8f70" }}>{item.name} × {item.qty}</span>
                  <span style={{ fontSize: 13, color: "#c9bfa3" }}>{formatRp(item.price * item.qty)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11.5, color: "#776d54" }}>
                <span>Terapis: {therapist}</span>
                <span>{room}</span>
              </div>
              {customerName && <div style={{ marginTop: 4, fontSize: 11.5, color: "#776d54" }}>Pelanggan: {customerName}</div>}
            </div>

            {/* Payment method */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: "2px", color: "#5a5238", textTransform: "uppercase", marginBottom: 12 }}>Metode Pembayaran</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {(["Cash", "QRIS", "Transfer"] as PayMethod[]).map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    style={{ padding: "14px 0", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer", border: m === payMethod ? "none" : "1px solid rgba(212,175,55,.18)", background: m === payMethod ? GOLD_GRAD : "rgba(212,175,55,.05)", color: m === payMethod ? "#1a1305" : "#9a8f70", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                  >
                    {m === "Cash" && <Banknote size={18} />}
                    {m === "QRIS" && <QrCode size={18} />}
                    {m === "Transfer" && <CreditCard size={18} />}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Cash received */}
            {payMethod === "Cash" && (
              <div>
                <label style={{ fontSize: 11, color: "#776d54", display: "block", marginBottom: 8 }}>Uang Tunai Diterima</label>
                <input type="number" style={{ ...inputStyle, fontSize: 16, padding: "12px 14px" }} placeholder="0" value={cashReceived || ""} onChange={e => setCashReceived(Number(e.target.value))} />
                {cashReceived >= total && total > 0 && (
                  <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(95,174,125,.10)", border: "1px solid rgba(95,174,125,.25)", fontSize: 13, color: "#5fae7d", fontWeight: 700 }}>
                    Kembalian: {formatRp(change)}
                  </div>
                )}
                {cashReceived > 0 && cashReceived < total && (
                  <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(192,36,31,.08)", border: "1px solid rgba(192,36,31,.2)", fontSize: 13, color: "#e0726a" }}>
                    Kurang: {formatRp(total - cashReceived)}
                  </div>
                )}
              </div>
            )}

            {payMethod === "QRIS" && (
              <div style={{ textAlign: "center", padding: "20px", background: "rgba(212,175,55,.04)", border: "1px solid rgba(212,175,55,.12)", borderRadius: 12 }}>
                <QrCode size={64} color="#d4af37" style={{ margin: "0 auto 10px" }} />
                <div style={{ fontSize: 12.5, color: "#9a8f70" }}>Scan QR Code untuk pembayaran</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#d4af37", marginTop: 6 }}>{formatRp(total)}</div>
              </div>
            )}

            {payMethod === "Transfer" && (
              <div style={{ padding: "16px", background: "rgba(212,175,55,.04)", border: "1px solid rgba(212,175,55,.12)", borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: "#776d54", marginBottom: 6 }}>Transfer ke rekening:</div>
                <div style={{ fontSize: 13, color: "#c9bfa3" }}>BCA · 1234 5678 90</div>
                <div style={{ fontSize: 12, color: "#776d54", marginTop: 2 }}>A/N: KuyKuy Group Spa</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#d4af37", marginTop: 10 }}>{formatRp(total)}</div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep("order")}
                style={{ flex: 1, padding: "13px", borderRadius: 12, fontSize: 13, cursor: "pointer", background: "rgba(212,175,55,.06)", border: "1px solid rgba(212,175,55,.16)", color: "#776d54", fontWeight: 600 }}
              >Kembali</button>
              <button onClick={handlePayment} disabled={!canPay}
                style={{ flex: 2, padding: "13px", borderRadius: 12, fontSize: 13, fontWeight: 800, letterSpacing: "1px", cursor: canPay ? "pointer" : "not-allowed", background: canPay ? GOLD_GRAD : "rgba(212,175,55,.08)", color: canPay ? "#1a1305" : "#5a5238", border: "none", boxShadow: canPay ? "0 6px 20px rgba(212,175,55,.3)" : "none" }}
              >PROSES PEMBAYARAN</button>
            </div>
          </div>
        </div>
      )}

      {/* === SUCCESS / RECEIPT SCREEN === */}
      {step === "success" && invoice && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(5,3,1,.96)", backdropFilter: "blur(10px)" }}>
          <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 16, maxHeight: "90vh", overflowY: "auto", padding: "0 4px" }}>
            {/* Success badge */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(95,174,125,.12)", border: "2px solid rgba(95,174,125,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <CheckCircle2 size={30} color="#5fae7d" />
              </div>
              <div style={{ fontSize: 9.5, letterSpacing: "2.5px", textTransform: "uppercase", color: "#5fae7d", marginBottom: 4 }}>Pembayaran Berhasil</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: "#d4af37", fontWeight: 700 }}>{invoice.inv}</div>
            </div>

            {/* Receipt */}
            <div style={{ background: "linear-gradient(160deg,#15110a,#0a0703)", border: "1px solid rgba(212,175,55,.25)", borderRadius: 18, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,.7)" }}>
              {/* Outlet header */}
              <div style={{ textAlign: "center", paddingBottom: 14, borderBottom: "1px solid rgba(212,175,55,.10)" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>KUYKUY GROUP SPA</div>
                <div style={{ fontSize: 11, color: "#776d54", marginTop: 3 }}>{invoice.outlet}</div>
                <div style={{ fontSize: 10.5, color: "#5a5238", marginTop: 2 }}>{new Date(invoice.time).toLocaleString("id-ID")}</div>
              </div>

              {/* Customer + assignment */}
              <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(212,175,55,.08)", display: "flex", flexDirection: "column", gap: 6 }}>
                {[["Pelanggan", invoice.customerName || "-"],["No. HP", invoice.customerPhone || "-"],["Terapis", invoice.therapist],["Kamar", invoice.room]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#776d54" }}>{k}</span>
                    <span style={{ fontSize: 12, color: "#c9bfa3" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Items */}
              <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(212,175,55,.08)", display: "flex", flexDirection: "column", gap: 6 }}>
                {invoice.cart.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, color: "#9a8f70" }}>{item.name} ({item.duration}m) × {item.qty}</span>
                    <span style={{ fontSize: 12.5, color: "#c9bfa3" }}>{formatRp(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ padding: "12px 0", display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#776d54" }}>Subtotal</span>
                  <span style={{ fontSize: 12, color: "#9a8f70" }}>{formatRp(invoice.subtotal)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#5fae7d" }}>Diskon</span>
                    <span style={{ fontSize: 12, color: "#5fae7d" }}>− {formatRp(invoice.discount)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(212,175,55,.12)" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#f3ecda" }}>TOTAL</span>
                  <span style={{ fontSize: 17, fontWeight: 800, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{formatRp(invoice.total)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11.5, color: "#776d54" }}>Metode</span>
                  <span style={{ fontSize: 11.5, color: "#c89650", fontWeight: 600 }}>{invoice.payMethod}</span>
                </div>
                {invoice.payMethod === "Cash" && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11.5, color: "#776d54" }}>Tunai Diterima</span>
                      <span style={{ fontSize: 11.5, color: "#c9bfa3" }}>{formatRp(invoice.cashReceived)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11.5, color: "#776d54" }}>Kembalian</span>
                      <span style={{ fontSize: 11.5, color: "#5fae7d", fontWeight: 600 }}>{formatRp(invoice.cashReceived - invoice.total)}</span>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11.5, color: "#776d54" }}>Komisi Terapis (35%)</span>
                  <span style={{ fontSize: 11.5, color: "#c89650" }}>{formatRp(invoice.commission)}</span>
                </div>
              </div>

              {/* Thank you */}
              <div style={{ textAlign: "center", paddingTop: 14, borderTop: "1px solid rgba(212,175,55,.08)" }}>
                <div style={{ fontSize: 11.5, color: "#5a5238" }}>Terima kasih telah mempercayakan perawatan Anda</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10.5, color: "#776d54", marginTop: 3, letterSpacing: 1 }}>KUYKUY GROUP SPA</div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => window.print()}
                style={{ flex: 1, padding: "12px", borderRadius: 12, fontSize: 12, cursor: "pointer", background: "rgba(212,175,55,.06)", border: "1px solid rgba(212,175,55,.16)", color: "#9a8f70", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
              >
                <Printer size={14} />
                Cetak Struk
              </button>
              <button onClick={resetTransaction}
                style={{ flex: 2, padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 800, letterSpacing: "1px", cursor: "pointer", background: GOLD_GRAD, color: "#1a1305", border: "none", boxShadow: "0 6px 20px rgba(212,175,55,.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <RotateCcw size={14} />
                TRANSAKSI BARU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
