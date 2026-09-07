import React from 'react';
import { MANDI_PRICES } from '../data/mandiData';
import { TrendingUp, TrendingDown, Activity, Sparkles, ShieldCheck, Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MandiTicker = ({ onSelectCrop }) => {
  const { language } = useApp();

  // Duplicate items for seamless continuous marquee loop
  const tickerItems = [...MANDI_PRICES, ...MANDI_PRICES];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white text-xs relative overflow-hidden select-none z-30 shadow-inner">
      <div className="flex items-center">
        
        {/* Left Fixed Badge */}
        <div className="shrink-0 z-10 bg-slate-950 px-3.5 py-2 flex items-center gap-2 border-r border-slate-800 font-bold text-[11px] shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            {language === 'en' ? 'Live APMC Ticker' : 'लाइव मंडी भाव'}
          </span>
        </div>

        {/* Scrolling Marquee Container */}
        <div className="overflow-hidden whitespace-nowrap flex-1 py-1.5 flex items-center">
          <div className="animate-marquee flex items-center gap-8">
            {tickerItems.map((item, idx) => {
              const isUp = item.change >= 0;
              return (
                <div 
                  key={`${item.cropId}-${idx}`} 
                  onClick={() => onSelectCrop && onSelectCrop(item.cropId)}
                  className="inline-flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/50 cursor-pointer transition-colors"
                >
                  <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-100">{item.cropName}</span>
                    <span className="text-[10px] text-slate-400">({item.mandi})</span>
                  </div>

                  <span className="font-extrabold text-amber-300 font-mono text-[12px]">
                    ₹{item.modalPrice.toLocaleString('en-IN')}<span className="text-[10px] text-slate-400 font-sans">/qtl</span>
                  </span>

                  <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isUp ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                  }`}>
                    {isUp ? <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5 inline" />}
                    {isUp ? `+${item.change}%` : `${item.change}%`}
                  </span>

                  {item.saleWindow && (
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded tracking-wider ${
                      item.saleWindow.badgeColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      item.saleWindow.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {item.saleWindow.recommendation}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Fixed Status Indicator */}
        <div className="hidden lg:flex shrink-0 z-10 bg-slate-950 px-3.5 py-2 items-center gap-3 border-l border-slate-800 text-[10px] font-medium text-slate-400">
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agmarknet Verified</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1 text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span>e-NAM Synced</span>
          </div>
        </div>

      </div>
    </div>
  );
};

