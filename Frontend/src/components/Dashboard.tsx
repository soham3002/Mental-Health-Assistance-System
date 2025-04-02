
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Moon, Zap, ArrowRight, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAssessmentData } from "@/utils/assessmentUtils";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const data = getAssessmentData();
      setUserData(data);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-mindmend-blue border-t-transparent animate-spin mb-4"></div>
          <p className="text-mindmend-text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No data available</h3>
        <p className="text-mindmend-text-muted mb-6">Please complete the assessment to view your dashboard.</p>
        <Button asChild className="button-gradient">
          <Link to="/">Take Assessment</Link>
        </Button>
      </div>
    );
  }

  const wellbeingScore = Math.round(
    (userData.sleepQuality + userData.moodRating + (11 - userData.stressLevel) + userData.energyLevel) / 4
  );

  const wellbeingData = [
    {
      name: "Sleep",
      value: userData.sleepQuality,
      fill: "#4AB0D9",
    },
    {
      name: "Mood",
      value: userData.moodRating,
      fill: "#5BD8C0",
    },
    {
      name: "Stress",
      value: 11 - userData.stressLevel,
      fill: "#AC94F1",
    },
    {
      name: "Energy",
      value: userData.energyLevel,
      fill: "#65D6AD",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Welcome back, {userData.name || "Friend"}</h2>
        <p className="text-mindmend-text-muted">Here's an overview of your mental wellbeing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Heart className="mr-2 h-5 w-5 text-mindmend-lavender" />
              Wellbeing Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative flex items-center justify-center mb-4">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-mindmend-blue"
                    strokeWidth="10"
                    strokeDasharray={360}
                    strokeDashoffset={360 - (360 * wellbeingScore) / 10}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute text-3xl font-bold">{wellbeingScore}</span>
              </div>
              <p className="text-sm text-mindmend-text-muted text-center">
                Your overall wellbeing score is <span className="font-medium">{wellbeingScore}/10</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Activity className="mr-2 h-5 w-5 text-mindmend-blue" />
              Metrics Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={wellbeingData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barSize={36}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value) => [`${value}/10`, ""]}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px',
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Moon className="mr-2 h-5 w-5 text-mindmend-blue" />
              Sleep Quality
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-mindmend-text-muted">Poor</span>
              <span className="font-medium">{userData.sleepQuality}/10</span>
              <span className="text-mindmend-text-muted">Excellent</span>
            </div>
            <Progress value={userData.sleepQuality * 10} className="h-2" />
            <p className="text-sm text-mindmend-text-muted pt-1">
              {userData.sleepQuality >= 7
                ? "You're getting good quality sleep. Keep it up!"
                : "Your sleep could use some improvement. Check our recommendations."}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Activity className="mr-2 h-5 w-5 text-mindmend-lavender" />
              Stress Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-mindmend-text-muted">Low</span>
              <span className="font-medium">{userData.stressLevel}/10</span>
              <span className="text-mindmend-text-muted">High</span>
            </div>
            <Progress value={userData.stressLevel * 10} className="h-2" />
            <p className="text-sm text-mindmend-text-muted pt-1">
              {userData.stressLevel <= 5
                ? "You're managing stress effectively. Great job!"
                : "Your stress levels are high. Try our relaxation exercises."}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-medium">
              <Zap className="mr-2 h-5 w-5 text-mindmend-green" />
              Energy Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-mindmend-text-muted">Low</span>
              <span className="font-medium">{userData.energyLevel}/10</span>
              <span className="text-mindmend-text-muted">High</span>
            </div>
            <Progress value={userData.energyLevel * 10} className="h-2" />
            <p className="text-sm text-mindmend-text-muted pt-1">
              {userData.energyLevel >= 6
                ? "Your energy levels are good. Maintain this momentum!"
                : "Your energy could use a boost. Check our energy-boosting activities."}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card hover-scale">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg font-medium">
            <Heart className="mr-2 h-5 w-5 text-mindmend-teal" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-mindmend-blue/10 p-4 border border-mindmend-blue/20">
              <h3 className="text-md font-medium mb-2">Improve Sleep Quality</h3>
              <p className="text-sm text-mindmend-text-muted mb-3">Simple techniques to improve your sleep routine.</p>
              <Button asChild variant="link" className="p-0 h-auto text-mindmend-blue">
                <Link to="/recommendations" className="flex items-center text-sm font-medium">
                  View exercises <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            
            <div className="rounded-lg bg-mindmend-lavender/10 p-4 border border-mindmend-lavender/20">
              <h3 className="text-md font-medium mb-2">Stress Management</h3>
              <p className="text-sm text-mindmend-text-muted mb-3">Techniques to reduce anxiety and manage stress.</p>
              <Button asChild variant="link" className="p-0 h-auto text-mindmend-lavender">
                <Link to="/recommendations" className="flex items-center text-sm font-medium">
                  View exercises <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            
            <div className="rounded-lg bg-mindmend-green/10 p-4 border border-mindmend-green/20">
              <h3 className="text-md font-medium mb-2">Mood Boosters</h3>
              <p className="text-sm text-mindmend-text-muted mb-3">Activities to help improve your mood and outlook.</p>
              <Button asChild variant="link" className="p-0 h-auto text-mindmend-green">
                <Link to="/recommendations" className="flex items-center text-sm font-medium">
                  View exercises <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild className="button-gradient">
          <Link to="/appointments" className="flex items-center">
            Schedule a Consultation <Calendar className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
