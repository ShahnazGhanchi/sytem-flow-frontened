import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, X } from 'lucide-react';

export default function WorkerDashboard({ token }) {
  const [tickets, setTickets] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://support-flow-dusky.vercel.app';

  useEffect(() => {
    fetchAssignedTickets();
  }, [token]);

  // 1. Fixed URL: /api/tickets (Backend matches role automatically)
  const fetchAssignedTickets = async () => {
    try {
      const response = await fetch('${API_BASE_URL}/api/tickets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets || (Array.isArray(data) ? data : []));
      }
    } catch (err) {
      console.error('Error fetching assigned tickets:', err);
    }
  };

  // 2. Fixed URL to /api/tickets/status/${ticketId} & Method 'PUT'
  const handleStatusUpdate = async (ticketId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/status/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setSelectedDetail(null);
        fetchAssignedTickets();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Assigned Queue</h2>
        <p className="text-xs text-slate-500 mt-0.5">Tickets assigned to you for resolution.</p>
      </div>

      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 shadow-xs">
            <p className="text-sm">No tickets assigned to you currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {tickets.map((ticket, index) => (
              <div 
                key={ticket._id || ticket.id || index}
                onClick={() => setSelectedDetail(ticket)}
                className="bg-white hover:border-slate-300 border border-slate-200 p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400 font-mono">
                      #{ticket._id ? ticket._id.slice(-6).toUpperCase() : `TICK-${index + 1}`}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium">{ticket.category || ticket.type || 'General'}</span>
                  </div>
                  <h4 className="font-medium text-slate-900 text-sm truncate">{ticket.subject || ticket.title}</h4>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium shrink-0 ${
                  ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  ticket.status === 'In-Progress' || ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {ticket.status || 'Open'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal with Status Actions */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 relative space-y-4 shadow-xl">
            <button onClick={() => setSelectedDetail(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono">
                #{selectedDetail._id ? selectedDetail._id.slice(-6).toUpperCase() : 'TCK'}
              </span>
              <h3 className="text-base font-semibold text-slate-900">{selectedDetail.subject || selectedDetail.title}</h3>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-slate-700 text-xs leading-relaxed">
              {selectedDetail.description}
            </div>
            
            <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
              <span>Status: <strong className="text-emerald-600 capitalize">{selectedDetail.status || 'Open'}</strong></span>
              
              <div className="flex items-center space-x-2">
                {selectedDetail.status !== 'Resolved' && (
                  <>
                    {selectedDetail.status !== 'In-Progress' && selectedDetail.status !== 'In Progress' && (
                      <button 
                        onClick={() => handleStatusUpdate(selectedDetail._id || selectedDetail.id, 'In-Progress')}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-medium transition border border-amber-200"
                      >
                        In Progress
                      </button>
                    )}
                    <button 
                      onClick={() => handleStatusUpdate(selectedDetail._id || selectedDetail.id, 'Resolved')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      Resolve
                    </button>
                  </>
                )}
                <button onClick={() => setSelectedDetail(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}