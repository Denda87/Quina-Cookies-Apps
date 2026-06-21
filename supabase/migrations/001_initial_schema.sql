-- ============================================================
-- KUYKUY GROUP — Supabase Schema
-- Jalankan file ini di Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUM & TYPES
-- ============================================================
create type app_role as enum ('admin', 'staff');
create type booking_status as enum ('pending', 'confirmed', 'done', 'cancelled');

-- ============================================================
-- TABLES
-- ============================================================

-- Services (layanan spa)
create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  duration text not null,
  price integer not null, -- dalam rupiah
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Branches (cabang)
create table branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  maps_url text,
  phone text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Testimonials
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  content text not null,
  rating integer default 5 check (rating between 1 and 5),
  active boolean default true,
  created_at timestamptz default now()
);

-- Bookings (pemesanan)
create table bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  service_id uuid references services(id),
  branch_id uuid references branches(id),
  booking_date date not null,
  booking_time time not null,
  notes text,
  status booking_status default 'pending',
  created_at timestamptz default now()
);

-- User roles (for admin/staff)
create table user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

-- Staff attendance (absensi - link to auth users)
create table staff_attendance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  staff_name text not null,
  branch_id uuid references branches(id),
  role text default 'Therapist',
  date date not null default current_date,
  checked_in boolean default false,
  check_in_time time,
  check_out_time time,
  customers_today integer default 0,
  target_daily integer default 5,
  unique (user_id, date)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table services enable row level security;
alter table branches enable row level security;
alter table testimonials enable row level security;
alter table bookings enable row level security;
alter table user_roles enable row level security;
alter table staff_attendance enable row level security;

-- Helper function: check role
create or replace function has_role(user_id uuid, check_role app_role)
returns boolean
language plpgsql security definer
as $$
begin
  return exists (
    select 1 from user_roles ur
    where ur.user_id = $1 and ur.role = $2
  );
end;
$$;

-- Services: public read, admin write
create policy "services_public_read" on services for select using (true);
create policy "services_admin_insert" on services for insert with check (has_role(auth.uid(), 'admin'));
create policy "services_admin_update" on services for update using (has_role(auth.uid(), 'admin'));
create policy "services_admin_delete" on services for delete using (has_role(auth.uid(), 'admin'));

-- Branches: public read, admin write
create policy "branches_public_read" on branches for select using (true);
create policy "branches_admin_insert" on branches for insert with check (has_role(auth.uid(), 'admin'));
create policy "branches_admin_update" on branches for update using (has_role(auth.uid(), 'admin'));
create policy "branches_admin_delete" on branches for delete using (has_role(auth.uid(), 'admin'));

-- Testimonials: public read, admin write
create policy "testimonials_public_read" on testimonials for select using (active = true);
create policy "testimonials_admin_all" on testimonials for all using (has_role(auth.uid(), 'admin'));

-- Bookings: public insert (booking tanpa login), admin read/update
create policy "bookings_public_insert" on bookings for insert with check (true);
create policy "bookings_admin_read" on bookings for select using (has_role(auth.uid(), 'admin'));
create policy "bookings_admin_update" on bookings for update using (has_role(auth.uid(), 'admin'));

-- User roles: admin only
create policy "user_roles_admin" on user_roles for all using (has_role(auth.uid(), 'admin'));

-- Staff attendance: staff can update own, admin can see all
create policy "attendance_staff_own" on staff_attendance
  for all using (user_id = auth.uid() or has_role(auth.uid(), 'admin'));

-- ============================================================
-- SEED DATA
-- ============================================================

insert into services (name, description, duration, price) values
  ('Pijat Aromaterapi', 'Pijat relaksasi dengan minyak esensial pilihan untuk menenangkan tubuh dan pikiran', '60/90 menit', 120000),
  ('Pijat Batu Panas', 'Terapi batu vulkanik panas yang merilekskan otot secara mendalam', '60/90 menit', 275000),
  ('Pijat Premium Wajah', 'Perawatan wajah intensif dengan teknik anti-aging dan bahan premium', '60/90 menit', 250000),
  ('Manikur & Pedikur', 'Perawatan kuku tangan dan kaki dengan produk berkualitas tinggi', '60/90 menit', 255000);

insert into branches (name, address, maps_url, phone) values
  ('KUY BM', 'Ruko Bekasi Mas, Jl. Ahmad Yani No.24 Blok B, Rt 004/Rw 003, Marga Jaya, Kec. Bekasi Selatan, Kota Bekasi, Jawa Barat 17141', 'https://maps.app.goo.gl/CCp2fQaASvTcHAxN6', null),
  ('KUY BETOS', 'Jl. Cut Mutia No.23 Blok G, Rt 003/Rw 009, Kel. Margahayu, Kec. Bekasi Timur, Kota Bekasi, Jawa Barat 17113', 'https://maps.app.goo.gl/vWqKNtksLgPRdye16', null),
  ('CRYSTAL KUY', 'Ruko Sentral Niaga Kalimalang Blok B1 No.16, Jl. Sentra Niaga Kalimalang No.15, RT.006/RW.011, Kayuringin Jaya, Kec. Bekasi Sel., Kota Bekasi, Jawa Barat 17144', 'https://maps.app.goo.gl/6qdwQh1TUGrAR78b6', null),
  ('KUY STORY', 'Ruko Commpark Kota Wisata Blok H No.29, Limus Nunggal, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820', 'https://maps.app.goo.gl/XdBAseGr5XdJ2SUt8', null),
  ('XI-KUY', 'Jalan Niaga Raya Jababeka 2 Ruko CBD, Blok D No.16-17, Desa Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530', 'https://maps.app.goo.gl/Zc4gi6dG19EUaR2J8', null),
  ('Strawberry Spa & Therapy', 'Ruko Kawasan Niaga Citra Grand Cibubur, Jl. Alternatif Cibubur No.26, RT.002/RW.008, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435', 'https://maps.app.goo.gl/5MpCHHkRdqGFbSpT7', null);

insert into testimonials (customer_name, content, rating) values
  ('Rina Wijaya', 'Pengalaman yang luar biasa! Staf sangat profesional dan ramah. Pijat aromaterapi terbaik yang pernah saya coba.', 5),
  ('Budi Hartono', 'Suasananya sangat mewah dan tenang. Hot stone massage benar-benar merilekskan otot saya yang kaku. Sangat direkomendasikan!', 5),
  ('Dewi Lestari', 'Pelayanan premium dengan harga yang reasonable. Facial treatment-nya luar biasa, kulit saya terasa jauh lebih cerah.', 5);
