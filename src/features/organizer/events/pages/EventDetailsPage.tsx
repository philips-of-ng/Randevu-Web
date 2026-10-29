import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Edit3,
  QrCode,
  Users,
  DollarSign,
  Ticket,
  Eye,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Tag,
  Download,
  Search,
} from "lucide-react";

interface TicketTier {
  id: string;
  name: string;
  price: number;
  sold: number;
  capacity: number;
  benefits: string[];
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
  const [guestTab, setGuestTab] = useState<"all" | "checked-in" | "pending">("all");

  // Mock comprehensive event data
  const event = {
    id: eventId || "evt-101",
    title: "Amapiano & Tequila Sunset Grooves",
    category: "Nightlife",
    status: "published" as const,
    flyerUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    startDate: "Friday, Nov 14, 2026",
    endDate: "Saturday, Nov 15, 2026",
    startTime: "8:00 PM",
    endTime: "3:00 AM",
    scheduleType: "One-time event",
    isVirtual: false,
    venue: "Sol Beach Club, Landmark Beach",
    streetAddress: "Water Corporation Drive, Plot 3 & 4",
    city: "Victoria Island",
    stateCountry: "Lagos, Nigeria",
    description:
      "Experience Lagos nightlife like never before. An electric fusion of South African Amapiano, Afro-house selections, curated artisan cocktails, and high-energy live percussion under the stars. Strict VIP table etiquette and reservations enforced.",
    metrics: {
      grossRevenue: 14850,
      ticketsSold: 342,
      totalCapacity: 500,
      pageViews: 4120,
      checkedInCount: 184,
    },
    tiers: [
      {
        id: "t-1",
        name: "General Admission",
        price: 25,
        sold: 180,
        capacity: 250,
        benefits: ["Entry access before 11 PM", "Complimentary shooter on arrival"],
      },
      {
        id: "t-2",
        name: "VIP Early Access",
        price: 60,
        sold: 95,
        capacity: 120,
        benefits: ["Fast-track queue", "VIP deck access", "2 Cocktail vouchers"],
      },
      {
        id: "t-3",
        name: "Cabana / Table of 6",
        price: 450,
        sold: 11,
        capacity: 15,
        benefits: ["Private cabana seating", "Dedicated security & bottle girl", "1 Premium tequila bottle included"],
      },
    ] as TicketTier[],
    guests: [
      {
        id: "gst-1",
        name: "Damilola Adebayo",
        email: "dami.adebayo@gmail.com",
        ticketTier: "VIP Early Access",
        ticketCode: "RDV-89412",
        checkedIn: true,
        purchaseDate: "Oct 24, 2026",
      },
      {
        id: "gst-2",
        name: "Kelechi Okafor",
        email: "k.okafor@outlook.com",
        ticketTier: "General Admission",
        ticketCode: "RDV-10293",
        checkedIn: false,
        purchaseDate: "Oct 25, 2026",
      },
      {
        id: "gst-3",
        name: "Elena Rostova",
        email: "elena.rostova@techcorp.io",
        ticketTier: "Cabana / Table of 6",
        ticketCode: "RDV-77123",
        checkedIn: true,
        purchaseDate: "Oct 27, 2026",
      },
      {
        id: "gst-4",
        name: "Tunde Bakare",
        email: "tbakare@gmail.com",
        ticketTier: "General Admission",
        ticketCode: "RDV-44910",
        checkedIn: false,
        purchaseDate: "Oct 28, 2026",
      },
    ] as Guest[],
  };

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText(`https://randevu.events/e/${event.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredGuests = event.guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(guestSearch.toLowerCase()) ||
      g.email.toLowerCase().includes(guestSearch.toLowerCase()) ||
      g.ticketCode.toLowerCase().includes(guestSearch.toLowerCase());

    if (guestTab === "checked-in") return matchesSearch && g.checkedIn;
    if (guestTab === "pending") return matchesSearch && !g.checkedIn;
    return matchesSearch;
  });

  const percentageSold = Math.round(
    (event.metrics.ticketsSold / event.metrics.totalCapacity) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-16"
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
          {/* Quick Copy Link */}
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

          {/* Scanner shortcut */}
          <button
            type="button"
            onClick={() => navigate("/organizer/scanner")}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
          >
            <QrCode className="h-3.5 w-3.5 text-amber-400" />
            <span>Open Scanner</span>
          </button>

          {/* Edit Event */}
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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl lg:col-span-5">
            <img
              src={event.flyerUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-400 backdrop-blur-md">
              LIVE & ON SALE
            </span>
            <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {event.category}
            </span>
          </div>

          {/* Right: Key Event Details */}
          <div className="space-y-5 lg:col-span-7">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-500">
                EVENT ID: {event.id}
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {event.title}
              </h1>
            </div>

            {/* Event Itinerary / Venue Badges */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-3">
                <Calendar className="h-4 w-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">{event.startDate}</p>
                  <p className="text-[11px] text-neutral-400">to {event.endDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-3">
                <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">
                    {event.startTime} - {event.endTime}
                  </p>
                  <p className="text-[11px] text-neutral-400">{event.scheduleType}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-3 sm:col-span-2">
                <MapPin className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{event.venue}</p>
                  <p className="text-[11px] text-neutral-400">
                    {event.streetAddress}, {event.city}, {event.stateCountry}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span>Gross Revenue</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-white font-mono">
            ${event.metrics.grossRevenue.toLocaleString()}
          </p>
          <span className="text-[10px] font-semibold text-emerald-400">+18% this week</span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Ticket className="h-4 w-4 text-amber-400" />
            <span>Capacity Sold</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1 text-2xl font-extrabold text-white font-mono">
            {event.metrics.ticketsSold}
            <span className="text-xs text-neutral-500 font-sans">
              /{event.metrics.totalCapacity} ({percentageSold}%)
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              style={{ width: `${percentageSold}%` }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Users className="h-4 w-4 text-sky-400" />
            <span>Guests Checked-in</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-white font-mono">
            {event.metrics.checkedInCount}
            <span className="text-xs text-neutral-500 font-sans">
              /{event.metrics.ticketsSold}
            </span>
          </p>
          <span className="text-[10px] text-neutral-400">
            {Math.round((event.metrics.checkedInCount / event.metrics.ticketsSold) * 100)}% attendance rate
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Eye className="h-4 w-4 text-purple-400" />
            <span>Listing Page Views</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-white font-mono">
            {event.metrics.pageViews.toLocaleString()}
          </p>
          <span className="text-[10px] text-neutral-400">8.3% conversion to ticket</span>
        </div>
      </div>

      {/* Ticket Tiers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Ticket Tiers & Capacities</h2>
          <span className="text-xs font-semibold text-neutral-400">
            {event.tiers.length} active tiers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {event.tiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-5 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{tier.name}</h3>
                  <span className="font-mono text-base font-extrabold text-amber-400">
                    ${tier.price}
                  </span>
                </div>

                <div className="mt-4 space-y-1 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Sold:</span>
                    <span className="font-mono font-bold text-white">
                      {tier.sold} / {tier.capacity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      ${(tier.sold * tier.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Benefits Pill list */}
                <div className="mt-4 pt-3 border-t border-neutral-800/60 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                    Perks Included
                  </span>
                  {tier.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-300">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
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
              Live guest admissions and digital tickets issued for this event.
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

        {/* Filters and Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Guest Status Tabs */}
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

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={guestSearch}
              onChange={(e) => setGuestSearch(e.target.value)}
              placeholder="Search by name, email, pass ID..."
              className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-4 text-xs font-medium text-white placeholder-neutral-500 outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        {/* Table of Guests */}
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
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-3">
                    <p className="font-bold text-white">{guest.name}</p>
                    <p className="text-[11px] text-neutral-400">{guest.email}</p>
                  </td>
                  <td className="py-3 text-neutral-300 font-medium">{guest.ticketTier}</td>
                  <td className="py-3 font-mono font-semibold text-neutral-300">
                    {guest.ticketCode}
                  </td>
                  <td className="py-3 text-neutral-400">{guest.purchaseDate}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetailsPage;