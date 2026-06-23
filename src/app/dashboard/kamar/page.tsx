"use client";
import { useState, useEffect, useCallback } from "react";
import AdminPageShell from "@/components/AdminPageShell";

const ROOM_NAMES = ["Kamar 1", "Kamar 2", "Kamar 3", "Kamar 4", "Kamar 5", "Kamar 6", "VIP A", "VIP B"];

const THERAPISTS = [
  "Budi Santoso", "Maya Sari", "Rina Kartika", "Dian Pratiwi",
  "Joko Susilo", "Sari Indah", "Dewi Ayu", "Andi Kurnia",
];

const TREATMENTS = [
  { name: "Express", duration: 45 },
  { name: "Kuy 60", duration: 60 },
  { name: "Kuy 90", duration: 90 },
  { name: "Exclume", duration: 90 },
  { name: "DShoot", duration: 120 },
];

type RoomStatus = "available" | "occupied" | "cleaning";

interface RoomData {
  status: RoomStatus;
  therapist: string;
  treatment: string;
  startTime: string;
  durationMin: number;
}

type RoomsState = Record<string, RoomData | null>;

const LS_KEY = "kuy_rooms";

function loadRooms(): RoomsState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRooms(rooms: RoomsState) {
  localStorage.setItem(LS_KEY, JSON.stringify(rooms));
}

function getRoomData(rooms: RoomsState, name: string): RoomData | null {
  return rooms[name] ?? null;
}

