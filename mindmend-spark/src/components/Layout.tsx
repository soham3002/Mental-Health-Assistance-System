
import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className={cn(
          "flex-1 transition-opacity duration-500 ease-in-out",
          mounted ? "opacity-100" : "opacity-0",
          isHomePage ? "" : "pt-16 md:pt-20"
        )}
      >
        {children}
      </main>
    </div>
  );
};
