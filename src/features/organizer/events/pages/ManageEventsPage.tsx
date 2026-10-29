import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  MoreVertical,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";

type EventStatus = "all" | "published" | "draft" | "past";

interface OrganizerEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  status: "published" | "draft" | "past";
  ticketsSold: number;
  totalCapacity: number;
  revenue: number;
  flyerUrl: string;
}

const SAMPLE_EVENTS: OrganizerEvent[] = [
  {
    id: "evt-101",
    title: "Amapiano & Tequila Sunset Grooves",
    category: "Nightlife",
    date: "Nov 14, 2026",
    time: "8:00 PM",
    location: "Victoria Island, Lagos",
    isVirtual: false,
    status: "published",
    ticketsSold: 342,
    totalCapacity: 500,
    revenue: 3420,
    flyerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "evt-102",
    title: "Tech Pulse 2026: Founders & Builders Mixer",
    category: "Conference",
    date: "Nov 22, 2026",
    time: "10:00 AM",
    location: "Bodija, Ibadan",
    isVirtual: false,
    status: "published",
    ticketsSold: 128,
    totalCapacity: 200,
    revenue: 1920,
    flyerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "evt-103",
    title: "Neon Carnival: Sound & Light Rave",
    category: "Carnival",
    date: "Dec 05, 2026",
    time: "9:00 PM",
    location: "Eko Atlantic, Lagos",
    isVirtual: false,
    status: "draft",
    ticketsSold: 0,
    totalCapacity: 1200,
    revenue: 0,
    flyerUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "evt-104",
    title: "Sunset Rooftop Acoustics & Wine",
    category: "Party",
    date: "Oct 10, 2026",
    time: "6:00 PM",
    location: "Lekki Phase 1, Lagos",
    isVirtual: false,
    status: "past",
    ticketsSold: 250,
    totalCapacity: 250,
    revenue: 5000,
    flyerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const ManageEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EventStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return SAMPLE_EVENTS.filter((evt) => {
      const matchesTab = activeTab === "all" || evt.status === activeTab;
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const stats = useMemo(() => {
    const totalEvents = SAMPLE_EVENTS.length;
    const active = SAMPLE_EVENTS.filter((e) => e.status === "published").length;
    const totalRevenue = SAMPLE_EVENTS.reduce((sum, e) => sum + e.revenue, 0);
    const totalSold = SAMPLE_EVENTS.reduce((sum, e) => sum + e.ticketsSold, 0);
    return { totalEvents, active, totalRevenue, totalSold };
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            My Events
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Create, monitor ticketing volumes, and manage your live listings.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/organizer/events/create")}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-rose-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Event</span>
        </motion.button>
      </div>

      {/* Mini Performance Snapshot Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
          <span className="text-[11px] font-medium text-neutral-400">Total Events</span>
          <p className="mt-1 text-xl font-extrabold text-white">{stats.totalEvents}</p>
        </div>
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
          <span className="text-[11px] font-medium text-neutral-400">Live / Active</span>
          <p className="mt-1 text-xl font-extrabold text-emerald-400">{stats.active}</p>
        </div>
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
          <span className="text-[11px] font-medium text-neutral-400">Tickets Distributed</span>
          <p className="mt-1 text-xl font-extrabold text-white font-mono">{stats.totalSold}</p>
        </div>
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
          <span className="text-[11px] font-medium text-neutral-400">Gross Sales</span>
          <p className="mt-1 text-xl font-extrabold text-amber-400 font-mono">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter Tabs + Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Pills */}
        <div className="flex w-fit rounded-full border border-neutral-800 bg-neutral-900/60 p-1 text-xs">
          {(
            [
              { id: "all", label: "All" },
              { id: "published", label: "Published" },
              { id: "draft", label: "Drafts" },
              { id: "past", label: "Past" },
            ] as { id: EventStatus; label: string }[]
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-4 py-2 font-semibold transition-colors ${
                  isActive ? "text-neutral-950 font-bold" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeEventTab"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by title, city..."
            className="w-full rounded-full border border-neutral-800/80 bg-neutral-900/60 py-2.5 pl-9 pr-4 text-xs font-medium text-white placeholder-neutral-500 outline-none focus:border-neutral-600 focus:bg-neutral-900"
          />
        </div>
      </div>

      {/* Events Grid */}
      <AnimatePresence mode="wait">
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/40 py-16 px-4 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400">
              <Calendar className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-white">No events found</h3>
            <p className="mt-1 text-xs text-neutral-500 max-w-sm">
              Try adjusting your search criteria or switch to another tab filter.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEvents.map((evt) => {
              const percentSold = Math.round((evt.ticketsSold / evt.totalCapacity) * 100);

              return (
                <motion.div
                  key={evt.id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-4 transition-colors hover:border-neutral-700/80 hover:bg-neutral-900/60"
                >
                  {/* Top Image & Badge */}
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-950">
                      <img
                        src={evt.flyerUrl}
                        alt={evt.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Status Tag */}
                      <span
                        className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide backdrop-blur-md ${
                          evt.status === "published"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : evt.status === "draft"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-neutral-800/80 text-neutral-400 border border-neutral-700"
                        }`}
                      >
                        {evt.status.toUpperCase()}
                      </span>

                      {/* Category Chip */}
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-200 backdrop-blur-md border border-white/10">
                        {evt.category}
                      </span>
                    </div>

                    {/* Metadata Header */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-base font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {evt.title}
                        </h4>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuId(activeMenuId === evt.id ? null : evt.id)
                            }
                            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {/* Quick Menu Popover */}
                          <AnimatePresence>
                            {activeMenuId === evt.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-30"
                                  onClick={() => setActiveMenuId(null)}
                                />
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute right-0 top-full z-40 mt-1 w-36 rounded-xl border border-neutral-800 bg-neutral-950 p-1.5 shadow-xl"
                                >
                                  <button
                                    type="button"
                                    onClick={() => navigate(`/organizer/events/create`)}
                                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white"
                                  >
                                    Edit Details
                                  </button>
                                  <button
                                    type="button"
                                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white"
                                  >
                                    View Guestlist
                                  </button>
                                  <button
                                    type="button"
                                    className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30"
                                  >
                                    Cancel Event
                                  </button>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Calendar className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>
                          {evt.date} • {evt.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <MapPin className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticketing Progress & Metrics */}
                  <div className="mt-5 border-t border-neutral-800/80 pt-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-400">Sales Progress</span>
                      <span className="font-mono font-bold text-white">
                        {evt.ticketsSold} / {evt.totalCapacity} ({percentSold}%)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentSold}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-neutral-500">Gross Revenue</span>
                      <span className="font-mono font-extrabold text-white">
                        ${evt.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageEventsPage;