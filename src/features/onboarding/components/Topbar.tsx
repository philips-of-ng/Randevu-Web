import React from "react";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps?: number;
  onBack?: () => void;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps = 8,
  onBack,
}) => {
  return (
    <header className="flex w-full items-center justify-between py-4">
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white active:scale-95"
      >
        Back
      </button>

      <span className="font-mono text-sm font-semibold tracking-wider text-amber-500">
        {currentStep}/{totalSteps}
      </span>
    </header>
  );
};