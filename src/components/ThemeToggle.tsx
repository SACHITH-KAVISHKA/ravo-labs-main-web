import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = false, className = '' }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B45] ${
        isDark
          ? 'bg-[#1E293B] hover:bg-[#26334D] text-[#F8FAFC] border border-[#334155]'
          : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] border border-[#CBD5E1]/60'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDark}
    >
      <div className="flex items-center gap-2 px-2.5 py-1.5">
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isDark ? (
            <Sun className="w-4 h-4 text-[#FACC15] animate-in zoom-in-75 duration-200" />
          ) : (
            <Moon className="w-4 h-4 text-[#475569] animate-in zoom-in-75 duration-200" />
          )}
        </div>

        {showLabel && (
          <span className="text-xs font-semibold whitespace-nowrap">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        )}
      </div>
    </button>
  );
};
