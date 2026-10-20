import React from "react";

interface OnboardingContinueButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
}

export const OnboardingContinueButton: React.FC<OnboardingContinueButtonProps> = ({
  label = "Continue",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`group flex w-full items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-6 py-4 text-base font-semibold text-white transition-all hover:border-neutral-600 hover:bg-neutral-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:border-neutral-850 disabled:bg-neutral-900/40 disabled:text-neutral-600 ${className}`}
    >
      <span>{loading ? "Please wait..." : label}</span>
      {!loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
};