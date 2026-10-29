import React from "react";
import { Ticket, DollarSign, Eye } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export const AnalyticsCards: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {/* 1. Tickets Sold Card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-neutral-700"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <Ticket className="h-4 w-4 text-neutral-500" />
          <span>Tickets sold</span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1 text-2xl font-extrabold text-white">
            500<span className="text-sm font-semibold text-neutral-500">/500</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400">+220 (+156%)</span>
        </div>

        {/* Animated Neon Green Equalizer Bars */}
        <div className="mt-6 flex h-14 items-end gap-1.5 overflow-hidden">
          {[20, 32, 40, 28, 44, 38, 48, 42, 44, 40, 48, 44].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}px` }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.05 + i * 0.03,
              }}
              className="flex-1 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]"
            />
          ))}
        </div>
      </motion.div>

      {/* 2. Revenue Card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-neutral-700"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <DollarSign className="h-4 w-4 text-neutral-500" />
          <span>Revenue</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-extrabold text-white">$2,000</div>
          <span className="text-[11px] font-semibold text-emerald-400">+$850 (+156%)</span>
        </div>

        {/* Animated Amber Bars */}
        <div className="mt-6 flex h-14 items-end gap-1.5 overflow-hidden">
          {[16, 24, 32, 28, 38, 36, 44, 38, 34, 30, 24, 18].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}px` }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1 + i * 0.03,
              }}
              className={`flex-1 rounded-full ${
                i > 7
                  ? "bg-amber-700/40"
                  : "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* 3. Page Visits Card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-neutral-700 sm:col-span-2 lg:col-span-1"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <Eye className="h-4 w-4 text-neutral-500" />
          <span>Page visits</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-extrabold text-white">368</div>
          <span className="text-[11px] font-semibold text-rose-500">-176 (-56%)</span>
        </div>

        {/* Animated Cyan Path Curve */}
        <div className="mt-6 flex h-14 w-full items-center">
          <svg viewBox="0 0 200 60" className="h-full w-full overflow-visible" fill="none">
            <motion.path
              d="M0 45 C 30 45, 40 25, 60 40 C 80 55, 90 50, 110 40 C 130 30, 140 10, 160 20 C 180 30, 190 45, 200 45"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
              className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};