'use client';
import React from 'react';
import { BookOpen, Zap, Gamepad2, Rocket, Star } from 'lucide-react';

export default function WhyAndCommunity() {
  const feedback = [
    { name: 'Chiamaka A.', handle: '@chiamaka_invests', initial: 'CA', color: '#A2CD85', txt: '"I used to think the stock market was for Oga at the top. Sabistok showed me that with ₦5,000 I could start. I bought my first GTCO shares last month[cite: 1]."' },
    { name: 'Tunde Okafor', handle: '@tundeinvests', initial: 'TO', color: '#FF9864', txt: '"The leaderboard got me hooked. I\'m competitive — I redid the Fundamentals quiz three times just to hit top 3. The real win? I actually understand P/E ratios now[cite: 1]."' },
    { name: 'Funmilayo Ibrahim', handle: '@funmi_ph', initial: 'FI', color: '#A2CD85', txt: '"Before this I was putting money in a Ponzi scheme because I didn\'t know better. The module on red flags alone saved me from making another expensive mistake[cite: 1]."' },
    { name: 'Emeka Nwosu', handle: '@emeka_enugu', initial: 'EN', color: '#FF9864', txt: '"My oga been investing for years but I never understood him. After 2 weeks on Sabistok I finally get it. We even discuss DANGCEM now during lunch break[cite: 1]."' },
  ];

  return (
    <>
      {/* WHY SABISTOK */}
      <section id="why" className="bg-[#FBF8F1] border-t-4 border-black py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-6xl font-black uppercase leading-none">
              WHY <span className="text-[#A2CD85]">SABISTOK</span><br/>HITS DIFFERENT
            </h2>
            <p className="text-gray-600 text-lg max-w-lg">
              We respect your time, your intelligence, and your wallet. Three things most "investing courses" don't[cite: 1].
            </p>
          </div>

          {/* Asymmetric Portfolio Tile Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="border-2 border-black rounded-2xl p-6 bg-[#A2CD85] md:row-span-2 flex flex-col justify-between shadow-[5px_5px_0_#111111]">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-xl border-2 border-black flex items-center justify-center"><BookOpen className="w-6 h-6" /></div>
                <div className="font-display text-lg font-black uppercase">NO PAYWALLS. NO JARGON.</div>
                <p className="text-sm text-black/80 leading-relaxed">Quality financial education shouldn't be behind a paywall. Start learning for free today — no credit card, no commitment[cite: 1].</p>
              </div>
              <div className="text-5xl font-black text-black/10 font-display text-right mt-8">01</div>
            </div>

            <div className="border-2 border-black rounded-2xl p-6 bg-white shadow-[5px_5px_0_#111111] space-y-3">
              <div className="text-xs font-bold flex items-center gap-1">🇳🇬 Built for Nigerians</div>
              <p className="text-xs text-gray-600">₦-denominated. Local examples. We speak NGX, not NYSE — every term made for here[cite: 1].</p>
            </div>

            <div className="border-2 border-black rounded-2xl p-6 bg-[#FF9864] shadow-[5px_5px_0_#111111] space-y-3">
              <div className="w-8 h-8 bg-white rounded-lg border border-black flex items-center justify-center"><Zap className="w-4 h-4" /></div>
              <div className="font-display text-sm font-black uppercase">Learn at Your Pace</div>
              <p className="text-xs text-black/70">Bite-sized modules, 5–10 minutes each. No overwhelm, no marathon webinars[cite: 1].</p>
            </div>

            <div className="border-2 border-black rounded-2xl p-6 bg-white shadow-[5px_5px_0_#111111] space-y-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg border border-black flex items-center justify-center"><Gamepad2 className="w-4 h-4" /></div>
              <div className="font-display text-sm font-black uppercase">Earn as You Learn</div>
              <p className="text-xs text-gray-600">XP, badges, levels. Real rewards for real progress — and a leaderboard to keep you honest[cite: 1].</p>
            </div>

            <div className="border-2 border-black rounded-2xl p-6 bg-[#528CF0] shadow-[5px_5px_0_#111111] space-y-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-lg border border-white/40 flex items-center justify-center"><Rocket className="w-4 h-4 text-white" /></div>
              <div className="font-display text-sm font-black uppercase">Direct Path to Invest</div>
              <p className="text-xs text-white/80">Choose from Nigeria's top SEC-regulated investment platforms and invest in 2 minutes when ready[cite: 1].</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY TESTIMONIALS */}
      <section id="testimonials" className="bg-black text-white border-t-4 border-black py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight text-white">
              Loved by our<br/>community. ❤️
            </h2>
            <div className="flex gap-3">
              <a href="https://x.com/sabistok_ng" target="_blank" rel="noopener noreferrer" className="border border-white/20 rounded-lg px-4 py-2 text-xs font-semibold text-white/80 hover:border-white transition">𝕏 Follow on X</a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {feedback.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition duration-150 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center font-display font-black text-xs" style={{ backgroundColor: f.color, color: i % 2 === 0 ? '#fff' : '#111' }}>{f.initial}</div>
                  <div>
                    <div className="text-xs font-bold text-white">{f.name}</div>
                    <div className="text-[10px] text-white/40">{f.handle}</div>
                  </div>
                </div>
                <p className="text-xs text-white/80 leading-relaxed italic">{f.txt}</p>
                <div className="text-[#FF9864] text-xs flex gap-0.5"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}