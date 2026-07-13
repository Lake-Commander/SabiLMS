'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, CheckCircle, Trophy, Sparkles, Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
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
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
            
            {/* Mobile Workspace Toggle Header - Only handles side panels, no structural site links */}
            <div className="md:hidden h-14 bg-[var(--white)] border-b-2 border-black px-4 flex items-center justify-between sticky top-0 z-40 w-full text-[var(--black)]">
                <span className="font-display font-black text-xs uppercase tracking-wide">Dashboard Workspace</span>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 border-2 border-black rounded-md bg-[var(--white)] text-[var(--black)]"
                >
                    <Menu className="w-4 h-4" />
                </button>
            </div>

            {/* Isolated Retractable Application Sidebar */}
            <Sidebar 
                isOpen={sidebarOpen} 
                setIsOpen={setSidebarOpen} 
                user={user} 
                onLogout={handleLogout} 
            />

            {/* Core Fluid Scroll Content Field Panel */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full overflow-y-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    {/* Small Context Route Badge Marker */}
                    <div className="flex items-center gap-2 select-none">
                        <span className="bg-[var(--green)] border-2 border-black text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
                            Overview
                        </span>
                        <span className="text-xs text-gray-500 font-bold font-mono uppercase tracking-wider">
                            / metrics_engine
                        </span>
                    </div>

                    {/* Stats Metric Row Card Layout */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <motion.div variants={item} className="stat-card bg-[#EEF3FF] dark:bg-slate-900">
                            <dt className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                <div className="p-1.5 rounded bg-[#528CF0] border border-black text-white shadow-[1px_1px_0px_#111111]">
                                    <BookOpen className="h-3.5 w-3.5" />
                                </div>
                                Modules Loaded
                            </dt>
                            <dd className="mt-3 font-mono text-3xl font-black text-black dark:text-white">{totalCourses}</dd>
                        </motion.div>

                        <motion.div variants={item} className="stat-card bg-[#EEF7E8] dark:bg-slate-900">
                            <dt className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                <div className="p-1.5 rounded bg-[#A2CD85] border border-black text-black shadow-[1px_1px_0px_#111111]">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                </div>
                                Lessons Completed
                            </dt>
                            <dd className="mt-3 font-mono text-3xl font-black text-black dark:text-white">{lessonsCompleted}</dd>
                        </motion.div>

                        <motion.div variants={item} className="stat-card bg-[#FFF0E8] dark:bg-slate-900">
                            <dt className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                <div className="p-1.5 rounded bg-[#FF9864] border border-black text-black shadow-[1px_1px_0px_#111111]">
                                    <Trophy className="h-3.5 w-3.5" />
                                </div>
                                Mean Quiz Score
                            </dt>
                            <dd className="mt-3 font-mono text-3xl font-black text-black dark:text-white">{averageScore}%</dd>
                        </motion.div>
                    </div>

                    {/* Leaderboards and Accomplishments split block panel grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <AchievementsList achievements={achievements} />
                        </div>
                        <div className="w-full">
                            <Leaderboard users={leaderboard} />
                        </div>
                    </div>

                    {/* Recommended Content Sections Module Loader List */}
                    <motion.div variants={item}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-black uppercase tracking-wider text-[var(--black)]">Recommended Modules For You</h2>
                            <Link href="/dashboard/courses" className="text-[10px] font-black text-[var(--blue)] border-b-2 border-black dark:border-white uppercase tracking-wider pb-0.5 hover:text-blue-500 transition-colors">
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