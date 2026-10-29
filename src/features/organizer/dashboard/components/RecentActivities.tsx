import React from "react";
import { Ticket, MessageSquare, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Activity {
  id: string;
  type: "purchase" | "feedback" | "checkin";
  title: string;
  subtitle: string;
  amount?: string;
  time: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "purchase",
    title: "New ticket purchase",
    subtitle: "General admission • 2 tickets",
    amount: "+$100",
    time: "10 minutes ago",
  },
  {
    id: "2",
    type: "purchase",
    title: "New ticket purchase",
    subtitle: "Table/Group • 1 ticket",
    amount: "+$200",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "feedback",
    title: "Feedback",
    subtitle: "@Elena",
    time: "A day ago",
  },
  {
    id: "4",
    type: "checkin",
    title: "Guest checked in",
    subtitle: "@EdwardReal",
    time: "A day ago",
  },
  {
    id: "5",
    type: "purchase",
    title: "New ticket purchase",
    subtitle: "General admission • 2 tickets",
    amount: "+$100",
    time: "10 minutes ago",
  },
  {
    id: "6",
    type: "purchase",
    title: "New ticket purchase",
    subtitle: "Table/Group • 1 ticket",
    amount: "+$200",
    time: "1 hour ago",
  },
];

export const RecentActivities: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Recent activities</h3>
        <span className="text-[11px] font-semibold text-neutral-400 hover:text-white cursor-pointer transition-colors">
          View all
        </span>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        className="space-y-2.5"
      >
        {ACTIVITIES.map((act) => (
          <motion.div
            key={act.id}
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
            }}
            whileHover={{ scale: 1.008 }}
            className="flex items-center justify-between rounded-2xl border border-neutral-800/60 bg-neutral-900/30 p-3 sm:p-4 transition-colors hover:border-neutral-700/80 hover:bg-neutral-900/60"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-800/70 text-neutral-300">
                {act.type === "purchase" && <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />}
                {act.type === "feedback" && <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />}
                {act.type === "checkin" && <Check className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{act.title}</p>
                <p className="text-[11px] text-neutral-400 truncate">{act.subtitle}</p>
              </div>
            </div>

            <div className="text-right shrink-0 pl-3">
              {act.amount && (
                <p className="text-xs font-bold text-white font-mono">{act.amount}</p>
              )}
              <p className="text-[10px] text-neutral-500 whitespace-nowrap">{act.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};