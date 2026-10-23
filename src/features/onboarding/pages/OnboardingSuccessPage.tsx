import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useOnboarding } from "@/context/OnboardingContext";

export const OnboardingSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, resetData } = useOnboarding();

  useEffect(() => {
    // Fire real full-screen particle confetti burst on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#fbbf24", "#f43f5e", "#4ade80", "#ec4899"],
      });
    } catch {
      // Graceful fallback if canvas-confetti fails
    }
  }, []);

  const handleDone = () => {
    // Clean up temporary draft state from session storage
    resetData();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col justify-between py-6 lg:flex-initial lg:gap-16"
    >
      {/* Celebration Graphic */}
      <section className="flex flex-col items-center justify-center pt-10 text-center">
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
          {/* Confetti & Streamers Burst Layer (Scale & Spin Up) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.15,
            }}
            className="pointer-events-none absolute inset-0 -m-6 select-none"
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              {/* Confetti particles */}
              <circle cx="100" cy="20" r="2.5" fill="#38bdf8" />
              <circle cx="175" cy="85" r="2.5" fill="#fbbf24" />
              <circle cx="165" cy="145" r="3" fill="#f43f5e" />
              <circle cx="35" cy="150" r="2.5" fill="#4ade80" />
              <circle cx="25" cy="80" r="2.5" fill="#ec4899" />

              {/* Spark lines */}
              <path d="M100 45 L100 28" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M140 60 L158 42" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M155 100 L175 100" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M140 140 L158 158" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 155 L100 175" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M60 140 L42 158" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M45 100 L25 100" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M60 60 L42 42" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />

              {/* Ribbons */}
              <path
                d="M105 18 C112 32, 98 42, 110 58"
                stroke="#38bdf8"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M168 68 C156 82, 172 94, 156 108"
                stroke="#ec4899"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M32 120 C42 132, 28 142, 38 158"
                stroke="#4ade80"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M148 132 C158 144, 142 154, 152 168"
                stroke="#fbbf24"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Center Checkmark Disc */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/90 shadow-2xl backdrop-blur-md sm:h-52 sm:w-52"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-20 w-20 drop-shadow-[0_0_16px_rgba(74,222,128,0.7)]"
            >
              <motion.polyline
                points="4 12 9 17 20 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.3,
                }}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.4 }}
          className="mt-8 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          {data.username ? `All done, ${data.username}!` : "All done!"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.45 }}
          className="mt-2 text-sm font-medium text-neutral-400"
        >
          Get Ready to Partyyyyyyyyy!
        </motion.p>
      </section>

      {/* Done Button */}
      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.5 }}
        className="pt-8 pb-2 lg:pt-0 lg:pb-0"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDone}
          className="w-full rounded-full bg-white py-4 text-center text-base font-bold text-black shadow-lg transition-colors hover:bg-neutral-200"
        >
          Done
        </motion.button>
      </motion.footer>
    </motion.div>
  );
};

export default OnboardingSuccessPage;