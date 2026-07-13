'use client';
import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how" className="bg-[#FBF8F1] border-t-4 border-black py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side Styled Container Asset */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
          <div className="w-100 h-100 bg-[#EEF7E8] border-4 border-black rounded-3xl p-8 relative shadow-[8px_8px_0px_#111111]">
            <div className="absolute top-6 left-6 text-6xl">🎓</div>
            <div className="absolute bottom-8 right-8 text-right font-display text-2xl font-black text-[#7aad5c] leading-tight">
              SABI <br /> THE NGX
            </div>
            <div className="w-full h-4 bg-black/10 rounded-full mt-32 overflow-hidden border-2 border-black">
              <div className="w-2/3 h-full bg-[#A2CD85]" />
            </div>
          </div>
        </div>

        {/* Right Content Engine */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center bg-[#F1EAD9] border-2 border-black rounded-full px-4 py-1 text-xs font-black tracking-widest uppercase">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-none">
            LEARN IT.<br/>PROVE IT.<br/><span className="text-[#A2CD85]">INVEST IT.</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-xl">
            Six structured modules. Each one unlocks only after you pass the quiz. No shortcuts, no skipping — just real knowledge, built in the right order.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-5 bg-[#A2CD85] border-2 border-black rounded-xl p-5 shadow-[4px_4px_0_#111111]">
              <div className="font-mono text-3xl font-bold text-black/30">01</div>
              <div>
                <div className="font-display font-black text-sm uppercase">Sign Up Free</div>
                <div className="text-xs font-medium text-black/80">30 seconds. No credit card. No jargon. Just your email.</div>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0_#111111]">
              <div className="font-mono text-3xl font-bold text-black/20">02</div>
              <div>
                <div className="font-display font-black text-sm uppercase">Learn &amp; Earn XP</div>
                <div className="text-xs font-medium text-gray-600">Complete modules, pass quizzes, earn XP and unlock badges as you level up.</div>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-[#FF9864] border-2 border-black rounded-xl p-5 shadow-[4px_4px_0_#111111]">
              <div className="font-mono text-3xl font-bold text-black/30">03</div>
              <div>
                <div className="font-display font-black text-sm uppercase">Invest with Confidence</div>
                <div className="text-xs font-medium text-black/80">Choose a regulated broker and invest from ₦1,000 — put your knowledge to real work.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}