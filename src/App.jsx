import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Auth from '../pages/Auth.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import WorkerDashboard from '../pages/WorkerDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';

export default function App() {
  // Token aur UserRole read kar rahe hain taake components me crash na ho
  const token = localStorage.getItem('token') || '';
  const userRole = localStorage.getItem('role') ? localStorage.getItem('role').toLowerCase() : '';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Worker Route */}
        <Route 
          path="/worker" 
          element={
            token && userRole === 'worker' ? (
              <WorkerDashboard token={token} />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />

        {/* Admin Route */}
        <Route 
          path="/admin" 
          element={
            token && userRole === 'admin' ? (
              <AdminDashboard token={token} />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}