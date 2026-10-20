import React from 'react';

interface GlowRedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const GlowRedButton: React.FC<GlowRedButtonProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="relative inline-block group">
      {/* Ambient Red Glow Layer */}
      <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 opacity-60 blur-md transition duration-300 group-hover:opacity-100" />

      {/* Button Surface */}
      <button
        className={`relative inline-flex items-center justify-center rounded-sm bg-linear-to-b from-[#ff2a2a] via-[#e50914] to-[#b30000] px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg transition-transform duration-150 active:scale-95 ${className}`}
        {...props}
      >
        {label}
      </button>
    </div>
  );
};

export default GlowRedButton;