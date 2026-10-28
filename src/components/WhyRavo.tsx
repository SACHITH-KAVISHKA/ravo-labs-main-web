import React from 'react';
import { Layers, Workflow, ShieldCheck, Compass, CheckCircle } from 'lucide-react';
import { COMPANY_VALUES } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const WhyRavo: React.FC = () => {
  const pillarIcons = [Compass, Workflow, Layers];
  const { elementRef, isRevealed } = useScrollReveal();

  return (
    <section id="why-ravo" className="py-20 md:py-28 bg-[#F6F8F3] dark:bg-[#0B0F17] relative overflow-hidden scroll-mt-12 transition-colors duration-200">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-init ${
          isRevealed ? 'reveal-visible' : ''
        }`}
      >
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B45] dark:text-[#65C94B] mb-3 block">
            The Ravo Labs Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Technology built around the way businesses actually work.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            Every business has its own processes. Ravo Labs focuses on practical software that helps teams organize information, improve visibility, and manage everyday work with greater clarity.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COMPANY_VALUES.map((pillar, idx) => {
            const Icon = pillarIcons[idx] || Workflow;
            return (
              <div
                key={pillar.number}
                className="bg-white dark:bg-[#111827] rounded-2xl border border-[#E4E9E1] dark:border-[#1E293B] hover:border-[#2E8B45]/40 dark:hover:border-[#2E8B45] p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-bold text-[#2E8B45] dark:text-[#65C94B] bg-[#E8F5EB] dark:bg-[#0F2417] px-2.5 py-1 rounded-md">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F6F8F3] dark:bg-[#1E293B] text-[#10271D] dark:text-[#F8FAFC] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#2E8B45] dark:text-[#65C94B]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#566359] dark:text-[#94A3B8] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E4E9E1] dark:border-[#1E293B] text-[11px] font-semibold text-[#2E8B45] dark:text-[#65C94B] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Purpose-built operational architecture</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Highlights Strip */}
        <div className="mt-12 bg-white dark:bg-[#111827] rounded-2xl border border-[#E4E9E1] dark:border-[#1E293B] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E4E9E1] dark:divide-[#1E293B]">
          <div className="pt-4 md:pt-0 md:px-4 first:pl-0">
            <span className="text-xs font-bold text-[#10271D] dark:text-[#F8FAFC] block">Zero Generic AI Slop</span>
            <p className="text-xs text-[#566359] dark:text-[#94A3B8] mt-1 leading-relaxed">
              Real interfaces crafted for everyday operators. No gimmicks, fabricated dashboards, or ornamental widgets.
            </p>
          </div>
          <div className="pt-4 md:pt-0 md:px-4">
            <span className="text-xs font-bold text-[#10271D] dark:text-[#F8FAFC] block">Modular Architecture</span>
            <p className="text-xs text-[#566359] dark:text-[#94A3B8] mt-1 leading-relaxed">
              Deploy Ravo HR, Ravo Fuel, or Ravo POS independently, or unite multi-branch operations under a single corporate umbrella.
            </p>
          </div>
          <div className="pt-4 md:pt-0 md:px-4 last:pr-0">
            <span className="text-xs font-bold text-[#10271D] dark:text-[#F8FAFC] block">Direct Human Guidance</span>
            <p className="text-xs text-[#566359] dark:text-[#94A3B8] mt-1 leading-relaxed">
              Work with our solutions team to map your real-world organizational hierarchy, pump topology, or menu structures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
