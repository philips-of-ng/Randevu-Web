import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import images from "@/assets/images";
import { OnboardingHeader } from "./Topbar";

export const OnboardingLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const match = location.pathname.match(/step-(\d+)/);
  const currentStep = match ? parseInt(match[1], 10) : 8;
  const totalSteps = 8;

  return (
    <div className="flex min-h-[100dvh] w-full bg-black text-white antialiased">
      {/* Left Column: Fixed desktop visual banner */}
      <aside className="relative hidden w-1/2 overflow-hidden border-r border-neutral-900 lg:block lg:min-h-[100dvh]">
        <img
          src={images.peoplePartying}
          alt="People partying at Randevu event"
          className="h-full w-full object-cover object-center brightness-[0.7]"
        />

        {/* Ambient Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black" />

        {/* Brand Caption */}
        <div className="absolute bottom-12 left-12 right-12 z-10 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Randevu Experiences
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white xl:text-3xl">
            Never miss the best parties, underground raves, and exclusive vibes.
          </h2>
        </div>
      </aside>

      {/* Right Column: Dynamic mobile/desktop container */}
      <main className="flex min-h-[100dvh] flex-1 flex-col justify-between px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-12 lg:justify-center lg:py-12 lg:px-16 xl:px-24">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between lg:flex-initial lg:gap-10">
          {/* Top Bar Navigation */}
          <OnboardingHeader
            currentStep={currentStep}
            totalSteps={totalSteps}
            onBack={() => navigate(-1)}
          />

          {/* Child Step View (Vertically centered on desktop) */}
          <div className="flex flex-1 flex-col justify-between lg:flex-initial">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};