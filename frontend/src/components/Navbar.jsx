import React, { useState } from 'react';
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
  Award,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
  Globe
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
    orders,
    showNotification
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavLinks = () => {
    if (currentRole === 'farmer') {
      return [
        { id: 'home', labelEn: 'Home', labelHi: 'होम' },
        { id: 'farmer-portal', labelEn: 'Farmer Dashboard', labelHi: 'किसान डैशबोर्ड' },
        { id: 'farmer-intelligence', labelEn: 'Mandi Intelligence', labelHi: 'मंडी भाव' },
        { id: 'farmer-lots', labelEn: 'My Produce Lots', labelHi: 'मेरी फसल' },
        { id: 'farmer-storage', labelEn: 'Cold Storage', labelHi: 'कोल्ड स्टोरेज' },
        { id: 'farmer-grievances', labelEn: 'Grievances', labelHi: 'शिकायतें' }
      ];
    }
    if (currentRole === 'buyer') {
      return [
        { id: 'home', labelEn: 'Home', labelHi: 'होम' },
        { id: 'buyer-portal', labelEn: 'Buyer Dashboard', labelHi: 'खरीदार डैशबोर्ड' },
        { id: 'buyer-produce', labelEn: 'Browse Produce Lots', labelHi: 'उपज लॉट देखें' },
        { id: 'buyer-demands', labelEn: 'Post Demands', labelHi: 'मांग दर्ज करें' },
        { id: 'buyer-orders', labelEn: 'Escrow Orders', labelHi: 'एस्क्रो ऑर्डर' }
      ];
    }
    if (currentRole === 'transporter') {
      return [
        { id: 'home', labelEn: 'Home', labelHi: 'होम' },
        { id: 'transporter-portal', labelEn: 'Transporter Dashboard', labelHi: 'परिवहन डैशबोर्ड' },
        { id: 'transporter-dispatches', labelEn: 'Dispatch Loads', labelHi: 'पिकअप ट्रिप' },
        { id: 'transporter-fleet', labelEn: 'Fleet Management', labelHi: 'वाहन प्रबंधन' }
      ];
    }
    if (currentRole === 'admin') {
      return [
        { id: 'home', labelEn: 'Home', labelHi: 'होम' },
        { id: 'admin-portal', labelEn: 'Regulatory Oversight', labelHi: 'नियामक केंद्र' },
        { id: 'admin-kyc', labelEn: 'KYC Approvals', labelHi: 'केवाईसी सत्यापन' },
        { id: 'admin-disputes', labelEn: 'Dispute Redressal', labelHi: 'विवाद निपटारा' }
      ];
    }
    return [
      { id: 'home', labelEn: 'Home', labelHi: 'होम' },
      { id: 'rates-section', labelEn: 'Mandi Rates', labelHi: 'मंडी भाव' },
      { id: 'ai-section', labelEn: 'Kisan AI', labelHi: 'किसान एआई' },
      { id: 'how-it-works', labelEn: 'How It Works', labelHi: 'यह कैसे काम करता है' },
      { id: 'news-section', labelEn: 'News & Research', labelHi: 'समाचार व रिसर्च' },
      { id: 'contact-section', labelEn: 'Contact Us', labelHi: 'संपर्क करें' }
    ];
  };

  const navLinks = getNavLinks();

  const handleLinkClick = (linkId) => {
    setIsMobileMenuOpen(false);
    if (['rates-section', 'ai-section', 'how-it-works', 'news-section', 'contact-section'].includes(linkId)) {
      onSelectTab('home');
      setTimeout(() => {
        const el = document.getElementById(linkId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    onSelectTab(linkId);
  };

  const getRoleLabel = () => {
    switch(currentRole) {
      case 'farmer': return language === 'en' ? 'Farmer: Ramesh Patil' : 'किसान: रमेश पाटिल';
      case 'buyer': return language === 'en' ? 'Buyer: BigBasket' : 'खरीदार: बिगबास्केट';
      case 'transporter': return language === 'en' ? 'Fleet: Kisan Express' : 'वाहन: किसान एक्सप्रेस';
      case 'admin': return language === 'en' ? 'APMC Directorate' : 'मंडी विनियामक बोर्ड';
      default: return language === 'en' ? 'Sign In / Select Role' : 'लॉगिन / भूमिका चुनें';
    }
  };

  const isLinkActive = (linkId) => {
    if (activeTab === linkId) return true;
    if (linkId === 'farmer-portal' && activeTab.startsWith('farmer-')) return true;
    if (linkId === 'buyer-portal' && activeTab.startsWith('buyer-')) return true;
    if (linkId === 'transporter-portal' && activeTab.startsWith('transporter-')) return true;
    if (linkId === 'admin-portal' && activeTab.startsWith('admin-')) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e7df] shadow-sm transition-all">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24 lg:h-26 xl:h-28 gap-3 sm:gap-6">
          
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 sm:gap-4 lg:gap-5 cursor-pointer select-none group shrink-0 min-w-0"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#eaf6ed] to-[#d7efdd] border border-emerald-300/70 flex items-center justify-center text-[#174d26] shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all shrink-0">
              <Sprout className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 stroke-[2.3]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-xl lg:text-2xl xl:text-[26px] font-black tracking-tight text-slate-900 truncate">
                  Farmer Market Intelligence <span className="text-[#174d26] hidden sm:inline">& Marketplace</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-medium hidden md:block mt-0.5">
                National Agri Market Intelligence & Direct Trading Platform
              </p>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm lg:text-[15px] xl:text-base font-bold text-slate-700">
            {navLinks.map((link) => {
              const active = isLinkActive(link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-3 transition-colors cursor-pointer ${
                    active 
                      ? 'text-[#174d26] font-extrabold' 
                      : 'text-slate-600 hover:text-[#174d26]'
                  }`}
                >
                  <span>{language === 'en' ? link.labelEn : link.labelHi}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#174d26] rounded-full shadow-xs animate-slide-up"></span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
            
            <button
              onClick={onOpenAiGrader}
              className="hidden lg:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/90 px-3.5 py-2.5 rounded-xl transition-all shadow-xs hover:shadow cursor-pointer"
              title="Computer Vision Produce Quality Assayer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI Grader</span>
            </button>

            <button
              onClick={onOpenKisanBot}
              className="hidden lg:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950 bg-[#eaf6ed] hover:bg-emerald-100/80 border border-emerald-300/80 px-3.5 py-2.5 rounded-xl transition-all shadow-xs hover:shadow cursor-pointer"
              title="Kisan AI Voice Assistant"
            >
              <Bot className="w-4 h-4 text-emerald-700" />
              <span>Kisan AI</span>
            </button>

            <div className="hidden sm:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  language === 'hi' 
                    ? 'bg-white text-[#174d26] shadow-xs font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-white text-[#174d26] shadow-xs font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={onOpenLogin}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow cursor-pointer ${
                  currentRole && currentRole !== 'overview'
                    ? currentRole === 'farmer' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 hover:bg-emerald-100'
                      : currentRole === 'buyer'
                        ? 'border-blue-500 bg-blue-50 text-blue-950 hover:bg-blue-100'
                        : currentRole === 'transporter'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 hover:bg-amber-100'
                          : 'border-purple-500 bg-purple-50 text-purple-950 hover:bg-purple-100'
                    : 'border-slate-300 hover:border-[#174d26] bg-white hover:bg-[#eaf6ed]/50 text-slate-900'
                }`}
                title={currentRole && currentRole !== 'overview' ? 'Click to switch role or view profile' : 'Sign in or select role'}
              >
                {currentRole && currentRole !== 'overview' ? (
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    currentRole === 'farmer' ? 'bg-emerald-600 ring-2 ring-emerald-300' :
                    currentRole === 'buyer' ? 'bg-blue-600 ring-2 ring-blue-300' :
                    currentRole === 'transporter' ? 'bg-amber-600 ring-2 ring-amber-300' : 'bg-purple-600 ring-2 ring-purple-300'
                  }`}></span>
                ) : (
                  <User className="w-4 h-4 text-slate-700 shrink-0" />
                )}
                <span className="max-w-[100px] sm:max-w-[160px] truncate">{getRoleLabel()}</span>
              </button>

              {currentRole && currentRole !== 'overview' && (
                <button
                  onClick={() => {
                    setCurrentRole('overview');
                    onSelectTab('home');
                    showNotification('Signed out to public view.', 'info');
                  }}
                  className="p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border border-slate-200/90 bg-white hover:bg-slate-100 transition text-slate-800 shadow-xs cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>

          </div>

        </div>
      </div>

      <div className="xl:hidden flex items-center px-4 sm:px-6 py-2.5 bg-gradient-to-r from-slate-50 via-[#f4f8f4] to-slate-50 border-t border-slate-200/90 overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold">
        {navLinks.map((link) => {
          const active = isLinkActive(link.id);
          return (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl transition-all shrink-0 active:scale-95 cursor-pointer ${
                active 
                  ? 'bg-[#174d26] text-white font-extrabold shadow-sm' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              {language === 'en' ? link.labelEn : link.labelHi}
            </button>
          );
        })}
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-lg border-t border-slate-200 shadow-2xl animate-slide-up px-5 py-6 space-y-5 max-h-[85vh] overflow-y-auto">
          
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${
                currentRole === 'farmer' ? 'bg-emerald-600' :
                currentRole === 'buyer' ? 'bg-blue-600' :
                currentRole === 'transporter' ? 'bg-amber-600' :
                currentRole === 'admin' ? 'bg-purple-600' : 'bg-slate-400'
              }`}></span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Profile</div>
                <div className="text-xs font-bold text-slate-800">{getRoleLabel()}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="text-xs font-bold bg-white text-[#174d26] border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs"
            >
              Switch Role
            </button>
          </div>

          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2 rounded-2xl">
            <span className="text-xs font-bold text-slate-600 px-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              Language / भाषा:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  language === 'hi' ? 'bg-[#174d26] text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-[#174d26] text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-2">
              {language === 'en' ? 'Quick Navigation' : 'त्वरित नेविगेशन'}
            </div>
            {navLinks.map((link) => {
              const active = isLinkActive(link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#eaf6ed] text-[#174d26] border border-emerald-300/80 shadow-xs'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{language === 'en' ? link.labelEn : link.labelHi}</span>
                  {active ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#174d26]"></span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAiGrader();
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-amber-50 text-amber-950 border border-amber-200/90 text-xs font-bold shadow-xs hover:bg-amber-100 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI Grader</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenKisanBot();
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#eaf6ed] text-emerald-950 border border-emerald-300/80 text-xs font-bold shadow-xs hover:bg-emerald-100 transition"
            >
              <Bot className="w-4 h-4 text-emerald-700" />
              <span>Kisan AI Bot</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Helpline:</span>
              <a href="tel:9336161644" className="font-bold text-slate-900 hover:text-emerald-700 underline">
                9336161644
              </a>
            </div>
            <span className="text-[11px] text-slate-400">24/7 Support</span>
          </div>

        </div>
      )}

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-slide-up">
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
