import { useState, useEffect } from "react";
import {
  CalendarDays, Users, Building2, Plus, Undo2,
  AlertTriangle, CheckCircle2, ChevronDown, BarChart3,
  Trash2, BookOpen, TrendingUp, X, Loader2
} from "lucide-react";

// ─── DSCE Branch → Building → Rooms mapping ──────────────────
const BRANCH_DATA = {
  "CSE": {
    label: "Computer Science & Engineering",
    building: "Building 19 (NB Block)",
    buildingShort: "NB",
    color: "indigo",
    rooms: [
      { id: "nb-101", name: "NB-101", capacity: 60, floor: 1 },
      { id: "nb-102", name: "NB-102", capacity: 60, floor: 1 },
      { id: "nb-103", name: "NB-103", capacity: 40, floor: 1 },
      { id: "nb-201", name: "NB-201", capacity: 60, floor: 2 },
      { id: "nb-202", name: "NB-202", capacity: 60, floor: 2 },
      { id: "nb-203", name: "NB-203", capacity: 40, floor: 2 },
      { id: "nb-301", name: "NB-301", capacity: 80, floor: 3 },
      { id: "nb-302", name: "NB-302", capacity: 60, floor: 3 },
    ],
  },
  "ISE": {
    label: "Information Science & Engineering",
    building: "Building 19 (NB Block)",
    buildingShort: "NB",
    color: "blue",
    rooms: [
      { id: "nb-104", name: "NB-104", capacity: 60, floor: 1 },
      { id: "nb-204", name: "NB-204", capacity: 60, floor: 2 },
      { id: "nb-304", name: "NB-304", capacity: 40, floor: 3 },
    ],
  },
  "AIML": {
    label: "AI & Machine Learning",
    building: "Building 19 (NB Block)",
    buildingShort: "NB",
    color: "violet",
    rooms: [
      { id: "nb-105", name: "NB-105", capacity: 60, floor: 1 },
      { id: "nb-205", name: "NB-205", capacity: 60, floor: 2 },
      { id: "nb-305", name: "NB-305", capacity: 40, floor: 3 },
    ],
  },
  "MATHS_DS": {
    label: "Mathematics & Data Science",
    building: "Building 4",
    buildingShort: "B4",
    color: "emerald",
    rooms: [
      { id: "b4-101", name: "B4-101", capacity: 60, floor: 1 },
      { id: "b4-102", name: "B4-102", capacity: 60, floor: 1 },
      { id: "b4-201", name: "B4-201", capacity: 80, floor: 2 },
      { id: "b4-202", name: "B4-202", capacity: 40, floor: 2 },
      { id: "b4-301", name: "B4-301", capacity: 60, floor: 3 },
    ],
  },
  "EEE": {
    label: "Electrical & Electronics Engineering",
    building: "Building 17",
    buildingShort: "B17",
    color: "yellow",
    rooms: [
      { id: "b17-101", name: "B17-101", capacity: 60, floor: 1 },
      { id: "b17-102", name: "B17-102", capacity: 60, floor: 1 },
      { id: "b17-201", name: "B17-201", capacity: 80, floor: 2 },
      { id: "b17-202", name: "B17-202", capacity: 40, floor: 2 },
    ],
  },
  "ECE": {
    label: "Electronics & Communication Engineering",
    building: "Building 15",
    buildingShort: "B15",
    color: "orange",
    rooms: [
      { id: "b15-101", name: "B15-101", capacity: 60, floor: 1 },
      { id: "b15-102", name: "B15-102", capacity: 60, floor: 1 },
      { id: "b15-201", name: "B15-201", capacity: 80, floor: 2 },
      { id: "b15-202", name: "B15-202", capacity: 40, floor: 2 },
    ],
  },
  "ME": {
    label: "Mechanical Engineering",
    building: "Building 6",
    buildingShort: "B6",
    color: "red",
    rooms: [
      { id: "b6-101", name: "B6-101", capacity: 60, floor: 1 },
      { id: "b6-102", name: "B6-102", capacity: 60, floor: 1 },
      { id: "b6-201", name: "B6-201", capacity: 80, floor: 2 },
      { id: "b6-202", name: "B6-202", capacity: 40, floor: 2 },
    ],
  },
  "CIVIL": {
    label: "Civil Engineering",
    building: "Building 8",
    buildingShort: "B8",
    color: "stone",
    rooms: [
      { id: "b8-101", name: "B8-101", capacity: 60, floor: 1 },
      { id: "b8-102", name: "B8-102", capacity: 60, floor: 1 },
      { id: "b8-201", name: "B8-201", capacity: 80, floor: 2 },
    ],
  },
  "AERO": {
    label: "Aeronautical Engineering",
    building: "Building 11",
    buildingShort: "B11",
    color: "sky",
    rooms: [
      { id: "b11-101", name: "B11-101", capacity: 60, floor: 1 },
      { id: "b11-201", name: "B11-201", capacity: 60, floor: 2 },
      { id: "b11-202", name: "B11-202", capacity: 40, floor: 2 },
    ],
  },
  "CHEM": {
    label: "Chemical Engineering",
    building: "Building 9",
    buildingShort: "B9",
    color: "teal",
    rooms: [
      { id: "b9-101", name: "B9-101", capacity: 60, floor: 1 },
      { id: "b9-201", name: "B9-201", capacity: 60, floor: 2 },
    ],
  },
};

