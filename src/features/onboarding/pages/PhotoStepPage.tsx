import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";

export const PhotoStepPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleNext = () => {
    navigate("/onboarding/step-3");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Upload Area */}
      <section className="flex flex-col pt-4 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Add a photo?
          </h1>
          <span className="block text-2xl font-bold text-neutral-400 sm:text-3xl">
            (optional)
          </span>
          <p className="mt-2 text-sm text-neutral-400">
            This is how you&apos;ll appear to others on Randevu.
          </p>
        </motion.div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Circular Avatar Placeholder / Picker */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <motion.button
            type="button"
            onClick={triggerFileInput}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.15,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group relative flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-neutral-700 bg-neutral-900/40 transition-colors hover:border-neutral-500 hover:bg-neutral-900/70 sm:h-52 sm:w-52"
          >
            <AnimatePresence mode="wait">
              {photoPreview ? (
                <motion.img
                  key="preview"
                  src={photoPreview}
                  alt="Profile preview"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full text-neutral-400 transition-colors group-hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="h-14 w-14"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Skip Action */}
          <motion.button
            type="button"
            onClick={handleNext}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 text-sm font-semibold text-neutral-300 underline underline-offset-4 transition-colors hover:text-white"
          >
            Skip for now
          </motion.button>
        </div>
      </section>

      {/* Continue Action */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="pt-4 pb-2 lg:pt-0 lg:pb-0"
      >
        <OnboardingContinueButton type="button" onClick={handleNext} />
      </motion.footer>
    </motion.div>
  );
};