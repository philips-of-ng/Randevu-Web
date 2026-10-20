import React from 'react';
import { motion, type Variants } from 'framer-motion';
import GlowRedButton from '@/components/ui/GlowRedButton';
import images from '@/assets/images';

interface HostingSectionProps {
  backgroundImage?: string;
  onStartHosting?: () => void;
}

const contentFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const copyFadeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    },
  },
};

export const HostingSection: React.FC<HostingSectionProps> = ({
  backgroundImage = '/assets/images/party-hosting-bg.jpg',
  onStartHosting,
}) => {
  return (
    <section className="relative flex min-h-[580px] w-full flex-col justify-between overflow-hidden bg-black px-6 py-12 text-white sm:min-h-[680px] sm:px-12 sm:py-16 md:px-20 md:py-20 lg:min-h-[760px]">
      {/* Background Image Layer with subtle zoom-out reveal */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.2 }}
          whileInView={{ scale: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          src={images.peoplePartying}
          alt="Hosting events atmosphere"
          className="h-full w-full object-cover object-center filter brightness-75 contrast-125"
        />
        {/* Soft edge vignette & darkening gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/75" />
      </div>

      {/* Top Left: Main Heading & Action Button */}
      <motion.div
        variants={contentFadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative z-10 max-w-xl"
      >
        <h2 className="font-serif text-4xl font-normal leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
          Built for{' '}
          <span className="font-serif text-[#E8202A]">hosting</span>
          <br />
          the Proper Events
        </h2>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-block sm:mt-8"
        >
          <GlowRedButton
            label="Start hosting"
            className="font-sans !px-5 !py-2.5 !text-sm"
            onClick={onStartHosting ?? (() => console.log('Start hosting clicked'))}
          />
        </motion.div>
      </motion.div>

      {/* Bottom Right: Description Copy */}
      <motion.div
        variants={copyFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="relative z-10 mt-16 max-w-sm self-end text-right sm:mt-24 sm:max-w-md sm:text-left md:text-right"
      >
        <p className="font-sans text-xs font-light leading-relaxed tracking-wide text-neutral-300 sm:text-sm md:text-base">
          Create an event in under two minutes, sell tickets, manage the door,
          and keep the vibe going — without the usual chaos.
        </p>
      </motion.div>
    </section>
  );
};

export default HostingSection;