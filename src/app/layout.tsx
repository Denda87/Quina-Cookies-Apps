import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuykuy Group | Spa & Massage",
  description: "Layanan spa dan pijat premium untuk tubuh dan jiwa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
