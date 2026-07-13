'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterSelector() {
  const pathname = usePathname();
  
  //  Banish marketing layouts inside the dashboard app shell
  // If path starts with /dashboard or /simulator, completely omit the public footer
  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/simulator');

  if (isDashboardRoute) {
    return null; // Keeps the SaaS layout perfectly clean and isolated
  }

  // Render public variant with conditional newsletter on root homepage
  const showNewsletterBox = pathname === "/";
  return <Footer showNewsletter={showNewsletterBox} />;
}