import React, { useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const schedule = {
  Monday: [
    { time: '9:00 - 10:00', subject: 'Data Structures', room: 'A-101', teacher: 'Dr. Mehta' },
    { time: '10:00 - 11:00', subject: 'DBMS', room: 'B-203', teacher: 'Prof. Sharma' },
    { time: '11:00 - 12:00', subject: 'Mathematics', room: 'C-105', teacher: 'Prof. Nair' },
    { time: '2:00 - 4:00', subject: 'OS Lab', room: 'Lab-3', teacher: 'Dr. Iyer' },
  ],
  Tuesday: [
    { time: '9:00 - 10:00', subject: 'Computer Networks', room: 'A-102', teacher: 'Dr. Rao' },
    { time: '10:00 - 11:00', subject: 'Data Structures', room: 'A-101', teacher: 'Dr. Mehta' },
    { time: '2:00 - 3:00', subject: 'Software Engineering', room: 'B-201', teacher: 'Prof. Das' },
  ],
  Wednesday: [
    { time: '9:00 - 10:00', subject: 'Mathematics', room: 'C-105', teacher: 'Prof. Nair' },
    { time: '11:00 - 12:00', subject: 'DBMS', room: 'B-203', teacher: 'Prof. Sharma' },
    { time: '2:00 - 4:00', subject: 'DS Lab', room: 'Lab-1', teacher: 'Dr. Mehta' },
  ],
  Thursday: [
    { time: '9:00 - 10:00', subject: 'OS', room: 'A-103', teacher: 'Dr. Iyer' },
    { time: '10:00 - 11:00', subject: 'Computer Networks', room: 'A-102', teacher: 'Dr. Rao' },
    { time: '11:00 - 12:00', subject: 'Software Engineering', room: 'B-201', teacher: 'Prof. Das' },
  ],
  Friday: [
    { time: '9:00 - 10:00', subject: 'Data Structures', room: 'A-101', teacher: 'Dr. Mehta' },
    { time: '10:00 - 11:00', subject: 'OS', room: 'A-103', teacher: 'Dr. Iyer' },
    { time: '2:00 - 4:00', subject: 'Networks Lab', room: 'Lab-2', teacher: 'Dr. Rao' },
  ],
};

const colors = ['bg-blue-50 border-blue-200', 'bg-purple-50 border-purple-200', 'bg-green-50 border-green-200', 'bg-yellow-50 border-yellow-200'];

const StudentSchedule = () => {
  const todayIndex = new Date().getDay();
  const defaultDay = todayIndex >= 1 && todayIndex <= 5 ? days[todayIndex - 1] : 'Monday';
  const [activeDay, setActiveDay] = useState(defaultDay);
  const [search, setSearch] = useState('');

  const filtered = schedule[activeDay].filter(c =>
    c.subject.toLowerCase().includes(search.toLowerCase()) ||
    c.room.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
        <p className="text-gray-500 text-sm mt-1">Batch: CSE-B &nbsp;|&nbsp; Semester: 4th</p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search subject, room or teacher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeDay === day
                ? 'bg-green-600 text-white shadow'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Class cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p>No classes found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cls, i) => (
            <div key={i} className={`border rounded-xl p-4 ${colors[i % colors.length]}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{cls.subject}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{cls.teacher}</p>
                </div>
                <span className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium">
                  {cls.time}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-lg font-medium">
                  📍 {cls.room}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSchedule;