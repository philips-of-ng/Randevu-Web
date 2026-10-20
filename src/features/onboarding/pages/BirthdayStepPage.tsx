import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";

export const BirthdayStepPage: React.FC = () => {
  const navigate = useNavigate();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(val);
    if (error) setError(null);
    if (val.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(val);
    if (error) setError(null);
    if (val.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(val);
    if (error) setError(null);
  };

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!day || !month || !year || day.length < 2 || month.length < 2 || year.length < 4) {
      setError("Please enter a complete date of birth");
      return;
    }

    if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1920 || y > new Date().getFullYear()) {
      setError("Please enter a valid date");
      return;
    }

    setError(null);
    navigate("/onboarding/step-4");
  };

  const isComplete = day.length === 2 && month.length === 2 && year.length === 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Date Inputs */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          When is your birthday?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-3 text-sm text-neutral-400"
        >
          We only need this to suggest appropriate parties for you.
        </motion.p>

        <form onSubmit={handleContinue} className="mt-8 space-y-3">
          {/* Grouped Pill Input Container with subtle glow on focus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className={`flex items-center justify-center rounded-full border bg-neutral-900/60 py-3.5 px-6 font-mono text-base font-medium text-white transition-all ${
              error
                ? "border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                : "border-neutral-800 focus-within:border-neutral-500 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.06)] focus-within:ring-1 focus-within:ring-neutral-500"
            }`}
          >
            {/* Day Input */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="01"
              value={day}
              onChange={handleDayChange}
              autoFocus
              className="w-8 bg-transparent text-center text-white placeholder-neutral-500 outline-none"
            />
            <span className="text-neutral-500">/</span>

            {/* Month Input */}
            <input
              ref={monthRef}
              type="text"
              inputMode="numeric"
              placeholder="01"
              value={month}
              onChange={handleMonthChange}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !month) {
                  // Focus previous field if current is empty
                }
              }}
              className="w-12 bg-transparent text-center text-white placeholder-neutral-500 outline-none"
            />
            <span className="text-neutral-500">/</span>

            {/* Year Input */}
            <input
              ref={yearRef}
              type="text"
              inputMode="numeric"
              placeholder="2000"
              value={year}
              onChange={handleYearChange}
              className="w-16 bg-transparent text-center text-white placeholder-neutral-500 outline-none"
            />
          </motion.div>

          {/* Smooth error pop */}
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
        </form>
      </section>

      {/* Continue Action */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="pt-6 pb-2 lg:pt-0 lg:pb-0"
      >
        <OnboardingContinueButton
          type="button"
          onClick={handleContinue}
          disabled={!isComplete}
        />
      </motion.footer>
    </motion.div>
  );
};