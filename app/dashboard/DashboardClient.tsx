'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, CheckCircle, Trophy, ArrowRight, Sparkles } from 'lucide-react';
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
    return (
        <div className="min-h-screen bg-[#F1EAD9] text-[#111111] py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                
                {/* Header Block Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 p-6 bg-[#FBF8F1] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111]"
                >
                    <h1 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl mb-1">
                        Welcome back, <span className="bg-[#FF9864] border border-black px-2 py-0.5 rounded-md inline-block transform -rotate-1 shadow-[2px_2px_0px_#111111] text-xs font-mono">{user.user_metadata.name || 'Learner'}</span>
                    </h1>
                    <p className="text-sm font-medium text-gray-700 mt-2">
                        Ready to continue cracking open the market layout mechanics? Let's check your stats.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-10"
                >
                    {/* High-Contrast Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        
                        {/* Stat 1 */}
                        <motion.div variants={item} className="stat-card bg-[#EEF3FF]">
                            <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-gray-700">
                                <div className="p-2 rounded-lg bg-[#528CF0] border border-black text-white shadow-[1.5px_1.5px_0px_#111111]">
                                    <BookOpen className="h-4 w-4" />
                                </div>
                                Courses Available
                            </dt>
                            <dd className="mt-4 font-mono text-4xl font-black text-black">{totalCourses}</dd>
                        </motion.div>

                        {/* Stat 2 */}
                        <motion.div variants={item} className="stat-card bg-[#EEF7E8]">
                            <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-gray-700">
                                <div className="p-2 rounded-lg bg-[#A2CD85] border border-black text-black shadow-[1.5px_1.5px_0px_#111111]">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                                Lessons Completed
                            </dt>
                            <dd className="mt-4 font-mono text-4xl font-black text-black">{lessonsCompleted}</dd>
                        </motion.div>

                        {/* Stat 3 */}
                        <motion.div variants={item} className="stat-card bg-[#FFF0E8]">
                            <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-gray-700">
                                <div className="p-2 rounded-lg bg-[#FF9864] border border-black text-black shadow-[1.5px_1.5px_0px_#111111]">
                                    <Trophy className="h-4 w-4" />
                                </div>
                                Average Quiz Score
                            </dt>
                            <dd className="mt-4 font-mono text-4xl font-black text-black">{averageScore}%</dd>
                        </motion.div>
                    </div>

                    {/* Gamification Grid Component Block Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <AchievementsList achievements={achievements} />
                        </div>
                        <div>
                            <Leaderboard users={leaderboard} />
                        </div>
                    </div>

                    {/* Quick Actions Asymmetric Button Grid */}
                    <motion.div variants={item} className="p-6 bg-[#FBF8F1] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111]">
                        <h2 className="text-sm font-black uppercase tracking-wider text-black mb-5 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#FF9864]" />
                            Quick Actions Playground
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            
                            <Link href="/dashboard/tutor" className="group p-4 border-2 border-black rounded-xl bg-[#EEF3FF] shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all flex flex-col justify-between">
                                <div>
                                    <span className="text-2xl border border-black p-1 bg-white rounded-md inline-block shadow-[1px_1px_0px_#111111]">🤖</span>
                                    <h3 className="text-xs font-black uppercase tracking-wide mt-3 text-black">AI Market Tutor</h3>
                                    <p className="text-[11px] text-gray-600 font-medium mt-1">Get interactive answers regarding market jargon.</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#528CF0] uppercase tracking-wider">
                                    <span>Chat →</span>
                                </div>
                            </Link>

                            <Link href="/dashboard/courses" className="group p-4 border-2 border-black rounded-xl bg-white shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all flex flex-col justify-between">
                                <div>
                                    <span className="text-2xl border border-black p-1 bg-white rounded-md inline-block shadow-[1px_1px_0px_#111111]">📚</span>
                                    <h3 className="text-xs font-black uppercase tracking-wide mt-3 text-black">Browse Modules</h3>
                                    <p className="text-[11px] text-gray-600 font-medium mt-1">Explore structured learning tracks.</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-black uppercase tracking-wider">
                                    <span>Explore →</span>
                                </div>
                            </Link>

                            <Link href="/simulator" className="group p-4 border-2 border-black rounded-xl bg-[#EEF7E8] shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all flex flex-col justify-between">
                                <div>
                                    <span className="text-2xl border border-black p-1 bg-white rounded-md inline-block shadow-[1px_1px_0px_#111111]">📊</span>
                                    <h3 className="text-xs font-black uppercase tracking-wide mt-3 text-black">Trading Simulator</h3>
                                    <p className="text-[11px] text-gray-600 font-medium mt-1">Simulate a mock portfolio sandbox environment.</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#7aad5c] uppercase tracking-wider">
                                    <span>Simulate →</span>
                                </div>
                            </Link>

                            <Link href="/brokers" className="group p-4 border-2 border-black rounded-xl bg-[#FFF0E8] shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all flex flex-col justify-between">
                                <div>
                                    <span className="text-2xl border border-black p-1 bg-white rounded-md inline-block shadow-[1px_1px_0px_#111111]">🏛️</span>
                                    <h3 className="text-xs font-black uppercase tracking-wide mt-3 text-black">Compare Brokers</h3>
                                    <p className="text-[11px] text-gray-600 font-medium mt-1">Locate SEC-regulated investment channels.</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#FF9864] uppercase tracking-wider">
                                    <span>View →</span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Recommended Content Area Track Layout */}
                    <motion.div variants={item}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-sm font-black uppercase tracking-wider text-black">Recommended for You</h2>
                            <Link href="/dashboard/courses" className="text-xs font-bold text-[#528CF0] border-b-2 border-black uppercase tracking-wide pb-0.5 hover:text-blue-600 transition-colors">
                                View all modules →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {suggestedCourses?.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}