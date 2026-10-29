import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  QrCode,
  Wallet,
  Users,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { label: "Dashboard", path: "/organizer/dashboard", icon: LayoutDashboard },
  { label: "Events", path: "/organizer/events", icon: CalendarDays },
  { label: "Scanner", path: "/organizer/scanner", icon: QrCode },
  { label: "Payouts", path: "/organizer/payouts", icon: Wallet },
  { label: "Team", path: "/organizer/team", icon: Users },
  { label: "Settings", path: "/organizer/settings", icon: Settings },
];

export const OrganizerSidebar: React.FC<Props> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { logout } = useAuth();

  const sidebarContent = (isMobile: boolean = false) => (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      {/* Top Header & Brand */}
      <div>
        <div className="flex items-center justify-between pb-8 pt-2">
          {!collapsed || isMobile ? (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 font-extrabold text-black shadow-md shadow-amber-500/20">
                R
              </span>
              <span className="font-serif text-xl font-extrabold tracking-tight text-white">
                Randevu
              </span>
            </motion.div>
          ) : (
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 font-extrabold text-black shadow-md shadow-amber-500/20">
              R
            </span>
          )}

          {/* Desktop Toggle or Mobile Close */}
          {isMobile ? (
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2 text-neutral-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-2 text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white ${
                collapsed ? "mx-auto mt-2" : ""
              }`}
            >
              {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (isMobile) setMobileOpen(false);
                }}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-neutral-900/90 text-white shadow-inner"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200"
                  } ${collapsed && !isMobile ? "justify-center px-0" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors ${
                          isActive
                            ? "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                            : "text-neutral-400 group-hover:text-neutral-200"
                        }`}
                      />
                    </motion.div>

                    {(!collapsed || isMobile) && <span>{item.label}</span>}

                    {/* Active Golden Accent Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute right-2.5 h-4 w-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={logout}
        className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-950/20 ${
          collapsed && !isMobile ? "justify-center px-0" : ""
        }`}
      >
        <LogOut className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
        {(!collapsed || isMobile) && <span>Logout</span>}
      </motion.button>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <motion.aside
        layout
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={`hidden lg:flex flex-col justify-between border-r border-neutral-900 bg-neutral-950/80 backdrop-blur-xl relative z-20 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent(false)}
      </motion.aside>

      {/* Mobile Animated Slide-over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="absolute bottom-0 top-0 left-0 w-72 border-r border-neutral-800 bg-neutral-950 shadow-2xl"
            >
              {sidebarContent(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};