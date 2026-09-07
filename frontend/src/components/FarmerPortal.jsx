import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  Warehouse, 
  AlertTriangle, 
  ArrowUpRight, 
  Check, 
  RefreshCw,
  Clock,
  Building,
  Scale,
  BarChart3,
  Sprout,
  X,
  Zap
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

export const FarmerPortal = ({ onOpenAiGrader, prefillData, onClearPrefill, initialTab = 'intelligence' }) => {
  const { 
    language, 
    mandiPrices, 
    lots, 
    createProduceLot, 
    acceptOffer, 
    counterOffer, 
    storages, 
    storageBookings, 
    bookColdStorage,
    fileGrievance,
    crops
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab); // 'intelligence' | 'lots' | 'storage' | 'grievance'
  
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [selectedCropId, setSelectedCropId] = useState('onion');
  
  // Create Lot Modal State
  const [isLotModalOpen, setIsLotModalOpen] = useState(false);
  const [lotForm, setLotForm] = useState({
    crop: 'Onion (Red)',
    variety: 'Nashik Garva Red',
    grade: 'Grade A',
    moisturePercent: 11.2,
    quantityQtl: 350,
    reservePricePerQtl: 2450,
    harvestDate: '2026-09-02',
    farmerName: 'Ramesh Balasaheb Patil',
    fpoName: 'Nashik Sahyadri Farmer Producer Co.',
    location: 'Niphad, Nashik',
    state: 'Maharashtra',
    qualityCert: 'AGMARK-VERIFIED-2026',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
  });

  // If prefilled from AI Grader
  React.useEffect(() => {
    if (prefillData) {
      setLotForm(prev => ({
        ...prev,
        crop: prefillData.crop || prev.crop,
        grade: prefillData.grade || prev.grade,
        moisturePercent: prefillData.moisturePercent || prev.moisturePercent,
        reservePricePerQtl: prefillData.reservePricePerQtl || prev.reservePricePerQtl,
        imageUrl: prefillData.imageUrl || prev.imageUrl
      }));
      setIsLotModalOpen(true);
      onClearPrefill();
    }
  }, [prefillData]);

  // Storage Booking Modal
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [storageQty, setStorageQty] = useState(150);
  const [storageDays, setStorageDays] = useState(14);

  // Counter offer modal
  const [counterState, setCounterState] = useState({ open: false, lotId: null, offerId: null, price: 2450 });

  // Grievance Form
  const [grievanceForm, setGrievanceForm] = useState({
    crop: 'Onion (Red)',
    issueType: 'Quality Dispute on Arrival',
    buyerName: 'BigBasket Fresh Procurements',
    description: ''
  });

  const activeMandi = mandiPrices.find(m => m.cropId === selectedCropId) || mandiPrices[0];

  const handleCreateLotSubmit = (e) => {
    e.preventDefault();
    createProduceLot({
      ...lotForm,
      quantityQtl: Number(lotForm.quantityQtl),
      reservePricePerQtl: Number(lotForm.reservePricePerQtl),
      images: [lotForm.imageUrl]
    });
    setIsLotModalOpen(false);
    setActiveTab('lots');
  };

  const handleBookStorageSubmit = (e) => {
    e.preventDefault();
    if (!selectedStorage) return;
    bookColdStorage(selectedStorage.id, storageQty, storageDays);
    setSelectedStorage(null);
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    fileGrievance(grievanceForm);
    setGrievanceForm({
      crop: 'Onion (Red)',
      issueType: 'Quality Dispute on Arrival',
      buyerName: 'BigBasket Fresh Procurements',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Farmer Banner & Quick Stats */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-56 h-56 bg-white/5 rounded-full blur-2xl"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Verified FPO Producer • Member ID: FPO-MH-2024-09</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {language === 'en' ? 'Farmer & FPO Command Center' : 'किसान व FPO कमांड सेंटर'}
            </h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-xl">
              {language === 'en' 
                ? 'Welcome, Ramesh Balasaheb Patil (Nashik Sahyadri FPO). Real-time mandi rates, AI sale-window forecasting, lot management, and direct buyer offers.'
                : 'स्वागत है, रमेश बालासाहेब पाटिल (नासिक सह्याद्री FPO)। रीयल-टाइम मंडी भाव, AI बिक्री विंडो सलाह, लॉट प्रबंधन और सीधे खरीदार प्रस्ताव।'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLotModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-md shadow-amber-400/20 flex items-center gap-2 transition hover:scale-102"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'en' ? 'Create Produce Lot' : 'नया लॉट बनाएं'}</span>
            </button>
            <button
              onClick={onOpenAiGrader}
              className="bg-emerald-900/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Quality Assay</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-emerald-600/60 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === 'intelligence'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{language === 'en' ? 'Mandi Intelligence & AI Sale Window' : 'मंडी भाव व AI सेल विंडो'}</span>
          </button>
          <button
            onClick={() => setActiveTab('lots')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === 'lots'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{language === 'en' ? 'My Produce Lots & Bids' : 'मेरे लॉट व बोलियां'} ({lots.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === 'storage'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>{language === 'en' ? 'Cold Storage & Warehousing' : 'कोल्ड स्टोरेज'} ({storages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('grievance')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === 'grievance'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{language === 'en' ? 'Grievance Support' : 'शिकायत निवारण'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MANDI INTELLIGENCE & AI SALE WINDOW */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          
          {/* Commodity Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {mandiPrices.map((m) => (
              <button
                key={m.cropId}
                onClick={() => setSelectedCropId(m.cropId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 ${
                  selectedCropId === m.cropId
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{m.cropName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                  m.change >= 0 
                    ? selectedCropId === m.cropId ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'
                    : selectedCropId === m.cropId ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'
                }`}>
                  {m.change >= 0 ? `+${m.change}%` : `${m.change}%`}
                </span>
              </button>
            ))}
          </div>

          {/* AI Sale Window Alert Banner */}
          <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
            activeMandi.saleWindow.recommendation === 'HOLD'
              ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
              : activeMandi.saleWindow.recommendation === 'SELL NOW'
              ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full text-white shadow-sm flex items-center gap-1 ${
                    activeMandi.saleWindow.recommendation === 'HOLD' ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {activeMandi.saleWindow.recommendation === 'HOLD' ? (
                      <>
                        <Clock className="w-3.5 h-3.5 inline" />
                        <span>AI ADVISORY: HOLD PRODUCE</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 inline" />
                        <span>AI ADVISORY: SELL NOW</span>
                      </>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    Confidence: <strong className="text-slate-900">{activeMandi.saleWindow.confidence}%</strong>
                  </span>
                  <span className="text-[11px] text-slate-400">• Agmarknet Machine Learning Engine</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'en' ? activeMandi.saleWindow.adviceEn : activeMandi.saleWindow.adviceHi}
                </h3>
              </div>

              <div className="bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-slate-200/80 shrink-0 text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Target Realization Window
                </div>
                <div className="text-base font-black text-slate-900">
                  {activeMandi.saleWindow.targetPriceWindow}
                </div>
                <div className="text-[11px] font-bold text-emerald-600">
                  Projected Gain: +10% to +14%
                </div>
              </div>
            </div>
          </div>

          {/* Mandi Detail Cards & Price Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live APMC Metric Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Selected Market</span>
                  <h4 className="text-lg font-black text-slate-900">{activeMandi.mandi}</h4>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{activeMandi.state}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-100">
                  ₹
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Modal Selling Price</div>
                  <div className="text-3xl font-black text-emerald-700 mt-0.5">
                    ₹{activeMandi.modalPrice.toLocaleString('en-IN')}
                    <span className="text-xs font-semibold text-slate-500"> / Qtl</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Min Price</div>
                    <div className="text-sm font-bold text-slate-800">
                      ₹{activeMandi.minPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Max Price</div>
                    <div className="text-sm font-bold text-slate-800">
                      ₹{activeMandi.maxPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Daily Arrivals: </span>
                    <strong className="text-emerald-900">{activeMandi.arrivalsMT} Metric Tonnes</strong>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Healthy Supply
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setLotForm(prev => ({
                    ...prev,
                    crop: activeMandi.cropName,
                    reservePricePerQtl: activeMandi.modalPrice + 70
                  }));
                  setIsLotModalOpen(true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
              >
                <span>List My Lot for {activeMandi.cropName}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Historical + 14-Day Price Forecast Chart */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      30-Day Price Trend & Predictive Forecast
                    </h4>
                    <p className="text-xs text-slate-500">
                      Historical Agmarknet settlement vs AI arrival pressure projection
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      <span>Recorded</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>AI Projected</span>
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeMandi.history} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                        formatter={(val) => [`₹${val}/Qtl`, 'Price']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#059669" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#priceGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Data Source: Agmarknet API / Ministry of Agriculture & Farmers Welfare</span>
                <span className="font-semibold text-emerald-700">Updated: Real-time APMC feed</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: MY PRODUCE LOTS & DIGITAL BIDS */}
      {activeTab === 'lots' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {language === 'en' ? 'Active Digital Lots & Buyer Bids' : 'सक्रिय लॉट एवं खरीदारों के प्रस्ताव'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'en' 
                  ? 'Compare binding offers from corporate retailers, processors, and exporters. No middleman commission.'
                  : 'बिना किसी आढ़ती कमीशन के सीधे कॉर्पोरेट खरीदारों के प्रस्तावों की तुलना करें।'}
              </p>
            </div>

            <button
              onClick={() => setIsLotModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'en' ? 'Create New Lot' : 'नया लॉट जोड़ें'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {lots.map((lot) => (
              <div 
                key={lot.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="p-5 flex flex-col lg:flex-row gap-5">
                  {/* Lot Image & Cert */}
                  <div className="w-full lg:w-48 h-40 rounded-xl overflow-hidden relative bg-slate-100 shrink-0">
                    <img 
                      src={lot.images[0]} 
                      alt={lot.crop} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {lot.id}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                      {lot.grade}
                    </div>
                  </div>

                  {/* Lot Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-extrabold text-slate-900">{lot.variety || lot.crop}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            lot.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                            lot.status === 'SOLD' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {lot.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lot.location}, {lot.state} • {lot.fpoName}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Reserve Price</div>
                        <div className="text-lg font-black text-slate-900">
                          ₹{lot.reservePricePerQtl.toLocaleString('en-IN')}
                          <span className="text-xs font-semibold text-slate-500"> / Qtl</span>
                        </div>
                      </div>
                    </div>

                    {/* Lot Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Total Quantity</span>
                        <div className="font-extrabold text-slate-800 mt-0.5">{lot.quantityQtl} Quintals</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Moisture Content</span>
                        <div className="font-extrabold text-slate-800 mt-0.5">{lot.moisturePercent}% (Dry Assayed)</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Harvest Date</span>
                        <div className="font-extrabold text-slate-800 mt-0.5">{lot.harvestDate}</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Quality Standard</span>
                        <div className="font-extrabold text-emerald-700 truncate mt-0.5">{lot.qualityCert || 'Agmark Assayed'}</div>
                      </div>
                    </div>

                    {/* Received Offers Section */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Buyer Offers Received ({lot.offers ? lot.offers.length : 0})</span>
                        </div>
                        {lot.offers && lot.offers.length > 0 && (
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            Highest Bid: ₹{Math.max(...lot.offers.map(o => o.bidPricePerQtl))}/Qtl
                          </span>
                        )}
                      </div>

                      {lot.offers && lot.offers.length > 0 ? (
                        <div className="space-y-2">
                          {lot.offers.map((offer) => (
                            <div 
                              key={offer.id}
                              className="bg-slate-50 hover:bg-emerald-50/40 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-xs text-slate-900">{offer.buyerName}</span>
                                  <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                                    {offer.buyerType}
                                  </span>
                                  <span className="text-[10px] text-slate-400">• {offer.submittedAt}</span>
                                </div>
                                <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                                  <span>Offer: <strong className="text-emerald-700">₹{offer.bidPricePerQtl}/Qtl</strong></span>
                                  <span>Quantity: <strong>{offer.offeredQuantityQtl} Qtl</strong></span>
                                  <span>Total: <strong className="text-slate-900">₹{offer.totalAmount.toLocaleString('en-IN')}</strong></span>
                                  <span>Terms: {offer.paymentTerms}</span>
                                </div>
                                {offer.status === 'COUNTERED' && (
                                  <div className="text-[11px] font-semibold text-amber-700 mt-1">
                                    {offer.statusNote || `Counter proposal sent at ₹${offer.counterPricePerQtl}/Qtl`}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {lot.status === 'SOLD' ? (
                                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                                    Deal Locked & In Transit
                                  </span>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => setCounterState({ open: true, lotId: lot.id, offerId: offer.id, price: lot.reservePricePerQtl })}
                                      className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition"
                                    >
                                      Counter Offer
                                    </button>
                                    <button
                                      onClick={() => acceptOffer(lot.id, offer.id)}
                                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/20 flex items-center gap-1 transition"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                      <span>Accept Deal</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-4 rounded-xl text-center text-xs text-slate-500 border border-dashed border-slate-300">
                          No active bids yet. Your lot is highlighted to 60+ verified institutional buyers on KisanSetu.
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: COLD STORAGE & WAREHOUSING */}
      {activeTab === 'storage' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {language === 'en' ? 'Nearby WDRA-Certified Cold Storages & Silos' : 'नजदीकी कोल्ड स्टोरेज व वेयरहाउस'}
              </h3>
              <p className="text-xs text-slate-500">
                Prevent post-harvest distress selling by holding produce in government-certified warehouses with e-NWR receipt financing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storages.map((cs) => (
              <div 
                key={cs.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1 border border-emerald-200/60">
                        {cs.verifiedGovtLicense}
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{cs.name}</h4>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cs.location} ({cs.distanceKm} km away)</span>
                    </div>
                    <div>
                      <strong>Climate:</strong> {cs.tempRange}
                    </div>
                    <div>
                      <strong>Suitable for:</strong> {cs.suitableFor.join(', ')}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Available Space:</span>
                      <strong className="text-emerald-700">{cs.availableCapacityMT} MT / {cs.totalCapacityMT} MT</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full rounded-full" 
                        style={{ width: `${(cs.availableCapacityMT / cs.totalCapacityMT) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-slate-500">Daily Tariff:</span>
                      <strong className="text-slate-900">₹{cs.dailyRatePerQtl} / Qtl / day</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Help: {cs.contactNumber}
                  </div>
                  <button
                    onClick={() => setSelectedStorage(cs)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition"
                  >
                    Book Space
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bookings History */}
          {storageBookings.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h4 className="font-extrabold text-sm text-slate-900 mb-3">Your Active Storage Reservations</h4>
              <div className="space-y-2">
                {storageBookings.map((b) => (
                  <div key={b.bookingId} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{b.storageName}</div>
                      <div className="text-slate-500">{b.quantityQtl} Quintals for {b.days} days • Booked on {b.bookedOn}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-emerald-700">₹{b.totalCost.toLocaleString('en-IN')}</div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: GRIEVANCE SUPPORT */}
      {activeTab === 'grievance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              File a Dispute or Grievance
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              All transactions on KisanSetu are protected under APMC digital arbitration. If a buyer rejects goods unfairly or delays weighment, file a ticket here.
            </p>

            <form onSubmit={handleGrievanceSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Crop</label>
                  <select 
                    value={grievanceForm.crop}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, crop: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  >
                    <option>Onion (Red)</option>
                    <option>Wheat (Sharbati)</option>
                    <option>Tomato (Hybrid)</option>
                    <option>Guntur Red Chilli</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grievance Category</label>
                  <select 
                    value={grievanceForm.issueType}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, issueType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  >
                    <option>Quality Dispute on Arrival</option>
                    <option>Weighbridge Weight Discrepancy</option>
                    <option>Transit Delay by Logistics</option>
                    <option>Escrow Payment Hold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Buyer Enterprise Name</label>
                <input 
                  type="text"
                  value={grievanceForm.buyerName}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, buyerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description of Issue</label>
                <textarea 
                  rows={4}
                  value={grievanceForm.description}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                  placeholder="Explain what happened at the unloading dock, weighbridge difference, or photo proof details..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl shadow transition"
              >
                Submit Grievance to Mandi Arbitrator
              </button>
            </form>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>APMC Farmer Protection Guarantee</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Every buyer deposit is held in a tri-party Escrow account. Neither party can withdraw funds unilaterally once transport dispatch begins.
            </p>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">Resolution Process:</div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600">
                <li>Ticket assigned to APMC Mandi Officer</li>
                <li>Digital weighment & assay inspection</li>
                <li>Settlement within 24 hours</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* CREATE LOT MODAL */}
      {isLotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  {language === 'en' ? 'Create Digital Produce Lot' : 'डिजिटल उत्पाद लॉट बनाएं'}
                </h3>
                <p className="text-xs text-slate-500">
                  Direct listing to verified national corporate buyers & export aggregators
                </p>
              </div>
              <button 
                onClick={() => setIsLotModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLotSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Crop</label>
                  <select
                    value={lotForm.crop}
                    onChange={(e) => setLotForm({ ...lotForm, crop: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    {crops.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specific Variety</label>
                  <input
                    type="text"
                    value={lotForm.variety}
                    onChange={(e) => setLotForm({ ...lotForm, variety: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    value={lotForm.quantityQtl}
                    onChange={(e) => setLotForm({ ...lotForm, quantityQtl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reserve Price (₹/Qtl)</label>
                  <input
                    type="number"
                    value={lotForm.reservePricePerQtl}
                    onChange={(e) => setLotForm({ ...lotForm, reservePricePerQtl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grade</label>
                  <select
                    value={lotForm.grade}
                    onChange={(e) => setLotForm({ ...lotForm, grade: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option>Grade A+</option>
                    <option>Grade A</option>
                    <option>Grade B</option>
                    <option>Grade C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Moisture % (Assayed)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={lotForm.moisturePercent}
                    onChange={(e) => setLotForm({ ...lotForm, moisturePercent: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Harvest Date</label>
                  <input
                    type="date"
                    value={lotForm.harvestDate}
                    onChange={(e) => setLotForm({ ...lotForm, harvestDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Mandi Hub</label>
                <input
                  type="text"
                  value={lotForm.location}
                  onChange={(e) => setLotForm({ ...lotForm, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLotModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
                >
                  Publish Lot to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STORAGE BOOKING MODAL */}
      {selectedStorage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-slate-900">
              Book Space at {selectedStorage.name}
            </h3>
            <p className="text-slate-500">
              Daily rate: ₹{selectedStorage.dailyRatePerQtl}/quintal. Temperature: {selectedStorage.tempRange}
            </p>

            <form onSubmit={handleBookStorageSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Quantity to Store (Quintals)</label>
                <input 
                  type="number"
                  value={storageQty}
                  onChange={(e) => setStorageQty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  max={selectedStorage.availableCapacityMT * 10}
                  min="10"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Storage Duration (Days)</label>
                <input 
                  type="number"
                  value={storageDays}
                  onChange={(e) => setStorageDays(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  min="1"
                  max="180"
                  required
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex justify-between items-center">
                <span className="font-semibold text-emerald-900">Estimated Total Cost:</span>
                <span className="font-black text-sm text-emerald-800">
                  ₹{Math.round(storageQty * selectedStorage.dailyRatePerQtl * storageDays).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStorage(null)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold shadow"
                >
                  Confirm Storage Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COUNTER OFFER MODAL */}
      {counterState.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <h4 className="font-extrabold text-sm text-slate-900">Send Counter Proposal to Buyer</h4>
            <p className="text-slate-500">
              Specify your proposed rate per quintal. The buyer will be notified immediately.
            </p>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Counter Price (₹ / Quintal)</label>
              <input 
                type="number"
                value={counterState.price}
                onChange={(e) => setCounterState({ ...counterState, price: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCounterState({ open: false, lotId: null, offerId: null, price: 2450 })}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  counterOffer(counterState.lotId, counterState.offerId, counterState.price);
                  setCounterState({ open: false, lotId: null, offerId: null, price: 2450 });
                }}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold shadow"
              >
                Send Counter Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
