import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types based on schema
export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  price_idr: number;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
  active: boolean;
};

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  map_url: string | null;
  embed_url: string | null;
  sort_order: number;
  active: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number;
  sort_order: number;
  active: boolean;
};

export type Attendance = {
  id: string;
  staff_id: string;
  name: string;
  role: string;
  branch: string;
  date: string;
  checked_in: boolean;
  check_in_time: string | null;
  check_out_time: string | null;
  customers_today: number;
  target_daily: number;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  service_id: string | null;
  branch_id: string | null;
  scheduled_at: string;
  notes: string | null;
  status: "pending" | "confirmed" | "done" | "cancelled";
  created_at: string;
  // joined
  services?: Pick<Service, "name" | "price_idr">;
  branches?: Pick<Branch, "name">;
};
