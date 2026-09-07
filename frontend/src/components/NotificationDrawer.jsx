import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  TrendingUp, 
  DollarSign, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const { language } = useApp();

  const [items, setItems] = useState([
    {
      id: 'n1',
      title: 'Institutional Bid Placed',
      message: 'BigBasket Fresh Procurements placed a bid of ₹2,400/qtl on your Red Onion lot.',
      time: '12 mins ago',
      type: 'bid',
      read: false
    },
    {
      id: 'n2',
      title: 'Cold Storage Confirmation',
      message: 'Chamber C-04 at Sahyadri Agri Logistics Hub booked for 120 Quintals.',
      time: '45 mins ago',
      type: 'storage',
      read: false
    },
    {
      id: 'n3',
      title: 'Mandi Price Advisory',
      message: 'Nashik Lasalgaon onion arrivals restricted due to rain. AI recommends HOLD for 5 days.',
      time: '2 hours ago',
      type: 'price',
      read: true
    },
    {
      id: 'n4',
      title: 'Logistics FASTag Update',
      message: 'Truck MH-15-EG-4421 crossed Ghoti Toll Plaza. Estimated arrival at Bhiwandi: 06:45 PM.',
      time: '3 hours ago',
      type: 'truck',
      read: true
    }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setItems(items.map(i => ({ ...i, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'bid':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'storage':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'price':
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      case 'truck':
        return <Truck className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-sm bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-800" />
            <h3 className="font-black text-slate-900 text-sm">
              {language === 'en' ? 'Platform Activity Notifications' : 'गतिविधि सूचनाएं'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">
            {items.filter(i => !i.read).length} unread updates
          </span>
          <button 
            onClick={markAllRead}
            className="text-emerald-700 font-bold hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {items.map(item => (
            <div 
              key={item.id} 
              className={`pt-3 first:pt-0 flex items-start gap-3 transition ${
                !item.read ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500">
            Real-time webhook linked to Agmarknet & e-NAM Webhooks
          </p>
        </div>
      </div>
    </div>
  );
};

