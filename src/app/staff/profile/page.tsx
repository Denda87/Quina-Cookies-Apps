"use client";
import { useState } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Phone, TrendingUp, Award, LogOut, Edit2, Camera, Settings } from "lucide-react";
import GoldHeader from "@/components/GoldHeader";
import Link from "next/link";

const roles = ["Therapist", "Office Boy", "Admin"];

export default function ProfilePage() {
  const router = useRouter();
  const user = getUser();
  const [selectedRole, setSelectedRole] = useState("Therapist");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "Budi Santoso");

  return (
    <div>
      <GoldHeader title="PROFILE" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Photo + Name */}
        <div
          className="rounded-2xl p-6 text-center relative"
          style={{
            background: "linear-gradient(135deg, #1e1800, #141000, #1a1400)",
            border: "1px solid #D4AF3745",
          }}
        >
          <button
            onClick={() => setEditMode(!editMode)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#D4AF3720", border: "1px solid #D4AF3740" }}
          >
            <Edit2 size={13} color="#D4AF37" />
          </button>

          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-black font-bold text-3xl font-serif mx-auto"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #f5e070, #D4AF37, #B8960C)",
                boxShadow: "0 0 28px #D4AF3760",
              }}
            >
              {name.charAt(0)}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#D4AF37", boxShadow: "0 2px 8px #00000060" }}
            >
              <Camera size={14} color="#000" />
            </button>
          </div>

          {editMode ? (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-transparent text-center text-xl font-bold font-serif text-white border-b focus:outline-none w-full mb-2"
              style={{ borderColor: "#D4AF37" }}
            />
          ) : (
            <h2 className="font-serif text-xl font-bold text-white mb-1">{name}</h2>
          )}

          <div className="flex gap-2 justify-center flex-wrap mt-2">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  selectedRole === role
                    ? {
                        background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)",
                        color: "#000",
                        boxShadow: "0 2px 10px #D4AF3750",
                      }
                    : {
                        background: "#D4AF3715",
                        color: "#D4AF3780",
                        border: "1px solid #D4AF3730",
                      }
                }
              >
                {role}
              </button>
            ))}
          </div>

          {editMode && (
            <button
              onClick={() => setEditMode(false)}
              className="mt-4 px-6 py-2 rounded-xl text-xs font-bold text-black"
              style={{ background: "linear-gradient(135deg, #C9A84C, #D4AF37)" }}
            >
              SIMPAN PERUBAHAN
            </button>
          )}
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-2">
          {[
            { icon: Phone, label: "Nomor HP", value: "+62 812-3356-7890" },
            { icon: TrendingUp, label: "Total Hari Ini", value: "3 Customer" },
            { icon: Award, label: "Performa Bulanan", value: "85 Customer" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #141000, #111)",
                border: "1px solid #D4AF3728",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#D4AF3718" }}
              >
                <Icon size={17} color="#D4AF37" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-xs">{label}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Settings link */}
        <Link
          href="/staff/settings"
          className="flex items-center gap-4 rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, #141000, #111)",
            border: "1px solid #D4AF3728",
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#D4AF3718" }}>
            <Settings size={17} color="#D4AF37" />
          </div>
          <div className="flex-1">
            <p className="text-gray-600 text-xs">Pengaturan</p>
            <p className="text-white font-semibold text-sm mt-0.5">Akun & Notifikasi</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Link>

        {/* Logout */}
        <button
          onClick={() => { logout(); router.push("/login"); }}
          className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-2 mt-1"
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #f5e070 40%, #D4AF37 60%, #B8960C 100%)",
            boxShadow: "0 6px 24px #D4AF3750",
          }}
        >
          <LogOut size={16} />
          LOGOUT
        </button>

      </div>
    </div>
  );
}