const BRANCH_COLORS = {
  indigo:  { bg: "bg-indigo-100",  text: "text-indigo-700",  btn: "bg-indigo-600 hover:bg-indigo-700",  ring: "focus:ring-indigo-200", badge: "bg-indigo-100 text-indigo-700" },
  blue:    { bg: "bg-blue-100",    text: "text-blue-700",    btn: "bg-blue-600 hover:bg-blue-700",      ring: "focus:ring-blue-200",   badge: "bg-blue-100 text-blue-700" },
  violet:  { bg: "bg-violet-100",  text: "text-violet-700",  btn: "bg-violet-600 hover:bg-violet-700",  ring: "focus:ring-violet-200", badge: "bg-violet-100 text-violet-700" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700",ring: "focus:ring-emerald-200",badge: "bg-emerald-100 text-emerald-700" },
  yellow:  { bg: "bg-yellow-100",  text: "text-yellow-700",  btn: "bg-yellow-500 hover:bg-yellow-600",  ring: "focus:ring-yellow-200", badge: "bg-yellow-100 text-yellow-700" },
  orange:  { bg: "bg-orange-100",  text: "text-orange-700",  btn: "bg-orange-500 hover:bg-orange-600",  ring: "focus:ring-orange-200", badge: "bg-orange-100 text-orange-700" },
  red:     { bg: "bg-red-100",     text: "text-red-700",     btn: "bg-red-500 hover:bg-red-600",        ring: "focus:ring-red-200",    badge: "bg-red-100 text-red-700" },
  stone:   { bg: "bg-stone-100",   text: "text-stone-700",   btn: "bg-stone-500 hover:bg-stone-600",    ring: "focus:ring-stone-200",  badge: "bg-stone-100 text-stone-700" },
  sky:     { bg: "bg-sky-100",     text: "text-sky-700",     btn: "bg-sky-500 hover:bg-sky-600",        ring: "focus:ring-sky-200",    badge: "bg-sky-100 text-sky-700" },
  teal:    { bg: "bg-teal-100",    text: "text-teal-700",    btn: "bg-teal-500 hover:bg-teal-600",      ring: "focus:ring-teal-200",   badge: "bg-teal-100 text-teal-700" },
};

const TIME_SLOTS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
const today = new Date().toISOString().split("T")[0];

// ─── Toast ────────────────────────────────────────────────────
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [toast, onClose]);
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border max-w-sm
      ${isError ? "bg-red-50 border-red-200 text-red-800" : "bg-emerald-50 border-emerald-200 text-emerald-800"}`}>
      {isError ? <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
               : <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />}
      <div className="flex-1">
        <p className="font-semibold text-sm">{toast.title}</p>
        <p className="text-xs mt-0.5 opacity-80">{toast.message}</p>
      </div>
      <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-4 shadow-sm">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{value}</p>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Booking Form ─────────────────────────────────────────────
function BookingForm({ onBook, bookings }) {
  const [selectedBranch, setSelectedBranch] = useState("CSE");
  const [form, setForm] = useState({
    subject: "", batch: "", roomId: "", date: today,
    start: "09:00", end: "10:00", capacity: "", priority: 0,
  });
  const [loading, setLoading] = useState(false);

  const branch = BRANCH_DATA[selectedBranch];
  const color  = BRANCH_COLORS[branch.color];
  const set    = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.batch || !form.capacity) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    onBook({ ...form, branch: selectedBranch, buildingShort: branch.buildingShort });
    setForm({ subject: "", batch: "", roomId: "", date: today, start: "09:00", end: "10:00", capacity: "", priority: 0 });
    setLoading(false);
  };

  const inputCls = `w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white
    focus:outline-none focus:ring-2 ${color.ring} focus:border-indigo-400 transition`;
  const labelCls = "block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color.btn.split(" ")[0]}`}>
          <Plus size={16} className="text-white" />
        </div>
        <h2 className="text-base font-bold text-slate-800">New Booking</h2>
      </div>

      {/* Branch selector */}
      <div className="mb-4">
        <label className={labelCls}>Select Your Department</label>
        <div className="relative">
          <select className={`${inputCls} appearance-none pr-8 font-medium`}
            value={selectedBranch}
            onChange={(e) => { setSelectedBranch(e.target.value); set("roomId", ""); }}>
            {Object.entries(BRANCH_DATA).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
        </div>
        {/* Building badge */}
        <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${color.bg} ${color.text}`}>
          <Building2 size={12} />
          Allocated Building: {branch.building}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Subject / Purpose</label>
          <input className={inputCls} placeholder="e.g. Data Structures Lecture"
            value={form.subject} onChange={(e) => set("subject", e.target.value)} required />
        </div>

        <div>
          <label className={labelCls}>Batch / Section</label>
          <input className={inputCls} placeholder="e.g. CS-3A"
            value={form.batch} onChange={(e) => set("batch", e.target.value)} required />
        </div>

        <div>
          <label className={labelCls}>No. of Students</label>
          <input className={inputCls} type="number" placeholder="Count" min="1"
            value={form.capacity} onChange={(e) => set("capacity", e.target.value)} required />
        </div>

        {/* Room selector — only shows rooms from selected branch's building */}
        <div className="col-span-2">
          <label className={labelCls}>
            Room in {branch.buildingShort}
            <span className="normal-case font-normal text-slate-400 ml-1">(auto-assigns best fit if blank)</span>
          </label>
          <div className="relative">
            <select className={`${inputCls} appearance-none pr-8`}
              value={form.roomId} onChange={(e) => set("roomId", e.target.value)}>
              <option value="">Auto — Greedy Best-Fit</option>
              {branch.rooms.map((r) => {
                const booked = bookings.some(
                  (b) => b.roomId === r.id && b.date === form.date &&
                    b.start < form.end && form.start < b.end
                );
                return (
                  <option key={r.id} value={r.id} disabled={booked}>
                    {r.name} — Floor {r.floor} — {r.capacity} seats {booked ? "(Booked)" : ""}
                  </option>
                );
              })}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Date</label>
          <input className={inputCls} type="date"
            value={form.date} onChange={(e) => set("date", e.target.value)} required />
        </div>

        <div>
          <label className={labelCls}>Time Slot</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select className={`${inputCls} appearance-none pr-6`}
                value={form.start} onChange={(e) => set("start", e.target.value)}>
                {TIME_SLOTS.slice(0, -1).map((t) => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-3.5 text-slate-400 pointer-events-none" />
            </div>
            <span className="text-slate-400 text-sm">to</span>
            <div className="relative flex-1">
              <select className={`${inputCls} appearance-none pr-6`}
                value={form.end} onChange={(e) => set("end", e.target.value)}>
                {TIME_SLOTS.slice(1).map((t) => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <label className={labelCls}>Booking Priority</label>
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            <button type="button" onClick={() => set("priority", 0)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2
                ${form.priority === 0 ? `${color.btn.split(" ")[0]} text-white` : "bg-white text-slate-500 hover:bg-slate-50"}`}>
              <BookOpen size={14} /> Faculty
            </button>
            <button type="button" onClick={() => set("priority", 1)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2
                ${form.priority === 1 ? "bg-amber-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
              <Users size={14} /> Student
            </button>
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className={`mt-5 w-full py-2.5 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60 ${color.btn}`}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Allocating Room…</> : <><Plus size={15} /> Book Room in {branch.buildingShort}</>}
      </button>
    </form>
  );
}

