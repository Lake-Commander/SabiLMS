// check2/lib/actions/ngnmarket.actions.ts
'use server';

import { cache } from 'react';

const NGN_MARKET_BASE_URL = 'https://api.ngnmarket.com/v1';

const TARGET_SYMBOLS = [
  'MTNN', 'DANGCEM', 'GTCO', 'ZENITHBANK', 'BUAFOODS', 
  'AIRTELAFRI', 'SEPLAT', 'NESTLE', 'GEREGU', 'UBA'
];

export interface NGNStock {
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  sector: string;
}

// 🛡️ Safe fallback metrics for Free Tier users
const FALLBACK_STOCKS: NGNStock[] = [
  { symbol: 'MTNN', name: 'MTN Nigeria', current_price: 220.50, change_percent: 1.45, sector: 'Telecom' },
  { symbol: 'DANGCEM', name: 'Dangote Cement', current_price: 530.00, change_percent: -0.85, sector: 'Industrial' },
  { symbol: 'GTCO', name: 'GTCO Holdings', current_price: 44.20, change_percent: 2.15, sector: 'Banking' },
  { symbol: 'ZENITHBANK', name: 'Zenith Bank', current_price: 38.80, change_percent: 0.50, sector: 'Banking' },
  { symbol: 'BUAFOODS', name: 'BUA Foods', current_price: 315.00, change_percent: 0.00, sector: 'Consumer Goods' }
];

/**
 * Core API Fetcher with Smart 403 Interception
 */
async function fetchNGNMarket<T>(endpoint: string): Promise<{ data: T | null; isPlanRestricted: boolean }> {
  const apiKey = process.env.NGN_MARKET_API_KEY;
  if (!apiKey) return { data: null, isPlanRestricted: false };

  try {
    const res = await fetch(`${NGN_MARKET_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      cache: 'no-store', 
    });

    // Intercept 403 Forbidden (Free/Lower Tier Limits)
    if (res.status === 403) {
      return { data: null, isPlanRestricted: true };
    }

    if (!res.ok) {
      return { data: null, isPlanRestricted: false };
    }

    const payload = await res.json();
    
    if (payload && payload.success === true && payload.data !== undefined) {
      return { data: payload.data as T, isPlanRestricted: false };
    }
    
    return { data: null, isPlanRestricted: false };
  } catch (error) {
    console.error(`Error fetching NGN Market endpoint ${endpoint}:`, error);
    return { data: null, isPlanRestricted: false };
  }
}

// ============================================================================
// FREE TIER ENDPOINTS (Works currently)
// ============================================================================

// 🏛️ Retrieve macro index values (Free Tier Compatible)
export async function getMarketSnapshot() {
  const { data } = await fetchNGNMarket<any>('/market/snapshot');
  
  if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data;
  }
  
  // Hard fallback just in case the network fails completely
  return { 
    asi: 105432.18, 
    volume: 412850000, 
    value_traded: 6213400000, 
    market_cap: { equity: 58920000000000, bonds: 0, etfs: 0, total: 58920000000000 } 
  };
}

// ============================================================================
// HOBBY TIER ENDPOINTS (Profiles & Price Charts)
// ============================================================================

export const getActiveCompanies = cache(async (): Promise<NGNStock[]> => {
  const companies = await Promise.all(
    TARGET_SYMBOLS.map(async (symbol) => {
      const { data, isPlanRestricted } = await fetchNGNMarket<any>(`/companies/${symbol}`);
      
      // If the plan blocks this request, return null immediately to trigger fallback
      if (isPlanRestricted || !data) return null;

      return {
        symbol: data.symbol || symbol,
        name: data.name || data.company_name || 'NGX Asset',
        current_price: parseFloat(data.price || data.current_price || data.close_price || 0),
        change_percent: parseFloat(data.price_change_percent || data.change_percent || data.percentage_change || 0),
        sector: data.sector || 'General Market',
      } as NGNStock;
    })
  );

  const validCompanies = companies.filter((c): c is NGNStock => c !== null);

  // If all failed (due to 403 Free Tier), deploy the fallback matrix
  if (validCompanies.length === 0) {
      return FALLBACK_STOCKS;
  }

  return validCompanies;
});

export async function getStockChartTimeline(symbol: string, period: string = '30d') {
  const { data, isPlanRestricted } = await fetchNGNMarket<any[]>(`/companies/${symbol.toUpperCase()}/chart?period=${period}&format=ohlcv`);
  
  // If restricted by plan, we return empty, allowing the client-side UI to generate the mock chart
  if (isPlanRestricted) return [];
  
  return Array.isArray(data) ? data : [];
}

// ============================================================================
// STARTER TIER ENDPOINTS (Top Movers & News)
// ============================================================================

export async function getMarketTopMovers() {
  const { data, isPlanRestricted } = await fetchNGNMarket<any>('/market/top-movers');
  
  if (isPlanRestricted || !data) {
    // 🛡️ Fallback Movers
    return {
      advancers: [{ symbol: 'GTCO', change: 2.15 }, { symbol: 'MTNN', change: 1.45 }],
      decliners: [{ symbol: 'DANGCEM', change: -0.85 }, { symbol: 'UBA', change: -0.40 }]
    };
  }
  return data;
}

// ============================================================================
// BUSINESS TIER ENDPOINTS (Full Financials, Cash Flow, Income Statement)
// ============================================================================

export async function getCompanyFinancials(symbol: string) {
  const { data, isPlanRestricted } = await fetchNGNMarket<any>(`/companies/${symbol.toUpperCase()}/financials`);
  
  if (isPlanRestricted || !data) {
    // 🛡️ Premium Business Tier Fallback (Generated for Free Tier users)
    return {
      symbol: symbol.toUpperCase(),
      income_statement: {
        revenue: 1250000000000, // 1.25T
        gross_profit: 450000000000,
        net_income: 185000000000,
        eps: 12.45
      },
      balance_sheet: {
        total_assets: 3400000000000,
        total_liabilities: 2100000000000,
        total_equity: 1300000000000
      },
      ratios: {
        pe_ratio: 8.5,
        pb_ratio: 1.2,
        dividend_yield: 4.5,
        debt_to_equity: 1.6
      }
    };
  }
  
  return data;
}