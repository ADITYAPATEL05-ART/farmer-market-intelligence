import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { FarmerPortal } from './components/FarmerPortal';
import { BuyerPortal } from './components/BuyerPortal';
import { TransporterPortal } from './components/TransporterPortal';
import { AdminPortal } from './components/AdminPortal';
import { AiQualityModal } from './components/AiQualityModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { LoginModal } from './components/LoginModal';
import { 
  Sprout, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Bot,
  Layers
} from 'lucide-react';

const MainContent = () => {
  const { currentRole, setCurrentRole, language } = useApp();
  
  // Navigation tabs: 'home' | 'market-prices' | 'sell-produce' | 'find-buyers' | 'logistics' | 'how-it-works'
  const [activeTab, setActiveTab] = useState('home');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAiGraderOpen, setIsAiGraderOpen] = useState(false);
  const [isKisanBotOpen, setIsKisanBotOpen] = useState(false);
  const [prefillLotData, setPrefillLotData] = useState(null);

  const handleApplyAiToLot = (lotData) => {
    setPrefillLotData(lotData);
    setActiveTab('sell-produce');
    setCurrentRole('farmer');
  };

  const handleNavigateTab = (tabId) => {
    if (tabId === 'how-it-works') {
      setActiveTab('home');
      setTimeout(() => {
        window.scrollTo({ top: 900, behavior: 'smooth' });
      }, 100);
      return;
    }

    setActiveTab(tabId);
    if (tabId === 'home') {
      if (currentRole === 'admin') {
        setCurrentRole('overview');
      }
    } else if (tabId === 'sell-produce' || tabId === 'market-prices') {
      if (currentRole === 'overview' || currentRole === 'admin') setCurrentRole('farmer');
    } else if (tabId === 'find-buyers') {
      if (currentRole === 'overview' || currentRole === 'admin') setCurrentRole('buyer');
    } else if (tabId === 'logistics') {
      if (currentRole === 'overview' || currentRole === 'admin') setCurrentRole('transporter');
    }
  };

  const handleLoginSuccess = (selectedRole) => {
    if (selectedRole === 'farmer') {
      setActiveTab('sell-produce');
    } else if (selectedRole === 'buyer') {
      setActiveTab('find-buyers');
    } else if (selectedRole === 'transporter') {
      setActiveTab('logistics');
    } else if (selectedRole === 'admin') {
      setActiveTab('market-prices');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* 1. TOP NAVBAR */}
      <Navbar 
        activeTab={activeTab}
        onSelectTab={handleNavigateTab}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAiGrader={() => setIsAiGraderOpen(true)}
        onOpenKisanBot={() => setIsKisanBotOpen(true)}
      />

      {/* 2. MAIN VIEW CONTAINER */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        {/* VIEW 1: HOME LANDING DASHBOARD */}
        {activeTab === 'home' && currentRole !== 'admin' && (
          <LandingView 
            onNavigateTab={handleNavigateTab}
            onOpenAiGrader={() => setIsAiGraderOpen(true)}
            onOpenKisanBot={() => setIsKisanBotOpen(true)}
          />
        )}

        {/* VIEW 2: MARKET PRICES & FORECASTING */}
        {activeTab === 'market-prices' && currentRole !== 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Home
              </button>
              <span className="text-xs text-slate-500 font-medium">
                Live Mandi Price Discovery & AI Forecasting
              </span>
            </div>
            <FarmerPortal 
              initialTab="intelligence"
              onOpenAiGrader={() => setIsAiGraderOpen(true)}
              prefillData={prefillLotData}
              onClearPrefill={() => setPrefillLotData(null)}
            />
          </div>
        )}

        {/* VIEW 3: SELL PRODUCE (FARMER LOTS & LISTINGS) */}
        {activeTab === 'sell-produce' && currentRole !== 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Home
              </button>
              <span className="text-xs text-slate-500 font-medium">
                Farmer & FPO Produce Lot Management
              </span>
            </div>
            <FarmerPortal 
              initialTab="lots"
              onOpenAiGrader={() => setIsAiGraderOpen(true)}
              prefillData={prefillLotData}
              onClearPrefill={() => setPrefillLotData(null)}
            />
          </div>
        )}

        {/* VIEW 4: FIND BUYERS (INSTITUTIONAL BUYER MARKETPLACE) */}
        {activeTab === 'find-buyers' && currentRole !== 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Home
              </button>
              <span className="text-xs text-slate-500 font-medium">
                Verified Buyer Marketplace & Escrow Bids
              </span>
            </div>
            <BuyerPortal />
          </div>
        )}

        {/* VIEW 5: LOGISTICS & TRANSPORT FLEET */}
        {activeTab === 'logistics' && currentRole !== 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Home
              </button>
              <span className="text-xs text-slate-500 font-medium">
                Rural Farm-Gate Pickup & Cold Chain Logistics
              </span>
            </div>
            <TransporterPortal />
          </div>
        )}

        {/* VIEW 6: APMC MANDI BOARD & GOVT REGULATORY OVERSIGHT */}
        {currentRole === 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => {
                  setCurrentRole('farmer');
                  setActiveTab('home');
                }}
                className="text-xs font-bold text-purple-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Home Platform
              </button>
              <span className="text-xs text-slate-500 font-medium">
                APMC Mandi Regulatory Oversight Desk
              </span>
            </div>
            <AdminPortal />
          </div>
        )}

      </main>

      {/* 3. CLEAN FOOTER */}
      <footer className="bg-white border-t border-[#eef0eb] mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#eaf6ed] flex items-center justify-center text-[#174d26]">
                <Sprout className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-black text-slate-900 text-sm">
                  Farmer Market Intelligence & Marketplace
                </span>
                <span className="text-[11px] text-slate-400 block">
                  National Agri Market Intelligence & Direct Trading Platform
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
              <button onClick={() => handleNavigateTab('home')} className="hover:text-[#174d26] cursor-pointer">Home</button>
              <button onClick={() => handleNavigateTab('market-prices')} className="hover:text-[#174d26] cursor-pointer">Market Prices</button>
              <button onClick={() => handleNavigateTab('sell-produce')} className="hover:text-[#174d26] cursor-pointer">Sell Produce</button>
              <button onClick={() => handleNavigateTab('find-buyers')} className="hover:text-[#174d26] cursor-pointer">Find Buyers</button>
              <button onClick={() => handleNavigateTab('logistics')} className="hover:text-[#174d26] cursor-pointer">Logistics</button>
              <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-[#174d26] font-bold cursor-pointer">Sign In / Role</button>
              <button onClick={() => setIsAiGraderOpen(true)} className="text-amber-800 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                <Sparkles className="w-3.5 h-3.5" /> AI Grader
              </button>
              <button onClick={() => setIsKisanBotOpen(true)} className="text-emerald-800 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                <Bot className="w-3.5 h-3.5" /> Kisan AI
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span>Smart India Hackathon 2026: Problem Statement ID <strong>26132</strong></span>
              <span>•</span>
              <span className="text-emerald-800 font-semibold">Team INCREDIBLE_X_TECH</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agmarknet & e-NAM Compliant Digital Public Infrastructure</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 4. MODALS */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AiQualityModal 
        isOpen={isAiGraderOpen}
        onClose={() => setIsAiGraderOpen(false)}
        onApplyToLot={handleApplyAiToLot}
      />

      <VoiceAssistantModal 
        isOpen={isKisanBotOpen}
        onClose={() => setIsKisanBotOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
