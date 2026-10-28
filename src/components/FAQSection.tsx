import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_DATA } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { elementRef, isRevealed } = useScrollReveal();

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { label: 'All Questions', value: 'all' },
    { label: 'General & About', value: 'general' },
    { label: 'Ravo HR', value: 'hr' },
    { label: 'Ravo Fuel', value: 'fuel' },
    { label: 'Ravo POS', value: 'pos' },
    { label: 'Implementation', value: 'implementation' }
  ];

  const filteredFaqs =
    selectedCategory === 'all'
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white dark:bg-[#0B0F17] border-b border-[#E4E9E1] dark:border-slate-800/80 scroll-mt-12 transition-colors duration-300">
      <div
        ref={elementRef}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-init ${
          isRevealed ? 'reveal-visible' : ''
        }`}
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B45] dark:text-[#65C94B] mb-3 block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Everything you need to know about Ravo Labs software.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#566359] dark:text-[#94A3B8]">
            Have a question not answered here? Reach out to our solutions team directly.
          </p>
        </div>

        {/* Filter Categories */}
        <div
          role="tablist"
          aria-label="FAQ Categories"
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            const count =
              cat.value === 'all'
                ? FAQ_DATA.length
                : FAQ_DATA.filter((item) => item.category === cat.value).length;

            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="faq-list"
                onClick={() => setSelectedCategory(cat.value)}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] ${
                  isSelected
                    ? 'bg-[#10271D] dark:bg-[#278642] text-white shadow-md'
                    : 'bg-[#F6F8F3] dark:bg-[#111827] text-[#566359] dark:text-[#94A3B8] hover:bg-[#E8EDE5] dark:hover:bg-slate-800 hover:text-[#10271D] dark:hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-black/5 dark:bg-white/10 text-[#68736B] dark:text-[#94A3B8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div id="faq-list" role="tabpanel" aria-label="FAQ Accordion" className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="border border-[#E4E9E1] dark:border-slate-800 rounded-2xl overflow-hidden transition-all bg-[#FCFCFD] dark:bg-[#111827] hover:bg-white dark:hover:bg-[#162032]"
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-[#10271D] dark:text-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] hover:bg-[#F6F8F3]/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F6F8F3] dark:bg-[#1E293B] text-[#68736B] dark:text-[#94A3B8] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#E8F5EB] dark:bg-[#278642]/30 text-[#278642] dark:text-[#65C94B]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#566359] dark:text-[#94A3B8] leading-relaxed border-t border-[#E4E9E1]/60 dark:border-slate-800 pt-3">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
