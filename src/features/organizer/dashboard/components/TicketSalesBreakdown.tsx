import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface TierSale {
  tier: string;
  sold: number;
  color: string;
}

const SALES: TierSale[] = [
  { tier: "General Admission", sold: 126, color: "text-neutral-400 border-neutral-700 shadow-neutral-700/20" },
  { tier: "Early Bird", sold: 95, color: "text-sky-400 border-sky-500/50 shadow-sky-500/20" },
  { tier: "VIP", sold: 85, color: "text-amber-400 border-amber-500/50 shadow-amber-500/20" },
  { tier: "Table/Group", sold: 83, color: "text-purple-400 border-purple-500/50 shadow-purple-500/20" },
  { tier: "Ultra VIP", sold: 64, color: "text-rose-400 border-rose-500/50 shadow-rose-500/20" },
  { tier: "Platinum", sold: 47, color: "text-neutral-300 border-neutral-500 shadow-neutral-500/20" },
];

export const TicketSalesBreakdown: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="h-full rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between"
    >
      <div>
        <h3 className="text-base font-bold text-white mb-5">Tickets sales</h3>

        <div className="space-y-3.5">
          {SALES.map((item, idx) => (
            <motion.div
              key={item.tier}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.1 + idx * 0.04 }}
              whileHover={{ x: 3 }}
              className="flex items-center justify-between py-1 border-b border-neutral-900/60 pb-2.5 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border shadow-sm ${item.color}`}
                >
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <span className="text-xs font-semibold text-neutral-200">{item.tier}</span>
              </div>
              <span className="font-mono text-xs font-bold text-white">{item.sold} sold</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3.5 text-center">
        <span className="text-[11px] text-neutral-400">Total volume distributed:</span>
        <p className="text-lg font-extrabold text-white font-mono mt-0.5">500 Passes</p>
      </div>
    </motion.div>
  );
};