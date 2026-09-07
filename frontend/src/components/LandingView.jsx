import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Map, 
  UserPlus, 
  BarChart2, 
  Package, 
  FileText, 
  Truck, 
  Coins, 
  ShieldCheck, 
  Handshake, 
  Lock, 
  Tag,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Bot,
  Send,
  MessageSquare,
  Phone,
  Mail,
  Building2,
  Clock,
  BookOpen,
  Newspaper,
  Search,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Volume2,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Award,
  Scale,
  ArrowUpRight,
  Check,
  Copy,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';

export const LandingView = ({ 
  onNavigateTab, 
  onOpenLogin,
  onOpenAiGrader, 
  onOpenKisanBot 
}) => {
  const { 
    language, 
    currentRole, 
    setCurrentRole, 
    showNotification 
  } = useApp();

  // -------------------------------------------------------------
  // 1. CROP SELECTION & RATE GRAPH DATA (SECTION 3)
  // -------------------------------------------------------------
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [graphTimeframe, setGraphTimeframe] = useState('14days');

  const cropDatasets = {
    wheat: {
      nameEn: 'Wheat (Sharbati)',
      nameHi: 'गेहूं (शरबती)',
      category: 'Grains',
      currentPrice: '3,050',
      unit: '/quintal',
      change: '+2.1%',
      isPositive: true,
      mandi: 'Indore APMC (Madhya Pradesh)',
      arrivalsMT: '2,850 MT',
      recommendation: 'SELL NOW',
      confidence: '91%',
      adviceEn: 'Seasonal high demand from institutional flour millers. Current prices are near a 6-month peak.',
      adviceHi: 'आटा मिलों की मजबूत संस्थागत मांग। मौजूदा भाव 6 महीने के उच्चतम स्तर के करीब हैं।',
      trendData: [
        { day: '01 Sep', price: 2820, forecast: false },
        { day: '03 Sep', price: 2890, forecast: false },
        { day: '05 Sep', price: 2950, forecast: false },
        { day: '07 Sep', price: 3010, forecast: false },
        { day: '08 Sep (Today)', price: 3050, forecast: false },
        { day: '11 Sep', price: 3040, forecast: true },
        { day: '14 Sep', price: 2990, forecast: true },
        { day: '18 Sep', price: 2940, forecast: true }
      ],
      mandiComparisons: [
        { name: 'Indore Mandi', state: 'Madhya Pradesh', price: '3,050', arrivals: '2,850 MT', isBest: true },
        { name: 'Nashik Mandi', state: 'Maharashtra', price: '2,890', arrivals: '1,420 MT', isBest: false },
        { name: 'Bhopal APMC', state: 'Madhya Pradesh', price: '2,920', arrivals: '1,890 MT', isBest: false },
        { name: 'Kota Mandi', state: 'Rajasthan', price: '2,840', arrivals: '2,100 MT', isBest: false }
      ]
    },
    onion: {
      nameEn: 'Onion (Red)',
      nameHi: 'लाल प्याज',
      category: 'Vegetables',
      currentPrice: '2,380',
      unit: '/quintal',
      change: '+5.8%',
      isPositive: true,
      mandi: 'Lasalgaon APMC (Maharashtra)',
      arrivalsMT: '1,420 MT',
      recommendation: 'HOLD FOR 5-7 DAYS',
      confidence: '88%',
      adviceEn: 'Unseasonal rain in southern districts has slowed arrivals. Prices are projected to surge another 12-15%.',
      adviceHi: 'दक्षिणी जिलों में बारिश के कारण आवक कम है। कीमतों में 12-15% अतिरिक्त उछाल की संभावना है।',
      trendData: [
        { day: '01 Sep', price: 2100, forecast: false },
        { day: '03 Sep', price: 2180, forecast: false },
        { day: '05 Sep', price: 2260, forecast: false },
        { day: '07 Sep', price: 2320, forecast: false },
        { day: '08 Sep (Today)', price: 2380, forecast: false },
        { day: '11 Sep', price: 2510, forecast: true },
        { day: '14 Sep', price: 2660, forecast: true },
        { day: '18 Sep', price: 2720, forecast: true }
      ],
      mandiComparisons: [
        { name: 'Lasalgaon APMC', state: 'Maharashtra', price: '2,380', arrivals: '1,420 MT', isBest: true },
        { name: 'Nashik APMC', state: 'Maharashtra', price: '2,320', arrivals: '980 MT', isBest: false },
        { name: 'Pune Mandi', state: 'Maharashtra', price: '2,240', arrivals: '1,150 MT', isBest: false },
        { name: 'Azadpur Mandi', state: 'Delhi', price: '2,350', arrivals: '3,200 MT', isBest: false }
      ]
    },
    tomato: {
      nameEn: 'Tomato (Hybrid)',
      nameHi: 'टमाटर (हाइब्रिड)',
      category: 'Vegetables',
      currentPrice: '1,850',
      unit: '/quintal',
      change: '-3.4%',
      isPositive: false,
      mandi: 'Kolar APMC (Karnataka)',
      arrivalsMT: '950 MT',
      recommendation: 'SELL GRADUALLY / COLD STORAGE',
      confidence: '84%',
      adviceEn: 'Perishable crop risk. Sell 60% immediately to institutional retail buyers; preserve 40% in cold storage.',
      adviceHi: 'शीघ्र खराब होने का जोखिम। 60% तुरंत रीटेल खरीदारों को बेचें और 40% कोल्ड स्टोरेज में रखें।',
      trendData: [
        { day: '01 Sep', price: 2150, forecast: false },
        { day: '03 Sep', price: 2020, forecast: false },
        { day: '05 Sep', price: 1940, forecast: false },
        { day: '07 Sep', price: 1890, forecast: false },
        { day: '08 Sep (Today)', price: 1850, forecast: false },
        { day: '11 Sep', price: 1820, forecast: true },
        { day: '14 Sep', price: 1890, forecast: true },
        { day: '18 Sep', price: 1970, forecast: true }
      ],
      mandiComparisons: [
        { name: 'Kolar APMC', state: 'Karnataka', price: '1,850', arrivals: '950 MT', isBest: true },
        { name: 'Madanapalle', state: 'Andhra Pradesh', price: '1,810', arrivals: '1,200 MT', isBest: false },
        { name: 'Pune Mandi', state: 'Maharashtra', price: '1,740', arrivals: '620 MT', isBest: false },
        { name: 'Nashik Mandi', state: 'Maharashtra', price: '1,720', arrivals: '540 MT', isBest: false }
      ]
    },
    potato: {
      nameEn: 'Potato (Jyoti)',
      nameHi: 'आलू (ज्योति)',
      category: 'Vegetables',
      currentPrice: '1,320',
      unit: '/quintal',
      change: '+1.6%',
      isPositive: true,
      mandi: 'Agra APMC (Uttar Pradesh)',
      arrivalsMT: '4,100 MT',
      recommendation: 'STABLE DEMAND',
      confidence: '89%',
      adviceEn: 'Cold storage stock releases are steady. Steady pricing expected over next 10 days.',
      adviceHi: 'कोल्ड स्टोरेज से स्थिर निकासी। अगले 10 दिनों में स्थिर भाव रहने का अनुमान।',
      trendData: [
        { day: '01 Sep', price: 1280, forecast: false },
        { day: '03 Sep', price: 1290, forecast: false },
        { day: '05 Sep', price: 1305, forecast: false },
        { day: '07 Sep', price: 1315, forecast: false },
        { day: '08 Sep (Today)', price: 1320, forecast: false },
        { day: '11 Sep', price: 1325, forecast: true },
        { day: '14 Sep', price: 1330, forecast: true },
        { day: '18 Sep', price: 1340, forecast: true }
      ],
      mandiComparisons: [
        { name: 'Agra APMC', state: 'Uttar Pradesh', price: '1,320', arrivals: '4,100 MT', isBest: true },
        { name: 'Farrukhabad', state: 'Uttar Pradesh', price: '1,280', arrivals: '3,400 MT', isBest: false },
        { name: 'Indore Mandi', state: 'Madhya Pradesh', price: '1,300', arrivals: '1,650 MT', isBest: false },
        { name: 'Azadpur Mandi', state: 'Delhi', price: '1,310', arrivals: '4,800 MT', isBest: false }
      ]
    },
    soybean: {
      nameEn: 'Soybean (Yellow)',
      nameHi: 'सोयाबीन (पीला)',
      category: 'Oilseeds',
      currentPrice: '4,680',
      unit: '/quintal',
      change: '+3.9%',
      isPositive: true,
      mandi: 'Ujjain APMC (Madhya Pradesh)',
      arrivalsMT: '1,780 MT',
      recommendation: 'HIGH BUYER DEMAND',
      confidence: '93%',
      adviceEn: 'Global edible oil benchmarks and local solvent extraction plants are actively bidding on high oil-content lots.',
      adviceHi: 'खाद्य तेल बाज़ार में तेजी और तेल निष्कर्षण संयंत्रों से मजबूत बोलियां मिल रही हैं।',
      trendData: [
        { day: '01 Sep', price: 4450, forecast: false },
        { day: '03 Sep', price: 4510, forecast: false },
        { day: '05 Sep', price: 4590, forecast: false },
        { day: '07 Sep', price: 4640, forecast: false },
        { day: '08 Sep (Today)', price: 4680, forecast: false },
        { day: '11 Sep', price: 4730, forecast: true },
        { day: '14 Sep', price: 4790, forecast: true },
        { day: '18 Sep', price: 4830, forecast: true }
      ],
      mandiComparisons: [
        { name: 'Ujjain APMC', state: 'Madhya Pradesh', price: '4,680', arrivals: '1,780 MT', isBest: true },
        { name: 'Indore Mandi', state: 'Madhya Pradesh', price: '4,640', arrivals: '2,200 MT', isBest: false },
        { name: 'Latur APMC', state: 'Maharashtra', price: '4,610', arrivals: '1,450 MT', isBest: false },
        { name: 'Akola Mandi', state: 'Maharashtra', price: '4,590', arrivals: '980 MT', isBest: false }
      ]
    },
    cotton: {
      nameEn: 'Cotton (Medium Staple)',
      nameHi: 'कपास (मध्यम स्टेपल)',
      category: 'Fiber',
      currentPrice: '7,150',
      unit: '/quintal',
      change: '+1.2%',
      isPositive: true,
      mandi: 'Rajkot APMC (Gujarat)',
      arrivalsMT: '1,120 MT',
      recommendation: 'ABOVE MSP BENCHMARK',
      confidence: '90%',
      adviceEn: 'Spinning mill inventories are running low. Quality certified lots are fetching up to ₹250/Qtl premium over MSP.',
      adviceHi: 'कताई मिलों में स्टॉक कम है। ग्रेड प्रमाणित लॉट को एमएसपी से ₹250/क्विंटल तक का प्रीमियम मिल रहा है।',
      trendData: [
        { day: '01 Sep', price: 6980, forecast: false },
        { day: '03 Sep', price: 7040, forecast: false },
        { day: '05 Sep', price: 7080, forecast: false },
        { day: '07 Sep', price: 7120, forecast: false },
        { day: '08 Sep (Today)', price: 7150, forecast: false },
        { day: '11 Sep', price: 7190, forecast: true },
        { day: '14 Sep', price: 7240, forecast: true },
        { day: '18 Sep', price: 7280, forecast: true }
      ],
      mandiComparisons: [
        { name: 'Rajkot APMC', state: 'Gujarat', price: '7,150', arrivals: '1,120 MT', isBest: true },
        { name: 'Surendranagar', state: 'Gujarat', price: '7,110', arrivals: '980 MT', isBest: false },
        { name: 'Adilabad Mandi', state: 'Telangana', price: '7,050', arrivals: '1,400 MT', isBest: false },
        { name: 'Amravati APMC', state: 'Maharashtra', price: '7,080', arrivals: '850 MT', isBest: false }
      ]
    }
  };

  const activeCropData = cropDatasets[selectedCrop] || cropDatasets.wheat;

  // -------------------------------------------------------------
  // 2. INLINE KISAN AI CHATBOT STATE (SECTION 2)
  // -------------------------------------------------------------
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      time: 'Just now',
      text: language === 'en'
        ? 'Namaste! I am Kisan AI, your agricultural market intelligence assistant. Ask me about live mandi rates, price forecasts, Agmarknet quality certification, cold storage facilities, or how our escrow payment protection works.'
        : 'नमस्ते! मैं किसान एआई हूँ, आपका कृषि बाज़ार सहायक। मुझसे लाइव मंडी भाव, मूल्य पूर्वानुमान, गुणवत्ता ग्रेडिंग, कोल्ड स्टोरेज या एस्क्रो भुगतान सुरक्षा के बारे में पूछें।'
    }
  ]);

  const quickChips = [
    { label: language === 'en' ? 'Best mandi to sell wheat this week?' : 'इस हफ्ते गेहूं बेचने के लिए सबसे अच्छी मंडी?' },
    { label: language === 'en' ? 'How does Escrow protect farmer payment?' : 'एस्क्रो किसान भुगतान की सुरक्षा कैसे करता है?' },
    { label: language === 'en' ? 'How does AI assaying grade my crop?' : 'एआई ग्रेडिंग मेरी फसल की जांच कैसे करती है?' },
    { label: language === 'en' ? 'Current onion forecast in Lasalgaon' : 'लासलगंज में प्याज का वर्तमान मूल्य पूर्वानुमान' },
    { label: language === 'en' ? 'Cold storage facilities near Nashik' : 'नासिक के पास कोल्ड स्टोरेज की सुविधा' }
  ];

  const handleSendChat = (questionText) => {
    const query = questionText || chatInput;
    if (!query.trim()) return;

    const userMessage = {
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      let botReply = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('wheat') || qLower.includes('गेहूं')) {
        botReply = language === 'en'
          ? 'Wheat Analysis: Indore Mandi currently leads at ₹3,050/Quintal (+2.1% trend) with 2,850 MT arrivals. Our AI model recommends "SELL NOW" because institutional flour mills are active, and modal rates are within 2% of the seasonal peak.'
          : 'गेहूं विश्लेषण: इंदौर मंडी वर्तमान में ₹3,050/क्विंटल (+2.1% रुझान) पर उच्चतम भाव दे रही है। हमारा एआई मॉडल "अभी बेचें" की सलाह देता है क्योंकि मिलों की मजबूत मांग है।';
      } else if (qLower.includes('escrow') || qLower.includes('payment') || qLower.includes('भुगतान') || qLower.includes('सुरक्षा')) {
        botReply = language === 'en'
          ? 'Escrow Protection: When you accept a buyer offer, 100% of the funds are locked in an RBI-regulated bank escrow before the truck leaves your farm. Once delivery is verified at the weighbridge, funds are released directly to your bank account via Aadhaar DBT / UPI within 45 minutes.'
          : 'एस्क्रो सुरक्षा: जब आप खरीदार का प्रस्ताव स्वीकार करते हैं, तो वाहन रवाना होने से पहले 100% राशि बैंक एस्क्रो में जमा हो जाती है। डिलीवरी सत्यापन के बाद 45 मिनट के भीतर पैसा सीधे आपके बैंक खाते में जमा हो जाता है।';
      } else if (qLower.includes('quality') || qLower.includes('ai') || qLower.includes('grade') || qLower.includes('ग्रेडिंग') || qLower.includes('गुणवत्ता')) {
        botReply = language === 'en'
          ? 'AI Quality Assaying: Take 3 photos using our mobile camera. The computer vision model analyzes surface blemishes, color uniformity (RGB spectrum), and average grain diameter to generate an Agmarknet Grade A/B/C digital certificate with verified specifications.'
          : 'एआई गुणवत्ता परख: अपने स्मार्टफोन से उपज की 3 तस्वीरें लें। कंप्यूटर विज़न मॉडल दाग-धब्बे, रंग और आकार का विश्लेषण करके प्रमाणित एगमार्कनेट ग्रेड A/B/C डिजिटल प्रमाणपत्र जारी करता है।';
      } else if (qLower.includes('onion') || qLower.includes('lasalgaon') || qLower.includes('प्याज')) {
        botReply = language === 'en'
          ? 'Onion Intelligence: Lasalgaon APMC is trading at ₹2,380/Qtl (+5.8%). Unseasonal rain in southern districts has restricted supply. AI forecast indicates prices will rise toward ₹2,660 - ₹2,720/Qtl in 7-10 days. Recommendation: HOLD for 5-7 days.'
          : 'प्याज भाव: लासलगांव मंडी में भाव ₹2,380/क्विंटल हैं। बारिश के कारण आवक प्रभावित हुई है। एआई पूर्वानुमान बताता है कि 7-10 दिनों में भाव ₹2,660 से ₹2,720 तक पहुंच सकते हैं। सलाह: 5-7 दिन रोकें।';
      } else if (qLower.includes('cold storage') || qLower.includes('storage') || qLower.includes('स्टोरेज')) {
        botReply = language === 'en'
          ? 'Cold Storage: Sahyadri Agro Cold Storage (Niphad, Nashik) has 1,200 MT available capacity at ₹18/bag/month with humidity controls for onions and tomatoes. You can book directly from the Farmer Portal with bank warehouse receipt financing (e-NWR).'
          : 'कोल्ड स्टोरेज: सह्याद्री एग्रो कोल्ड स्टोरेज (निफाड, नासिक) में ₹18/बोरी/माह पर 1,200 मीट्रिक टन जगह उपलब्ध है। आप सीधे किसान पोर्टल से ई-एनडब्ल्यूआर रसीद के साथ बुकिंग कर सकते हैं।';
      } else {
        botReply = language === 'en'
          ? `Agri Intelligence Summary: We are tracking live arrivals across 420+ mandis. For "${query}", current platform average is steady. You can post your produce lot or explore buyer demands in our dedicated portals for real-time trade matching.`
          : `कृषि जानकारी: हम 420+ मंडियों में लाइव आवक पर नजर रख रहे हैं। आपकी जिज्ञासा के संदर्भ में मंडी भाव स्थिर हैं। आप सीधे किसान या खरीदार पोर्टल में जाकर ट्रेड कर सकते हैं।`;
      }

      setChatHistory(prev => [
        ...prev,
        {
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: botReply
        }
      ]);
      setIsAiThinking(false);
    }, 650);
  };

  const handleSpeakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-IN' : 'hi-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      showNotification('Playing audio response...', 'info');
    } else {
      showNotification('Audio speech synthesis is not supported on this browser.', 'warning');
    }
  };

  // -------------------------------------------------------------
  // 3. CONTACT FORM STATE (SECTION 6)
  // -------------------------------------------------------------
  const [contactForm, setContactForm] = useState({
    name: '',
    phoneOrEmail: '',
    roleCategory: 'farmer',
    subject: '',
    message: ''
  });
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phoneOrEmail || !contactForm.message) {
      showNotification('Please fill in your name, contact details, and message.', 'warning');
      return;
    }
    setIsContactSubmitted(true);
    showNotification(
      language === 'en'
        ? 'Inquiry submitted successfully! Our grievance officer will contact you within 4 hours.'
        : 'पूछताछ सफलतापूर्वक दर्ज की गई! हमारे अधिकारी 4 घंटे के भीतर आपसे संपर्क करेंगे।',
      'success'
    );
    setContactForm({
      name: '',
      phoneOrEmail: '',
      roleCategory: 'farmer',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsContactSubmitted(false), 6000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showNotification(`${label} copied to clipboard!`, 'info');
  };

  // -------------------------------------------------------------
  // 4. NEWS & RESEARCH DATA (SECTION 5)
  // -------------------------------------------------------------
  const [newsCategoryTab, setNewsCategoryTab] = useState('all'); // 'all' | 'news' | 'research'

  const agriNewsArticles = [
    {
      id: 1,
      type: 'news',
      tag: 'Policy & MSP',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      titleEn: 'Cabinet Approves Kharif 2026 MSP Revisions: Pulses and Oilseeds See Up to 8.2% Hike',
      titleHi: 'कैबिनेट ने खरीफ 2026 एमएसपी संशोधन को दी मंजूरी: दालों और तिलहनों में 8.2% तक की वृद्धि',
      source: 'Ministry of Agriculture & Farmers Welfare',
      date: '06 Sep 2026',
      readTime: '3 min read',
      summaryEn: 'Government increases Minimum Support Price for pulses, soybean, and cotton to encourage crop diversification away from water-intensive paddy.',
      summaryHi: 'पानी की अधिक खपत वाले धान से फसल विविधीकरण को बढ़ावा देने के लिए दालों, सोयाबीन और कपास के एमएसपी में बढ़ोतरी की गई।',
      linkText: 'Read Full Policy Brief'
    },
    {
      id: 2,
      type: 'news',
      tag: 'Market Reforms',
      tagColor: 'bg-blue-100 text-blue-800 border-blue-200',
      titleEn: 'Direct Farm-Gate Procurement Guidelines Adopted by 6 State APMC Marketing Boards',
      titleHi: '6 राज्यों के मंडी बोर्डों द्वारा प्रत्यक्ष फार्म-गेट खरीद दिशानिर्देश लागू',
      source: 'National e-NAM Directorate',
      date: '04 Sep 2026',
      readTime: '4 min read',
      summaryEn: 'New regulatory framework exempts certified FPOs from physical mandi cess when executing digital escrow trades directly with corporate buyers.',
      summaryHi: 'नया ढांचा प्रमाणित एफपीओ को कॉर्पोरेट खरीदारों के साथ सीधे डिजिटल एस्क्रो व्यापार करने पर मंडी उपकर से छूट देता है।',
      linkText: 'Download APMC Circular'
    },
    {
      id: 3,
      type: 'news',
      tag: 'Export Trade',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      titleEn: 'Export Window Reopens for Nashik Red Onions with Reduced Minimum Export Benchmark',
      titleHi: 'नाशिक लाल प्याज के लिए निर्यात खुला, न्यूनतम निर्यात मूल्य में कटौती',
      source: 'APEDA Agri Trade Monitor',
      date: '02 Sep 2026',
      readTime: '2 min read',
      summaryEn: 'Removal of the $550/MT floor price enables Indian farmers and FPOs to access high-paying markets in Dubai, Colombo, and Singapore.',
      summaryHi: 'न्यूनतम निर्यात मूल्य हटने से भारतीय किसानों को दुबई, कोलंबो और सिंगापुर के बाजारों में बेहतर मूल्य प्राप्त होंगे।',
      linkText: 'View Export Corridors'
    },
    {
      id: 4,
      type: 'research',
      tag: 'Post-Harvest Research',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-200',
      titleEn: 'ICAR-CIAE Study: Controlled Atmosphere Cold Storages Reduce Post-Harvest Loss by 34.2%',
      titleHi: 'भाकृअनुप-सीआईएई अध्ययन: नियंत्रित वायुमंडलीय कोल्ड स्टोरेज से फसल खराबी में 34.2% की कमी',
      source: 'Indian Council of Agricultural Research (ICAR)',
      date: 'August 2026',
      readTime: '6 min read',
      summaryEn: 'Empirical research across 12 districts confirms decentralized 10 MT farm-gate pre-cooling stops microbial rot in tomatoes, bell peppers, and table grapes.',
      summaryHi: '12 जिलों में किए गए परीक्षणों से सिद्ध हुआ है कि खेत स्तर पर प्री-कूलिंग से टमाटर और सब्जियों में सड़न को एक-तिहाई तक कम किया जा सकता है।',
      linkText: 'View ICAR Research Paper'
    },
    {
      id: 5,
      type: 'research',
      tag: 'Crop Science',
      tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      titleEn: 'IARI Pusa: New Climate-Resilient Hybrid Wheat Strains Show 18% Higher Yield Under Thermal Stress',
      titleHi: 'पूसा संस्थान: जलवायु-सहिष्णु हाइब्रिड गेहूं किस्म ने उच्च तापमान में 18% अधिक उपज दी',
      source: 'Indian Agricultural Research Institute (Pusa)',
      date: 'July 2026',
      readTime: '5 min read',
      summaryEn: 'The HD-3388 biofortified Sharbati grain variety retains high protein and gluten strength even under terminal heat conditions in late rabi cycles.',
      summaryHi: 'एचडी-3388 शरबती किस्म रबी के अंतिम चरण में तेज धूप और गर्मी के बावजूद उच्च प्रोटीन और बेहतर दाना वजन बनाए रखती है।',
      linkText: 'Download Agronomy Guide'
    },
    {
      id: 6,
      type: 'research',
      tag: 'Agri-Fintech',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      titleEn: 'Empirical Evaluation of Digital Escrow Payments in APMCs: Farmers Realize 28.4% Higher Net Returns',
      titleHi: 'मंडियों में डिजिटल एस्क्रो भुगतान का मूल्यांकन: किसानों को 28.4% अधिक शुद्ध लाभ',
      source: 'National Institute of Agricultural Economics & Policy Research',
      date: 'June 2026',
      readTime: '7 min read',
      summaryEn: 'Replacing delayed paper kaccha parcha settlement with automated bank escrow cuts out unrecorded commission deductions and reduces bad debt risks to 0%.',
      summaryHi: 'कागजी पर्ची के स्थान पर डिजिटल एस्क्रो प्रणाली अपनाने से बिचौलियों की अघोषित कटौतियां बंद हुईं और किसानों की शुद्ध आय में उल्लेखनीय वृद्धि हुई।',
      linkText: 'Read Economics Report'
    }
  ];

  const filteredArticles = newsCategoryTab === 'all'
    ? agriNewsArticles
    : agriNewsArticles.filter(a => a.type === newsCategoryTab);

  // Helper for navigating to role-specific portal
  const handleEnterRolePortal = (targetRole, targetTab) => {
    setCurrentRole(targetRole);
    onNavigateTab(targetTab);
  };

  return (
    <div className="space-y-12 sm:space-y-16 w-full max-w-[1720px] mx-auto animate-fade-in pb-20">
      
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: HERO & STAKEHOLDER ROLE GATEWAYS */}
      {/* ------------------------------------------------------------- */}
      <section id="hero-section" className="space-y-6 sm:space-y-8">
        
        {/* Active Role Notice Banner if already logged in */}
        {currentRole && currentRole !== 'overview' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-emerald-950">
                  {language === 'en' ? 'Active Session' : 'सक्रिय सत्र'}: <span className="capitalize font-black text-emerald-700">{currentRole} Portal</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-800 font-medium">
                  {language === 'en' 
                    ? 'You are currently logged in. You can open your private dashboard or browse public market intelligence below.' 
                    : 'आप वर्तमान में लॉग इन हैं। आप अपना निजी डैशबोर्ड खोल सकते हैं या नीचे सार्वजनिक मंडी जानकारी देख सकते हैं।'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => {
                  if (currentRole === 'farmer') onNavigateTab('farmer-portal');
                  else if (currentRole === 'buyer') onNavigateTab('buyer-portal');
                  else if (currentRole === 'transporter') onNavigateTab('transporter-portal');
                  else if (currentRole === 'admin') onNavigateTab('admin-portal');
                }}
                className="flex-1 sm:flex-initial bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'en' ? 'Go to My Portal' : 'मेरे पोर्टल पर जाएं'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setCurrentRole('overview');
                  showNotification('Signed out to public visitor view.', 'info');
                }}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
              >
                {language === 'en' ? 'Sign Out' : 'साइन आउट'}
              </button>
            </div>
          </div>
        )}

        {/* Hero Banner with Full Width Expansion & Mobile Proportions */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#f7f9f6] via-[#f1f6f1] to-[#e7f0e6] border border-[#e4eae2] p-5 sm:p-8 lg:p-10 xl:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 z-10">
              <div className="inline-flex items-center gap-2 bg-[#eaf6ed] border border-emerald-300/80 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-[#174d26]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Smart India Hackathon 2026 • Problem ID 26132</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.14] sm:leading-[1.12] tracking-tight">
                  {language === 'en' ? (
                    <>
                      Sell Smarter.<br />
                      Get the <span className="text-[#174d26]">Right Price.</span>
                    </>
                  ) : (
                    <>
                      सही जानकारी से बेचें.<br />
                      पाएं <span className="text-[#174d26]">सही दाम।</span>
                    </>
                  )}
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mt-3 sm:mt-4 font-normal">
                  {language === 'en' 
                    ? 'India\'s unified digital agriculture intelligence infrastructure. Real-time APMC mandi prices, computer vision AI grading, verified buyer marketplace, rural logistics, and 100% bank-backed escrow payments.'
                    : 'भारत का एकीकृत डिजिटल कृषि मंच। रीयल-टाइम मंडी भाव, कंप्यूटर विज़न एआई ग्रेडिंग, सत्यापित खरीदार बाज़ार, ग्रामीण परिवहन और 100% बैंक एस्क्रो सुरक्षा।'}
                </p>
              </div>

              {/* Quick Action Navigation CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1">
                <a
                  href="#rates-section"
                  className="inline-flex items-center justify-center gap-2 bg-[#174d26] hover:bg-[#123e1e] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-[#174d26]/20 transition hover:scale-[1.02] cursor-pointer text-center"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>{language === 'en' ? 'Live Mandi Rates & Graphs' : 'मंडी भाव व ग्राफ देखें'}</span>
                </a>

                <a
                  href="#ai-section"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-300 shadow-xs transition hover:scale-[1.02] cursor-pointer text-center"
                >
                  <Bot className="w-4 h-4 text-[#174d26]" />
                  <span>{language === 'en' ? 'Ask Kisan AI Assistant' : 'किसान AI से पूछें'}</span>
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center sm:justify-start gap-1 text-xs font-bold text-[#174d26] hover:underline px-2 py-2 cursor-pointer"
                >
                  <span>{language === 'en' ? 'How Platform Works →' : 'यह कैसे काम करता है →'}</span>
                </a>
              </div>

              {/* Trust Badge Strip */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 text-[11px] sm:text-xs font-semibold text-slate-600 border-t border-slate-200/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>25,000+ Farmers Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>₹4.82 Cr Protected Escrow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Agmarknet & e-NAM Standard</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual & Mission Card */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-square lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-white/60">
                <img 
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=900&auto=format&fit=crop&q=80" 
                  alt="Farmer in lush Indian agricultural farm" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Floating Mission Card */}
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/80 max-w-[155px] sm:max-w-[195px] space-y-1 sm:space-y-2 animate-slide-up">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#eaf6ed] flex items-center justify-center text-[#174d26]">
                    <Sprout className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Better Price</div>
                    <div className="text-[11px] sm:text-xs font-extrabold text-[#174d26] leading-tight">Better Future</div>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium space-y-0.5 leading-tight pt-0.5">
                    <div>Transparent Mandis</div>
                    <div>Direct Buyer Bidding</div>
                    <div>Aadhaar DBT Payout</div>
                  </div>
                  <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-[#174d26] rounded-full mt-1"></div>
                </div>

                {/* Bottom Live Escrow Ticker */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl text-white flex items-center justify-between text-[10px] sm:text-[11px] border border-slate-700/60">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-semibold">Trade Settlement:</span>
                  </div>
                  <div className="font-bold text-emerald-400">₹10,75,500 in Escrow</div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 4 DEDICATED STAKEHOLDER PORTAL GATEWAYS */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#174d26]" />
                <span>{language === 'en' ? 'Choose Your Dedicated Stakeholder Portal' : 'अपना समर्पित हितधारक पोर्टल चुनें'}</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {language === 'en' 
                  ? 'Each role features an isolated, role-specific portal. Select your persona to enter your private dashboard:' 
                  : 'प्रत्येक भूमिका के लिए एक सुरक्षित, अलग पोर्टल है। अपने डैशबोर्ड में प्रवेश करने के लिए अपना विकल्प चुनें:'}
              </p>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 hidden md:inline-block">
              Role-Separated Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
            
            {/* 1. Farmer Portal Card */}
            <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-emerald-600">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#174d26] flex items-center justify-center group-hover:scale-110 transition">
                  <Sprout className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">For Producers & FPOs</div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {language === 'en' ? 'Farmer Portal' : 'किसान पोर्टल'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Check AI price forecasts, assay crop quality with computer vision, list produce lots, and review verified buyer offers.'
                    : 'एआई मूल्य पूर्वानुमान, फसल गुणवत्ता ग्रेडिंग, लॉट सूची और खरीदारों के सीधे बोलियां देखें।'}
                </p>
              </div>

              <button
                onClick={() => handleEnterRolePortal('farmer', 'farmer-portal')}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#174d26] hover:bg-[#123e1e] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer shadow-xs"
              >
                <span>{language === 'en' ? 'Enter Farmer Portal' : 'किसान पोर्टल खोलें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Buyer Portal Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-blue-500">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition">
                  <Building2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">For Institutional Buyers</div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {language === 'en' ? 'Buyer Portal' : 'खरीदार पोर्टल'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Browse Grade A/B certified farm-gate lots, submit binding bids, post commodity requirements, and track escrow contracts.'
                    : 'सत्यापित फार्म-गेट लॉट ब्राउज़ करें, बोलियां लगाएं, अपनी आवश्यकताएं पोस्ट करें और एस्क्रो ट्रैक करें।'}
                </p>
              </div>

              <button
                onClick={() => handleEnterRolePortal('buyer', 'buyer-portal')}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer shadow-xs"
              >
                <span>{language === 'en' ? 'Enter Buyer Portal' : 'खरीदार पोर्टल खोलें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. Transporter Portal Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-amber-500">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-110 transition">
                  <Truck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">For Agri Logistics & Fleets</div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {language === 'en' ? 'Transporter Portal' : 'परिवहन पोर्टल'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Accept farm-gate pickup dispatch jobs, GPS route tracking, FASTag toll updates, and instant digital proof-of-delivery (e-POD).'
                    : 'खेत से पिकअप ट्रिप स्वीकार करें, जीपीएस ट्रैकिंग, फास्टैग टोल और डिजिटल डिलीवरी रसीद प्रबंधित करें।'}
                </p>
              </div>

              <button
                onClick={() => handleEnterRolePortal('transporter', 'transporter-portal')}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer shadow-xs"
              >
                <span>{language === 'en' ? 'Enter Transporter Portal' : 'परिवहन पोर्टल खोलें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. APMC Admin Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-purple-500">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">For Regulators & APMC</div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {language === 'en' ? 'APMC Mandi Board' : 'मंडी विनियामक बोर्ड'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en'
                    ? 'Oversee macro market arrivals, approve KYC onboarding for corporate buyers and FPOs, and arbitrate trade disputes.'
                    : 'मंडी आवक की निगरानी, खरीदार और एफपीओ का केवाईसी सत्यापन, और व्यापार विवादों का वैधानिक निपटारा करें।'}
                </p>
              </div>

              <button
                onClick={() => handleEnterRolePortal('admin', 'admin-portal')}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer shadow-xs"
              >
                <span>{language === 'en' ? 'Open APMC Oversight' : 'नियामक केंद्र खोलें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: INLINE KISAN AI CHATBOT & ADVISORY WIDGET */}
      {/* ------------------------------------------------------------- */}
      <section id="ai-section" className="bg-white rounded-2xl sm:rounded-3xl border border-[#e4eae2] p-4 sm:p-6 lg:p-8 xl:p-10 shadow-xs space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center shadow-xs shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {language === 'en' ? 'Kisan AI Market Assistant' : 'किसान एआई बाज़ार सलाहकार'}
                </h2>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  Active 24/7
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {language === 'en' 
                  ? 'Ask any question in English or Hindi regarding mandi trends, selling windows, AI quality grading, or escrow.' 
                  : 'मंडी भाव, विक्रय समय, एआई ग्रेडिंग या एस्क्रो भुगतान के बारे में कोई भी प्रश्न पूछें।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatHistory([
                {
                  sender: 'bot',
                  time: 'Just now',
                  text: language === 'en'
                    ? 'Conversation reset. How can I assist you with your produce or market rates today?'
                    : 'बातचीत रीसेट की गई। आज मैं आपकी फसल या मंडी भाव में क्या सहायता कर सकता हूँ?'
                }
              ])}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onOpenAiGrader}
              className="text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 sm:px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Camera Assayer</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips (Swipeable on mobile, wrapped on desktop) */}
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>Click a Quick Question to Ask Instantly:</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 sm:gap-2 pb-1">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChat(chip.label)}
                className="text-xs font-medium bg-[#f6f9f6] hover:bg-[#eaf6ed] text-[#174d26] border border-emerald-200/70 px-3 py-1.5 rounded-xl transition hover:scale-[1.02] cursor-pointer whitespace-nowrap sm:whitespace-normal shrink-0 sm:shrink"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="bg-[#fafaf8] rounded-2xl border border-slate-200 p-3.5 sm:p-5 h-[280px] sm:h-[340px] lg:h-[380px] overflow-y-auto space-y-3 sm:space-y-4">
          {chatHistory.map((msg, index) => {
            const isBot = msg.sender === 'bot';
            return (
              <div 
                key={index} 
                className={`flex gap-2 sm:gap-3 items-start ${isBot ? '' : 'flex-row-reverse'}`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isBot ? 'bg-[#eaf6ed] text-[#174d26]' : 'bg-slate-800 text-white'
                }`}>
                  {isBot ? <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </div>

                <div className={`max-w-[88%] sm:max-w-[75%] space-y-1 ${isBot ? 'items-start' : 'items-end text-right'}`}>
                  <div className={`p-3 sm:p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isBot 
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-none' 
                      : 'bg-[#174d26] text-white rounded-tr-none shadow-xs'
                  }`}>
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {isBot && (
                      <button
                        onClick={() => handleSpeakText(msg.text)}
                        className="hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                        title="Listen to audio"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isAiThinking && (
            <div className="flex gap-2 sm:gap-3 items-start animate-fade-in">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eaf6ed] text-[#174d26] flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-2.5 sm:p-3 rounded-2xl text-xs text-slate-500 rounded-tl-none flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#174d26] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#174d26] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#174d26] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-semibold text-slate-500 ml-1">Analyzing APMC mandi intelligence...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendChat();
          }}
          className="flex items-center gap-2"
        >
          <input 
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={language === 'en' 
              ? 'Ask about crop rates, selling windows, Agmarknet grades...' 
              : 'फसल भाव, सही समय, ग्रेडिंग या परिवहन के बारे में पूछें...'}
            className="flex-1 bg-slate-50 border border-slate-300 focus:border-[#174d26] focus:bg-white focus:outline-none text-xs rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-slate-900 transition"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isAiThinking}
            className="bg-[#174d26] hover:bg-[#123e1e] disabled:opacity-50 text-white text-xs font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer shrink-0"
          >
            <span>{language === 'en' ? 'Ask AI' : 'पूछें'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: ALL RATE GRAPHS & MANDI INTELLIGENCE */}
      {/* ------------------------------------------------------------- */}
      <section id="rates-section" className="space-y-4 sm:space-y-6">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174d26] uppercase tracking-wider mb-1">
              <BarChart2 className="w-4 h-4" />
              <span>National Agmarknet Price Discovery</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'en' ? 'Live Mandi Rate Intelligence & Trends' : 'लाइव मंडी भाव व मूल्य विश्लेषण'}
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mt-1">
              {language === 'en' 
                ? 'Historical spot prices combined with 7-day machine learning predictive forecasts for Indian agricultural commodities.' 
                : 'भारतीय कृषि जिंसों के लिए 7-दिवसीय मशीन लर्निंग मूल्य पूर्वानुमान और ऐतिहासिक मंडी डेटा।'}
            </p>
          </div>

          {/* Crop Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {Object.keys(cropDatasets).map((cropKey) => {
              const item = cropDatasets[cropKey];
              const isSelected = selectedCrop === cropKey;
              return (
                <button
                  key={cropKey}
                  onClick={() => setSelectedCrop(cropKey)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected 
                      ? 'bg-[#174d26] text-white shadow-xs' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {language === 'en' ? item.nameEn : item.nameHi}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Crop Metric Bar (2 columns on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 xl:gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-xs">
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400">Modal Spot Price</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              ₹ {activeCropData.currentPrice} <span className="text-[10px] sm:text-xs font-medium text-slate-500">{activeCropData.unit}</span>
            </div>
            <div className={`text-[11px] sm:text-xs font-bold mt-1 flex items-center gap-1 ${
              activeCropData.isPositive ? 'text-emerald-600' : 'text-rose-500'
            }`}>
              {activeCropData.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{activeCropData.change} 24h</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-xs">
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400">Benchmark APMC</div>
            <div className="text-xs sm:text-base font-black text-slate-900 mt-1 truncate">
              {activeCropData.mandi}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Verified Yard</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-xs">
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400">Today's Arrivals</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {activeCropData.arrivalsMT}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
              <Package className="w-3 h-3 text-slate-400" />
              <span>Yard volume</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-xs">
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400">Recommendation</div>
            <div className="text-xs sm:text-base font-black text-[#174d26] mt-1 truncate">
              {activeCropData.recommendation}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-amber-800 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{activeCropData.confidence} Confidence</span>
            </div>
          </div>

        </div>

        {/* Interactive Recharts Graph & Mandi Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 xl:gap-8">
          
          {/* Main Price Trend Curve (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    {language === 'en' 
                      ? `${activeCropData.nameEn} Price Trend & 7-Day AI Forecast` 
                      : `${activeCropData.nameHi} मूल्य रुझान व 7-दिवसीय पूर्वानुमान`}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    Solid line: Actual spot prices • Area: Machine learning projection
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-bold bg-[#eaf6ed] text-[#174d26] px-2.5 py-1 rounded-lg">
                    {activeCropData.category}
                  </span>
                </div>
              </div>

              {/* Chart Container */}
              <div className="h-60 sm:h-72 lg:h-80 xl:h-96 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={activeCropData.trendData} 
                    margin={{ top: 18, right: 10, left: -25, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="cropPriceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#174d26" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#174d26" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 9, fill: '#64748b' }} 
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 9, fill: '#64748b' }} 
                      axisLine={false}
                      tickLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        borderRadius: '12px', 
                        color: '#fff', 
                        fontSize: '11px',
                        border: 'none',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                      }} 
                      formatter={(value, name, item) => [
                        `₹ ${value} / Qtl ${item.payload.forecast ? '(AI Forecast)' : '(Actual)'}`, 
                        'Price'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#174d26" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#cropPriceGradient)" 
                      dot={{ r: 3.5, fill: '#174d26', strokeWidth: 1, stroke: '#ffffff' }}
                      activeDot={{ r: 5.5, fill: '#123e1e' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Advisory Box */}
              <div className="mt-4 p-3 sm:p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl sm:rounded-2xl flex items-start gap-2.5 sm:gap-3">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <span className="font-bold">Agri AI Advisory: </span>
                  {language === 'en' ? activeCropData.adviceEn : activeCropData.adviceHi}
                </div>
              </div>

            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 text-[10px] sm:text-[11px]">
                Data synchronized with Agmarknet APMC Gateway • Refreshed hourly
              </span>
              <button
                onClick={() => handleEnterRolePortal('farmer', 'farmer-portal')}
                className="text-[#174d26] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Check All 420+ Mandis in Farmer Portal →</span>
              </button>
            </div>
          </div>

          {/* Mandi Rate Comparison Table (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  {language === 'en' ? 'Top Mandis Comparison' : 'शीर्ष मंडियों की तुलना'}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  Real-time price variance for {language === 'en' ? activeCropData.nameEn : activeCropData.nameHi}
                </p>
              </div>

              <div className="divide-y divide-slate-100 mt-2">
                {activeCropData.mandiComparisons.map((m, idx) => (
                  <div key={idx} className="py-2.5 sm:py-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{m.name}</span>
                        {m.isBest && (
                          <span className="text-[9px] font-extrabold bg-[#eaf6ed] text-[#174d26] px-1.5 py-0.5 rounded border border-emerald-300">
                            Highest
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{m.state} • {m.arrivals}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-black text-slate-900">
                        ₹ {m.price}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400">/quintal</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleEnterRolePortal('farmer', 'farmer-portal')}
                className="w-full py-2 sm:py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#174d26] text-slate-800 text-xs font-bold hover:bg-slate-50 transition cursor-pointer text-center"
              >
                {language === 'en' ? 'Open Detailed Mandi Radar' : 'विस्तृत मंडी रडार देखें'}
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: HOW THE APP WORKS (6-POINT BREAKDOWN) */}
      {/* ------------------------------------------------------------- */}
      <section id="how-it-works" className="bg-[#fcfdfc] rounded-2xl sm:rounded-3xl border border-[#e4eae2] p-5 sm:p-8 lg:p-10 xl:p-12 shadow-xs space-y-6 sm:space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174d26] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>End-to-End Agri Trade Infrastructure</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'en' ? 'How Farmer Market Intelligence Works' : 'यह मंच कैसे काम करता है'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Our 6-step digital process removes exploitative commission agents, validates produce quality, guarantees payments through bank escrow, and tracks farm-gate logistics.'
              : 'हमारी 6-चरणीय डिजिटल प्रक्रिया बिचौलियों को समाप्त करती है, उपज की गुणवत्ता प्रमाणित करती है और एस्क्रो के माध्यम से भुगतान की गारंटी देती है।'}
          </p>
        </div>

        {/* 6 Steps: Expands to 6 columns on Full Desktop! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-5">
          
          {/* Point 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 xl:p-4 shadow-xs hover:shadow-md transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center font-black text-sm">
              01
            </div>
            <div className="flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-[#174d26] shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? 'Verified KYC' : 'सत्यापित केवाईसी'}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Farmers and FPOs onboard via 1-click Aadhaar. Corporate buyers undergo GSTIN and solvency verification.'
                : 'किसान आधार से आसानी से जुड़ते हैं। खरीदारों का जीएसटी व साख सत्यापन किया जाता है।'}
            </p>
          </div>

          {/* Point 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 xl:p-4 shadow-xs hover:shadow-md transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center font-black text-sm">
              02
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? 'AI Quality Assaying' : 'एआई गुणवत्ता परख'}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Snap 3 photos of produce. Neural computer vision calculates Agmarknet Grade A/B/C specifications.'
                : 'उपज की 3 फोटो लें। कंप्यूटर विज़न मॉडल Agmarknet ग्रेड प्रमाणपत्र जारी करता है।'}
            </p>
          </div>

          {/* Point 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 xl:p-4 shadow-xs hover:shadow-md transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center font-black text-sm">
              03
            </div>
            <div className="flex items-center gap-1.5">
              <Handshake className="w-4 h-4 text-[#174d26] shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? 'Direct Price Bidding' : 'प्रत्यक्ष बोलियां'}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Lots are displayed directly to 1,200+ institutional buyers. Digital bids remove 15-20% middlemen cut.'
                : '1,200+ खरीदारों को सीधी पहुंच। डिजिटल बोलियां बिचौलियों की दलाली को समाप्त करती हैं।'}
            </p>
          </div>

          {/* Point 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 xl:p-4 shadow-xs hover:shadow-md transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center font-black text-sm">
              04
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? 'Locked Bank Escrow' : 'सुरक्षित एस्क्रो'}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'When an offer is accepted, 100% of the trade amount is secured in bank escrow before dispatch.'
                : 'सौदा होते ही 100% राशि बैंक एस्क्रो में जमा होती है। वाहन निकलने से पहले भुगतान सुरक्षित।'}
            </p>
          </div>

          {/* Point 5 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 xl:p-4 shadow-xs hover:shadow-md transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center font-black text-sm">
              05
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? 'Farm Logistics' : 'खेत से परिवहन'}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Kisan Express fleet handles farm-gate loading with real-time GPS and cold chain reefer vans.'
                : 'खेत से जीपीएस ट्रैकिंग और तापमान नियंत्रित वैन द्वारा उपज का सुरक्षित परिवहन।'}
            </p>
          </div>

          {/* Point 6 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 xl:p-4 shadow-xs hover:shadow-md transition space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center font-black text-sm">
              06
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-emerald-700 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {language === 'en' ? 'Instant DBT Payout' : 'तत्काल डीबीटी भुगतान'}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Delivery weighbridge verification triggers instant payment release to farmer bank within 45 mins.'
                : 'गोदाम पर वजन सत्यापन होते ही 45 मिनट के भीतर किसान के खाते में सीधा भुगतान।'}
            </p>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: AGRICULTURAL NEWS & CURRENT RESEARCH STUDIES */}
      {/* ------------------------------------------------------------- */}
      <section id="news-section" className="space-y-4 sm:space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174d26] uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4" />
              <span>National Agri Knowledge & Insights</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'en' ? 'Agricultural News & Current Research' : 'कृषि समाचार व नवीनतम अनुसंधान'}
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mt-1">
              {language === 'en' 
                ? 'Curated updates on national policy, APMC mandi regulations, and peer-reviewed studies from ICAR, IARI, and agricultural universities.' 
                : 'राष्ट्रीय कृषि नीतियां, मंडी सुधार और भारतीय कृषि अनुसंधान परिषद (ICAR) के नवीनतम वैज्ञानिक अध्ययन।'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setNewsCategoryTab('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                newsCategoryTab === 'all' ? 'bg-[#174d26] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setNewsCategoryTab('news')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                newsCategoryTab === 'news' ? 'bg-[#174d26] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Policy & Mandi News
            </button>
            <button
              onClick={() => setNewsCategoryTab('research')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                newsCategoryTab === 'research' ? 'bg-[#174d26] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              University Research
            </button>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
          {filteredArticles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Meta Tag & Source */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${article.tagColor}`}>
                    {article.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{article.readTime}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#174d26] transition">
                  {language === 'en' ? article.titleEn : article.titleHi}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? article.summaryEn : article.summaryHi}
                </p>

              </div>

              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div className="text-slate-400 font-medium text-[10px] sm:text-[11px]">
                  <span>{article.source}</span>
                </div>
                <button
                  onClick={() => showNotification(`Opened full summary for: ${article.titleEn.slice(0, 40)}...`, 'info')}
                  className="text-[#174d26] font-bold hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>{article.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: CONTACT US & GRIEVANCE HELPDESK */}
      {/* ------------------------------------------------------------- */}
      <section id="contact-section" className="bg-white rounded-2xl sm:rounded-3xl border border-[#e4eae2] p-5 sm:p-8 lg:p-10 xl:p-12 shadow-xs space-y-6 sm:space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-start">
          
          {/* Left Column: Explicit Contact Details */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174d26] uppercase tracking-wider mb-1">
                <Phone className="w-3.5 h-3.5" />
                <span>24/7 Farmer & Buyer Helpline</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                {language === 'en' ? 'Get In Touch & Support' : 'संपर्क व सहायता केंद्र'}
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {language === 'en'
                  ? 'Have questions about onboarding your FPO, getting an AI quality certificate, or tracking an escrow disbursement? Call or email our team directly.'
                  : 'एफपीओ पंजीकरण, एआई गुणवत्ता प्रमाणपत्र या एस्क्रो भुगतान के संबंध में सहायता के लिए सीधे संपर्क करें।'}
              </p>
            </div>

            {/* Direct Phone Box */}
            <div className="bg-[#f7faf7] border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Toll-Free Helpline / Mobile</div>
                  <a 
                    href="tel:9336161644" 
                    className="text-base sm:text-lg font-black text-slate-900 hover:text-[#174d26] transition block cursor-pointer"
                  >
                    9336161644
                  </a>
                  <div className="text-[10px] text-emerald-700 font-medium">Click to Call (Mon–Sat, 8am–8pm)</div>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard('9336161644', 'Phone Number')}
                className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer shrink-0"
                title="Copy phone number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Email Box */}
            <div className="bg-[#f7faf7] border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#eaf6ed] text-[#174d26] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Inquiries & Support</div>
                  <a 
                    href="mailto:adityapatelp34@gmail.com" 
                    className="text-xs sm:text-base font-black text-slate-900 hover:text-[#174d26] transition truncate block cursor-pointer"
                  >
                    adityapatelp34@gmail.com
                  </a>
                  <div className="text-[10px] text-emerald-700 font-medium">Click to Email (Average reply 2 hrs)</div>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard('adityapatelp34@gmail.com', 'Email Address')}
                className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer shrink-0"
                title="Copy email address"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Physical Location & Credentials */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-[11px] sm:text-xs">National Agricultural Innovation Directorate • Pusa Complex, New Delhi & Pune Division</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">Smart India Hackathon 2026: Team <strong>INCREDIBLE_X_TECH</strong> (Problem ID 26132)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message & Inquiry Form */}
          <div className="lg:col-span-7 bg-[#fafaf8] border border-slate-200 rounded-2xl p-4 sm:p-8 space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                {language === 'en' ? 'Send an Inquiry or Grievance' : 'पूछताछ या शिकायत भेजें'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'en' 
                  ? 'Our APMC grievance officer and technical team will address your submission immediately.' 
                  : 'हमारे अधिकारी और तकनीकी सहायता दल आपकी शिकायत का तुरंत समाधान करेंगे।'}
              </p>
            </div>

            {isContactSubmitted ? (
              <div className="p-5 sm:p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-slide-up">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xs sm:text-sm font-black text-emerald-950">
                  {language === 'en' ? 'Inquiry Submitted Successfully!' : 'पूछताछ सफलतापूर्वक दर्ज की गई!'}
                </div>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  {language === 'en'
                    ? 'Thank you for reaching out. A ticket has been generated. You will receive an SMS and email update.'
                    : 'संपर्क करने के लिए धन्यवाद। टिकट संख्या उत्पन्न कर दी गई है। आपको एसएमएस और ईमेल द्वारा सूचना प्राप्त होगी।'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 sm:space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil / Rajesh Kumar"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#174d26] text-xs rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 block mb-1">
                      Phone Number / Email *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="+91 98224 XXXXX or your email"
                      value={contactForm.phoneOrEmail}
                      onChange={(e) => setContactForm({ ...contactForm, phoneOrEmail: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#174d26] text-xs rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 block mb-1">
                      Stakeholder Role
                    </label>
                    <select
                      value={contactForm.roleCategory}
                      onChange={(e) => setContactForm({ ...contactForm, roleCategory: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#174d26] text-xs rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="farmer">Farmer / FPO Producer</option>
                      <option value="buyer">Institutional / Bulk Buyer</option>
                      <option value="transporter">Agri Logistics / Transporter</option>
                      <option value="general">General / Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 block mb-1">
                      Subject / Topic
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Escrow Inquiry, AI Grader, FPO"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-white border border-slate-300 focus:border-[#174d26] text-xs rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 block mb-1">
                    Your Message / Grievance Details *
                  </label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Describe your question, mandi issue, or technical support requirement..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white border border-slate-300 focus:border-[#174d26] text-xs rounded-xl p-3 sm:p-3.5 text-slate-900 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#174d26] hover:bg-[#123e1e] text-white text-xs font-bold py-2.5 sm:py-3 px-6 rounded-xl transition shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </section>

    </div>
  );
};
