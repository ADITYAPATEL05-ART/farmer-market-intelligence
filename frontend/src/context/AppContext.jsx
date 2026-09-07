import React, { createContext, useContext, useState } from 'react';
import {
  CROPS_CATALOG,
  MANDI_PRICES,
  INITIAL_PRODUCE_LOTS,
  BUYER_DEMANDS,
  COLD_STORAGE_FACILITIES,
  TRANSPORTERS,
  ESCROW_ORDERS,
  GRIEVANCES,
  PLATFORM_IMPACT_METRICS
} from '../data/mandiData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  
  // Current user persona: 'overview' | 'farmer' | 'buyer' | 'transporter' | 'admin'
  const [currentRole, setCurrentRoleState] = useState(() => {
    try {
      return localStorage.getItem('kisan_user_role') || 'overview';
    } catch {
      return 'overview';
    }
  });

  const setCurrentRole = (role) => {
    setCurrentRoleState(role);
    try {
      if (role && role !== 'overview') {
        localStorage.setItem('kisan_user_role', role);
      } else {
        localStorage.removeItem('kisan_user_role');
      }
    } catch {}
  };

  const logout = () => {
    setCurrentRole('overview');
  };
  
  // Language: 'en' | 'hi'
  const [language, setLanguage] = useState('en');

  // Active Produce Lots
  const [lots, setLots] = useState(INITIAL_PRODUCE_LOTS);

  // Buyer Demands
  const [demands, setDemands] = useState(BUYER_DEMANDS);

  // Cold Storages & Bookings
  const [storages, setStorages] = useState(COLD_STORAGE_FACILITIES);
  const [storageBookings, setStorageBookings] = useState([]);

  // Transporters & Trips
  const [transporterList, setTransporterList] = useState(TRANSPORTERS);

  // Escrow Orders
  const [orders, setOrders] = useState(ESCROW_ORDERS);

  // Grievances
  const [grievanceList, setGrievanceList] = useState(GRIEVANCES);

  // KYC Verification Requests for Admin
  const [kycRequests, setKycRequests] = useState([
    {
      id: 'KYC-801',
      name: 'Godavari FPO Cooperative',
      type: 'FPO',
      state: 'Andhra Pradesh',
      documents: ['Aadhaar of Director', 'FPO Registration Cert', 'Land Record Aggregation'],
      status: 'PENDING',
      appliedOn: '05 Sep 2026'
    },
    {
      id: 'KYC-802',
      name: 'Farm2Fork Retail Pvt Ltd',
      type: 'Corporate Buyer',
      state: 'Karnataka',
      documents: ['GSTIN Certificate', 'FSSAI Central License', 'Bank Solvency Letter'],
      status: 'PENDING',
      appliedOn: '04 Sep 2026'
    }
  ]);

  // Notifications / Toast
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Farmer creates a new produce lot
  const createProduceLot = (lotData) => {
    const newLot = {
      ...lotData,
      id: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      status: 'ACTIVE',
      offers: [],
      distanceKm: Math.floor(8 + Math.random() * 25),
      verifiedFPO: true
    };
    setLots(prev => [newLot, ...prev]);
    showNotification(
      language === 'en' 
        ? `Produce lot #${newLot.id} listed successfully on the marketplace!` 
        : `उत्पाद लॉट #${newLot.id} सफलतापूर्वक बाज़ार में सूचीबद्ध किया गया!`,
      'success'
    );
    return newLot;
  };

  // Buyer submits a digital offer on a farmer lot
  const submitBuyerOffer = (lotId, offerData) => {
    const newOffer = {
      id: `OFFER-${Math.floor(500 + Math.random() * 499)}`,
      buyerId: 'BUY-ME',
      buyerName: offerData.buyerName || 'Reliance Retail Agri Procurement',
      buyerType: 'Verified Corporate Buyer',
      bidPricePerQtl: Number(offerData.bidPricePerQtl),
      offeredQuantityQtl: Number(offerData.offeredQuantityQtl),
      totalAmount: Number(offerData.bidPricePerQtl) * Number(offerData.offeredQuantityQtl),
      paymentTerms: '100% Escrow via Unified Payments',
      pickupDate: offerData.pickupDate || '2026-09-15',
      status: 'PENDING',
      submittedAt: 'Just now'
    };

    setLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        return {
          ...lot,
          offers: [newOffer, ...lot.offers]
        };
      }
      return lot;
    }));

    showNotification(
      language === 'en'
        ? `Offer of ₹${newOffer.bidPricePerQtl}/Qtl submitted for Lot #${lotId}!`
        : `लॉट #${lotId} के लिए ₹${newOffer.bidPricePerQtl}/क्विंटल का प्रस्ताव भेजा गया!`,
      'success'
    );
  };

  // Farmer accepts an offer -> Automatically creates an Escrow Order and creates transport dispatch
  const acceptOffer = (lotId, offerId) => {
    let acceptedOffer = null;
    let targetLot = null;

    setLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        targetLot = lot;
        const updatedOffers = lot.offers.map(off => {
          if (off.id === offerId) {
            acceptedOffer = off;
            return { ...off, status: 'ACCEPTED' };
          }
          return off;
        });
        return {
          ...lot,
          status: 'SOLD',
          offers: updatedOffers
        };
      }
      return lot;
    }));

    if (acceptedOffer && targetLot) {
      // Create Escrow Order
      const newOrder = {
        orderId: `ORD-${Math.floor(700 + Math.random() * 299)}`,
        lotId: targetLot.id,
        crop: targetLot.crop,
        quantityQtl: acceptedOffer.offeredQuantityQtl,
        pricePerQtl: acceptedOffer.bidPricePerQtl,
        totalAmount: acceptedOffer.totalAmount,
        farmerName: targetLot.farmerName,
        buyerName: acceptedOffer.buyerName,
        transporterName: 'Kisan Express Fleet (Assigned)',
        currentStage: 'ESCROW_FUNDED',
        stages: [
          { key: 'AGREEMENT', title: 'Offer Accepted & Agreement Locked', date: 'Just now', completed: true },
          { key: 'ESCROW_FUNDED', title: `₹${acceptedOffer.totalAmount.toLocaleString('en-IN')} Escrow Deposited`, date: 'Just now', completed: true },
          { key: 'FARM_PICKUP', title: 'Farm-Gate Quality Check & Pickup', date: 'Scheduled for Tomorrow', completed: false, current: true },
          { key: 'IN_TRANSIT', title: 'En Route to Buyer Fulfillment Hub', date: 'Pending Pickup', completed: false },
          { key: 'DELIVERY_VERIFIED', title: 'Dock Inspection & Weight Check', date: 'Pending Arrival', completed: false },
          { key: 'PAYMENT_RELEASED', title: 'Instant Fund Release to Farmer', date: 'Auto upon Delivery', completed: false }
        ],
        escrowStatus: 'SECURED_IN_ESCROW',
        disputeStatus: 'NONE'
      };

      setOrders(prev => [newOrder, ...prev]);

      // Assign to Transporter
      setTransporterList(prev => prev.map((tr, idx) => {
        if (idx === 0) {
          return {
            ...tr,
            assignedTrips: [
              {
                orderId: newOrder.orderId,
                crop: newOrder.crop,
                quantityQtl: newOrder.quantityQtl,
                pickup: `${targetLot.location} (${targetLot.farmerName})`,
                destination: `${acceptedOffer.buyerName} Hub`,
                status: 'ASSIGNED',
                gpsLat: 19.99,
                gpsLng: 73.78,
                progressPercent: 10,
                estimatedDelivery: 'Tomorrow, 06:00 PM'
              },
              ...tr.assignedTrips
            ]
          };
        }
        return tr;
      }));

      showNotification(
        language === 'en'
          ? `Deal confirmed! ₹${acceptedOffer.totalAmount.toLocaleString('en-IN')} locked in Escrow. Transporter dispatched!`
          : `सौदा पक्का! ₹${acceptedOffer.totalAmount.toLocaleString('en-IN')} एस्क्रो में सुरक्षित। ट्रांसपोर्टर रवाना किया गया!`,
        'success'
      );
    }
  };

  // Farmer sends a counter-offer
  const counterOffer = (lotId, offerId, counterPrice) => {
    setLots(prev => prev.map(lot => {
      if (lot.id === lotId) {
        const updatedOffers = lot.offers.map(off => {
          if (off.id === offerId) {
            return {
              ...off,
              status: 'COUNTERED',
              counterPricePerQtl: Number(counterPrice),
              statusNote: `Counter offer sent at ₹${counterPrice}/Qtl`
            };
          }
          return off;
        });
        return {
          ...lot,
          status: 'NEGOTIATING',
          offers: updatedOffers
        };
      }
      return lot;
    }));

    showNotification(
      language === 'en'
        ? `Counter offer of ₹${counterPrice}/Qtl sent to buyer!`
        : `खरीदार को ₹${counterPrice}/क्विंटल का जवाबी प्रस्ताव भेजा गया!`,
      'info'
    );
  };

  // Buyer creates bulk demand
  const createBuyerDemand = (demandData) => {
    const newDemand = {
      ...demandData,
      id: `DEM-${Math.floor(300 + Math.random() * 699)}`,
      verified: true,
      status: 'OPEN',
      applicationsCount: 0
    };
    setDemands(prev => [newDemand, ...prev]);
    showNotification(
      language === 'en'
        ? `Demand requirement for ${newDemand.quantityQtl} Qtl ${newDemand.crop} broadcast to nearby FPOs!`
        : `${newDemand.quantityQtl} क्विंटल ${newDemand.crop} की मांग आस-पास के FPO को भेजी गई!`,
      'success'
    );
  };

  // Cold Storage booking
  const bookColdStorage = (storageId, quantityQtl, days) => {
    const target = storages.find(s => s.id === storageId);
    if (!target) return;

    const totalCost = Math.round(Number(quantityQtl) * target.dailyRatePerQtl * Number(days));
    const booking = {
      bookingId: `CSB-${Math.floor(1000 + Math.random() * 9000)}`,
      storageName: target.name,
      location: target.location,
      quantityQtl: Number(quantityQtl),
      days: Number(days),
      totalCost,
      bookedOn: new Date().toLocaleDateString('en-GB'),
      status: 'CONFIRMED'
    };

    setStorageBookings(prev => [booking, ...prev]);
    // Reduce capacity
    setStorages(prev => prev.map(s => {
      if (s.id === storageId) {
        return {
          ...s,
          availableCapacityMT: Math.max(0, s.availableCapacityMT - Math.round(quantityQtl / 10))
        };
      }
      return s;
    }));

    showNotification(
      language === 'en'
        ? `Cold Storage space booked at ${target.name}! Total Est: ₹${totalCost.toLocaleString('en-IN')}`
        : `${target.name} में कोल्ड स्टोरेज बुक हो गया! अनुमानित राशि: ₹${totalCost.toLocaleString('en-IN')}`,
      'success'
    );
  };

  // Transporter updates status
  const updateDeliveryStatus = (orderId, newStatus) => {
    // update in transporter
    setTransporterList(prev => prev.map(tr => ({
      ...tr,
      assignedTrips: tr.assignedTrips.map(trip => {
        if (trip.orderId === orderId) {
          let progress = trip.progressPercent;
          if (newStatus === 'PICKED_UP') progress = 35;
          if (newStatus === 'IN_TRANSIT') progress = 70;
          if (newStatus === 'DELIVERED') progress = 100;
          return { ...trip, status: newStatus, progressPercent: progress };
        }
        return trip;
      })
    })));

    // update in escrow orders
    setOrders(prev => prev.map(ord => {
      if (ord.orderId === orderId) {
        const updatedStages = ord.stages.map(stg => {
          if (newStatus === 'PICKED_UP' && stg.key === 'FARM_PICKUP') {
            return { ...stg, completed: true, current: false };
          }
          if (newStatus === 'IN_TRANSIT' && stg.key === 'IN_TRANSIT') {
            return { ...stg, completed: false, current: true };
          }
          if (newStatus === 'DELIVERED') {
            if (stg.key === 'IN_TRANSIT' || stg.key === 'DELIVERY_VERIFIED' || stg.key === 'PAYMENT_RELEASED') {
              return { ...stg, completed: true, current: false };
            }
          }
          return stg;
        });

        return {
          ...ord,
          currentStage: newStatus === 'DELIVERED' ? 'DELIVERY_VERIFIED' : newStatus,
          stages: updatedStages,
          escrowStatus: newStatus === 'DELIVERED' ? 'RELEASED_TO_FARMER' : ord.escrowStatus
        };
      }
      return ord;
    }));

    showNotification(
      language === 'en'
        ? `Trip for Order #${orderId} updated to: ${newStatus.replace('_', ' ')}`
        : `ऑर्डर #${orderId} की स्थिति अपडेट की गई: ${newStatus}`,
      'info'
    );
  };

  // Grievance filing
  const fileGrievance = (grievanceData) => {
    const newGrievance = {
      ticketId: `GRV-${Math.floor(900 + Math.random() * 99)}`,
      crop: grievanceData.crop,
      farmerName: grievanceData.farmerName || 'Ramesh Balasaheb Patil',
      buyerName: grievanceData.buyerName || 'Buyer Enterprise',
      issueType: grievanceData.issueType,
      description: grievanceData.description,
      filedDate: 'Today',
      status: 'IN_MEDIATION',
      resolutionNote: 'Submitted to APMC Mandi grievance officer for review.'
    };
    setGrievanceList(prev => [newGrievance, ...prev]);
    showNotification(
      language === 'en'
        ? `Grievance ticket #${newGrievance.ticketId} created and sent to Mandi Arbitrator!`
        : `शिकायत टिकट #${newGrievance.ticketId} दर्ज की गई और मंडी अधिकारी को भेजी गई!`,
      'info'
    );
  };

  // Admin resolves grievance
  const resolveGrievance = (ticketId, note) => {
    setGrievanceList(prev => prev.map(g => {
      if (g.ticketId === ticketId) {
        return {
          ...g,
          status: 'RESOLVED',
          resolutionNote: note || 'Dispute amicably resolved by APMC Mandi Officer; settlement terms enforced.'
        };
      }
      return g;
    }));
    showNotification(`Ticket #${ticketId} marked as RESOLVED!`, 'success');
  };

  // Admin approves KYC
  const approveKyc = (kycId) => {
    setKycRequests(prev => prev.map(k => {
      if (k.id === kycId) {
        return { ...k, status: 'VERIFIED' };
      }
      return k;
    }));
    showNotification(`KYC credentials for ${kycId} approved and verified!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        logout,
        language,
        setLanguage,
        crops: CROPS_CATALOG,
        mandiPrices: MANDI_PRICES,
        lots,
        createProduceLot,
        submitBuyerOffer,
        acceptOffer,
        counterOffer,
        demands,
        createBuyerDemand,
        storages,
        storageBookings,
        bookColdStorage,
        transporters: transporterList,
        updateDeliveryStatus,
        orders,
        grievances: grievanceList,
        fileGrievance,
        resolveGrievance,
        kycRequests,
        approveKyc,
        metrics: PLATFORM_IMPACT_METRICS,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
