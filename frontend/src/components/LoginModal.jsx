import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sprout, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Lock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound, 
  Shield, 
  Sparkles,
  Award,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { currentRole, setCurrentRole, language, showNotification } = useApp();
  
  const [selectedRole, setSelectedRole] = useState(() => 
    ['farmer', 'buyer', 'transporter', 'admin'].includes(currentRole) ? currentRole : 'farmer'
  );
  const [mobileNumber, setMobileNumber] = useState('9822488120');
  const [otp, setOtp] = useState('4826');
  const [isOtpSent, setIsOtpSent] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (['farmer', 'buyer', 'transporter', 'admin'].includes(currentRole)) {
        setSelectedRole(currentRole);
      } else {
        setSelectedRole('farmer');
      }
    }
  }, [isOpen, currentRole]);

  if (!isOpen) return null;

  const roleConfigs = {
    farmer: {
      title: language === 'en' ? 'Farmer / FPO Producer' : 'किसान / एफपीओ उत्पादक',
      desc: language === 'en' ? 'Access crop price forecasts, AI assaying, lot listings, and direct buyer bids.' : 'फसल मूल्य पूर्वानुमान, AI ग्रेडिंग, लॉट सूची और प्रत्यक्ष खरीदार बोलियां देखें।',
      icon: Sprout,
      color: 'bg-emerald-600 text-white',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      demoUser: 'Ramesh Balasaheb Patil (Nashik Sahyadri FPO)',
      idField: language === 'en' ? 'Registered Mobile / Aadhaar No.' : 'पंजीकृत मोबाइल या आधार नंबर',
      idValue: '+91 98224 88120'
    },
    buyer: {
      title: language === 'en' ? 'Institutional / Bulk Buyer' : 'संस्थागत / थोक खरीदार',
      desc: language === 'en' ? 'Browse verified farm-gate produce lots, place bids, and lock escrow contracts.' : 'सत्यापित फार्म-गेट उपज देखें, बोलियां लगाएं और एस्क्रो अनुबंध सुरक्षित करें।',
      icon: Building2,
      color: 'bg-blue-600 text-white',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      demoUser: 'BigBasket Fresh Procurements Ltd',
      idField: language === 'en' ? 'Company GSTIN / Trade License' : 'कंपनी GSTIN या ट्रेड लाइसेंस',
      idValue: '27AAACB2194D1Z8'
    },
    transporter: {
      title: language === 'en' ? 'Agri Logistics & Fleet Operator' : 'कृषि परिवहन व वाहन चालक',
      desc: language === 'en' ? 'Manage farm-gate dispatch jobs, FASTag toll tracking, and digital e-PODs.' : 'खेत से पिकअप, फास्टैग जीपीएस ट्रैकिंग और डिजिटल डिलीवरी सत्यापन करें।',
      icon: Truck,
      color: 'bg-amber-600 text-white',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      demoUser: 'Sunil Jadhav • Kisan Express (MH-15-EG-4421)',
      idField: language === 'en' ? 'Driver Phone / Fleet Reg No.' : 'चालक मोबाइल या फ्लीट नंबर',
      idValue: '+91 94220 18342'
    },
    admin: {
      title: language === 'en' ? 'APMC Mandi Board / Govt Officer' : 'मंडी विनियामक व सरकारी नियंत्रण',
      desc: language === 'en' ? 'State trade oversight, buyer/FPO KYC vetting, and dispute resolution desk.' : 'राज्य व्यापार निगरानी, FPO/खरीदार सत्यापन और विवाद निवारण केंद्र।',
      icon: ShieldCheck,
      color: 'bg-purple-600 text-white',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      demoUser: 'Maharashtra APMC Directorate Regulatory Officer',
      idField: language === 'en' ? 'Govt Officer ID / e-Pramaan' : 'अधिकारी आईडी या ई-प्रमाण',
      idValue: 'MH-APMC-DIR-7701'
    }
  };

  const validRole = roleConfigs[selectedRole] ? selectedRole : 'farmer';
  const currentConfig = roleConfigs[validRole];
  const CurrentIcon = currentConfig.icon;

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentRole(validRole);
    showNotification(
      language === 'en' 
        ? `Logged in successfully as ${currentConfig.demoUser}!` 
        : `${currentConfig.demoUser} के रूप में सफलतापूर्वक लॉगिन किया गया!`,
      'success'
    );
    if (onLoginSuccess) {
      onLoginSuccess(validRole);
    }
    onClose();
  };

  const handleLogout = () => {
    setCurrentRole('overview');
    showNotification(
      language === 'en' ? 'Signed out successfully!' : 'सफलतापूर्वक साइन आउट किया गया!',
      'info'
    );
    if (onLoginSuccess) {
      onLoginSuccess('overview');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92vh] overflow-y-auto animate-slide-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#f7faf7] border-b border-[#eef0eb] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#174d26] text-white flex items-center justify-center shadow-md shadow-[#174d26]/20 shrink-0">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {language === 'en' ? 'Sign in to Platform' : 'प्लेटफ़ॉर्म में लॉगिन करें'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">
                Farmer Market Intelligence & Marketplace
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Stakeholder Persona Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              {language === 'en' ? 'Select Stakeholder Role:' : 'हितधारक की भूमिका चुनें:'}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'farmer', label: 'Farmer / FPO', icon: Sprout },
                { id: 'buyer', label: 'Buyer', icon: Building2 },
                { id: 'transporter', label: 'Logistics', icon: Truck },
                { id: 'admin', label: 'Govt Admin', icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedRole === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedRole(tab.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      isSelected 
                        ? 'border-[#174d26] bg-[#eaf6ed] text-[#174d26] shadow-xs' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Persona Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className={`p-2.5 rounded-xl ${currentConfig.color} shrink-0 mt-0.5 shadow-sm`}>
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900">
                  {currentConfig.title}
                </h4>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Verified Demo
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">
                {currentConfig.demoUser}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {currentConfig.desc}
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {currentConfig.idField}
              </label>
              <input 
                type="text" 
                value={currentConfig.idValue}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 font-mono font-medium focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'en' ? 'Security OTP / Key' : 'सुरक्षा ओटीपी या पासवर्ड'}
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-900 tracking-widest font-mono focus:border-[#174d26] focus:outline-none"
                    placeholder="••••"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-transparent block mb-1">
                  OTP
                </label>
                <button
                  type="button"
                  onClick={() => showNotification('Demo OTP auto-verified: 4826', 'success')}
                  className="w-full py-2.5 px-2 rounded-xl border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer text-center"
                >
                  Resend OTP
                </button>
              </div>
            </div>

            {/* Quick 1-Click Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#174d26] hover:bg-[#113d1c] text-white text-xs font-bold shadow-md shadow-[#174d26]/20 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{language === 'en' ? `Sign In as ${currentConfig.title}` : `${currentConfig.title} के रूप में लॉगिन करें`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentRole && currentRole !== 'overview' && (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100/60 text-rose-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Sign Out / Switch to Guest' : 'साइन आउट करें / अतिथि मोड'}</span>
              </button>
            )}
          </form>

          {/* Trust Seals */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              e-NAM & Agmarknet SSO
            </span>
            <span>256-bit SSL Protected</span>
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-600" />
              SIH 2026 #26132
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

