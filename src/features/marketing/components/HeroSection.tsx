import React from "react";
import { motion, type Variants } from "framer-motion";
import SpotlightGridBackground from "./SpotlightGridBackground";
import GlowRedButton from "@/components/ui/GlowRedButton";
import DarkOutlineButton from "@/components/ui/DarkOutlineButton";
import HeroCard from "./HeroCard";
import images from "@/assets/images";

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <SpotlightGridBackground className="min-h-screen px-4 pt-10 pb-16 sm:pt-16 sm:pb-24 text-white">
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        {/* Main Heading */}
        <motion.h1
          variants={heroItemVariants}
          className="max-w-3xl font-serif text-3xl font-normal leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Find the{" "}
          <span className="inline-block bg-gradient-to-b from-[#FDBC77] via-[#F87147] to-[#E34133] bg-clip-text text-transparent">
            Events
          </span>{" "}
          worth showing up for.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroItemVariants}
          className="mt-4 sm:mt-6 max-w-md sm:max-w-xl text-xs sm:text-sm font-normal text-neutral-400 leading-relaxed tracking-wide px-2"
        >
          Randevu is the all-in-one home for hosting and discovering the hottest
          events near you.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={heroItemVariants}
          className="mt-6 sm:mt-8 flex xs:flex-row items-center justify-center gap-3 sm:gap-4 mx-auto xs:w-auto"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full xs:w-auto"
          >
            <GlowRedButton
              label="Host an Event"
              className="w-full xs:w-auto px-6 py-2.5 text-sm"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full xs:w-auto"
          >
            <DarkOutlineButton
              label="Find Events"
              className="w-full xs:w-auto px-6 py-2.5 text-sm justify-center whitespace-nowrap"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              }
            />
          </motion.div>
        </motion.div>

        {/* Arched Photo Grid */}
        <motion.div
          variants={cardsContainerVariants}
          className="mt-12 sm:mt-16 flex w-full max-w-4xl items-end justify-center gap-2 sm:gap-3 md:gap-5 px-1 sm:px-4"
        >
          {/* Card 1: Far Left (Hidden on mobile <640px) */}
          <motion.div
            variants={cardItemVariants}
            className="hidden sm:block h-48 w-28 sm:h-56 sm:w-36 md:h-64 md:w-44 mb-8 sm:mb-12 shrink-0"
          >
            <HeroCard
              imageSrc={images.peoplePartying}
              className="h-full w-full"
            />
          </motion.div>

          {/* Card 2: Mid Left (Elevated slightly) */}
          <motion.div
            variants={cardItemVariants}
            className="h-44 w-28 xs:w-32 sm:h-52 sm:w-36 md:h-60 md:w-44 mb-4 sm:mb-6 shrink-0"
          >
            <HeroCard
              imageSrc={images.peoplePartying}
              className="h-full w-full"
            />
          </motion.div>

          {/* Card 3: Center Anchor (Taller, sits lowest) */}
          <motion.div
            variants={cardItemVariants}
            className="h-52 w-36 xs:w-40 sm:h-60 sm:w-44 md:h-72 md:w-48 mb-0 shrink-0"
          >
            <HeroCard
              imageSrc={images.peoplePartying}
              className="h-full w-full"
            />
          </motion.div>

          {/* Card 4: Mid Right (Elevated slightly) */}
          <motion.div
            variants={cardItemVariants}
            className="h-44 w-28 xs:w-32 sm:h-52 sm:w-36 md:h-60 md:w-44 mb-4 sm:mb-6 shrink-0"
          >
            <HeroCard
              imageSrc={images.peoplePartying}
              className="h-full w-full"
            />
          </motion.div>

          {/* Card 5: Far Right (Hidden on mobile <640px) */}
          <motion.div
            variants={cardItemVariants}
            className="hidden sm:block h-48 w-28 sm:h-56 sm:w-36 md:h-64 md:w-44 mb-8 sm:mb-12 shrink-0"
          >
            <HeroCard
              imageSrc={images.peoplePartying}
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </SpotlightGridBackground>
  );
};

export default HeroSection;
