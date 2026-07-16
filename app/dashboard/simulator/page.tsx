// app/dashboard/simulator/page.tsx
import SimulatorClient from "./SimulatorClient";
import { createClient } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getOrCreatePortfolio } from "@/lib/actions/simulation.actions";
import { getActiveCompanies, getMarketSnapshot } from "@/lib/actions/ngnmarket.actions";

export default async function SimulatorPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/auth/login'); 

    const [portfolio, companies, macro] = await Promise.all([
        getOrCreatePortfolio(user.id),
        getActiveCompanies(),
        getMarketSnapshot()
    ]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-12 pt-4 px-4 sm:px-6">
            <div className="flex items-center gap-2">
                <span className="bg-[#A2CD85] border-2 border-black text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
                    Live Sandbox
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                    Execution Terminal
                </h2>
            </div>

            <SimulatorClient
                user={user}
                initialPortfolio={portfolio}
                marketStocks={companies}
                macro={macro}
            />
        </div>
    );
}