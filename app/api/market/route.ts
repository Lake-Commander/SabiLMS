// app/api/market/route.ts
import { NextResponse } from 'next/server';

// 🛡️ Safe fallback metrics so your simulator never crashes if the API runs out of credits
const FALLBACK_MARKET = [
  { symbol: 'MTNN', name: 'MTN Nigeria Communications PLC', current_price: 220.50, change_percent: 0.45, sector: 'Telecom' },
  { symbol: 'DANGCEM', name: 'Dangote Cement PLC', current_price: 530.00, change_percent: -1.20, sector: 'Industrial' },
  { symbol: 'GTCO', name: 'GTCO Holdings PLC', current_price: 44.20, change_percent: 2.15, sector: 'Banking' },
  { symbol: 'ZENITHBANK', name: 'Zenith Bank PLC', current_price: 38.80, change_percent: 1.05, sector: 'Banking' },
  { symbol: 'BUAFOODS', name: 'BUA Foods PLC', current_price: 315.00, change_percent: 0.00, sector: 'Consumer Goods' }
];

export async function GET() {
  const apiKey = process.env.NGN_MARKET_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ NGN_MARKET_API_KEY is missing from environment variables. Falling back to local dataset.");
    return NextResponse.json({ stocks: FALLBACK_MARKET, source: 'fallback_cache' });
  }

  try {
    const res = await fetch('https://api.ngnmarket.com/v1/market/snapshot', {
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      // Cache this call server-side for 10 minutes (600 seconds) to save your API credits
      next: { revalidate: 600 } 
    });

    if (!res.ok) {
      throw new Error(`Upstream API error! Status: ${res.status}`);
    }

    const data = await res.json();
    
    // 🔍 This prints directly to your local terminal console where you ran "npm run dev"
    // Use this to check the exact keys that NGNMarket returns
    console.log("=== NGNMARKET LIVE PAYLOAD ===");
    console.log(JSON.stringify(data, null, 2));

    // Normalize the dynamic payload keys into our clean front-end schema
    // Adjust these field mappings (like 'symbol', 'close', etc.) based on your logged terminal payload
    const rawData = data.stocks || data.data || data.snapshot || (Array.isArray(data) ? data : []);
    
    const normalizedStocks = Array.isArray(rawData) 
      ? rawData.slice(0, 20).map((item: any) => ({
          symbol: item.symbol || item.ticker || item.code || 'UNKNOWN',
          name: item.name || item.company_name || item.description || 'Nigerian Equity Node',
          current_price: parseFloat(item.price || item.current_price || item.close_price || item.close || 0),
          change_percent: parseFloat(item.change_percent || item.percentage_change || item.pct_change || item.change || 0),
          sector: item.sector || 'General Market'
        }))
      : FALLBACK_MARKET;

    return NextResponse.json({ stocks: normalizedStocks, source: 'ngnmarket_live' });

  } catch (error) {
    console.error("🚨 NGNMarket Ingestion Error:", error);
    // Graceful recovery: keep the student inside the education loops with mock data
    return NextResponse.json({ stocks: FALLBACK_MARKET, source: 'failover_recovery' });
  }
}