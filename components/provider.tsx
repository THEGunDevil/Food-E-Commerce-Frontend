// components/providers.tsx - Grid Layout Version
"use client";

import { useState, useEffect } from "react";
import { Footer } from "./footer";
import { ThemeToggleButton } from "./ui/shadcn-io/theme-toggle-button";
import BanCheck from "./banCheck";
import { AuthProvider } from "@/contexts/authContext";
import Header from "./header";
import SideBarNav from "./sideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
type Theme = "light" | "dark";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>("light");
const queryClient = new QueryClient();
  // Load saved theme
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <AuthProvider>
      <BanCheck>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <SideBarNav />
          
          {/* Main Content - Takes remaining space */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <div className="container mx-auto px-4">
                <Header />
              </div>
            </div>
            
            {/* Theme Toggle */}
            <div className="fixed top-24 sm:top-[116px] right-4 z-10">
              <ThemeToggleButton
                theme={theme}
                onClick={toggleTheme}
                variant="circle-blur"
                start="top-right"
              />
            </div>
            
            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-6">
              <QueryClientProvider client={queryClient}>
              {children}
              </QueryClientProvider>
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </BanCheck>
    </AuthProvider>
  );
}