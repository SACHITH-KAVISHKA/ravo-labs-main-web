import React from 'react';
import { Search, Sliders, Headset, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const HowItWorks: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();
  const steps = [
    {
      step: '01',
      title: 'Understand Your Workflow',
      desc: 'We examine your existing operational processes—whether employee shift matrices, fuel dispenser topologies, or bakery counter workflows—to identify bottlenecks.',
      icon: Search,
      deliverable: 'Operational requirements assessment'
    },
    {
      step: '02',
      title: 'Configure the Solution',
      desc: 'We tailor the software parameters: designating custom leave policies, calibrating tank storage capacities, or configuring POS categories and modifier keys.',
      icon: Sliders,
      deliverable: 'Tailored environment & data onboarding'
    },
    {
      step: '03',
      title: 'Support Your Operations',
      desc: 'We conduct guided walkthroughs for store managers, cashiers, and HR officers, ensuring teams are confident in everyday operational execution.',
      icon: Headset,
      deliverable: 'Staff walkthroughs & ongoing assistance'
    }
  ];

  return (
    <section
      id="how-it-works"
      ref={elementRef}
      className={`py-20 md:py-28 bg-white dark:bg-[#0B0F17] border-b border-[#E4E9E1] dark:border-slate-800/80 scroll-mt-12 reveal-init transition-colors duration-300 ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B45] dark:text-[#65C94B] mb-3 block">
            Implementation & Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            A disciplined, three-stage implementation approach.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            Software should adapt to your operational habits, not disrupt them. We follow a clear process to ensure seamless deployment.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#E4E9E1] dark:bg-slate-800 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className={`bg-[#F6F8F3] dark:bg-[#111827] border border-[#E4E9E1] dark:border-slate-800 hover:border-[#2E8B45]/40 dark:hover:border-[#65C94B]/50 hover:-translate-y-1 rounded-2xl p-6 lg:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group stagger-${idx + 1}`}
                >
                  <div>
                    {/* Step Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E293B] border border-[#E4E9E1] dark:border-slate-700 text-[#2E8B45] dark:text-[#65C94B] font-mono font-bold text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        {st.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5EB] dark:bg-[#278642]/20 text-[#2E8B45] dark:text-[#65C94B] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[#566359] dark:text-[#94A3B8] mt-3 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E4E9E1] dark:border-slate-800 text-[11px] font-semibold text-[#2E8B45] dark:text-[#65C94B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{st.deliverable}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practical Scope Disclosure Notice */}
        <div className="mt-10 p-4 rounded-xl bg-[#F6F8F3] dark:bg-[#111827] border border-[#E4E9E1] dark:border-slate-800 text-xs text-[#68736B] dark:text-[#94A3B8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            * Note: Implementation duration, hardware bridges, and custom field onboarding depend on agreed scope and station/team scale.
          </span>
          <span className="font-semibold text-[#10271D] dark:text-[#F8FAFC] shrink-0">
            Transparent Scoping Guaranteed
          </span>
        </div>
      </div>
    </section>
  );
};
