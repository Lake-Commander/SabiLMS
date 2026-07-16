// app/dashboard/market/MarketClient.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";

export default function MarketClient() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch on theme load
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

    // Determine standard TradingView theme properties synced to your app's theme
    const isDark = resolvedTheme === 'dark';
    const tvTheme = isDark ? 'dark' : 'light';
    const bgColor = isDark ? '#111111' : '#ffffff'; // Match Neo-Brutalist backgrounds
    
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    // Dynamically inject the correct color theme into the static constants
    const getThemeConfig = (baseConfig: any, forceSolidBg = false) => ({
        ...baseConfig,
        colorTheme: tvTheme,
        isTransparent: !forceSolidBg,
        backgroundColor: bgColor
    });

    return (
        <div className="flex flex-col gap-10 w-full max-w-[1400px] mx-auto pb-16 pt-6 px-4 sm:px-6">
            
            {/* Neo-Brutalist Page Header */}
            <div className="flex flex-col gap-3 border-b-2 border-dashed border-black/10 dark:border-white/10 pb-8">
                <div className="flex items-center gap-3">
                    <span className="bg-[var(--orange)] border-2 border-black text-black text-[10px] font-mono font-black px-3 py-1 rounded shadow-[2.5px_2.5px_0px_#111111] uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" /> Live Feed
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
                        Market Intelligence
                    </h1>
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    Real-time macro tracking, sectoral heatmaps, and breaking financial stories. Monitor the heartbeat of the Nigerian Stock Exchange and global assets.
                </p>
            </div>

            {/* Row 1: Macro & Heatmap */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <h2 className="text-sm font-black uppercase tracking-wider text-black dark:text-white">
                        Sector Performance & Overview
                    </h2>
                </div>
                
                <div className="grid w-full gap-6 lg:grid-cols-3">
                    {/* Market Overview */}
                    <div className="lg:col-span-1 h-[550px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111111] dark:hover:shadow-[8px_8px_0px_#ffffff20]">
                        <TradingViewWidget
                            key={`overview-${tvTheme}`} // Forces secure iframe re-render on theme toggle
                            scriptUrl={`${scriptUrl}market-overview.js`}
                            config={getThemeConfig(MARKET_OVERVIEW_WIDGET_CONFIG)}
                            className="absolute inset-0 w-full h-full"
                            height={550}
                        />
                    </div>

                    {/* Heatmap */}
                    <div className="lg:col-span-2 h-[550px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111111] dark:hover:shadow-[8px_8px_0px_#ffffff20]">
                        <TradingViewWidget
                            key={`heatmap-${tvTheme}`}
                            scriptUrl={`${scriptUrl}stock-heatmap.js`}
                            config={getThemeConfig(HEATMAP_WIDGET_CONFIG)}
                            className="absolute inset-0 w-full h-full"
                            height={550}
                        />
                    </div>
                </div>
            </section>

            {/* Row 2: News & Quotes */}
            <section className="space-y-4 pt-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-sm font-black uppercase tracking-wider text-black dark:text-white">
                        Live Quotes & Press
                    </h2>
                </div>

                <div className="grid w-full gap-6 lg:grid-cols-3">
                    {/* Top Stories Timeline */}
                    <div className="lg:col-span-1 h-[600px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111111] dark:hover:shadow-[8px_8px_0px_#ffffff20]">
                        <TradingViewWidget
                            key={`stories-${tvTheme}`}
                            scriptUrl={`${scriptUrl}timeline.js`}
                            config={getThemeConfig(TOP_STORIES_WIDGET_CONFIG)}
                            className="absolute inset-0 w-full h-full"
                            height={600}
                        />
                    </div>

                    {/* Market Quotes Screener */}
                    <div className="lg:col-span-2 h-[600px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111111] dark:hover:shadow-[8px_8px_0px_#ffffff20]">
                        <TradingViewWidget
                            key={`quotes-${tvTheme}`}
                            scriptUrl={`${scriptUrl}market-quotes.js`}
                            config={getThemeConfig(MARKET_DATA_WIDGET_CONFIG, true)} // Forces solid bg so text doesn't clash with table lines
                            className="absolute inset-0 w-full h-full"
                            height={600}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}