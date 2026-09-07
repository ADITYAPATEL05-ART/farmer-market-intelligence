// KisanSetu / Farmer Market Intelligence & Marketplace Seed Data
// Problem Statement ID: 26132 | Team: INCREDIBLE_X_TECH

export const CROPS_CATALOG = [
  { id: 'onion', name: 'Onion (Red)', hindiName: 'लाल प्याज', category: 'Vegetables', unit: 'Quintal' },
  { id: 'wheat', name: 'Wheat (Sharbati)', hindiName: 'गेहूं (शरबती)', category: 'Grains', unit: 'Quintal' },
  { id: 'tomato', name: 'Tomato (Hybrid)', hindiName: 'टमाटर (हाइब्रिड)', category: 'Vegetables', unit: 'Quintal' },
  { id: 'soybean', name: 'Soybean (Yellow)', hindiName: 'सोयाबीन (पीला)', category: 'Oilseeds', unit: 'Quintal' },
  { id: 'rice', name: 'Basmati Rice (1121)', hindiName: 'बासमती चावल (1121)', category: 'Grains', unit: 'Quintal' },
  { id: 'cotton', name: 'Cotton (Medium Staple)', hindiName: 'कपास', category: 'Fiber', unit: 'Quintal' },
  { id: 'potato', name: 'Potato (Jyoti)', hindiName: 'आलू (ज्योति)', category: 'Vegetables', unit: 'Quintal' },
  { id: 'chilli', name: 'Guntur Red Chilli', hindiName: 'गुंटूर लाल मिर्च', category: 'Spices', unit: 'Quintal' },
];

