'use client';
import React from 'react';
import Link from 'next/link';
import NewsletterBox from './NewsletterBox';

interface FooterProps {
  showNewsletter?: boolean;
}

export default function Footer({ showNewsletter = false }: FooterProps) {
  return (
    <footer id="footer-resources" className="bg-black text-[#FBF8F1] border-t-4 border-[#A2CD85] py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Newsletter Option Layer */}
        {showNewsletter && (
          <div className="max-w-2xl pb-4 border-b border-white/10">
            <NewsletterBox />
          </div>
        )}

        {/* 
          🔥 Updated Grid System:
          grid-cols-2: Arranges links in neat pairs on mobile instead of a single column
          sm:grid-cols-2: Stays as a pair on small tablets
          lg:grid-cols-4: Snaps out to a full 4-column layout on desktop screens[cite: 1]
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          
          {/* Column 1: Brand details - Spans full width on mobile for better breathing room */}
          <div className="space-y-4 col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-black uppercase tracking-tight text-white block">
              Sabi<span className="italic font-normal">stok</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Nigeria's #1 stock market school. Free education, real gamification, a direct path to invest
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2.5 pt-2">
              <a href="https://x.com/sabistok_ng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 inline-flex items-center justify-center bg-white/5 border-2 border-white/20 rounded-lg text-white hover:bg-white/10 transition" aria-label="Twitter / X">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.74-6.2L4.8 22H2l7-8L2 2h6.91l4.28 5.66L18.244 2zm-1.19 18.4h1.86L7.05 3.5H5.06l11.99 16.9z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 inline-flex items-center justify-center bg-white/5 border-2 border-white/20 rounded-lg text-white hover:bg-white/10 transition" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Learn Tracks */}
          <div className="space-y-3 col-span-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Learn</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link href="/learn" className="hover:text-white transition">NGX Basics</Link></li>
              <li><Link href="/learn" className="hover:text-white transition">How to Invest</Link></li>
              <li><Link href="/learn" className="hover:text-white transition">Key Terms</Link></li>
              <li><Link href="/learn" className="hover:text-white transition">Fundamental Analysis</Link></li>
              <li><Link href="/learn" className="hover:text-white transition">Market Mechanics</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform Grid Info Links */}
          <div className="space-y-3 col-span-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><button type="button" className="hover:text-white transition text-left">Sign Up</button></li>
              <li><button type="button" className="hover:text-white transition text-left">Sign In</button></li>
              <li><Link href="#leaderboard" className="hover:text-white transition">Leaderboard</Link></li>
              <li><Link href="#why" className="hover:text-white transition">About</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal Text Modules */}
          <div className="space-y-3 col-span-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* Global Bottom Disclaimer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-[11px] text-gray-400 font-medium">
          <div>© {new Date().getFullYear()} Sabistok 🇳🇬 — Not affiliated with NGX Group</div>
          <div className="sm:text-right"><strong className="text-[#FF9864] font-bold">For educational purposes only. Not financial advice</strong></div>
        </div>

      </div>
    </footer>
  );
}