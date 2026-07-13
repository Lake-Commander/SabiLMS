'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--black)] flex flex-col md:flex-row antialiased transition-colors duration-150">
      
      {/* Mobile Top Bar - Clean & Isolated (Hidden on Desktop) */}
      <div className="md:hidden h-14 bg-[var(--white)] border-b-2 border-black px-4 flex items-center justify-between sticky top-0 z-40 w-full">
        <span className="font-display font-black text-xs uppercase tracking-wide">Workspace</span>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 border-2 border-black rounded-md bg-[var(--white)] text-[var(--black)] active:translate-x-[1px] active:translate-y-[1px]"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Retractable Dashboard App Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Primary Scrollable Core Viewport */}
      <div className="flex-1 h-screen overflow-y-auto scrollbar-custom flex flex-col pt-4 md:pt-0">
        {children}
      </div>
    </div>
  );
}