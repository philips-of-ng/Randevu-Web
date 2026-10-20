import React from 'react';

interface DarkOutlineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
}

export const DarkOutlineButton: React.FC<DarkOutlineButtonProps> = ({
  label,
  icon,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-sm border border-red-600/70 bg-black/40 px-3.5 py-2 text-xs font-medium text-white transition-all duration-200 hover:border-red-500 hover:bg-red-950/20 active:scale-95 ${className}`}
      {...props}
    >
      <span>{label}</span>
      {icon && <span className="text-neutral-400">{icon}</span>}
    </button>
  );
};

export default DarkOutlineButton;