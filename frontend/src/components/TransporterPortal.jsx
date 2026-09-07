import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Upload, 
  FileText, 
  ArrowRight,
  Phone,
  Fuel
} from 'lucide-react';

export const TransporterPortal = () => {
  const { 
    language, 
    transporters, 
    updateDeliveryStatus 
  } = useApp();

  const [activeDriver, setActiveDriver] = useState(transporters[0]);
  const [podUploaded, setPodUploaded] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Transporter Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Kisan Logistics Network • Fastag & GPS Verified Fleet</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {language === 'en' ? 'Rural Agri Logistics & Dispatch' : 'कृषि परिवहन व वाहन चालक पोर्टल'}
            </h1>
            <p className="text-xs text-amber-100 mt-1 max-w-xl">
              Driver: <strong>{activeDriver.driverName}</strong> • Vehicle: <strong>{activeDriver.vehicleNumber}</strong> ({activeDriver.vehicleType})
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur px-4 py-2.5 rounded-xl border border-white/20 text-xs text-right">
            <div className="text-[10px] uppercase font-bold text-amber-300">Carrier Rating</div>
            <div className="text-base font-black text-white">★ {activeDriver.rating} / 5.0</div>
            <div className="text-[10px] text-amber-200">Tariff: ₹{activeDriver.ratePerKm}/km</div>
          </div>
        </div>
      </div>

      {/* Assigned Delivery Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">
            Active Farm-Gate Pickup & Delivery Dispatches
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Real-time GPS Tracking Linked
          </span>
        </div>

        {activeDriver.assignedTrips.map((trip) => (
          <div key={trip.orderId} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            
            {/* Trip Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-slate-900">{trip.crop}</span>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {trip.status}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• Order #{trip.orderId}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Payload: <strong>{trip.quantityQtl} Quintals</strong> • ETA: <strong>{trip.estimatedDelivery}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href="tel:+919823045678"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Farmer</span>
                </a>
              </div>
            </div>

            {/* Route & GPS Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    A
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-400">Pickup Origin</div>
                    <div className="font-bold text-slate-900">{trip.pickup}</div>
                    <div className="text-slate-500 text-[11px]">Farm Gate Weighbridge Verified</div>
                  </div>
                </div>

                <div className="ml-3 h-8 border-l-2 border-dashed border-slate-300"></div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    B
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-400">Destination Warehouse</div>
                    <div className="font-bold text-slate-900">{trip.destination}</div>
                    <div className="text-slate-500 text-[11px]">Retail Cold Receiving Dock</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Trip Progression:</span>
                    <span className="text-emerald-700 font-bold">{trip.progressPercent}% Completed</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-emerald-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${trip.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Map & GPS Route Preview Graphic */}
              <div className="bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden h-48 flex flex-col justify-between border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Navigation className="w-4 h-4 animate-spin" />
                    <span>Live GPS Transponder</span>
                  </span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                    Speed: 52 km/h
                  </span>
                </div>

                {/* Simulated Visual Route */}
                <div className="relative flex items-center justify-between px-6">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto"></div>
                    <span className="text-[10px] text-slate-300 mt-1 block">Nashik</span>
                  </div>
                  
                  <div className="flex-1 h-0.5 bg-slate-700 relative mx-2">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 bg-amber-400 p-1 rounded-full shadow-lg"
                      style={{ left: `${trip.progressPercent}%` }}
                    >
                      <Truck className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto"></div>
                    <span className="text-[10px] text-slate-300 mt-1 block">Mumbai Hub</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Current Sector: Kasara Ghat Bypass</span>
                  <span>Dist Remaining: 68 km</span>
                </div>
              </div>

            </div>

            {/* Transporter Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-500 font-medium">
                Update trip milestone to trigger automated notification to buyer and farmer.
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateDeliveryStatus(trip.orderId, 'PICKED_UP')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition"
                >
                  Mark Farm Picked Up
                </button>
                <button
                  onClick={() => updateDeliveryStatus(trip.orderId, 'IN_TRANSIT')}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-sm transition"
                >
                  Mark In Transit
                </button>
                <button
                  onClick={() => {
                    setPodUploaded(true);
                    updateDeliveryStatus(trip.orderId, 'DELIVERED');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Dock Delivery & Release Escrow</span>
                </button>
              </div>
            </div>

            {podUploaded && (
              <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Proof of Delivery (POD) signed by Receiving Manager. Payment unlocked to farmer via direct RTGS!</span>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
