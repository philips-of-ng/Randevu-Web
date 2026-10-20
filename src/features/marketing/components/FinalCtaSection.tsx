import React from 'react';
import { motion, type Variants } from 'framer-motion';
import GlowRedButton from '@/components/ui/GlowRedButton';

interface FinalCtaSectionProps {
  onCreateEvent?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCreateEvent }) => {
  return (
    <section className="relative w-full overflow-hidden bg-black px-4 py-24 text-white sm:py-36">
      {/* Animated soft ambient center underglow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: [0.85, 1.1, 1] }}
        viewport={{ once: true }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8202A]/15 blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Karma Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-serif text-3xl font-normal leading-[1.18] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          <span className="text-[#E8202A]">Launch</span> your first event
          <br />
          in under 2 minutes
        </motion.h2>

        {/* Glow Red Action Button Container with spring micro-interaction */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 sm:mt-10"
        >
          <GlowRedButton
            label="Create Event"
            className="!px-6 !py-3 font-sans !text-sm font-medium"
            onClick={onCreateEvent ?? (() => console.log('Create Event clicked'))}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCtaSection;