"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (!user) router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[430px] mx-auto relative">
        {children}
        <div className="h-20" />
      </div>
      <BottomNav />
    </div>
  );
}
