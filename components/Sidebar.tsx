'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, Compass, LineChart, 
  Users, Code, Sun, Moon, Laptop,
  ChevronLeft, ChevronRight, Globe
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

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth < 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, setIsOpen]);

  const sidebarLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/courses', label: 'Modules', icon: Compass },
    { href: '/dashboard/market', label: 'Market Data', icon: Globe }, // New Market Page
    { href: '/dashboard/simulator', label: 'Simulator', icon: LineChart }, // Moved to dashboard
    { href: '/dashboard/groups', label: 'Study Groups', icon: Users },
    { href: '/dashboard/playground', label: 'Playground', icon: Code },
  ];

  return (
    <>
      <aside className={`
        fixed md:sticky top-0 left-0 z-40
        h-screen bg-white dark:bg-[#0a0a0a] border-r-2 border-black dark:border-white/20 p-4
        flex flex-col justify-between transition-all duration-300 select-none
        ${isOpen ? 'w-64' : 'w-20 max-md:-translate-x-full'}
      `}>
        
        {/* Desktop Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex p-1 border-2 border-black dark:border-white/20 bg-white dark:bg-slate-800 text-black dark:text-white rounded-md hover:bg-[var(--orange)] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#ffffff40] transition-all absolute -right-3.5 top-5 z-50 cursor-pointer"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div>
          {/* Logo */}
          <div className="flex items-center justify-center min-h-[40px] pb-4 border-b-2 border-dashed border-black/10 dark:border-white/10">
            {isOpen ? (
              <span className="font-display font-black text-lg uppercase tracking-tight text-black dark:text-white">
                Sabi<span className="italic font-normal lowercase text-sm text-[var(--orange)]">stok</span>
              </span>
            ) : (
              <span className="font-display font-black text-xl uppercase text-black dark:text-white bg-[var(--green)] px-2 border-2 border-black shadow-[2px_2px_0px_#111111]">
                S
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 my-4 overflow-y-auto scrollbar-custom space-y-2 pt-4">
            <nav className="space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                    className={`
                      group relative flex items-center gap-3 px-3 py-3 border-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all
                      ${active 
                        ? 'bg-[var(--orange)] border-black shadow-[3px_3px_0px_#111111] text-black translate-x-[-1px] -translate-y-[1px]' 
                        : 'text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-100 dark:hover:bg-white/5 hover:border-black/40 dark:hover:border-white/20 hover:text-black dark:hover:text-white'
                      }
                      ${!isOpen && 'justify-center'}
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    
                    {isOpen && <span className="truncate">{link.label}</span>}
                    
                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-16 hidden group-hover:block bg-black text-white dark:bg-white dark:text-black font-mono font-black text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded z-50 shadow-[2px_2px_0px_var(--orange)] whitespace-nowrap">
                        {link.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Theme Toggles & Version */}
        <div className="space-y-4 border-t-2 border-dashed border-black/10 dark:border-white/10 pt-4">
          {isOpen ? (
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 dark:bg-white/5 border-2 border-black dark:border-white/20 rounded-lg">
              {(['light', 'dark', 'system'] as const).map((mode) => {
                const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Laptop;
                return (
                  <button 
                    key={mode}
                    onClick={() => setTheme(mode)} 
                    className={`p-2 rounded flex justify-center border transition-all cursor-pointer ${
                      theme === mode 
                        ? 'bg-[var(--green)] border-black text-black shadow-[1.5px_1.5px_0px_#111111]' 
                        : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          ) : (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex justify-center p-2.5 border-2 border-black dark:border-white/20 rounded-lg bg-gray-100 dark:bg-white/5 text-black dark:text-white cursor-pointer hover:bg-[var(--green)] dark:hover:bg-[var(--green)] dark:hover:text-black transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <div className="text-[9px] font-bold text-gray-400 font-mono text-center uppercase tracking-widest">
            {isOpen ? 'SabiStok OS v2.0' : 'v2.0'}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" 
        />
      )}
    </>
  );
}