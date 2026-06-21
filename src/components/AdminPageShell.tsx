import { ReactNode } from "react";

export default function AdminPageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#080800" }}>
      {/* Page Header */}
      <div
        className="px-8 py-5 sticky top-0 z-10"
        style={{ background: "linear-gradient(90deg,#1a1400,#0d0d00)", borderBottom: "1px solid #D4AF3730" }}
      >
        <h1
          className="font-serif font-bold"
          style={{
            fontSize: 24,
            background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          {title.toUpperCase()}
        </h1>
        <p className="text-gray-700 text-xs tracking-widest">KUYKUY GROUP</p>
      </div>
      <div className="p-6 flex flex-col gap-4">{children}</div>
    </div>
  );
}