export const MANDI_PRICES = [
  {
    cropId: 'onion',
    cropName: 'Nashik Red Onion',
    state: 'Maharashtra',
    mandi: 'Lasalgaon APMC',
    modalPrice: 2380,
    minPrice: 1950,
    maxPrice: 2650,
    change: +5.8,
    arrivalsMT: 1420,
    saleWindow: {
      recommendation: 'HOLD',
      badgeColor: 'amber',
      confidence: 88,
      adviceEn: 'Hold for 5–7 days. Unseasonal rainfall in southern districts is restricting market arrivals, likely pushing prices up by 12–15%.',
      adviceHi: '5-7 दिनों तक रोकें। दक्षिणी जिलों में बेमौसम बारिश से आवक कम है, जिससे कीमतों में 12-15% उछाल संभव है।',
      targetPriceWindow: '₹2,600 - ₹2,750 / Qtl'
    },
    history: [
      { day: 'Day -14', price: 2100, forecast: false },
      { day: 'Day -10', price: 2150, forecast: false },
      { day: 'Day -7', price: 2220, forecast: false },
      { day: 'Day -4', price: 2290, forecast: false },
      { day: 'Today', price: 2380, forecast: false },
      { day: '+3 Days', price: 2490, forecast: true },
      { day: '+7 Days', price: 2640, forecast: true },
      { day: '+14 Days', price: 2710, forecast: true },
    ]
  },
  {
    cropId: 'wheat',
    cropName: 'Sharbati Wheat (Grade A)',
    state: 'Madhya Pradesh',
    mandi: 'Indore Mandi',
    modalPrice: 3050,
    minPrice: 2850,
    maxPrice: 3200,
    change: +2.1,
    arrivalsMT: 2850,
    saleWindow: {
      recommendation: 'SELL NOW',
      badgeColor: 'emerald',
      confidence: 91,
      adviceEn: 'Sell now. Institutional procurement tenders are active and current modal prices are near the 6-month seasonal peak.',
      adviceHi: 'अभी बेचें। संस्थागत खरीद टेंडर सक्रिय हैं और मौजूदा भाव 6 महीने के मौसमी शिखर के करीब हैं।',
      targetPriceWindow: '₹3,000 - ₹3,150 / Qtl'
    },
    history: [
      { day: 'Day -14', price: 2800, forecast: false },
      { day: 'Day -10', price: 2900, forecast: false },
      { day: 'Day -7', price: 2980, forecast: false },
      { day: 'Day -4', price: 3020, forecast: false },
      { day: 'Today', price: 3050, forecast: false },
      { day: '+3 Days', price: 3040, forecast: true },
      { day: '+7 Days', price: 2990, forecast: true },
      { day: '+14 Days', price: 2950, forecast: true },
    ]
  },
  {
    cropId: 'tomato',
    cropName: 'Hybrid Table Tomato',
    state: 'Karnataka',
    mandi: 'Kolar Mandi',
    modalPrice: 1850,
    minPrice: 1400,
    maxPrice: 2100,
    change: -4.2,
    arrivalsMT: 950,
    saleWindow: {
      recommendation: 'SELL GRADUALLY',
      badgeColor: 'blue',
      confidence: 84,
      adviceEn: 'High perishability risk. Sell 60% immediately to verified retail buyers and transfer remaining 40% to cold storage.',
      adviceHi: 'जल्दी खराब होने वाला उत्पाद। 60% तुरंत सत्यापित खरीदारों को बेचें और बाकी 40% को कोल्ड स्टोरेज में रखें।',
      targetPriceWindow: '₹1,800 - ₹1,950 / Qtl'
    },
    history: [
      { day: 'Day -14', price: 2150, forecast: false },
      { day: 'Day -10', price: 2050, forecast: false },
      { day: 'Day -7', price: 1980, forecast: false },
      { day: 'Day -4', price: 1920, forecast: false },
      { day: 'Today', price: 1850, forecast: false },
      { day: '+3 Days', price: 1820, forecast: true },
      { day: '+7 Days', price: 1890, forecast: true },
      { day: '+14 Days', price: 1950, forecast: true },
    ]
  },
  {
    cropId: 'soybean',
    cropName: 'Yellow Soybean',
    state: 'Maharashtra',
    mandi: 'Latur APMC',
    modalPrice: 4720,
    minPrice: 4500,
    maxPrice: 4890,
    change: +1.5,
    arrivalsMT: 1800,
    saleWindow: {
      recommendation: 'HOLD',
      badgeColor: 'amber',
      confidence: 86,
      adviceEn: 'Solvent extraction plants facing stock depletion; crush margin is favorable. Hold for ₹4,900+ target.',
      adviceHi: 'ऑयल मिलों में स्टॉक की कमी; क्रश मार्जिन अनुकूल है। ₹4,900+ के लक्ष्य के लिए होल्ड करें।',
      targetPriceWindow: '₹4,850 - ₹5,000 / Qtl'
    },
    history: [
      { day: 'Day -14', price: 4500, forecast: false },
      { day: 'Day -10', price: 4580, forecast: false },
      { day: 'Day -7', price: 4620, forecast: false },
      { day: 'Day -4', price: 4680, forecast: false },
      { day: 'Today', price: 4720, forecast: false },
      { day: '+3 Days', price: 4790, forecast: true },
      { day: '+7 Days', price: 4880, forecast: true },
      { day: '+14 Days', price: 4940, forecast: true },
    ]
  },
  {
    cropId: 'rice',
    cropName: 'Pusa 1121 Basmati Rice',
    state: 'Punjab',
    mandi: 'Khanna Mandi',
    modalPrice: 3850,
    minPrice: 3600,
    maxPrice: 4100,
    change: +3.4,
    arrivalsMT: 3100,
    saleWindow: {
      recommendation: 'SELL NOW',
      badgeColor: 'emerald',
      confidence: 89,
      adviceEn: 'Gulf export orders surged this week. High export demand makes this an optimal liquidation window.',
      adviceHi: 'खाड़ी देशों के निर्यात ऑर्डर में उछाल आया है। यह बिक्री का सबसे उपयुक्त समय है।',
      targetPriceWindow: '₹3,800 - ₹3,950 / Qtl'
    },
    history: [
      { day: 'Day -14', price: 3500, forecast: false },
      { day: 'Day -10', price: 3600, forecast: false },
      { day: 'Day -7', price: 3710, forecast: false },
      { day: 'Day -4', price: 3790, forecast: false },
      { day: 'Today', price: 3850, forecast: false },
      { day: '+3 Days', price: 3880, forecast: true },
      { day: '+7 Days', price: 3860, forecast: true },
      { day: '+14 Days', price: 3820, forecast: true },
    ]
  },
  {
    cropId: 'chilli',
    cropName: 'Guntur Teja Chilli',
    state: 'Andhra Pradesh',
    mandi: 'Guntur APMC',
    modalPrice: 19800,
    minPrice: 17500,
    maxPrice: 21500,
    change: +4.8,
    arrivalsMT: 420,
    saleWindow: {
      recommendation: 'HOLD',
      badgeColor: 'amber',
      confidence: 93,
      adviceEn: 'High oleoresin and spice extraction buyers competing for lot quality. Prices likely to touch ₹21,000+.',
      adviceHi: 'मसाला कंपनियों में उच्च मांग। कीमतें ₹21,000+ तक पहुंचने का अनुमान है।',
      targetPriceWindow: '₹20,500 - ₹21,500 / Qtl'
    },
    history: [
      { day: 'Day -14', price: 18200, forecast: false },
      { day: 'Day -10', price: 18700, forecast: false },
      { day: 'Day -7', price: 19100, forecast: false },
      { day: 'Day -4', price: 19400, forecast: false },
      { day: 'Today', price: 19800, forecast: false },
      { day: '+3 Days', price: 20200, forecast: true },
      { day: '+7 Days', price: 20900, forecast: true },
      { day: '+14 Days', price: 21400, forecast: true },
    ]
  }
];

