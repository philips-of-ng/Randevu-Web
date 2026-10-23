import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";

import LandingPage from "./features/marketing/routes/landing-page";

import ProtectedRoute from "./components/ProtectedRoute";
import { OnboardingLayout } from "./features/onboarding/components/OnboardingLayout";
import { UsernameStepPage } from "./features/onboarding/pages/UsernameStepPage";
import { PhotoStepPage } from "./features/onboarding/pages/PhotoStepPage";
import { BirthdayStepPage } from "./features/onboarding/pages/BirthdayStepPage";
import { ContactStepPage } from "./features/onboarding/pages/ContactStepPage";
import { OtpVerificationStepPage } from "./features/onboarding/pages/OtpVerificationStepPage";
import { RoleSelectionStepPage } from "./features/onboarding/pages/RoleSelectionStepPage";
import { LocationStepPage } from "./features/onboarding/pages/LocationStepPage";
import { OnboardingSuccessPage } from "./features/onboarding/pages/OnboardingSuccessPage";
import CreateEventPage from "./features/events/create/pages/CreateEventPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Nested Onboarding Flow wrapped with OnboardingProvider */}
            <Route
              path="/onboarding"
              element={
                <OnboardingProvider>
                  <OnboardingLayout />
                </OnboardingProvider>
              }
            >
              <Route index element={<Navigate to="step-1" replace />} />
              <Route path="step-1" element={<UsernameStepPage />} />
              <Route path="step-2" element={<PhotoStepPage />} />
              <Route path="step-3" element={<BirthdayStepPage />} />
              <Route path="step-4" element={<ContactStepPage />} />
              <Route path="step-5" element={<OtpVerificationStepPage />} />
              <Route path="step-6" element={<RoleSelectionStepPage />} />
              <Route path="step-7" element={<LocationStepPage />} />
              <Route path="success" element={<OnboardingSuccessPage />} />
            </Route>

            {/* Authenticated Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Dashboard and ticket routes go here */}
            </Route>

            {/* Event Creation Route */}
            <Route path="/events/create" element={<CreateEventPage />} />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;