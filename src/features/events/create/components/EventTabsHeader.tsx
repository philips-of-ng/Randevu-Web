import React from "react";
import { motion } from "framer-motion";
import { EventTab } from "../types";

interface Props {
  currentTab: EventTab;
  onTabChange: (tab: EventTab) => void;
}

const TABS: { id: EventTab; label: string }[] = [
  { id: "details", label: "Event details" },
  { id: "appearance", label: "Appearance" },
  { id: "tickets", label: "Ticket info" },
];

export const EventTabsHeader: React.FC<Props> = ({ currentTab, onTabChange }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-full bg-neutral-900/90 p-1 border border-neutral-800">
      {TABS.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors duration-200 ${
              isActive ? "text-neutral-950" : "text-neutral-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};