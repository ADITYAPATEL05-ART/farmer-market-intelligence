import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  User, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Truck, 
  ShieldCheck,
  Award
} from 'lucide-react';

export const Navbar = ({ 
  activeTab = 'home', 
  onSelectTab, 
  onOpenLogin,
  onOpenAiGrader, 
  onOpenKisanBot 
}) => {
  const { 
    currentRole, 
    setCurrentRole, 
    language, 
    setLanguage, 
    notification,
    orders
  } = useApp();

  const activeEscrowCount = orders.filter(o => o.escrowStatus === 'SECURED_IN_ESCROW').length;

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'market-prices', labelEn: 'Market Prices', labelHi: 'मंडी भाव' },
    { id: 'sell-produce', labelEn: 'Sell Produce', labelHi: 'फसल बेचें' },
    { id: 'find-buyers', labelEn: 'Find Buyers', labelHi: 'खरीदार खोजें' },
    { id: 'logistics', labelEn: 'Logistics', labelHi: 'परिवहन' },
    { id: 'how-it-works', labelEn: 'How It Works', labelHi: 'यह कैसे काम करता है' }
  ];

  const getRoleLabel = () => {
    switch(currentRole) {
      case 'farmer': return language === 'en' ? 'Farmer: Ramesh Patil' : 'किसान: रमेश पाटिल';
      case 'buyer': return language === 'en' ? 'Buyer: BigBasket' : 'खरीदार: बिगबास्केट';
      case 'transporter': return language === 'en' ? 'Fleet: Kisan Express' : 'वाहन: किसान एक्सप्रेस';
      case 'admin': return language === 'en' ? 'APMC Mandi Board' : 'मंडी विनियामक बोर्ड';
      default: return language === 'en' ? 'Login' : 'लॉगिन';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#eef0eb] shadow-xs">
      
      {/* Top Main Navbar */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Tagline (Farmer Market Intelligence & Marketplace) */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-[#eaf6ed] flex items-center justify-center text-[#174d26] group-hover:scale-105 transition shrink-0">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-slate-900">
                  Farmer Market Intelligence <span className="text-[#174d26]">& Marketplace</span>
                </span>
                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-200">
                  SIH 26
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                National Agri Market Intelligence & Direct Trading Platform
              </p>
            </div>
          </div>

          {/* Center Navigation Links with Green Underline */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`relative py-2 transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-[#174d26] font-bold' 
                      : 'text-slate-600 hover:text-[#174d26]'
                  }`}
                >
                  <span>{language === 'en' ? link.labelEn : link.labelHi}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174d26] rounded-full animate-slide-up"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Language Toggle, AI Tools & Login Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            
            {/* Quick AI Buttons */}
            <button
              onClick={onOpenAiGrader}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
              title="Computer Vision Produce Quality Assayer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Grader</span>
            </button>

            <button
              onClick={onOpenKisanBot}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
              title="Kisan AI Voice / Chatbot"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kisan AI</span>
            </button>

            {/* Language Toggle: हिंदी | English */}
            <div className="flex items-center text-xs font-semibold text-slate-600">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-1 transition cursor-pointer ${
                  language === 'hi' ? 'text-[#174d26] font-bold' : 'hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 transition cursor-pointer ${
                  language === 'en' ? 'text-[#174d26] font-bold' : 'hover:text-slate-900'
                }`}
              >
                English
              </button>
            </div>

            {/* Dedicated Login Section Trigger */}
            <button
              onClick={onOpenLogin}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl border text-xs font-bold transition shadow-xs cursor-pointer ${
                currentRole && currentRole !== 'overview'
                  ? 'border-emerald-600/50 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  : 'border-slate-300 hover:border-[#174d26] bg-white hover:bg-[#eaf6ed]/40 text-slate-800'
              }`}
              title={currentRole && currentRole !== 'overview' ? 'Click to switch role or sign out' : 'Sign in or select role'}
            >
              {currentRole && currentRole !== 'overview' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              ) : (
                <User className="w-4 h-4 text-slate-600 shrink-0" />
              )}
              <span className="max-w-[130px] truncate">{getRoleLabel()}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Nav Links Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto no-scrollbar gap-4 text-xs font-semibold">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onSelectTab(link.id)}
            className={`whitespace-nowrap py-1 ${
              activeTab === link.id ? 'text-[#174d26] font-bold border-b-2 border-[#174d26]' : 'text-slate-600'
            }`}
          >
            {language === 'en' ? link.labelEn : link.labelHi}
          </button>
        ))}
      </div>

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-slide-up">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="text-sm font-medium leading-snug">
            {notification.message}
          </div>
        </div>
      )}

    </header>
  );
};
