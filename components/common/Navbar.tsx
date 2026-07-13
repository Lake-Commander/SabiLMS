'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X, GraduationCap, LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: isAdminRpc } = await supabase.rpc('is_admin');
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        setIsAdmin(profile?.role === 'admin' || !!isAdminRpc);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: isAdminRpc } = await supabase.rpc('is_admin');
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setIsAdmin(profile?.role === 'admin' || !!isAdminRpc);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    try {
      await fetch('/auth/signout', { method: 'POST' });
      setUser(null);
      setIsAdmin(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#FBF8F1] border-b-2 border-black text-black">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo Platform Link */}
        <Link href="/" className="flex items-center gap-2 font-black text-lg select-none">
          <div className="w-9 h-9 rounded-lg bg-[#A2CD85] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#111111]">
            <GraduationCap className="w-5 h-5 text-black" />
          </div>
          <span className="font-display uppercase tracking-tight">
            Sabi<span className="italic font-normal lowercase text-sm">stok</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase border-2 border-transparent transition-all ${
                  isActive('/dashboard')
                    ? 'bg-[#FF9864] border-black shadow-[2px_2px_0px_#111111]'
                    : 'hover:bg-[#F1EAD9] hover:border-black/20'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/courses"
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase border-2 border-transparent transition-all ${
                  isActive('/dashboard/courses')
                    ? 'bg-[#FF9864] border-black shadow-[2px_2px_0px_#111111]'
                    : 'hover:bg-[#F1EAD9] hover:border-black/20'
                }`}
              >
                Courses
              </Link>
              <Link
                href="/dashboard/tutor"
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase border-2 border-transparent transition-all ${
                  isActive('/dashboard/tutor')
                    ? 'bg-[#528CF0] text-white border-black shadow-[2px_2px_0px_#111111]'
                    : 'hover:bg-[#F1EAD9] hover:border-black/20'
                }`}
              >
                AI Tutor
              </Link>
              <Link
                href="/simulator"
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase border-2 border-transparent transition-all ${
                  isActive('/simulator')
                    ? 'bg-[#FF9864] border-black shadow-[2px_2px_0px_#111111]'
                    : 'hover:bg-[#F1EAD9] hover:border-black/20'
                }`}
              >
                Simulator
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase border-2 border-transparent transition-all ${
                    isActive('/admin')
                      ? 'bg-red-400 border-black shadow-[2px_2px_0px_#111111]'
                      : 'text-red-600 hover:bg-red-50 hover:border-red-200'
                  }`}
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="#course-path" className="px-3 py-1.5 text-xs font-bold uppercase hover:text-[#A2CD85] transition">Courses</Link>
              <Link href="/brokers" className="px-3 py-1.5 text-xs font-bold uppercase hover:text-[#A2CD85] transition">Brokers</Link>
              <Link href="#why" className="px-3 py-1.5 text-xs font-bold uppercase hover:text-[#A2CD85] transition">About</Link>
            </>
          )}
        </nav>

        {/* Right Actions Block Layout (Auth Toggles, Themes) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg bg-[#F1EAD9] font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#111111] hover:translate-y-0.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#F1EAD9] border-2 border-transparent rounded-lg transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="neo-btn bg-[#A2CD85] !py-2 !px-4">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Layout Actions Engine */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 border-2 border-black rounded-lg bg-white"
            aria-label="Toggle structural layout navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Navigation Overlay Sheet Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#F1EAD9] p-6 flex flex-col gap-3 md:hidden border-t-2 border-black animate-fadeIn">
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">Dashboard</Link>
              <Link href="/dashboard/courses" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">Courses</Link>
              <Link href="/dashboard/tutor" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">AI Tutor</Link>
              <Link href="/simulator" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">Portfolio Simulator</Link>
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="neo-btn bg-[#FF9864] text-center mt-4 w-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="#course-path" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">COURSES</Link>
              <Link href="/brokers" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">BROKERS</Link>
              <Link href="#why" onClick={() => setIsOpen(false)} className="text-lg font-black uppercase border-b border-black/10 py-2">ABOUT</Link>
              <Link href="/auth/login" onClick={() => setIsOpen(false)} className="neo-btn bg-white w-full text-center mt-4">Login</Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)} className="neo-btn bg-[#A2CD85] w-full text-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}