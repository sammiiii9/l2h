'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  LogOut, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>({
    name: 'Vikram Malhotra',
    role: 'Principal Advisor / Admin',
    email: 'admin@l2h.com'
  });

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('l2h_admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    } else if (!isLoginPage) {
      // Default to guest demo admin
      localStorage.setItem('l2h_admin_user', JSON.stringify(user));
    }
  }, [isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('l2h_admin_user');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const NAV_ITEMS = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Property Inventory CMS', href: '/admin/properties', icon: Building2 },
    { label: 'Lead CRM Pipeline', href: '/admin/leads', icon: Users },
    { label: 'Site Visits Scheduler', href: '/admin/site-visits', icon: Calendar },
    { label: 'Market Insights Blog', href: '/admin/blog', icon: BookOpen },
    { label: 'Analytics & UTM Sources', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 p-3.5 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="inline-flex items-center">
          <div className="bg-white px-3 py-1.5 rounded-xl">
            <img src="/logo.png" alt="L2H Solution" className="h-[28px] w-auto object-contain" />
          </div>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:min-h-screen shrink-0`}
      >
        <div className="p-6 space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center">
              <div className="bg-white px-3.5 py-2 rounded-xl shadow-sm border border-white/20">
                <img src="/logo.png" alt="L2H Solution" className="h-[34px] w-auto object-contain" />
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Bio Card */}
          <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-charcoal-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm font-serif ring-1 ring-gold/40">
              {user.name?.charAt(0) || 'V'}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-gold truncate">{user.role || 'Admin'}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold text-charcoal-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-charcoal-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-charcoal-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-800 text-slate-300 hover:text-gold text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-gold" />
              <span>Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-500/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
