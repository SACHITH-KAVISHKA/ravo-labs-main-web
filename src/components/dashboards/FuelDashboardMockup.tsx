import React, { useState } from 'react';
import {
  Fuel,
  Gauge,
  Droplets,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Sliders,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { calculateTankPercentage } from '../../utils/fuel';

export const FuelDashboardMockup: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState('Station 03 · Harbor Bypass');
  const [isReconciled, setIsReconciled] = useState(true);

  const tanks = [
    { id: 't1', name: 'Tank 01', type: '92 Octane Petrol', capacity: 20000, current: 15400, color: '#0284C7' },
    { id: 't2', name: 'Tank 02', type: '95 Euro 4 Petrol', capacity: 15000, current: 12100, color: '#2563EB' },
    { id: 't3', name: 'Tank 03', type: 'Auto Diesel', capacity: 25000, current: 18750, color: '#0D9488' },
    { id: 't4', name: 'Tank 04', type: 'Super Diesel', capacity: 12000, current: 8900, color: '#3B82F6' }
  ];

  const pumpReadings = [
    { pump: 'Dispenser 1 - Island A', fuel: '92 Octane', opening: 42180.5, closing: 43620.0, liters: 1439.5, attendant: 'Nalinda K.' },
    { pump: 'Dispenser 1 - Island B', fuel: 'Auto Diesel', opening: 88410.0, closing: 90240.2, liters: 1830.2, attendant: 'Rohan P.' },
    { pump: 'Dispenser 2 - Island A', fuel: '95 Euro 4', opening: 19850.1, closing: 20740.0, liters: 889.9, attendant: 'K. Seneviratne' }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#0C1E30] text-[#0F1E2E] dark:text-[#F8FAFC] rounded-2xl border border-[#E2E8F0] dark:border-[#133252] shadow-2xl overflow-hidden font-sans text-xs transition-colors duration-200">
      {/* Top Console Bar */}
      <div className="bg-[#F0F7FF] dark:bg-[#07131F] border-b border-[#E2E8F0] dark:border-[#133252] px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-300 dark:bg-blue-800 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-sky-500 inline-block" />
          </div>
          <div className="h-4 w-px bg-[#CBD5E1] dark:bg-[#133252] mx-1 shrink-0" />
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F1E2E] dark:text-[#F8FAFC] truncate">
            <Fuel className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
            <span className="truncate">Ravo Fuel · Operations Console</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-white dark:bg-[#0B1A2B] border border-[#CBD5E1] dark:border-[#1E3A5F] text-[#0F1E2E] dark:text-[#F8FAFC] rounded px-2 py-1 text-[10px] focus:outline-none focus:border-[#0284C7] max-w-[160px] truncate"
          >
            <option>Station 03 · Harbor Bypass</option>
            <option>Station 07 · Metro Center</option>
            <option>Station 12 · Expressway Terminal</option>
          </select>
          <span className="text-[10px] text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#0284C7]/20 border border-[#BAE6FD] dark:border-[#0284C7]/40 px-2 py-0.5 rounded font-mono font-semibold shrink-0">
            Shift 02 Live
          </span>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 space-y-3.5">
        {/* Tank Level Telemetry Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wide text-[#0F1E2E] dark:text-[#F8FAFC] flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
              Underground Storage Tanks (UST) Telemetry
            </span>
            <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] font-mono">Dip Reading Calibrated</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {tanks.map((tank) => {
              const pct = calculateTankPercentage(tank.current, tank.capacity);
              return (
                <div
                  key={tank.id}
                  className="bg-[#F8FAFC] dark:bg-[#081726] border border-[#E2E8F0] dark:border-[#133252] rounded-xl p-2.5 relative overflow-hidden group hover:border-[#0284C7]/50 dark:hover:border-[#38BDF8]/50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-semibold text-[#0F1E2E] dark:text-[#F8FAFC]">{tank.name}</span>
                    <span className="font-mono text-[10px] font-bold text-[#0284C7] dark:text-[#38BDF8]">{pct}%</span>
                  </div>
                  <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block truncate">{tank.type}</span>
                  <div className="mt-2 flex items-baseline justify-between font-mono">
                    <span className="text-sm font-bold text-[#0F1E2E] dark:text-[#F8FAFC] tabular-nums">
                      {tank.current.toLocaleString()}L
                    </span>
                    <span className="text-[9px] text-[#64748B] dark:text-[#94A3B8]">/ {tank.capacity.toLocaleString()}L</span>
                  </div>
                  {/* Visual Fluid Progress Bar */}
                  <div className="w-full h-1.5 bg-[#E2E8F0] dark:bg-[#1E293B] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: tank.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shift Settlement & Reconciliation Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <div className="bg-[#F8FAFC] dark:bg-[#081726] border border-[#E2E8F0] dark:border-[#133252] rounded-xl p-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#94A3B8] tracking-wider block">
                Shift Dispensed Volume
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-mono text-[#0F1E2E] dark:text-[#F8FAFC] tabular-nums">6,420.2</span>
                <span className="text-xs text-[#0284C7] dark:text-[#38BDF8] font-semibold">Litres Total</span>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] dark:border-[#133252] flex items-center justify-between text-[10px] text-[#64748B] dark:text-[#94A3B8]">
              <span>4 Nozzles Active</span>
              <span className="text-[#059669] dark:text-[#34D399] font-medium">100% Online</span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] dark:bg-[#081726] border border-[#E2E8F0] dark:border-[#133252] rounded-xl p-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#94A3B8] tracking-wider block">
                Shift Revenue Reconciled
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-mono text-[#0F1E2E] dark:text-[#F8FAFC] tabular-nums">$18,450.00</span>
                <span className="text-xs text-[#059669] dark:text-[#34D399] font-semibold">Verified</span>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] dark:border-[#133252] flex items-center justify-between text-[10px] text-[#64748B] dark:text-[#94A3B8]">
              <span>Cash: $11,200.00</span>
              <span>Cards: $7,250.00</span>
            </div>
          </div>

          <div className="bg-[#F0F7FF] dark:bg-[#0B1E33] border border-[#BAE6FD] dark:border-[#0284C7]/40 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0284C7]/10 dark:bg-[#0284C7]/20 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-[#0284C7] dark:text-[#38BDF8] tracking-wider">
                  Reconciliation Status
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isReconciled ? 'bg-[#059669] dark:bg-[#34D399]' : 'bg-[#0284C7] animate-pulse'
                  }`}
                />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-[#0F1E2E] dark:text-[#F8FAFC]">
                {isReconciled ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#059669] dark:text-[#34D399]" />
                    <span>Zero Discrepancy (Locked)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                    <span>Shift Active · Open for Audit</span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                {isReconciled
                  ? 'Physical meter delta matches register sales within 0.02%'
                  : 'Awaiting attendant final cash drawer count & dip audit'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsReconciled(!isReconciled)}
              className="mt-3 w-full py-1.5 bg-[#0284C7] hover:bg-[#0369a1] text-white rounded-lg text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 shadow-xs active:scale-[0.99] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0284C7]"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>{isReconciled ? 'Shift Reconciled · Click to Reopen' : 'Simulate Shift Lock & Sign-off'}</span>
            </button>
          </div>
        </div>

        {/* Pump Meter Reading Table */}
        <div className="border border-[#E2E8F0] dark:border-[#133252] rounded-xl overflow-hidden bg-white dark:bg-[#0C1E30]">
          <div className="px-3 py-2 bg-[#F0F7FF] dark:bg-[#07131F] border-b border-[#E2E8F0] dark:border-[#133252] flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#0F1E2E] dark:text-[#F8FAFC]">Pump Dispenser Meter Shift Logs</span>
            <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] font-mono">Shift 02 · Closes 14:00</span>
          </div>

          <div className="divide-y divide-[#E2E8F0] dark:divide-[#133252]">
            {pumpReadings.map((reading, idx) => (
              <div key={idx} className="px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#EFF6FF] dark:bg-[#0284C7]/20 border border-[#BAE6FD] dark:border-[#0284C7]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#0284C7] dark:text-[#38BDF8]">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-[#0F1E2E] dark:text-[#F8FAFC]">{reading.pump}</span>
                    <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] ml-1.5">({reading.fuel})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono justify-between sm:justify-end">
                  <div className="text-[#64748B] dark:text-[#94A3B8]">
                    <span>Open: {reading.opening.toFixed(1)}</span>
                    <span className="mx-1">→</span>
                    <span>Close: {reading.closing.toFixed(1)}</span>
                  </div>
                  <span className="font-bold text-[#0284C7] dark:text-[#38BDF8] tabular-nums">
                    +{reading.liters.toFixed(1)} L
                  </span>
                  <span className="text-[#64748B] dark:text-[#94A3B8] text-[10px] hidden sm:inline">
                    {reading.attendant}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Illustrative Footer */}
      <div className="bg-[#F0F7FF] dark:bg-[#07131F] border-t border-[#E2E8F0] dark:border-[#133252] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#64748B] dark:text-[#94A3B8]">
        <span>Illustrative operational console preview · Ravo Fuel Station Edition</span>
        <span className="font-mono text-[#0284C7] dark:text-[#38BDF8] font-semibold">Telemetry Stream Nominal</span>
      </div>
    </div>
  );
};
