import React from 'react';
import {
  Users,
  Fuel,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  Droplets,
  Receipt,
  Sparkles
} from 'lucide-react';
import { ProductId } from '../types';
import { PRODUCTS_CONFIG, PRODUCT_DETAILS } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProductOverviewProps {
  onSelectProduct: (id: ProductId) => void;
  onExploreProduct?: (id: ProductId) => void;
  onOpenDemo: (id: ProductId) => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  onSelectProduct,
  onExploreProduct,
  onOpenDemo
}) => {
  const { elementRef, isRevealed } = useScrollReveal();

  return (
    <section id="products" className="py-20 md:py-28 bg-white dark:bg-[#0B0F17] border-y border-[#E4E9E1] dark:border-[#1E293B] scroll-mt-12 transition-colors duration-200">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-init ${
          isRevealed ? 'reveal-visible' : ''
        }`}
      >
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B45] dark:text-[#65C94B] mb-3 block">
            The Ravo Product Family
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Three focused systems. One vision for better business.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            Ravo Labs develops practical software experiences for people operations, fuel station management, and food-service businesses.
          </p>
        </div>

        {/* 3 Distinct Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Ravo HR (Green & White) */}
          <div className="bg-[#FFFFFF] dark:bg-[#0D2115] rounded-2xl border border-[#E4E9E1] dark:border-[#1A3D27] hover:border-[#278642]/40 dark:hover:border-[#2E8B45] p-6 lg:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#278642]/5 dark:bg-[#278642]/10 rounded-bl-full pointer-events-none" />

            <div>
              {/* Product Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E8F5EB] dark:bg-[#163823] text-[#278642] dark:text-[#65C94B] flex items-center justify-center font-bold shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-[#183124] dark:text-[#65C94B] bg-[#E8F5EB] dark:bg-[#163823] px-2.5 py-1 rounded-full border border-[#278642]/20 dark:border-[#278642]/40">
                  {PRODUCTS_CONFIG.hr.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight">Ravo HR</h3>
              <p className="text-xs font-semibold text-[#278642] dark:text-[#65C94B] mt-0.5">
                Configurable Human Resources & Payroll
              </p>
              <p className="mt-3 text-sm text-[#566359] dark:text-[#94A3B8] leading-relaxed">
                Connect employee records, biometric clock-in, leave approval chains, and statutory payroll preparation in an adaptable workplace console.
              </p>

              {/* Feature Checklist */}
              <div className="mt-6 pt-5 border-t border-[#E4E9E1] dark:border-[#1A3D27] space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#68736B] dark:text-[#94A3B8] block">
                  Core Modules Included
                </span>
                <ul className="space-y-2 text-xs text-[#17251D] dark:text-[#E8F5EB]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#278642] dark:text-[#65C94B] shrink-0" />
                    <span>Configurable shift rosters & grace rules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#278642] dark:text-[#65C94B] shrink-0" />
                    <span>Multi-tiered leave approval workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#278642] dark:text-[#65C94B] shrink-0" />
                    <span>Statutory payroll & digital payslips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#278642] dark:text-[#65C94B] shrink-0" />
                    <span>Employee Self-Service (ESS) web portal</span>
                  </li>
                </ul>
              </div>

              {/* Mini Interface Preview Component */}
              <div className="mt-6 bg-[#F6F8F3] dark:bg-[#07170E] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-xl p-3 text-[11px] font-mono">
                <div className="flex items-center justify-between text-[#68736B] dark:text-[#94A3B8] mb-1.5">
                  <span>Attendance Today</span>
                  <span className="text-[#278642] dark:text-[#65C94B] font-bold">96.4% Present</span>
                </div>
                <div className="w-full bg-[#E4E9E1] dark:bg-[#1A3D27] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#278642] dark:bg-[#65C94B] h-full w-[96.4%]" />
                </div>
                <div className="flex justify-between text-[10px] text-[#68736B] dark:text-[#94A3B8] mt-1.5">
                  <span>142 Active Staff</span>
                  <span>3 Pending Approvals</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#E4E9E1] dark:border-[#1A3D27] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onExploreProduct ? onExploreProduct('hr') : onSelectProduct('hr')}
                className="text-xs font-bold text-[#278642] dark:text-[#65C94B] group-hover:text-[#183124] dark:group-hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Explore Ravo HR</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => onOpenDemo('hr')}
                className="px-3 py-1.5 text-xs font-semibold text-[#183124] dark:text-[#E8F5EB] bg-[#E8F5EB] dark:bg-[#163823] hover:bg-[#d5ebd9] dark:hover:bg-[#1e4d30] border border-transparent dark:border-[#278642]/40 rounded-lg transition-colors cursor-pointer"
              >
                Book Demo
              </button>
            </div>
          </div>

          {/* Card 2: Ravo Fuel (Blue & White) */}
          <div className="bg-[#FFFFFF] dark:bg-[#0C1E30] text-[#0F172A] dark:text-[#F8FAFC] rounded-2xl border border-[#E4E9E1] dark:border-[#133252] hover:border-[#0284C7]/40 dark:hover:border-[#0284C7] p-6 lg:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0284C7]/5 dark:bg-[#0284C7]/15 rounded-bl-full pointer-events-none" />

            <div>
              {/* Product Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-[#081F33] text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold shadow-sm border border-[#BFDBFE] dark:border-[#0284C7]/40">
                  <Fuel className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#081F33] px-2.5 py-1 rounded-full border border-[#BFDBFE] dark:border-[#0284C7]/40">
                  {PRODUCTS_CONFIG.fuel.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">Ravo Fuel</h3>
              <p className="text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] mt-0.5">
                Fuel Station Management Platform
              </p>
              <p className="mt-3 text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Bring underground storage tank levels, pump meter totalizers, attendant shift settlements, and station reporting into a unified console.
              </p>

              {/* Feature Checklist */}
              <div className="mt-6 pt-5 border-t border-[#E4E9E1] dark:border-[#133252] space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
                  Core Modules Included
                </span>
                <ul className="space-y-2 text-xs text-[#0F172A] dark:text-[#E0F2FE]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                    <span>Real-time underground tank dip monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                    <span>Pump meter totalizer opening/closing logs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                    <span>Cash & card attendant sales reconciliation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                    <span>Automated stock variance & shrinkage alerts</span>
                  </li>
                </ul>
              </div>

              {/* Mini Interface Preview Component */}
              <div className="mt-6 bg-[#F0F7FF] dark:bg-[#07131F] border border-[#BAE6FD] dark:border-[#133252] rounded-xl p-3 text-[11px] font-mono">
                <div className="flex items-center justify-between text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                  <span>Tank 01 (92 Octane)</span>
                  <span className="text-[#0284C7] dark:text-[#38BDF8] font-bold">15,400L (77%)</span>
                </div>
                <div className="w-full bg-[#E2E8F0] dark:bg-[#133252] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0284C7] dark:bg-[#38BDF8] h-full w-[77%]" />
                </div>
                <div className="flex justify-between text-[10px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                  <span>4 Nozzles Active</span>
                  <span className="text-[#059669] dark:text-[#34D399] font-medium">Shift Balanced ✓</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#E4E9E1] dark:border-[#133252] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onExploreProduct ? onExploreProduct('fuel') : onSelectProduct('fuel')}
                className="text-xs font-bold text-[#0284C7] dark:text-[#38BDF8] group-hover:text-[#0369a1] dark:group-hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Explore Ravo Fuel</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => onOpenDemo('fuel')}
                className="px-3 py-1.5 text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#081F33] hover:bg-[#DBEAFE] dark:hover:bg-[#0c2e4d] border border-transparent dark:border-[#0284C7]/40 rounded-lg transition-colors cursor-pointer"
              >
                Book Demo
              </button>
            </div>
          </div>

          {/* Card 3: Ravo POS (White & Purple) */}
          <div className="bg-[#FFFFFF] dark:bg-[#18102B] rounded-2xl border border-[#E4E9E1] dark:border-[#2C1C4E] hover:border-[#7756D9]/40 dark:hover:border-[#7756D9] p-6 lg:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7756D9]/5 dark:bg-[#7756D9]/15 rounded-bl-full pointer-events-none" />

            <div>
              {/* Product Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#F3EEFF] dark:bg-[#231540] text-[#7756D9] dark:text-[#A78BFA] flex items-center justify-center font-bold shadow-sm border border-transparent dark:border-[#7756D9]/40">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold text-[#37276B] dark:text-[#A78BFA] bg-[#F3EEFF] dark:bg-[#231540] px-2.5 py-1 rounded-full border border-[#7756D9]/20 dark:border-[#7756D9]/40">
                  {PRODUCTS_CONFIG.pos.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#29213D] dark:text-[#F8FAFC] tracking-tight">Ravo POS</h3>
              <p className="text-xs font-semibold text-[#7756D9] dark:text-[#A78BFA] mt-0.5">
                Bakery, Café & Restaurant Point-of-Sale
              </p>
              <p className="mt-3 text-sm text-[#566359] dark:text-[#94A3B8] leading-relaxed">
                Empower front-of-house staff with rapid touch billing, customizable modifier keys, split checks, and daily ingredient stock tracking.
              </p>

              {/* Feature Checklist */}
              <div className="mt-6 pt-5 border-t border-[#E4E9E1] dark:border-[#2C1C4E] space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#68736B] dark:text-[#94A3B8] block">
                  Core Modules Included
                </span>
                <ul className="space-y-2 text-xs text-[#29213D] dark:text-[#F3EEFF]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7756D9] dark:text-[#A78BFA] shrink-0" />
                    <span>Touch-first fast ticketing & modifier menus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7756D9] dark:text-[#A78BFA] shrink-0" />
                    <span>Split tender payments (Cash, Cards, QR)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7756D9] dark:text-[#A78BFA] shrink-0" />
                    <span>Recipe-level bakery ingredient deduction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7756D9] dark:text-[#A78BFA] shrink-0" />
                    <span>Automated End-of-Day X & Z sales audits</span>
                  </li>
                </ul>
              </div>

              {/* Mini Interface Preview Component */}
              <div className="mt-6 bg-[#F7F4FF] dark:bg-[#0F0A1C] border border-[#7756D9]/20 dark:border-[#2C1C4E] rounded-xl p-3 text-[11px] font-mono">
                <div className="flex items-center justify-between text-[#68736B] dark:text-[#94A3B8] mb-1.5">
                  <span>Current Register Shift</span>
                  <span className="text-[#7756D9] dark:text-[#A78BFA] font-bold">$1,842.50</span>
                </div>
                <div className="w-full bg-[#E4E9E1] dark:bg-[#2C1C4E] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7756D9] dark:bg-[#A78BFA] h-full w-[82%]" />
                </div>
                <div className="flex justify-between text-[10px] text-[#68736B] dark:text-[#94A3B8] mt-1.5">
                  <span>142 Orders Served</span>
                  <span>Avg Ticket: $12.98</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#E4E9E1] dark:border-[#2C1C4E] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onExploreProduct ? onExploreProduct('pos') : onSelectProduct('pos')}
                className="text-xs font-bold text-[#7756D9] dark:text-[#A78BFA] group-hover:text-[#29213D] dark:group-hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Explore Ravo POS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => onOpenDemo('pos')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#7756D9] hover:bg-[#6343c7] dark:bg-[#7756D9] dark:hover:bg-[#8B5CF6] rounded-lg transition-colors cursor-pointer"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
