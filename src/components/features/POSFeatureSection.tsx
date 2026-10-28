import React from 'react';
import {
  ShoppingBag,
  Receipt,
  CreditCard,
  Boxes,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Coffee,
  Check
} from 'lucide-react';
import { PRODUCT_DETAILS } from '../../data/products';
import { POSDashboardMockup } from '../dashboards/POSDashboardMockup';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface POSFeatureSectionProps {
  onOpenDemo: () => void;
}

export const POSFeatureSection: React.FC<POSFeatureSectionProps> = ({ onOpenDemo }) => {
  const posDetails = PRODUCT_DETAILS.pos;
  const { elementRef, isRevealed } = useScrollReveal();

  return (
    <section
      id="product-pos"
      ref={elementRef}
      className={`py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#0F0A1C] text-[#29213D] dark:text-[#F8FAFC] border-b border-[#E4E9E1] dark:border-[#2C1C4E] scroll-mt-12 relative overflow-hidden transition-colors duration-200 reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      {/* Background ambient accent */}
      <div className="absolute top-1/4 -right-28 w-96 h-96 bg-[#7756D9]/5 dark:bg-[#7756D9]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-[#7756D9] dark:text-[#A78BFA] bg-[#F3EEFF] dark:bg-[#231540] border border-[#7756D9]/20 dark:border-[#7756D9]/40 mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ravo POS · Bakery, Café & Restaurant Point-of-Sale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#29213D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Serve faster, sell smarter, and keep your kitchen connected.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#A79CBF] leading-relaxed">
            {posDetails.summary}
          </p>
        </div>

        {/* Feature Grid & Interactive POS Console Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Key POS Modules List (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-[#29213D] dark:text-[#F8FAFC] tracking-tight">
              Speed and accuracy at the front counter
            </h3>

            <div className="space-y-4">
              {posDetails.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F7F4FF] dark:hover:bg-[#18102B] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#F3EEFF] dark:bg-[#231540] text-[#7756D9] dark:text-[#A78BFA] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#29213D] dark:text-[#F8FAFC]">{feat.title}</h4>
                    <p className="text-xs text-[#566359] dark:text-[#A79CBF] mt-0.5 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#7756D9] hover:bg-[#6343c7] dark:bg-[#7756D9] dark:hover:bg-[#8B5CF6] transition-all shadow-md active:scale-[0.98]"
              >
                <span>Discuss POS for Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive POS Console (7 cols) */}
          <div className="lg:col-span-7">
            <POSDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
