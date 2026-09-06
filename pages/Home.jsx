import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  Clock, 
  Layers, 
  BarChart3, 
  LifeBuoy, 
  Check 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-white flex flex-col justify-between">
      <div>
        {/* Navbar */}
        <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-2 rounded-lg text-white shadow-lg shadow-emerald-600/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SupportFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/auth" className="text-sm font-medium text-zinc-300 hover:text-white transition">
                Login
              </Link>
              <Link to="/auth" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-emerald-600/30">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        
<section className="relative overflow-hidden pt-12 pb-20">
  {/* Gradient Glow Effect Background */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/0 to-zinc-950 pointer-events-none" />
  
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Left Column: Text & CTA */}
      <div className="lg:col-span-6 text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Manage Issues & Tickets with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
            Absolute Speed
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-xl">
          A powerful role-based ticketing platform built for seamless collaboration between users, support workers, and admins.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/auth"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 transition shadow-xl shadow-emerald-600/20"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Right Column: Dashboard Mockup Image */}
      <div className="lg:col-span-6 relative">
        {/* Decorative Glow behind Image */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-20 blur-xl"></div>
        
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/80 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="SupportFlow Analytics & Ticket Dashboard"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>

    </div>

    {/* Feature Highlights Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-20 text-left">
      <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
        <div className="bg-emerald-600/10 text-emerald-400 p-3 rounded-xl w-fit mb-4">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Role-Based Access</h3>
        <p className="text-zinc-400 text-sm">Secure permissions for Users, Workers, and Admins to streamline workflow.</p>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
        <div className="bg-emerald-600/10 text-emerald-400 p-3 rounded-xl w-fit mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Real-time Tracking</h3>
        <p className="text-zinc-400 text-sm">Create, assign, and update ticket statuses instantly with clean UI feedback.</p>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
        <div className="bg-emerald-600/10 text-emerald-400 p-3 rounded-xl w-fit mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Smart Ticket Routing</h3>
        <p className="text-zinc-400 text-sm">Automatically route customer queries to the right support agent for faster resolution.</p>
      </div>
    </div>
  </div>
</section>

        {/* Section 1: Workflow & Stats Breakdown */}
        <section className="py-20 border-t border-zinc-800/60 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Designed for Efficiency at Scale
              </h2>
              <p className="text-zinc-400">
                Eliminate support bottlenecks with a simplified three-step resolution lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Submit Query</h4>
                <p className="text-zinc-400 text-sm">
                  Users log issues easily with tagged priorities and dynamic categorization.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Auto-Assign</h4>
                <p className="text-zinc-400 text-sm">
                  Support agents receive assigned tickets based on workload and expertise.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Swift Resolution</h4>
                <p className="text-zinc-400 text-sm">
                  Resolve tickets with real-time updates and notify users immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Call To Action (CTA) */}
        <section className="py-20 border-t border-zinc-800/60">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/40 border border-emerald-500/20 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Ready to transform your support flow?
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of support teams that manage queries faster and deliver seamless customer experiences.
              </p>
              <Link to="/auth" className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg shadow-emerald-600/30">
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 text-sm text-zinc-400">
  <div className="max-w-7xl mx-auto px-6">
    {/* Top Grid Section */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      {/* Brand Info */}
      <div className="space-y-4 md:col-span-1">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white shadow-md shadow-emerald-600/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">SupportFlow</span>
        </Link>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Streamlining issue management and ticketing for modern teams with speed and security.
        </p>
      </div>

      {/* Product Links */}
      <div>
        <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">Product</h4>
        <ul className="space-y-2 text-xs">
          <li><Link to="/auth" className="hover:text-emerald-400 transition">Dashboard</Link></li>
          <li><Link to="#" className="hover:text-emerald-400 transition">Features</Link></li>
          <li><Link to="#" className="hover:text-emerald-400 transition">Role Security</Link></li>
        </ul>
      </div>

      {/* Resources Links */}
      <div>
        <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">Resources</h4>
        <ul className="space-y-2 text-xs">
          <li><Link to="#" className="hover:text-emerald-400 transition">Documentation</Link></li>
          <li><Link to="#" className="hover:text-emerald-400 transition">API Reference</Link></li>
          <li><Link to="#" className="hover:text-emerald-400 transition">System Status</Link></li>
        </ul>
      </div>

      {/* Legal & Company */}
      <div>
        <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">Company</h4>
        <ul className="space-y-2 text-xs">
          <li><Link to="#" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
          <li><Link to="#" className="hover:text-emerald-400 transition">Terms of Service</Link></li>
          <li><Link to="#" className="hover:text-emerald-400 transition">Contact Support</Link></li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar Section */}
    <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 space-y-4 sm:space-y-0">
      <p>© {new Date().getFullYear()} SupportFlow Inc. All rights reserved.</p>
      <div className="flex space-x-6">
        <span className="inline-flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-zinc-400">All systems operational</span>
        </span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}