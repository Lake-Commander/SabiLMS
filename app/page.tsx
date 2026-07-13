// src/app/page.tsx
import React from 'react';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import CoursePath from '@/components/home/CoursePath';
import LeaderboardSection from '@/components/home/LeaderboardSection';
import WhyAndCommunity from '@/components/home/WhyAndCommunity';
import FinalCta from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <div className="bg-[#F1EAD9] min-h-screen">
      <Hero />
      <HowItWorks />
      <CoursePath />
      <LeaderboardSection />
      <WhyAndCommunity />
      <FinalCta />
    </div>
  );
}