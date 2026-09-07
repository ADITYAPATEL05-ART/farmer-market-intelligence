import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Map, 
  UserPlus, 
  BarChart2, 
  Package, 
  FileText, 
  Truck, 
  Coins, 
  ShieldCheck, 
  Handshake, 
  Lock, 
  Tag,
  ArrowRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';

export const LandingView = ({ 
  onNavigateTab, 
  onOpenAiGrader, 
  onOpenKisanBot 
}) => {
  const { language } = useApp();

  // Price trend 7-day data matching screenshot
  const trendData = [
    { day: '14 May', price: 2010 },
    { day: '15 May', price: 2040 },
    { day: '16 May', price: 2020 },
    { day: '17 May', price: 2045 },
    { day: '18 May', price: 2095 },
    { day: '19 May', price: 2075 },
    { day: '20 May', price: 2125 }
  ];

  const marketPrices = [
    {
      name: language === 'en' ? 'Wheat' : 'गेहूं',
      mandi: language === 'en' ? 'Nashik Mandi' : 'नासिक मंडी',
      price: '2,125',
      unit: '/quintal',
      change: '+1.8%',
      isPositive: true
    },
    {
      name: language === 'en' ? 'Tomato' : 'टमाटर',
      mandi: language === 'en' ? 'Pune Mandi' : 'पुणे मंडी',
      price: '1,245',
      unit: '/quintal',
      change: '-2.6%',
      isPositive: false
    },
    {
      name: language === 'en' ? 'Potato' : 'आलू',
      mandi: language === 'en' ? 'Nashik Mandi' : 'नासिक मंडी',
      price: '1,050',
      unit: '/quintal',
      change: '+3.2%',
      isPositive: true
    },
    {
      name: language === 'en' ? 'Onion' : 'प्याज',
      mandi: language === 'en' ? 'Ahmednagar Mandi' : 'अहमदनगर मंडी',
      price: '1,180',
      unit: '/quintal',
      change: '+0.9%',
      isPositive: true
    }
  ];

  const bestSellingMarkets = [
    { rank: 1, name: language === 'en' ? 'Nashik Mandi' : 'नासिक मंडी', price: '2,125', isBest: true },
    { rank: 2, name: language === 'en' ? 'Pune Mandi' : 'पुणे मंडी', price: '2,045', isBest: false },
    { rank: 3, name: language === 'en' ? 'Ahmednagar Mandi' : 'अहमदनगर मंडी', price: '1,980', isBest: false },
    { rank: 4, name: language === 'en' ? 'Solapur Mandi' : 'सोलापुर मंडी', price: '1,965', isBest: false }
  ];

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto animate-fade-in pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#f7f9f6] via-[#f1f6f1] to-[#e7f0e6] border border-[#e4eae2] p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.12] tracking-tight">
                {language === 'en' ? (
                  <>
                    Sell Smarter.<br />
                    Get the <span className="text-[#195627]">Right Price.</span>
                  </>
                ) : (
                  <>
                    सही जानकारी से बेचें.<br />
                    पाएं <span className="text-[#195627]">सही दाम।</span>
                  </>
                )}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mt-4 font-normal">
                {language === 'en' 
                  ? 'Live mandi prices, verified buyers, quality matching, logistics & secure payments — all in one platform for farmers.'
                  : 'लाइव मंडी भाव, सत्यापित खरीदार, गुणवत्ता मिलान, परिवहन और सुरक्षित डिजिटल भुगतान — किसानों के लिए संपूर्ण मंच।'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => onNavigateTab('market-prices')}
                className="inline-flex items-center gap-2 bg-[#174d26] hover:bg-[#123e1e] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-[#174d26]/20 transition hover:scale-[1.02] cursor-pointer"
              >
                <BarChart2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Check Market Prices' : 'मंडी भाव देखें'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('sell-produce')}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3 rounded-xl border border-slate-300/90 shadow-xs transition hover:scale-[1.02] cursor-pointer"
              >
                <Tag className="w-4 h-4 text-slate-600" />
                <span>{language === 'en' ? 'List Your Produce' : 'अपनी फसल बेचें'}</span>
              </button>
            </div>

            {/* Social Proof Trust Badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  alt="Farmer 1" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                  alt="Farmer 2" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
                  alt="Farmer 3" 
                />
              </div>
              <span className="text-xs font-medium text-slate-600">
                {language === 'en' 
                  ? 'Trusted by 25,000+ Farmers & FPOs across India' 
                  : 'भारत भर में 25,000+ किसानों व FPOs का विश्वास'}
              </span>
            </div>
          </div>

          {/* Right Hero Image & Floating Mission Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden shadow-lg border border-white/60">
              
              {/* Farmer Image in Lush Fields */}
              <img 
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=900&auto=format&fit=crop&q=80" 
                alt="Happy Indian Farmer in agricultural farm field" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
              
              {/* Subtle Warm Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Floating Mission Card (Matching Reference Screenshot) */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/80 max-w-[185px] space-y-2 animate-slide-up">
                <div className="w-8 h-8 rounded-lg bg-[#eaf6ed] flex items-center justify-center text-[#174d26]">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">Better Price</div>
                  <div className="text-xs font-extrabold text-[#174d26] leading-tight">Better Future</div>
                </div>
                <div className="text-[10px] text-slate-500 font-medium space-y-0.5 leading-tight pt-1">
                  <div>Transparent markets</div>
                  <div>Stronger farmers</div>
                  <div>Stronger India</div>
                </div>
                <div className="w-6 h-0.5 bg-[#174d26] rounded-full mt-1"></div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN 4-MODULE DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Module 1: Today's Market Prices */}
        <div className="farm-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? "Today's Market Prices" : 'आज के मंडी भाव'}
              </h3>
              <button 
                onClick={() => onNavigateTab('market-prices')}
                className="text-xs font-medium text-slate-400 hover:text-[#174d26] transition"
              >
                {language === 'en' ? 'View All' : 'सभी देखें'}
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {marketPrices.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#eaf6ed] text-[#174d26] flex items-center justify-center shrink-0">
                      <Sprout className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.mandi}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">
                      ₹ {item.price} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                    </div>
                    <div className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                      item.isPositive ? 'text-emerald-600' : 'text-rose-500'
                    }`}>
                      {item.isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                      <span>{item.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module 2: Best Selling Market */}
        <div className="farm-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Best Selling Market' : 'श्रेष्ठ विक्रय मंडियां'}
              </h3>
              <button 
                onClick={() => onNavigateTab('market-prices')}
                className="text-xs font-medium text-slate-400 hover:text-[#174d26] transition"
              >
                {language === 'en' ? 'View All' : 'सभी देखें'}
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {bestSellingMarkets.map((m) => (
                <div key={m.rank} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold w-3 text-center">{m.rank}</span>
                    <span className="font-semibold text-slate-800">{m.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">₹ {m.price}</span>
                    {m.isBest && (
                      <span className="text-[10px] bg-[#eaf6ed] text-[#18582b] font-bold px-2 py-0.5 rounded-full">
                        {language === 'en' ? 'Best Price' : 'उत्तम भाव'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onNavigateTab('market-prices')}
            className="w-full mt-4 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer text-center"
          >
            {language === 'en' ? 'Compare More Markets' : 'अन्य मंडियों की तुलना करें'}
          </button>
        </div>

        {/* Module 3: Price Trend (Wheat) */}
        <div className="farm-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Price Trend (Wheat)' : 'मूल्य रुझान (गेहूं)'}
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md cursor-pointer">
                <span>7 Days</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
            </div>

            {/* Recharts Area Curve */}
            <div className="h-36 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 18, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 9, fill: '#94a3b8' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    domain={[1900, 2200]} 
                    ticks={[1900, 2000, 2100, 2200]} 
                    tick={{ fontSize: 9, fill: '#94a3b8' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      borderRadius: '8px', 
                      color: '#fff', 
                      fontSize: '11px',
                      border: 'none'
                    }} 
                    formatter={(value) => [`₹ ${value}`, 'Price']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#16a34a" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    dot={{ r: 2.5, fill: '#16a34a' }}
                    activeDot={{ r: 4.5, fill: '#15803d' }}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Peak Marker Badge matching screenshot */}
              <div className="absolute top-0 right-1 bg-white/90 backdrop-blur border border-slate-200 px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-800 shadow-xs">
                ₹ 2,125 <span className="font-normal text-slate-400">20 May</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigateTab('market-prices')}
            className="w-full mt-3 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer text-center"
          >
            {language === 'en' ? 'View Full Trend' : 'पूर्ण रुझान देखें'}
          </button>
        </div>

        {/* Module 4: Verified Buyers & Recommended Window Stack */}
        <div className="flex flex-col gap-4 justify-between">
          
          {/* Top Widget: Verified Buyers */}
          <div 
            onClick={() => onNavigateTab('find-buyers')}
            className="farm-card p-5 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition group flex-1"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === 'en' ? 'Verified Buyers' : 'सत्यापित खरीदार'}
                </div>
                <div className="text-xl font-black text-slate-900 tracking-tight">1,248+</div>
                <div className="text-[10px] text-slate-400">Across India</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
          </div>

          {/* Bottom Widget: Recommended Sale Window */}
          <div 
            onClick={() => onNavigateTab('market-prices')}
            className="farm-card p-5 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition group flex-1"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === 'en' ? 'Recommended Sale Window' : 'अनुशंसित बिक्री समय'}
                </div>
                <div className="text-lg font-black text-slate-900 tracking-tight">21 – 24 May</div>
                <div className="text-[10px] text-emerald-600 font-medium">High demand expected</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
          </div>

        </div>

      </div>

      {/* 3. BOTTOM ROW: MARKET MAP (MAHARASHTRA) & HOW IT WORKS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Market Map (Maharashtra) */}
        <div className="lg:col-span-4 farm-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Market Map (Maharashtra)' : 'मंडी मानचित्र (महाराष्ट्र)'}
              </h3>
            </div>

            {/* Stylized Maharashtra SVG Vector Map matching screenshot */}
            <div className="relative w-full h-44 my-2 flex items-center justify-center bg-[#f8faf8] rounded-xl overflow-hidden border border-slate-100">
              
              {/* Soft SVG map representation */}
              <svg viewBox="0 0 300 200" className="w-full h-full text-slate-200 fill-[#eef5ee] stroke-emerald-200 stroke-1">
                <path d="M 40,80 Q 70,30 130,40 T 220,60 T 270,110 T 240,160 T 160,180 T 80,160 T 35,130 Z" />
              </svg>

              {/* Pin: Nashik */}
              <div className="absolute top-9 left-24 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-md shadow-xs border border-slate-200 text-[10px]">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <div>
                  <span className="font-bold text-slate-800">Nashik</span>
                  <span className="text-slate-400 block text-[9px]">₹ 2,125</span>
                </div>
              </div>

              {/* Pin: Ahmednagar */}
              <div className="absolute top-16 right-16 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-md shadow-xs border border-slate-200 text-[10px]">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <div>
                  <span className="font-bold text-slate-800">Ahmednagar</span>
                  <span className="text-slate-400 block text-[9px]">₹ 1,980</span>
                </div>
              </div>

              {/* Pin: Pune */}
              <div className="absolute bottom-11 left-20 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-md shadow-xs border border-slate-200 text-[10px]">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <div>
                  <span className="font-bold text-slate-800">Pune</span>
                  <span className="text-slate-400 block text-[9px]">₹ 2,045</span>
                </div>
              </div>

              {/* Pin: Solapur */}
              <div className="absolute bottom-6 right-20 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-md shadow-xs border border-slate-200 text-[10px]">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <div>
                  <span className="font-bold text-slate-800">Solapur</span>
                  <span className="text-slate-400 block text-[9px]">₹ 1,965</span>
                </div>
              </div>

            </div>
          </div>

          <button 
            onClick={() => onNavigateTab('market-prices')}
            className="w-full mt-2 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Map className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'en' ? 'Explore All Markets' : 'सभी मंडियां देखें'}</span>
          </button>
        </div>

        {/* Right: How It Works (6-Step Progression) */}
        <div className="lg:col-span-8 farm-card p-6 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}
              </h3>
            </div>

            {/* 6 Connected Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 pb-2 relative">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-full border border-emerald-300 bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition shadow-xs">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1. Register</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Create your account as Farmer / FPO</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-full border border-emerald-300 bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition shadow-xs">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">2. Check Prices</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Compare live mandi prices & trends</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-full border border-emerald-300 bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition shadow-xs">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">3. List Produce</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Add produce lot with quality & quantity</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-full border border-emerald-300 bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">4. Get Offers</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Receive offers from verified buyers</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-full border border-emerald-300 bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition shadow-xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">5. Arrange Logistics</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Choose transport & storage options</p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-full border border-emerald-300 bg-[#eaf6ed] flex items-center justify-center text-[#18582b] group-hover:scale-110 transition shadow-xs">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">6. Get Paid</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Secure payments & track transactions</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM 3-PILLAR TRUST BANNER (MATCHING SCREENSHOT) */}
      <div className="farm-card p-6 bg-white border border-[#eef0eb]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-6 md:gap-0">
          
          {/* Pillar 1 */}
          <div className="flex items-center gap-4 px-2 md:px-6">
            <div className="p-3 rounded-xl bg-[#eaf6ed] text-[#18582b] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === 'en' ? 'Verified Buyers' : 'सत्यापित खरीदार'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'en' 
                  ? 'All buyers are verified for trust & transparency' 
                  : 'विश्वास व पारदर्शिता के लिए सभी खरीदार प्रमाणित हैं'}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-center gap-4 px-2 md:px-6 pt-4 md:pt-0">
            <div className="p-3 rounded-xl bg-[#eaf6ed] text-[#18582b] shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === 'en' ? 'Transparent Offers' : 'पारदर्शी बोलियां'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'en' 
                  ? 'Digital offers & clear terms, no hidden charges' 
                  : 'स्पष्ट शर्तों के साथ डिजिटल बोलियां, कोई छिपा शुल्क नहीं'}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-center gap-4 px-2 md:px-6 pt-4 md:pt-0">
            <div className="p-3 rounded-xl bg-[#eaf6ed] text-[#18582b] shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === 'en' ? 'Secure Payments' : 'सुरक्षित भुगतान'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'en' 
                  ? 'Safe transactions with payment tracking' 
                  : 'एस्क्रो व प्रत्यक्ष DBT से सुरक्षित लेन-देन'}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