export default function KamarPage() {
  const [rooms, setRooms] = useState<RoomsState>({});
  const [tick, setTick] = useState(0);
  const [formRoom, setFormRoom] = useState<string | null>(null);
  const [formTherapist, setFormTherapist] = useState(THERAPISTS[0]);
  const [formTreatment, setFormTreatment] = useState(TREATMENTS[0].name);

  useEffect(() => {
    setRooms(loadRooms());
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const updateRoom = useCallback((name: string, data: RoomData | null) => {
    setRooms(prev => {
      const next = { ...prev, [name]: data };
      saveRooms(next);
      return next;
    });
  }, []);

  function startSession(name: string) {
    const treatment = TREATMENTS.find(t => t.name === formTreatment) ?? TREATMENTS[0];
    updateRoom(name, {
      status: "occupied",
      therapist: formTherapist,
      treatment: formTreatment,
      startTime: new Date().toISOString(),
      durationMin: treatment.duration,
    });
    setFormRoom(null);
  }

  function endSession(name: string) {
    const rd = getRoomData(rooms, name);
    if (!rd) return;
    updateRoom(name, { ...rd, status: "cleaning" });
  }

  function markReady(name: string) {
    updateRoom(name, null);
  }

  function getCountdown(rd: RoomData): { text: string; progress: number; urgent: boolean } {
    const elapsed = (Date.now() - new Date(rd.startTime).getTime()) / 1000;
    const totalSec = rd.durationMin * 60;
    const remaining = Math.max(0, totalSec - elapsed);
    const mm = Math.floor(remaining / 60);
    const ss = Math.floor(remaining % 60);
    const progress = Math.min(1, elapsed / totalSec);
    return {
      text: `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`,
      progress,
      urgent: remaining < 300 && remaining > 0,
    };
  }

  const allData = ROOM_NAMES.map(n => ({ name: n, data: getRoomData(rooms, n) }));
  const available = allData.filter(r => !r.data || r.data.status === "available").length;
  const occupied = allData.filter(r => r.data?.status === "occupied").length;
  const cleaning = allData.filter(r => r.data?.status === "cleaning").length;

  const fieldStyle: React.CSSProperties = {
    background: "#111",
    border: "1px solid #D4AF3740",
    borderRadius: 6,
    color: "#e0c97f",
    padding: "6px 10px",
    fontSize: 12,
    outline: "none",
    width: "100%",
  };

  return (
    <AdminPageShell title="Monitor Kamar">
      {/* Summary bar */}
      <div className="flex gap-4 mb-2">
        {[
          { label: "Tersedia", count: available, color: "#4ade80" },
          { label: "Terisi", count: occupied, color: "#f87171" },
          { label: "Cleaning", count: cleaning, color: "#fbbf24" },
        ].map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: "#0f0e00", border: "1px solid #D4AF3730" }}>
            <span className="text-2xl font-bold" style={{ color }}>{count}</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-xs" style={{ background: "#0f0e00", border: "1px solid #D4AF3720", color: "#555" }}>
          {tick > 0 && "Live"}
        </div>
      </div>

      {/* Room grid */}
      <div className="grid grid-cols-4 gap-4">
        {ROOM_NAMES.map(name => {
          const rd = getRoomData(rooms, name);
          const status: RoomStatus = rd?.status ?? "available";

          let statusColor = "#4ade80";
          let statusLabel = "Tersedia";
          if (status === "occupied") { statusColor = "#f87171"; statusLabel = "Terisi"; }
          if (status === "cleaning") { statusColor = "#fbbf24"; statusLabel = "Cleaning"; }

          const countdown = rd?.status === "occupied" ? getCountdown(rd) : null;

          return (
            <div
              key={name}
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{ background: "#0f0e00", border: `1px solid ${statusColor}30` }}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-base" style={{
                  background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{name}</p>
                <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ background: statusColor + "20", color: statusColor }}>{statusLabel}</span>
              </div>

              {status === "occupied" && rd && countdown && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400">{rd.therapist}</p>
                  <p className="text-xs" style={{ color: "#D4AF37" }}>{rd.treatment}</p>
                  <p className="text-xl font-mono font-bold" style={{ color: countdown.urgent ? "#f87171" : "#f5e070" }}>
                    {countdown.text}
                    <span className="text-xs text-gray-600 ml-1">remaining</span>
                  </p>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#222" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${countdown.progress * 100}%`,
                        background: countdown.urgent ? "#f87171" : "linear-gradient(90deg,#C9A84C,#f5e070)",
                      }}
                    />
                  </div>
                  <button
                    onClick={() => endSession(name)}
                    className="mt-1 py-2 rounded-lg text-xs font-bold"
                    style={{ background: "#1a0a0a", border: "1px solid #f8717140", color: "#f87171", cursor: "pointer" }}
                  >
                    Selesai
                  </button>
                </div>
              )}

              {status === "cleaning" && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">Sedang dibersihkan...</p>
                  <button
                    onClick={() => markReady(name)}
                    className="py-2 rounded-lg text-xs font-bold"
                    style={{ background: "#1a1500", border: "1px solid #fbbf2440", color: "#fbbf24", cursor: "pointer" }}
                  >
                    Siap
                  </button>
                </div>
              )}

              {status === "available" && (
                <div className="flex flex-col gap-2">
                  {formRoom === name ? (
                    <>
                      <select style={fieldStyle} value={formTherapist} onChange={e => setFormTherapist(e.target.value)}>
                        {THERAPISTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <select style={fieldStyle} value={formTreatment} onChange={e => setFormTreatment(e.target.value)}>
                        {TREATMENTS.map(t => <option key={t.name} value={t.name}>{t.name} ({t.duration}mnt)</option>)}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setFormRoom(null)}
                          className="flex-1 py-1.5 rounded text-xs text-gray-500"
                          style={{ background: "#111", border: "1px solid #333", cursor: "pointer" }}
                        >Batal</button>
                        <button
                          onClick={() => startSession(name)}
                          className="flex-1 py-1.5 rounded text-xs font-bold"
                          style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", color: "#080800", cursor: "pointer" }}
                        >Mulai</button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => { setFormRoom(name); setFormTherapist(THERAPISTS[0]); setFormTreatment(TREATMENTS[0].name); }}
                      className="py-2 rounded-lg text-xs font-bold"
                      style={{ background: "#001a0a", border: "1px solid #4ade8040", color: "#4ade80", cursor: "pointer" }}
                    >
                      Mulai Sesi
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminPageShell>
  );
}
