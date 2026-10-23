import React from "react";
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
} from "lucide-react";
import { CreateEventFormData, EventCategory } from "../types";

const CATEGORIES: EventCategory[] = [
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

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Event description
        </label>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 focus-within:border-neutral-500">
          {/* Format toolbar */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 text-neutral-400">
            <button type="button" className="p-1 hover:text-white"><Bold className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><Italic className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><Underline className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><Strikethrough className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><List className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><ListOrdered className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><Undo2 className="h-4 w-4" /></button>
            <button type="button" className="p-1 hover:text-white"><Redo2 className="h-4 w-4" /></button>
          </div>
          <textarea
            rows={5}
            maxLength={1000}
            value={formData.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            className="mt-2 w-full resize-none bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
          />
          <div className="text-right font-mono text-xs text-neutral-500">
            {formData.description.length}/1000
          </div>
        </div>
      </div>

      {/* Event type chips */}
      <div>
        <label className="block text-sm font-bold text-white mb-3">
          Event type<span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = formData.eventType === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateForm({ eventType: cat })}
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
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2.5">
        <label className="block text-sm font-bold text-white">
          Location<span className="text-amber-500">*</span>
        </label>
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

      {/* Date and Time */}
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
              formData.scheduleType === "one-time"
                ? "bg-white text-black shadow"
                : "text-neutral-400"
            }`}
          >
            One-time event
          </button>
          <button
            type="button"
            onClick={() => updateForm({ scheduleType: "recurring" })}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              formData.scheduleType === "recurring"
                ? "bg-white text-black shadow"
                : "text-neutral-400"
            }`}
          >
            Recurring event
          </button>
        </div>

        {/* Date & Time Input Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative flex items-center">
            <Calendar className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => updateForm({ startDate: e.target.value })}
              placeholder="Start date"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white placeholder-neutral-400 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="relative flex items-center">
            <Calendar className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={formData.endDate}
              onChange={(e) => updateForm({ endDate: e.target.value })}
              placeholder="End date"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white placeholder-neutral-400 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="relative flex items-center">
            <Clock className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={formData.startTime}
              onChange={(e) => updateForm({ startTime: e.target.value })}
              placeholder="Start time"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white placeholder-neutral-400 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="relative flex items-center">
            <Clock className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={formData.endTime}
              onChange={(e) => updateForm({ endTime: e.target.value })}
              placeholder="End time"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3 pl-11 pr-4 text-xs font-medium text-white placeholder-neutral-400 outline-none focus:border-neutral-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};