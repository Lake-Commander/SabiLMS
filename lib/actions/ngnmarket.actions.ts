// lib/actions/ngnmarket.actions.ts
'use server';

import { cache } from 'react';

const NGN_MARKET_BASE_URL = 'https://api.ngnmarket.com/v1';

//  The core NGX index stocks we want to track in the simulator
const TARGET_SYMBOLS = [
  'MTNN', 'DANGCEM', 'GTCO', 'ZENITHBANK', 'BUAFOODS', 
  'AIRTELAFRI', 'SEPLAT', 'NESTLE', 'GEREGU', 'UBA'
];

//  Export a clean interface so TS knows exactly what this returns
export interface NGNStock {
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  sector: string;
}

//  Safe fallback metrics so your simulator never crashes
const FALLBACK_STOCKS: NGNStock[] = [
  { symbol: 'MTNN', name: 'MTN Nigeria', current_price: 220.50, change_percent: 1.45, sector: 'Telecom' },
  { symbol: 'DANGCEM', name: 'Dangote Cement', current_price: 530.00, change_percent: -0.85, sector: 'Industrial' }
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
    
    // Ensure we got a successful payload wrapper
    if (payload && payload.success === true && payload.data !== undefined) {
      return payload.data as T;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching NGN Market endpoint ${endpoint}:`, error);
    return null;
  }
}

//  Fetch target companies concurrently with STRICT TypeScript Returns
export const getActiveCompanies = cache(async (): Promise<NGNStock[]> => {
  try {
    const companies = await Promise.all(
      TARGET_SYMBOLS.map(async (symbol) => {
        // Correctly hitting the individual company endpoint as per NGN docs
        const data = await fetchNGNMarket<any>(`/companies/${symbol}`);
        if (!data) return null;

        return {
          symbol: data.symbol || symbol,
          name: data.name || data.company_name || 'NGX Asset',
          current_price: parseFloat(data.price || data.current_price || data.close_price || 0),
          change_percent: parseFloat(data.price_change_percent || data.change_percent || data.percentage_change || 0),
          sector: data.sector || 'General Market',
        } as NGNStock;
      })
    );

    // ✅ TYPE GUARD: Tell TypeScript we are specifically stripping out the nulls
    const validCompanies = companies.filter((c): c is NGNStock => c !== null);

    if (validCompanies.length === 0) {
        return FALLBACK_STOCKS;
    }

    return validCompanies;
  } catch (error) {
    console.error("Crash prevented in getActiveCompanies:", error);
    return FALLBACK_STOCKS;
  }
});

//  Retrieve historical OHLCV chart records
export async function getStockChartTimeline(symbol: string, period: string = '30d') {
  try {
    const data = await fetchNGNMarket<any[]>(`/companies/${symbol.toUpperCase()}/chart?period=${period}&format=ohlcv`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

//  Retrieve macro index values
export async function getMarketSnapshot() {
  try {
    const data = await fetchNGNMarket<any>('/market/snapshot');
    if (data && typeof data === 'object' && !Array.isArray(data)) {
       return data;
    }
    return { asi: 105432.18, volume: 412850000, value_traded: 6213400000, market_cap: 58920000000000 };
  } catch (error) {
    return { asi: 105432.18, volume: 412850000, value_traded: 6213400000, market_cap: 58920000000000 };
  }
}