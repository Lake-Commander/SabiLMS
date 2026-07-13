'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, Compass, Sparkles, LineChart, 
  Building2, Users, Code, Sun, Moon, Laptop,
  ChevronLeft, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: any;
  onLogout: () => void;
}

export default function Sidebar({ isOpen, setIsOpen, user, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const sidebarLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/courses', label: 'Modules', icon: Compass },
    { href: '/dashboard/tutor', label: 'AI Tutor', icon: Sparkles },
    { href: '/simulator', label: 'Simulator', icon: LineChart },
    { href: '/brokers', label: 'Brokers', icon: Building2 },
    { href: '/dashboard/groups', label: 'Study Groups', icon: Users },
    { href: '/dashboard/playground', label: 'Playground', icon: Code },
  ];

  return (
    <>
      <aside className={`
        fixed md:sticky top-0 left-0 z-40
        h-screen bg-[var(--white)] border-r-2 border-black p-4
        flex flex-col justify-between transition-all duration-200 select-none
        ${isOpen ? 'w-64' : 'w-20 max-md:-translate-x-full'}
      `}>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex p-1 border-2 border-black bg-[var(--white)] dark:bg-slate-800 rounded-md hover:bg-[var(--orange)] shadow-[2px_2px_0px_#111111] transition-all absolute -right-3.5 top-5 z-50 cursor-pointer"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div>
          <div className="flex items-center justify-between min-h-[40px] pb-2 border-b-2 border-dashed border-black/10">
            {isOpen ? (
              <span className="font-display font-black text-sm uppercase tracking-tight text-[var(--black)]">
                Sabi<span className="italic font-normal lowercase text-xs">stok</span>
              </span>
            ) : (
              <span className="font-display font-black text-sm uppercase mx-auto text-[var(--black)]">S</span>
            )}
          </div>

          <div className="flex-1 my-4 overflow-y-auto scrollbar-custom space-y-2 pt-4">
            <nav className="space-y-1.5">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`
                      group relative flex items-center gap-3 px-3 py-2.5 border-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all
                      ${active 
                        ? 'bg-[var(--orange)] border-black shadow-[3px_3px_0px_#111111] text-black translate-x-[-1px] -translate-y-[1px]' 
                        : 'text-gray-700 dark:text-gray-300 border-transparent hover:bg-[var(--cream)] hover:border-black/40 hover:text-black dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {isOpen ? (
                      <span className="truncate">{link.label}</span>
                    ) : (
                      <div className="absolute left-16 hidden group-hover:block bg-[var(--cream-light)] dark:bg-slate-800 border-2 border-black text-[var(--black)] font-mono font-black text-[10px] uppercase tracking-wider px-2 py-1 whitespace-nowrap z-50 shadow-[2px_2px_0px_var(--border-color)]">
                        {link.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="space-y-4 border-t-2 border-dashed border-black/10 pt-4">
          {isOpen ? (
            <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--cream)] border-2 border-black rounded-lg">
              {(['light', 'dark', 'system'] as const).map((mode) => {
                const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Laptop;
                return (
                  <button 
                    key={mode}
                    onClick={() => setTheme(mode)} 
                    className={`p-1.5 rounded flex justify-center border transition-all cursor-pointer ${
                      theme === mode 
                        ? 'bg-[var(--orange)] border-black text-black shadow-[1px_1px_0px_#111111]' 
                        : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          ) : (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex justify-center p-2 border-2 border-black rounded-lg bg-[var(--cream)] text-black cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <div className="text-[10px] font-bold text-gray-400 font-mono text-center uppercase tracking-widest">
            {isOpen ? 'SimuTrade v1.1' : 'v1.1'}
          </div>
        </div>

      </aside>

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />}
    </>
  );
}