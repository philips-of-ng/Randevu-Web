import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Ticket,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { apiClient } from "../../../lib/api-client";

interface TicketTier {
  id: string;
  title: string;
  price: number;
  quantity: number;
  benefits?: string[];
}

interface PublicEventDetail {
  id: string;
  title: string;
  description: string;
  eventType: string;
  flyerUrl?: string;
  location?: {
    streetAddress: string;
    city: string;
    stateCountry: string;
    isVirtual: boolean;
  };
  schedule?: {
    startDate: string;
    endDate: string;
    type: string;
  };
  tiers?: TicketTier[];
  organizer?: {
    name?: string;
    email?: string;
  };
}

export const AttendeeEventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<PublicEventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isReserving, setIsReserving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get(`/events/${eventId}`);
        console.info("RAW EVENT API RESPONSE:", response.data); // <- Check your browser console!

        const rawEvent =
          response.data.event || response.data.data || response.data;
        // Safely extract and normalize tiers from any backend structure variation
        const rawTiers =
          rawEvent?.tiers ||
          rawEvent?.ticketing?.tiers ||
          rawEvent?.ticketing?.ticketTiers ||
          rawEvent?.ticketTiers ||
          [];

        const normalizedTiers: TicketTier[] = rawTiers.map(
          (t: any, idx: number) => ({
            id: t.id || t._id || `tier-${idx}`,
            title: t.title || t.name || "General Admission",
            price:
              typeof t.price === "number" ? t.price : parseFloat(t.price) || 0,
            quantity:
              typeof t.quantity === "number"
                ? t.quantity
                : t.totalCapacity || 100,
            benefits: t.benefits || [],
          }),
        );

        const formattedEvent: PublicEventDetail = {
          id: rawEvent.id || rawEvent._id || eventId,
          title: rawEvent.title || "Untitled Experience",
          description: rawEvent.description || "No description provided.",
          eventType: rawEvent.eventType || rawEvent.category || "Experience",
          flyerUrl: rawEvent.flyerUrl,
          location: {
            streetAddress: rawEvent.location?.streetAddress || "Location TBA",
            city: rawEvent.location?.city || "Ibadan",
            stateCountry: rawEvent.location?.stateCountry || "Nigeria",
            isVirtual: rawEvent.location?.isVirtual || false,
          },
          schedule: {
            startDate: rawEvent.schedule?.startDate || rawEvent.date,
            endDate: rawEvent.schedule?.endDate || rawEvent.date,
            type: rawEvent.schedule?.type || "One-time",
          },
          tiers: normalizedTiers,
          organizer: rawEvent.organizer || { name: "Verified Creator" },
        };

        setEvent(formattedEvent);

        if (normalizedTiers.length > 0) {
          setSelectedTierId(normalizedTiers[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        setError("Could not load event information.");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleStartReservation = async () => {
    if (!selectedTierId) return;

    try {
      setIsReserving(true);
      const response = await apiClient.post("/reservations", {
        eventId,
        tierId: selectedTierId,
        quantity,
      });

      const reservationId = response.data.reservationId || response.data.id;
      navigate(`/checkout?reservationId=${reservationId}`);
    } catch (err) {
      console.error("Failed to create reservation:", err);
      alert("Tickets might be sold out or currently locked. Try again!");
    } finally {
      setIsReserving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-neutral-400 text-xs font-semibold">
        Loading experience...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4 px-4 text-center">
        <p className="text-rose-500 text-sm font-bold">
          {error || "Event not found."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const selectedTier = event.tiers?.find((t) => t.id === selectedTierId);
  const lowestPrice = event.tiers?.length
    ? Math.min(...event.tiers.map((t) => t.price))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-8 space-y-8 pb-32 text-neutral-200"
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/events")}
        className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      {/* Main Immersive Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Flyer & Share Option */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-950 shadow-2xl">
            {event.flyerUrl ? (
              <img
                src={event.flyerUrl}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-600 text-xs">
                No Flyer
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 py-3 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            {copiedLink ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <Share2 className="h-4 w-4 text-neutral-400" />
            )}
            <span>
              {copiedLink ? "Link Copied to Clipboard" : "Share Event"}
            </span>
          </button>
        </div>

        {/* Right Column: Title, Metadata, Pricing Box, and Story */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header Title & Date / Venue */}
          <div className="space-y-3 border-b border-neutral-800/80 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {event.title}
            </h1>

            <div className="space-y-1.5 text-sm font-semibold">
              <div className="flex items-center gap-2 text-rose-500">
                <Calendar className="h-4 w-4" />
                <span>
                  {event.schedule?.startDate
                    ? new Date(event.schedule.startDate).toLocaleString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "Date TBA"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="h-4 w-4" />
                <span>
                  {event.location?.city || "Virtual Venue"},{" "}
                  {event.location?.streetAddress || ""}
                </span>
              </div>
            </div>
          </div>

          {/* Floating-style Buy Box Card */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <p className="text-xs text-neutral-400">Starting at</p>
              <p className="text-2xl font-extrabold text-white font-mono">
                ${lowestPrice.toFixed(2)}
              </p>
            </div>

            {/* Quick Tier Selector Dropdown */}
            <div className="flex-1 max-w-xs">
              <select
                value={selectedTierId || ""}
                onChange={(e) => setSelectedTierId(e.target.value)}
                className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-bold text-white outline-none focus:border-neutral-600 cursor-pointer"
              >
                {event.tiers?.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.title} — ${tier.price} ({tier.quantity} left)
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              disabled={!selectedTierId || isReserving}
              onClick={handleStartReservation}
              className="rounded-2xl bg-cyan-500 px-6 py-3 text-xs font-extrabold text-black hover:bg-cyan-400 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-500/20 uppercase tracking-wider"
            >
              {isReserving ? "Locking..." : "Buy Now"}
            </button>
          </div>

          {/* About / Narrative Section */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-white">About</h3>
            <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-4 whitespace-pre-line">
              {event.description}
            </div>
          </div>

          {/* Detailed Event Specifications Footer */}
          <div className="space-y-3 pt-6 border-t border-neutral-800/80 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-neutral-400">
              Event Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-400">
              <div>
                Category:{" "}
                <span className="text-white font-medium">
                  {event.eventType || "Experience"}
                </span>
              </div>
              <div>
                Schedule Format:{" "}
                <span className="text-white font-medium">
                  {event.schedule?.type || "One-time"}
                </span>
              </div>
              <div>
                Location Type:{" "}
                <span className="text-white font-medium">
                  {event.location?.isVirtual
                    ? "Virtual Stream"
                    : "Physical Venue"}
                </span>
              </div>
              <div>
                Organizer:{" "}
                <span className="text-white font-medium">
                  {event.organizer?.name || "Verified Creator"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendeeEventDetailPage;
