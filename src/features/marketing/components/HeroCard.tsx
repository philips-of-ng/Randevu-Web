import React from 'react';
import { motion } from 'framer-motion';

interface HeroCardProps {
  imageSrc: string;
  altText?: string;
  className?: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  imageSrc,
  altText = 'Event atmosphere',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl transition-colors duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${className}`}
    >
      <motion.img
        src={imageSrc}
        alt={altText}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        loading="lazy"
      />

      {/* Subtle overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      {/* Ambient hover sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
};

export default HeroCard;