import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Ticket, QrCode, Calendar, MapPin, CheckCircle2, Compass } from "lucide-react";
import { apiClient } from "../../../lib/api-client";

interface UserTicket {
  id: string;
  ticketCode: string;
  ticketTier: string;
  checkedIn: boolean;
  purchaseDate: string;
  event: {
    id: string;
    title: string;
    flyerUrl?: string;
    schedule?: { startDate: string };
    location?: { city: string; isVirtual: boolean };
  };
}

export const YourTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        setIsLoading(true);
        // Calls your backend endpoint for authenticated user orders/tickets
        const response = await apiClient.get("/orders/my-orders");
        const rawData = response.data.orders || response.data || [];
        setTickets(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          My Passes & Tickets
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Access your digital admission codes, QR passes, and event history.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-24 text-neutral-400 text-xs font-semibold">
          Loading your passes...
        </div>
      ) : tickets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-900/40 py-20 px-4 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400">
            <Ticket className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-white">No tickets booked yet</h3>
          <p className="mt-1 text-xs text-neutral-500 max-w-sm">
            Explore live experiences on the discovery tab and secure your spot.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tickets.map((tkt) => (
            <motion.div
              key={tkt.id}
              whileHover={{ y: -2 }}
              className="flex flex-col sm:flex-row items-center justify-between rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-5 backdrop-blur-md gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="h-20 w-20 rounded-2xl bg-neutral-950 overflow-hidden shrink-0 border border-neutral-800">
                  {tkt.event?.flyerUrl ? (
                    <img src={tkt.event.flyerUrl} alt="Flyer" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[10px] text-neutral-600">Event</div>
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {tkt.ticketTier || "General Admission"}
                  </span>
                  <h3 className="text-base font-bold text-white line-clamp-1">{tkt.event?.title || "Live Experience"}</h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-neutral-500" />
                      {tkt.event?.schedule?.startDate ? new Date(tkt.event.schedule.startDate).toLocaleDateString() : "TBA"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-neutral-500" />
                      {tkt.event?.location?.city || "Virtual"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-800 gap-4">
                <div className="text-left sm:text-right font-mono">
                  <p className="text-[10px] text-neutral-500">PASS CODE</p>
                  <p className="text-xs font-bold text-neutral-200">{tkt.ticketCode || "RDV-PASS"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTicket(tkt)}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200 transition-colors shadow"
                >
                  <QrCode className="h-4 w-4" /> View Pass
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* QR Code Modal Popup */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-6 text-center shadow-2xl"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-rose-500 uppercase">Digital Gate Pass</span>
              <h3 className="text-lg font-bold text-white">{selectedTicket.event?.title}</h3>
              <p className="text-xs text-neutral-400">{selectedTicket.ticketTier}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
              {/* Simulated QR Code Graphic */}
              <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between font-mono text-[8px] text-black">
                <div className="flex justify-between"><span>■■■</span><span>□□□</span></div>
                <div className="text-center font-bold tracking-widest">{selectedTicket.ticketCode}</div>
                <div className="flex justify-between"><span>□□□</span><span>■■■</span></div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono font-bold text-neutral-300">{selectedTicket.ticketCode}</p>
              <p className="text-[10px] text-neutral-500">Present this QR code at the venue entrance for fast-track check-in.</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="w-full rounded-full bg-neutral-900 border border-neutral-800 py-3 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
            >
              Close Pass
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default YourTicketsPage;