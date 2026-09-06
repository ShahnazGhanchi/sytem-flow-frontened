import React, { useEffect, useState } from 'react';
import { Ticket, PlusCircle, CheckCircle, Clock, X } from 'lucide-react';

export default function UserDashboard({ token }) {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Technical');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tickets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(Array.isArray(data) ? data : (data.tickets || data.data || []));
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!subject || !description) return alert('Please fill out all fields');

    try {
      const response = await fetch('http://localhost:8000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, description, type })
      });

      if (response.ok) {
        setSubject('');
        setDescription('');
        setType('Technical');
        setIsModalOpen(false);
        fetchTickets();
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Support Tickets</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage and track your active requests.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-0.5">{tickets.length}</h3>
          </div>
          <Ticket className="w-4 h-4 text-slate-400" />
        </div>
        <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-slate-500 font-medium">Active</p>
            <h3 className="text-lg font-semibold text-emerald-600 mt-0.5">
              {tickets.filter(t => (t.status || 'Open') === 'Open' || t.status === 'In Progress').length}
            </h3>
          </div>
          <Clock className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-slate-500 font-medium">Resolved</p>
            <h3 className="text-lg font-semibold text-slate-700 mt-0.5">
              {tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length}
            </h3>
          </div>
          <CheckCircle className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 shadow-xs">
            <p className="text-sm">No support requests yet.</p>
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
                    <span className="text-xs text-slate-500 font-medium">{ticket.type || 'General'}</span>
                  </div>
                  <h4 className="font-medium text-slate-900 text-sm truncate">{ticket.subject || ticket.title}</h4>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium shrink-0 ${
                  ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {ticket.status || 'Open'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 relative space-y-4 shadow-xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-semibold text-slate-900">New Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Subject</label>
                <input
                  type="text" required placeholder="Issue summary" value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Description</label>
                <textarea
                  required rows="3" placeholder="Details..." value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-slate-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-slate-400">
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="Account">Account</option>
                  <option value="General">General</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg text-xs transition mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 relative space-y-4 shadow-xl">
            <button onClick={() => setSelectedDetail(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono">{selectedDetail.type || 'General'}</span>
              <h3 className="text-base font-semibold text-slate-900">{selectedDetail.subject || selectedDetail.title}</h3>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-slate-700 text-xs leading-relaxed">
              {selectedDetail.description}
            </div>
            <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
              <span>Status: <strong className="text-emerald-600 capitalize">{selectedDetail.status || 'Open'}</strong></span>
              <button onClick={() => setSelectedDetail(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}