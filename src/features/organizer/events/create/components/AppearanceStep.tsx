import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Info } from "lucide-react";
import { CreateEventFormData } from "../types";

interface Props {
  formData: CreateEventFormData;
  updateForm: (fields: Partial<CreateEventFormData>) => void;
}

export const AppearanceStep: React.FC<Props> = ({ formData, updateForm }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm({ flyerUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <label className="block text-base font-extrabold text-white">
        Upload event flyer<span className="text-amber-500">*</span>
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml, application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-800 bg-neutral-900/40 p-6 text-center transition-colors hover:border-neutral-600 hover:bg-neutral-900/70"
      >
        {formData.flyerUrl ? (
          <img
            src={formData.flyerUrl}
            alt="Event Flyer Preview"
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded-2xl p-4 text-neutral-400 group-hover:text-white transition-colors">
              <ImagePlus className="h-16 w-16 stroke-[1.2]" />
            </div>
            <p className="mt-4 text-sm font-bold text-white">
              Choose image from device
            </p>
            <p className="mt-1 text-[10px] text-neutral-500 tracking-wider">
              (JPEG, PNG, PDF OR SVG)
            </p>
          </div>
        )}
      </div>

      {/* Aspect Ratio Hint */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
        <Info className="h-4 w-4 shrink-0 text-neutral-500" />
        <span>For the best look, use a portrait (4:5) or square image</span>
      </div>
    </motion.div>
  );
};