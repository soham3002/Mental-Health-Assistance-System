
import React, { useState, useEffect } from "react";
import { AssessmentForm } from "@/components/AssessmentForm";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { hasCompletedAssessment } from "@/utils/assessmentUtils";
import { Heart, Activity, Calendar, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showAssessment, setShowAssessment] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    // Check if the user has completed the assessment
    setHasAssessment(hasCompletedAssessment());
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-mindmend-blue/20 to-mindmend-teal/10 opacity-50" />
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-mindmend-blue/10 blur-3xl animate-pulse-gentle" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-mindmend-teal/10 blur-3xl animate-pulse-gentle" />
          </div>

          <div className="container mx-auto px-6 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl animate-slide-up">
                <div className="mb-4 inline-block">
                  <div className="flex items-center text-xs font-medium px-3 py-1 rounded-full bg-mindmend-lavender/10 text-mindmend-lavender">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>Mental Wellbeing Platform</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Your Journey to Better Mental Health Starts Here
                </h1>
                <p className="text-lg text-mindmend-text-muted mb-8">
                  Track your wellbeing, discover personalized exercises, and connect with mental health professionals—all in one place.
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                  {hasAssessment ? (
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="button-gradient px-8 py-6"
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowAssessment(true)}
                      className="button-gradient px-8 py-6"
                    >
                      Get Started
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="px-8 py-6"
                    onClick={() => {
                      const featuresSection = document.getElementById("features");
                      if (featuresSection) {
                        featuresSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative glass-card rounded-2xl overflow-hidden animate-slide-down">
                  <div className="absolute inset-0 bg-gradient-to-br from-mindmend-blue/50 to-mindmend-teal/30 mix-blend-overlay" />
                  <img
                    src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop"
                    alt="Mental Wellbeing"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment Section */}
        {showAssessment && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Let's Get to Know You</h2>
                  <p className="text-lg text-mindmend-text-muted">
                    Answer a few questions to help us personalize your experience.
                  </p>
                </div>
                <AssessmentForm />
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section id="features" className="py-24 bg-mindmend-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">How MindMend Helps You</h2>
              <p className="text-lg text-mindmend-text-muted">
                Our comprehensive platform provides tools and resources to support your mental wellbeing journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-mindmend-blue/10 text-mindmend-blue mb-4">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Wellbeing</h3>
                <p className="text-mindmend-text-muted">
                  Monitor your mental health metrics over time with insightful analytics and personalized insights.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-mindmend-teal/10 text-mindmend-teal mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Daily Activities</h3>
                <p className="text-mindmend-text-muted">
                  Access personalized exercises, meditations, and activities tailored to your specific needs.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-mindmend-green/10 text-mindmend-green mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Support</h3>
                <p className="text-mindmend-text-muted">
                  Schedule appointments with qualified mental health professionals for personalized guidance.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-mindmend-lavender/10 text-mindmend-lavender mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Messaging</h3>
                <p className="text-mindmend-text-muted">
                  Stay connected with your care providers through secure messaging and video consultations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-mindmend-text-muted">
                Stories from people who've improved their mental wellbeing with MindMend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" filled />
                    ))}
                  </div>
                </div>
                <p className="text-mindmend-text-muted mb-4">
                  "The personalized recommendations helped me establish a daily meditation routine that's significantly reduced my anxiety."
                </p>
                <div className="flex items-center">
                  <div className="font-medium">Sarah T.</div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" filled />
                    ))}
                  </div>
                </div>
                <p className="text-mindmend-text-muted mb-4">
                  "Being able to message my therapist between sessions has been a game-changer for maintaining progress in my mental health journey."
                </p>
                <div className="flex items-center">
                  <div className="font-medium">Michael R.</div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" filled />
                    ))}
                  </div>
                </div>
                <p className="text-mindmend-text-muted mb-4">
                  "The sleep tracking and recommended exercises have helped me improve my sleep quality drastically. I feel more rested and focused."
                </p>
                <div className="flex items-center">
                  <div className="font-medium">Jessica K.</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => hasAssessment ? navigate("/dashboard") : setShowAssessment(true)}
                className="button-gradient px-8 py-6"
              >
                {hasAssessment ? "Go to Dashboard" : "Start Your Journey"}
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Heart className="h-6 w-6 text-mindmend-lavender mr-2" />
                <span className="font-semibold text-xl">MindMend</span>
              </div>
              <div className="text-sm text-mindmend-text-muted">
                © {new Date().getFullYear()} MindMend. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

const Star = ({ className, filled }: { className?: string; filled?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Index;
