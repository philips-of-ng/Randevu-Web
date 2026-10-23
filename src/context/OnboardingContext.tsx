import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

export interface OnboardingData {
  username?: string;
  avatarUrl?: string;
  birthday?: string;
  phone?: string;
  otp?: string;
  role?: 'ATTENDEE' | 'ORGANIZER';
  location?: string;
  interests?: string[];
  [key: string]: unknown;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  resetData: () => void;
  submitOnboarding: () => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const STORAGE_KEY = 'randevu_onboarding_draft';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state changes with sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to cache onboarding draft:', err);
    }
  }, [data]);

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const resetData = () => {
    setData({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const submitOnboarding = async () => {
    console.log('OBS DATA', data);
    
    setIsSubmitting(true);
    setError(null);
    try {
      // Dispatches complete aggregated onboarding payload
      await apiClient.post('/onboarding/complete', data);
      resetData();
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to complete onboarding. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        resetData,
        submitOnboarding,
        isSubmitting,
        error,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};