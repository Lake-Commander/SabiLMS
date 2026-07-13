'use client';
import React, { useState } from 'react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // This is where your Supabase Edge Function or newsletter service connects
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="w-full bg-[#FF9864] border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#111111] text-black">
      <div className="max-w-md space-y-2">
        <h3 className="text-sm font-black uppercase tracking-wider">Get Market Intelligence </h3>
        <p className="text-xs font-medium text-black/80 leading-relaxed">
          Join other subscribers receiving our weekly NGX digest breakdown. No spam, no ginger, just pure facts.
        </p>
      </div>
      
      <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com" 
          required
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 border-2 border-black rounded-lg px-4 py-2.5 text-xs font-medium bg-[#FBF8F1] outline-none text-black placeholder:text-gray-400 focus:shadow-[2px_2px_0_#111111] transition-all disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={status === 'loading' || status === 'success'}
          className="inline-flex items-center justify-center bg-black text-white border-2 border-black font-display font-black text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all active:translate-y-0.5 disabled:opacity-50"
        >
          {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined! 🎉' : 'Subscribe →'}
        </button>
      </form>
    </div>
  );
}