export const INITIAL_PRODUCE_LOTS = [
  {
    id: 'LOT-101',
    crop: 'Onion (Red)',
    variety: 'Nashik Garva Red',
    grade: 'Grade A',
    moisturePercent: 11.2,
    quantityQtl: 450,
    reservePricePerQtl: 2420,
    harvestDate: '2026-08-28',
    farmerId: 'FARM-01',
    farmerName: 'Ramesh Balasaheb Patil',
    fpoName: 'Nashik Sahyadri Farmer Producer Co.',
    location: 'Niphad, Nashik',
    state: 'Maharashtra',
    distanceKm: 18,
    verifiedFPO: true,
    qualityCert: 'AGMARK-VERIFIED-2026-A1',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'ACTIVE',
    offers: [
      {
        id: 'OFFER-501',
        buyerId: 'BUY-01',
        buyerName: 'BigBasket Fresh Procurements',
        buyerType: 'Organized Retailer',
        bidPricePerQtl: 2390,
        offeredQuantityQtl: 450,
        totalAmount: 1075500,
        paymentTerms: '100% Escrow via UPI / RTGS',
        pickupDate: '2026-09-10',
        status: 'PENDING',
        submittedAt: '2 hours ago'
      },
      {
        id: 'OFFER-502',
        buyerId: 'BUY-03',
        buyerName: 'Sahyadri Agro Processing Ltd',
        buyerType: 'Food Processor',
        bidPricePerQtl: 2430,
        offeredQuantityQtl: 300,
        totalAmount: 729000,
        paymentTerms: '50% Advance Escrow, 50% on Gate Delivery',
        pickupDate: '2026-09-12',
        status: 'PENDING',
        submittedAt: '5 hours ago'
      }
    ]
  },
  {
    id: 'LOT-102',
    crop: 'Wheat (Sharbati)',
    variety: 'MP Sharbati Golden',
    grade: 'Grade A+',
    moisturePercent: 9.8,
    quantityQtl: 800,
    reservePricePerQtl: 3100,
    harvestDate: '2026-08-15',
    farmerId: 'FARM-02',
    farmerName: 'Devendra Singh Tomar',
    fpoName: 'Malwa Narmada Kisan Producer Org',
    location: 'Sehore, Bhopal Road',
    state: 'Madhya Pradesh',
    distanceKm: 34,
    verifiedFPO: true,
    qualityCert: 'FSSAI-GRAIN-GRADE-A+',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'ACTIVE',
    offers: [
      {
        id: 'OFFER-503',
        buyerId: 'BUY-02',
        buyerName: 'ITC Choupal Fresh Division',
        buyerType: 'Agri Conglomerate',
        bidPricePerQtl: 3120,
        offeredQuantityQtl: 800,
        totalAmount: 2496000,
        paymentTerms: 'Direct Escrow Settlement',
        pickupDate: '2026-09-09',
        status: 'PENDING',
        submittedAt: '1 day ago'
      }
    ]
  },
  {
    id: 'LOT-103',
    crop: 'Tomato (Hybrid)',
    variety: 'Kolar Super 505',
    grade: 'Grade A',
    moisturePercent: 88.5,
    quantityQtl: 250,
    reservePricePerQtl: 1880,
    harvestDate: '2026-09-04',
    farmerId: 'FARM-03',
    farmerName: 'C. Manjunath Gowda',
    fpoName: 'Kolar Valley Agri Cooperative',
    location: 'Bangarapet, Kolar',
    state: 'Karnataka',
    distanceKm: 12,
    verifiedFPO: true,
    qualityCert: 'HORTICULTURE-GRADE-A',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'ACTIVE',
    offers: []
  },
  {
    id: 'LOT-104',
    crop: 'Guntur Red Chilli',
    variety: 'Teja Hot Grade-1',
    grade: 'Grade A',
    moisturePercent: 8.1,
    quantityQtl: 150,
    reservePricePerQtl: 20200,
    harvestDate: '2026-08-20',
    farmerId: 'FARM-04',
    farmerName: 'Venkat Rao Polisetty',
    fpoName: 'Krishna Delta Spices FPO',
    location: 'Tenali Road, Guntur',
    state: 'Andhra Pradesh',
    distanceKm: 22,
    verifiedFPO: true,
    qualityCert: 'SPICES-BOARD-INDIA-VERIFIED',
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'NEGOTIATING',
    offers: [
      {
        id: 'OFFER-504',
        buyerId: 'BUY-04',
        buyerName: 'Catch Masala Procurement Corp',
        buyerType: 'Spice Exporter',
        bidPricePerQtl: 20050,
        offeredQuantityQtl: 150,
        totalAmount: 3007500,
        paymentTerms: 'Letter of Credit / Escrow',
        pickupDate: '2026-09-14',
        status: 'COUNTERED',
        counterPricePerQtl: 20150,
        submittedAt: '3 hours ago'
      }
    ]
  }
];

