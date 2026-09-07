import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Warehouse, 
  Scale, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  Lock, 
  Bot, 
  Layers,
  ArrowUpRight,
  Zap,
  Globe2,
  Users
} from 'lucide-react';
import { PLATFORM_IMPACT_METRICS, MANDI_PRICES, CROPS_CATALOG } from '../data/mandiData';

export const PlatformOverview = ({ onSelectRole, onOpenAiGrader, onOpenKisanBot }) => {
  const { language, lots, orders } = useApp();

  const roleCards = [
    {
      id: 'farmer',
      title: language === 'en' ? 'Farmer & FPO Desk' : 'किसान व FPO डेस्क',
      badge: language === 'en' ? 'Primary Producer' : 'उत्पादक',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Sprout,
      gradient: 'from-emerald-600 to-teal-700',
      tagline: language === 'en' ? 'List produce lots with AI grading, view price forecasts, and receive buyer bids.' : 'AI ग्रेडिंग के साथ उत्पाद सूचीबद्ध करें, मूल्य पूर्वानुमान देखें और सीधे खरीदारों से बोलियां प्राप्त करें।',
      features: [
        language === 'en' ? 'Computer Vision Quality Assaying (Grade A/B/C)' : 'कंप्यूटर विज़न गुणवत्ता परीक्षण (ग्रेड A/B/C)',
        language === 'en' ? '7-Day AI Mandi Price Trend & Best-Time-To-Sell' : '7 दिवसीय AI मंडी भाव पूर्वानुमान व बिक्री सलाह',
        language === 'en' ? 'Nearby WDRA Cold Storage space booking' : 'नज़दीकी कोल्ड स्टोरेज में स्थान बुकिंग',
        language === 'en' ? 'Direct counter-offer & digital contract locking' : 'सीधे काउंटर-ऑफ़र व डिजिटल अनुबंध'
      ]
    },
    {
      id: 'buyer',
      title: language === 'en' ? 'Institutional Buyer Exchange' : 'संस्थागत खरीदार बाज़ार',
      badge: language === 'en' ? 'Procurement' : 'खरीद',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Building2,
      gradient: 'from-blue-600 to-indigo-700',
      tagline: language === 'en' ? 'Source verified farm-gate produce at scale with 100% escrow milestone protection.' : '100% एस्क्रो सुरक्षा के साथ सीधे फार्म-गेट से सत्यापित उपज की थोक खरीद करें।',
      features: [
        language === 'en' ? 'Browse verified FPO lots with lab quality reports' : 'सत्यापित FPO लॉट व लैब गुणवत्ता रिपोर्ट ब्राउज़ करें',
        language === 'en' ? 'Submit competitive bids & post bulk demand tenders' : 'प्रतिस्पर्धी बोलियां लगाएं और मांग निविदाएं जारी करें',
        language === 'en' ? 'Milestone-based digital escrow payment holding' : 'माइलस्टोन आधारित डिजिटल एस्क्रो भुगतान',
        language === 'en' ? 'Direct GST and e-NAM invoice compliance' : 'जीएसटी और ई-नाम अनुपालन बिलिंग'
      ]
    },
    {
      id: 'transporter',
      title: language === 'en' ? 'Agri Logistics & Dispatch Fleet' : 'कृषि परिवहन व वाहन चालक',
      badge: language === 'en' ? 'Cold Chain & Fleet' : 'परिवहन',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Truck,
      gradient: 'from-amber-600 to-orange-700',
      tagline: language === 'en' ? 'Farm-gate pickup orchestration, FASTag route tracking, and digital Proof-of-Delivery.' : 'खेत से पिकअप, फास्टैग जीपीएस ट्रैकिंग और डिजिटल डिलीवरी सत्यापन।',
      features: [
        language === 'en' ? 'Optimized rural-to-urban mandi route allocation' : 'ग्रामीण से शहरी मंडी तक इष्टतम रूट आवंटन',
        language === 'en' ? 'Real-time GPS dispatch & FASTag toll telemetry' : 'रीयल-टाइम जीपीएस ट्रैकिंग व फास्टैग एकीकरण',
        language === 'en' ? 'Digital Proof-of-Delivery (e-POD) upload' : 'डिजिटल डिलीवरी प्रमाण (e-POD) अपलोड',
        language === 'en' ? 'Automated freight settlement on delivery sign-off' : 'डिलीवरी होते ही स्वचालित भाड़ा भुगतान'
      ]
    },
    {
      id: 'admin',
      title: language === 'en' ? 'APMC Mandi Board & Govt Oversight' : 'मंडी विनियामक व सरकारी नियंत्रण',
      badge: language === 'en' ? 'Regulatory' : 'प्रशासन',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: ShieldCheck,
      gradient: 'from-purple-700 to-slate-900',
      tagline: language === 'en' ? 'State regulatory oversight, FPO/Buyer KYC verification, and instant dispute arbitration.' : 'राज्य विनियामक निगरानी, FPO/खरीदार केवाईसी और त्वरित विवाद समाधान।',
      features: [
        language === 'en' ? 'Real-time trade settlement & mandi fee monitoring' : 'रीयल-टाइम व्यापार निपटान व मंडी शुल्क निगरानी',
        language === 'en' ? 'FPO and institutional buyer KYC document approval' : 'FPO और संस्थागत खरीदार केवाईसी दस्तावेज़ अनुमोदन',
        language === 'en' ? 'Grievance redressal with weighbridge arbitration' : 'धर्मकांटा व वजन विसंगति विवाद निवारण',
        language === 'en' ? 'APMC trade compliance & Agmarknet synchronizer' : 'एगमार्कनेट व ई-नाम राष्ट्रीय एकीकरण'
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Hero Showcase Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white p-8 md:p-12 shadow-2xl border border-emerald-800/40">
        
        {/* Subtle Decorative Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs tracking-wide uppercase shadow-md shadow-amber-500/20">
              <Award className="w-3.5 h-3.5" /> Smart India Hackathon 2026
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur text-emerald-200 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              Problem ID: <strong className="text-white">26132</strong>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-semibold">
              Team: <strong className="text-white">INCREDIBLE_X_TECH</strong>
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Kisan<span className="text-emerald-400">Setu</span> Digital Agricultural Intelligence Platform
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {language === 'en' 
                ? 'Empowering 140M+ Indian farmers with AI-driven multi-mandi price discovery, computer vision produce assaying, direct-to-buyer escrow trading, and integrated cold-storage logistics.'
                : 'भारतीय किसानों के लिए AI-संचालित बहु-मंडी मूल्य खोज, कंप्यूटर विज़न गुणवत्ता परीक्षण, सीधे खरीदार एस्क्रो व्यापार और एकीकृत कोल्ड स्टोरेज लॉजिस्टिक्स।'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectRole('farmer')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition hover:scale-102 cursor-pointer"
            >
              <Sprout className="w-5 h-5" />
              <span>{language === 'en' ? 'Launch Farmer Portal' : 'किसान पोर्टल खोलें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectRole('buyer')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/20 backdrop-blur transition hover:scale-102 cursor-pointer"
            >
              <Building2 className="w-5 h-5 text-blue-300" />
              <span>{language === 'en' ? 'Buyer Marketplace' : 'खरीदार बाज़ार'}</span>
            </button>

            <button
              onClick={onOpenAiGrader}
              className="inline-flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-5 py-3 rounded-xl border border-amber-400/40 backdrop-blur transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Quality Assayer Demo</span>
            </button>

            <button
              onClick={onOpenKisanBot}
              className="inline-flex items-center gap-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold px-5 py-3 rounded-xl border border-teal-400/40 backdrop-blur transition cursor-pointer"
            >
              <Bot className="w-4 h-4 text-teal-400" />
              <span>Kisan AI Sahayak Bot</span>
            </button>
          </div>

        </div>

      </div>

      {/* Real-World Impact KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'en' ? 'Farmer Net Income' : 'किसान आय में वृद्धि'}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {PLATFORM_IMPACT_METRICS.farmerPriceRealizationIncrease}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            ↑ {language === 'en' ? 'Direct farm-gate price realization' : 'फार्म-गेट भाव में सीधी बढ़ोतरी'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'en' ? 'Middleman Cut' : 'बिचौलियों का कमीशन घटा'}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            -{PLATFORM_IMPACT_METRICS.middlemanMarginCut}
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">
            ↓ {language === 'en' ? 'Reduced commission leakage' : 'कमीशन लीकेज में भारी कमी'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'en' ? 'Post-Harvest Loss' : 'फसल बर्बादी रोकथाम'}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Warehouse className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {PLATFORM_IMPACT_METRICS.postHarvestLossReduction}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">
            ↓ {language === 'en' ? 'Via real-time cold storage linkage' : 'कोल्ड स्टोरेज लिंकेज द्वारा'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'en' ? 'Escrow Trade Volume' : 'एस्क्रो सुरक्षित व्यापार'}</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {PLATFORM_IMPACT_METRICS.totalTradeVolumeINR}
          </div>
          <p className="text-[11px] text-purple-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'en' ? '100% dispute-free digital settlement' : '100% सुरक्षित डिजिटल निपटान'}</span>
          </p>
        </div>

      </div>

      {/* Interactive Role Switcher Explorer Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'en' ? 'Explore Interactive Stakeholder Portals' : 'हितधारक पोर्टल अन्वेषण करें'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {language === 'en' 
                ? 'Click any persona card below to switch role and experience full live operational workflows.' 
                : 'नीचे किसी भी कार्ड पर क्लिक करके उस भूमिका में जाएं और लाइव वर्कफ़्लो का अनुभव करें।'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleCards.map(role => {
            const IconComp = role.icon;
            return (
              <div 
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${role.gradient} text-white flex items-center justify-center shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${role.badgeColor}`}>
                      {role.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {role.tagline}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {role.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>{language === 'en' ? 'Open Portal Workflow' : 'पोर्टल वर्कफ़्लो खोलें'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Core Architectural Innovations */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800 space-y-8 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
            Core Technology Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'en' ? 'How KisanSetu Solves Problem #26132' : 'किसानसेतु समस्या #26132 का समाधान कैसे करता है'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'en' 
              ? 'An end-to-end stack aligning farmer empowerment with national Agmarknet & e-NAM digital standards.' 
              : 'एगमार्कनेट और ई-नाम राष्ट्रीय मानकों के अनुरूप पूर्ण डिजिटल तकनीक।'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">1. Computer Vision Quality</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Proprietary image classification model grades produce (Grade A/B/C) on moisture, surface defects, and color index instantly from mobile photos.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">2. Best-Time-To-Sell Forecast</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Time-series ARIMA & LSTM forecasting models analyze historical modal prices and weather patterns to advise farmers whether to SELL NOW or HOLD.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">3. Smart Escrow Security</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Institutional buyer funds are pre-locked in digital escrow. Payment is automatically transferred via UPI/DBT upon GPS-verified warehouse receiving.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Warehouse className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">4. WDRA Cold Storage Grid</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct booking of licensed cold store chambers with Electronic Negotiable Warehouse Receipt (e-NWR) support for instant post-harvest credit.
            </p>
          </div>

        </div>
      </div>

      {/* Live Mandi Arbitrage Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-slate-900">
              {language === 'en' ? 'Multi-Mandi Real-Time Price Arbitrage Matrix' : 'बहु-मंडी रीयल-टाइम मूल्य आर्बिट्रेज मैट्रिक्स'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'en' 
                ? 'Empowering FPOs to route produce to highest-paying mandis rather than suffering distress sales at local gates.'
                : 'FPO को स्थानीय स्तर पर कम भाव में बेचने के बजाय सबसे अधिक कीमत वाली मंडियों में उपज भेजने की सुविधा।'}
            </p>
          </div>
          <button 
            onClick={() => onSelectRole('farmer')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{language === 'en' ? 'View Full Interactive Intelligence' : 'संपूर्ण विश्लेषण देखें'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                <th className="py-2.5 px-3 font-bold">Commodity</th>
                <th className="py-2.5 px-3 font-bold">Benchmark Mandi</th>
                <th className="py-2.5 px-3 font-bold">Current Modal Price</th>
                <th className="py-2.5 px-3 font-bold">Arrivals</th>
                <th className="py-2.5 px-3 font-bold">24h Trend</th>
                <th className="py-2.5 px-3 font-bold">AI Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MANDI_PRICES.slice(0, 5).map((price) => (
                <tr key={price.cropId} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-800">
                    {price.cropName}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {price.mandi} ({price.state})
                  </td>
                  <td className="py-3 px-3 font-extrabold text-slate-900 font-mono text-sm">
                    ₹{price.modalPrice.toLocaleString('en-IN')}<span className="text-[10px] text-slate-500 font-sans">/qtl</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {price.arrivalsMT.toLocaleString('en-IN')} MT
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] ${
                      price.change >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                    }`}>
                      {price.change >= 0 ? `+${price.change}%` : `${price.change}%`}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      price.saleWindow.badgeColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                      price.saleWindow.badgeColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {price.saleWindow.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