// ─── Active Bookings List ─────────────────────────────────────
function BookingsList({ bookings, onUndo, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
            <CalendarDays size={15} className="text-white" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Active Bookings</h2>
        </div>
        <button onClick={onUndo}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition">
          <Undo2 size={13} /> Undo Last
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-slate-400">
          <CalendarDays size={32} className="mb-2 opacity-30" />
          <p className="text-sm">No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
          {bookings.map((b, i) => {
            const branchInfo  = BRANCH_DATA[b.branch];
            const color       = branchInfo ? BRANCH_COLORS[branchInfo.color] : BRANCH_COLORS.indigo;
            return (
              <div key={b.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition group
                  ${i === bookings.length - 1 ? "border-indigo-200 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200 bg-slate-50/50"}`}>
                <div className="text-center min-w-[52px]">
                  <p className="text-xs font-bold text-slate-700">{b.start}</p>
                  <div className="w-px h-3 bg-slate-300 mx-auto my-0.5" />
                  <p className="text-xs text-slate-400">{b.end}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 truncate">{b.subject}</p>
                    {branchInfo && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color.badge}`}>
                        {b.branch}
                      </span>
                    )}
                    {i === bookings.length - 1 && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-600 text-white font-medium">Latest</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Building2 size={11} />{b.room}</span>
                    <span className="flex items-center gap-1 text-slate-400">{branchInfo?.building}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{b.batch}</span>
                  </div>
                </div>
                <button onClick={() => onDelete(b.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition">
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Building Summary ─────────────────────────────────────────
function BuildingSummary({ bookings }) {
  const buildingStats = Object.entries(BRANCH_DATA).reduce((acc, [key, val]) => {
    const bldg = val.building;
    if (!acc[bldg]) acc[bldg] = { total: val.rooms.length, booked: 0, branch: key, color: val.color, short: val.buildingShort };
    acc[bldg].booked += bookings.filter((b) => b.branch === key).length;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
          <TrendingUp size={15} className="text-white" />
        </div>
        <h2 className="text-base font-bold text-slate-800">Building Utilisation</h2>
      </div>
      <div className="space-y-3">
        {Object.entries(buildingStats).map(([bldg, stat]) => {
          const pct   = Math.min(100, Math.round((stat.booked / (stat.total * 9)) * 100));
          const color = BRANCH_COLORS[stat.color];
          return (
            <div key={bldg}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md mr-2 ${color.bg} ${color.text}`}>{stat.short}</span>
                  <span className="text-sm text-slate-600">{bldg}</span>
                </div>
                <span className="text-xs font-bold text-slate-500">{pct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${pct > 70 ? "bg-red-400" : pct > 40 ? "bg-amber-400" : "bg-emerald-400"}`}
                  style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Room Grid ────────────────────────────────────────────────
function RoomGrid({ bookings, selectedDate }) {
  const [filterBranch, setFilterBranch] = useState("CSE");
  const branch = BRANCH_DATA[filterBranch];
  const color  = BRANCH_COLORS[branch.color];

  const getBooking = (roomId, slot) =>
    bookings.find((b) => b.roomId === roomId && b.date === selectedDate && b.start <= slot && slot < b.end);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <BarChart3 size={15} className="text-white" />
        </div>
        <h2 className="text-base font-bold text-slate-800">Room Availability Grid</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border appearance-none pr-7 focus:outline-none focus:ring-2 ${color.bg} ${color.text} border-transparent ${color.ring}`}>
              {Object.entries(BRANCH_DATA).map(([k, v]) => (
                <option key={k} value={k}>{k} — {v.buildingShort}</option>
              ))}
            </select>
            <ChevronDown size={11} className={`absolute right-2 top-2 pointer-events-none ${color.text}`} />
          </div>
          <span className="text-xs text-slate-400">{selectedDate}</span>
        </div>
      </div>

      <p className={`text-xs font-semibold mb-3 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 ${color.bg} ${color.text}`}>
        <Building2 size={11} /> {branch.building}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 text-slate-500 font-semibold w-20">Room</th>
              {TIME_SLOTS.slice(0, -1).map((slot) => (
                <th key={slot} className="text-center py-2 px-0.5 text-slate-400 font-medium min-w-[60px]">{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {branch.rooms.map((room) => (
              <tr key={room.id} className="border-t border-slate-50">
                <td className="py-2 pr-3">
                  <p className="font-bold text-slate-700">{room.name}</p>
                  <p className="text-slate-400">F{room.floor} · {room.capacity}🪑</p>
                </td>
                {TIME_SLOTS.slice(0, -1).map((slot) => {
                  const booking = getBooking(room.id, slot);
                  return (
                    <td key={slot} className="px-0.5 py-1">
                      {booking ? (
                        <div className={`rounded-lg px-1 py-1.5 text-center leading-tight ${color.bg} ${color.text}`}>
                          <p className="font-semibold truncate max-w-[56px]">{booking.subject}</p>
                          <p className="opacity-70">{booking.batch}</p>
                        </div>
                      ) : (
                        <div className="rounded-lg bg-emerald-50 border border-emerald-100 text-center py-1.5">
                          <span className="text-emerald-500 font-medium">Free</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-200" /><span className="text-xs text-slate-500">Available</span></div>
        <div className="flex items-center gap-1.5"><div className={`w-3 h-3 rounded-sm ${color.bg}`} /><span className="text-xs text-slate-500">Booked</span></div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────
export default function TeacherDashboard() {
  const [bookings,     setBookings]     = useState([]);
  const [toast,        setToast]        = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);

  const showToast = (type, title, message) => setToast({ type, title, message });

  const handleBook = (form) => {
    const branch = BRANCH_DATA[form.branch];

    // Conflict check within same building rooms
    const conflict = bookings.find(
      (b) => b.roomId === form.roomId && b.roomId !== "" &&
             b.date === form.date && b.start < form.end && form.start < b.end
    );
    if (conflict) {
      showToast("error", "Booking Conflict Detected",
        `${conflict.room} is already booked from ${conflict.start}–${conflict.end}.`);
      return;
    }

    // Greedy best-fit from branch's rooms only
    let assignedRoom = branch.rooms.find((r) => r.id === form.roomId);
    if (!assignedRoom) {
      const needed   = parseInt(form.capacity, 10);
      const sorted   = [...branch.rooms].sort((a, b) => a.capacity - b.capacity);
      const available = sorted.filter((r) =>
        !bookings.some((b) => b.roomId === r.id && b.date === form.date && b.start < form.end && form.start < b.end)
      );
      assignedRoom = available.find((r) => r.capacity >= needed);
    }

    if (!assignedRoom) {
      showToast("error", "No Room Available in " + branch.buildingShort,
        `All rooms in ${branch.building} are either booked or too small for ${form.capacity} students.`);
      return;
    }

    const newBooking = {
      id:       `b${Date.now()}`,
      room:     assignedRoom.name,
      roomId:   assignedRoom.id,
      subject:  form.subject,
      batch:    form.batch,
      start:    form.start,
      end:      form.end,
      date:     form.date,
      priority: form.priority,
      capacity: parseInt(form.capacity, 10),
      branch:   form.branch,
      building: branch.building,
    };

    setBookings((prev) => [...prev, newBooking]);
    showToast("success", `Room Allocated — ${branch.buildingShort}`,
      `${assignedRoom.name} (${assignedRoom.capacity} seats) assigned for ${form.subject} · ${form.start}–${form.end}`);
  };

  const handleUndo = () => {
    if (bookings.length === 0) { showToast("error", "Nothing to Undo", "Booking history is empty."); return; }
    const last = bookings[bookings.length - 1];
    setBookings((prev) => prev.slice(0, -1));
    showToast("success", "Booking Undone", `Removed: ${last.subject} in ${last.room}`);
  };

  const handleDelete = (id) => {
    const b = bookings.find((x) => x.id === id);
    setBookings((prev) => prev.filter((x) => x.id !== id));
    showToast("success", "Booking Cancelled", `${b?.subject} in ${b?.room} removed.`);
  };

  const totalRooms = Object.values(BRANCH_DATA).reduce((s, b) => s + b.rooms.length, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Teacher Dashboard</h1>
            <p className="text-sm text-slate-400 mt-0.5">DSCE — Smart Classroom Allocation</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="date" value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">T</div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-8 py-7 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Building2}    label="Total Rooms"     value={totalRooms}         color="bg-indigo-500" />
          <StatCard icon={CalendarDays} label="Today's Bookings" value={bookings.filter(b => b.date === today).length} color="bg-slate-700" />
          <StatCard icon={Users}        label="Departments"     value={Object.keys(BRANCH_DATA).length} color="bg-amber-500" sub="across campus" />
          <StatCard icon={TrendingUp}   label="Buildings Active" value={[...new Set(Object.values(BRANCH_DATA).map(b => b.building))].length} color="bg-emerald-500" />
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <BookingForm onBook={handleBook} bookings={bookings} />
          </div>
          <div className="lg:col-span-3">
            <BookingsList bookings={bookings} onUndo={handleUndo} onDelete={handleDelete} />
          </div>
        </div>

        {/* Bottom layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BuildingSummary bookings={bookings} />
          </div>
          <div className="lg:col-span-2">
            <RoomGrid bookings={bookings} selectedDate={selectedDate} />
          </div>
        </div>

      </main>
    </div>
  );
}