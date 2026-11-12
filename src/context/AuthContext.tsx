import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../lib/api-client";

export interface LoginInput {
  email: string;
  password?: string;
  [key: string]: unknown;
}

export interface RegisterInput {
  email: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  role?: "ATTENDEE" | "ORGANIZER";
  [key: string]: unknown;
}

export interface OrganizerBalance {
  availableBalance: number | string;
  pendingBalance: number | string;
  currency: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  fullName: string;
  avatarUrl?: string | null;
  birthday?: string | null;
  phoneNumber?: string | null;
  countryCode?: string | null;
  location?: string | null;
  role: "ATTENDEE" | "ORGANIZER" | "SCANNER" | "ADMIN" | string;
  organizerBalance?: OrganizerBalance | null;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  setAuthSession: (token: string, user: User) => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("randevu_token"));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    console.info("[AuthContext] Step: fetchCurrentUser initiated. Checking stored token...");
    try {
      const storedToken = localStorage.getItem("randevu_token");
      if (!storedToken) {
        console.warn("[AuthContext] fetchCurrentUser: No token found in localStorage.");
        setUser(null);
        setLoading(false);
        return;
      }

      console.info("[AuthContext] fetchCurrentUser: Calling GET /auth/me with token...");
      const response = await apiClient.get("/auth/me");
      const raw = response.data;
      console.debug("[AuthContext] fetchCurrentUser: Response received:", raw);

      const resolvedUser: User = raw?.user || raw?.data?.user || raw?.data;
      setUser(resolvedUser || null);
      console.info("[AuthContext] fetchCurrentUser: User session successfully hydrated:", resolvedUser?.email);
    } catch (err) {
      console.error("[AuthContext] fetchCurrentUser error: Failed to fetch current user, clearing session.", err);
      localStorage.removeItem("randevu_token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.info("[AuthContext] Effect: Token state changed, running fetchCurrentUser(). Token exists:", Boolean(token));
    fetchCurrentUser();
  }, [token]);

  const setAuthSession = (newToken: string, newUser: User) => {
    console.info("[AuthContext] Step: setAuthSession executing for user:", newUser?.email);
    localStorage.setItem("randevu_token", newToken);
    setToken(newToken);
    setUser(newUser);
    console.info("[AuthContext] setAuthSession: Session state successfully stored and updated.");
  };

  const login = async (input: LoginInput): Promise<User> => {
    console.info("[AuthContext] Step: login called with raw plain payload:", input);

    try {
      console.info("[AuthContext] login: Dispatching POST /auth/login request...");
      const response = await apiClient.post("/auth/login", input);
      const raw = response.data;
      console.debug("[AuthContext] login: Response payload received:", raw);

      const receivedToken: string = raw?.token || raw?.data?.token;
      const receivedUser: User = raw?.user || raw?.data?.user;

      if (!receivedToken) {
        console.warn("[AuthContext] login warning: Response succeeded but token was missing!");
      }

      setAuthSession(receivedToken, receivedUser);
      console.info("[AuthContext] Step: login completed successfully for user:", receivedUser?.email);
      return receivedUser;
    } catch (err) {
      console.error("[AuthContext] login error: Failed during login request.", err);
      throw err;
    }
  };

  const register = async (input: RegisterInput): Promise<User> => {
    console.info("[AuthContext] Step: register called with raw plain payload:", input);

    try {
      console.info("[AuthContext] register: Dispatching POST /auth/register request...");
      const response = await apiClient.post("/auth/register", input);
      const raw = response.data;
      console.debug("[AuthContext] register: Response payload received:", raw);

      const receivedToken: string = raw?.token || raw?.data?.token;
      const receivedUser: User = raw?.user || raw?.data?.user;

      setAuthSession(receivedToken, receivedUser);
      console.info("[AuthContext] Step: register completed successfully for user:", receivedUser?.email);
      return receivedUser;
    } catch (err) {
      console.error("[AuthContext] register error: Failed during registration request.", err);
      throw err;
    }
  };

  const logout = () => {
    console.info("[AuthContext] Step: logout triggered. Clearing storage and redirecting...");
    localStorage.removeItem("randevu_token");
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        setAuthSession,
        logout,
        refetchUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};