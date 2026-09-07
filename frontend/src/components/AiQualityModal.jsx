import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Scan, 
  ShieldCheck, 
  TrendingUp, 
  Scale, 
  Droplet,
  ArrowRight
} from 'lucide-react';

export const AiQualityModal = ({ isOpen, onClose, onApplyToLot }) => {
  if (!isOpen) return null;

  const sampleImages = [
    {
      id: 'onion',
      label: 'Nashik Red Onion Lot',
      crop: 'Onion (Red)',
      url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
      results: {
        grade: 'Grade A',
        badgeColor: 'emerald',
        confidence: 96.4,
        metrics: {
          surfaceUniformity: '94.2%',
          defectRate: '1.8% (Acceptable)',
          moistureEstimate: '11.2% (Optimal)',
          bulbSizeDiameter: '55mm - 65mm (Export Quality)',
          rotOrSprouting: '0.0% Detected'
        },
        suggestedReservePrice: 2450,
        mandiAvgComparison: '+6.5% above APMC modal price',
        summary: 'Uniform skin tightness, deep red pigmentation, zero neck rot, ideal drying state for transit.'
      }
    },
    {
      id: 'tomato',
      label: 'Hybrid Table Tomato',
      crop: 'Tomato (Hybrid)',
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      results: {
        grade: 'Grade A',
        badgeColor: 'emerald',
        confidence: 93.8,
        metrics: {
          surfaceUniformity: '91.0%',
          defectRate: '3.1% (Supermarket Spec)',
          moistureEstimate: '88.5%',
          bulbSizeDiameter: '60mm - 70mm',
          rotOrSprouting: 'None'
        },
        suggestedReservePrice: 1920,
        mandiAvgComparison: '+4.0% above APMC modal price',
        summary: 'Excellent firm firmness index, consistent coloration, suitable for 48hr ambient supply chain.'
      }
    },
    {
      id: 'wheat',
      label: 'Sharbati Wheat Grains',
      crop: 'Wheat (Sharbati)',
      url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      results: {
        grade: 'Grade A+',
        badgeColor: 'amber',
        confidence: 98.2,
        metrics: {
          surfaceUniformity: '97.5%',
          defectRate: '0.4% foreign matter',
          moistureEstimate: '9.8% (Dry & Safe)',
          bulbSizeDiameter: 'Bold Lustrous Grain',
          rotOrSprouting: '0% Weevil Damage'
        },
        suggestedReservePrice: 3180,
        mandiAvgComparison: '+8.0% premium over MSP',
        summary: 'Exceptional golden sheen, flinty texture, high gluten protein potential. Premium milling standard.'
      }
    }
  ];

  const [selectedSample, setSelectedSample] = useState(sampleImages[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setAnalyzing(true);
    setAnalysisDone(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  const handleTriggerAnalysis = () => {
    setAnalyzing(true);
    setAnalysisDone(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Computer Vision Engine</span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white">
            Smart Produce Quality & Grading Assayer
          </h2>
          <p className="text-emerald-100 text-xs mt-1">
            Compliant with Agmarknet & FSSAI physical assay standards to give farmers objective bargaining proof.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Sample Switcher */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Sample Produce or Upload Lot Picture:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {sampleImages.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                    selectedSample.id === s.id
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <img 
                    src={s.url} 
                    alt={s.label} 
                    className="w-full h-16 object-cover rounded-lg"
                  />
                  <div className="text-xs font-bold text-slate-800 truncate">{s.crop}</div>
                  <div className="text-[10px] text-slate-500 truncate">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Image Inspection Area */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
            <img 
              src={selectedSample.url} 
              alt={selectedSample.label} 
              className={`w-full h-48 object-cover transition-all duration-300 ${
                analyzing ? 'filter blur-[1px] brightness-75' : ''
              }`}
            />
            
            {/* Scanline Animation */}
            {analyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mb-3"></div>
                <div className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  <Scan className="w-4 h-4 text-emerald-400 animate-pulse" />
                  Analyzing pixel pigmentation, grain contours & defect ratio...
                </div>
              </div>
            )}

            {!analyzing && (
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-700/60 flex items-center gap-1.5">
                <Scan className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Vision Scan Complete (Agmark AI Model v2.4)</span>
              </div>
            )}
          </div>

          {/* Result Card */}
          {analysisDone && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-600/20">
                    {selectedSample.results.grade.split(' ')[1]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">
                        {selectedSample.results.grade} Certification
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {selectedSample.results.confidence}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {selectedSample.results.summary}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase text-slate-400">
                    Fair Market Value
                  </div>
                  <div className="text-lg font-black text-emerald-700">
                    ₹{selectedSample.results.suggestedReservePrice.toLocaleString('en-IN')}
                    <span className="text-xs font-semibold text-slate-500"> / Qtl</span>
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-600">
                    {selectedSample.results.mandiAvgComparison}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Surface Defect
                  </div>
                  <div className="font-bold text-slate-800 mt-1">
                    {selectedSample.results.metrics.defectRate}
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-blue-500" /> Moisture
                  </div>
                  <div className="font-bold text-slate-800 mt-1">
                    {selectedSample.results.metrics.moistureEstimate}
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-500" /> Uniformity
                  </div>
                  <div className="font-bold text-slate-800 mt-1">
                    {selectedSample.results.metrics.surfaceUniformity}
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-purple-500" /> Size Index
                  </div>
                  <div className="font-bold text-slate-800 mt-1 truncate">
                    {selectedSample.results.metrics.bulbSizeDiameter}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleTriggerAnalysis}
              disabled={analyzing}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 rounded-xl transition"
            >
              Re-Scan Image
            </button>
            <button
              onClick={() => {
                if (onApplyToLot) {
                  onApplyToLot({
                    crop: selectedSample.crop,
                    grade: selectedSample.results.grade,
                    moisturePercent: parseFloat(selectedSample.results.metrics.moistureEstimate),
                    reservePricePerQtl: selectedSample.results.suggestedReservePrice,
                    imageUrl: selectedSample.url
                  });
                }
                onClose();
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/25 flex items-center gap-2 transition"
            >
              <span>Apply AI Grade & List Lot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
