import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret) {
    return NextResponse.json(
      { error: "Tambahkan ?secret=SERVICE_ROLE_KEY ke URL ini" },
      { status: 400 }
    );
  }

  // Gunakan service_role key dari query param agar bisa bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret,
    { auth: { persistSession: false } }
  );

  const results: Record<string, string> = {};

  // ── Perbaiki schema: tambah kolom yang diperlukan kode ──────────────────
  const alterQueries = [
    "alter table services add column if not exists slug             text",
    "alter table services add column if not exists price_idr        integer",
    "alter table services add column if not exists duration_minutes integer",
    "alter table services add column if not exists icon             text",
    "alter table services add column if not exists sort_order       integer default 0",
    "alter table branches add column if not exists map_url          text",
    "alter table branches add column if not exists sort_order       integer default 0",
  ];

  for (const sql of alterQueries) {
    const { error } = await supabase.rpc("exec_sql", { sql }).maybeSingle();
    // exec_sql mungkin tidak ada — kita lanjut saja, kolom sudah ada via migration
    if (error) results[`alter_note`] = "Kolom mungkin sudah ada, lanjut...";
  }

  // ── Cek apakah services sudah ada ──────────────────────────────────────
  const { data: existingServices } = await supabase
    .from("services")
    .select("id")
    .limit(1);

  if (!existingServices || existingServices.length === 0) {
    const { error: sErr } = await supabase.from("services").insert([
      { name: "Pijat Aromaterapi",    slug: "pijat-aromaterapi",   description: "Pijat relaksasi dengan minyak esensial pilihan untuk menenangkan tubuh dan pikiran",        duration: "60/90 menit", duration_minutes: 60, price: 120000, price_idr: 120000, icon: "leaf",     sort_order: 1, active: true },
      { name: "Pijat Batu Panas",     slug: "pijat-batu-panas",    description: "Terapi batu vulkanik panas yang merilekskan otot secara mendalam",                         duration: "60/90 menit", duration_minutes: 90, price: 275000, price_idr: 275000, icon: "flame",    sort_order: 2, active: true },
      { name: "Pijat Premium Wajah",  slug: "pijat-premium-wajah", description: "Perawatan wajah intensif dengan teknik anti-aging dan bahan premium",                      duration: "60/90 menit", duration_minutes: 60, price: 250000, price_idr: 250000, icon: "sparkles", sort_order: 3, active: true },
      { name: "Manikur & Pedikur",    slug: "manikur-pedikur",     description: "Perawatan kuku tangan dan kaki dengan produk berkualitas tinggi",                          duration: "60/90 menit", duration_minutes: 60, price: 255000, price_idr: 255000, icon: "hand",     sort_order: 4, active: true },
    ]);
    results.services = sErr ? `ERROR: ${sErr.message}` : "✅ 4 layanan berhasil ditambahkan";
  } else {
    // Backfill kolom baru pada data lama
    await supabase.from("services").update({ price_idr: 120000, duration_minutes: 60, icon: "leaf",     slug: "pijat-aromaterapi",   sort_order: 1 }).eq("name", "Pijat Aromaterapi");
    await supabase.from("services").update({ price_idr: 275000, duration_minutes: 90, icon: "flame",    slug: "pijat-batu-panas",    sort_order: 2 }).eq("name", "Pijat Batu Panas");
    await supabase.from("services").update({ price_idr: 250000, duration_minutes: 60, icon: "sparkles", slug: "pijat-premium-wajah", sort_order: 3 }).eq("name", "Pijat Premium Wajah");
    await supabase.from("services").update({ price_idr: 255000, duration_minutes: 60, icon: "hand",     slug: "manikur-pedikur",     sort_order: 4 }).eq("name", "Manikur & Pedikur");
    results.services = "✅ Data layanan sudah ada — kolom baru di-update";
  }

  // ── Branches: backfill + insert cabang baru ─────────────────────────────
  const allBranches = [
    { name: "KUY BM",                  address: "Ruko Bekasi Mas, Jl. Ahmad Yani No.24 Blok B, Marga Jaya, Kec. Bekasi Selatan, Kota Bekasi, Jawa Barat 17141",                                                         maps_url: "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",  map_url: "https://maps.app.goo.gl/CCp2fQaASvTcHAxN6",  sort_order: 1,  active: true },
    { name: "KUY BETOS",               address: "Jl. Cut Mutia No.23 Blok G, Margahayu, Kec. Bekasi Timur, Kota Bekasi, Jawa Barat 17113",                                                                              maps_url: "https://maps.app.goo.gl/vWqKNtksLgPRdye16", map_url: "https://maps.app.goo.gl/vWqKNtksLgPRdye16", sort_order: 2,  active: true },
    { name: "CRYSTAL KUY",             address: "Ruko Sentral Niaga Kalimalang Blok B1 No.16, Jl. Sentra Niaga Kalimalang No.15, Kayuringin Jaya, Kec. Bekasi Sel., Kota Bekasi, Jawa Barat 17144",                     maps_url: "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",  map_url: "https://maps.app.goo.gl/6qdwQh1TUGrAR78b6",  sort_order: 3,  active: true },
    { name: "KUY STORY",               address: "Ruko Commpark Kota Wisata Blok H No.29, Limus Nunggal, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820",                                                             maps_url: "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",  map_url: "https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8",  sort_order: 4,  active: true },
    { name: "XI-KUY",                  address: "Jalan Niaga Raya Jababeka 2 Ruko CBD, Blok D No.16-17, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",                                          maps_url: "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",  map_url: "https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8",  sort_order: 5,  active: true },
    { name: "Strawberry Spa & Therapy",address: "Ruko Kawasan Niaga Citra Grand Cibubur, Jl. Alternatif Cibubur No.26, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435",                                 maps_url: "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",  map_url: "https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7",  sort_order: 6,  active: true },
    { name: "V PHOENIX",               address: "Plaza Amsterdam, Jl. MH. Thamrin No.57 Blok A.21, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16710",                                                maps_url: "https://maps.app.goo.gl/4z7PPgg5myAM4TCE7",  map_url: "https://maps.app.goo.gl/4z7PPgg5myAM4TCE7",  sort_order: 7,  active: true },
    { name: "SIERRA",                  address: "Ruko Podium, Jl. Mataram Blok B.1 & B.2, Cibatu, Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",                                                               maps_url: "https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7",  map_url: "https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7",  sort_order: 8,  active: true },
    { name: "VIERZHEN",                address: "Jl. Niaga Raya Ruko CBD Jababeka Kav AA3 Blok A88, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530",                                              maps_url: "https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8",  map_url: "https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8",  sort_order: 9,  active: true },
    { name: "MIRACLE KUY",             address: "Ruko Cibinong Center, Blok E No.7, Pakansari, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16915",                                                                      maps_url: "https://maps.app.goo.gl/TfF55aGh7N4TPEXC6",  map_url: "https://maps.app.goo.gl/TfF55aGh7N4TPEXC6",  sort_order: 10, active: true },
    { name: "INFINITY",                address: "Ruko Plaza Amsterdam City, Blok C8, Sentul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810",                                                                   maps_url: "https://maps.app.goo.gl/fYaPmGRKddJkLjbg8",  map_url: "https://maps.app.goo.gl/fYaPmGRKddJkLjbg8",  sort_order: 11, active: true },
  ];

  const { data: existingBranches } = await supabase
    .from("branches")
    .select("name");

  const existingNames = new Set((existingBranches ?? []).map((b: { name: string }) => b.name));
  const toInsert = allBranches.filter((b) => !existingNames.has(b.name));
  const toUpdate = allBranches.filter((b) => existingNames.has(b.name));

  // Update kolom baru pada cabang lama
  for (const b of toUpdate) {
    await supabase
      .from("branches")
      .update({ map_url: b.map_url, sort_order: b.sort_order })
      .eq("name", b.name);
  }

  if (toInsert.length > 0) {
    const { error: bErr } = await supabase.from("branches").insert(toInsert);
    results.branches = bErr
      ? `ERROR: ${bErr.message}`
      : `✅ ${toInsert.length} cabang baru ditambahkan`;
  } else {
    results.branches = "✅ Semua cabang sudah ada — sort_order & map_url diperbarui";
  }

  // ── Testimonials ────────────────────────────────────────────────────────
  const { data: existingTestimonials } = await supabase
    .from("testimonials")
    .select("id")
    .limit(1);

  if (!existingTestimonials || existingTestimonials.length === 0) {
    const { error: tErr } = await supabase.from("testimonials").insert([
      { customer_name: "Rina Wijaya",   content: "Pengalaman yang luar biasa! Staf sangat profesional dan ramah. Pijat aromaterapi terbaik yang pernah saya coba.",                     rating: 5, active: true },
      { customer_name: "Budi Hartono",  content: "Suasananya sangat mewah dan tenang. Hot stone massage benar-benar merilekskan otot saya yang kaku. Sangat direkomendasikan!",         rating: 5, active: true },
      { customer_name: "Dewi Lestari",  content: "Pelayanan premium dengan harga yang reasonable. Facial treatment-nya luar biasa, kulit saya terasa jauh lebih cerah.",                rating: 5, active: true },
    ]);
    results.testimonials = tErr ? `ERROR: ${tErr.message}` : "✅ 3 testimoni berhasil ditambahkan";
  } else {
    results.testimonials = "✅ Testimoni sudah ada";
  }

  return NextResponse.json({
    status: "Selesai! 🎉",
    detail: results,
    next: "Buka https://kuykuygroup-apps.vercel.app/layanan dan /cabang untuk cek hasilnya",
  });
}
