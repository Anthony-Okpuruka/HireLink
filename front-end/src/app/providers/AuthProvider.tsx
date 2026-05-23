"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiService, User, JobseekerProfile, EmployerProfile } from "@/lib/api-service";

interface AuthContextType {
  user: User | JobseekerProfile | EmployerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userDetails: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  roleOverride: "jobseeker" | "employer" | "admin" | null;
  setRoleOverride: (role: "jobseeker" | "employer" | "admin" | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | JobseekerProfile | EmployerProfile | null>(null);
  const [roleOverride, setRoleOverrideState] = useState<"jobseeker" | "employer" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load roleOverride on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOverride = localStorage.getItem("dev_role_override") as "jobseeker" | "employer" | "admin" | null;
      if (savedOverride && ["jobseeker", "employer", "admin"].includes(savedOverride)) {
        setRoleOverrideState(savedOverride);
      }
    }
  }, []);

  const setRoleOverride = useCallback((role: "jobseeker" | "employer" | "admin" | null) => {
    setRoleOverrideState(role);
    if (typeof window !== "undefined") {
      if (role) {
        localStorage.setItem("dev_role_override", role);
      } else {
        localStorage.removeItem("dev_role_override");
      }
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await apiService.users.getMe();
      if (response && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn("Failed to fetch user profile:", err);
      setUser(null);
      // If the profile fetch fails (e.g. token expired), clean up
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          await fetchProfile();
          return;
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [fetchProfile]);

  const login = useCallback((token: string, userDetails: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    setUser(userDetails);
    fetchProfile(); // Load full profile asynchronously
  }, [fetchProfile]);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    await fetchProfile();
  }, [fetchProfile]);

  // Compute active user role override
  const activeUser = roleOverride
    ? user
      ? { ...user, role: roleOverride }
      : {
          id: 999,
          name: `Dev ${roleOverride.charAt(0).toUpperCase() + roleOverride.slice(1)}`,
          email: `dev-${roleOverride}@hirelink.com`,
          role: roleOverride,
          created_at: new Date().toISOString(),
        }
    : user;

  const isAuthenticated = !!activeUser;

  return (
    <AuthContext.Provider
      value={{
        user: activeUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshUser,
        roleOverride,
        setRoleOverride,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
