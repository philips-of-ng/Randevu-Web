import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuth, User } from "./AuthContext";

export interface OnboardingData {
  username?: string;
  avatarUrl?: string;
  birthday?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  countryCode?: string;
  countryDial?: string;
  otp?: string;
  devOtp?: string;
  role?: "ATTENDEE" | "ORGANIZER";
  location?: string;
  interests?: string[];
  [key: string]: unknown;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  resetData: () => void;
  sendOtp: (email: string, phone: string, channel?: "sms" | "email") => Promise<string | undefined>;
  verifyOtp: (otp: string) => Promise<void>;
  submitOnboarding: (overrideFields?: Partial<OnboardingData>) => Promise<User | undefined>;
  isSubmitting: boolean;
  error: string | null;
  clearError: () => void;
}

const STORAGE_KEY = "randevu_onboarding_draft";

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setAuthSession } = useAuth();

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

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to cache onboarding draft:", err);
    }
  }, [data]);

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const resetData = () => {
    setData({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const clearError = () => setError(null);

  const sendOtp = async (
    email: string,
    phone: string,
    channel: "sms" | "email" = "sms"
  ): Promise<string | undefined> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/send-otp", {
        email,
        phone,
        channel,
      });
      const devOtp = response.data?.devOtp || response.data?.data?.devOtp;
      if (devOtp) {
        console.info(`[DEV OTP] Code is: ${devOtp}`);
        updateData({ devOtp: String(devOtp) });
      }
      return devOtp;
    } catch (err: any) {
      const message = err?.message || "Failed to send verification code.";
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async (otpCode: string): Promise<void> => {
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.post("/auth/verify-otp", {
        email: data.email,
        phone: data.phone,
        otp: otpCode,
      });
      updateData({ otp: otpCode });
    } catch (err: any) {
      const message = err?.message || "Invalid or expired 4-digit code.";
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOnboarding = async (
    overrideFields?: Partial<OnboardingData>
  ): Promise<User | undefined> => {
    setIsSubmitting(true);
    setError(null);
    const payload = { ...data, ...overrideFields };

    console.log('payload from noboarding', payload);
    

    try {
      const response = await apiClient.post("/onboarding/complete", payload);
      const raw = response.data;
      const receivedToken: string = raw?.token || raw?.data?.token;
      const receivedUser: User = raw?.user || raw?.data?.user;

      if (receivedToken && receivedUser) {
        setAuthSession(receivedToken, receivedUser);
      }

      return receivedUser;
    } catch (err: any) {
      const message = err?.message || "Failed to complete onboarding. Please try again.";
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
        sendOtp,
        verifyOtp,
        submitOnboarding,
        isSubmitting,
        error,
        clearError,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};