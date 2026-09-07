import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  Lock, 
  HelpCircle,
  Award,
  Globe,
  Compass
} from 'lucide-react';

export const AppSidebar = ({ 
  isOpen, 
  onToggle, 
  onOpenAiGrader, 
  onOpenKisanBot 
}) => {
  const { currentRole, setCurrentRole, language, setLanguage, orders } = useApp();

  const activeEscrowCount = orders.filter(o => o.escrowStatus === 'SECURED_IN_ESCROW').length;

  const navItems = [
    {
      id: 'overview',
      name: language === 'en' ? 'Platform Overview' : 'प्लेटफ़ॉर्म सारांश',
      subtitle: language === 'en' ? 'SIH 2026 Showcase' : 'SIH 2026 शोकेस',
      icon: Layers,
      color: 'text-indigo-600',
      activeColor: 'bg-indigo-600 text-white shadow-indigo-600/20'
    },
    {
      id: 'farmer',
      name: language === 'en' ? 'Farmer / FPO' : 'किसान / FPO',
      subtitle: language === 'en' ? 'Marketplace & Storage' : 'बाज़ार व स्टोरेज',
      icon: Sprout,
      color: 'text-emerald-600',
      activeColor: 'bg-emerald-600 text-white shadow-emerald-600/20'
    },
    {
      id: 'buyer',
      name: language === 'en' ? 'Institutional Buyer' : 'संस्थागत खरीदार',
      subtitle: language === 'en' ? 'Bids & Procurement' : 'बोलियां व खरीद',
      icon: Building2,
      color: 'text-blue-600',
      activeColor: 'bg-blue-600 text-white shadow-blue-600/20',
      badge: activeEscrowCount > 0 ? activeEscrowCount : null
    },
    {
      id: 'transporter',
      name: language === 'en' ? 'Agri Logistics' : 'कृषि परिवहन',
      subtitle: language === 'en' ? 'Fleet & Dispatch' : 'फ्लीट व डिस्पैच',
      icon: Truck,
      color: 'text-amber-600',
      activeColor: 'bg-amber-600 text-white shadow-amber-600/20'
    },
    {
      id: 'admin',
      name: language === 'en' ? 'Govt / APMC Admin' : 'प्रशासन / मंडी बोर्ड',
      subtitle: language === 'en' ? 'Regulatory Oversight' : 'नियामक नियंत्रण',
      icon: ShieldCheck,
      color: 'text-purple-600',
      activeColor: 'bg-purple-600 text-white shadow-purple-600/20'
    }
  ];

  return (
    <aside 
      className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between shadow-sm ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Sidebar Header */}
      <div>
        {/* Brand Logo & Collapse Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div 
            onClick={() => setCurrentRole('overview')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-600/20">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            {isOpen && (
              <div className="truncate">
                <span className="text-base font-black text-slate-900 tracking-tight">
                  Kisan<span className="text-emerald-600">Setu</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium -mt-0.5">
                  Agri Market Intel • SIH 26
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition hidden md:flex items-center justify-center"
            title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* SIH 2026 Tag */}
        {isOpen ? (
          <div className="mx-3 my-3 p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px]">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>SIH 2026 • PS #26132</span>
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">
              Team: <strong>INCREDIBLE_X_TECH</strong>
            </div>
          </div>
        ) : (
          <div className="my-3 flex justify-center">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-[10px] font-bold border border-amber-200" title="SIH 2026 - Problem #26132">
              SIH
            </span>
          </div>
        )}

        {/* Navigation Section */}
        <div className="px-3 space-y-1">
          <div className={`text-[10px] uppercase font-bold text-slate-400 px-3 py-1 ${!isOpen && 'text-center'}`}>
            {isOpen ? (language === 'en' ? 'Core Portals' : 'मुख्य पोर्टल') : '•••'}
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRole === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentRole(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
                  isActive 
                    ? `${item.activeColor} shadow-md` 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={!isOpen ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                {isOpen && (
                  <div className="text-left flex-1 truncate">
                    <div>{item.name}</div>
                    <div className={`text-[10px] font-normal truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                      {item.subtitle}
                    </div>
                  </div>
                )}
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white text-blue-700' : 'bg-blue-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* AI Quick Tools Section */}
        <div className="px-3 mt-5 space-y-1">
          <div className={`text-[10px] uppercase font-bold text-slate-400 px-3 py-1 ${!isOpen && 'text-center'}`}>
            {isOpen ? (language === 'en' ? 'AI Intelligence' : 'AI सहायक उपकरण') : 'AI'}
          </div>

          <button
            onClick={onOpenAiGrader}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-900 transition group border border-transparent hover:border-orange-200"
            title="AI Quality Grader"
          >
            <div className="p-1 rounded-lg bg-orange-100 text-orange-600 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            {isOpen && (
              <div className="text-left flex-1 truncate">
                <div className="flex items-center gap-1.5">
                  <span>AI Assayer</span>
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-orange-200 text-orange-900 font-extrabold">
                    Vision
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">Grade Produce A/B/C</div>
              </div>
            )}
          </button>

          <button
            onClick={onOpenKisanBot}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition group border border-transparent hover:border-emerald-200"
            title="Kisan AI Sahayak"
          >
            <div className="p-1 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            {isOpen && (
              <div className="text-left flex-1 truncate">
                <div className="flex items-center gap-1.5">
                  <span>Kisan Sahayak</span>
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-emerald-200 text-emerald-900 font-extrabold">
                    Voice
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">Market Voice Advisor</div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Sidebar Status & Controls */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {isOpen ? (
          <>
            {/* Network Status indicator */}
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1.5 text-[10px] text-slate-500">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1 text-slate-700">
                  <Activity className="w-3 h-3 text-emerald-500" />
                  <span>e-NAM API Gateway</span>
                </span>
                <span className="text-emerald-600 font-bold">Online</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Agmarknet Node</span>
                <span>MH-NSK-26</span>
              </div>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Toggle</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
            </button>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="e-NAM Connected"></span>
          </div>
        )}
      </div>

    </aside>
  );
};

