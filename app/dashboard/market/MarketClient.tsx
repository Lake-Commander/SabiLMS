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

    // Determine standard TradingView theme properties
    const isDark = resolvedTheme === 'dark';
    const tvTheme = isDark ? 'dark' : 'light';
    const bgColor = isDark ? '#131722' : '#ffffff';
    
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    // Dynamically inject the correct color theme into the static constants
    const getThemeConfig = (baseConfig: any, forceSolidBg = false) => ({
        ...baseConfig,
        colorTheme: tvTheme,
        isTransparent: !forceSolidBg,
        backgroundColor: bgColor
    });

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 pt-4 px-2 sm:px-4">
            
            {/* Minimalist Page Header */}
            <div className="flex flex-col gap-1 border-b border-gray-200 dark:border-[#2a2e39] pb-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                        Market Intelligence
                    </h1>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                        Live Data
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Real-time macro tracking, sectoral heatmaps, and breaking financial stories.
                </p>
            </div>

            {/* Row 1: Macro & Heatmap */}
            <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">
                    Sector Performance & Overview
                </h2>
                
                <div className="grid w-full gap-4 lg:grid-cols-3">
                    {/* Market Overview */}
                    <div className="lg:col-span-1 h-[550px] relative bg-white dark:bg-[#131722] rounded border border-gray-200 dark:border-[#2a2e39] overflow-hidden shadow-sm">
                        <TradingViewWidget
                            key={`overview-${tvTheme}`} // Forces re-render on theme change
                            scriptUrl={`${scriptUrl}market-overview.js`}
                            config={getThemeConfig(MARKET_OVERVIEW_WIDGET_CONFIG)}
                            className="absolute inset-0 w-full h-full"
                            height={550}
                        />
                    </div>

                    {/* Heatmap */}
                    <div className="lg:col-span-2 h-[550px] relative bg-white dark:bg-[#131722] rounded border border-gray-200 dark:border-[#2a2e39] overflow-hidden shadow-sm">
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
            <section className="space-y-3 pt-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">
                    Live Quotes & Press
                </h2>

                <div className="grid w-full gap-4 lg:grid-cols-3">
                    {/* Top Stories Timeline */}
                    <div className="lg:col-span-1 h-[600px] relative bg-white dark:bg-[#131722] rounded border border-gray-200 dark:border-[#2a2e39] overflow-hidden shadow-sm">
                        <TradingViewWidget
                            key={`stories-${tvTheme}`}
                            scriptUrl={`${scriptUrl}timeline.js`}
                            config={getThemeConfig(TOP_STORIES_WIDGET_CONFIG)}
                            className="absolute inset-0 w-full h-full"
                            height={600}
                        />
                    </div>

                    {/* Market Quotes Screener */}
                    <div className="lg:col-span-2 h-[600px] relative bg-white dark:bg-[#131722] rounded border border-gray-200 dark:border-[#2a2e39] overflow-hidden shadow-sm">
                        <TradingViewWidget
                            key={`quotes-${tvTheme}`}
                            scriptUrl={`${scriptUrl}market-quotes.js`}
                            config={getThemeConfig(MARKET_DATA_WIDGET_CONFIG, true)} // Forces solid bg for quotes table legibility
                            className="absolute inset-0 w-full h-full"
                            height={600}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}