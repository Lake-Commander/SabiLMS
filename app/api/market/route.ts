// app/api/market/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0; //  Force Vercel CDN to bypass cache entirely

export async function GET(request: Request) {
  const apiKey = process.env.NGN_MARKET_API_KEY;
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const period = searchParams.get('period') || '30d';

  // Fallback stocks
  const BACKUP_STOCKS = [
    { symbol: 'MTNN', name: 'MTN Nigeria Communications PLC', current_price: 220.50, change_percent: 1.45, sector: 'Telecom' },
    { symbol: 'DANGCEM', name: 'Dangote Cement PLC', current_price: 530.00, change_percent: -0.85, sector: 'Industrial' },
    { symbol: 'GTCO', name: 'GTCO Holdings PLC', current_price: 44.20, change_percent: 2.15, sector: 'Banking' },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank PLC', current_price: 38.80, change_percent: 0.50, sector: 'Banking' }
  ];

  if (!apiKey) {
    console.error("❌ NGN_MARKET_API_KEY is completely missing from Vercel's Environment Variables panel!");
    return NextResponse.json({
      success: false,
      macro: { asi: 105432.18, volume: 412850000, value_traded: 6213400000, market_cap: 58920000000000 },
      stocks: BACKUP_STOCKS
    });
  }

  try {
    //  PATH A: Historical chart
    if (symbol) {
      const chartUrl = `https://api.ngnmarket.com/v1/companies/${symbol.toUpperCase()}/chart?period=${period}&format=ohlcv`;
      const chartRes = await fetch(chartUrl, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        cache: 'no-store'
      });
      const chartPayload = await chartRes.json();
      
      return NextResponse.json({
        success: chartPayload.success,
        series: chartPayload.success && Array.isArray(chartPayload.data) ? chartPayload.data : []
      });
    }

    //  PATH B: Default dashboard load
    const [snapshotRes, companiesRes] = await Promise.all([
      fetch('https://api.ngnmarket.com/v1/market/snapshot', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        cache: 'no-store'
      }),
      fetch('https://api.ngnmarket.com/v1/companies', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        cache: 'no-store'
      })
    ]);

    const snapshotPayload = await snapshotRes.json();
    const companiesPayload = await companiesRes.json();

    const rawStocks = companiesPayload.success && Array.isArray(companiesPayload.data) 
      ? companiesPayload.data 
      : [];

    const normalizedStocks = rawStocks.map((s: any) => ({
      symbol: s.symbol || 'EQUITY',
      name: s.name || 'NGX Listed Asset',
      current_price: parseFloat(s.current_price || s.price || 0),
      change_percent: parseFloat(s.price_change_percent || s.change_percent || 0),
      sector: s.sector || 'General Market'
    }));

    return NextResponse.json({
      success: true,
      macro: snapshotPayload.success ? snapshotPayload.data : null,
      stocks: normalizedStocks.length > 0 ? normalizedStocks : BACKUP_STOCKS
    });

  } catch (error) {
    console.error("🚨 Vercel API Ingestion Error:", error);
    return NextResponse.json({
      success: false,
      macro: { asi: 105432.18, volume: 412850000, value_traded: 6213400000, market_cap: 58920000000000 },
      stocks: BACKUP_STOCKS
    });
  }
}