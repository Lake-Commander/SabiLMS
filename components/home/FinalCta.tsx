'use client';
import React from 'react';

export default function FinalCta() {
  return (
    <section id="final-cta" className="bg-[#A2CD85] border-t-4 border-b-4 border-black py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        
        {/* Left Aspect Grid Content */}
        <div className="max-w-2xl space-y-6 text-black">
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-none">
            READY TO STOP<br/>WATCHING FROM<br/>THE SIDELINES?
          </h2>
          <p className="text-black/80 font-medium text-lg max-w-md">
            Join a growing community of Nigerians learning to invest on the NGX. Start free today[cite: 1].
          </p>
          <div className="pt-2">
            <button className="inline-flex items-center bg-black text-white border-2 border-black font-display font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-[5px_5px_0_rgba(0,0,0,0.25)] hover:translate-y-0.5 transition">
              Start Learning Free →
            </button>
          </div>
          <p className="text-xs text-black/50">Takes 30 seconds. No credit card required[cite: 1].</p>
        </div>

        {/* Floating Background Accent Graphic Box for Neo-Brutalist alignment */}
        <div className="hidden md:flex w-75 h-62.5 border-4 border-black bg-[#FBF8F1] rounded-2xl transform rotate-3 flex-col justify-center p-6 shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
          <div className="text-xs font-black tracking-widest uppercase">NGX INDEX 📈</div>
          <div className="text-3xl font-black text-emerald-600 mt-2">+45.9%</div>
          <div className="text-[10px] font-bold text-gray-500 mt-1">Inflation Hedges Activated[cite: 1]</div>
        </div>

      </div>
    </section>
  );
}