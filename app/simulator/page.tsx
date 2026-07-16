// check2/app/simulator/page.tsx
import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import SimulatorClient from "./SimulatorClient";
import { createClient } from "@/lib/auth"; // Adjust this import if your Supabase client is elsewhere
import { redirect } from "next/navigation";
import { getOrCreatePortfolio } from "@/lib/actions/simulation.actions";
import { getActiveCompanies, getMarketSnapshot } from "@/lib/actions/ngnmarket.actions";

export default async function SimulatorPage() {
    // 1. Secure the route with Supabase Auth
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login'); 
    }

    // 2. Fetch the local NGN trading data for the Simulator Execution Desk concurrently
    // (Assuming these server actions are setup from our previous steps)
    const [portfolio, companies, macro] = await Promise.all([
        getOrCreatePortfolio(user.id),
        getActiveCompanies(),
        getMarketSnapshot()
    ]);

    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col min-h-screen gap-12 w-full max-w-[1400px] mx-auto pb-20">
            
            {/* =========================================================
                SECTION 1: GLOBAL MARKET ANALYTICS (From Signalist/Check)
                ========================================================= */}
            <div className="space-y-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-black text-white text-[10px] font-mono font-black px-2.5 py-0.5 rounded uppercase tracking-wide">
                        Global Macro
                    </span>
                    <h1 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                        Market Intelligence
                    </h1>
                </div>

                <section className="grid w-full gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1 h-[600px] rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            title="Market Overview"
                            scriptUrl={`${scriptUrl}market-overview.js`}
                            config={MARKET_OVERVIEW_WIDGET_CONFIG}
                            className="custom-chart"
                            height={600}
                        />
                    </div>
                    <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            title="Stock Heatmap"
                            scriptUrl={`${scriptUrl}stock-heatmap.js`}
                            config={HEATMAP_WIDGET_CONFIG}
                            height={600}
                        />
                    </div>
                </section>

                <section className="grid w-full gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1 h-[600px] rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            scriptUrl={`${scriptUrl}timeline.js`}
                            config={TOP_STORIES_WIDGET_CONFIG}
                            height={600}
                        />
                    </div>
                    <div className="lg:col-span-2 h-[600px] rounded-xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#111111]">
                        <TradingViewWidget
                            scriptUrl={`${scriptUrl}market-quotes.js`}
                            config={MARKET_DATA_WIDGET_CONFIG}
                            height={600}
                        />
                    </div>
                </section>
            </div>

            {/* =========================================================
                SECTION 2: NGX TRADE EXECUTION DESK (Sabistok Custom)
                ========================================================= */}
            <div className="space-y-6 pt-12 border-t-4 border-dashed border-black/10">
                <div className="flex items-center gap-2">
                    <span className="bg-[#A2CD85] border-2 border-black text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
                        Live Sandbox
                    </span>
                    <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                        Execution Terminal
                    </h2>
                </div>

                {/* This mounts your local NGN Market Client we built with the buy/sell logic */}
                <SimulatorClient
                    user={user}
                    initialPortfolio={portfolio}
                    marketStocks={companies}
                    macro={macro}
                />
            </div>
            
        </div>
    );
}