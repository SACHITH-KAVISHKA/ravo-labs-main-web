import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onLearnMore?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onLearnMore }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-[#10271D] dark:bg-[#06120D] text-white text-xs py-2 px-4 border-b border-[#2E8B45]/30 dark:border-[#2E8B45]/40 relative z-50 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#65C94B] bg-[#2E8B45]/20 px-2 py-0.5 rounded text-[11px]">
            <Sparkles className="w-3 h-3" /> New Release
          </span>
          <span className="text-neutral-200">
            Explore the newly upgraded <strong className="text-white font-semibold">Ravo Fuel Shift Reconciliation Engine</strong> & <strong className="text-white font-semibold">Ravo POS Quick-Billing</strong>.
          </span>
          <a
            href="#products"
            onClick={onLearnMore}
            className="inline-flex items-center min-h-[44px] py-1 gap-1 font-medium text-[#65C94B] hover:text-white underline underline-offset-2 ml-1 text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C94B] rounded"
          >
            <span>View Family</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-11 h-11 min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-neutral-400 hover:text-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C94B]"
          aria-label="Dismiss announcement banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
