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
  [key: string]: unknown;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: "ATTENDEE" | "ORGANIZER" | "SCANNER" | "ADMIN" | string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("randevu_token"));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      const storedToken = localStorage.getItem("randevu_token");
      if (!storedToken) {
        setUser(null);
        setLoading(false);
        return;
      }
      const response = await apiClient.get<{ user: User }>("/auth/me");
      setUser(response.data.user);
    } catch {
      localStorage.removeItem("randevu_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [token]);

  const login = async (input: LoginInput) => {
    const response = await apiClient.post<{ token: string; user: User }>("/auth/login", input);
    const { token: receivedToken, user: receivedUser } = response.data;
    localStorage.setItem("randevu_token", receivedToken);
    setToken(receivedToken);
    setUser(receivedUser);
  };

  const register = async (input: RegisterInput) => {
    const response = await apiClient.post<{ token: string; user: User }>("/auth/register", input);
    const { token: receivedToken, user: receivedUser } = response.data;
    localStorage.setItem("randevu_token", receivedToken);
    setToken(receivedToken);
    setUser(receivedUser);
  };

  const logout = () => {
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