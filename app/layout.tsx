'use client';

import { Space_Grotesk, Unbounded } from "next/font/google";
import { usePathname } from "next/navigation"; // 👈 Add this to catch the active route path
import "@/app/globals.css"; 
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/common/Navbar";
import FooterSelector from "@/components/common/FooterSelector";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

const unbounded = Unbounded({ 
  subsets: ["latin"], 
  variable: "--font-display" 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  //  Banish the public header from injecting itself into the SaaS application area
  // If the path starts with /dashboard, /simulator, or /brokers, this flag turns true
  const isSaasWorkspace = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/simulator') || 
    pathname.startsWith('/brokers');

  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#F1EAD9] text-[#111111] antialiased flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            
            {/* ONLY render public navbar if we are NOT inside the application shell */}
            {!isSaasWorkspace && <Navbar />}
            
            {/* Main Content Area */}
            <main className={`flex-1 w-full flex flex-col ${!isSaasWorkspace ? 'pt-16' : ''}`}>
              {children}
            </main>
            
            {/* Dynamic Adaptive Footer Layer */}
            <FooterSelector />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}