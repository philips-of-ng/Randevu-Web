import React from "react";
import { ChevronDown, Download } from "lucide-react";
import { motion } from "framer-motion";
import { AnalyticsCards } from "../components/AnalyticsCards";
import { RecentActivities } from "../components/RecentActivities";
import { TicketSalesBreakdown } from "../components/TicketSalesBreakdown";

export const DashboardPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Analytics Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-semibold text-white">
          <span className="text-lg sm:text-xl font-extrabold text-white">Analytics</span>

          {/* Time range selector */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs text-neutral-300 hover:border-neutral-600 transition-colors"
          >
            <span>Last 7 Days</span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
          </button>

          {/* Event filter selector */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs text-neutral-300 hover:border-neutral-600 transition-colors"
          >
            <span>All Events</span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
          </button>
        </div>

        {/* Export / Download Report */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-2 text-xs font-bold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download report</span>
        </motion.button>
      </div>

      {/* Main 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left Column: Metric cards & Activities */}
        <div className="space-y-6 sm:space-y-8 lg:col-span-2">
          <AnalyticsCards />
          <RecentActivities />
        </div>

        {/* Right Column: Ticket Sales breakdown */}
        <div className="lg:col-span-1">
          <TicketSalesBreakdown />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;