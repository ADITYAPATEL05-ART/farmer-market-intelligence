import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Search, 
  Filter, 
  ShieldCheck, 
  MapPin, 
  Send, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Truck, 
  DollarSign,
  PackageCheck,
  ShoppingCart,
  Megaphone,
  Package,
  X
} from 'lucide-react';

export const BuyerPortal = ({ initialTab = 'marketplace' }) => {
  const { 
    language, 
    lots, 
    submitBuyerOffer, 
    demands, 
    createBuyerDemand, 
    orders, 
    crops 
  } = useApp();

  const [buyerTab, setBuyerTab] = useState(initialTab); // 'marketplace' | 'post-demand' | 'orders'
  
  React.useEffect(() => {
    if (initialTab) {
      setBuyerTab(initialTab);
    }
  }, [initialTab]);
  const [filterCrop, setFilterCrop] = useState('ALL');
  const [filterGrade, setFilterGrade] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Bid / Offer Modal
  const [selectedLotForBid, setSelectedLotForBid] = useState(null);
  const [bidForm, setBidForm] = useState({
    buyerName: 'BigBasket Fresh Procurements',
    bidPricePerQtl: 2400,
    offeredQuantityQtl: 200,
    pickupDate: '2026-09-12'
  });

  // Demand Form
  const [demandForm, setDemandForm] = useState({
    buyerName: 'BigBasket Fresh Procurements',
    buyerType: 'E-Grocery Major',
    crop: 'Onion (Red)',
    varietyNeeded: 'Nashik Garva / High Shelf Life',
    quantityQtl: 800,
    targetPricePerQtl: 2420,
    requiredByDate: '2026-09-18',
    destinationCity: 'Mumbai Bhiwandi Hub',
    preferredMinGrade: 'Grade A'
  });

  // Filter lots
  const filteredLots = lots.filter(lot => {
    if (filterCrop !== 'ALL' && !lot.crop.toLowerCase().includes(filterCrop.toLowerCase())) return false;
    if (filterGrade !== 'ALL' && lot.grade !== filterGrade) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lot.crop.toLowerCase().includes(q) ||
        lot.farmerName.toLowerCase().includes(q) ||
        lot.location.toLowerCase().includes(q) ||
        lot.fpoName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenBidModal = (lot) => {
    setSelectedLotForBid(lot);
    setBidForm({
      buyerName: 'BigBasket Fresh Procurements',
      bidPricePerQtl: lot.reservePricePerQtl,
      offeredQuantityQtl: lot.quantityQtl,
      pickupDate: '2026-09-12'
    });
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!selectedLotForBid) return;
    submitBuyerOffer(selectedLotForBid.id, bidForm);
    setSelectedLotForBid(null);
  };

  const handleDemandSubmit = (e) => {
    e.preventDefault();
    createBuyerDemand({
      ...demandForm,
      quantityQtl: Number(demandForm.quantityQtl),
      targetPricePerQtl: Number(demandForm.targetPricePerQtl)
    });
    setBuyerTab('marketplace');
  };

  return (
    <div className="space-y-6">
      
      {/* Buyer Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Institutional Buyer • KYC Tier-1 Approved</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {language === 'en' ? 'Institutional Buyer Procurement Portal' : 'संस्थागत क्रेता खरीद पोर्टल'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Source verified Grade A/A+ crops directly from FPOs with digital assay certificates, transparent pricing, and smart escrow protection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBuyerTab('post-demand')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition hover:scale-102"
            >
              <Send className="w-4 h-4" />
              <span>Post Crop Requirement</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/60 overflow-x-auto text-xs">
          <button
            onClick={() => setBuyerTab('marketplace')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              buyerTab === 'marketplace'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{language === 'en' ? 'Live Produce Lots' : 'उपलब्ध लॉट'} ({filteredLots.length})</span>
          </button>
          <button
            onClick={() => setBuyerTab('post-demand')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              buyerTab === 'post-demand'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>{language === 'en' ? 'Active Demands & RFQs' : 'खरीद मांग'} ({demands.length})</span>
          </button>
          <button
            onClick={() => setBuyerTab('orders')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              buyerTab === 'orders'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{language === 'en' ? 'Escrow Orders & Delivery Tracking' : 'एस्क्रो ऑर्डर व ट्रैकिंग'} ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MARKETPLACE LOTS */}
      {buyerTab === 'marketplace' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crop, farmer name, or district..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500">Crop:</span>
                <select
                  value={filterCrop}
                  onChange={(e) => setFilterCrop(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-800"
                >
                  <option value="ALL">All Commodities</option>
                  <option value="Onion">Onion</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Chilli">Red Chilli</option>
                  <option value="Soybean">Soybean</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500">Grade:</span>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-800"
                >
                  <option value="ALL">All Grades</option>
                  <option value="Grade A+">Grade A+</option>
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100">
                    <img 
                      src={lot.images[0]} 
                      alt={lot.crop} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      Lot #{lot.id}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-md">
                      {lot.grade}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {lot.distanceKm} km from Hub
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-base text-slate-900">{lot.variety || lot.crop}</h4>
                        <span className="text-xs font-black text-emerald-700">
                          ₹{lot.reservePricePerQtl.toLocaleString('en-IN')}<span className="text-[10px] font-semibold text-slate-500"> / Qtl</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{lot.location}, {lot.state}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Available Lot Size:</span>
                        <strong className="text-slate-900">{lot.quantityQtl} Quintals</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Moisture Index:</span>
                        <strong className="text-slate-900">{lot.moisturePercent}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">FPO Collective:</span>
                        <strong className="text-emerald-800 truncate max-w-[160px]">{lot.fpoName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Quality Assayed:</span>
                        <strong className="text-slate-900">{lot.qualityCert || 'Agmark Assayed'}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {lot.status === 'SOLD' ? (
                    <div className="w-full text-center py-2 bg-slate-100 text-slate-500 font-bold text-xs rounded-xl">
                      Sold & Under Transport
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenBidModal(lot)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Submit Binding Digital Offer</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: POST DEMAND & RFQ */}
      {buyerTab === 'post-demand' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Broadcast Bulk Procurement Requirement
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Post your target volume and price. FPOs in nearby production clusters will be notified automatically to submit matching lots.
            </p>

            <form onSubmit={handleDemandSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Crop</label>
                  <select
                    value={demandForm.crop}
                    onChange={(e) => setDemandForm({ ...demandForm, crop: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  >
                    {crops.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specific Grade / Spec</label>
                  <input
                    type="text"
                    value={demandForm.varietyNeeded}
                    onChange={(e) => setDemandForm({ ...demandForm, varietyNeeded: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Quantity (Qtl)</label>
                  <input
                    type="number"
                    value={demandForm.quantityQtl}
                    onChange={(e) => setDemandForm({ ...demandForm, quantityQtl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    min="10"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Price (₹/Qtl)</label>
                  <input
                    type="number"
                    value={demandForm.targetPricePerQtl}
                    onChange={(e) => setDemandForm({ ...demandForm, targetPricePerQtl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Minimum Quality</label>
                  <select
                    value={demandForm.preferredMinGrade}
                    onChange={(e) => setDemandForm({ ...demandForm, preferredMinGrade: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  >
                    <option>Grade A+</option>
                    <option>Grade A</option>
                    <option>Grade B</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Destination Hub</label>
                  <input
                    type="text"
                    value={demandForm.destinationCity}
                    onChange={(e) => setDemandForm({ ...demandForm, destinationCity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required By Date</label>
                  <input
                    type="date"
                    value={demandForm.requiredByDate}
                    onChange={(e) => setDemandForm({ ...demandForm, requiredByDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow transition"
              >
                Broadcast Procurement RFQ
              </button>
            </form>
          </div>

          {/* Active Demands Column */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900">Live Procurement Demands</h4>
            <div className="space-y-3">
              {demands.map((d) => (
                <div key={d.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-900">{d.crop}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {d.status}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    <div>Need: <strong>{d.quantityQtl} Qtl</strong> @ Target <strong>₹{d.targetPricePerQtl}/Qtl</strong></div>
                    <div>Destination: {d.destinationCity}</div>
                    <div>By: {d.requiredByDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ESCROW ORDERS & DELIVERY TRACKING */}
      {buyerTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Active Escrow Deals & Real-Time Delivery Milestones
              </h3>
              <p className="text-xs text-slate-500">
                Funds are protected in bank escrow until delivery weighment and quality assay are verified at your dock.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord.orderId} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-slate-900">{ord.crop}</span>
                      <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Order #{ord.orderId}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {ord.escrowStatus}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Seller: <strong>{ord.farmerName}</strong> • Logistics: <strong>{ord.transporterName}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Total Escrow Value</div>
                    <div className="text-xl font-black text-emerald-700">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold">
                      {ord.quantityQtl} Qtl @ ₹{ord.pricePerQtl}/Qtl
                    </div>
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                    Milestone Progress Pipeline
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {ord.stages.map((stg, idx) => (
                      <div 
                        key={stg.key}
                        className={`p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                          stg.completed 
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                            : stg.current
                            ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300/40 text-amber-950 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold uppercase">Step {idx + 1}</span>
                            {stg.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : stg.current ? (
                              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300"></div>
                            )}
                          </div>
                          <div className="font-bold text-[11px] leading-tight">{stg.title}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2 font-medium">{stg.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUBMIT BID MODAL */}
      {selectedLotForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-base text-slate-900">
                Submit Offer on Lot #{selectedLotForBid.id}
              </h3>
              <button 
                onClick={() => setSelectedLotForBid(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1">
              <div className="font-bold text-slate-800">{selectedLotForBid.variety || selectedLotForBid.crop}</div>
              <div className="text-slate-500">Seller: {selectedLotForBid.farmerName} ({selectedLotForBid.fpoName})</div>
              <div className="text-slate-500">Reserve Price: ₹{selectedLotForBid.reservePricePerQtl}/Qtl • Available: {selectedLotForBid.quantityQtl} Qtl</div>
            </div>

            <form onSubmit={handleBidSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Offered Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={bidForm.bidPricePerQtl}
                  onChange={(e) => setBidForm({ ...bidForm, bidPricePerQtl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quantity to Purchase (Quintals)</label>
                <input
                  type="number"
                  value={bidForm.offeredQuantityQtl}
                  onChange={(e) => setBidForm({ ...bidForm, offeredQuantityQtl: e.target.value })}
                  max={selectedLotForBid.quantityQtl}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Pickup Date</label>
                <input
                  type="date"
                  value={bidForm.pickupDate}
                  onChange={(e) => setBidForm({ ...bidForm, pickupDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex justify-between items-center">
                <span className="font-semibold text-emerald-900">Total Purchase Value:</span>
                <span className="font-black text-sm text-emerald-800">
                  ₹{(Number(bidForm.bidPricePerQtl) * Number(bidForm.offeredQuantityQtl)).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLotForBid(null)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold shadow"
                >
                  Send Digital Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
