export type AttendanceRecord = {
  staffId: string;
  name: string;
  role: string;
  branch: string;
  date: string;
  checkedIn: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  customersToday: number;
  targetDaily: number;
};

const KEY = "kuykuy_attendance";

function today() {
  return new Date().toISOString().split("T")[0];
}

const SEED: AttendanceRecord[] = [
  { staffId: "bm-1", name: "Rina Kusuma", role: "Therapist", branch: "KUY BM", date: today(), checkedIn: true, checkInTime: "08:10", checkOutTime: null, customersToday: 3, targetDaily: 5 },
  { staffId: "bm-2", name: "Dodi Pratama", role: "Therapist", branch: "KUY BM", date: today(), checkedIn: true, checkInTime: "08:30", checkOutTime: null, customersToday: 2, targetDaily: 5 },
  { staffId: "bm-3", name: "Heni Marlina", role: "Office Boy", branch: "KUY BM", date: today(), checkedIn: true, checkInTime: "07:55", checkOutTime: null, customersToday: 0, targetDaily: 0 },
  { staffId: "bt-1", name: "Sari Wulandari", role: "Senior Therapist", branch: "KUY BETOS", date: today(), checkedIn: true, checkInTime: "08:05", checkOutTime: null, customersToday: 4, targetDaily: 5 },
  { staffId: "bt-2", name: "Budi Haryono", role: "Therapist", branch: "KUY BETOS", date: today(), checkedIn: false, checkInTime: null, checkOutTime: null, customersToday: 0, targetDaily: 5 },
  { staffId: "bt-3", name: "Eko Prasetyo", role: "Therapist", branch: "KUY BETOS", date: today(), checkedIn: true, checkInTime: "08:20", checkOutTime: null, customersToday: 3, targetDaily: 5 },
  { staffId: "ck-1", name: "Lina Agustina", role: "Senior Therapist", branch: "CRYSTAL KUY", date: today(), checkedIn: true, checkInTime: "08:20", checkOutTime: null, customersToday: 5, targetDaily: 5 },
  { staffId: "ck-2", name: "Wahyu Santoso", role: "Therapist", branch: "CRYSTAL KUY", date: today(), checkedIn: true, checkInTime: "08:40", checkOutTime: null, customersToday: 2, targetDaily: 5 },
  { staffId: "ck-3", name: "Nita Permata", role: "Office Boy", branch: "CRYSTAL KUY", date: today(), checkedIn: false, checkInTime: null, checkOutTime: null, customersToday: 0, targetDaily: 0 },
  { staffId: "ks-1", name: "Maya Indah", role: "Therapist", branch: "KUY STORY", date: today(), checkedIn: true, checkInTime: "08:30", checkOutTime: null, customersToday: 2, targetDaily: 5 },
  { staffId: "ks-2", name: "Andi Wijaya", role: "Therapist", branch: "KUY STORY", date: today(), checkedIn: false, checkInTime: null, checkOutTime: null, customersToday: 0, targetDaily: 5 },
  { staffId: "ks-3", name: "Rini Susanti", role: "Therapist", branch: "KUY STORY", date: today(), checkedIn: true, checkInTime: "08:10", checkOutTime: null, customersToday: 4, targetDaily: 5 },
  { staffId: "xk-1", name: "Dewi Rahayu", role: "Senior Therapist", branch: "XI-KUY", date: today(), checkedIn: true, checkInTime: "08:00", checkOutTime: null, customersToday: 5, targetDaily: 5 },
  { staffId: "xk-2", name: "Rudi Hermawan", role: "Therapist", branch: "XI-KUY", date: today(), checkedIn: true, checkInTime: "08:15", checkOutTime: null, customersToday: 3, targetDaily: 5 },
  { staffId: "ss-1", name: "Fitri Handayani", role: "Therapist", branch: "Strawberry Spa & Therapy", date: today(), checkedIn: true, checkInTime: "08:45", checkOutTime: null, customersToday: 1, targetDaily: 5 },
  { staffId: "ss-2", name: "Budi Santoso", role: "Therapist", branch: "Strawberry Spa & Therapy", date: today(), checkedIn: false, checkInTime: null, checkOutTime: null, customersToday: 0, targetDaily: 5 },
];

export function getAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(SEED));
    return SEED;
  }
  try {
    const data: AttendanceRecord[] = JSON.parse(raw);
    if (!data.length || data[0].date !== today()) {
      const fresh = SEED.map(s => ({ ...s, date: today() }));
      localStorage.setItem(KEY, JSON.stringify(fresh));
      return fresh;
    }
    return data;
  } catch {
    localStorage.setItem(KEY, JSON.stringify(SEED));
    return SEED;
  }
}

export function updateAttendance(staffId: string, updates: Partial<AttendanceRecord>) {
  const data = getAttendance();
  const idx = data.findIndex(r => r.staffId === staffId);
  if (idx >= 0) {
    data[idx] = { ...data[idx], ...updates };
    localStorage.setItem(KEY, JSON.stringify(data));
  }
}

export function getMyRecord(staffId: string): AttendanceRecord | undefined {
  return getAttendance().find(r => r.staffId === staffId);
}
