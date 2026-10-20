import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";

export const UsernameStepPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = username.trim();

    if (!trimmed) {
      setError("Please choose a username");
      return;
    }
    if (trimmed.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setError(null);
    navigate("/onboarding/step-2");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Input Fields */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          What should we call you?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-3 text-sm text-neutral-400"
        >
          This is how you&apos;ll appear to others on Randevu.
        </motion.p>

        <form onSubmit={handleContinue} className="mt-8 space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="relative flex items-center"
          >
            <span className="pointer-events-none absolute left-4 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Username"
              autoFocus
              autoComplete="off"
              className={`w-full rounded-full border bg-neutral-900/60 py-3.5 pl-12 pr-5 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all ${
                error
                  ? "border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                  : "border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              }`}
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 text-xs font-medium text-rose-500"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </section>

      {/* Button stays at bottom on mobile, sits directly beneath input card on desktop */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="pt-6 pb-2 lg:pt-0 lg:pb-0"
      >
        <OnboardingContinueButton
          type="button"
          onClick={handleContinue}
          disabled={!username.trim()}
        />
      </motion.footer>
    </motion.div>
  );
};