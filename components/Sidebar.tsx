'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, Compass, Sparkles, LineChart, 
  Building2, Users, Code, LogOut, Sun, Moon, Laptop,
  Settings, ChevronLeft, ChevronRight
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
  const firstName = user?.user_metadata?.name?.split(' ')[0] || 'Learner';

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
      {/* Retractable Desktop Drawer Frame */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40
        h-screen bg-[var(--white)] border-r-2 border-black p-4
        flex flex-col justify-between transition-all duration-200 select-none
        ${isOpen ? 'w-64' : 'w-20 max-md:-translate-x-full'}
      `}>
        
        {/* Top Control Block */}
        <div className="space-y-6">
          {/* Header Brand without site header */}
          <div className="flex items-center justify-between min-h-[40px]">
            {isOpen && (
              <span className="font-display font-black text-sm uppercase tracking-tight text-[var(--black)]">
                Sabi<span className="italic font-normal lowercase text-xs">stok</span>
              </span>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex p-1.5 border-2 border-black bg-[var(--cream)] rounded-md hover:bg-[var(--orange)] transition-colors mx-auto"
              aria-label="Collapse panel layout view"
            >
              {isOpen ? <ChevronLeft className="w-4 h-4 text-black" /> : <ChevronRight className="w-4 h-4 text-black" />}
            </button>
          </div>

          {/* Clean User Card Block */}
          <div className="p-2 border-2 border-black rounded-lg bg-[var(--cream)] shadow-[2px_2px_0px_rgba(var(--border-color),1)] flex items-center gap-3">
            <div className="w-8 h-8 flex-shrink-0 rounded-md bg-[var(--orange)] border border-black font-mono font-black text-xs flex items-center justify-center text-black">
              {firstName[0]?.toUpperCase()}
            </div>
            {isOpen && (
              <div className="min-w-0">
                <div className="text-xs font-black uppercase truncate text-black">{firstName}</div>
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">SaaS Profile</div>
              </div>
            )}
          </div>

          {/* Sidebar Links Map Engine */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 border-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all
                    ${active 
                      ? 'bg-[var(--orange)] border-black shadow-[2px_2px_0px_#111111] text-black' 
                      : 'text-gray-700 dark:text-gray-300 border-transparent hover:bg-[var(--cream)] hover:border-black/20'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0 text-current" />
                  {isOpen && <span className="truncate">{link.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Grid Panel (Settings, Theme, Logout) */}
        <div className="space-y-4 border-t-2 border-dashed border-black/10 pt-4">
          
          {/* Integrated Multi-Theme Selector Toggle Card */}
          {isOpen ? (
            <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--cream)] border-2 border-black rounded-lg">
              <button 
                onClick={() => setTheme('light')} 
                className={`p-1.5 rounded flex justify-center ${theme === 'light' ? 'bg-[var(--orange)] border border-black text-black' : 'text-gray-500'}`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setTheme('dark')} 
                className={`p-1.5 rounded flex justify-center ${theme === 'dark' ? 'bg-[var(--orange)] border border-black text-black' : 'text-gray-500'}`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setTheme('system')} 
                className={`p-1.5 rounded flex justify-center ${theme === 'system' ? 'bg-[var(--orange)] border border-black text-black' : 'text-gray-500'}`}
                title="System Mode"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex justify-center p-2 border-2 border-black rounded-lg bg-[var(--cream)] text-[var(--black)]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Functional Settings Link Row */}
          <Link 
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 border-2 border-transparent text-xs font-black uppercase text-gray-700 dark:text-gray-300 hover:bg-[var(--cream)] hover:border-black/20 rounded-lg transition-all"
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {isOpen && <span>Settings</span>}
          </Link>

          {/* Execution Logout Action Trigger */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 border-2 border-transparent text-xs font-black uppercase text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 rounded-lg transition-all text-left"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>

      </aside>

      {/* Dimmed Background Overlay Mask Screen purely for Mobile Viewports */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </>
  );
}