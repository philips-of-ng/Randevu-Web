import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shield, DollarSign, Lock, Check, Plus, Trash2, Globe } from "lucide-react";
import { CreateEventFormData } from "../types";

interface Collaborator {
  id: string;
  username: string;
  role: "CO_HOST" | "SCANNER" | "PROMOTER_PARTNER";
  splitPercentage?: string;
}

interface Props {
  formData: CreateEventFormData & { collaborators?: Collaborator[]; isPrivate?: boolean; requireApproval?: boolean };
  updateForm: (fields: any) => void;
}

export const TeamAndAdminStep: React.FC<Props> = ({ formData, updateForm }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(formData.collaborators || []);
  const [searchUser, setSearchUser] = useState("");
  const [selectedRole, setSelectedRole] = useState<"CO_HOST" | "SCANNER" | "PROMOTER_PARTNER">("SCANNER");
  const [splitVal, setSplitVal] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddCollaborator = () => {
    if (!searchUser.trim()) return;
    const newCollab: Collaborator = {
      id: Date.now().toString(),
      username: searchUser.trim(),
      role: selectedRole,
      splitPercentage: selectedRole === "PROMOTER_PARTNER" ? splitVal : undefined,
    };
    const updated = [...collaborators, newCollab];
    setCollaborators(updated);
    updateForm({ collaborators: updated });
    setSearchUser("");
    setSplitVal("");
    setShowAddModal(false);
  };

  const handleRemoveCollaborator = (id: string) => {
    const updated = collaborators.filter((c) => c.id !== id);
    setCollaborators(updated);
    updateForm({ collaborators: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <p className="text-xs font-semibold text-amber-500">
          (Manage team permissions, gate scanners, and revenue-sharing partners)
        </p>
      </div>

      {/* Section 1: Team & Staff Permissions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-amber-400" /> Team & Gate Scanners
          </label>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            <Plus className="h-3.5 w-3.5" /> Add Member
          </button>
        </div>

        <div className="space-y-2">
          {collaborators.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-4 text-center text-xs text-neutral-500">
              No team members added yet. Add co-hosts or door scanners.
            </div>
          ) : (
            collaborators.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3.5"
              >
                <div>
                  <p className="text-xs font-bold text-white">@{c.username}</p>
                  <p className="text-[10px] text-neutral-400">
                    Role: <span className="text-amber-400 font-semibold">{c.role}</span>
                    {c.splitPercentage ? ` • Split: ${c.splitPercentage}%` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCollaborator(c.id)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add Member Inline Modal / Box */}
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-3"
          >
            <h4 className="text-xs font-bold text-white">Add Randevu User</h4>
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Enter Randevu username or email"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs text-white outline-none focus:border-neutral-600"
            />
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(["SCANNER", "CO_HOST", "PROMOTER_PARTNER"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`rounded-xl py-2 px-2 font-semibold border transition-all ${
                    selectedRole === r
                      ? "border-amber-500 bg-amber-500/10 text-amber-400"
                      : "border-neutral-800 bg-neutral-900 text-neutral-400"
                  }`}
                >
                  {r === "SCANNER" ? "Door Scanner" : r === "CO_HOST" ? "Co-Host" : "Partner Split"}
                </button>
              ))}
            </div>

            {selectedRole === "PROMOTER_PARTNER" && (
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={splitVal}
                  onChange={(e) => setSplitVal(e.target.value)}
                  placeholder="Revenue share percentage (e.g. 15%)"
                  className="w-full rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs text-white outline-none focus:border-neutral-600 font-mono"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCollaborator}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black hover:bg-neutral-200"
              >
                Save Member
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Section 2: Event Visibility & Security Toggles */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <label className="block text-sm font-bold text-white flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" /> Privacy & Access Controls
        </label>

        {/* Private Event Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-amber-400" /> Private / Unlisted Event
            </span>
            <p className="text-[11px] text-neutral-400">
              Hide from the public discovery feed. Only people with the direct link can view.
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateForm({ isPrivate: !formData.isPrivate })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              formData.isPrivate ? "bg-amber-500" : "bg-neutral-800"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                formData.isPrivate ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* Manual Approval Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Require Host Approval for RSVPs
            </span>
            <p className="text-[11px] text-neutral-400">
              Buyers submit requests, and you manually approve them before tickets are issued.
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateForm({ requireApproval: !formData.requireApproval })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              formData.requireApproval ? "bg-emerald-500" : "bg-neutral-800"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                formData.requireApproval ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamAndAdminStep;