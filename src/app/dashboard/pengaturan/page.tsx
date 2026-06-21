import AdminPageShell from "@/components/AdminPageShell";

export default function PengaturanPage() {
  return (
    <AdminPageShell title="Pengaturan">
      <div className="grid grid-cols-2 gap-4">
        {[
          { section: "Profil Perusahaan", fields: [["Nama Perusahaan","Kuykuy Group"],["Email","admin@kuykuy.com"],["Telepon","+62 21 555-0100"],["Alamat","Jakarta Selatan"]] },
          { section: "Pengaturan Sistem", fields: [["Bahasa","Bahasa Indonesia"],["Zona Waktu","WIB (GMT+7)"],["Notifikasi Email","Aktif"],["Backup Otomatis","Setiap Hari"]] },
        ].map(({ section, fields }) => (
          <div key={section} className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1c1800,#151200)", border: "1px solid #D4AF3730" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "#D4AF37" }}>{section}</h3>
            <div className="space-y-3">
              {fields.map(([label, value]) => (
                <div key={label}>
                  <label className="text-gray-600 text-xs block mb-1">{label}</label>
                  <input
                    defaultValue={value}
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                    style={{ background: "#0d0d00", border: "1px solid #D4AF3730" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button className="px-6 py-2.5 rounded-xl font-bold text-black text-sm" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)", boxShadow: "0 4px 16px #D4AF3730" }}>Simpan Pengaturan</button>
      </div>
    </AdminPageShell>
  );
}
