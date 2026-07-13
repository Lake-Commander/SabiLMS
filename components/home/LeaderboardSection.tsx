'use client';
import React from 'react';
import { Trophy } from 'lucide-react';

export default function LeaderboardSection() {
  const ranks = [
    { pos: '#1', name: 'Emeka Okonkwo', xp: '2,450 XP', badge: '🇳🇬 Naija Stock Pro', primary: true },
    { pos: '#2', name: 'Chidinma Eze', xp: '1,980 XP', badge: '📊 Chart Master', primary: false },
    { pos: '#3', name: 'Tunde Babatunde', xp: '1,720 XP', badge: '💰 Dividend Hunter', primary: false },
    { pos: '#4', name: 'Aisha Mohammed', xp: '1,340 XP', badge: '🐂 Bull Whisperer', primary: false },
    { pos: '#5', name: 'Kemi Adeyemi', xp: '980 XP', badge: '📈 Market Rookie', primary: false },
  ];

  return (
    <section id="leaderboard" className="bg-black text-[#FBF8F1] border-t-4 border-black py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Text Grid Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 border border-[#FF9864] rounded-full px-4 py-1 text-xs font-bold uppercase text-[#FF9864]">
            <Trophy className="w-3 h-3" /> WEEKLY LEADERBOARD
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white leading-none">
            WHO'S<br/><span className="text-[#FF9864]">WINNING</span><br/>THIS WEEK?
          </h2>
          <p className="text-gray-400 text-sm max-w-md">
            Top learners earn XP, unlock exclusive badges, and get bragging rights. Hit the top 3 to claim a permanent flex[cite: 1].
          </p>

          {/* Rendered List Frame */}
          <div className="space-y-3 pt-2">
            {ranks.map((r, i) => (
              <div 
                key={i} 
                className={`flex flex-wrap items-center justify-between gap-4 p-4 border rounded-xl transition-all hover:translate-x-1 ${
                  r.primary 
                    ? 'border-[#FF9864] bg-[#FF9864]/10 shadow-[4px_4px_0_#FF9864]' 
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm font-bold ${r.primary ? 'text-[#FF9864]' : 'text-white/40'}`}>{r.pos}</span>
                  <span className="text-sm font-semibold uppercase font-display tracking-tight text-white">{r.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-[#FF9864]">{r.xp}</span>
                  <span className={`text-[10px] font-display font-bold px-2 py-1 rounded border ${
                    r.primary ? 'bg-[#FF9864] text-black border-[#FF9864]' : 'bg-white/5 border-white/20'
                  }`}>{r.badge}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button className="neo-btn bg-[#A2CD85] text-black">Join the Leaderboard →</button>
          </div>
        </div>

        {/* Right Graphical Side Panel Asset */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
          <div className="w-90 h-90 bg-white/5 border-2 border-white/10 rounded-2xl p-8 relative flex flex-col justify-end">
            <div className="text-7xl absolute top-10 left-10 animate-bounce">🏆</div>
            <div className="font-display text-4xl font-black tracking-tighter text-[#FF9864] opacity-80 leading-none">
              NAIJA <br />NUMBER <br />ONE
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}