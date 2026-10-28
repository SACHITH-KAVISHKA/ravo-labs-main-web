import React, { useState } from 'react';
import {
  Fuel,
  Gauge,
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Truck,
  RotateCcw
} from 'lucide-react';
import { PRODUCT_DETAILS } from '../../data/products';
import { FuelDashboardMockup } from '../dashboards/FuelDashboardMockup';
import { calculateTankPercentage } from '../../utils/fuel';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface FuelFeatureSectionProps {
  onOpenDemo: () => void;
}

export const FuelFeatureSection: React.FC<FuelFeatureSectionProps> = ({ onOpenDemo }) => {
  const fuelDetails = PRODUCT_DETAILS.fuel;
  const [tankAdjustment, setTankAdjustment] = useState<number>(0);
  const { elementRef, isRevealed } = useScrollReveal();

  const interactiveTanks = [
    { name: 'Underground Tank 01 · 92 Octane', capacity: 20000, baseCurrent: 14200, color: '#0284C7' },
    { name: 'Underground Tank 02 · 95 Euro 4', capacity: 15000, baseCurrent: 11800, color: '#2563EB' },
    { name: 'Underground Tank 03 · Auto Diesel', capacity: 25000, baseCurrent: 19100, color: '#0D9488' }
  ];

  return (
    <section
      id="product-fuel"
      ref={elementRef}
      className={`py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#07131F] text-[#0F172A] dark:text-[#F8FAFC] border-b border-[#E4E9E1] dark:border-[#133252] scroll-mt-12 relative overflow-hidden transition-colors duration-200 reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#0284C7]/5 dark:bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2563EB]/5 dark:bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#081F33] border border-[#BFDBFE] dark:border-[#0284C7]/40 mb-3">
            <Fuel className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
            <span>Ravo Fuel · Station Operations & Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Precision accounting for every litre, dispenser, and shift.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {fuelDetails.summary}
          </p>
        </div>

        {/* Interactive Station Tank Simulator Card */}
        <div className="bg-[#F8FAFC] dark:bg-[#0C1E30] border border-[#E2E8F0] dark:border-[#133252] rounded-2xl p-6 lg:p-8 mb-16 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E2E8F0] dark:border-[#133252]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
                Interactive Tank Telemetry & Capacity Simulator
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                Simulate Tank Level Inflows and Sales Consumption
              </h3>
            </div>

            {/* Quick interactive adjustment buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTankAdjustment((prev) => Math.max(prev - 1500, -5000))}
                className="px-3.5 py-2 bg-white dark:bg-[#132338] hover:bg-slate-50 dark:hover:bg-[#1a2e47] active:scale-95 text-[#0F172A] dark:text-[#F8FAFC] border border-[#CBD5E1] dark:border-[#1E3A5F] rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                -1,500L (Shift Sales)
              </button>
              <button
                type="button"
                onClick={() => setTankAdjustment((prev) => Math.min(prev + 4000, 5000))}
                className="px-3.5 py-2 bg-[#EFF6FF] dark:bg-[#081F33] hover:bg-[#DBEAFE] dark:hover:bg-[#0c2e4d] active:scale-95 text-[#0284C7] dark:text-[#38BDF8] border border-[#BFDBFE] dark:border-[#0284C7]/40 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                +4,000L (Bowser Inflow)
              </button>
              {tankAdjustment !== 0 && (
                <button
                  type="button"
                  onClick={() => setTankAdjustment(0)}
                  className="p-2 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] active:scale-90 transition-all duration-150 cursor-pointer"
                  title="Reset simulator"
                  aria-label="Reset tank simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Visual Tanks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {interactiveTanks.map((tank, idx) => {
              const currentVol = Math.min(tank.capacity, Math.max(1000, tank.baseCurrent + tankAdjustment));
              const pct = calculateTankPercentage(currentVol, tank.capacity);
              const isLow = pct < 25;

              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-[#07131F] border border-[#E2E8F0] dark:border-[#133252] hover:border-[#0284C7]/50 dark:hover:border-[#0284C7] hover:-translate-y-0.5 rounded-xl p-4 space-y-3 transition-all duration-200 shadow-xs stagger-${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#0F172A] dark:text-[#F8FAFC] truncate">{tank.name}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors duration-200 ${
                        isLow ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-[#EFF6FF] dark:bg-[#081F33] text-[#0284C7] dark:text-[#38BDF8] border border-[#BFDBFE] dark:border-[#0284C7]/40'
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tabular-nums">
                      {currentVol.toLocaleString()} L
                    </span>
                    <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                      / {tank.capacity.toLocaleString()} L Max
                    </span>
                  </div>

                  {/* Tank Level Gauge */}
                  <div className="w-full h-3 bg-[#F1F5F9] dark:bg-[#132338] rounded-full overflow-hidden p-0.5 border border-[#E2E8F0] dark:border-[#1E3A5F]">
                    <div
                      className="h-full rounded-full transition-[width] duration-300 ease-out"
                      style={{ width: `${pct}%`, backgroundColor: tank.color }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#94A3B8] pt-1">
                    <span>Ullage (Remaining Space):</span>
                    <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC] font-bold">{(tank.capacity - currentVol).toLocaleString()} L</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Grid & Dashboard Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Key Fuel Modules List (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
              Designed for the real challenges of fuel station retail
            </h3>

            <div className="space-y-4">
              {fuelDetails.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-[#0C1E30] transition-colors border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#133252]">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#081F33] text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5 border border-[#BFDBFE] dark:border-[#0284C7]/40">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{feat.title}</h4>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0284C7] hover:bg-[#0369a1] transition-all shadow-md active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                <span>Discuss Fuel Station Management</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Realistic Fuel Operations Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <FuelDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
