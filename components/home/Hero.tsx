'use client';
import React from 'react';
import { CheckCircle, Trophy, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center px-4 md:px-8 py-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Headline Engine */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex border-2 border-black bg-white rounded-full px-4 py-1 text-xs font-black uppercase">
            🇳🇬 Nigeria's #1 Stock Market School
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-none">
            Master the<br />Nigerian<br />
            <span className="text-[#A2CD85]">Stock Market.</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-lg">
            Learn from zero. Earn XP. Unlock badges. And when you're ready — invest with confidence.
          </p>
          <div className="pt-2">
            <button className="neo-btn bg-[#A2CD85] text-black text-sm px-8 py-4">Start Learning Free →</button>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-600 pt-4">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#A2CD85]" /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#A2CD85]" /> No jargon</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#A2CD85]" /> Built for Nigerians</span>
          </div>
        </div>

        {/* Right Graphical Float Stack */}
        <div className="lg:col-span-5 h-100 relative hidden sm:block w-full max-w-125 mx-auto">
          {/* Card 1 — Module */}
          <div className="absolute bottom-0 left-0 w-64 bg-[#A2CD85] border-2 border-black rounded-xl p-5 shadow-black animate-float-1 z-10">
            <div className="text-[9px] font-black tracking-wider text-gray-800 uppercase mb-1">MODULE 01</div>
            <div className="text-xl font-black uppercase mb-2">NGX BASICS</div>
            <p className="text-xs text-gray-800 mb-4 font-medium">"What is a stock? How does the NGX work?"</p>
            <span className="text-xs font-mono font-black bg-black/10 border border-black/30 rounded px-2 py-1">+100 XP</span>
          </div>

          {/* Card 2 — Leaderboard */}
          <div className="absolute top-10 left-16 w-72 bg-white border-2 border-black rounded-xl p-4 shadow-black animate-float-2 z-20">
            <div className="flex items-center gap-2 mb-3 font-black text-xs">
              <Trophy className="w-4 h-4 text-[#FF9864]" /> LEADERBOARD
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-[#FFF0E8] border border-[#FF9864] rounded-lg font-bold">
                <span>#1 Emeka O.</span> <span className="font-mono text-[#FF9864]">2,450</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-600">
                <span>#2 Chidinma A.</span> <span className="font-mono">1,980</span>
              </div>
            </div>
          </div>

          {/* Card 3 — Progress Tag */}
          <div className="absolute top-0 right-0 w-56 bg-[#FF9864] border-2 border-black rounded-xl p-4 shadow-black animate-float-3 z-30">
            <div className="text-[9px] font-black text-black/60 uppercase tracking-widest flex items-center gap-1"><Zap className="w-3 h-3" /> Progress</div>
            <div className="text-xs font-black uppercase mt-1 leading-tight">LEVEL 1<br />KOBO LEARNER</div>
            <div className="w-full bg-black/10 h-2 rounded mt-2 overflow-hidden border border-black/20">
              <div className="bg-black h-full w-[35%]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}