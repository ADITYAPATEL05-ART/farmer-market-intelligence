export const CROPS_CATALOG = [
  { id: 'tomato', name: 'Tomato (Hybrid)', category: 'Vegetable', msp: 1200, shelfLifeDays: 7, idealTemp: '12-15°C' },
  { id: 'onion', name: 'Onion (Nashik Red)', category: 'Vegetable', msp: 1800, shelfLifeDays: 45, idealTemp: '25-30°C' },
  { id: 'potato', name: 'Potato (Jyoti)', category: 'Tuber', msp: 1400, shelfLifeDays: 90, idealTemp: '4-7°C' },
  { id: 'wheat', name: 'Wheat (Sharbati)', category: 'Grain', msp: 2275, shelfLifeDays: 365, idealTemp: 'Ambient' },
  { id: 'paddy', name: 'Basmati Paddy (1121)', category: 'Grain', msp: 3800, shelfLifeDays: 365, idealTemp: 'Ambient' },
  { id: 'soybean', name: 'Soybean (Yellow)', category: 'Oilseed', msp: 4600, shelfLifeDays: 180, idealTemp: 'Ambient' },
  { id: 'cotton', name: 'Cotton (Medium Staple)', category: 'Fiber', msp: 6620, shelfLifeDays: 180, idealTemp: 'Dry' },
  { id: 'chilli', name: 'Dry Red Chilli (Teja)', category: 'Spice', msp: 16500, shelfLifeDays: 120, idealTemp: 'Dry' }
];

export const MANDI_PRICES = [
  { id: 'MP-01', mandi: 'Azadpur APMC', state: 'Delhi', crop: 'Tomato (Hybrid)', modalPrice: 2850, minPrice: 2400, maxPrice: 3200, trend: '+4.2%', arrivalTons: 145 },
  { id: 'MP-02', mandi: 'Lasalgaon APMC', state: 'Maharashtra', crop: 'Onion (Nashik Red)', modalPrice: 2150, minPrice: 1900, maxPrice: 2450, trend: '-1.8%', arrivalTons: 420 },
  { id: 'MP-03', mandi: 'Agra APMC', state: 'Uttar Pradesh', crop: 'Potato (Jyoti)', modalPrice: 1620, minPrice: 1480, maxPrice: 1800, trend: '+1.5%', arrivalTons: 310 },
  { id: 'MP-04', mandi: 'Karnal Mandi', state: 'Haryana', crop: 'Basmati Paddy (1121)', modalPrice: 4100, minPrice: 3950, maxPrice: 4350, trend: '+0.8%', arrivalTons: 85 }
];

export const INITIAL_PRODUCE_LOTS = [
  {
    id: 'LOT-101',
    farmerName: 'Rameshwar Patel',
    phone: '+91 98261 44120',
    location: 'Indore Rural, Madhya Pradesh',
    crop: 'Tomato (Hybrid)',
    variety: 'Himsona Grade A',
    quantityQuintals: 45,
    expectedPricePerQuintal: 2650,
    harvestDate: '2026-09-04',
    qualityScore: 94,
    aiGradingNotes: 'Uniform redness, firmness index 8.8/10, pest blemish < 1.5%',
    distanceKm: 12,
    verifiedFPO: true,
    status: 'ACTIVE',
    offers: [
      { id: 'OFF-301', buyerName: 'BigBasket Fresh Hub', amountPerQuintal: 2580, status: 'PENDING', date: '2026-09-05' }
    ]
  },
  {
    id: 'LOT-102',
    farmerName: 'Balwinder Singh Dhillon',
    phone: '+91 94172 88310',
    location: 'Amritsar District, Punjab',
    crop: 'Basmati Paddy (1121)',
    variety: 'Export Super Fine',
    quantityQuintals: 120,
    expectedPricePerQuintal: 4150,
    harvestDate: '2026-09-02',
    qualityScore: 97,
    aiGradingNotes: 'Moisture content 11.8% (optimal), broken grains < 1%',
    distanceKm: 28,
    verifiedFPO: true,
    status: 'ACTIVE',
    offers: []
  }
];

export const BUYER_DEMANDS = [
  {
    id: 'DEM-401',
    buyerName: 'Zomato Hyperpure Procurement',
    crop: 'Tomato (Hybrid)',
    requiredQuintals: 200,
    offeredPriceMax: 2750,
    deliveryLocation: 'Bhiwandi Fulfillment Center, Mumbai',
    requiredByDate: '2026-09-10',
    minQualityScore: 90,
    status: 'OPEN'
  },
  {
    id: 'DEM-402',
    buyerName: 'Mother Dairy Fruit & Veg Pvt Ltd',
    crop: 'Potato (Jyoti)',
    requiredQuintals: 350,
    offeredPriceMax: 1700,
    deliveryLocation: 'Mangolpuri Cold Hub, Delhi',
    requiredByDate: '2026-09-12',
    minQualityScore: 85,
    status: 'OPEN'
  }
];

export const TRANSPORTERS = [
  { id: 'TRP-1', name: 'Kisan Rath Reefer Fleet', vehicle: '16T Refrigerated Eicher', tempControl: true, baseRatePerKm: 34, rating: 4.8, available: true },
  { id: 'TRP-2', name: 'Vande Gramin Logistics', vehicle: '9T Insulated Tata LPT', tempControl: false, baseRatePerKm: 26, rating: 4.6, available: true }
];

export const COLD_STORAGE_FACILITIES = [
  { id: 'CS-01', name: 'Malwa Agro Climate Hub', location: 'Dewas Naka, Indore', capacityTons: 5000, availableTons: 1200, ratePerQuintalMonth: 65, tempRange: '2°C to 8°C' },
  { id: 'CS-02', name: 'Kisan Rakshak Cold Chamber', location: 'Kundli Agri Zone, Sonipat', capacityTons: 8000, availableTons: 2450, ratePerQuintalMonth: 58, tempRange: '-2°C to 12°C' }
];

export const ESCROW_ORDERS = [
  {
    id: 'ORD-901',
    lotId: 'LOT-098',
    farmerName: 'Santosh Kumar',
    buyerName: 'Blinkit Quick Fresh Hub',
    crop: 'Onion (Nashik Red)',
    quantityQuintals: 60,
    totalValue: 129000,
    escrowStatus: 'FUNDS_LOCKED_IN_ESCROW',
    dispatchStatus: 'IN_TRANSIT',
    expectedDelivery: '2026-09-07'
  }
];

