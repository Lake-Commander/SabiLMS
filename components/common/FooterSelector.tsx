'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterSelector() {
  const pathname = usePathname();
  
  // Conditionally show newsletter ONLY on the homepage root dashboard route ("/")
  const showNewsletterBox = pathname === "/";

  return <Footer showNewsletter={showNewsletterBox} />;
}