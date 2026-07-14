'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

// ✅ Defensively isolate ApexCharts from Next.js server pre-rendering crashes
const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center font-mono text-[10px] font-black uppercase text-gray-400">
      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Initializing Vector Engines...
    </div>
  )
});

interface ChartDataNode {
  x: Date | number;
  y: [number, number, number, number]; // [Open, High, Low, Close]
}

interface HistoricalChartProps {
  ticker: string;
  seriesData: ChartDataNode[];
  timeframe: string;
  setTimeframe: (tf: string) => void;
}

export default function HistoricalChart({ ticker, seriesData, timeframe, setTimeframe }: HistoricalChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ========================================================
  // 📊 STARK NEO-BRUTALIST APEXCHARTS CONFIGURATION MATRIX
  // ========================================================
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 320,
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'var(--font-body), system-ui, sans-serif',
    },
    title: {
      text: `${ticker} HISTORICAL VARIATION INDEX`,
      align: 'left',
      style: {
        fontSize: '11px',
        fontWeight: '900',
        color: isDark ? '#FBF8F1' : '#111111'
      }
    },
    grid: {
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(17,17,17,0.1)',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: isDark ? '#A0AEC0' : '#666666',
          fontSize: '9px',
          fontWeight: '700'
        }
      },
      axisBorder: {
        show: true,
        color: isDark ? '#FBF8F1' : '#111111',
        height: 2 // ✅ FIXED: Changed strokeWidth to height for X-Axis Border compatibility
      },
      axisTicks: { 
        show: true, 
        color: isDark ? '#FBF8F1' : '#111111',
        height: 6 
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (val) => `₦${val.toLocaleString()}`,
        style: {
          colors: isDark ? '#A0AEC0' : '#666666',
          fontSize: '9px',
          fontWeight: '700'
        }
      },
      axisBorder: {
        show: true,
        color: isDark ? '#FBF8F1' : '#111111',
        width: 2 // ✅ FIXED: Changed strokeWidth to width for Y-Axis Border compatibility
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#A2CD85',
          downward: '#FF9864'
        },
        wick: { useFillColor: true }
      }
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light'
    }
  };

  const chartSeries = [{
    name: 'OHLCV Matrix',
    data: seriesData
  }];

  return (
    <div className="p-4 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] space-y-4">
      
      {/* Timeframe Controller Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-black/10 pb-3">
        <span className="font-mono text-[10px] font-black uppercase text-gray-400">Time-Series Range</span>
        
        <div className="flex gap-1 bg-[var(--cream)] border-2 border-black p-0.5 rounded-md">
          {['7d', '30d', '90d'].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase rounded cursor-pointer transition-all ${
                timeframe === tf 
                  ? 'bg-[var(--orange)] text-black border border-black shadow-[1px_1px_0px_#111111]' 
                  : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Render Workspace Canvas */}
      <div className="w-full h-80 overflow-hidden">
        <Chart 
          options={chartOptions} 
          series={chartSeries} 
          type="candlestick" 
          height={300} 
        />
      </div>

    </div>
  );
}