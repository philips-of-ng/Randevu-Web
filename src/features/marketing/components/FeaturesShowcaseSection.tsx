import React from 'react';
import { motion, type Variants } from 'framer-motion';
import DeviceMockup from './DeviceMockup';

const textFadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const textFadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const mockupContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

export const FeaturesShowcaseSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black px-5 py-20 text-white sm:px-8 sm:py-32">
      {/* Subtle ambient brand glow in the background */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[500px] w-[500px] rounded-full bg-[#E8202A]/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-2/3 h-[500px] w-[500px] rounded-full bg-[#E8202A]/[0.03] blur-[120px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-24 sm:gap-36 lg:gap-44">

        {/* Feature Block 1: Text Left | Mockup Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col-reverse items-center justify-between gap-10 sm:gap-14 md:flex-row"
        >
          {/* Text Content */}
          <motion.div variants={textFadeLeftVariants} className="w-full text-left md:max-w-md">
            <h3 className="font-serif text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
              Create &amp; Launch an Event{' '}
              <span className="text-[#E8202A]">under 2 minutes</span>
            </h3>
            <p className="mt-4 max-w-sm font-sans text-xs font-light leading-relaxed text-neutral-400 sm:mt-5 sm:text-sm md:text-base">
              From idea to live event page with tickets — no complicated setup.
            </p>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            variants={mockupContainerVariants}
            className="flex w-full justify-center md:justify-end"
          >
            <DeviceMockup placeholderText="Product mockup here" />
          </motion.div>
        </motion.div>

        {/* Feature Block 2: Mockup Left | Text Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center justify-between gap-10 sm:gap-14 md:flex-row"
        >
          {/* Phone Mockup */}
          <motion.div
            variants={mockupContainerVariants}
            className="flex w-full justify-center md:justify-start"
          >
            <DeviceMockup placeholderText="Product mockup here" />
          </motion.div>

          {/* Text Content */}
          <motion.div variants={textFadeRightVariants} className="w-full text-left md:max-w-lg md:text-right">
            <h3 className="font-serif text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-[#E8202A]">Sell tickets</span>{' '}
              <span className="font-light text-neutral-500">(or keep it free)</span>{' '}
              with zero friction
            </h3>
            <p className="mt-4 max-w-sm font-sans text-xs font-light leading-relaxed text-neutral-400 sm:mt-5 sm:text-sm md:ml-auto md:text-base">
              One shareable link. Guests buy or RSVP instantly from anywhere.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Block 3: Text Left | Mockup Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col-reverse items-center justify-between gap-10 sm:gap-14 md:flex-row"
        >
          {/* Text Content */}
          <motion.div variants={textFadeLeftVariants} className="w-full text-left md:max-w-md">
            <h3 className="font-serif text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
              Manage Guestlists &amp; Access{' '}
              <span className="text-[#E8202A]">seamlessly</span>
            </h3>
            <p className="mt-4 max-w-sm font-sans text-xs font-light leading-relaxed text-neutral-400 sm:mt-5 sm:text-sm md:text-base">
              Fast QR check-ins and real-time attendance tracking right from your pocket.
            </p>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            variants={mockupContainerVariants}
            className="flex w-full justify-center md:justify-end"
          >
            <DeviceMockup placeholderText="Product mockup here" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturesShowcaseSection;