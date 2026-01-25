"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

// --------------------------
// Types
// --------------------------
interface DecodedToken {
  sub: string;
  role?: string;
  exp?: string;
  iat?: number;
}

interface AuthContextType {
  accessToken: string;
  login: (token: string) => void;
  logout: () => void;
  isAdmin: boolean;
  userID: string;
  refreshToken: () => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

// --------------------------
// Context
// --------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --------------------------
// Provider
// --------------------------
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const login = (token: string) => {
    setAccessToken(token);
  };

  const logout = async () => {
    setAccessToken("");
    setUserID("");
    setIsAdmin(false);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const refreshToken = async (): Promise<string | null> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setAccessToken(response.data.access_token);
      return response.data.access_token;
    } catch (err: any) {
      console.error("Refresh token failed:", err);
      setAccessToken("");
      setUserID("");
      setIsAdmin(false);
      return null;
    }
  };

  // Decode token whenever it changes
  useEffect(() => {
    if (accessToken) {
      try {
        const decoded: DecodedToken = jwtDecode(accessToken);
        setUserID(decoded.sub);
        setIsAdmin(decoded.role === "admin");
      } catch {
        setUserID("");
        setIsAdmin(false);
      }
    } else {
      setUserID("");
      setIsAdmin(false);
    }
  }, [accessToken]);

  // Initialize auth on page load
  // useEffect(() => {
  //   const initAuth = async () => {
  //     setLoading(true);
  //     try {
  //       const token = await refreshToken();
  //       if (token) setAccessToken(token);
  //     } catch (err) {
  //       setAccessToken("");
  //       setUserID("");
  //       setIsAdmin(false);
  //       setError("Failed to initialize authentication");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   initAuth();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isAdmin,
        userID,
        refreshToken,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --------------------------
// Hook
// --------------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
