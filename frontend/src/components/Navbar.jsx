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
  ArrowRight
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
    // Default: Public Guest
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#eef0eb] shadow-xs">
      
      {/* Top Main Navbar - Full Width Desktop & Adaptive Mobile */}
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#eaf6ed] flex items-center justify-center text-[#174d26] group-hover:scale-105 transition shrink-0">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-black tracking-tight text-slate-900 truncate">
                  Farmer Market Intelligence <span className="text-[#174d26] hidden sm:inline">& Marketplace</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-200 shrink-0">
                  SIH 26
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden md:block">
                National Agri Market Intelligence & Direct Trading Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on Large Displays) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs xl:text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const active = isLinkActive(link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-2 transition-colors cursor-pointer ${
                    active 
                      ? 'text-[#174d26] font-bold' 
                      : 'text-slate-600 hover:text-[#174d26]'
                  }`}
                >
                  <span>{language === 'en' ? link.labelEn : link.labelHi}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174d26] rounded-full animate-slide-up"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Quick AI, Language, Role Selector & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Quick AI Buttons (Medium+ Displays) */}
            <button
              onClick={onOpenAiGrader}
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
              title="Computer Vision Produce Quality Assayer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Grader</span>
            </button>

            <button
              onClick={onOpenKisanBot}
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
              title="Kisan AI Voice Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kisan AI</span>
            </button>

            {/* Language Toggle: हिंदी | English */}
            <div className="flex items-center text-[11px] sm:text-xs font-semibold text-slate-600 bg-slate-50 sm:bg-transparent px-1.5 py-0.5 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-slate-200">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1 py-0.5 transition cursor-pointer ${
                  language === 'hi' ? 'text-[#174d26] font-bold' : 'hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 py-0.5 transition cursor-pointer ${
                  language === 'en' ? 'text-[#174d26] font-bold' : 'hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Role Button & Status */}
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenLogin}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-[11px] sm:text-xs font-bold transition shadow-xs cursor-pointer ${
                  currentRole && currentRole !== 'overview'
                    ? currentRole === 'farmer' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                      : currentRole === 'buyer'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 hover:bg-blue-100'
                        : currentRole === 'transporter'
                          ? 'border-amber-500 bg-amber-50 text-amber-900 hover:bg-amber-100'
                          : 'border-purple-500 bg-purple-50 text-purple-900 hover:bg-purple-100'
                    : 'border-slate-300 hover:border-[#174d26] bg-white hover:bg-[#eaf6ed]/40 text-slate-800'
                }`}
                title={currentRole && currentRole !== 'overview' ? 'Click to switch role or view profile' : 'Sign in or select role'}
              >
                {currentRole && currentRole !== 'overview' ? (
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    currentRole === 'farmer' ? 'bg-emerald-600' :
                    currentRole === 'buyer' ? 'bg-blue-600' :
                    currentRole === 'transporter' ? 'bg-amber-600' : 'bg-purple-600'
                  }`}></span>
                ) : (
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 shrink-0" />
                )}
                <span className="max-w-[85px] sm:max-w-[130px] truncate">{getRoleLabel()}</span>
              </button>

              {currentRole && currentRole !== 'overview' && (
                <button
                  onClick={() => {
                    setCurrentRole('overview');
                    onSelectTab('home');
                    showNotification('Signed out to public view.', 'info');
                  }}
                  className="p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Hamburger Menu Button (Visible on < xl screens) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Swipeable Quick Sub-Bar (Visible on Mobile & Tablet) */}
      <div className="xl:hidden flex items-center px-3 sm:px-6 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto no-scrollbar gap-2 sm:gap-3 text-xs font-semibold">
        {navLinks.map((link) => {
          const active = isLinkActive(link.id);
          return (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition shrink-0 ${
                active 
                  ? 'bg-[#174d26] text-white font-bold shadow-xs' 
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {language === 'en' ? link.labelEn : link.labelHi}
            </button>
          );
        })}
      </div>

      {/* Mobile Full Collapsible Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 shadow-xl animate-slide-up px-4 py-5 space-y-4">
          
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
              {language === 'en' ? 'Navigation Menu' : 'नेविगेशन मेनू'}
            </div>
            {navLinks.map((link) => {
              const active = isLinkActive(link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-[#eaf6ed] text-[#174d26]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{language === 'en' ? link.labelEn : link.labelHi}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#174d26]"></span>}
                </button>
              );
            })}
          </div>

          {/* Quick AI Tools Strip in Mobile Menu */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAiGrader();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI Grader</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenKisanBot();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Kisan AI Bot</span>
            </button>
          </div>

          {/* Direct Helpline in Mobile Menu */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Helpline:</span>
              <a href="tel:9336161644" className="font-bold text-slate-900">9336161644</a>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="text-xs font-bold text-[#174d26] underline"
            >
              Switch Role
            </button>
          </div>

        </div>
      )}

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
