
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Calendar, MessageCircle } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboardActive = location.pathname === "/dashboard";
  const isRecommendationsActive = location.pathname === "/recommendations";
  const isAppointmentsActive = location.pathname === "/appointments";
  const isMessagingActive = location.pathname === "/messaging";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHomePage) {
    return (
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
          isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-mindmend-lavender" />
            <span className="font-semibold text-xl">MindMend</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-mindmend-text hover:text-mindmend-blue transition-colors">Home</Link>
          </div>
          <Button asChild className="bg-gradient-to-r from-mindmend-blue to-mindmend-teal text-white hover:shadow-lg transition-all duration-300">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto z-50 bg-white/90 backdrop-blur-lg shadow-sm border-t md:border-b md:border-t-0 border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6 md:px-12 md:py-4">
        <Link to="/" className="hidden md:flex items-center space-x-2">
          <Heart className="h-6 w-6 text-mindmend-lavender" />
          <span className="font-semibold text-xl">MindMend</span>
        </Link>
        
        <div className="flex items-center justify-around w-full md:w-auto md:justify-end md:space-x-8">
          <Link to="/dashboard" className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            isDashboardActive ? "text-mindmend-blue" : "text-mindmend-text-muted hover:text-mindmend-blue"
          )}>
            <Activity className="h-6 w-6 mb-1" />
            <span className="text-xs md:text-sm font-medium">Dashboard</span>
          </Link>
          
          <Link to="/recommendations" className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            isRecommendationsActive ? "text-mindmend-teal" : "text-mindmend-text-muted hover:text-mindmend-teal"
          )}>
            <Heart className="h-6 w-6 mb-1" />
            <span className="text-xs md:text-sm font-medium">Activities</span>
          </Link>
          
          <Link to="/appointments" className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            isAppointmentsActive ? "text-mindmend-green" : "text-mindmend-text-muted hover:text-mindmend-green"
          )}>
            <Calendar className="h-6 w-6 mb-1" />
            <span className="text-xs md:text-sm font-medium">Appointments</span>
          </Link>
          
          <Link to="/messaging" className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            isMessagingActive ? "text-mindmend-lavender" : "text-mindmend-text-muted hover:text-mindmend-lavender"
          )}>
            <MessageCircle className="h-6 w-6 mb-1" />
            <span className="text-xs md:text-sm font-medium">Messages</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
