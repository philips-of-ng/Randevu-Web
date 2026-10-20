import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";

type RoleOption = "host" | "find" | "both";

interface RoleItem {
  id: RoleOption;
  label: string;
}

const ROLES: RoleItem[] = [
  { id: "host", label: "I want to host parties" },
  { id: "find", label: "I want to find parties" },
  { id: "both", label: "I want to do both" },
];

export const RoleSelectionStepPage: React.FC = () => {
  const navigate = useNavigate();
  // Default selected to "find" matching the mockup design
  const [selectedRole, setSelectedRole] = useState<RoleOption>("find");

  const handleContinue = () => {
    if (!selectedRole) return;
    navigate("/onboarding/step-7");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Options */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          How do you want to use Randevu?
        </motion.h1>

        <div className="mt-10 flex flex-col space-y-4">
          {ROLES.map((role, idx) => {
            const isSelected = selectedRole === role.id;

            return (
              <motion.button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.06 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className={`relative flex w-full items-center rounded-full px-6 py-4 text-left transition-all duration-300 ${
                  isSelected
                    ? "border border-red-500/60 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 font-semibold text-white shadow-[0_0_28px_rgba(239,68,68,0.45)]"
                    : "border border-neutral-800 bg-neutral-900/60 font-medium text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/80"
                }`}
              >
                {/* Custom Radio Circle */}
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-white/80 bg-transparent"
                      : "border-neutral-600 bg-transparent"
                  }`}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="activeRoleDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-white"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Option Label */}
                <span className="ml-3.5 text-base leading-none">
                  {role.label}
                </span>
              </motion.button>
            );
          })}
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
          onClick={handleContinue}
          disabled={!selectedRole}
        />
      </motion.footer>
    </motion.div>
  );
};