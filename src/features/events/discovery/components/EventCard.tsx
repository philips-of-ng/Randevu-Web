import React from 'react';
import { PartyEvent } from '../../create/types';

interface EventCardProps {
  event: PartyEvent;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const isSoldOut = event.status === 'SOLD OUT';
  const isLive = event.status === 'LIVE';

  return (
    <div
      onClick={onClick}
      className="group flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
    >
      {/* Event Flyer / Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-800/80 bg-neutral-900 shadow-lg">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details Container */}
      <div className="mt-3.5 flex flex-col gap-1 px-0.5">
        {/* Title + Status Badge */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-sans text-sm sm:text-base font-semibold text-white tracking-tight truncate">
            {event.title}
          </h3>

          {/* Status Badge */}
          {isSoldOut && (
            <span className="shrink-0 rounded-full bg-red-950/70 border border-red-800/60 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider text-red-500 uppercase">
              Sold Out
            </span>
          )}
          {isLive && (
            <span className="shrink-0 rounded-full bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
              Live
            </span>
          )}
        </div>

        {/* Date */}
        <p className="text-xs text-neutral-400 font-normal">
          {event.date}
        </p>

        {/* Location Pin */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <svg
            className="w-3.5 h-3.5 shrink-0 text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="10" r="3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;