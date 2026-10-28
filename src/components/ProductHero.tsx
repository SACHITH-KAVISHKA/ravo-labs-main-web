import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Fuel,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { ProductId } from '../types';
import { PRODUCTS_CONFIG } from '../data/products';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { HRDashboardMockup } from './dashboards/HRDashboardMockup';
import { FuelDashboardMockup } from './dashboards/FuelDashboardMockup';
import { POSDashboardMockup } from './dashboards/POSDashboardMockup';

interface ProductHeroProps {
  activeProductId: ProductId;
  onSelectProduct: (id: ProductId) => void;
  onExploreProduct?: (id: ProductId) => void;
  onOpenDemo: (product: ProductId) => void;
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  activeProductId,
  onSelectProduct,
  onExploreProduct,
  onOpenDemo
}) => {
  const currentProduct = PRODUCTS_CONFIG[activeProductId];
  const prefersReducedMotion = useReducedMotion();
  const [isAutoplay, setIsAutoplay] = useState<boolean>(!prefersReducedMotion);
  const [autoplayProgress, setAutoplayProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const AUTOPLAY_DURATION = 8000; // 8 seconds per product
  const PROGRESS_INTERVAL = 100; // update progress every 100ms

  // If user prefers reduced motion, ensure autoplay is disabled
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAutoplay(false);
      setAutoplayProgress(0);
    }
  }, [prefersReducedMotion]);

  // Smooth progress bar and autoplay timer
  useEffect(() => {
    if (!isAutoplay || prefersReducedMotion) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      setAutoplayProgress(0);
      return;
    }

    setAutoplayProgress(0);
    const startTime = Date.now();

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / AUTOPLAY_DURATION) * 100);
      setAutoplayProgress(progress);
    }, PROGRESS_INTERVAL);

    autoplayTimerRef.current = setTimeout(() => {
      const order: ProductId[] = ['hr', 'fuel', 'pos'];
      const nextIndex = (order.indexOf(activeProductId) + 1) % order.length;
      handleProductChange(order[nextIndex]);
    }, AUTOPLAY_DURATION);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeProductId, isAutoplay, prefersReducedMotion]);

  const handleProductChange = (id: ProductId) => {
    if (id === activeProductId) return;
    setIsTransitioning(true);
    onSelectProduct(id);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 280);
  };

  const handleManualSelect = (id: ProductId) => {
    handleProductChange(id);
    setIsAutoplay(false);
  };

  const getHeroThemeStyles = () => {
    switch (activeProductId) {
      case 'fuel':
        return {
          containerBg: 'bg-[#F4F8FC] dark:bg-[#07131F] text-[#0F1E2E] dark:text-[#E0F2FE]',
          gridStroke: 'rgba(2, 132, 199, 0.08)',
          glowPrimary: 'rgba(2, 132, 199, 0.20)',
          glowSecondary: 'rgba(56, 189, 248, 0.15)',
          eyebrowColor: 'text-[#0284C7] dark:text-[#38BDF8]',
          eyebrowBg: 'bg-[#0284C7]/10 dark:bg-[#0284C7]/20 border-[#0284C7]/30 dark:border-[#0284C7]/40',
          headlineColor: 'text-[#0F1E2E] dark:text-[#F0F9FF]',
          descColor: 'text-[#475569] dark:text-[#94A3B8]',
          benefitBg: 'bg-white/95 dark:bg-[#0C1E30]/90 border-[#E2E8F0] dark:border-[#133252] text-[#0F1E2E] dark:text-[#F0F9FF] shadow-xs',
          benefitDesc: 'text-[#64748B] dark:text-[#94A3B8]',
          primaryBtn: 'bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold shadow-[0_4px_24px_rgba(2,132,199,0.35)]',
          secondaryBtn: 'border-[#E2E8F0] dark:border-[#133252] bg-white/80 dark:bg-[#0C1E30]/80 hover:bg-white dark:hover:bg-[#132B45] text-[#0F1E2E] dark:text-[#F0F9FF] backdrop-blur-sm',
          mockupShadow: 'shadow-[0_24px_64px_rgba(2,132,199,0.14)] dark:shadow-[0_24px_64px_rgba(2,132,199,0.25)]'
        };
      case 'pos':
        return {
          containerBg: 'bg-[#FAF8FE] dark:bg-[#0F0A1C] text-[#29213D] dark:text-[#F3EEFF]',
          gridStroke: 'rgba(119, 86, 217, 0.08)',
          glowPrimary: 'rgba(119, 86, 217, 0.20)',
          glowSecondary: 'rgba(167, 139, 250, 0.15)',
          eyebrowColor: 'text-[#7756D9] dark:text-[#A78BFA]',
          eyebrowBg: 'bg-[#7756D9]/10 dark:bg-[#7756D9]/20 border-[#7756D9]/30 dark:border-[#7756D9]/40',
          headlineColor: 'text-[#29213D] dark:text-[#FAF5FF]',
          descColor: 'text-[#584F70] dark:text-[#A79CBF]',
          benefitBg: 'bg-white/95 dark:bg-[#18102B]/90 border-[#E4E9E1] dark:border-[#2C1C4E] text-[#29213D] dark:text-[#FAF5FF] shadow-xs',
          benefitDesc: 'text-[#68736B] dark:text-[#A79CBF]',
          primaryBtn: 'bg-[#7756D9] hover:bg-[#6343c7] text-white font-bold shadow-[0_4px_24px_rgba(119,86,217,0.35)]',
          secondaryBtn: 'border-[#E4E9E1] dark:border-[#2C1C4E] bg-white/80 dark:bg-[#18102B]/80 hover:bg-white dark:hover:bg-[#251942] text-[#29213D] dark:text-[#FAF5FF] backdrop-blur-sm',
          mockupShadow: 'shadow-[0_24px_64px_rgba(119,86,217,0.14)] dark:shadow-[0_24px_64px_rgba(119,86,217,0.25)]'
        };
      case 'hr':
      default:
        return {
          containerBg: 'bg-[#F4F8F4] dark:bg-[#07170E] text-[#17251D] dark:text-[#E8F5EB]',
          gridStroke: 'rgba(46, 139, 69, 0.08)',
          glowPrimary: 'rgba(46, 139, 69, 0.22)',
          glowSecondary: 'rgba(101, 201, 75, 0.15)',
          eyebrowColor: 'text-[#278642] dark:text-[#65C94B]',
          eyebrowBg: 'bg-[#278642]/10 dark:bg-[#278642]/20 border-[#278642]/30 dark:border-[#278642]/40',
          headlineColor: 'text-[#10271D] dark:text-[#F2F8F4]',
          descColor: 'text-[#566359] dark:text-[#9FB1A5]',
          benefitBg: 'bg-white/95 dark:bg-[#0D2115]/90 border-[#E4E9E1] dark:border-[#1A3D27] text-[#17251D] dark:text-[#F2F8F4] shadow-xs',
          benefitDesc: 'text-[#68736B] dark:text-[#9FB1A5]',
          primaryBtn: 'bg-[#278642] hover:bg-[#206f36] text-white font-bold shadow-[0_4px_24px_rgba(39,134,66,0.35)]',
          secondaryBtn: 'border-[#E4E9E1] dark:border-[#1A3D27] bg-white/80 dark:bg-[#0D2115]/80 hover:bg-white dark:hover:bg-[#163823] text-[#17251D] dark:text-[#F2F8F4] backdrop-blur-sm',
          mockupShadow: 'shadow-[0_24px_64px_rgba(39,134,66,0.12)] dark:shadow-[0_24px_64px_rgba(39,134,66,0.25)]'
        };
    }
  };

  const theme = getHeroThemeStyles();
  const isDarkTheme = false;

  return (
    <section
      id="hero"
      aria-label="Product Showcase Hero"
      className={`relative pt-6 pb-20 md:pt-10 md:pb-28 transition-colors duration-700 ease-out ${theme.containerBg} overflow-hidden`}
    >
      {/* Background Subtle Tech Matrix Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke={theme.gridStroke}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Luminous Ambient Glows */}
      <div
        className="absolute top-1/4 -right-20 w-[550px] h-[550px] rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.glowPrimary }}
      />
      <div
        className="absolute -bottom-10 left-10 w-[480px] h-[480px] rounded-full blur-[100px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.glowSecondary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* CENTRAL HERO PIECE: THE THREE-PRODUCT COMMAND DOCK        */}
        {/* ========================================================= */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
                Central Product Console
              </span>
              <span className="hidden sm:inline text-[11px] text-neutral-400">·</span>
              <span className="hidden sm:inline text-[11px] text-neutral-500 font-mono">
                Click any product to switch preview
              </span>
            </div>

            {/* Autoplay & Control Pill */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors text-neutral-600 dark:text-neutral-300"
                aria-label={isAutoplay ? 'Pause auto-cycling between products' : 'Resume auto-cycling between products'}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3 h-3 text-neutral-500" />
                    <span>Auto-cycling (8s)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-neutral-500" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3 Prominent Product Cards / Command Rail */}
          <div
            role="tablist"
            aria-label="Select Ravo Product"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-2 bg-[#F1F5F9]/80 dark:bg-[#111827]/80 backdrop-blur-md rounded-2xl border border-[#CBD5E1]/80 dark:border-[#1E293B] shadow-xs"
          >
            {[
              {
                id: 'hr' as ProductId,
                name: 'Ravo HR',
                subtitle: 'People Operations & Payroll',
                icon: Users,
                activeBorder: 'border-2 border-[#278642] dark:border-[#2E8B45] ring-2 ring-[#278642]/20 dark:ring-[#2E8B45]/30 shadow-md bg-white dark:bg-[#0D2115]',
                activeIconBg: 'bg-[#E8F5EB] dark:bg-[#163823] text-[#278642] dark:text-[#65C94B] border border-[#278642]/20 dark:border-[#278642]/40',
                activeSubtitle: 'text-[#278642] dark:text-[#65C94B] font-semibold',
                activeBadge: 'bg-[#E8F5EB] dark:bg-[#163823] text-[#278642] dark:text-[#65C94B] border-[#278642]/30 dark:border-[#278642]/50',
                progressBg: 'bg-[#278642] dark:bg-[#65C94B]',
                progressTrack: 'bg-[#278642]/20 dark:bg-[#65C94B]/20'
              },
              {
                id: 'fuel' as ProductId,
                name: 'Ravo Fuel',
                subtitle: 'Station Operations Platform',
                icon: Fuel,
                activeBorder: 'border-2 border-[#0284C7] ring-2 ring-[#0284C7]/20 dark:ring-[#0284C7]/30 shadow-md bg-white dark:bg-[#0C1E30]',
                activeIconBg: 'bg-[#EFF6FF] dark:bg-[#081F33] text-[#0284C7] dark:text-[#38BDF8] border border-[#0284C7]/20 dark:border-[#0284C7]/40',
                activeSubtitle: 'text-[#0284C7] dark:text-[#38BDF8] font-semibold',
                activeBadge: 'bg-[#EFF6FF] dark:bg-[#081F33] text-[#0284C7] dark:text-[#38BDF8] border-[#0284C7]/30 dark:border-[#0284C7]/50',
                progressBg: 'bg-[#0284C7] dark:bg-[#38BDF8]',
                progressTrack: 'bg-[#0284C7]/20 dark:bg-[#38BDF8]/20'
              },
              {
                id: 'pos' as ProductId,
                name: 'Ravo POS',
                subtitle: 'Bakery & Food Sales',
                icon: ShoppingBag,
                activeBorder: 'border-2 border-[#7756D9] ring-2 ring-[#7756D9]/20 dark:ring-[#7756D9]/30 shadow-md bg-white dark:bg-[#18102B]',
                activeIconBg: 'bg-[#F3EEFF] dark:bg-[#231540] text-[#7756D9] dark:text-[#A78BFA] border border-[#7756D9]/20 dark:border-[#7756D9]/40',
                activeSubtitle: 'text-[#7756D9] dark:text-[#A78BFA] font-semibold',
                activeBadge: 'bg-[#F3EEFF] dark:bg-[#231540] text-[#7756D9] dark:text-[#A78BFA] border-[#7756D9]/30 dark:border-[#7756D9]/50',
                progressBg: 'bg-[#7756D9] dark:bg-[#A78BFA]',
                progressTrack: 'bg-[#7756D9]/20 dark:bg-[#A78BFA]/20'
              }
            ].map((tab) => {
              const isActive = activeProductId === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => handleManualSelect(tab.id)}
                  className={`w-full min-h-[76px] p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                    isActive
                      ? tab.activeBorder
                      : 'bg-white/70 dark:bg-[#1E293B]/60 hover:bg-white dark:hover:bg-[#1E293B] border border-[#CBD5E1]/60 dark:border-[#334155]/60 hover:border-[#94A3B8] dark:hover:border-[#64748B] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                        isActive
                          ? `${tab.activeIconBg} scale-105 shadow-xs`
                          : 'bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-slate-400 group-hover:scale-105'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-extrabold text-sm sm:text-base block tracking-tight text-[#0F172A] dark:text-[#F8FAFC] truncate">
                        {tab.name}
                      </span>
                      <span
                        className={`text-xs block leading-tight truncate transition-colors ${
                          isActive ? tab.activeSubtitle : 'text-[#64748B] dark:text-[#94A3B8]'
                        }`}
                      >
                        {tab.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Active Indicator Badge */}
                  {isActive && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 animate-in fade-in duration-150 ${tab.activeBadge}`}
                    >
                      Active
                    </span>
                  )}

                  {/* Autoplay Active Progress Line */}
                  {isActive && isAutoplay && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${tab.progressTrack}`}>
                      <div
                        className={`h-full ${tab.progressBg} transition-all duration-100 ease-linear`}
                        style={{ width: `${autoplayProgress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2-COLUMN SPLIT: STORYTELLING & REALISTIC DASHBOARD VIEW   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Narrative, CTAs, Benefits (5 cols) */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-300 ease-out ${
              isTransitioning ? 'opacity-70 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Dynamic Product Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold tracking-wide border uppercase transition-all duration-300 backdrop-blur-sm shadow-xs ${theme.eyebrowBg} ${theme.eyebrowColor}`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{currentProduct.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08] transition-all duration-300 ${theme.headlineColor}`}
              style={{ textWrap: 'balance' }}
            >
              {currentProduct.headline}
            </h1>

            {/* Description */}
            <p className={`text-base sm:text-lg leading-relaxed transition-all duration-300 ${theme.descColor}`}>
              {currentProduct.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  onExploreProduct
                    ? onExploreProduct(activeProductId)
                    : onSelectProduct(activeProductId)
                }
                className={`group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer ${theme.primaryBtn}`}
              >
                <span>{currentProduct.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-150" />
              </button>

              <button
                type="button"
                onClick={() => onOpenDemo(activeProductId)}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:shadow-xs active:scale-[0.98] whitespace-nowrap cursor-pointer ${theme.secondaryBtn}`}
              >
                <Calendar className="w-4 h-4 opacity-75" />
                <span>{currentProduct.secondaryCta}</span>
              </button>
            </div>

            {/* Three Compact Product-Benefit Indicators */}
            <div className="pt-6 border-t border-black/5 dark:border-white/10 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                Operational Advantages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentProduct.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-left transition-all hover:border-[#2E8B45]/40 hover:-translate-y-0.5 duration-200 ${theme.benefitBg}`}
                  >
                    <div
                      className="flex items-center gap-1.5 text-xs font-bold mb-1"
                      style={{ color: currentProduct.primaryColor }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{benefit.title}</span>
                    </div>
                    <p className={`text-[11px] leading-snug line-clamp-2 ${theme.benefitDesc}`}>
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Layered Dashboard Showcase (7 cols) */}
          <div
            className="lg:col-span-7 relative"
            id={`panel-${activeProductId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeProductId}`}
          >
            {/* Layered Showcase Wrapper with 3D Depth Shadow */}
            <div
              className={`rounded-2xl transition-all duration-300 ease-out transform ${theme.mockupShadow} ${
                isTransitioning ? 'opacity-85 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              {activeProductId === 'hr' && <HRDashboardMockup />}
              {activeProductId === 'fuel' && <FuelDashboardMockup />}
              {activeProductId === 'pos' && <POSDashboardMockup />}
            </div>

            {/* Floating Top Contextual Companion Badge */}
            <div
              className={`hidden md:flex items-center gap-2 absolute -top-4 -right-4 px-3.5 py-1.5 rounded-full border shadow-xl backdrop-blur-md text-xs font-semibold z-20 transition-all ${
                activeProductId === 'fuel'
                  ? 'bg-white/95 dark:bg-[#0C1E30]/95 border-[#0284C7]/30 dark:border-[#0284C7]/50 text-[#0284C7] dark:text-[#38BDF8]'
                  : activeProductId === 'pos'
                  ? 'bg-white/95 dark:bg-[#18102B]/95 border-[#7756D9]/30 dark:border-[#7756D9]/50 text-[#7756D9] dark:text-[#A78BFA]'
                  : 'bg-white/95 dark:bg-[#0D2115]/95 border-[#278642]/30 dark:border-[#278642]/50 text-[#278642] dark:text-[#65C94B]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>
                {activeProductId === 'hr' && 'Live Biometric LAN Bridge Active · 96.4% On Shift'}
                {activeProductId === 'fuel' && 'Station Operations Active · Telemetry Calibrated'}
                {activeProductId === 'pos' && 'Counter Station #01 · Real-time Recipe Depletion'}
              </span>
            </div>

            {/* Floating Bottom Contextual Companion Card */}
            <div
              className="hidden md:flex items-center gap-3 absolute -bottom-5 -left-5 p-3.5 rounded-2xl border border-[#E4E9E1] dark:border-[#1E293B] shadow-xl backdrop-blur-md text-xs z-20 transition-all bg-white/95 dark:bg-[#111827]/95 text-[#17251D] dark:text-[#F8FAFC]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
                style={{ backgroundColor: currentProduct.primaryColor }}
              >
                {activeProductId === 'hr' ? (
                  <Users className="w-4 h-4" />
                ) : activeProductId === 'fuel' ? (
                  <Fuel className="w-4 h-4" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
              </div>
              <div>
                <span className="font-bold text-xs block leading-tight text-[#0F172A] dark:text-[#F8FAFC]">
                  {currentProduct.name} Engine
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block leading-tight mt-0.5">
                  {currentProduct.availabilityNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
