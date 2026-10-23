import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";
import { useOnboarding } from "@/context/OnboardingContext";

export const LocationStepPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, submitOnboarding, isSubmitting, error } = useOnboarding();
  const [locationEnabled, setLocationEnabled] = useState(Boolean(data.location));
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationEnabled(true);
      updateData({ location: "enabled_default" });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        setLocationEnabled(true);
        updateData({
          location: `${position.coords.latitude},${position.coords.longitude}`,
        });
      },
      () => {
        setLoading(false);
        setLocationEnabled(false);
      }
    );
  };

  const handleFinish = async () => {
    try {
      await submitOnboarding();
      navigate("/onboarding/success");
    } catch {
      // Error message is exposed through useOnboarding()
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Location Action Section */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Find Parties near you.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-3 text-sm text-neutral-400"
        >
          Allow location access so we can show you the best events happening around you.
        </motion.p>

        <div className="mt-10 flex flex-col items-center space-y-5">
          {/* Enable Location Button with state transition */}
          <motion.button
            type="button"
            onClick={requestLocation}
            disabled={loading || isSubmitting}
            whileTap={{ scale: 0.98 }}
            animate={{
              borderColor: locationEnabled ? "rgba(16, 185, 129, 0.8)" : "rgba(38, 38, 38, 1)",
              backgroundColor: locationEnabled ? "rgba(6, 78, 59, 0.4)" : "rgba(23, 23, 23, 0.7)",
              color: locationEnabled ? "#6ee7b7" : "#ffffff",
              boxShadow: locationEnabled
                ? "0 0 24px rgba(16, 185, 129, 0.3)"
                : "none",
            }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-full border py-4 text-center text-sm font-semibold outline-none hover:border-neutral-700 hover:bg-neutral-800/80"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  Requesting...
                </motion.span>
              ) : locationEnabled ? (
                <motion.span
                  key="enabled"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-1.5"
                >
                  <span>Location Enabled</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  Enable Location
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Maybe Later Link */}
          <motion.button
            type="button"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFinish}
            className="text-sm font-semibold text-neutral-300 underline underline-offset-4 transition-colors hover:text-white disabled:opacity-50"
          >
            Maybe later
          </motion.button>

          {/* Submission Error Display */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center text-xs font-medium text-rose-500"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Golden Subtitle Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="pt-8 text-center text-xs font-semibold tracking-wide text-amber-500"
          >
            *You can change this later in settings.
          </motion.p>
        </div>
      </section>

      {/* Continue Action */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="pt-6 pb-2 lg:pt-0 lg:pb-0"
      >
        <OnboardingContinueButton
          type="button"
          onClick={handleFinish}
          disabled={isSubmitting}
        />
      </motion.footer>
    </motion.div>
  );
};

export default LocationStepPage;