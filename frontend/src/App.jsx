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
  Layers,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';

const MainContent = () => {
  const { currentRole, setCurrentRole, language, showNotification } = useApp();
  
  // Navigation tabs:
  // 'home' | 'farmer-portal' | 'farmer-intelligence' | 'farmer-lots' | 'farmer-storage' | 'farmer-grievances'
  // | 'buyer-portal' | 'buyer-produce' | 'buyer-demands' | 'buyer-orders'
  // | 'transporter-portal' | 'transporter-dispatches' | 'transporter-fleet'
  // | 'admin-portal' | 'admin-kyc' | 'admin-disputes'
  const [activeTab, setActiveTab] = useState('home');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAiGraderOpen, setIsAiGraderOpen] = useState(false);
  const [isKisanBotOpen, setIsKisanBotOpen] = useState(false);
  const [prefillLotData, setPrefillLotData] = useState(null);

  const handleApplyAiToLot = (lotData) => {
    setPrefillLotData(lotData);
    setCurrentRole('farmer');
    setActiveTab('farmer-lots');
  };

  const handleNavigateTab = (tabId) => {
    if (tabId === 'home') {
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Role-isolated routing
    if (tabId.startsWith('farmer-') || tabId === 'sell-produce' || tabId === 'market-prices') {
      if (currentRole !== 'farmer') setCurrentRole('farmer');
      setActiveTab(tabId === 'sell-produce' ? 'farmer-lots' : tabId === 'market-prices' ? 'farmer-intelligence' : tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId.startsWith('buyer-') || tabId === 'find-buyers') {
      if (currentRole !== 'buyer') setCurrentRole('buyer');
      setActiveTab(tabId === 'find-buyers' ? 'buyer-produce' : tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId.startsWith('transporter-') || tabId === 'logistics') {
      if (currentRole !== 'transporter') setCurrentRole('transporter');
      setActiveTab(tabId === 'logistics' ? 'transporter-portal' : tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tabId.startsWith('admin-')) {
      if (currentRole !== 'admin') setCurrentRole('admin');
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveTab(tabId);
  };

  const handleLoginSuccess = (selectedRole) => {
    if (selectedRole === 'farmer') {
      setActiveTab('farmer-portal');
    } else if (selectedRole === 'buyer') {
      setActiveTab('buyer-portal');
    } else if (selectedRole === 'transporter') {
      setActiveTab('transporter-portal');
    } else if (selectedRole === 'admin') {
      setActiveTab('admin-portal');
    } else {
      setActiveTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to determine FarmerPortal initial subtab
  const getFarmerSubTab = () => {
    if (activeTab === 'farmer-intelligence') return 'intelligence';
    if (activeTab === 'farmer-lots') return 'lots';
    if (activeTab === 'farmer-storage') return 'storage';
    if (activeTab === 'farmer-grievances') return 'grievance';
    return 'lots';
  };

  // Helper to determine BuyerPortal initial subtab
  const getBuyerSubTab = () => {
    if (activeTab === 'buyer-demands') return 'post-demand';
    if (activeTab === 'buyer-orders') return 'orders';
    return 'marketplace';
  };

  // Helper to determine AdminPortal initial subtab
  const getAdminSubTab = () => {
    if (activeTab === 'admin-kyc') return 'kyc';
    if (activeTab === 'admin-disputes') return 'grievances';
    return 'overview';
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
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12 pt-4 sm:pt-8">
        
        {/* VIEW 1: UNIVERSAL HOME LANDING PAGE (AVAILABLE FOR EVERYONE) */}
        {activeTab === 'home' && (
          <LandingView 
            onNavigateTab={handleNavigateTab}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenAiGrader={() => setIsAiGraderOpen(true)}
            onOpenKisanBot={() => setIsKisanBotOpen(true)}
          />
        )}

        {/* VIEW 2: DEDICATED FARMER PORTAL */}
        {activeTab.startsWith('farmer-') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 px-4 py-2.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-[#174d26] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Universal Home Page
              </button>
              <span className="text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Dedicated Farmer & FPO Producer Portal
              </span>
            </div>
            <FarmerPortal 
              initialTab={getFarmerSubTab()}
              onOpenAiGrader={() => setIsAiGraderOpen(true)}
              prefillData={prefillLotData}
              onClearPrefill={() => setPrefillLotData(null)}
            />
          </div>
        )}

        {/* VIEW 3: DEDICATED BUYER PORTAL */}
        {activeTab.startsWith('buyer-') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200/80 px-4 py-2.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Universal Home Page
              </button>
              <span className="text-xs text-blue-900 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Dedicated Institutional Buyer Portal • BigBasket Fresh
              </span>
            </div>
            <BuyerPortal initialTab={getBuyerSubTab()} />
          </div>
        )}

        {/* VIEW 4: DEDICATED TRANSPORTER PORTAL */}
        {activeTab.startsWith('transporter-') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200/80 px-4 py-2.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Universal Home Page
              </button>
              <span className="text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                Dedicated Agri Logistics & Fleet Portal • Kisan Express
              </span>
            </div>
            <TransporterPortal />
          </div>
        )}

        {/* VIEW 5: DEDICATED APMC MANDI BOARD & GOVT REGULATORY OVERSIGHT */}
        {activeTab.startsWith('admin-') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-purple-50/70 border border-purple-200/80 px-4 py-2.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-purple-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Universal Home Page
              </button>
              <span className="text-xs text-purple-900 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                APMC Mandi Regulatory & Market Oversight Desk
              </span>
            </div>
            <AdminPortal initialTab={getAdminSubTab()} />
          </div>
        )}

      </main>

      {/* 3. CLEAN FOOTER */}
      <footer className="bg-white border-t border-[#eef0eb] mt-20 py-10 text-xs text-slate-500">
        <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Brand */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#eaf6ed] flex items-center justify-center text-[#174d26]">
                  <Sprout className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="font-black text-slate-900 text-base">
                    Farmer Market Intelligence & Marketplace
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    National Agri Market Intelligence & Direct Trading Platform
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                Empowering Indian farmers and FPOs with computer vision AI quality grading, verified institutional buyer matching, farm-gate logistics, and automated bank-backed escrow payments.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="md:col-span-4 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-900 tracking-wider">Direct Portals</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium pt-1">
                <button onClick={() => handleNavigateTab('home')} className="hover:text-[#174d26] text-left cursor-pointer">Universal Home</button>
                <button onClick={() => handleNavigateTab('farmer-portal')} className="hover:text-[#174d26] text-left cursor-pointer">Farmer Portal</button>
                <button onClick={() => handleNavigateTab('buyer-portal')} className="hover:text-[#174d26] text-left cursor-pointer">Buyer Portal</button>
                <button onClick={() => handleNavigateTab('transporter-portal')} className="hover:text-[#174d26] text-left cursor-pointer">Transporter Portal</button>
                <button onClick={() => handleNavigateTab('admin-portal')} className="hover:text-[#174d26] text-left cursor-pointer">APMC Admin Desk</button>
                <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-[#174d26] text-left font-bold cursor-pointer">Sign In / Switch Role</button>
              </div>
            </div>

            {/* Col 3: Direct Contact Information */}
            <div className="md:col-span-3 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-900 tracking-wider">Contact Us</div>
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <a href="tel:9336161644" className="font-bold text-slate-900 hover:text-[#174d26] cursor-pointer">
                    9336161644
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <a href="mailto:adityapatelp34@gmail.com" className="font-bold text-slate-900 hover:text-[#174d26] cursor-pointer truncate">
                    adityapatelp34@gmail.com
                  </a>
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  24/7 Farmer & Buyer Technical Helpline
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
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
