import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  Volume2, 
  Send, 
  Bot, 
  Sparkles, 
  User, 
  TrendingUp, 
  HelpCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VoiceAssistantModal = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: language === 'en' 
        ? "Namaste! I am Kisan Sahayak AI. You can ask me about live mandi prices, best time to sell your harvest, or finding nearest cold storage in Hindi or English."
        : "नमस्ते! मैं किसान सहायक AI हूँ। आप मुझसे मंडी भाव, फसल बेचने का सही समय (Sale Window) या नजदीकी कोल्ड स्टोरेज के बारे में हिन्दी या अंग्रेजी में पूछ सकते हैं।"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      en: "Lasalgaon onion price & sale window?",
      hi: "नासिक मंडी में प्याज का क्या भाव है और कब बेचना चाहिए?",
      botReplyEn: "At Lasalgaon APMC, Red Onion modal price is ₹2,380/Quintal (+5.8% this week). AI Recommendation: HOLD for 5–7 days. Rain disruption in southern states is projected to push rates to ₹2,650–₹2,750/Qtl.",
      botReplyHi: "लासलगंज मंडी में लाल प्याज का मॉडल भाव ₹2,380/क्विंटल है। AI सलाह: अगले 5-7 दिनों तक रोकें। दक्षिण भारत में बारिश के कारण आवक घटी है, जिससे भाव ₹2,650–₹2,750 तक जाने की उम्मीद है।"
    },
    {
      en: "Is it good to sell Sharbati Wheat today?",
      hi: "क्या आज शरबती गेहूं बेचना सही रहेगा?",
      botReplyEn: "Indore Mandi Sharbati Wheat is trading at ₹3,050/Qtl. AI Recommendation: SELL NOW (91% confidence). Institutional tenders are active and prices are at 6-month seasonal peak.",
      botReplyHi: "इंदौर मंडी में शरबती गेहूं ₹3,050/क्विंटल पर चल रहा है। AI सलाह: अभी बेचें (91% विश्वास)। संस्थागत खरीद जारी है और भाव 6 महीने के उच्चतम स्तर पर हैं।"
    },
    {
      en: "Find cold storage near Nashik for 200 Qtl onion",
      hi: "नासिक के पास प्याज के लिए कोल्ड स्टोरेज बताएं",
      botReplyEn: "Found 2 WDRA-certified facilities: 1. MahaAgro Cold Logistics (Pimpalgaon, 8.4 km away, 1,850 MT available, ₹1.25/qtl/day). 2. Kisan Jyoti Warehouse (Niphad, 14 km away, ₹1.10/qtl/day).",
      botReplyHi: "नासिक क्षेत्र में 2 प्रमाणित केंद्र उपलब्ध हैं: 1. महाएग्रो कोल्ड लॉजिस्टिक्स (पिंपलगांव, 8.4 किमी दूर, ₹1.25/क्विंटल/दिन). 2. किसान ज्योति वेयरहाउस (निफाड़, 14 किमी, ₹1.10/क्विंटल/दिन)।"
    }
  ];

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      let matched = quickPrompts.find(
        p => p.en.toLowerCase().includes(textToSend.toLowerCase().slice(0, 10)) ||
             p.hi.includes(textToSend.slice(0, 6))
      );

      let reply = matched 
        ? (language === 'en' ? matched.botReplyEn : matched.botReplyHi)
        : (language === 'en'
            ? `Based on real-time Agmarknet data, arrival trends are favorable. Your nearest APMC shows positive price momentum for ${textToSend}. Consider listing your lot on KisanSetu to attract direct verified buyers at 5-8% premium!`
            : `मंडी आंकड़ों के अनुसार, इस फसल की मांग मजबूत बनी हुई है। बिचौलियों के बजाय किसानसेतु पर अपना लॉट बनाकर सीधे संस्थागत खरीदारों से 5-8% अधिक दाम प्राप्त करें!`);

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  const toggleMic = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const randomPrompt = quickPrompts[Math.floor(Math.random() * quickPrompts.length)];
      const text = language === 'en' ? randomPrompt.en : randomPrompt.hi;
      handleSend(text);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[560px]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-amber-300 shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                <span>{language === 'en' ? 'Kisan Sahayak AI Voice Assistant' : 'किसान सहायक AI मित्र'}</span>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-medium">Online</span>
              </div>
              <p className="text-[11px] text-emerald-200">
                {language === 'en' ? 'Multilingual Mandi & Decision Intelligence' : 'मंडी भाव व बिक्री सलाहकार'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-emerald-50/70 border-b border-emerald-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-bold uppercase text-emerald-900 whitespace-nowrap">
            {language === 'en' ? 'Ask Instantly:' : 'तुरंत पूछें:'}
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(language === 'en' ? q.en : q.hi)}
              className="bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition text-[11px]"
            >
              {language === 'en' ? q.en : q.hi}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm font-medium'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isListening && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-100/70 p-2.5 rounded-xl animate-pulse">
              <Mic className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'Listening in Hindi / English...' : 'सुन रहा हूँ... बोलिए...'}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={toggleMic}
            className={`p-2.5 rounded-xl transition ${
              isListening
                ? 'bg-red-500 text-white animate-bounce'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
            }`}
            title="Speak Question"
          >
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'en' ? "Ask in Hindi or English (e.g., Lasalgaon onion price)..." : "हिन्दी या अंग्रेजी में प्रश्न पूछें..."}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition shadow-md shadow-emerald-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
