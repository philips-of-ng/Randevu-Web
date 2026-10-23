import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, Plus } from "lucide-react";
import { CreateEventFormData } from "../types";

interface Props {
  formData: CreateEventFormData;
  updateForm: (fields: Partial<CreateEventFormData>) => void;
}

export const TicketInfoStep: React.FC<Props> = ({ formData, updateForm }) => {
  const [newBenefit, setNewBenefit] = useState("");
  const [showAddBenefit, setShowAddBenefit] = useState(false);

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    updateForm({
      benefits: [...formData.benefits, newBenefit.trim()],
    });
    setNewBenefit("");
    setShowAddBenefit(false);
  };

  const handleRemoveBenefit = (index: number) => {
    updateForm({
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <p className="text-xs font-semibold text-amber-500">
        (Set up paid and free tickets so people can attend your event)
      </p>

      {/* Single / Multiple Toggle */}
      <div className="flex w-fit rounded-full bg-neutral-900/80 p-1 border border-neutral-800">
        <button
          type="button"
          onClick={() => updateForm({ ticketType: "single" })}
          className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all ${
            formData.ticketType === "single"
              ? "bg-white text-black shadow"
              : "text-neutral-400"
          }`}
        >
          Single
        </button>
        <button
          type="button"
          onClick={() => updateForm({ ticketType: "multiple" })}
          className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all ${
            formData.ticketType === "multiple"
              ? "bg-white text-black shadow"
              : "text-neutral-400"
          }`}
        >
          Multiple
        </button>
      </div>

      {/* Ticket Title */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Ticket title<span className="text-amber-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            maxLength={50}
            value={formData.ticketTitle}
            onChange={(e) => updateForm({ ticketTitle: e.target.value })}
            placeholder="Input ticket name"
            className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-5 pr-16 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-500">
            {formData.ticketTitle.length}/50
          </span>
        </div>
      </div>

      {/* Ticket Quantity */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Ticket quantity
        </label>
        <input
          type="number"
          value={formData.ticketQuantity}
          onChange={(e) => updateForm({ ticketQuantity: e.target.value })}
          placeholder="Select quantity"
          className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
        />
      </div>

      {/* Order Limit */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Order limit <span className="font-normal text-neutral-400">(per person)</span>
        </label>
        <input
          type="number"
          value={formData.orderLimit}
          onChange={(e) => updateForm({ orderLimit: e.target.value })}
          placeholder="Select quantity"
          className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
        />
      </div>

      {/* Ticket Benefits */}
      <div>
        <label className="block text-sm font-bold text-white mb-3">
          Ticket benefits
        </label>
        <div className="space-y-2">
          {formData.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-white">{benefit}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveBenefit(idx)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-950/40 text-rose-500 hover:bg-rose-900/60"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {showAddBenefit ? (
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                autoFocus
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Benefit title"
                className="flex-1 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="rounded-full bg-white px-3 py-2 text-xs font-bold text-black"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddBenefit(true)}
              className="mt-1 text-sm font-semibold text-neutral-300 underline underline-offset-4 hover:text-white"
            >
              Add benefit +
            </button>
          )}
        </div>
      </div>

      {/* Set Ticket Price */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Set ticket price
        </label>
        <input
          type="text"
          value={formData.ticketPrice}
          onChange={(e) => updateForm({ ticketPrice: e.target.value })}
          placeholder="Enter amount (USD)"
          className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
        />
      </div>
    </motion.div>
  );
};