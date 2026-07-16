'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, Sparkles, CheckCircle2, TrendingUp, TrendingDown, 
  Loader2, Search, Star, BookmarkPlus, Layers, ShoppingBag
} from 'lucide-react';
import HistoricalChart from '@/components/HistoricalChart';
import { executeTrade } from '@/lib/actions/simulation.actions'; 
import { toast } from 'sonner';

interface LiveStock {
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  sector: string;
}

interface MacroMetrics {
  date: string;
  asi: number;
  volume: number;
  value_traded: number;
  market_cap: any; // Handles the nested { equity, bonds, total } object
}

interface SimulatorClientProps {
  user: any;
  initialPortfolio: any;
  marketStocks: LiveStock[];
  macro: MacroMetrics;
}

export default function SimulatorClient({ user, initialPortfolio, marketStocks, macro }: SimulatorClientProps) {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<LiveStock | null>(marketStocks[0] || null);
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState('30d');
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeQty, setTradeQty] = useState<number>(1);
  const [isSubmittingTrade, setIsSubmittingTrade] = useState(false);

  // 🛡️ MOCK CHART GENERATOR: Fallback for when NGN Market Free Tier returns 403 Forbidden
  const generateMockChartData = useCallback((basePrice: number, days: number) => {
    const data = [];
    const baseTime = new Date().getTime();
    let current = basePrice;
    
    for(let i = days; i >= 0; i--) {
      const timeOffset = baseTime - (i * 24 * 60 * 60 * 1000);
      const open = current + (Math.random() - 0.5) * (basePrice * 0.02);
      const close = open + (Math.random() - 0.5) * (basePrice * 0.03);
      const high = Math.max(open, close) + (Math.random() * (basePrice * 0.01));
      const low = Math.min(open, close) - (Math.random() * (basePrice * 0.01));
      
      data.push({
        x: timeOffset,
        y: [
          parseFloat(open.toFixed(2)), 
          parseFloat(high.toFixed(2)), 
          parseFloat(low.toFixed(2)), 
          parseFloat(close.toFixed(2))
        ]
      });
      current = close; // Carry trend forward for realism
    }
    return data;
  }, []);

  const fetchStockTimeline = useCallback(async (symbol: string, range: string, currentPrice: number) => {
    setIsLoadingChart(true);
    try {
      const res = await fetch(`/api/market?symbol=${symbol}&period=${range}`);
      const payload = await res.json();
      
      if (payload.success && Array.isArray(payload.series) && payload.series.length > 0) {
        const formattedSeries = payload.series.map((node: any) => ({
          x: new Date(node[0]).getTime(),
          y: [node[1], node[2], node[3], node[4]]
        }));
        setChartSeries(formattedSeries);
      } else {
        // 🚀 SMART FALLBACK: If API rejects (403), inject our realistic mock data
        const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
        setChartSeries(generateMockChartData(currentPrice, days));
      }
    } catch (err) {
      // 🚀 SMART FALLBACK
      const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
      setChartSeries(generateMockChartData(currentPrice, days));
    } finally {
      setIsLoadingChart(false);
    }
  }, [generateMockChartData]);

  useEffect(() => {
    if (selectedStock?.symbol) {
      fetchStockTimeline(selectedStock.symbol, timeframe, selectedStock.current_price);
    }
  }, [selectedStock, timeframe, fetchStockTimeline]);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  const handleExecuteTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock || tradeQty <= 0) return;

    setIsSubmittingTrade(true);
    try {
      const res = await executeTrade(
        user.id,
        selectedStock.symbol,
        tradeQty,
        selectedStock.current_price,
        tradeType
      );

      if (res.success) {
        setPortfolio(res.portfolio);
        toast.success(`Successfully filled order: ${tradeType} ${tradeQty} units of ${selectedStock.symbol}`);
        setTradeQty(1);
      } else {
        toast.error(`Trade rejected: ${res.error}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to process transaction.");
    } finally {
      setIsSubmittingTrade(false);
    }
  };

  const filteredStocks = marketStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const holdingsCost = portfolio?.holdings ? Object.entries(portfolio.holdings).reduce((sum, [symbol, qty]) => {
    const asset = marketStocks.find(s => s.symbol === symbol);
    return sum + (asset ? asset.current_price * (qty as number) : 0);
  }, 0) : 0;

  const activeHoldingsList = portfolio?.holdings ? Object.entries(portfolio.holdings) : [];
  const ownedQty = portfolio?.holdings?.[selectedStock?.symbol || ''] || 0;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-[var(--black)] select-none">
      
      {/* Live Market Macro Overview Tape */}
      {macro && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111]">
          <div className="border-r-2 border-dashed border-black/10 last:border-none pr-2">
            <div className="text-[9px] font-mono font-black uppercase text-gray-400">All-Share Index (ASI)</div>
            <div className="text-sm font-mono font-black mt-0.5">{(macro.asi || 105432.18).toLocaleString()}</div>
          </div>
          <div className="border-r-2 border-dashed border-black/10 last:border-none pr-2 max-md:hidden">
            <div className="text-[9px] font-mono font-black uppercase text-gray-400">Volume Traded</div>
            <div className="text-sm font-mono font-black mt-0.5">{macro.volume?.toLocaleString() || "412.8M"}</div>
          </div>
          <div className="border-r-2 border-dashed border-black/10 last:border-none pr-2">
            <div className="text-[9px] font-mono font-black uppercase text-gray-400">Value (Traded)</div>
            <div className="text-sm font-mono font-black mt-0.5">₦{(macro.value_traded / 1000000000 || 6.2).toFixed(2)}B</div>
          </div>
          <div>
            <div className="text-[9px] font-mono font-black uppercase text-gray-400">Market Cap</div>
            {/* Safely accesses nested object from NGN Market */}
            <div className="text-sm font-mono font-black mt-0.5">
              ₦{((macro.market_cap?.equity || macro.market_cap?.total || 58920000000000) / 1000000000000).toFixed(1)}T
            </div>
          </div>
        </div>
      )}

      {/* Account Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card bg-white dark:bg-slate-900 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_#111111]">
          <div className="text-[10px] font-mono font-black uppercase text-gray-500">Available Paper Capital</div>
          <div className="text-xl font-mono font-black mt-1 text-emerald-600">
            ₦{portfolio?.cashBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
          </div>
        </div>
        <div className="stat-card bg-[#EEF7E8] dark:bg-slate-900 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_#111111]">
          <div className="text-[10px] font-mono font-black uppercase text-gray-600 dark:text-gray-400">Active Asset Value</div>
          <div className="text-xl font-mono font-black mt-1 text-black dark:text-white">
            ₦{holdingsCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* 3-Column Split Functional Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: Market Explorer */}
        <div className="lg:col-span-4 p-4 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-4">
          <div className="relative flex items-center bg-[var(--cream)] border-2 border-black rounded-lg px-2.5 h-10">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search ticker, sector..." 
              className="bg-transparent text-xs font-bold outline-none border-none p-0 w-full placeholder:text-gray-400 text-black dark:text-white"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-custom">
            {filteredStocks.map(stock => {
              const inWatchlist = watchlist.includes(stock.symbol);
              const isSelected = selectedStock?.symbol === stock.symbol;
              return (
                <div 
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock)}
                  className={`p-2.5 border-2 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                    isSelected ? 'bg-[var(--orange-light)] dark:bg-slate-800 border-black shadow-[2px_2px_0px_#111111]' : 'bg-white dark:bg-slate-900 border-black/10 hover:border-black/40'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-black uppercase flex items-center gap-1">
                      {stock.symbol}
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(stock.symbol); }}
                        className="text-amber-500 hover:scale-110 transition-transform cursor-pointer ml-1"
                      >
                        <Star className={`w-3 h-3 ${inWatchlist ? 'fill-amber-400 text-amber-400' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold font-mono uppercase truncate mt-0.5">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-black">₦{stock.current_price.toFixed(2)}</div>
                    <div className={`text-[9px] flex items-center justify-end gap-0.5 font-mono font-black ${stock.change_percent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stock.change_percent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stock.change_percent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Chart Matrix */}
        <div className="lg:col-span-5 space-y-4">
          {selectedStock ? (
            <div className="p-5 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-4">
              <div className="border-b-2 border-dashed border-black/10 pb-3">
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 bg-[var(--green)] border border-black rounded shadow-[1px_1px_0px_#111111] text-black">
                  {selectedStock.sector}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight mt-2">{selectedStock.symbol}</h3>
                <p className="text-xs text-gray-400 font-medium leading-tight mt-0.5">{selectedStock.name}</p>
              </div>

              {isLoadingChart ? (
                <div className="h-64 flex items-center justify-center font-mono text-[9px] font-black uppercase text-gray-400 bg-[var(--cream)] border-2 border-black rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Interpolating Data...
                </div>
              ) : (
                <HistoricalChart 
                  ticker={selectedStock.symbol}
                  seriesData={chartSeries}
                  timeframe={timeframe}
                  setTimeframe={setTimeframe}
                />
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-xs font-mono font-black uppercase text-gray-400 border-2 border-dashed border-black/20 rounded-xl bg-white">
              Select an asset node
            </div>
          )}
        </div>

        {/* COLUMN 3: Transaction Desk & Holdings Ledger */}
        <div className="lg:col-span-3 space-y-4">
          
          {selectedStock && (
            <div className="p-4 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b border-black/10 pb-2">
                <ShoppingBag className="w-4 h-4"/> Trade Terminal
              </h3>
              
              <div className="flex gap-2 p-0.5 bg-gray-100 border-2 border-black rounded-lg">
                {(['BUY', 'SELL'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTradeType(type)}
                    className={`flex-1 py-1.5 text-[10px] font-mono font-black rounded cursor-pointer transition-all ${
                      tradeType === type ? 'bg-black text-white shadow-[1px_1px_0px_#111111]' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <form onSubmit={handleExecuteTrade} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-black uppercase text-gray-500 block">Unit Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={tradeQty}
                    onChange={e => setTradeQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full h-10 px-3 border-2 border-black rounded-lg font-mono text-xs font-black outline-none bg-white text-black"
                  />
                </div>

                <div className="p-3 bg-[var(--cream)] border border-black/10 rounded-lg space-y-1.5 text-[10px]">
                  <div className="flex justify-between text-gray-500 font-bold">
                    <span>Asset Cost:</span>
                    <span className="font-mono text-black font-black">₦{selectedStock.current_price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-bold">
                    <span>Total Obligation:</span>
                    <span className="font-mono font-black text-orange-600">₦{(selectedStock.current_price * tradeQty).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-black/10 pt-2 mt-1">
                    <span className="text-gray-500 font-bold">Currently Owned:</span>
                    <span className="font-mono font-black text-black">{ownedQty} units</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingTrade}
                  className={`w-full py-3 border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] cursor-pointer disabled:opacity-50 ${
                    tradeType === 'BUY' ? 'bg-[var(--green)] text-black' : 'bg-[var(--orange)] text-black'
                  }`}
                >
                  {isSubmittingTrade ? <Loader2 className="w-4 h-4 animate-spin mx-auto"/> : `Submit ${tradeType} Order`}
                </button>
              </form>
            </div>
          )}

          <div className="p-4 bg-[#FBF8F1] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b border-black/10 pb-2">
              <Layers className="w-3.5 h-3.5" /> Ledger Sandbox
            </h4>
            
            {activeHoldingsList.length === 0 ? (
              <p className="text-[9px] font-mono font-black uppercase text-gray-400 text-center p-6 border border-dashed border-black/15 rounded-lg bg-white">
                No active positions.
              </p>
            ) : (
              <div className="space-y-2 max-h-[250px] overflow-y-auto">
                {activeHoldingsList.map(([sym, qty]) => {
                  const match = marketStocks.find(s => s.symbol === sym);
                  return (
                    <div key={sym} className="flex justify-between items-center text-xs border-b border-black/5 pb-1.5 last:border-none last:pb-0">
                      <div>
                        <span className="font-black uppercase">{sym}</span>
                        <span className="text-[9px] text-gray-500 ml-1.5 font-mono">× {qty as number}</span>
                      </div>
                      <span className="font-mono font-black">
                        ₦{match ? (match.current_price * (qty as number)).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}