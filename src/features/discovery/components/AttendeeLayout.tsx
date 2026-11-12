import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Ticket, User, Bell } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const AttendeeLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: "Explore", path: "/events", icon: Compass },
    { label: "My Tickets", path: "/tickets", icon: Ticket },
    { label: "Profile", path: "/profile", icon: User },
  ];

  // Hide the bottom tab bar if we are viewing a single event details page (e.g., /events/123)
  const isEventDetailView = location.pathname.startsWith("/events/") && location.pathname !== "/events";

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={() => navigate("/events")}
            className="flex items-center gap-2 cursor-pointer font-extrabold tracking-tight text-lg"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              R
            </div>
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Randevu
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
            >
              <Bell className="h-4 w-4" />
            </button>

            <div 
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2.5 pl-2 border-l border-neutral-800 cursor-pointer"
            >
              <div className="h-9 w-9 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center text-xs font-bold text-white">
                {user?.email?.[0].toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Bottom Floating Tab Bar (Hidden on single event details pages) */}
      {!isEventDetailView && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
          <nav className="flex items-center justify-around rounded-full border border-neutral-800 bg-neutral-900/90 p-1.5 backdrop-blur-xl shadow-2xl shadow-black/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold transition-all ${
                    isActive ? "text-neutral-950 font-bold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="attendeeTabIndicator"
                      className="absolute inset-0 rounded-full bg-white shadow-md"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className={`relative z-10 h-4 w-4 ${isActive ? "text-neutral-950" : "text-neutral-400"}`} />
                  <span className="relative z-10 hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default AttendeeLayout;