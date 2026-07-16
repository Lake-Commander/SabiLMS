// lib/actions/ngnmarket.actions.ts
'use server';

import { cache } from 'react';

const NGN_MARKET_BASE_URL = 'https://api.ngnmarket.com/v1';

// Safe fallback metrics so your simulator never crashes if the API throttles or formats change
const FALLBACK_STOCKS = [
  { symbol: 'MTNN', name: 'MTN Nigeria Communications PLC', current_price: 220.50, change_percent: 1.45, sector: 'Telecom' },
  { symbol: 'DANGCEM', name: 'Dangote Cement PLC', current_price: 530.00, change_percent: -0.85, sector: 'Industrial' },
  { symbol: 'GTCO', name: 'GTCO Holdings PLC', current_price: 44.20, change_percent: 2.15, sector: 'Banking' },
  { symbol: 'ZENITHBANK', name: 'Zenith Bank PLC', current_price: 38.80, change_percent: 0.50, sector: 'Banking' },
  { symbol: 'BUAFOODS', name: 'BUA Foods PLC', current_price: 315.00, change_percent: 0.00, sector: 'Consumer Goods' }
];

async function fetchNGNMarket<T>(endpoint: string): Promise<T | null> {
  const apiKey = process.env.NGN_MARKET_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ NGN_MARKET_API_KEY is missing from environment variables.");
    return null;
  }

  try {
    const res = await fetch(`${NGN_MARKET_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      cache: 'no-store', // Always fetch live
    });

    if (!res.ok) {
      console.warn(`NGN Market API returned status ${res.status} for ${endpoint}`);
      return null;
    }

    const payload = await res.json();
    
    // Ensure we actually got a successful payload wrapper before returning the data layer
    if (payload && payload.success === true && payload.data !== undefined) {
      return payload.data as T;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching NGN Market endpoint ${endpoint}:`, error);
    return null;
  }
}

// Retrieve the entire list of ordinary shares active on the NGX
export const getActiveCompanies = cache(async () => {
  try {
    const data = await fetchNGNMarket<any>('/companies');
    
    // 🛑 DEFENSIVE CHECK: Ensure data is actually an array before calling .map()
    let rawStocks = [];
    if (Array.isArray(data)) {
        rawStocks = data;
    } else if (data && Array.isArray(data.companies)) {
        rawStocks = data.companies;
    } else if (data && Array.isArray(data.stocks)) {
        rawStocks = data.stocks;
    }

    // If the API failed to return a readable array, immediately return the safe fallback
    if (!rawStocks || rawStocks.length === 0) {
        console.warn("NGN Market did not return a valid array of companies. Using fallback dataset.");
        return FALLBACK_STOCKS;
    }

    return rawStocks.map((s: any) => ({
      symbol: s.symbol || s.ticker || 'EQUITY',
      name: s.name || s.company_name || 'Nigerian Listed Asset',
      current_price: parseFloat(s.current_price || s.price || s.close_price || 0),
      change_percent: parseFloat(s.price_change_percent || s.change_percent || s.percentage_change || 0),
      sector: s.sector || 'General Market',
    }));
    
  } catch (error) {
    console.error("Crash prevented in getActiveCompanies:", error);
    return FALLBACK_STOCKS;
  }
});

//  Retrieve historical OHLCV chart records for a selected ticker
export async function getStockChartTimeline(symbol: string, period: string = '30d') {
  try {
    const data = await fetchNGNMarket<any[]>(`/companies/${symbol.toUpperCase()}/chart?period=${period}&format=ohlcv`);
    // Defensive check for the chart array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

//  Retrieve macro index values (ASI, Value Traded, Cap)
export async function getMarketSnapshot() {
  try {
    const data = await fetchNGNMarket<any>('/market/snapshot');
    
    // Ensure the returned data is a flat object and not an array or string
    if (data && typeof data === 'object' && !Array.isArray(data)) {
       return data;
    }
    
    // Fallback if macro endpoint fails or sends wrong shape
    return { asi: 105432.18, volume: 412850000, value_traded: 6213400000, market_cap: 58920000000000 };
  } catch (error) {
    return { asi: 105432.18, volume: 412850000, value_traded: 6213400000, market_cap: 58920000000000 };
  }
}