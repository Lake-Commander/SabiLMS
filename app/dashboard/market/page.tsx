// app/dashboard/market/page.tsx
import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import { createClient } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarChart3, Globe2, Newspaper, TrendingUp } from "lucide-react";

export default async function MarketIntelligencePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/auth/login'); 

    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col gap-10 w-full max-w-[1400px] mx-auto pb-16 pt-6 px-4 sm:px-6">
            
            {/* Page Header */}
            <div className="flex flex-col gap-3 border-b-2 border-dashed border-black/10 dark:border-white/10 pb-8">
                <div className="flex items-center gap-3">
                    <span className="bg-[var(--orange)] border-2 border-black text-black text-[10px] font-mono font-black px-3 py-1 rounded shadow-[2px_2px_0px_#111111] uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" /> Live Feed
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
                        Market Intelligence
                    </h1>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    Real-time macro tracking, sectoral heatmaps, and breaking financial stories. Monitor the heartbeat of the Nigerian Stock Exchange and global assets.
                </p>
            </div>

            {/* Row 1: Macro & Heatmap */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Globe2 className="w-5 h-5 text-gray-500" />
                    <h2 className="text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                        Sector Performance & Overview
                    </h2>
                </div>
                
                <div className="grid w-full gap-6 lg:grid-cols-3">
                    {/* Market Overview */}
                    <div className="lg:col-span-1 h-[550px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#000000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            title="Market Overview"
                            scriptUrl={`${scriptUrl}market-overview.js`}
                            config={MARKET_OVERVIEW_WIDGET_CONFIG}
                            className="absolute inset-0 w-full h-full"
                            height={550}
                        />
                    </div>

                    {/* Heatmap */}
                    <div className="lg:col-span-2 h-[550px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#000000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            title="Stock Heatmap"
                            scriptUrl={`${scriptUrl}stock-heatmap.js`}
                            config={HEATMAP_WIDGET_CONFIG}
                            className="absolute inset-0 w-full h-full"
                            height={550}
                        />
                    </div>
                </div>
            </section>

            {/* Row 2: News & Quotes */}
            <section className="space-y-4 pt-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-gray-500" />
                        <h2 className="text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            Live Quotes & Press
                        </h2>
                    </div>
                </div>

                <div className="grid w-full gap-6 lg:grid-cols-3">
                    {/* Top Stories Timeline */}
                    <div className="lg:col-span-1 h-[600px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#000000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            scriptUrl={`${scriptUrl}timeline.js`}
                            config={TOP_STORIES_WIDGET_CONFIG}
                            className="absolute inset-0 w-full h-full"
                            height={600}
                        />
                    </div>

                    {/* Market Quotes Screener */}
                    <div className="lg:col-span-2 h-[600px] relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#000000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            scriptUrl={`${scriptUrl}market-quotes.js`}
                            config={MARKET_DATA_WIDGET_CONFIG}
                            className="absolute inset-0 w-full h-full"
                            height={600}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}