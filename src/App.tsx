import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";

import LandingPage from "./features/marketing/routes/landing-page";
import ProtectedRoute from "./components/ProtectedRoute";

// Onboarding imports
import { OnboardingLayout } from "./features/onboarding/components/OnboardingLayout";
import { UsernameStepPage } from "./features/onboarding/pages/UsernameStepPage";
import { PhotoStepPage } from "./features/onboarding/pages/PhotoStepPage";
import { BirthdayStepPage } from "./features/onboarding/pages/BirthdayStepPage";
import { ContactStepPage } from "./features/onboarding/pages/ContactStepPage";
import { OtpVerificationStepPage } from "./features/onboarding/pages/OtpVerificationStepPage";
import { RoleSelectionStepPage } from "./features/onboarding/pages/RoleSelectionStepPage";
import { LocationStepPage } from "./features/onboarding/pages/LocationStepPage";
import { OnboardingSuccessPage } from "./features/onboarding/pages/OnboardingSuccessPage";

// Organizer Portal imports
import OrganizerLayout from "./features/organizer/layout/OrganizerLayout";
import DashboardPage from "./features/organizer/dashboard/pages/DashboardPage";
import CreateEventPage from "./features/organizer/events/create/pages/CreateEventPage";
import ManageEventsPage from "./features/organizer/events/pages/ManageEventsPage";
import EventDetailsPage from "./features/organizer/events/pages/EventDetailsPage";

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
            {/* Public Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Multi-step Onboarding Flow */}
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

            {/* Organizer Portal (Collapsible Sidebar + Header shell) */}
            <Route path="/organizer" element={<OrganizerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="events" element={<ManageEventsPage />} />
              <Route path="events/:eventId" element={<EventDetailsPage />} />
              <Route path="events/create" element={<CreateEventPage />} />
            </Route>

            {/* Standalone Event Creation alias / fallback */}
            <Route path="/events/create" element={<CreateEventPage />} />

            {/* Authenticated attendee/global routes */}
            <Route element={<ProtectedRoute />}>
              {/* Authenticated attendee tickets / profile views go here */}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;