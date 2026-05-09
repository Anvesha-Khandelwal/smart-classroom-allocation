// import { useState } from "react";
import { BarChart3, TrendingUp, Building2, Users, PieChart } from "lucide-react";
import TeacherLayout from "../components/TeacherLayout";
import { BRANCH_DATA, COLOR_MAP, today } from "../data/dsceData";
import { bookingStore } from "./TeacherBookings";
import { useState, useEffect } from "react";

// function MiniBar({ label, value, max, color, sub }) {
//   const pct = max > 0 ? Math.round((value / max) * 100) : 0;
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-1.5">
//         <span className="text-sm font-medium text-slate-700">{label}</span>
//         <div className="flex items-center gap-2">
//           {sub && <span className="text-xs text-slate-400">{sub}</span>}
//           <span className="text-xs font-bold text-slate-600">{pct}%</span>
//         </div>
//       </div>
//       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//         <div className={`h-full rounded-full transition-all duration-700 ${color}`}
//           style={{ width: `${Math.max(pct,1)}%` }} />
//       </div>
//     </div>
//   );
// }

function StatTile({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={16} className="text-white" />
      </div>
      <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function TeacherAnalyticsPage() {
  const [bookings, setBookings] = useState(() => bookingStore.get());

useEffect(() => {
  const unsub = bookingStore.subscribe(() => setBookings(bookingStore.get()));
  return unsub;
}, []);
// const [view, setView] = useState("branch");// branch | time | priority

  const totalRooms     = Object.values(BRANCH_DATA).reduce((s,b) => s+b.rooms.length, 0);
  const totalCapacity  = Object.values(BRANCH_DATA).reduce((s,b) => s+b.rooms.reduce((r,rm)=>r+rm.capacity,0),0);
  const todayCount     = bookings.filter(b=>b.date===today).length;
  const facultyCount   = bookings.filter(b=>b.priority===0).length;
  const studentCount   = bookings.filter(b=>b.priority===1).length;

  // Bookings per branch
  const branchStats = Object.entries(BRANCH_DATA).map(([key,val]) => ({
    key, label: key,
    fullLabel: val.label,
    count: bookings.filter(b=>b.branch===key).length,
    rooms: val.rooms.length,
    color: COLOR_MAP[val.color].dot,
    badge: COLOR_MAP[val.color].badge,
    bg:    COLOR_MAP[val.color].bg,
    text:  COLOR_MAP[val.color].text,
  })).sort((a,b) => b.count - a.count);

  const maxBranchCount = Math.max(...branchStats.map(b=>b.count), 1);

  // Bookings per hour slot
  const timeStats = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"].map(slot => ({
    slot, count: bookings.filter(b=>b.start===slot).length
  }));
  const maxTime = Math.max(...timeStats.map(t=>t.count), 1);

  // Building stats
  const buildingStats = Object.entries(
    Object.entries(BRANCH_DATA).reduce((acc,[key,val]) => {
      const bldg = val.building;
      if (!acc[bldg]) acc[bldg] = { rooms:0, booked:0, color:val.color, short:val.short };
      acc[bldg].rooms += val.rooms.length;
      acc[bldg].booked += bookings.filter(b=>b.branch===key).length;
      return acc;
    }, {})
  );

  return (
    <TeacherLayout>
      <div className="p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Room utilisation and booking insights across DSCE</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatTile icon={BarChart3}   label="Total Bookings"  value={bookings.length}  color="bg-indigo-600"  sub="all time" />
          <StatTile icon={Building2}   label="Today's Bookings" value={todayCount}       color="bg-slate-700"  />
          <StatTile icon={Users}       label="Faculty Bookings" value={facultyCount}     color="bg-slate-800"  sub={`${studentCount} student`} />
          <StatTile icon={TrendingUp}  label="Rooms Available"  value={totalRooms}       color="bg-emerald-600" sub={`${totalCapacity} seats total`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Priority split */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <PieChart size={16} className="text-slate-500" />
              <h2 className="font-bold text-slate-800">Priority Split</h2>
            </div>
            {bookings.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-slate-300 text-sm">No bookings yet</div>
            ) : (
              <>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">{facultyCount}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Faculty</p>
                  </div>
                  <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{studentCount}</p>
                    <p className="text-xs text-amber-500 mt-0.5">Student</p>
                  </div>
                </div>
                {/* Combined bar */}
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-slate-800 h-full transition-all duration-700"
                    style={{width:`${bookings.length?Math.round(facultyCount/bookings.length*100):0}%`}} />
                  <div className="bg-amber-400 h-full flex-1 transition-all duration-700" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-slate-800"/><span className="text-xs text-slate-400">Faculty {bookings.length?Math.round(facultyCount/bookings.length*100):0}%</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-400"/><span className="text-xs text-slate-400">Student {bookings.length?Math.round(studentCount/bookings.length*100):0}%</span></div>
                </div>
              </>
            )}
          </div>

          {/* Hourly demand */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} className="text-slate-500" />
              <h2 className="font-bold text-slate-800">Peak Hours</h2>
            </div>
            <div className="space-y-2.5">
              {timeStats.map(({ slot, count }) => (
                <div key={slot} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-12">{slot}</span>
                  <div className="flex-1 h-6 bg-slate-50 rounded-lg overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-lg transition-all duration-700 flex items-center"
                      style={{ width: `${count>0?Math.max((count/maxTime)*100,4):0}%` }}>
                      {count>0 && <span className="text-[10px] font-bold text-white px-2">{count}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch utilisation */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-slate-500" />
              <h2 className="font-bold text-slate-800">Bookings by Department</h2>
            </div>
            <span className="text-xs text-slate-400">{bookings.length} total</span>
          </div>
          <div className="space-y-4">
            {branchStats.map(({ key, label, fullLabel, count, rooms, color, badge }) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-28 flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${badge}`}>{label}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 truncate">{fullLabel}</span>
                    <span className="text-xs font-semibold text-slate-600 ml-2">{count} booking{count!==1?"s":""}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${color}`}
                      style={{ width: `${count>0?Math.max((count/maxBranchCount)*100,2):0}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Building utilisation */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-slate-500" />
            <h2 className="font-bold text-slate-800">Building Utilisation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildingStats.map(([bldg, stat]) => {
              const pct = Math.min(100, Math.round((stat.booked / (stat.rooms * 9)) * 100));
              const c   = COLOR_MAP[stat.color];
              return (
                <div key={bldg} className={`rounded-xl border p-4 ${c.bg} ${c.border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${c.badge}`}>{stat.short}</span>
                    <span className={`text-sm font-bold ${c.text}`}>{pct}%</span>
                  </div>
                  <p className={`text-xs mb-3 ${c.text} opacity-70 truncate`}>{bldg}</p>
                  <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.dot}`} style={{width:`${Math.max(pct,1)}%`}} />
                  </div>
                  <p className={`text-xs mt-2 ${c.text} opacity-60`}>{stat.rooms} rooms · {stat.booked} bookings</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </TeacherLayout>
  );
}