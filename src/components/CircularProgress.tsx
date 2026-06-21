export default function CircularProgress({ value, max, label }: { value: number; max: number; label?: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const dash = circ * pct;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="90" height="90" className="-rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#222" strokeWidth="8" />
        <circle cx="45" cy="45" r={r} fill="none" stroke="#D4AF37" strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-[#D4AF37]">{value}</div>
        {label && <div className="text-xs text-gray-400">{label}</div>}
      </div>
    </div>
  );
}
