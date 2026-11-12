import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, Plus, DollarSign, Percent, ShieldCheck, Ticket, Layers, Sparkles } from "lucide-react";
import { CreateEventFormData } from "../types";

interface TicketTierItem {
  id: string;
  name: string;
  price: string;
  quantity: string;
  orderLimit: string;
  benefits: string[];
}

interface Props {
  formData: CreateEventFormData & { tiers?: TicketTierItem[] };
  updateForm: (fields: Partial<CreateEventFormData> & { tiers?: TicketTierItem[] }) => void;
}

export const TicketInfoStep: React.FC<Props> = ({ formData, updateForm }) => {
  // Initialize from formData.tiers if available, otherwise fallback to default single tier
  const [tiers, setTiers] = useState<TicketTierItem[]>(
    formData.tiers && formData.tiers.length > 0
      ? formData.tiers
      : [
          {
            id: "1",
            name: formData.ticketTitle || "General Admission",
            price: formData.ticketPrice || "0",
            quantity: formData.ticketQuantity || "100",
            orderLimit: formData.orderLimit || "5",
            benefits: formData.benefits?.length ? formData.benefits : ["Standard Entry"],
          },
        ]
  );

  const [activeTierBenefitInput, setActiveTierBenefitInput] = useState<{ [key: string]: string }>({});

  const syncTiersToForm = (updatedTiers: TicketTierItem[]) => {
    setTiers(updatedTiers);
    
    // Sync both the full tiers array AND backward-compatible single fields for the first tier
    updateForm({
      tiers: updatedTiers,
      ticketTitle: updatedTiers[0]?.name,
      ticketPrice: updatedTiers[0]?.price,
      ticketQuantity: updatedTiers[0]?.quantity,
      orderLimit: updatedTiers[0]?.orderLimit,
      benefits: updatedTiers[0]?.benefits,
    });
  };

  const handleTierChange = (id: string, field: keyof TicketTierItem, value: any) => {
    const updated = tiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier));
    syncTiersToForm(updated);
  };

  const handleAddTier = () => {
    const newTier: TicketTierItem = {
      id: Date.now().toString(),
      name: "Gold / VIP Pass",
      price: "50",
      quantity: "50",
      orderLimit: "3",
      benefits: ["Fast-track entry", "Complimentary drink"],
    };
    syncTiersToForm([...tiers, newTier]);
  };

  const handleRemoveTier = (id: string) => {
    if (tiers.length === 1) return; // Keep at least one
    const updated = tiers.filter((t) => t.id !== id);
    syncTiersToForm(updated);
  };

  const handleAddBenefitToTier = (tierId: string) => {
    const benefitText = activeTierBenefitInput[tierId]?.trim();
    if (!benefitText) return;

    const updated = tiers.map((tier) => {
      if (tier.id === tierId) {
        return { ...tier, benefits: [...tier.benefits, benefitText] };
      }
      return tier;
    });

    syncTiersToForm(updated);
    setActiveTierBenefitInput({ ...activeTierBenefitInput, [tierId]: "" });
  };

  const handleRemoveBenefitFromTier = (tierId: string, index: number) => {
    const updated = tiers.map((tier) => {
      if (tier.id === tierId) {
        return { ...tier, benefits: tier.benefits.filter((_, i) => i !== index) };
      }
      return tier;
    });
    syncTiersToForm(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-amber-500">
          (Configure single or multiple VIP, Gold, and Platinum ticket tiers)
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
          <Percent className="h-3 w-3" /> 12% Transparent Fee
        </span>
      </div>

      {/* Single / Multiple Toggle */}
      <div className="flex w-fit rounded-full bg-neutral-900/80 p-1 border border-neutral-800">
        <button
          type="button"
          onClick={() => {
            updateForm({ ticketType: "single" });
            if (tiers.length > 1) syncTiersToForm([tiers[0]]);
          }}
          className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all ${
            formData.ticketType === "single"
              ? "bg-white text-black shadow"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Single Tier
        </button>
        <button
          type="button"
          onClick={() => {
            updateForm({ ticketType: "multiple" });
            if (tiers.length === 1) {
              syncTiersToForm([
                tiers[0],
                {
                  id: "gold-tier",
                  name: "Gold VIP Access",
                  price: "75",
                  quantity: "50",
                  orderLimit: "4",
                  benefits: ["Express entry", "Dedicated VIP Lounge access"],
                },
              ]);
            }
          }}
          className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all ${
            formData.ticketType === "multiple"
              ? "bg-white text-black shadow"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Multiple Tiers (Gold, Platinum, etc.)
        </button>
      </div>

      {/* Render Single or Multiple Tier Cards */}
      <div className="space-y-6">
        {tiers.map((tier, index) => {
          const rawPrice = parseFloat(tier.price) || 0;
          const platformFee = rawPrice * 0.12;
          const organizerEarnings = rawPrice - platformFee;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md space-y-4"
            >
              {/* Tier Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-4 w-4" /> Tier #{index + 1}: {tier.name || "Untitled Tier"}
                </span>
                {formData.ticketType === "multiple" && tiers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(tier.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                    title="Remove Tier"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Tier Title Input */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  Ticket Tier Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={tier.name}
                  onChange={(e) => handleTierChange(tier.id, "name", e.target.value)}
                  placeholder="e.g. General, Gold Table, Platinum VVIP"
                  className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-3 px-5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500 font-semibold"
                />
              </div>

              {/* Quantity, Limit & Price Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Quantity</label>
                  <input
                    type="number"
                    value={tier.quantity}
                    onChange={(e) => handleTierChange(tier.id, "quantity", e.target.value)}
                    placeholder="100"
                    className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-3 px-4 text-xs text-white outline-none focus:border-neutral-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Order Limit</label>
                  <input
                    type="number"
                    value={tier.orderLimit}
                    onChange={(e) => handleTierChange(tier.id, "orderLimit", e.target.value)}
                    placeholder="5"
                    className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-3 px-4 text-xs text-white outline-none focus:border-neutral-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">Price (USD)</label>
                  <div className="relative flex items-center">
                    <DollarSign className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-amber-400" />
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => handleTierChange(tier.id, "price", e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-full border border-neutral-800 bg-neutral-950 py-3 pl-9 pr-4 text-xs font-bold text-white outline-none focus:border-neutral-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Transparent Revenue Breakdown per tier */}
              {rawPrice > 0 && (
                <div className="rounded-2xl border border-amber-500/20 bg-black/40 p-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400">Platform Fee (12%)</span>
                    <p className="font-mono font-bold text-rose-400">-${platformFee.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400">You Take Home</span>
                    <p className="font-mono font-bold text-emerald-400">+${organizerEarnings.toFixed(2)}</p>
                  </div>
                </div>
              )}

              {/* Tier Perks & Benefits */}
              <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                <label className="block text-xs font-bold text-neutral-300">Tier Perks & Benefits</label>
                <div className="flex flex-wrap gap-2">
                  {tier.benefits.map((benefit, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1 text-xs text-neutral-200"
                    >
                      <Check className="h-3 w-3 text-emerald-400" />
                      {benefit}
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefitFromTier(tier.id, bIdx)}
                        className="ml-1 text-neutral-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={activeTierBenefitInput[tier.id] || ""}
                    onChange={(e) =>
                      setActiveTierBenefitInput({
                        ...activeTierBenefitInput,
                        [tier.id]: e.target.value,
                      })
                    }
                    placeholder="Add benefit (e.g. Free drinks, Backstage pass)..."
                    className="flex-1 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-white outline-none focus:border-neutral-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddBenefitToTier(tier.id)}
                    className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {formData.ticketType === "multiple" && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddTier}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/40 py-4 text-xs font-bold text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors"
        >
          <Plus className="h-4 w-4 text-amber-400" />
          <span>Add Another Ticket Tier (Gold, VVIP, etc.)</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default TicketInfoStep;