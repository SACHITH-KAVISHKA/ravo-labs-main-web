import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms'>(initialTab);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length > 0) {
            focusables[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#111827] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#E4E9E1] dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative text-[#17251D] dark:text-[#F8FAFC] transition-colors duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#68736B] dark:text-[#94A3B8] hover:text-[#10271D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
          aria-label="Close legal modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-[#278642] dark:text-[#65C94B] bg-[#E8F5EB] dark:bg-[#278642]/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Trust Standards</span>
          </div>
          <h2 id="legal-modal-title" className="text-2xl font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight">
            Ravo Labs Legal & Operational Terms
          </h2>
          <p className="text-xs text-[#566359] dark:text-[#94A3B8] mt-1">
            Engineered with strict data privacy, enterprise isolation, and transparent licensing.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Legal documents"
          className="flex border-b border-[#E4E9E1] dark:border-slate-800 mb-6 gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            className={`min-h-[44px] px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-[#278642] text-[#278642] dark:border-[#65C94B] dark:text-[#65C94B]'
                : 'border-transparent text-[#68736B] dark:text-[#94A3B8] hover:text-[#10271D] dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'terms'}
            onClick={() => setActiveTab('terms')}
            className={`min-h-[44px] px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-[#278642] text-[#278642] dark:border-[#65C94B] dark:text-[#65C94B]'
                : 'border-transparent text-[#68736B] dark:text-[#94A3B8] hover:text-[#10271D] dark:hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'privacy' ? (
          <div className="space-y-4 text-xs text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">1. Zero Third-Party Advertising & Telemetry</h3>
              <p>
                Ravo Labs develops purpose-built enterprise operational software. We never sell, monetize, or broker customer operational data, employee attendance records, fuel tank readings, or POS retail sales data to external advertising networks or data brokers.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">2. Biometric Data & On-Premise LAN Bridges</h3>
              <p>
                In Ravo HR, biometric templates remain strictly on local hardware terminals. Our LAN bridges process irreversible mathematical hashes for time card clock-ins and do not transmit raw biometric images over public clouds.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">3. Offline-First Resilience (Ravo POS & Fuel)</h3>
              <p>
                Local registers and station consoles operate with encrypted on-device storage. When offline transactions are recorded during network downtime, synchronization occurs directly to customer-designated tenant databases via TLS 1.3 encryption.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">4. Data Retention & Tenant Ownership</h3>
              <p>
                Customers retain complete ownership of all business records. Upon contract termination, data can be exported in standardized relational formats (CSV/JSON/SQL) with complete cryptographic purge from active clusters within 30 days.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-[#566359] dark:text-[#94A3B8] leading-relaxed">
            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">1. Commercial Scope & Licensing</h3>
              <p>
                Ravo Labs software licenses are granted based on your specified operational scope (e.g. employee count tiers in Ravo HR, active nozzles in Ravo Fuel, and counter terminals in Ravo POS). Licenses include security patches and core system updates.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">2. Implementation & Calibration Commitments</h3>
              <p>
                Each Ravo product deployment includes structured configuration and calibration walkthroughs. Tank ullage tables in Ravo Fuel and menu taxonomies in Ravo POS are calibrated against customer hardware before live operational sign-off.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">3. Service Level Agreements (SLA)</h3>
              <p>
                Critical infrastructure modules—including real-time pump totalizer monitoring and counter checkout billing—are engineered for 99.9% uptime with offline fallback buffers to eliminate customer downtime.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#10271D] dark:text-[#F8FAFC] mb-1">4. Custom Adaptations & Extensions</h3>
              <p>
                Custom payroll formulas, specialized receipt printers, and external ERP integration bridges remain supported under active software maintenance agreements.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-[#E4E9E1] dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[#278642] dark:text-[#65C94B]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published by Ravo Labs Legal & Compliance</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#10271D] dark:bg-[#278642] hover:bg-[#183a2c] dark:hover:bg-[#2e9d4e] rounded-xl transition-colors min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
