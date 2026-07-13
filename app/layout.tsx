import type { Metadata } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
// Fixed path error by using explicit root alias matching your src setup
import "./globals.css"; 
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/common/Navbar";
import FooterSelector from "@/components/common/FooterSelector";

// Initialize Brutalist Font Pairings
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

const unbounded = Unbounded({ 
  subsets: ["latin"], 
  variable: "--font-display" 
});

// ✅ Optimized Server-side Metadata for SEO 
export const metadata: Metadata = {
  title: "Sabistok — Nigeria's #1 Stock Market School",
  description: "Learn the NGX from zero. Earn XP, unlock badges, invest with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#F1EAD9] text-[#111111] antialiased flex flex-col pt-16">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            {/* Global Sticky Navigation Header */}
            <Navbar />
            
            {/* Main Application Page Routing Grid Engine */}
            <main className="flex-1 w-full flex flex-col">
              {children}
            </main>
            
            {/* ✅ Dynamic Adaptive Neo-Brutalist Footer Layer */}
            <FooterSelector />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}