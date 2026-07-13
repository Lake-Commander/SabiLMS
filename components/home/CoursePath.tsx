'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function CoursePath() {
  const [m1Open, setM1Open] = useState(false);

  const modules = [
    { id: '02', name: 'How to Invest', desc: 'Opening your account. Market vs limit orders. Building your first portfolio[cite: 1].', xp: '+100 XP' },
    { id: '03', name: 'Key Terms', desc: 'EPS, P/E ratio, dividend yield, ROE, market cap — decoded in plain English[cite: 1].', xp: '+100 XP' },
    { id: '04', name: 'Fundamental Analysis', desc: 'Read financial statements. Spot red flags. Value stocks like a pro[cite: 1].', xp: '+150 XP' },
    { id: '05', name: 'Market Mechanics', desc: 'NGX trading hours, T+3 settlement, corporate actions, indices explained[cite: 1].', xp: '+100 XP' },
    { id: '06', name: 'Investment Strategies', desc: 'Buy & hold, dividend investing, sector rotation, cost averaging. Your playbook[cite: 1].', xp: '+150 XP' },
  ];

  return (
    <section id="course-path" className="bg-[#F1EAD9] border-t-4 border-black py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block bg-[#FF9864] border-2 border-black rounded-full px-4 py-1 text-xs font-bold uppercase">What You'll Learn</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight">6 Modules. Fully Structured.<br/><span className="text-[#A2CD85]">Start Free Today.</span></h2>
          <p className="text-gray-700">Each module unlocks after you pass the previous quiz. No skipping ahead — you build a real foundation, not gaps[cite: 1].</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1: Unlocked Interaction */}
          <div 
            onClick={() => setM1Open(!m1Open)}
            className="border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#111111] transition-all duration-150 cursor-pointer bg-[#EEF7E8] border-l-8 border-l-[#A2CD85]"
          >
            <div className="flex items-start gap-4">
              <div className="font-mono text-2xl font-bold text-[#A2CD85]">01</div>
              <div className="flex-1 space-y-2">
                <div className="font-display font-black text-sm uppercase">NGX Basics</div>
                <p className="text-xs text-gray-600">What is the stock exchange? How shares work. Bulls, bears, and market cycles[cite: 1].</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-[#FF9864] border border-black text-[10px] font-mono font-bold rounded px-2 py-0.5">+100 XP</span>
                  <span className="bg-[#A2CD85] border border-black text-[10px] font-display font-bold text-white rounded px-2 py-0.5 uppercase">Unlocked</span>
                </div>

                {m1Open && (
                  <div className="pt-4 mt-2 border-t border-dashed border-[#A2CD85] space-y-3 animate-fadeIn">
                    <p className="text-xs text-[#7aad5c] font-medium">📚 6 lessons · ⏱ ~30 mins · 🧠 5-question quiz[cite: 1]</p>
                    <Link href="/learn" onClick={(e) => e.stopPropagation()} className="inline-flex bg-[#A2CD85] border-2 border-black rounded-lg px-4 py-2 font-display font-bold text-[11px] uppercase shadow-[2px_2px_0_#111111] hover:translate-y-0.5 transition">
                      START MODULE →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Locked Modules */}
          {modules.map((m) => (
            <div key={m.id} className="bg-[#FBF8F1] border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#111111] opacity-60 relative group">
              <div className="flex items-start gap-4">
                <div className="font-mono text-2xl font-bold text-black/20">{m.id}</div>
                <div className="flex-1 space-y-2">
                  <div className="font-display font-black text-sm uppercase">{m.name}</div>
                  <p className="text-xs text-gray-500">{m.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-[#FF9864] border border-black text-[10px] font-mono font-bold rounded px-2 py-0.5">{m.xp}</span>
                    <span className="bg-gray-200 text-gray-500 border border-gray-400 text-[10px] font-display font-bold rounded px-2 py-0.5 uppercase flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button className="neo-btn bg-[#A2CD85] text-black font-display text-xs px-8 py-4">
            Sign Up to Start Module 1 →
          </button>
        </div>
      </div>
    </section>
  );
}