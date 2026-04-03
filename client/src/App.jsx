import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentDashboard from './pages/StudentDashboard';
import StudentSchedule from './pages/StudentSchedule';
import StudentBookingRequest from './pages/StudentBookingRequest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/schedule" element={<StudentSchedule />} />
          <Route path="/booking-request" element={<StudentBookingRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;