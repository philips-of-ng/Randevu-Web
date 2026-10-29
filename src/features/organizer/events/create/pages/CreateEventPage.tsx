import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, Calendar, MapPin, Tag } from "lucide-react";

import { CreateEventFormData, EventTab } from "../types";
import { EventTabsHeader } from "../components/EventTabsHeader";
import { EventDetailsStep } from "../components/EventDetailsStep";
import { AppearanceStep } from "../components/AppearanceStep";
import { TicketInfoStep } from "../components/TicketInfoStep";
import { apiClient } from "@/lib/api-client";

export const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<EventTab>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateEventFormData>({
    title: "",
    description: "",
    eventType: "Wellness",
    streetAddress: "",
    city: "",
    stateCountry: "",
    isVirtual: false,
    scheduleType: "one-time",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    flyerUrl: null,
    ticketType: "single",
    ticketTitle: "",
    ticketQuantity: "",
    orderLimit: "",
    benefits: ["Entry", "VIP access"],
    ticketPrice: "",
  });

  const updateForm = (fields: Partial<CreateEventFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    if (error) setError(null);
  };

  const handleNext = async () => {
    if (currentTab === "details") {
      if (!formData.title.trim()) {
        setError("Please enter an event title");
        return;
      }
      if (!formData.eventType) {
        setError("Please select an event type");
        return;
      }
      setError(null);
      setCurrentTab("appearance");
    } else if (currentTab === "appearance") {
      setCurrentTab("tickets");
    } else if (currentTab === "tickets") {
      if (!formData.ticketTitle.trim()) {
        setError("Please enter a ticket title");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        await apiClient.post("/events", formData);
        navigate("/");
      } catch (err: unknown) {
        const errMessage =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : null;
        setError(errMessage || "Failed to create event. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentTab === "tickets") {
      setCurrentTab("appearance");
    } else if (currentTab === "appearance") {
      setCurrentTab("details");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-7xl min-h-screen flex flex-col lg:flex-row">
        {/* Left Side: Desktop Hero Showcase & Live Preview */}
        <aside className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-neutral-900 relative overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-black">
          {/* Ambient Background Glows */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />

          {/* Top Brand Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-serif text-3xl font-bold tracking-tight text-white">
              Randevu
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-xs font-semibold text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Organizer Studio
            </span>
          </div>

          {/* Central Live Preview Card */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm rounded-3xl border border-neutral-800/90 bg-neutral-900/70 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                {formData.flyerUrl ? (
                  <img
                    src={formData.flyerUrl}
                    alt="Event Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center p-6 text-neutral-500">
                    <div className="h-12 w-12 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center mb-2">
                      <Tag className="h-5 w-5 text-neutral-400" />
                    </div>
                    <p className="text-xs font-medium">Flyer preview appears here</p>
                  </div>
                )}

                {formData.eventType && (
                  <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-neutral-200 backdrop-blur-md border border-white/10">
                    {formData.eventType}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-bold text-white truncate">
                  {formData.title || "Your Event Title"}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 min-h-[32px]">
                  {formData.description || "Describe your event to give attendees a feel for what to expect..."}
                </p>

                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                    <span>{formData.startDate || "Date TBA"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate max-w-[150px]">
                    <MapPin className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">
                      {formData.city || (formData.isVirtual ? "Virtual Event" : "Location TBA")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Pitch */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Host experiences people talk about.
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Configure ticketing, manage capacities, and launch reservations across Nigeria and beyond.
            </p>
          </div>
        </aside>

        {/* Right Side: Step Wizard Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
          {/* Mobile Top Brand Bar */}
          <header className="flex items-center justify-between pb-6 lg:hidden">
            <span className="font-serif text-2xl font-bold tracking-tight">
              Randevu
            </span>
            <button
              type="button"
              aria-label="Open menu"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <Menu className="h-6 w-6" />
            </button>
          </header>

          <div className="w-full max-w-md mx-auto flex flex-col flex-1 justify-between">
            {/* Tab pill navigation */}
            <div>
              <EventTabsHeader
                currentTab={currentTab}
                onTabChange={(tab) => {
                  setError(null);
                  setCurrentTab(tab);
                }}
              />
            </div>

            {/* Dynamic step form body */}
            <main className="py-6 flex-1">
              <AnimatePresence mode="wait">
                {currentTab === "details" && (
                  <EventDetailsStep
                    key="details"
                    formData={formData}
                    updateForm={updateForm}
                  />
                )}
                {currentTab === "appearance" && (
                  <AppearanceStep
                    key="appearance"
                    formData={formData}
                    updateForm={updateForm}
                  />
                )}
                {currentTab === "tickets" && (
                  <TicketInfoStep
                    key="tickets"
                    formData={formData}
                    updateForm={updateForm}
                  />
                )}
              </AnimatePresence>

              {error && (
                <p className="mt-4 text-center text-xs font-medium text-rose-500">
                  {error}
                </p>
              )}
            </main>

            {/* Step Action Buttons */}
            <footer className="pt-6 pb-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 rounded-full border border-neutral-700 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-neutral-900"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-[2] rounded-full bg-white py-3.5 text-center text-sm font-bold text-black transition-colors hover:bg-neutral-200 disabled:opacity-50"
              >
                {currentTab === "tickets"
                  ? isSubmitting
                    ? "Creating Event..."
                    : "Save & Continue"
                  : "Save & Continue"}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;