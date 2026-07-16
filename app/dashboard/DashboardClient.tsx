'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, CheckCircle, Trophy, Sparkles } from 'lucide-react';
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
    totalCourses,
    lessonsCompleted,
    averageScore,
    suggestedCourses,
    leaderboard,
    achievements
}: DashboardClientProps) {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Context Route Badge */}
                <div className="flex items-center gap-2 select-none">
                    <span className="bg-[var(--green)] border-2 border-black text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
                        Overview
                    </span>
                    <span className="text-xs text-gray-500 font-bold font-mono uppercase tracking-wider">
                        / live Metrics
                    </span>
                </div>

                {/* Performance Metrics Row */}
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

                {/* Engagement Blocks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AchievementsList achievements={achievements} />
                    </div>
                    <div className="w-full">
                        <Leaderboard users={leaderboard} />
                    </div>
                </div>

                {/* Sub-Application Shortcuts Grid */}
                <motion.div variants={item} className="p-5 bg-[#FBF8F1] dark:bg-slate-900 border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111]">
                    <h2 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-4 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#FF9864]" />
                        Sub-Application Shortcuts
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <Link href="/dashboard/tutor" className="p-3 border-2 border-black rounded-lg bg-[#EEF3FF] dark:bg-slate-800 shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                            <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111] dark:text-black">🤖</span>
                            <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black dark:text-white">AI Tutor</h3>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Chat with virtual aids.</p>
                        </Link>

                        <Link href="/dashboard/courses" className="p-3 border-2 border-black rounded-lg bg-white dark:bg-slate-800 shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                            <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111] dark:text-black">📚</span>
                            <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black dark:text-white">Curriculum</h3>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Browse training loops.</p>
                        </Link>

                        <Link href="/dashboard/groups" className="p-3 border-2 border-black rounded-lg bg-[#EEF3FF] dark:bg-slate-800 shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                            <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111] dark:text-black">👥</span>
                            <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black dark:text-white">Study Groups</h3>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Sync up with active circles.</p>
                        </Link>

                        <Link href="/dashboard/playground" className="p-3 border-2 border-black rounded-lg bg-white dark:bg-slate-800 shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                            <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111] dark:text-black">🐍</span>
                            <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black dark:text-white">Playground</h3>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Run sandbox coding frames.</p>
                        </Link>

                        <Link href="/simulator" className="p-3 border-2 border-black rounded-lg bg-[#EEF7E8] dark:bg-slate-800 shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                            <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111] dark:text-black">📊</span>
                            <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black dark:text-white">Simulator</h3>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Test paper investments.</p>
                        </Link>

                        <Link href="/brokers" className="p-3 border-2 border-black rounded-lg bg-[#FFF0E8] dark:bg-slate-800 shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all">
                            <span className="text-lg border border-black px-1 py-0.5 bg-white rounded shadow-[1px_1px_0px_#111111] dark:text-black">🏛️</span>
                            <h3 className="text-[10px] font-black uppercase tracking-wide mt-2 text-black dark:text-white">Brokers</h3>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5 leading-tight">Audit secure trading channels.</p>
                        </Link>
                    </div>
                </motion.div>

                {/* Recommendations Grid */}
                <motion.div variants={item}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-black uppercase tracking-wider text-[var(--black)]">Recommended Modules</h2>
                        <Link href="/dashboard/courses" className="text-[10px] font-black text-[var(--blue)] border-b-2 border-black dark:border-white uppercase tracking-wider pb-0.5 hover:text-blue-500 transition-colors">
                            Full Syllabus →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {suggestedCourses?.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}