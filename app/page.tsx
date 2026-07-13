'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import CoursePath from '@/components/home/CoursePath';
import LeaderboardSection from '@/components/home/LeaderboardSection';
import WhyAndCommunity from '@/components/home/WhyAndCommunity';
import FinalCta from '@/components/home/FinalCta';
// Fixed path declaration to direct layout component location
import DashboardLoading from './dashboard/loading'; 

//  Fixed naming layout: Removed the invalid space to satisfy TS parser engine
export default function MarketingFunnelPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          //  User has logged in before -> silently auto-log back in and skip landing page completely
          router.replace('/dashboard');
        } else {
          // No session found -> allow anonymous visitor to view the marketing front page
          setIsCheckingSession(false);
        }
      } catch (error) {
        console.error('Session interception error:', error);
        setIsCheckingSession(false);
      }
    };

    checkActiveSession();
  }, [supabase, router]);

  // While processing the auto-login flag, render the flat loading state skeleton for premium feel
  if (isCheckingSession) {
    return <DashboardLoading />;
  }

  return (
    <div className="bg-[#F1EAD9] min-h-screen overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <CoursePath />
      <LeaderboardSection />
      <WhyAndCommunity />
      <FinalCta />
    </div>
  );
}