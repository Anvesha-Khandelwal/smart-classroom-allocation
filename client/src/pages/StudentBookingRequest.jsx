import React, { useState } from 'react';

const rooms = [
  { id: 1, name: 'A-101', capacity: 60, type: 'Classroom' },
  { id: 2, name: 'B-203', capacity: 40, type: 'Classroom' },
  { id: 3, name: 'C-105', capacity: 80, type: 'Lecture Hall' },
  { id: 4, name: 'Lab-1', capacity: 30, type: 'Lab' },
  { id: 5, name: 'Lab-3', capacity: 30, type: 'Lab' },
  { id: 6, name: 'Seminar Hall', capacity: 100, type: 'Seminar' },
];

const StudentBookingRequest = () => {
  const [form, setForm] = useState({
    purpose: '',
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
    preferredRoom: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = () => {
    if (!form.purpose || !form.date || !form.startTime || !form.endTime || !form.attendees) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.startTime >= form.endTime) {
      setError('End time must be after start time.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
          <p className="text-gray-500 text-sm mb-1">Your booking request has been sent for approval.</p>
          <p className="text-gray-400 text-xs mb-6">Faculty requests are prioritized. You'll be notified once approved.</p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
            <p><span className="text-gray-400">Purpose:</span> <span className="font-medium text-gray-700">{form.purpose}</span></p>
            <p><span className="text-gray-400">Date:</span> <span className="font-medium text-gray-700">{form.date}</span></p>
            <p><span className="text-gray-400">Time:</span> <span className="font-medium text-gray-700">{form.startTime} – {form.endTime}</span></p>
            <p><span className="text-gray-400">Attendees:</span> <span className="font-medium text-gray-700">{form.attendees}</span></p>
            {form.preferredRoom && <p><span className="text-gray-400">Preferred room:</span> <span className="font-medium text-gray-700">{form.preferredRoom}</span></p>}
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm({ purpose: '', date: '', startTime: '', endTime: '', attendees: '', preferredRoom: '', notes: '' }); }}
            className="w-full bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Request a Room</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details — the system will auto-assign the best available room.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose <span className="text-red-400">*</span></label>
          <input
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="e.g. Group study, Project discussion"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-400">*</span></label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time <span className="text-red-400">*</span></label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time <span className="text-red-400">*</span></label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Attendees */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attendees <span className="text-red-400">*</span></label>
          <input
            type="number"
            name="attendees"
            value={form.attendees}
            onChange={handleChange}
            placeholder="e.g. 25"
            min="1"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Preferred room */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Room <span className="text-gray-400 font-normal">(optional)</span></label>
          <select
            name="preferredRoom"
            value={form.preferredRoom}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          >
            <option value="">System will auto-assign best room</option>
            {rooms.map(r => (
              <option key={r.id} value={r.name}>{r.name} — {r.type} (cap. {r.capacity})</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">The greedy allocator will pick the smallest suitable room if you don't choose one.</p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any special requirements..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition text-sm"
        >
          Submit Booking Request
        </button>
      </div>
    </div>
  );
};

export default StudentBookingRequest;