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

export default async function MarketIntelligencePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/auth/login'); 

    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-12 pt-4 px-4 sm:px-6">
            
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-black text-white text-[10px] font-mono font-black px-2.5 py-0.5 rounded uppercase tracking-wide">
                    Global Macro
                </span>
                <h1 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                    Market Intelligence
                </h1>
            </div>

            <section className="grid w-full gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 h-[600px] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20]">
                    <TradingViewWidget
                        title="Market Overview"
                        scriptUrl={`${scriptUrl}market-overview.js`}
                        config={MARKET_OVERVIEW_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20]">
                    <TradingViewWidget
                        title="Stock Heatmap"
                        scriptUrl={`${scriptUrl}stock-heatmap.js`}
                        config={HEATMAP_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>

            <section className="grid w-full gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 h-[600px] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20]">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
                <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden border-2 border-black dark:border-white/20 shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#ffffff20]">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
        </div>
    );
}