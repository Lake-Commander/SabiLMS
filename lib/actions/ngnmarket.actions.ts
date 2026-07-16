'use server';

import { cache } from 'react';

const NGN_MARKET_BASE_URL = 'https://api.ngnmarket.com/v1';

async function fetchNGNMarket<T>(endpoint: string): Promise<T | null> {
  const apiKey = process.env.NGN_MARKET_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${NGN_MARKET_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);
    const payload = await res.json();
    return payload.success ? payload.data as T : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getActiveCompanies = cache(async () => {
  const data = await fetchNGNMarket<any[]>('/companies');
  if (!data) return [];
  return data.map((s: any) => ({
    symbol: s.symbol || 'EQUITY',
    name: s.name || 'Nigerian Listed Asset',
    current_price: parseFloat(s.current_price || s.price || 0),
    change_percent: parseFloat(s.price_change_percent || s.change_percent || 0),
    sector: s.sector || 'General Market',
  }));
});

export async function getStockChartTimeline(symbol: string, period: string = '30d') {
  const data = await fetchNGNMarket<any[]>(`/companies/${symbol.toUpperCase()}/chart?period=${period}&format=ohlcv`);
  return Array.isArray(data) ? data : [];
}

export async function getMarketSnapshot() {
  return await fetchNGNMarket<any>('/market/snapshot');
}