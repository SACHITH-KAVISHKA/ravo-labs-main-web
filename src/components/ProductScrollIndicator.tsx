import React, { useState, useEffect } from 'react';
import { ProductId } from '../types';
import { Users, Fuel, ShoppingBag } from 'lucide-react';
import { determineActiveProductSection, SectionBound } from '../utils/scrollNavigation';

interface ProductIndicatorItem {
  id: ProductId;
  name: string;
  tagline: string;
  color: string;
  activeBg: string;
  ringColor: string;
  icon: React.ElementType;
}

const INDICATOR_ITEMS: ProductIndicatorItem[] = [
  {
    id: 'hr',
    name: 'Ravo HR',
    tagline: 'People & Payroll',
    color: '#278642',
    activeBg: 'bg-[#278642]',
    ringColor: 'ring-[#278642]/30',
    icon: Users
  },
  {
    id: 'fuel',
    name: 'Ravo Fuel',
    tagline: 'Station Operations',
    color: '#0284C7',
    activeBg: 'bg-[#0284C7]',
    ringColor: 'ring-[#0284C7]/30',
    icon: Fuel
  },
  {
    id: 'pos',
    name: 'Ravo POS',
    tagline: 'Bakery & Food Sales',
    color: '#7756D9',
    activeBg: 'bg-[#7756D9]',
    ringColor: 'ring-[#7756D9]/30',
    icon: ShoppingBag
  }
];

export const ProductScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ProductId | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const hrEl = document.getElementById('product-hr');
      const fuelEl = document.getElementById('product-fuel');
      const posEl = document.getElementById('product-pos');

      if (!hrEl || !fuelEl || !posEl) return;

      const sections: SectionBound[] = [
        {
          id: 'hr',
          top: hrEl.offsetTop,
          bottom: hrEl.offsetTop + hrEl.offsetHeight
        },
        {
          id: 'fuel',
          top: fuelEl.offsetTop,
          bottom: fuelEl.offsetTop + fuelEl.offsetHeight
        },
        {
          id: 'pos',
          top: posEl.offsetTop,
          bottom: posEl.offsetTop + posEl.offsetHeight
        }
      ];

      const current = determineActiveProductSection(scrollY, sections, viewportHeight);
      setActiveSection(current);

      // Keep subtle indicator visible whenever user is scrolled or browsing
      setIsVisible(true);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScrollToSection = (id: ProductId) => {
    const el = document.getElementById(`product-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Product Sections Navigation"
      className={`fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
    >
      <div className="bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border border-[#CBD5E1]/80 dark:border-slate-800 shadow-lg shadow-black/10 rounded-full p-2 py-3.5 flex flex-col items-center gap-3 relative transition-colors duration-200">
        {/* Subtle Background Guide Track */}
        <div
          className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-[#E2E8F0] dark:bg-slate-800 -z-10 rounded-full"
          aria-hidden="true"
        />

        {INDICATOR_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative flex items-center justify-center group">
              {/* Flyout Hover & Focus Tooltip Label */}
              <div
                role="tooltip"
                className="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 absolute right-full mr-3 whitespace-nowrap bg-[#0F172A] dark:bg-[#1E293B] dark:border dark:border-slate-700 text-white py-1.5 px-3 rounded-xl shadow-xl flex items-center gap-2 z-40 text-xs"
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-3 h-3" />
                </div>
                <div>
                  <span className="font-bold block leading-none">{item.name}</span>
                  <span className="text-[10px] text-neutral-300 dark:text-neutral-400 font-normal leading-tight">
                    {item.tagline}
                  </span>
                </div>
                {/* Arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-[#0F172A] dark:bg-[#1E293B] rotate-45" />
              </div>

              {/* Interactive Indicator Dot Button */}
              <button
                type="button"
                onClick={() => handleScrollToSection(item.id)}
                aria-label={`Scroll to ${item.name} section`}
                aria-current={isActive ? 'true' : undefined}
                className="min-w-[32px] min-h-[32px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full transition-transform active:scale-95"
                style={{
                  outlineColor: item.color
                }}
              >
                <span
                  className={`transition-all duration-300 rounded-full block ${
                    isActive
                      ? `h-6 w-2.5 ${item.activeBg} ring-4 ${item.ringColor} shadow-xs`
                      : 'w-2.5 h-2.5 bg-[#94A3B8] dark:bg-slate-700 hover:bg-[#64748B] dark:hover:bg-slate-500 hover:scale-125'
                  }`}
                  style={isActive ? { backgroundColor: item.color } : undefined}
                />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
