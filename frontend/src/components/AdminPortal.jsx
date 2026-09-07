import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  FileText, 
  Building, 
  Award,
  Download,
  Check
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    metrics, 
    kycRequests, 
    approveKyc, 
    grievances, 
    resolveGrievance, 
    mandiPrices,
    language 
  } = useApp();

  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'kyc' | 'grievances'
  const [resolutionText, setResolutionText] = useState({});

  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>APMC Mandi Board & State Agri Marketing Directorate</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {language === 'en' ? 'Mandi Regulatory & Market Oversight Desk' : 'मंडी विनियामक व सरकारी नियंत्रण केंद्र'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Real-time monitoring of crop arrivals, trade settlement transparency, KYC vetting of buyers and FPOs, and legal dispute redressal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold px-3 py-1.5 rounded-xl">
              Govt Portal Live
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/60 overflow-x-auto text-xs">
          <button
            onClick={() => setAdminTab('overview')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              adminTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'en' ? 'Macro Impact Analytics' : 'प्रभाव व विश्लेषण'}</span>
          </button>
          <button
            onClick={() => setAdminTab('kyc')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              adminTab === 'kyc'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'en' ? 'KYC Verification Desk' : 'केवाईसी सत्यापन'} ({kycRequests.filter(k => k.status === 'PENDING').length} Pending)</span>
          </button>
          <button
            onClick={() => setAdminTab('grievances')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              adminTab === 'grievances'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{language === 'en' ? 'Disputes & Grievance Arbitration' : 'विवाद निवारण'} ({grievances.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MACRO IMPACT ANALYTICS */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards (Matching Slide 2 & 5 Metrics!) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Farmer Price Realization
              </div>
              <div className="text-3xl font-black text-emerald-600 mt-1">
                {metrics.farmerPriceRealizationIncrease}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Uplift over traditional mandi middleman auction
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Middleman Margin Cut
              </div>
              <div className="text-3xl font-black text-blue-600 mt-1">
                {metrics.middlemanMarginCut}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Direct farm-to-buyer disintermediation saving
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Post-Harvest Loss
              </div>
              <div className="text-3xl font-black text-purple-600 mt-1">
                {metrics.postHarvestLossReduction}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Through smart sale-window & cold chain integration
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Digital Trade Volume
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {metrics.totalTradeVolumeINR}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Directly settled via Tri-Party Escrow
              </div>
            </div>
          </div>

          {/* Regional APMC Live Settlement Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  State-Wise APMC Market Arrivals & Modal Rates
                </h3>
                <p className="text-xs text-slate-500">
                  Integrated with National Agriculture Market (e-NAM) and Directorate of Marketing & Inspection (DMI)
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Commodity</th>
                    <th className="py-3 px-4">Primary APMC</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4">Arrivals (MT)</th>
                    <th className="py-3 px-4">Modal Price (₹/Qtl)</th>
                    <th className="py-3 px-4">AI Recommended Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mandiPrices.map((m) => (
                    <tr key={m.cropId} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-extrabold text-slate-900">{m.cropName}</td>
                      <td className="py-3 px-4 text-slate-700">{m.mandi}</td>
                      <td className="py-3 px-4 text-slate-600">{m.state}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{m.arrivalsMT} MT</td>
                      <td className="py-3 px-4 font-black text-emerald-700">₹{m.modalPrice.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.saleWindow.recommendation === 'HOLD' 
                            ? 'bg-amber-100 text-amber-900' 
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {m.saleWindow.recommendation} ({m.saleWindow.confidence}%)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: KYC VERIFICATION DESK */}
      {adminTab === 'kyc' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">
              Pending FPO & Institutional Buyer Credentials
            </h3>
            <span className="text-xs text-slate-500">
              Only verified entities receive access to digital bidding and bulk dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kycRequests.map((k) => (
              <div key={k.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                      {k.type}
                    </span>
                    <h4 className="font-extrabold text-base text-slate-900 mt-1">{k.name}</h4>
                    <div className="text-slate-500 text-[11px]">State: {k.state} • Applied: {k.appliedOn}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    k.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {k.status}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Attached Regulatory Documents</div>
                  <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                    {k.documents.map((doc, idx) => (
                      <li key={idx} className="font-medium">{doc}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  {k.status === 'VERIFIED' ? (
                    <div className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified & Certified</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => approveKyc(k.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Approve & Grant Digital Badge</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISPUTES & GRIEVANCE ARBITRATION */}
      {adminTab === 'grievances' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">
              APMC Dispute Arbitration & Mediation Register
            </h3>
            <span className="text-xs text-slate-500">
              Legally binding dispute settlement under the State APMC Electronic Trading Rules
            </span>
          </div>

          <div className="space-y-4">
            {grievances.map((g) => (
              <div key={g.ticketId} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{g.issueType}</span>
                      <span className="text-slate-400">• Ticket #{g.ticketId}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        g.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {g.status}
                      </span>
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      Farmer: <strong>{g.farmerName}</strong> vs Buyer: <strong>{g.buyerName}</strong> • Crop: {g.crop}
                    </div>
                  </div>

                  <div className="text-slate-400 text-[11px]">
                    Filed Date: {g.filedDate}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Statement of Claim:</span>
                  <p className="text-slate-700 mt-1 font-medium leading-relaxed">{g.description}</p>
                </div>

                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-indigo-900">Arbitration Order / Resolution:</div>
                  <p className="text-indigo-950 font-semibold">{g.resolutionNote}</p>

                  {g.status !== 'RESOLVED' && (
                    <div className="pt-2 flex items-center gap-2">
                      <input 
                        type="text"
                        placeholder="Enter arbitrated settlement terms..."
                        value={resolutionText[g.ticketId] || ''}
                        onChange={(e) => setResolutionText({ ...resolutionText, [g.ticketId]: e.target.value })}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                      />
                      <button
                        onClick={() => resolveGrievance(g.ticketId, resolutionText[g.ticketId])}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition"
                      >
                        Enforce Award
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
