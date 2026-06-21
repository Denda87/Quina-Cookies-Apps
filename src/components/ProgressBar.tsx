export default function ProgressBar({ value, max, className = "" }: { value: number; max: number; className?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`w-full bg-gray-800 rounded-full h-2 ${className}`}>
      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #C9A84C, #D4AF37)" }} />
    </div>
  );
}
