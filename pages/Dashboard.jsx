import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut } from 'lucide-react';
import UserDashboard from './UserDashboard';
import WorkerDashboard from './WorkerDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!token || !storedUser) {
        navigate('/auth');
        return;
      }
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-xs">
        Loading workspace...
      </div>
    );
  }

  if (!user) return null;

  const role = user.role ? user.role.toLowerCase() : '';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Global Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-800">{user.name || 'User'}</h1>
            <span className="text-xs text-slate-500 capitalize">{user.role || 'Portal'}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3.5 py-1.5 rounded-lg text-xs font-medium transition border border-slate-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </header>

      {/* Dynamic Role-Based View Router */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8 space-y-4">
        {role === 'user' && <UserDashboard token={token} />}
        {role === 'worker' && <WorkerDashboard token={token} />}
        {role === 'admin' && <AdminDashboard token={token} />}
        
        {role !== 'user' && role !== 'worker' && role !== 'admin' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs space-y-1">
            <p className="font-semibold">Unknown Role: "{user.role}"</p>
            <p>Please check your database or local storage user role value.</p>
          </div>
        )}
      </main>

    </div>
  );
}