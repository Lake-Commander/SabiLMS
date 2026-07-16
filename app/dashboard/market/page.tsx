// app/dashboard/market/page.tsx
import { createClient } from "@/lib/auth";
import { redirect } from "next/navigation";
import MarketClient from "./MarketClient";

export default async function MarketIntelligencePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Secure route guard
    if (!user) redirect('/auth/login'); 

    return <MarketClient />;
}