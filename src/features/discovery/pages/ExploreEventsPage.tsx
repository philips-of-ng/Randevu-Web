import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { apiClient } from "../../../lib/api-client";
import EventFilters from "../components/EventFilters";
import EventCard from "../components/EventCard";

interface PublicEvent {
  id: string;
  title: string;
  description: string;
  eventType: string;
  flyerUrl?: string;
  location?: {
    city: string;
    streetAddress: string;
    isVirtual: boolean;
  };
  schedule?: {
    startDate: string;
    type: string;
  };
  status?: string;
  capacity?: number;
  ticketsSold?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const ExploreEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Live Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("Select Date");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch real events from database API endpoint GET /events
  useEffect(() => {
    const fetchDatabaseEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get("/events");
        console.log("RAW EVENTS API RESPONSE:", response.data); // <-- Check this in F12 console

        // Support multiple backend response structures (response.data, response.data.events, response.data.data)
        const rawData =
          response.data.events || response.data.data || response.data || [];
        setEvents(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.error("Failed to fetch database events:", err);
        setError("Could not load events from database.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabaseEvents();
  }, []);

  // Dynamically extract unique event categories from database records
  const categories = useMemo(() => {
    const cats = events.map((e) => e.eventType).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [events]);

  // Filter the live database events based on user input
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesCategory =
        selectedCategory === "All" || evt.eventType === selectedCategory;

      const matchesSearch =
        evt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const eventCity =
        evt.location?.city || (evt.location?.isVirtual ? "Virtual Event" : "");

      const matchesLocation =
        !locationFilter ||
        locationFilter === "All Locations" ||
        eventCity.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesDate =
        dateFilter === "Select Date" ||
        (evt.schedule?.startDate &&
          new Date(evt.schedule.startDate).toLocaleDateString() === dateFilter);

      return matchesCategory && matchesSearch && matchesLocation && matchesDate;
    });
  }, [events, selectedCategory, searchQuery, locationFilter, dateFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Filter Controls */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Find scenes that fit
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Discover verified live experiences directly from our database.
            </p>
          </div>

          {/* Database-connected EventFilters Component */}
          <EventFilters
            locationValue={locationFilter}
            onClearLocation={() => setLocationFilter("")}
            dateValue={dateFilter}
            onDateChange={(newDate) => setDateFilter(newDate)}
          />
        </div>

        {/* Global Keyword Search Bar */}
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search database by title, keyword..."
            className="w-full rounded-2xl border border-neutral-800 bg-[#141416]/90 py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium text-white placeholder-neutral-500 outline-none focus:border-neutral-600 shadow-sm"
          />
        </div>
      </div>

      {/* Dynamic Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-white text-black shadow-sm"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Database Feed Grid */}
      {isLoading ? (
        <div className="text-center py-28 text-neutral-400 text-xs font-semibold">
          Fetching live experiences from database...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-rose-500 text-xs font-semibold">
          {error}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/40 py-20 px-4 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400">
                <Sparkles className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">
                No database records found
              </h3>
              <p className="mt-1 text-xs text-neutral-500 max-w-sm">
                Try clearing your location or date filters to view available
                listings.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredEvents.map((evt) => {
                // Determine live status badges based on database metrics or flags
                const isSoldOut =
                  (evt.capacity &&
                    evt.ticketsSold &&
                    evt.ticketsSold >= evt.capacity) ||
                  false;

                const cardProps = {
                  id: evt.id,
                  title: evt.title,
                  date: evt.schedule?.startDate
                    ? new Date(evt.schedule.startDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : "Date TBA",
                  location:
                    evt.location?.city ||
                    (evt.location?.isVirtual
                      ? "Virtual Event"
                      : "Location TBA"),
                  image:
                    evt.flyerUrl ||
                    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
                  status: isSoldOut ? ("SOLD OUT" as const) : ("LIVE" as const),
                };

                return (
                  <motion.div key={evt.id} variants={cardVariants}>
                    <EventCard
                      event={cardProps}
                      onClick={() => navigate(`/events/${evt.id}`)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ExploreEventsPage;
