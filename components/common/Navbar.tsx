'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#FBF8F1] border-b-2 border-black">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-black uppercase tracking-tight text-black">
          Sabi<span className="italic font-normal">stok</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-gray-700">
          <Link href="#course-path" className="hover:text-[#A2CD85] transition">Courses</Link>
          <Link href="/brokers" className="hover:text-[#A2CD85] transition">Brokers</Link>
          <Link href="/simulator" className="hover:text-[#A2CD85] transition">Simulator</Link>
          <Link href="#why" className="hover:text-[#A2CD85] transition">About</Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button className="neo-btn bg-[#A2CD85] text-black py-2! px-4!">Start Learning</button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 border-2 border-black rounded-lg bg-white">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#F1EAD9] p-6 flex flex-col gap-4 md:hidden border-t-2 border-black">
          <Link href="#course-path" onClick={() => setIsOpen(false)} className="text-xl font-bold border-b border-black py-2">COURSES</Link>
          <Link href="/brokers" onClick={() => setIsOpen(false)} className="text-xl font-bold border-b border-black py-2">BROKERS</Link>
          <Link href="/simulator" onClick={() => setIsOpen(false)} className="text-xl font-bold border-b border-black py-2">SIMULATOR</Link>
          <button className="neo-btn bg-[#A2CD85] w-full text-center mt-4">Start Learning</button>
        </div>
      )}
    </header>
  );
}