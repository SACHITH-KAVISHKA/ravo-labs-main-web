import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Users,
  Fuel,
  ShoppingBag,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ProductId } from '../types';
import { PRODUCTS_CONFIG } from '../data/products';
import { ThemeToggle } from './ThemeToggle';

interface SiteHeaderProps {
  onSelectProduct: (id: ProductId) => void;
  onOpenDemo: (product?: ProductId) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onSelectProduct, onOpenDemo }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key and focus trap for mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the first interactive element in the drawer
    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (id: ProductId) => {
    onSelectProduct(id);
    setIsProductsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(`product-${id}`) || document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md shadow-xs border-b border-[#E4E9E1] dark:border-[#1E293B] py-3'
          : 'bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-sm border-b border-[#E4E9E1]/60 dark:border-[#1E293B]/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark & Symbol */}
          <a
            href="#hero"
            className="flex items-center whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded-lg py-0.5"
            aria-label="Ravo Labs Homepage"
          >
            <div className="rounded-lg bg-white/95 dark:bg-white px-2 py-1 shadow-2xs inline-flex items-center">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-16_at_4.08.42_PM_0b82b704.jpeg"
                alt="Ravo Labs"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
          </a>

          {/* Zone 2: Center Navigation Links with Products Dropdown */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#566359] dark:text-[#94A3B8]" aria-label="Main Navigation">
            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                className="flex items-center min-h-[44px] gap-1 hover:text-[#10271D] dark:hover:text-[#F8FAFC] transition-colors px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded"
                aria-expanded={isProductsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180 text-[#2E8B45]' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProductsDropdownOpen && (
                <div
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-[#E4E9E1] dark:border-[#1E293B] p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#68736B] dark:text-[#94A3B8] uppercase tracking-wider">
                    Core Business Software
                  </div>

                  <button
                    onClick={() => handleProductClick('hr')}
                    className="w-full min-h-[44px] flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] dark:hover:bg-[#0F2417] transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5EB] dark:bg-[#0F2417] text-[#278642] dark:text-[#65C94B] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#10271D] dark:text-[#F8FAFC] block">Ravo HR</span>
                      <span className="text-[11px] text-[#68736B] dark:text-[#94A3B8] line-clamp-1">People operations & payroll prep</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleProductClick('fuel')}
                    className="w-full min-h-[44px] flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F7FF] dark:hover:bg-[#0C1E30] transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#0C1E30] text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#10271D] dark:text-[#F8FAFC] block">Ravo Fuel</span>
                      <span className="text-[11px] text-[#68736B] dark:text-[#94A3B8] line-clamp-1">Tank monitoring & pump shift logs</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleProductClick('pos')}
                    className="w-full min-h-[44px] flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F4FF] dark:hover:bg-[#18102B] transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7756D9]"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F3EEFF] dark:bg-[#18102B] text-[#7756D9] dark:text-[#A78BFA] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#10271D] dark:text-[#F8FAFC] block">Ravo POS</span>
                      <span className="text-[11px] text-[#68736B] dark:text-[#94A3B8] line-clamp-1">Bakery, cafe & restaurant sales</span>
                    </div>
                  </button>

                  <div className="pt-2 mt-1 border-t border-[#E4E9E1] dark:border-[#1E293B] px-2 flex items-center justify-between text-[11px]">
                    <a
                      href="#products"
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="min-h-[44px] text-[#2E8B45] dark:text-[#65C94B] font-semibold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded"
                    >
                      <span>Explore all 3 products</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#solutions"
              onClick={() => handleNavClick('solutions')}
              className="min-h-[44px] flex items-center px-1 hover:text-[#10271D] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded"
            >
              Solutions
            </a>

            <a
              href="#why-ravo"
              onClick={() => handleNavClick('why-ravo')}
              className="min-h-[44px] flex items-center px-1 hover:text-[#10271D] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded"
            >
              About Ravo Labs
            </a>

            <a
              href="#faq"
              onClick={() => handleNavClick('faq')}
              className="min-h-[44px] flex items-center px-1 hover:text-[#10271D] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Dark Mode Toggle + Contact Link + Primary CTA Button (Desktop >= 1024px) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Desktop Theme Toggle */}
            <ThemeToggle />

            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className="min-h-[44px] flex items-center px-2 text-xs font-semibold text-[#566359] dark:text-[#94A3B8] hover:text-[#10271D] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] rounded"
            >
              Contact Us
            </a>

            <button
              onClick={() => onOpenDemo()}
              className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-white bg-[#10271D] hover:bg-[#183a2c] dark:bg-[#163823] dark:hover:bg-[#1e4d30] dark:border dark:border-[#278642]/40 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#65C94B]" />
            </button>
          </div>

          {/* Mobile & Tablet Navigation Actions (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => onOpenDemo()}
              className="px-3 py-2 min-h-[44px] text-xs font-semibold text-white bg-[#10271D] hover:bg-[#183a2c] dark:bg-[#163823] dark:border dark:border-[#278642]/40 rounded-xl flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
            >
              Book Demo
            </button>
            <button
              ref={hamburgerBtnRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#10271D] dark:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
              aria-label={isMobileMenuOpen ? 'Toggle navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Fullscreen Portal */}
      {isMobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={drawerRef}
            className="fixed inset-0 bg-white dark:bg-[#0B0F17] text-[#17251D] dark:text-[#F8FAFC] z-[9999] p-6 overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E4E9E1] dark:border-[#1E293B]">
                <div className="flex items-center">
                  <div className="rounded-lg bg-white/95 dark:bg-white px-2 py-1 shadow-2xs inline-flex items-center">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-10-16_at_4.08.42_PM_0b82b704.jpeg"
                      alt="Ravo Labs"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    hamburgerBtnRef.current?.focus();
                  }}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#10271D] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#1E293B] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
                  aria-label="Close mobile navigation drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Product Selector Cards */}
              <div className="space-y-2 mt-6">
                <span className="text-[11px] font-bold text-[#68736B] dark:text-[#94A3B8] uppercase tracking-wider block">
                  Select Core Product
                </span>
                <button
                  onClick={() => handleProductClick('hr')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F2F8F4] dark:bg-[#0F2417] text-left text-sm font-semibold text-[#183124] dark:text-[#E8F5EB] border border-transparent dark:border-[#1A3D27]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5EB] dark:bg-[#163823] text-[#278642] dark:text-[#65C94B] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold">Ravo HR</span>
                      <span className="text-xs font-normal text-[#566359] dark:text-[#94A3B8]">People & Payroll</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#278642] dark:text-[#65C94B]" />
                </button>

                <button
                  onClick={() => handleProductClick('fuel')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F0F7FF] dark:bg-[#0C1E30] text-left text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8] border border-transparent dark:border-[#133252]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#081F33] text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold">Ravo Fuel</span>
                      <span className="text-xs font-normal text-neutral-600 dark:text-[#94A3B8]">Fuel Station Platform</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                </button>

                <button
                  onClick={() => handleProductClick('pos')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F7F4FF] dark:bg-[#18102B] text-left text-sm font-semibold text-[#7756D9] dark:text-[#A78BFA] border border-transparent dark:border-[#2C1C4E]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F3EEFF] dark:bg-[#231540] text-[#7756D9] dark:text-[#A78BFA] flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold">Ravo POS</span>
                      <span className="text-xs font-normal text-neutral-600 dark:text-[#94A3B8]">Bakery & Food Sales</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7756D9] dark:text-[#A78BFA]" />
                </button>
              </div>

              {/* Links */}
              <div className="space-y-3 pt-6 mt-6 border-t border-[#E4E9E1] dark:border-[#1E293B] text-base font-semibold text-[#17251D] dark:text-[#F8FAFC]">
                <a
                  href="#solutions"
                  onClick={() => handleNavClick('solutions')}
                  className="block py-1 hover:text-[#2E8B45] dark:hover:text-[#65C94B]"
                >
                  Solutions
                </a>
                <a
                  href="#why-ravo"
                  onClick={() => handleNavClick('why-ravo')}
                  className="block py-1 hover:text-[#2E8B45] dark:hover:text-[#65C94B]"
                >
                  Why Ravo Labs
                </a>
                <a
                  href="#roadmap"
                  onClick={() => handleNavClick('roadmap')}
                  className="block py-1 hover:text-[#2E8B45] dark:hover:text-[#65C94B]"
                >
                  Product Status & Roadmap
                </a>
                <a
                  href="#faq"
                  onClick={() => handleNavClick('faq')}
                  className="block py-1 hover:text-[#2E8B45] dark:hover:text-[#65C94B]"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  onClick={() => handleNavClick('contact')}
                  className="block py-1 hover:text-[#2E8B45] dark:hover:text-[#65C94B]"
                >
                  Contact Us
                </a>
              </div>

              {/* Mobile Drawer Theme Mode Switcher Row */}
              <div className="pt-6 mt-6 border-t border-[#E4E9E1] dark:border-[#1E293B] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#17251D] dark:text-[#F8FAFC] block">Interface Theme</span>
                  <span className="text-[11px] text-[#68736B] dark:text-[#94A3B8] block">Switch light or dark appearance</span>
                </div>
                <ThemeToggle showLabel={true} />
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-6 border-t border-[#E4E9E1] dark:border-[#1E293B] mt-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-3.5 text-sm font-semibold text-white bg-[#10271D] dark:bg-[#163823] dark:border dark:border-[#278642]/40 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
              >
                <span>Book a Demo Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#65C94B]" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
