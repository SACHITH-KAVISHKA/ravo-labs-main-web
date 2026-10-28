import React from 'react';
import { ROADMAP_ITEMS } from '../data/products';
import { Check, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ProductRoadmap: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();

  return (
    <section
      id="roadmap"
      ref={elementRef}
      className={`py-20 md:py-28 bg-[#F6F8F3] dark:bg-[#0B0F17] border-b border-[#E4E9E1] dark:border-slate-800/80 scroll-mt-12 reveal-init transition-colors duration-300 ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B45] dark:text-[#65C94B] mb-3 block">
            Product Status & Horizon
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Transparent product availability & active roadmap.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            We maintain an honest, verifiable status matrix for all Ravo Labs software modules so you know exactly which features are ready for guided pilots.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_ITEMS.map((item, idx) => {
            const isDemo = item.status === 'Available for Guided Demo';
            return (
              <div
                key={idx}
                className={`bg-white dark:bg-[#111827] rounded-2xl border border-[#E4E9E1] dark:border-slate-800 hover:border-[#2E8B45]/40 dark:hover:border-[#65C94B]/50 hover:-translate-y-1 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between stagger-${(idx % 4) + 1}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] text-[#68736B] dark:text-[#94A3B8] font-semibold">
                      {item.tier}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isDemo
                          ? 'bg-[#E8F5EB] dark:bg-[#278642]/20 text-[#278642] dark:text-[#65C94B] border border-[#278642]/20 dark:border-[#278642]/40'
                          : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight mb-4">
                    {item.product}
                  </h3>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#68736B] dark:text-[#94A3B8] tracking-wider block">
                      Feature Status Check
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#17251D] dark:text-[#F8FAFC]">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2E8B45] dark:text-[#65C94B] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E4E9E1] dark:border-slate-800 text-[11px] text-[#68736B] dark:text-[#94A3B8] flex items-center justify-between">
                  <span>{isDemo ? 'Evaluation ready' : 'Under development'}</span>
                  <span className="font-mono font-semibold text-[#10271D] dark:text-[#F8FAFC]">v2026.1</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
