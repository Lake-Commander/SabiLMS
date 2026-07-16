// app/dashboard/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { 
  Menu, 
  Sparkles, 
  CreditCard, 
  HelpCircle, 
  User as UserIcon, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Explicitly set to false to default the sidebar to a collapsed state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    try {
      await fetch('/auth/signout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  const firstName = user?.user_metadata?.name?.split(' ')[0] || 'Learner';
  const initialLetter = firstName[0]?.toUpperCase() || 'L';

  return (
    <div className="min-h-screen bg-[var(--cream)] dark:bg-[#0a0a0a] text-[var(--black)] dark:text-white flex flex-col md:flex-row antialiased transition-colors duration-150 relative">
      
      {/* Mobile Header Controller */}
      <div className="md:hidden h-14 bg-[var(--white)] dark:bg-[#0a0a0a] border-b-2 border-black dark:border-white/20 px-4 flex items-center justify-between sticky top-0 z-40 w-full">
        <span className="font-display font-black text-xs uppercase tracking-wide">Workspace</span>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 border-2 border-black dark:border-white/20 rounded-md bg-[var(--white)] dark:bg-slate-800 text-[var(--black)] dark:text-white cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Side Navigation panel */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Main Core Window Grid Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* ========================================================
            🛠️ THE UTILITY SUB-HEADER CONSOLE 
            ======================================================== */}
        <header className="h-14 bg-[var(--white)] dark:bg-[#0a0a0a] border-b-2 border-black dark:border-white/20 px-6 hidden md:flex items-center justify-end w-full select-none z-40">
          <div className="flex items-center gap-2">
            
            {/* AI Tutor Quick Access Trigger */}
            <Link 
              href="/dashboard/tutor" 
              className="p-2 border-2 border-transparent rounded-lg hover:bg-[var(--cream)] dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 text-gray-700 dark:text-gray-300 transition-all"
              title="AI Tutor Utility Channel"
            >
              <Sparkles className="w-4 h-4" />
            </Link>

            {/* SaaS Subscription Billing Module Icon */}
            <Link 
              href="/dashboard/billing" 
              className="p-2 border-2 border-transparent rounded-lg hover:bg-[var(--cream)] dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 text-gray-700 dark:text-gray-300 transition-all"
              title="Subscription and Billing"
            >
              <CreditCard className="w-4 h-4" />
            </Link>

            {/* Support Hub Dropdown Wrapper */}
            <div className="relative">
              <button 
                onClick={() => { setSupportDropdownOpen(!supportDropdownOpen); setProfileDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-[var(--cream)] dark:bg-slate-800 hover:bg-[var(--orange)] dark:hover:bg-[var(--orange)] dark:hover:text-black shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#ffffff20] text-xs font-black uppercase tracking-wide rounded-lg transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Support</span>
              </button>

              {supportDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--cream-light)] dark:bg-slate-900 border-2 border-black dark:border-white/20 rounded-xl p-2 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#ffffff20] animate-fadeIn">
                  <div className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest p-2 border-b border-black/10 dark:border-white/10">Help Center</div>
                  <Link href="/dashboard/support/faq" onClick={() => setSupportDropdownOpen(false)} className="flex items-center gap-2 p-2 rounded-lg text-xs font-bold uppercase hover:bg-[var(--cream)] dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                    📚 FAQ Module
                  </Link>
                  <Link href="/dashboard/support/guide" onClick={() => setSupportDropdownOpen(false)} className="flex items-center gap-2 p-2 rounded-lg text-xs font-bold uppercase hover:bg-[var(--cream)] dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                    📖 Help Guide
                  </Link>
                  <Link href="/dashboard/support/contact" onClick={() => setSupportDropdownOpen(false)} className="flex items-center gap-2 p-2 rounded-lg text-xs font-bold uppercase hover:bg-[var(--cream)] dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                    ✉️ Contact Us
                  </Link>
                </div>
              )}
            </div>

            {/* Custom Divider Line */}
            <div className="w-[2px] h-6 bg-black/10 dark:bg-white/10 mx-1" />

            {/* User Dropdown Pill Context Trigger */}
            <div className="relative">
              <button 
                onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setSupportDropdownOpen(false); }}
                className="w-8 h-8 rounded-lg bg-[var(--green)] border-2 border-black font-mono font-black text-xs flex items-center justify-center text-black shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#ffffff20] cursor-pointer hover:translate-x-[-0.5px] hover:-translate-y-[0.5px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                {initialLetter}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[var(--cream-light)] dark:bg-slate-900 border-2 border-black dark:border-white/20 rounded-xl p-2 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#ffffff20] animate-fadeIn">
                  <div className="p-2 border-b border-black/10 dark:border-white/10">
                    <div className="text-xs font-black uppercase text-black dark:text-white truncate">{firstName}</div>
                    <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 truncate mt-0.5">{user?.email}</div>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <Link href="/dashboard/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-bold uppercase hover:bg-[var(--cream)] dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                      <UserIcon className="w-3.5 h-3.5" /> Edit Profile
                    </Link>
                    <Link href="/dashboard/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-bold uppercase hover:bg-[var(--cream)] dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                      <Settings className="w-3.5 h-3.5" /> Workspace Config
                    </Link>
                    <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="w-full flex items-center gap-2.5 p-2 rounded-lg text-xs font-bold uppercase text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left cursor-pointer transition-colors">
                      <LogOut className="w-3.5 h-3.5" /> End Session
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Inner Application Page Content Frame Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-custom">
          {children}
        </div>
      </div>

      {/* Global Event Listener to dismiss dropdown panels on workspace outside clicks */}
      {(profileDropdownOpen || supportDropdownOpen) && (
        <div 
          className="fixed inset-0 z-30 bg-transparent" 
          onClick={() => { setProfileDropdownOpen(false); setSupportDropdownOpen(false); }} 
        />
      )}
    </div>
  );
}