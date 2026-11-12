import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, Tag, Sparkles } from "lucide-react";

import { CreateEventFormData, EventTab } from "../types";
import { EventTabsHeader } from "../components/EventTabsHeader";
import { EventDetailsStep } from "../components/EventDetailsStep";
import { AppearanceStep } from "../components/AppearanceStep";
import { TicketInfoStep } from "../components/TicketInfoStep";
import { TeamAndAdminStep } from "../components/TeamAndAdminStep";
import { apiClient } from "@/lib/api-client";
import { formatEventPayload } from "../../utils/formatPayload";

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
    collaborators: [],
    isPrivate: false,
    requireApproval: false,
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
      setError(null);
      setCurrentTab("admin");
    } else if (currentTab === "admin") {
      setIsSubmitting(true);
      setError(null);

      try {
        // Format payload to match backend DTO if needed
        const payload = formatEventPayload(formData);
        console.info("[CreateEvent] Submitting event payload:", payload);

        const response = await apiClient.post("/events", payload);
        console.info("[CreateEvent] Event created successfully:", response.data);

        navigate("/organizer/events");
      } catch (err: unknown) {
        const errMessage =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : null;
        setError(errMessage || "Failed to create event. Please check your inputs.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentTab === "admin") {
      setCurrentTab("tickets");
    } else if (currentTab === "tickets") {
      setCurrentTab("appearance");
    } else if (currentTab === "appearance") {
      setCurrentTab("details");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row rounded-3xl border border-neutral-800/80 bg-neutral-950/60 overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Left Side: Desktop Live Preview Canvas */}
      <aside className="hidden lg:flex lg:w-5/12 flex-col justify-between p-8 xl:p-12 border-r border-neutral-900 relative overflow-hidden bg-gradient-to-b from-neutral-900/40 via-neutral-950 to-black">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-red-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-xs font-semibold text-neutral-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Live Event Studio
          </span>
        </div>

        {/* Central Live Preview Card */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className="w-full max-w-xs rounded-3xl border border-neutral-800/90 bg-neutral-900/80 p-4 shadow-xl backdrop-blur-md"
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
                  <div className="h-10 w-10 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center mb-2">
                    <Tag className="h-4 w-4 text-neutral-400" />
                  </div>
                  <p className="text-[11px] font-medium">Flyer preview</p>
                </div>
              )}

              {formData.eventType && (
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-200 backdrop-blur-md border border-white/10">
                  {formData.eventType}
                </span>
              )}
            </div>

            <div className="mt-3.5 space-y-1.5">
              <h3 className="text-sm font-bold text-white truncate">
                {formData.title || "Your Event Title"}
              </h3>
              <p className="text-[11px] text-neutral-400 line-clamp-2 min-h-[28px]">
                {formData.description || "Event description preview..."}
              </p>

              <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-neutral-500" />
                  <span>{formData.startDate || "Date TBA"}</span>
                </div>
                <div className="flex items-center gap-1 truncate max-w-[130px]">
                  <MapPin className="h-3 w-3 text-neutral-500 shrink-0" />
                  <span className="truncate">
                    {formData.city || (formData.isVirtual ? "Virtual" : "Location TBA")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-1">
          <h3 className="text-lg font-bold tracking-tight text-white">
            Publish with confidence.
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Configure ticketing tiers, assign door staff, and launch events seamlessly.
          </p>
        </div>
      </aside>

      {/* Right Side: Step Wizard Form */}
      <div className="w-full lg:w-7/12 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-lg mx-auto flex flex-col flex-1 justify-between">
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
              {currentTab === "admin" && (
                <TeamAndAdminStep
                  key="admin"
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
          <footer className="pt-6 pb-2 flex items-center gap-3 border-t border-neutral-900">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-full border border-neutral-800 py-3.5 text-center text-xs font-semibold text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-[2] rounded-full bg-white py-3.5 text-center text-xs font-bold text-black transition-colors hover:bg-neutral-200 disabled:opacity-50 shadow-lg"
            >
              {currentTab === "admin"
                ? isSubmitting
                  ? "Publishing Event..."
                  : "Publish Event"
                : "Save & Continue"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;