'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
//  Imported from 'next/link' instead of 'next/navigation'
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  CheckCircle, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Users, 
  LayoutDashboard, 
  Compass, 
  LineChart, 
  Building2, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import Leaderboard from '@/components/Leaderboard';
import AchievementsList from '@/components/AchievementsList';
import CourseCard from '@/components/CourseCard';

interface DashboardClientProps {
    user: any;
    totalCourses: number;
    lessonsCompleted: number;
    averageScore: string;
    suggestedCourses: any[];
    leaderboard: any[];
    achievements: any[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04 }
    }
};

const item = {
    hidden: { opacity: 0, y: 6 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.15 }
    }
};

export default function DashboardClient({
    user,
    totalCourses,
    lessonsCompleted,
    averageScore,
    suggestedCourses,
    leaderboard,
    achievements
}: DashboardClientProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const firstName = user?.user_metadata?.name?.split(' ')[0] || 'Learner';

    const sidebarLinks = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
        { href: '/dashboard/courses', label: 'All Modules', icon: Compass },
        { href: '/dashboard/tutor', label: 'AI Market Tutor', icon: Sparkles },
        { href: '/simulator', label: 'Trading Simulator', icon: LineChart },
        { href: '/brokers', label: 'Compare Brokers', icon: Building2 },
        { href: '/dashboard/groups', label: 'Study Groups', icon: Users },
        { href: '/dashboard/playground', label: 'Code Playground', icon: Code },
    ];

    const isLinkActive = (href: string, exact = false) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-[#F1EAD9] text-[#111111] flex flex-col md:flex-row">
            
            {/* Mobile Sidebar Trigger Toggle Bar */}
            <div className="md:hidden h-14 bg-[#FBF8F1] border-b-2 border-black px-4 flex items-center justify-between sticky top-16 z-40 w-full">
                <span className="font-display font-black text-xs uppercase tracking-wide">Workspace Panel</span>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 border-2 border-black rounded-md bg-white text-black"
                >
                    {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </div>

            {/* Side Navigation Control Rig */}
            <aside className={`
                fixed md:sticky top-[120px] md:top-16 left-0 z-30
                w-64 h-[calc(100vh-120px)] md:h-[calc(100vh-64px)] 
                bg-[#FBF8F1] border-r-2 border-black p-4
                flex flex-col justify-between transition-transform duration-200
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-0 max-md:-translate-x-full'}
            `}>
                <div className="space-y-6">
                    {/* Tiny User Profile Anchor */}
                    <div className="p-3 border-2 border-black rounded-lg bg-[#F1EAD9] shadow-[2px_2px_0px_#111111] flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-[#FF9864] border border-black font-mono font-black text-xs flex items-center justify-center">
                            {firstName[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-black uppercase truncate text-black">{firstName}</div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">SaaS Profile</div>
                        </div>
                    </div>

                    {/* Navigation Control List links */}
                    <nav className="space-y-1">
                        {sidebarLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isLinkActive(link.href, link.exact);
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 border-transparent text-xs font-black uppercase tracking-wide transition-all
                                        ${active 
                                            ? 'bg-[#FF9864] border-black shadow-[2px_2px_0px_#111111]' 
                                            : 'text-gray-700 hover:bg-[#F1EAD9] hover:border-black/10'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4 flex-shrink-0" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Micro Help Footnote descriptor */}
                <div className="text-[10px] font-bold text-gray-400 font-mono text-center uppercase tracking-widest border-t border-black/10 pt-4">
                    SimuTrade Engine v1.1
                </div>
            </aside>

            {/* Primary Fluid Content Workspace Engine */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    {/* Small context badge block instead of massive banner */}
                    <div className="flex items-center gap-2">
                        <span className="bg-[#A2CD85] border-2 border-black text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
                            Workspace Overview
                        </span>
                        <span className="text-xs text-gray-500 font-bold font-mono uppercase tracking-wider">
                            / Live Stats Engine
                        </span>
                    </div>

                    {/* High-Contrast Quick Stats Metrics Row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* Stat Card 1 */}
                        <motion.div variants={item} className="stat-card bg-[#EEF3FF]">
                            <dt className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600">
                                <div className="p-1.5 rounded bg-[#528CF0] border border-black text-white shadow-[1px_1px_0px_#111111]">
                                    <BookOpen className="h-3.5 w-3.5" />
                                </div>
                                Modules Loaded
                            </dt>
                            <dd className="mt-3 font-mono text-3xl font-black text-black">{totalCourses}</dd>
                        </motion.div>

                        {/* Stat Card 2 */}
                        <motion.div variants={item} className="stat-card bg-[#EEF7E8]">
                            <dt className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600">
                                <div className="p-1.5 rounded bg-[#A2CD85] border border-black text-black shadow-[1px_1px_0px_#111111]">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                </div>
                                Lessons Completed
                            </dt>
                            <dd className="mt-3 font-mono text-3xl font-black text-black">{lessonsCompleted}</dd>
                        </motion.div>

                        {/* Stat Card 3 */}
                        <motion.div variants={item} className="stat-card bg-[#FFF0E8]">
                            <dt className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600">
                                <div className="p-1.5 rounded bg-[#FF9864] border border-black text-black shadow-[1px_1px_0px_#111111]">
                                    <Trophy className="h-3.5 w-3.5" />
                                </div>
                                Mean Quiz Score
                            </dt>
                            <dd className="mt-3 font-mono text-3xl font-black text-black">{averageScore}%</dd>
                        </motion.div>
                    </div>

                    {/* Core Sub-App Component Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <AchievementsList achievements={achievements} />
                        </div>
                        <div className="w-full">
                            <Leaderboard users={leaderboard} />
                        </div>
                    </div>

                    {/* Quick Access Grid Engine */}
                    <motion.div variants={item} className="p-5 bg-[#FBF8F1] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111]">
                        <h2 className="text-xs font-black uppercase tracking-wider text-black mb-4 flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-[#FF9864]" />
                            Sub-Application Shortcuts
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <Link href="/dashboard/tutor" className="p-3 border-2 border-black rounded-lg bg-[#EEF3FF] shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                                <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111]">🤖</span>
                                <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black">AI Tutor</h3>
                                <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Chat with virtual aids.</p>
                            </Link>

                            <Link href="/dashboard/courses" className="p-3 border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                                <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111]">📚</span>
                                <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black">Curriculum</h3>
                                <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Browse training loops.</p>
                            </Link>

                            <Link href="/dashboard/groups" className="p-3 border-2 border-black rounded-lg bg-[#EEF3FF] shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                                <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111]">👥</span>
                                <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black">Study Groups</h3>
                                <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Sync up with active circles.</p>
                            </Link>

                            <Link href="/dashboard/playground" className="p-3 border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                                <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111]">🐍</span>
                                <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black">Playground</h3>
                                <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Run sandbox coding frames.</p>
                            </Link>

                            <Link href="/simulator" className="p-3 border-2 border-black rounded-lg bg-[#EEF7E8] shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                                <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111]">📊</span>
                                <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black">Simulator</h3>
                                <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Test paper investments.</p>
                            </Link>

                            <Link href="/brokers" className="p-3 border-2 border-black rounded-lg bg-[#FFF0E8] shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                                <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111]">🏛️</span>
                                <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black">Brokers</h3>
                                <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Audit secure trading channels.</p>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Recommended Resource Tracks Card Grid */}
                    <motion.div variants={item}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-black uppercase tracking-wider text-black">Recommended Modules For You</h2>
                            <Link href="/dashboard/courses" className="text-[10px] font-black text-[#528CF0] border-b-2 border-black uppercase tracking-wider pb-0.5 hover:text-blue-600 transition-colors">
                                View Full Syllabus →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {suggestedCourses?.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}