import React, { useEffect, useState } from 'react';
import { ShieldCheck, UserCheck, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';

export default function AdminDashboard({ token }) {
  const [tickets, setTickets] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://support-flow-dusky.vercel.app';

  useEffect(() => {
    fetchAdminData();
    fetchWorkers();
  }, [token]);

  // 1. Fetch All Tickets for Admin
  const fetchAdminData = async () => {
    try {
      const response = await fetch('/api/tickets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(Array.isArray(data) ? data : (data.tickets || data.data || []));
      } else {
        setErrorMsg('Failed to load tickets');
      }
    } catch (err) {
      console.error('Error fetching admin tickets:', err);
      setErrorMsg('Network error fetching tickets');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Workers for Dropdown
  const fetchWorkers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setWorkers(Array.isArray(data) ? data : (data.workers || data.data || []));
      }
    } catch (err) {
      console.error('Error fetching workers:', err);
    }
  };

  // 3. Assign Ticket to Selected Worker
  const handleAssign = async (e) => {
  e.preventDefault();
  if (!selectedTicket || !selectedWorkerId) return;

  const ticketId = selectedTicket._id || selectedTicket.id;

  try {
    // URL badal kar /assign/${ticketId} kar diya hai jo aap ke backend route se match karta hai
    const response = await fetch(`${API_BASE_URL}/api/users/workers`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ workerId: selectedWorkerId })
    });

    if (response.ok) {
      setSelectedTicket(null);
      setSelectedWorkerId('');
      fetchAdminData(); // Refresh tickets list
      alert('Ticket assigned successfully!');
    } else {
      const errData = await response.json();
      alert(errData.message || 'Failed to assign ticket');
    }
  } catch (err) {
    console.error('Error assigning ticket:', err);
    alert('Error assigning ticket. Please check server logs.');
  }
};

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Admin Assignment Hub</h2>
          <p className="text-xs text-slate-500 mt-0.5">Oversee system requests and allocate them to support workers.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Admin Access Verified</span>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Ticket List Section */}
      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 shadow-xs">
            <p className="text-sm">No tickets found in the system.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {tickets.map((ticket, index) => (
              <div 
                key={ticket._id || ticket.id || index}
                onClick={() => {
                  setSelectedTicket(ticket);
                  setSelectedWorkerId(ticket.assignedTo?._id || ticket.assignedTo || '');
                }}
                className="bg-white hover:border-slate-300 border border-slate-200 p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-4 shadow-xs hover:shadow-sm"
              >
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400 font-mono">
                      #{ticket._id ? ticket._id.slice(-6).toUpperCase() : `TCK-${index + 1}`}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium">{ticket.category || ticket.type || 'General'}</span>
                  </div>
                  <h4 className="font-medium text-slate-900 text-sm truncate">{ticket.subject || ticket.title}</h4>
                </div>
                
                <div className="flex items-center space-x-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                    ticket.assignedTo 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {ticket.assignedTo ? (typeof ticket.assignedTo === 'object' ? `Assigned: ${ticket.assignedTo.name}` : 'Assigned') : 'Unassigned'}
                  </span>
                  
                  <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    ticket.status === 'In-Progress' || ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {ticket.status || 'Open'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignment Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 relative space-y-4 shadow-xl">
            <button 
              onClick={() => setSelectedTicket(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono">
                #{selectedTicket._id ? selectedTicket._id.slice(-6).toUpperCase() : 'TCK'}
              </span>
              <h3 className="text-base font-semibold text-slate-900">{selectedTicket.subject || selectedTicket.title}</h3>
            </div>
            
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-slate-700 text-xs leading-relaxed">
              {selectedTicket.description || 'No description provided.'}
            </div>

            <form onSubmit={handleAssign} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Assign to Support Worker</label>
                <select 
                  value={selectedWorkerId} 
                  onChange={(e) => setSelectedWorkerId(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-slate-400"
                >
                  <option value="">Select a worker...</option>
                  {workers.map((w) => (
                    <option key={w._id || w.id} value={w._id || w.id}>
                      {w.name} ({w.email})
                    </option>
                  ))}
                </select>
                {workers.length === 0 && (
                  <p className="text-[10px] text-amber-600 mt-1">No workers found in system. Update user roles in database.</p>
                )}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setSelectedTicket(null)} 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}