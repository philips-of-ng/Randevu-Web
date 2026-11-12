import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Calendar,
  Clock,
  MapPin,
  Map,
  Plus,
} from "lucide-react";
import { CreateEventFormData, EventCategory } from "../types";

const INITIAL_CATEGORIES: EventCategory[] = [
  "Nightlife",
  "Carnival",
  "Party",
  "Conference",
  "Wellness",
  "Travel & outdoor",
  "Festival",
  "Other",
];

interface Props {
  formData: CreateEventFormData;
  updateForm: (fields: Partial<CreateEventFormData>) => void;
}

export const EventDetailsStep: React.FC<Props> = ({ formData, updateForm }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Location Mode: "manual" or "map"
  const [locationMode, setLocationMode] = useState<"manual" | "map">("manual");
  const [mapPinInput, setMapPinInput] = useState("");

  // Handle Rich Text Toolbar Actions via standard textarea selection manipulation
  const handleFormatText = (command: "bold" | "italic" | "underline" | "strikethrough" | "bullet" | "number") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = selectedText;
    if (command === "bold") replacement = `**${selectedText}**`;
    if (command === "italic") replacement = `*${selectedText}*`;
    if (command === "underline") replacement = `<u>${selectedText}</u>`;
    if (command === "strikethrough") replacement = `~~${selectedText}~~`;
    if (command === "bullet") replacement = `\n• ${selectedText}`;
    if (command === "number") replacement = `\n1. ${selectedText}`;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    updateForm({ description: newText });

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  };

  const handleAddCustomCategory = () => {
    if (!customCategoryInput.trim()) return;
    const newCat = customCategoryInput.trim();
    if (!categories.includes(newCat)) {
      setCategories([...categories, newCat]);
    }
    updateForm({ eventType: newCat as EventCategory });
    setCustomCategoryInput("");
    setShowCustomInput(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Event Title */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Event title<span className="text-amber-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            maxLength={50}
            value={formData.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            placeholder="Input event name"
            className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-5 pr-16 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-500">
            {formData.title.length}/50
          </span>
        </div>
      </div>

      {/* Description with Working Toolbar */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Event description
        </label>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 focus-within:border-neutral-500">
          {/* Format toolbar */}
          <div className="flex items-center gap-1 border-b border-neutral-800 pb-2 text-neutral-400 overflow-x-auto">
            <button
              type="button"
              onClick={() => handleFormatText("bold")}
              className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("italic")}
              className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("underline")}
              className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors"
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("strikethrough")}
              className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors"
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </button>
            <div className="h-4 w-[1px] bg-neutral-800 mx-1" />
            <button
              type="button"
              onClick={() => handleFormatText("bullet")}
              className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors"
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("number")}
              className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>
          <textarea
            ref={textareaRef}
            rows={5}
            maxLength={1000}
            value={formData.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            placeholder="Describe your event..."
            className="mt-2 w-full resize-none bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
          />
          <div className="text-right font-mono text-xs text-neutral-500">
            {formData.description.length}/1000
          </div>
        </div>
      </div>

      {/* Event Type Chips + Custom Creator */}
      <div>
        <label className="block text-sm font-bold text-white mb-3">
          Event type<span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2.5 items-center">
          {categories.map((cat) => {
            const isSelected = formData.eventType === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateForm({ eventType: cat as EventCategory })}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 text-white shadow-[0_0_18px_rgba(244,63,94,0.45)] border-transparent"
                    : "border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {/* Add Custom Category button / input */}
          {showCustomInput ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={customCategoryInput}
                onChange={(e) => setCustomCategoryInput(e.target.value)}
                placeholder="Custom type..."
                className="rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-neutral-700 bg-neutral-900/40 px-4 py-2 text-xs font-semibold text-neutral-400 hover:border-neutral-500 hover:text-white transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Custom type</span>
            </button>
          )}
        </div>
      </div>

      {/* Location Section with Dual Options (Manual vs Google Maps Pin) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-white">
            Location<span className="text-amber-500">*</span>
          </label>
          {/* Switcher tabs */}
          <div className="flex rounded-full bg-neutral-900 p-1 border border-neutral-800 text-xs">
            <button
              type="button"
              onClick={() => setLocationMode("manual")}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                locationMode === "manual" ? "bg-white text-black shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              Type Manually
            </button>
            <button
              type="button"
              onClick={() => setLocationMode("map")}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                locationMode === "map" ? "bg-white text-black shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              Google Maps Pin
            </button>
          </div>
        </div>

        {locationMode === "manual" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
            <input
              type="text"
              value={formData.streetAddress}
              onChange={(e) => updateForm({ streetAddress: e.target.value })}
              placeholder="Street address"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
            />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateForm({ city: e.target.value })}
              placeholder="Select City"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
            />
            <input
              type="text"
              value={formData.stateCountry}
              onChange={(e) => updateForm({ stateCountry: e.target.value })}
              placeholder="State, Country"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
            />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={mapPinInput}
                onChange={(e) => {
                  setMapPinInput(e.target.value);
                  updateForm({ streetAddress: e.target.value, city: "Pinned Location" });
                }}
                placeholder="Paste Google Maps link or coordinates (e.g. 7.3775, 3.9470)"
                className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500 font-mono text-xs"
              />
            </div>
            <p className="text-[11px] text-neutral-500 px-4">
              💡 Tip: Open Google Maps, drop a pin, copy the share link or coordinates, and paste it here.
            </p>
          </motion.div>
        )}

        {/* Virtual Event Toggle */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => updateForm({ isVirtual: !formData.isVirtual })}
            className={`relative h-5 w-9 rounded-full transition-colors ${
              formData.isVirtual ? "bg-red-500" : "bg-neutral-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                formData.isVirtual ? "translate-x-4" : ""
              }`}
            />
          </button>
          <span className="text-xs font-medium text-neutral-300">virtual event</span>
        </div>
      </div>

      {/* Date and Time with Native Inputs */}
      <div>
        <label className="block text-sm font-bold text-white mb-3">
          Date and Time<span className="text-amber-500">*</span>
        </label>

        {/* One-time / Recurring Switcher */}
        <div className="mb-4 flex w-fit rounded-full bg-neutral-900/80 p-1 border border-neutral-800">
          <button
            type="button"
            onClick={() => updateForm({ scheduleType: "one-time" })}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              formData.scheduleType === "one-time" ? "bg-white text-black shadow" : "text-neutral-400"
            }`}
          >
            One-time event
          </button>
          <button
            type="button"
            onClick={() => updateForm({ scheduleType: "recurring" })}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              formData.scheduleType === "recurring" ? "bg-white text-black shadow" : "text-neutral-400"
            }`}
          >
            Recurring event
          </button>
        </div>

        {/* Date & Time Input Grid using native date/time selectors */}
        <div className="grid grid-cols-2 gap-3">
          {/* Start Date */}
          <div className="relative flex items-center">
            <Calendar className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400 z-10" />
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateForm({ startDate: e.target.value })}
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white outline-none focus:border-neutral-500 cursor-pointer"
            />
          </div>

          {/* End Date */}
          <div className="relative flex items-center">
            <Calendar className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400 z-10" />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => updateForm({ endDate: e.target.value })}
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white outline-none focus:border-neutral-500 cursor-pointer"
            />
          </div>

          {/* Start Time */}
          <div className="relative flex items-center">
            <Clock className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400 z-10" />
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => updateForm({ startTime: e.target.value })}
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white outline-none focus:border-neutral-500 cursor-pointer"
            />
          </div>

          {/* End Time */}
          <div className="relative flex items-center">
            <Clock className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400 z-10" />
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => updateForm({ endTime: e.target.value })}
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white outline-none focus:border-neutral-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetailsStep;