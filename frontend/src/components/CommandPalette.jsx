import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  Warehouse, 
  Scale, 
  ArrowRight, 
  X, 
  Globe,
  Layers,
  TrendingUp,
  Tag
} from 'lucide-react';
import { CROPS_CATALOG, MANDI_PRICES } from '../data/mandiData';
import { useApp } from '../context/AppContext';

export const CommandPalette = ({ 
  isOpen, 
  onClose, 
  onNavigateRole, 
  onOpenAiGrader, 
  onOpenKisanBot 
}) => {
  const { language, setLanguage } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      category: 'Views & Portals',
      id: 'view-overview',
      title: language === 'en' ? 'Platform Overview & SIH Showcase' : 'प्लेटफ़ॉर्म अवलोकन व सारांश',
      icon: Layers,
      color: 'text-indigo-600 bg-indigo-50',
      action: () => { onNavigateRole('overview'); onClose(); }
    },
    {
      category: 'Views & Portals',
      id: 'view-farmer',
      title: language === 'en' ? 'Farmer & FPO Desk' : 'किसान व FPO डेस्क',
      icon: Sprout,
      color: 'text-emerald-600 bg-emerald-50',
      action: () => { onNavigateRole('farmer'); onClose(); }
    },
    {
      category: 'Views & Portals',
      id: 'view-buyer',
      title: language === 'en' ? 'Institutional Buyer Marketplace' : 'व्यापारी व संस्थागत बाज़ार',
      icon: Building2,
      color: 'text-blue-600 bg-blue-50',
      action: () => { onNavigateRole('buyer'); onClose(); }
    },
    {
      category: 'Views & Portals',
      id: 'view-logistics',
      title: language === 'en' ? 'Logistics Fleet & Dispatch Desk' : 'परिवहन व लॉजिस्टिक्स डेस्क',
      icon: Truck,
      color: 'text-amber-600 bg-amber-50',
      action: () => { onNavigateRole('transporter'); onClose(); }
    },
    {
      category: 'Views & Portals',
      id: 'view-admin',
      title: language === 'en' ? 'APMC Mandi Board Regulatory Desk' : 'मंडी विनियामक व सरकारी नियंत्रण',
      icon: ShieldCheck,
      color: 'text-slate-800 bg-slate-100',
      action: () => { onNavigateRole('admin'); onClose(); }
    },
    // AI Tools
    {
      category: 'AI & Intelligence',
      id: 'ai-grader',
      title: language === 'en' ? 'AI Computer Vision Produce Quality Assayer' : 'AI कंप्यूटर विज़न गुणवत्ता परीक्षक',
      icon: Sparkles,
      color: 'text-orange-600 bg-orange-50',
      badge: 'Vision AI',
      action: () => { onClose(); onOpenAiGrader(); }
    },
    {
      category: 'AI & Intelligence',
      id: 'kisan-bot',
      title: language === 'en' ? 'Kisan Sahayak Multilingual Voice/Chat Assistant' : 'किसान सहायक आवाज़/चैट बॉट',
      icon: MessageSquare,
      color: 'text-teal-600 bg-teal-50',
      badge: 'Voice AI',
      action: () => { onClose(); onOpenKisanBot(); }
    },
    // Language
    {
      category: 'Quick Settings',
      id: 'lang-toggle',
      title: language === 'en' ? 'Switch Interface Language to हिन्दी (Hindi)' : 'Switch Interface Language to English',
      icon: Globe,
      color: 'text-purple-600 bg-purple-50',
      action: () => { setLanguage(language === 'en' ? 'hi' : 'en'); onClose(); }
    }
  ];

  // Search filter
  const filteredActions = actions.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCrops = CROPS_CATALOG.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.hindiName.includes(query) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-slide-up flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search crops, mandis, portals, or AI features...' : 'फसल, मंडी, पोर्टल या AI टूल खोजें...'}
            className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
            ESC to close
          </span>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-3 space-y-4 flex-1">
          
          {/* Actions & Views */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
              {language === 'en' ? 'Navigation & Quick Actions' : 'नेविगेशन व त्वरित कार्य'}
            </div>
            <div className="space-y-1">
              {filteredActions.map(act => {
                const IconComponent = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={act.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${act.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700">
                        {act.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {act.badge && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {act.badge}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crops & Mandis */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
              {language === 'en' ? 'Commodities & Mandi Intelligence' : 'फसलें व मंडी भाव'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredCrops.map(crop => {
                const priceInfo = MANDI_PRICES.find(p => p.cropId === crop.id);
                return (
                  <button
                    key={crop.id}
                    onClick={() => {
                      onNavigateRole('farmer');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition text-left group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                        {crop.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {crop.hindiName} • {priceInfo ? priceInfo.mandi : 'National APMC'}
                      </div>
                    </div>
                    {priceInfo && (
                      <div className="text-right">
                        <div className="text-xs font-black text-slate-900 font-mono">
                          ₹{priceInfo.modalPrice}
                        </div>
                        <div className={`text-[10px] font-bold ${priceInfo.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {priceInfo.change >= 0 ? `+${priceInfo.change}%` : `${priceInfo.change}%`}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>KisanSetu • SIH 2026 Problem ID: 26132</span>
          <span className="font-semibold text-emerald-700">Team INCREDIBLE_X_TECH</span>
        </div>

      </div>
    </div>
  );
};