export const BUYER_DEMANDS = [
  {
    id: 'DEM-301',
    buyerName: 'BigBasket Fresh',
    buyerType: 'E-Grocery Major',
    verified: true,
    crop: 'Onion (Red)',
    varietyNeeded: 'Nashik Garva / High shelf life',
    quantityQtl: 1000,
    targetPricePerQtl: 2400,
    requiredByDate: '2026-09-15',
    destinationCity: 'Mumbai & Pune Fulfilment Hubs',
    preferredMinGrade: 'Grade A',
    status: 'OPEN',
    applicationsCount: 4
  },
  {
    id: 'DEM-302',
    buyerName: 'Reliance Retail Agri Supply',
    buyerType: 'Retail Hypermarket Chain',
    verified: true,
    crop: 'Wheat (Sharbati)',
    varietyNeeded: 'Golden MP Milling Grade',
    quantityQtl: 2500,
    targetPricePerQtl: 3150,
    requiredByDate: '2026-09-20',
    destinationCity: 'Indore Central Silos',
    preferredMinGrade: 'Grade A+',
    status: 'OPEN',
    applicationsCount: 6
  },
  {
    id: 'DEM-303',
    buyerName: 'Mother Dairy Fruits & Vegetables',
    buyerType: 'Cooperative Giant',
    verified: true,
    crop: 'Tomato (Hybrid)',
    varietyNeeded: 'Firm red table variety',
    quantityQtl: 500,
    targetPricePerQtl: 1900,
    requiredByDate: '2026-09-10',
    destinationCity: 'Delhi NCR Hub',
    preferredMinGrade: 'Grade A',
    status: 'OPEN',
    applicationsCount: 2
  }
];

export const COLD_STORAGE_FACILITIES = [
  {
    id: 'CS-01',
    name: 'MahaAgro Cold Logistics & Warehouse',
    location: 'Pimpalgaon Baswant, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 8.4,
    totalCapacityMT: 6000,
    availableCapacityMT: 1850,
    dailyRatePerQtl: 1.25,
    tempRange: '0°C to 4°C (Controlled Atmosphere)',
    suitableFor: ['Onion', 'Grapes', 'Tomato'],
    verifiedGovtLicense: 'WDRA-REG-2024-MH89',
    contactNumber: '+91 98230 45678',
    status: 'AVAILABLE'
  },
  {
    id: 'CS-02',
    name: 'Kisan Jyoti Warehouse & Pre-Cooling Hub',
    location: 'Lasalgaon Road, Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 14.2,
    totalCapacityMT: 4500,
    availableCapacityMT: 920,
    dailyRatePerQtl: 1.10,
    tempRange: '12°C to 15°C (Ventilated Dry Store)',
    suitableFor: ['Onion', 'Garlic', 'Potato'],
    verifiedGovtLicense: 'WDRA-REG-2025-MH12',
    contactNumber: '+91 94222 78910',
    status: 'AVAILABLE'
  },
  {
    id: 'CS-03',
    name: 'Narmada Valley Agri Cold Chain',
    location: 'Mandideep Industrial Area',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    distanceKm: 28.0,
    totalCapacityMT: 10000,
    availableCapacityMT: 4200,
    dailyRatePerQtl: 0.95,
    tempRange: 'Silo Grain Preservation',
    suitableFor: ['Wheat', 'Soybean', 'Pulses'],
    verifiedGovtLicense: 'WDRA-REG-2023-MP44',
    contactNumber: '+91 98930 11223',
    status: 'AVAILABLE'
  }
];

