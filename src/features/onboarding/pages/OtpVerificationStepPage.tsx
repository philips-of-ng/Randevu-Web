import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";

export const OtpVerificationStepPage: React.FC = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal) {
      const nextOtp = [...otp];
      nextOtp[index] = "";
      setOtp(nextOtp);
      return;
    }

    const nextOtp = [...otp];
    if (cleanVal.length > 1) {
      const chars = cleanVal.slice(0, 4).split("");
      chars.forEach((c, i) => {
        if (i < 4) nextOtp[i] = c;
      });
      setOtp(nextOtp);
      const focusIdx = Math.min(chars.length, 3);
      inputRefs.current[focusIdx]?.focus();
      return;
    }

    nextOtp[index] = cleanVal.slice(-1);
    setOtp(nextOtp);
    if (error) setError(null);

    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const code = otp.join("");
    if (code.length < 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }

    setError(null);
    navigate("/onboarding/step-6");
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & OTP Inputs */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          We just sent you a 4-digit code via SMS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-3 text-sm text-neutral-400"
        >
          Enter the code sent to +1 (415) *** **87
        </motion.p>

        <form onSubmit={handleContinue} className="mt-10 flex flex-col items-center">
          {/* 4 Circular PIN Slots with staggered spring pop */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {otp.map((digit, idx) => {
              const isFilled = Boolean(digit);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.12 + idx * 0.05,
                  }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 sm:h-16 sm:w-16 ${
                    isFilled
                      ? "border-neutral-500 bg-neutral-900 shadow-[0_0_16px_rgba(255,255,255,0.08)]"
                      : "border-neutral-800 bg-neutral-900/60"
                  } focus-within:border-neutral-400 focus-within:ring-1 focus-within:ring-neutral-400`}
                >
                  <input
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    autoFocus={idx === 0}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="h-full w-full bg-transparent text-center font-mono text-xl font-bold text-white outline-none caret-neutral-400"
                  />
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 text-center text-xs font-medium text-rose-500"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Switch Delivery Channel */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Resend via email
            }}
            className="mt-8 text-sm font-semibold text-neutral-300 underline underline-offset-4 transition-colors hover:text-white"
          >
            Receive code via email instead
          </motion.button>
        </form>
      </section>

      {/* Continue Action */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
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