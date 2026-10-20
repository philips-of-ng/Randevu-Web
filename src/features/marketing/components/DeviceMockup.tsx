import React from 'react';
import { motion } from 'framer-motion';

interface DeviceMockupProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
  placeholderText?: string;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  imageSrc,
  altText = 'Product screen preview',
  className = '',
  placeholderText = 'Product mockup here',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className={`relative aspect-[9/18.5] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] overflow-hidden rounded-[2.5rem] border border-neutral-800 bg-[#0d0d0f] shadow-2xl shadow-black/80 transition-colors duration-300 hover:border-neutral-700 [perspective:1000px] ${className}`}
    >
      {/* Subtle screen bezel reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 ring-inset" />

      {/* Glossy diagonal sheen reflection on hover */}
      <div className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />

      {imageSrc ? (
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        /* Empty / Wireframe state matching the design */
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-neutral-400">
            {placeholderText}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default DeviceMockup;