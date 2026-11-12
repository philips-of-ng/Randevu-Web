import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Edit3,
  QrCode,
  Users,
  DollarSign,
  Ticket,
  Eye,
  CheckCircle2,
  Copy,
  ShieldCheck,
  Download,
  Search,
  Plus,
  TrendingUp,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface TicketTier {
  id: string;
  title: string;
  price: number;
  quantity: number;
  sold?: number;
  capacity?: number;
  benefits?: string[];
}

interface Guest {
  id: string;
  name: string;
  email: string;
  ticketTier: string;
  ticketCode: string;
  checkedIn: boolean;
  purchaseDate: string;
}

export const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [copiedLink, setCopiedLink] = useState(false);
  const [guestSearch, setGuestSearch] = useState("");
  const [guestTab, setGuestTab] = useState<"all" | "checked-in" | "pending">(
    "all",
  );

  // API State
  const [eventData, setEventData] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Tier Modal State
  const [showTierModal, setShowTierModal] = useState(false);
  const [newTierTitle, setNewTierTitle] = useState("");
  const [newTierPrice, setNewTierPrice] = useState("");
  const [newTierQty, setNewTierQty] = useState("");

  useEffect(() => {
    const fetchEventCommandCenter = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch event details, analytics, and guest roster in parallel
        const [eventRes, analyticsRes, guestsRes] = await Promise.all([
          apiClient.get(`/events/${eventId}`),
          apiClient.get(`/analytics/event/${eventId}`),
          apiClient.get(`/events/${eventId}/guests`),
        ]);

        const rawEvent = eventRes.data.event || eventRes.data;
        setEventData(rawEvent);
        setAnalytics(analyticsRes.data.analytics || analyticsRes.data);
        setGuests(guestsRes.data.guests || guestsRes.data || []);
        setTiers(rawEvent?.tiers || eventRes.data.tiers || []);
      } catch (err) {
        console.error("Failed to load event details from API:", err);
        setError("Could not load event data. Please verify your connection.");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventCommandCenter();
    }
  }, [eventId]);

  const handleCreateTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTierTitle || !newTierPrice) return;

    try {
      const payload = {
        title: newTierTitle,
        price: parseFloat(newTierPrice),
        quantity: parseInt(newTierQty) || 50,
      };

      const res = await apiClient.post(`/events/${eventId}/tiers`, payload);
      const createdTier = res.data.tier || res.data;
      setTiers([...tiers, createdTier]);

      setNewTierTitle("");
      setNewTierPrice("");
      setNewTierQty("");
      setShowTierModal(false);
    } catch (err) {
      console.error("Failed to create ticket tier:", err);
      alert("Failed to add ticket tier. Please try again.");
    }
  };

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText(`https://randevu.events/e/${eventId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const guestList = Array.isArray(guests) ? guests : [];
  const filteredGuests = guestList.filter((g) => {
    const matchesSearch =
      (g.name && g.name.toLowerCase().includes(guestSearch.toLowerCase())) ||
      (g.email && g.email.toLowerCase().includes(guestSearch.toLowerCase())) ||
      (g.ticketCode &&
        g.ticketCode.toLowerCase().includes(guestSearch.toLowerCase()));

    if (guestTab === "checked-in") return matchesSearch && g.checkedIn;
    if (guestTab === "pending") return matchesSearch && !g.checkedIn;
    return matchesSearch;
  });

  const ticketsSold = analytics?.ticketsSold || 0;
  const totalCapacity = analytics?.totalCapacity || 100;
  const percentageSold =
    totalCapacity > 0 ? Math.round((ticketsSold / totalCapacity) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-neutral-400 text-xs font-semibold">
        Fetching live event data from database...
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3 text-center">
        <p className="text-rose-500 text-sm font-bold">
          {error || "Event not found."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/organizer/events")}
          className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black"
        >
          Return to Events
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-16 max-w-7xl mx-auto"
    >
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate("/organizer/events")}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Events</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyPublicLink}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
          >
            {copiedLink ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-neutral-400" />
            )}
            <span>{copiedLink ? "Link Copied!" : "Copy Share Link"}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/organizer/scanner")}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
          >
            <QrCode className="h-3.5 w-3.5 text-amber-400" />
            <span>Open Scanner</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/organizer/events/create")}
            className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Event</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8 backdrop-blur-xl">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left: Flyer Preview */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl lg:col-span-5 bg-neutral-950">
            {eventData.flyerUrl ? (
              <img
                src={eventData.flyerUrl}
                alt={eventData.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-600 text-xs">
                No Flyer Uploaded
              </div>
            )}
            <span className="absolute top-3 left-3 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-400 backdrop-blur-md">
              LIVE & ON SALE
            </span>
            <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {eventData.eventType || "Event"}
            </span>
          </div>

          {/* Right: Key Event Details */}
          <div className="space-y-5 lg:col-span-7">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-500">
                EVENT ID: {eventId}
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {eventData.title}
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-3">
                <Calendar className="h-4 w-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">
                    {eventData.schedule?.startDate
                      ? new Date(
                          eventData.schedule.startDate,
                        ).toLocaleDateString()
                      : "Date TBA"}
                  </p>
                  <p className="text-[11px] text-neutral-400">Scheduled Date</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-3">
                <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="font-bold text-white uppercase">
                    {eventData.schedule?.type || "One-time"}
                  </p>
                  <p className="text-[11px] text-neutral-400">Schedule Type</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-3 sm:col-span-2">
                <MapPin className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">
                    {eventData.location?.city || "Virtual Event Location"}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {eventData.location?.streetAddress},{" "}
                    {eventData.location?.stateCountry}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {eventData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span>Gross Revenue</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-white font-mono">
            ${analytics?.grossRevenue?.toLocaleString() || "0"}
          </p>
          <span className="text-[10px] font-semibold text-emerald-400">
            12% platform fee accounted
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Ticket className="h-4 w-4 text-amber-400" />
            <span>Capacity Sold</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1 text-2xl font-extrabold text-white font-mono">
            {ticketsSold}
            <span className="text-xs text-neutral-500 font-sans">
              /{totalCapacity} ({percentageSold}%)
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              style={{ width: `${percentageSold}%` }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Users className="h-4 w-4 text-sky-400" />
            <span>Guests Checked-in</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-white font-mono">
            {analytics?.checkInCount || 0}
            <span className="text-xs text-neutral-500 font-sans">
              /{ticketsSold}
            </span>
          </p>
          <span className="text-[10px] text-neutral-400">
            Via scanner verification
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span>Net Payout</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-emerald-400 font-mono">
            ${analytics?.netPayout?.toLocaleString() || "0"}
          </p>
          <span className="text-[10px] text-neutral-400">
            Take-home post platform fee
          </span>
        </div>
      </div>

      {/* Ticket Tiers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Ticket Tiers & Capacities
          </h2>
          <button
            type="button"
            onClick={() => setShowTierModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add Tier
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-5 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {tier.title}
                  </h3>
                  <span className="font-mono text-base font-extrabold text-amber-400">
                    ${tier.price}
                  </span>
                </div>
                <div className="mt-4 space-y-1 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="font-mono font-bold text-white">
                      {tier.quantity} seats
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guestlist & Attendee Roster Section */}
      <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-md space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Attendee Roster</h2>
            <p className="text-xs text-neutral-400">
              Live guest admissions and digital passes issued for this event.
            </p>
          </div>
          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit rounded-full border border-neutral-800 bg-neutral-950 p-1 text-xs">
            {(
              [
                { id: "all", label: "All Passes" },
                { id: "checked-in", label: "Checked In" },
                { id: "pending", label: "Pending" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGuestTab(tab.id)}
                className={`rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
                  guestTab === tab.id
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={guestSearch}
              onChange={(e) => setGuestSearch(e.target.value)}
              placeholder="Search by name, email..."
              className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-4 text-xs font-medium text-white placeholder-neutral-500 outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800/80 text-neutral-400">
                <th className="pb-3 font-semibold">Attendee</th>
                <th className="pb-3 font-semibold">Ticket Tier</th>
                <th className="pb-3 font-semibold">Pass Code</th>
                <th className="pb-3 font-semibold">Purchased</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-neutral-500">
                    No guests found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr
                    key={guest.id}
                    className="hover:bg-neutral-900/40 transition-colors"
                  >
                    <td className="py-3">
                      <p className="font-bold text-white">{guest.name}</p>
                      <p className="text-[11px] text-neutral-400">
                        {guest.email}
                      </p>
                    </td>
                    <td className="py-3 text-neutral-300 font-medium">
                      {guest.ticketTier}
                    </td>
                    <td className="py-3 font-mono font-semibold text-neutral-300">
                      {guest.ticketCode || "N/A"}
                    </td>
                    <td className="py-3 text-neutral-400">
                      {guest.purchaseDate
                        ? new Date(guest.purchaseDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          guest.checkedIn
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {guest.checkedIn ? "CHECKED IN" : "PENDING"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tier Modal */}
      {showTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleCreateTier}
            className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-base font-bold text-white">
              Add New Ticket Tier
            </h3>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Tier Name
              </label>
              <input
                type="text"
                required
                value={newTierTitle}
                onChange={(e) => setNewTierTitle(e.target.value)}
                placeholder="e.g. VVIP Table, Early Bird"
                className="w-full rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3 text-xs text-white outline-none focus:border-neutral-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Price (USD)
                </label>
                <input
                  type="number"
                  required
                  value={newTierPrice}
                  onChange={(e) => setNewTierPrice(e.target.value)}
                  placeholder="50"
                  className="w-full rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3 text-xs text-white outline-none focus:border-neutral-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  value={newTierQty}
                  onChange={(e) => setNewTierQty(e.target.value)}
                  placeholder="100"
                  className="w-full rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3 text-xs text-white outline-none focus:border-neutral-600 font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTierModal(false)}
                className="rounded-full px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black hover:bg-neutral-200"
              >
                Create Tier
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </motion.div>
  );
};

export default EventDetailsPage;
