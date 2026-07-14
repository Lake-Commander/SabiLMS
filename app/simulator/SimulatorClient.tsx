'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart as ChartIcon, RefreshCw, Sparkles, CheckCircle2, 
  TrendingUp, History, Loader2, Search, Star, BookmarkPlus 
} from 'lucide-react';

interface LiveStock {
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  sector: string;
}

export default function SimulatorClient({ user, initialHistory }: { user: any; initialHistory: any[] }) {
  const [marketStocks, setMarketStocks] = useState<LiveStock[]>([]);
  const [isLoadingMarket, setIsLoadingMarket] = useState(true);
  
  // Ported Signalist core boilerplate states
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<LiveStock | null>(null);
  
  // Portfolio Simulator custom states
  const [budget, setBudget] = useState<number>(100000);
  const [portfolio, setPortfolio] = useState<Record<string, number>>({});
  const [simulatedGain, setSimulatedGain] = useState<number | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  // Feedback form parameters
  const [rating, setRating] = useState<number>(5);
  const [mostUseful, setMostUseful] = useState('');
  const [improveOrAdd, setImproveOrAdd] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Poll live proxy metrics on render initialization
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const res = await fetch('/api/market');
        const data = await res.json();
        if (data.stocks) {
          setMarketStocks(data.stocks);
          setSelectedStock(data.stocks[0] || null); // Initialize active insight card
        }
      } catch (err) {
        console.error("Failed fetching live market payload data:", err);
      } finally {
        setIsLoadingMarket(false);
      }
    };
    fetchLivePrices();
  }, []);

  const totalPortfolioCost = Object.entries(portfolio).reduce((sum, [symbol, qty]) => {
    const asset = marketStocks.find(s => s.symbol === symbol);
    return sum + (asset ? asset.current_price * qty : 0);
  }, 0);

  const availableLiquidity = budget - totalPortfolioCost;

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  const mutatePositionQty = (symbol: string, quantity: number) => {
    if (quantity < 0) return;
    const targetAsset = marketStocks.find(s => s.symbol === symbol);
    if (!targetAsset) return;

    const activeQty = portfolio[symbol] || 0;
    const baselineCost = totalPortfolioCost - (activeQty * targetAsset.current_price);
    const nextCostProjected = baselineCost + (quantity * targetAsset.current_price);

    if (nextCostProjected > budget) {
      alert('❌ Transaction Rejection: Total transaction structural limits exceed available paper capital.');
      return;
    }

    setPortfolio(prev => ({ ...prev, [symbol]: quantity }));
  };

  // Filter criteria logic derived from Signalist's intelligent search blueprint
  const filteredStocks = marketStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingMarket) {
    return (
      <div className="flex h-96 w-full items-center justify-center font-mono text-xs font-black uppercase tracking-widest text-[var(--black)]">
        <Loader2 className="w-5 h-5 animate-spin mr-2 text-[var(--orange)]" /> Syncing Signalist Stock Matrix Core...
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-[var(--black)] select-none">
      
      {/* Route Badge Marker Row */}
      <div className="flex items-center gap-2">
        <span className="bg-[var(--green)] border-2 border-black text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
          Trading Sandbox
        </span>
        <span className="text-xs text-gray-500 font-bold font-mono uppercase tracking-wider">
          / live_feed_simulator
        </span>
      </div>

      {/* Main Aggregated State Card Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card bg-white dark:bg-slate-900">
          <div className="text-[10px] font-mono font-black uppercase text-gray-500">Available Paper Capital</div>
          <div className="text-xl font-mono font-black mt-1">₦{availableLiquidity.toLocaleString()}</div>
        </div>
        <div className="stat-card bg-[#EEF7E8] dark:bg-slate-900">
          <div className="text-[10px] font-mono font-black uppercase text-gray-600 dark:text-gray-400">Position Allocation</div>
          <div className="text-xl font-mono font-black mt-1 text-black dark:text-white">₦{totalPortfolioCost.toLocaleString()}</div>
        </div>
        <div className="stat-card bg-[#FFF0E8] dark:bg-slate-900">
          <div className="text-[10px] font-mono font-black uppercase text-gray-600 dark:text-gray-400">Simulated 1-Yr Delta</div>
          <div className={`text-xl font-mono font-black mt-1 ${simulatedGain === null ? 'text-gray-400' : simulatedGain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {simulatedGain === null ? '₦0.00' : simulatedGain >= 0 ? `+₦${simulatedGain}` : `-₦${Math.abs(simulatedGain)}`}
          </div>
        </div>
      </div>

      {/* 3-Column Split Functional Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* COLUMN 1: Signalist Core Stock Finder List Module */}
        <div className="p-4 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-4">
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

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-custom">
            {filteredStocks.map(stock => {
              const inWatchlist = watchlist.includes(stock.symbol);
              const isSelected = selectedStock?.symbol === stock.symbol;
              return (
                <div 
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock)}
                  className={`p-2.5 border-2 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                    isSelected ? 'bg-[var(--orange-light)] dark:bg-slate-800 border-black' : 'bg-white dark:bg-slate-900 border-transparent hover:border-black/30'
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
                        <Star className={`w-3 h-3 ${inWatchlist ? 'fill-amber-400' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold font-mono uppercase truncate mt-0.5">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-black">₦{stock.current_price.toFixed(2)}</div>
                    <div className={`text-[9px] font-mono font-black ${stock.change_percent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stock.change_percent >= 0 ? '+' : ''}{stock.change_percent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Deep Component Allocation Matrix Window */}
        <div className="p-5 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-4">
          {selectedStock ? (
            <>
              <div className="border-b-2 border-dashed border-black/10 pb-3">
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 bg-[var(--green)] border border-black rounded shadow-[1px_1px_0px_#111111] text-black">
                  {selectedStock.sector}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight mt-2">{selectedStock.symbol}</h3>
                <p className="text-xs text-gray-400 font-medium leading-tight mt-0.5">{selectedStock.name}</p>
              </div>

              {/* Mock Chart Area */}
              <div className="h-28 bg-[var(--cream)] border-2 border-black rounded-lg flex items-center justify-center relative p-2 font-mono text-[10px] font-bold text-gray-500">
                <ChartIcon className="w-5 h-5 text-black absolute left-3 top-3 opacity-20" />
                <span>[ Live Performance Wave Chart ]</span>
              </div>

              {/* Transaction Controller */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-black uppercase text-gray-500 block">Position Size Configuration</label>
                <div className="flex items-center justify-between p-3 bg-[var(--cream)] border-2 border-black rounded-xl">
                  <span className="font-mono text-xs font-black">₦{selectedStock.current_price.toFixed(2)} / unit</span>
                  
                  <div className="flex items-center border-2 border-black rounded bg-white text-black overflow-hidden h-8">
                    <button onClick={() => mutatePositionQty(selectedStock.symbol, (portfolio[selectedStock.symbol] || 0) - 1)} className="px-2.5 h-full font-black bg-gray-100 hover:bg-[var(--orange)] border-r border-black cursor-pointer">-</button>
                    <input 
                      type="number" 
                      value={portfolio[selectedStock.symbol] || ''}
                      onChange={(e) => mutatePositionQty(selectedStock.symbol, parseInt(e.target.value) || 0)}
                      className="w-10 text-center font-mono text-xs font-bold bg-white outline-none border-none p-0"
                      placeholder="0"
                    />
                    <button onClick={() => mutatePositionQty(selectedStock.symbol, (portfolio[selectedStock.symbol] || 0) + 1)} className="px-2.5 h-full font-black bg-gray-100 hover:bg-[var(--orange)] border-l border-black cursor-pointer">+</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-400 font-bold font-mono uppercase text-center p-12">Select an equity node</p>
          )}
        </div>

        {/* COLUMN 3: Real-Time Verification Checkout Layer */}
        <div className="p-4 bg-[#FBF8F1] dark:bg-slate-900 border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] flex flex-col justify-between min-h-[350px]">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"><BookmarkPlus className="w-4 h-4"/> Running Holdings</h3>
            {totalPortfolioCost === 0 ? (
              <p className="text-xs text-gray-400 font-bold font-mono uppercase p-6 border border-dashed border-black/10 rounded-lg text-center">No Positions Initialized</p>
            ) : (
              <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
                {Object.entries(portfolio).map(([symbol, qty]) => {
                  if (qty === 0) return null;
                  const match = marketStocks.find(s => s.symbol === symbol);
                  return (
                    <div key={symbol} className="flex justify-between border-b border-black/5 pb-1 text-black dark:text-white">
                      <span>{symbol} × {qty}</span>
                      <span className="font-black">₦{((match?.current_price || 0) * qty).toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              const dir = Math.random() > 0.35 ? 1 : -1;
              setSimulatedGain(Math.round((totalPortfolioCost * (Math.random() * 14 / 100)) * dir));
              setFeedbackModalOpen(true);
            }}
            disabled={totalPortfolioCost === 0}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 border-2 border-black bg-[var(--blue)] text-white px-4 py-3.5 font-mono text-xs font-black uppercase tracking-widest rounded-lg shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] cursor-pointer select-none"
          >
            <RefreshCw className="w-4 h-4" /> Execute Fast Forward
          </button>
        </div>

      </div>

      {/* ========================================================
           POST-EXECUTION USER SURVEY MODAL
          ======================================================== */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.form 
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              try {
                await fetch('/api/feedback', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ user_id: user.id, rating, most_useful: mostUseful, improve_or_add: improveOrAdd })
                });
                setFeedbackModalOpen(false);
                alert('✓ Simulation parameters logged safely!');
              } catch (err) { console.error(err); }
              setIsSubmitting(false);
            }}
            className="w-full max-w-md bg-[var(--white)] border-4 border-black rounded-xl p-5 shadow-[6px_6px_0px_#111111] text-black space-y-4 animate-scaleUp"
          >
            <div className="p-3 bg-[var(--orange-light)] border-2 border-black rounded-lg">
              <h4 className="font-display font-black text-xs uppercase flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[var(--orange)]"/> Simulation Yield Processed!</h4>
              <p className="text-[10px] font-bold text-gray-600 mt-1 uppercase font-mono">Verify simulation metrics usefulness values to save session logs.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono font-black uppercase text-gray-500 block">Rate utility value (1-5)</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <button type="button" key={n} onClick={() => setRating(n)} className={`w-8 h-8 text-xs font-mono font-black border-2 border-black rounded cursor-pointer ${rating === n ? 'bg-[var(--green)]' : 'bg-white'}`}>{n}</button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono font-black uppercase text-gray-500 block">Most instructive parameter component?</label>
              <input type="text" required value={mostUseful} onChange={e => setMostUseful(e.target.value)} className="input text-xs font-medium border-2 border-black rounded-lg p-2.5 w-full outline-none bg-white" placeholder="e.g. watchlist tracking matrix" />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono font-black uppercase text-gray-500 block">Features suggestions?</label>
              <textarea required value={improveOrAdd} onChange={e => setImproveOrAdd(e.target.value)} className="textarea text-xs font-medium border-2 border-black rounded-lg p-2.5 w-full min-h-[64px] outline-none bg-white" placeholder="e.g. real-time ngnmarket socket loops" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-1.5 border-2 border-black bg-[var(--green)] text-black px-4 py-3 font-mono text-xs font-black uppercase tracking-wider rounded-lg shadow-[3px_3px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] cursor-pointer disabled:opacity-50">
              <CheckCircle2 className="w-4 h-4" /> Save Simulation Snapshot
            </button>
          </motion.form>
        </div>
      )}
    </div>
  );
}