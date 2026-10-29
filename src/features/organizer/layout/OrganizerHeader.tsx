import React, { useState } from "react";
import { Search, ChevronDown, Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onOpenMobileSidebar: () => void;
}

export const OrganizerHeader: React.FC<Props> = ({ onOpenMobileSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = user?.fullName || "Joseph Abiodun";

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-neutral-900/80 bg-neutral-950/70 px-4 sm:px-8 backdrop-blur-xl">
      {/* Mobile Menu Toggle & Brand / Greeting */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open mobile menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-300 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <h1 className="text-base sm:text-xl font-bold tracking-tight text-white truncate max-w-[180px] sm:max-w-none">
            Welcome back,{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              {displayName.split(" ")[0]}
            </span>
          </h1>
          <span className="text-[10px] text-neutral-400 lg:hidden">
            Host / Organizer
          </span>
        </motion.div>
      </div>

      {/* Middle: Universal Search Bar (Hidden on compact screens) */}
      <div className="relative mx-4 hidden md:block w-full max-w-sm lg:max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          placeholder="Search events, tickets and guests"
          className="w-full rounded-2xl border border-neutral-800/80 bg-neutral-900/50 py-2.5 pl-11 pr-4 text-xs font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-neutral-600 focus:bg-neutral-900 focus:ring-1 focus:ring-neutral-600"
        />
      </div>

      {/* Right Controls: Quick Create + Organizer Profile */}
      <div className="flex items-center gap-3">
        {/* Create Event Quick Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/organizer/events/create")}
          className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-red-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>New Event</span>
        </motion.button>

        {/* User Pill Dropdown */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-1.5 sm:pr-3 hover:border-neutral-700 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Organizer avatar"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-cover"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold leading-tight text-white truncate max-w-[110px]">
                {displayName}
              </span>
              <span className="text-[10px] font-medium text-neutral-400">
                Host/Organizer
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-neutral-400 hidden sm:block" />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-40 mt-2 w-48 rounded-2xl border border-neutral-800 bg-neutral-950 p-2 shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/organizer/settings");
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  >
                    Organizer Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/organizer/payouts");
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  >
                    Payout Preferences
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};