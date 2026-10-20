import React from 'react';

interface EventFiltersProps {
  locationValue: string;
  onClearLocation: () => void;
  dateValue: string;
  onDateChange: (newDate: string) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  locationValue,
  onClearLocation,
  dateValue,
  onDateChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Location Filter Pill */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-[#141416]/90 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition hover:border-neutral-700">
        {/* Pin Icon */}
        <div className="flex items-center justify-center rounded-full bg-neutral-800/80 p-1 text-neutral-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          </svg>
        </div>

        <span>{locationValue || 'All Locations'}</span>

        {/* Clear Action (x) */}
        {locationValue && (
          <button
            type="button"
            onClick={onClearLocation}
            className="ml-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Clear location filter"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Date Filter Pill */}
      <label className="relative inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-[#141416]/90 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition hover:border-neutral-700 cursor-pointer">
        {/* Calendar Icon */}
        <div className="flex items-center justify-center rounded-full bg-neutral-800/80 p-1 text-neutral-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        <span>{dateValue}</span>

        {/* Vertical Up/Down Arrows */}
        <div className="flex flex-col text-neutral-400 -space-y-1">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Hidden Native Date Input Overlaid for Easy Selection */}
        <input
          type="date"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            if (e.target.value) {
              // Convert "YYYY-MM-DD" to "DD/MM/YYYY" format seen in design
              const [y, m, d] = e.target.value.split('-');
              onDateChange(`${d}/${m}/${y}`);
            }
          }}
        />
      </label>
    </div>
  );
};

export default EventFilters;