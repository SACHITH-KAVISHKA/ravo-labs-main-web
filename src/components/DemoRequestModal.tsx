import React, { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ProductId } from '../types';
import { ContactSection } from './ContactSection';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ProductId;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  initialProduct = 'hr'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Save previously focused element to restore when modal closes
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first focusable item after dialog mounts
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
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        // Restore focus
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#111827] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#CBD5E1]/80 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative transition-colors duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F0F7FF] dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
          aria-label="Close demo request modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#0284C7]/20 border border-[#BFDBFE]/60 dark:border-[#0284C7]/30 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
            <span>Guided Product Consultation</span>
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Book a Tailored Demo
          </h2>
          <p id="modal-description" className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
            Experience Ravo HR, Ravo Fuel, or Ravo POS configured for your exact business requirements.
          </p>
        </div>

        {/* Embedded Form with Blue and White Container */}
        <div className="bg-[#F8FAFC] dark:bg-[#0B0F17] rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] dark:border-slate-800">
          <ContactSection
            initialProduct={initialProduct}
            isModal={true}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
};
