import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightGridProps {
  children?: React.ReactNode;
  className?: string;
}

export const SpotlightGridBackground: React.FC<SpotlightGridProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw cursor motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics spring interpolations to avoid rigid/jittery cursor tracking
  const springX = useSpring(mouseX, { stiffness: 400, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 35 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-hidden bg-[#070708] ${className}`}
    >
      {/* 1. Base Static Dot Matrix with subtle entrance fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Cursor Spotlight Orb with Spring Physics Tracking */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pointer-events-none absolute -left-[175px] -top-[175px] z-0 h-[350px] w-[350px] rounded-full will-change-transform"
        style={{
          x: springX,
          y: springY,
          background:
            'radial-gradient(circle closest-side, rgba(240, 90, 48, 0.35) 0%, rgba(200, 40, 20, 0.12) 50%, transparent 100%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 3. Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightGridBackground;