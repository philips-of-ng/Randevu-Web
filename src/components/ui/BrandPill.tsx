import React from 'react';

interface BrandPillProps {
  brandName?: string;
  onMenuToggle?: () => void;
  className?: string;
}

export const BrandPill: React.FC<BrandPillProps> = ({
  brandName = 'Randevu',
  onMenuToggle,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-between gap-3 sm:gap-5 rounded-xl border border-white/10 bg-[#161618] px-3 py-1.5 sm:px-4 sm:py-2 shadow-inner transition hover:border-white/20 shrink-0 ${className}`}
    >
      <span className="font-serif text-base sm:text-lg font-medium tracking-tight text-white select-none">
        {brandName}
      </span>
      <button
        type="button"
        onClick={onMenuToggle}
        aria-label="Toggle navigation menu"
        className="flex flex-col justify-center items-end gap-1 p-1 text-neutral-300 hover:text-white transition-colors cursor-pointer"
      >
        <span className="h-[2px] w-4 sm:w-5 rounded-full bg-current" />
        <span className="h-[2px] w-2.5 sm:w-3.5 rounded-full bg-current" />
      </button>
    </div>
  );
};

export default BrandPill;