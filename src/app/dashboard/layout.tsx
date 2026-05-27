import React from 'react';
import { cookies } from 'next/headers';
import { db } from '@/services/db';
import LoginPanel from './LoginPanel';
import { Globe, LogOut, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | SiteBuilder',
  description: 'Manage and customize your business website.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  let session = null;
  if (token) {
    session = await db.getSession(token);
  }

  // If unauthorized, show login panel instead of children
  if (!session || !session.user) {
    return <LoginPanel />;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative selection:bg-indigo-500 selection:text-slate-950">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Admin Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                W
              </div>
              <span className="text-sm font-bold tracking-tight text-white hidden sm:inline-block">
                SiteBuilder Control Center
              </span>
            </Link>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-semibold border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck size={10} />
              Session Verified
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
              <Phone size={12} className="text-indigo-400" />
              <span className="font-medium text-slate-300">{user.phoneNumber}</span>
            </div>
            
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="bg-slate-900 border border-slate-800 hover:bg-rose-500/10 hover:text-rose-400 text-slate-300 p-2 rounded-xl text-xs font-semibold tracking-tight transition flex items-center justify-center gap-1.5 cursor-pointer"
                title="Sign out of panel"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline-block">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 relative z-10 flex flex-col">
        {children}
      </div>
    </div>
  );
}
