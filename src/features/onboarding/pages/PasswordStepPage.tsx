import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react";
import { OnboardingContinueButton } from "../components/ContinueBtn";
import { useOnboarding } from "@/context/OnboardingContext";

export const PasswordStepPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();

  const [password, setPassword] = useState((data.password as string) || "");
  const [confirmPassword, setConfirmPassword] = useState((data.confirmPassword as string) || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Real-time password strength criteria
  const checks = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    return Object.values(checks).filter(Boolean).length;
  }, [checks]);

  const strengthLabel = useMemo(() => {
    if (password.length === 0) return "";
    if (strengthScore <= 1) return "Weak";
    if (strengthScore === 2 || strengthScore === 3) return "Good";
    return "Strong";
  }, [password, strengthScore]);

  const strengthColor = useMemo(() => {
    if (strengthScore <= 1) return "bg-rose-500";
    if (strengthScore === 2 || strengthScore === 3) return "bg-amber-500";
    return "bg-emerald-500";
  }, [strengthScore]);

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    updateData({ password });
    
    navigate("/onboarding/step-7");
  };

  const isComplete = password.length >= 8 && password === confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Inputs */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Secure your account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-3 text-sm text-neutral-400"
        >
          Create a strong password so you can log back in anytime.
        </motion.p>

        <form onSubmit={handleContinue} className="mt-8 space-y-4">
          {/* Password Input */}
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-4 text-neutral-400">
              <Lock className="h-5 w-5" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Password"
              autoFocus
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-12 pr-12 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 text-neutral-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-4 text-neutral-400">
              <Lock className="h-5 w-5" />
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Confirm password"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-12 pr-12 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-4 text-neutral-400 hover:text-white transition-colors"
            >
              {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Live Strength Indicator */}
          {password.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 space-y-2 pt-1"
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-400">Password strength:</span>
                <span
                  className={
                    strengthScore <= 1
                      ? "text-rose-500"
                      : strengthScore <= 3
                      ? "text-amber-500"
                      : "text-emerald-400"
                  }
                >
                  {strengthLabel}
                </span>
              </div>
              {/* Strength Bars */}
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-colors duration-300 ${
                      strengthScore >= step ? strengthColor : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  {checks.length ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <X className="h-3.5 w-3.5 text-neutral-600" />}
                  <span>8+ characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {checks.uppercase ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <X className="h-3.5 w-3.5 text-neutral-600" />}
                  <span>Uppercase letter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {checks.number ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <X className="h-3.5 w-3.5 text-neutral-600" />}
                  <span>A number</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {checks.special ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <X className="h-3.5 w-3.5 text-neutral-600" />}
                  <span>Special symbol</span>
                </div>
              </div>
            </motion.div>
          )}

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

export default PasswordStepPage;