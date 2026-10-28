import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Star,
  CheckCircle2,
  Users,
  Fuel,
  ShoppingBag,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductId } from '../types';
import {
  Testimonial,
  getNextIndex,
  getPrevIndex,
  filterTestimonials
} from '../utils/carouselLogic';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface TestimonialsSectionProps {
  onOpenDemo: (product?: ProductId) => void;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-hr',
    quote:
      'Managing 320 shift workers across four regional distribution hubs used to mean five days of spreadsheet reconciliation every month-end. With Ravo HR’s biometric bridge and automated overtime formulas, our payroll cut-off now closes in four hours with zero discrepancy disputes.',
    author: 'Arjuna Senanayake',
    role: 'Head of People Operations & Culture',
    company: 'Ceylon Logistics & Cold Chain Group',
    location: '4 Regional Hubs · 320 Team Members',
    product: 'hr',
    productName: 'Ravo HR',
    metric: '4 Hours vs 5 Days',
    metricLabel: 'Monthly Payroll Reconciliation Time',
    avatarBg: 'bg-[#278642]',
    stars: 5
  },
  {
    id: 't-fuel',
    quote:
      'Before deploying Ravo Fuel, dip readings and dispenser totalizers were penned into paper logs, and stock evaporation or shrinkage only surfaced weeks later. Ravo Fuel’s underground tank telemetry and shift closing reconciliation flag discrepancies immediately before attendant cash is handed over.',
    author: 'Kavinda Wickramasinghe',
    role: 'Managing Director & Dealer Franchisee',
    company: 'Southern Express Fuel Station Network',
    location: '6 Highway Stations · 24 Dispenser Nozzles',
    product: 'fuel',
    productName: 'Ravo Fuel',
    metric: '0.0% Unaccounted',
    metricLabel: 'Underground Tank Variance Flagged',
    avatarBg: 'bg-[#0284C7]',
    stars: 5
  },
  {
    id: 't-pos',
    quote:
      'During morning bakery rush hours and lunchtime cafe traffic, cashier speed is everything. Ravo POS lets our counter staff ring custom orders, apply bakery discounts, and split bills in two taps. Real-time ingredient depletion tracking has eliminated afternoon pastry stockouts completely.',
    author: 'Minoli De Silva',
    role: 'Founder & Operations Director',
    company: 'The Artisan Crust Bakery & Bistros',
    location: '3 High-Volume Outlets · 8 Terminals',
    product: 'pos',
    productName: 'Ravo POS',
    metric: '< 6 Seconds',
    metricLabel: 'Average Counter Checkout Speed',
    avatarBg: 'bg-[#7756D9]',
    stars: 5
  },
  {
    id: 't-enterprise',
    quote:
      'We operate roadside fueling stations that also house high-turnover cafe bakeries. Having Ravo HR synchronize employee shifts alongside specialized Ravo Fuel pump logs and Ravo POS counters gave our executive leadership a connected operating picture without bloated ERP expenses.',
    author: 'Damian Perera',
    role: 'Chief Operating Officer',
    company: 'Lakeside Retail & Hospitality Holdings',
    location: 'Multi-Unit Network · HR + Fuel + POS',
    product: 'enterprise',
    productName: 'Enterprise Suite',
    metric: '3-in-1 Unified',
    metricLabel: 'Single Corporate Management Oversight',
    avatarBg: 'bg-[#10271D]',
    stars: 5
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenDemo
}) => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [selectedProduct, setSelectedProduct] = useState<ProductId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredItems = filterTestimonials(TESTIMONIALS_DATA, selectedProduct);
  const activeItem = filteredItems[currentIndex] || filteredItems[0];
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedProduct]);

  // Autoplay rotation every 7 seconds
  useEffect(() => {
    if (!isPlaying || filteredItems.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev, filteredItems.length));
    }, 7000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, filteredItems.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => getNextIndex(prev, filteredItems.length));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => getPrevIndex(prev, filteredItems.length));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const getProductColor = (product: ProductId | 'enterprise') => {
    switch (product) {
      case 'hr':
        return {
          badgeBg: 'bg-[#E8F5EB] dark:bg-[#278642]/20',
          badgeText: 'text-[#278642] dark:text-[#65C94B]',
          border: 'border-[#278642]/30 dark:border-[#278642]/40',
          accent: '#278642',
          icon: Users
        };
      case 'fuel':
        return {
          badgeBg: 'bg-[#EFF6FF] dark:bg-[#0284C7]/20',
          badgeText: 'text-[#0284C7] dark:text-[#38BDF8]',
          border: 'border-[#0284C7]/30 dark:border-[#0284C7]/40',
          accent: '#0284C7',
          icon: Fuel
        };
      case 'pos':
        return {
          badgeBg: 'bg-[#F3EEFF] dark:bg-[#7756D9]/20',
          badgeText: 'text-[#7756D9] dark:text-[#A78BFA]',
          border: 'border-[#7756D9]/30 dark:border-[#7756D9]/40',
          accent: '#7756D9',
          icon: ShoppingBag
        };
      default:
        return {
          badgeBg: 'bg-[#F0FDF4] dark:bg-[#2E8B45]/20',
          badgeText: 'text-[#10271D] dark:text-[#65C94B]',
          border: 'border-[#2E8B45]/30 dark:border-[#2E8B45]/40',
          accent: '#2E8B45',
          icon: Layers
        };
    }
  };

  const theme = getProductColor(activeItem.product);
  const ProductIcon = theme.icon;

  return (
    <section
      id="testimonials"
      ref={elementRef}
      onKeyDown={handleKeyDown}
      className={`py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#0B0F17] border-b border-[#E4E9E1] dark:border-slate-800/80 scroll-mt-12 reveal-init transition-colors duration-300 ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-roledescription="carousel"
      aria-label="Customer Testimonials and Field Results"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#0284C7]/20 border border-[#BFDBFE]/60 dark:border-[#0284C7]/30 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
              <span>Verified Client Endorsements</span>
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              Trusted by operators who manage real teams, tanks, and terminals.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Read how frontline business owners eliminate payroll delays, tank volume variances, and counter bottlenecks with Ravo software.
            </p>
          </div>

          {/* Product Filter Tabs */}
          <div
            className="flex items-center gap-1.5 p-1.5 bg-[#F8FAFC] dark:bg-[#111827] border border-[#CBD5E1]/80 dark:border-slate-800 rounded-2xl shrink-0 self-start md:self-auto overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Filter Testimonials by Product"
          >
            {[
              { id: 'all' as const, label: 'All Reviews', count: TESTIMONIALS_DATA.length },
              { id: 'hr' as const, label: 'Ravo HR', count: 2 },
              { id: 'fuel' as const, label: 'Ravo Fuel', count: 2 },
              { id: 'pos' as const, label: 'Ravo POS', count: 2 }
            ].map((tab) => {
              const isSelected = selectedProduct === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedProduct(tab.id)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                    isSelected
                      ? 'bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white shadow-xs border border-[#CBD5E1] dark:border-slate-700'
                      : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-[#EFF6FF] dark:bg-[#0284C7]/25 text-[#0284C7] dark:text-[#38BDF8]'
                        : 'bg-slate-200 dark:bg-slate-800 text-[#64748B] dark:text-[#94A3B8]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Card Container */}
        <div
          className="relative bg-[#F8FAFC] dark:bg-[#111827] rounded-3xl border border-[#CBD5E1]/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 group/carousel"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Ambient Product Tint */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: theme.accent }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Quote & Testimonial Details (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Product Badge & Rating Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${theme.badgeBg} ${theme.badgeText} border ${theme.border}`}
                >
                  <ProductIcon className="w-3.5 h-3.5" />
                  <span>{activeItem.productName}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: activeItem.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] ml-1.5">5.0</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#278642] dark:text-[#65C94B] bg-[#E8F5EB] dark:bg-[#278642]/20 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Operational Deployment</span>
                </div>
              </div>

              {/* Main Quote with Graphic Icon */}
              <div className="relative pt-2">
                <Quote
                  className="w-10 h-10 -top-4 -left-2 absolute opacity-15 pointer-events-none transition-colors duration-300"
                  style={{ color: theme.accent }}
                  aria-hidden="true"
                />
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug tracking-tight">
                  “{activeItem.quote}”
                </blockquote>
              </div>

              {/* Author & Organization Info */}
              <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl ${activeItem.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0`}
                  >
                    {activeItem.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <span className="font-extrabold text-base text-[#0F172A] dark:text-[#F8FAFC] block">
                      {activeItem.author}
                    </span>
                    <span className="text-xs font-medium text-[#475569] dark:text-[#94A3B8] block">
                      {activeItem.role} · <strong className="text-[#0F172A] dark:text-[#F8FAFC]">{activeItem.company}</strong>
                    </span>
                    <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                      {activeItem.location}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenDemo(activeItem.product === 'enterprise' ? undefined : activeItem.product)
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:text-[#0369A1] dark:hover:text-[#7DD3FC] hover:underline self-start sm:self-center"
                >
                  <span>Request Demo Like This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Quantitative Impact Metric Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-[#0B0F17] rounded-2xl border border-[#CBD5E1]/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
                  Measured Field Impact
                </span>

                <div>
                  <span
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono block transition-colors duration-300"
                    style={{ color: theme.accent }}
                  >
                    {activeItem.metric}
                  </span>
                  <span className="text-xs font-medium text-[#475569] dark:text-[#94A3B8] mt-1 block">
                    {activeItem.metricLabel}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 space-y-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  <div className="flex items-center justify-between">
                    <span>Implementation:</span>
                    <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">Completed & Live</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Architecture:</span>
                    <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">On-Premise & Cloud Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Footer Controls */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Pagination Dots / Progress */}
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Carousel slide selectors"
            >
              {filteredItems.map((item, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${item.author}`}
                    aria-current={isSelected ? 'true' : undefined}
                    className="min-h-[32px] min-w-[32px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-full"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'w-7 h-2.5 bg-[#0284C7] shadow-xs'
                          : 'w-2.5 h-2.5 bg-[#CBD5E1] dark:bg-slate-700 hover:bg-[#94A3B8] dark:hover:bg-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] ml-2">
                0{currentIndex + 1} / 0{filteredItems.length}
              </span>
            </div>

            {/* Navigation Buttons: Prev, Play/Pause, Next */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-slate-700 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                aria-label={isPlaying ? 'Pause automatic carousel rotation' : 'Resume automatic carousel rotation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-slate-700 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-slate-700 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
