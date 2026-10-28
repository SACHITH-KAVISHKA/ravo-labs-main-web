import React, { useState } from 'react';
import { ArrowUp, Mail, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { ProductId } from '../types';
import { LegalModal } from './LegalModal';

interface SiteFooterProps {
  onSelectProduct: (id: ProductId) => void;
  onOpenDemo: (id?: ProductId) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onSelectProduct, onOpenDemo }) => {
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  return (
    <footer className="bg-[#10271D] dark:bg-[#07110C] text-[#F5F5F0] border-t border-[#2E8B45]/20 dark:border-slate-800 font-sans text-xs transition-colors duration-300">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <img
                src="/assets/aistudio/ravoLabs Green Bubble Logo.png"
                alt="Ravo Labs"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Ravo Labs builds connected business software that makes everyday operations simpler. Purpose-built systems for human resources, fuel station operations, and point-of-sale retail.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#65C94B]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Independent Software Engineering Company</span>
            </div>
          </div>

          {/* Product Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Core Products
            </span>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('hr')}
                  className="w-full text-left hover:text-[#65C94B] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#65C94B] rounded"
                >
                  <span className="font-semibold text-white">Ravo HR</span>
                  <span className="text-[10px] text-neutral-400">People & Payroll</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('fuel')}
                  className="w-full text-left hover:text-[#38BDF8] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] rounded"
                >
                  <span className="font-semibold text-white">Ravo Fuel</span>
                  <span className="text-[10px] text-neutral-400">Station Operations</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectProduct('pos')}
                  className="w-full text-left hover:text-[#A78BFA] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78BFA] rounded"
                >
                  <span className="font-semibold text-white">Ravo POS</span>
                  <span className="text-[10px] text-neutral-400">Bakery & Food Sales</span>
                </button>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="hover:text-white transition-colors text-neutral-400 text-[11px] block pt-1"
                >
                  → View Product Status & Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions & Company Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Company & Process
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a href="#why-ravo" className="hover:text-white transition-colors">
                  Why Ravo Labs
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Industry Solutions
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation & Demo Action Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Get Started
            </span>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Experience an interactive demonstration configured for your station, bakery, or corporate team.
            </p>
            <button
              onClick={() => onOpenDemo()}
              className="w-full py-2.5 text-xs font-semibold text-[#10271D] bg-[#65C94B] hover:bg-[#57b640] rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Schedule Guided Demo
            </button>
            <div className="pt-2 text-[11px] text-neutral-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#65C94B]" />
              <span>contact@ravolabs.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800/80 bg-[#0c1e16] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            <span>© {new Date().getFullYear()} Ravo Labs. All rights reserved. Designed with precision for real operations.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => openLegal('privacy')}
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#65C94B] rounded"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => openLegal('terms')}
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#65C94B] rounded"
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#65C94B] hover:text-white transition-colors ml-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#65C94B] rounded"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Operational Legal / Privacy Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
      />
    </footer>
  );
};