export const TRANSPORTERS = [
  {
    id: 'TR-01',
    companyName: 'Kisan Express Rural Fleet',
    driverName: 'Suresh Tukaram Kadam',
    driverPhone: '+91 97654 32100',
    vehicleNumber: 'MH-15-EG-4421',
    vehicleType: '14-Wheel Heavy Multi-Axle (16 MT Capacity)',
    gpsEnabled: true,
    rating: 4.8,
    ratePerKm: 38,
    assignedTrips: [
      {
        orderId: 'ORD-701',
        crop: 'Nashik Red Onion',
        quantityQtl: 450,
        pickup: 'Niphad Farm Gate (Ramesh Patil)',
        destination: 'BigBasket Navi Mumbai DC',
        status: 'IN_TRANSIT',
        gpsLat: 19.45,
        gpsLng: 73.80,
        progressPercent: 65,
        estimatedDelivery: 'Tomorrow, 08:30 AM'
      }
    ]
  },
  {
    id: 'TR-02',
    companyName: 'Sahyadri Agro Cold Reefer Vans',
    driverName: 'Jagdish Rao',
    driverPhone: '+91 98450 67123',
    vehicleNumber: 'KA-04-AB-9012',
    vehicleType: 'Refrigerated Reefer Truck (8 MT Capacity)',
    gpsEnabled: true,
    rating: 4.9,
    ratePerKm: 52,
    assignedTrips: []
  }
];

export const ESCROW_ORDERS = [
  {
    orderId: 'ORD-701',
    lotId: 'LOT-101',
    crop: 'Nashik Red Onion',
    quantityQtl: 450,
    pricePerQtl: 2390,
    totalAmount: 1075500,
    farmerName: 'Ramesh Balasaheb Patil',
    buyerName: 'BigBasket Fresh Procurements',
    transporterName: 'Kisan Express (MH-15-EG-4421)',
    currentStage: 'IN_TRANSIT',
    stages: [
      { key: 'AGREEMENT', title: 'Contract Locked', date: '04 Sep, 10:30 AM', completed: true },
      { key: 'ESCROW_FUNDED', title: '₹10,75,500 Deposited in Escrow', date: '04 Sep, 12:15 PM', completed: true },
      { key: 'FARM_PICKUP', title: 'Farm-Gate Pickup & Quality Check', date: '05 Sep, 02:00 PM', completed: true },
      { key: 'IN_TRANSIT', title: 'Transit to Buyer Hub (65% completed)', date: '06 Sep, Active', completed: false, current: true },
      { key: 'DELIVERY_VERIFIED', title: 'Weighbridge & Warehouse Receiving', date: 'Pending Arrival', completed: false },
      { key: 'PAYMENT_RELEASED', title: 'Instant RTGS Direct to Farmer Account', date: 'On Delivery', completed: false }
    ],
    escrowStatus: 'SECURED_IN_ESCROW',
    disputeStatus: 'NONE'
  }
];

export const GRIEVANCES = [
  {
    ticketId: 'GRV-901',
    crop: 'Hybrid Table Tomato',
    farmerName: 'C. Manjunath Gowda',
    buyerName: 'FreshRetail Pvt Ltd',
    issueType: 'Quality Grade Dispute at Dock',
    description: 'Buyer claimed 15% transit crush loss; farmer verified produce left farm in Grade A crates.',
    filedDate: '02 Sep 2026',
    status: 'IN_MEDIATION',
    resolutionNote: 'APMC Arbitrator inspected photo evidence. 8% normal transit loss allowance agreed; 92% payment unlocked.'
  },
  {
    ticketId: 'GRV-902',
    crop: 'MP Sharbati Wheat',
    farmerName: 'Devendra Singh Tomar',
    buyerName: 'Central Mills Ltd',
    issueType: 'Weighbridge Calibration Discrepancy',
    description: 'Difference of 4.2 Quintals between farm digital scale and mill receiving gate weighbridge.',
    filedDate: '28 Aug 2026',
    status: 'RESOLVED',
    resolutionNote: 'Certified third-party weighbridge re-test validated farmer weight. ₹13,020 balance released to farmer.'
  }
];

export const PLATFORM_IMPACT_METRICS = {
  farmerPriceRealizationIncrease: '+32.4%',
  middlemanMarginCut: '18.2%',
  postHarvestLossReduction: '-21.5%',
  totalTradeVolumeINR: '₹4.82 Cr',
  activeVerifiedFPOs: 148,
  activeCorporateBuyers: 64,
  disputeResolutionRate: '98.6%',
  averagePaymentReleaseTime: '42 minutes post-delivery'
};
