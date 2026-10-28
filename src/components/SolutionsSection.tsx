import React from 'react';
import { Store, Fuel, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProductId } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SolutionsSectionProps {
  onSelectProduct: (id: ProductId) => void;
  onOpenDemo: (id?: ProductId) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onSelectProduct,
  onOpenDemo
}) => {
  const { elementRef, isRevealed } = useScrollReveal();
  const useCases = [
    {
      icon: Store,
      title: 'Bakeries & Food Franchises',
      tagline: 'High volume checkout paired with staff attendance',
      description:
        'Food operations require speed at the cash register during morning and lunch peaks, coupled with precise ingredient depletion tracking and cashier shift accountability.',
      recommendedProducts: [
        { name: 'Ravo POS', id: 'pos' as ProductId, color: '#7756D9' },
        { name: 'Ravo HR', id: 'hr' as ProductId, color: '#278642' }
      ],
      benefits: [
        'Rapid touch-order entries with modifier buttons',
        'Staff biometric punch integration with shift rosters',
        'Daily end-of-day revenue & tender settlements'
      ]
    },
    {
      icon: Fuel,
      title: 'Fuel Station Retailers',
      tagline: 'Tank level visibility & attendant shift balancing',
      description:
        'Fuel dealers face continuous inventory volatility. Consolidating underground tank dip readings with pump dispenser meters stops stock shrinkage before it impacts margins.',
      recommendedProducts: [
        { name: 'Ravo Fuel', id: 'fuel' as ProductId, color: '#0284C7' },
        { name: 'Ravo HR', id: 'hr' as ProductId, color: '#278642' }
      ],
      benefits: [
        'Live dip and electronic tank capacity tracking',
        'Nozzle meter closing balance against attendant cash',
        'Attendant overtime and duty shift calculations'
      ]
    },
    {
      icon: Building2,
      title: 'Growing Enterprises',
      tagline: 'Configurable workforce operations & payroll compliance',
      description:
        'As organizations scale beyond fifty team members, rigid spreadsheets become error-prone. Ravo HR provides customizable department trees and statutory payroll workflows.',
      recommendedProducts: [{ name: 'Ravo HR', id: 'hr' as ProductId, color: '#278642' }],
      benefits: [
        'Centralized encrypted employee document vault',
        'Custom approval chains for leave and overtime requests',
        'Statutory deduction formulas (EPF, ETF, APIT compliance)'
      ]
    }
  ];

  return (
    <section
      id="solutions"
      ref={elementRef}
      className={`py-20 md:py-28 bg-[#F6F8F3] dark:bg-[#0B0F17] border-b border-[#E4E9E1] dark:border-[#1E293B] scroll-mt-12 transition-colors duration-200 reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B45] dark:text-[#65C94B] mb-3 block">
            Target Industry Workflows
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            How Ravo products solve real-world industry challenges.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            Whether running high-speed bakery counters, managing multi-tank highway fuel stations, or organizing workforce operations, Ravo Labs solutions configure to your operational reality.
          </p>
        </div>

        {/* 3 Industry Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className={`bg-white dark:bg-[#111827] rounded-2xl border border-[#E4E9E1] dark:border-[#1E293B] hover:border-[#2E8B45]/40 dark:hover:border-[#2E8B45] hover:-translate-y-1 p-6 lg:p-7 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between stagger-${idx + 1}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F6F8F3] dark:bg-[#1E293B] text-[#10271D] dark:text-[#F8FAFC] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#2E8B45] dark:text-[#65C94B]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight">
                    {uc.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2E8B45] dark:text-[#65C94B] mt-0.5">
                    {uc.tagline}
                  </p>
                  <p className="text-xs text-[#566359] dark:text-[#94A3B8] mt-3 leading-relaxed">
                    {uc.description}
                  </p>

                  {/* Connected Recommended Products */}
                  <div className="mt-5 pt-4 border-t border-[#E4E9E1] dark:border-[#1E293B]">
                    <span className="text-[10px] uppercase font-bold text-[#68736B] dark:text-[#94A3B8] tracking-wider block mb-2">
                      Recommended Suite
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.recommendedProducts.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => onSelectProduct(p.id)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-1 cursor-pointer"
                          style={{ backgroundColor: p.color }}
                        >
                          <span>{p.name}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Operational Benefits */}
                  <div className="mt-5 pt-4 border-t border-[#E4E9E1] dark:border-[#1E293B] space-y-2">
                    {uc.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-[#17251D] dark:text-[#F8FAFC]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B45] dark:text-[#65C94B] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E4E9E1] dark:border-[#1E293B]">
                  <button
                    onClick={() => onOpenDemo(uc.recommendedProducts[0].id)}
                    className="w-full py-2 bg-[#F6F8F3] dark:bg-[#1E293B] hover:bg-[#E8F5EB] dark:hover:bg-[#163823] text-[#10271D] dark:text-[#F8FAFC] hover:text-[#278642] dark:hover:text-[#65C94B] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Discuss Solution Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
