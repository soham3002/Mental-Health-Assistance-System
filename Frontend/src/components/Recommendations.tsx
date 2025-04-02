
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Moon, Activity, Zap, Play, CheckCircle, Clock } from "lucide-react";
import { getAssessmentData } from "@/utils/assessmentUtils";
import { toast } from "sonner";

type ActivityType = {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  steps?: string[];
  benefits: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  completed?: boolean;
};

const activities: ActivityType[] = [
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    category: "Meditation",
    duration: "5 min",
    description: "A simple breathing exercise to calm your mind and reduce stress.",
    steps: [
      "Find a comfortable sitting position",
      "Close your eyes and take a deep breath in through your nose",
      "Hold for 3 seconds",
      "Exhale slowly through your mouth",
      "Repeat for 5 minutes, focusing on your breath"
    ],
    benefits: ["Reduces stress", "Improves focus", "Calms the nervous system"],
    difficulty: "Easy"
  },
  {
    id: "body-scan",
    title: "Body Scan Relaxation",
    category: "Meditation",
    duration: "10 min",
    description: "A guided relaxation technique focusing on different parts of your body.",
    steps: [
      "Lie down in a comfortable position",
      "Close your eyes and take a few deep breaths",
      "Starting at your toes, focus on each part of your body",
      "Notice any tension and consciously relax that area",
      "Move progressively up through your entire body"
    ],
    benefits: ["Reduces physical tension", "Improves body awareness", "Promotes better sleep"],
    difficulty: "Medium"
  },
  {
    id: "gratitude-journal",
    title: "Gratitude Journaling",
    category: "Journaling",
    duration: "10 min",
    description: "Write down things you're grateful for to shift your focus to the positive aspects of life.",
    steps: [
      "Find a quiet space with no distractions",
      "Take a few deep breaths to center yourself",
      "Write down 3-5 things you're grateful for today",
      "For each item, explain why you're grateful for it",
      "Reflect on how these positive elements impact your life"
    ],
    benefits: ["Increases positive emotions", "Improves sleep", "Reduces stress"],
    difficulty: "Easy"
  },
  {
    id: "nature-walk",
    title: "Mindful Nature Walk",
    category: "Exercise",
    duration: "20 min",
    description: "A gentle walk in nature while practicing mindfulness and awareness.",
    steps: [
      "Find a natural setting like a park or trail",
      "Walk at a comfortable, relaxed pace",
      "Notice the sensations of walking - your feet touching the ground",
      "Observe the sights, sounds, and smells around you",
      "If your mind wanders, gently bring it back to your surroundings"
    ],
    benefits: ["Reduces anxiety", "Improves mood", "Increases vitamin D"],
    difficulty: "Easy"
  },
  {
    id: "progressive-muscle",
    title: "Progressive Muscle Relaxation",
    category: "Relaxation",
    duration: "15 min",
    description: "Technique to reduce physical tension by tensing and relaxing muscle groups.",
    steps: [
      "Find a comfortable position lying down",
      "Start with your feet, tense the muscles for 5 seconds",
      "Release and notice how the muscles feel when relaxed",
      "Move progressively through each muscle group in your body",
      "End with deep breathing to enhance relaxation"
    ],
    benefits: ["Reduces physical tension", "Decreases anxiety", "Improves sleep quality"],
    difficulty: "Medium"
  },
  {
    id: "mindful-drawing",
    title: "Mindful Drawing",
    category: "Arts & Crafts",
    duration: "15 min",
    description: "Express yourself through art while practicing mindfulness and presence.",
    steps: [
      "Gather simple drawing materials",
      "Find a quiet space where you won't be interrupted",
      "Draw whatever comes to mind without judgment",
      "Focus on the sensations of drawing",
      "Notice thoughts but return focus to the drawing process"
    ],
    benefits: ["Promotes self-expression", "Reduces stress", "Improves focus"],
    difficulty: "Easy"
  }
];

export const Recommendations = () => {
  const [userData, setUserData] = useState<any>(null);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const data = getAssessmentData();
      setUserData(data);
      
      // Get saved completed activities from local storage
      const saved = localStorage.getItem("completedActivities");
      if (saved) {
        setCompletedActivities(JSON.parse(saved));
      }
      
      setLoading(false);
    }, 800);
  }, []);

  // Mark activity as completed
  const markAsCompleted = (id: string) => {
    const newCompleted = [...completedActivities, id];
    setCompletedActivities(newCompleted);
    localStorage.setItem("completedActivities", JSON.stringify(newCompleted));
    
    toast.success("Activity completed! Great job!");
  };

  // Create a version of activities with completed status
  const activitiesWithStatus = activities.map(activity => ({
    ...activity,
    completed: completedActivities.includes(activity.id)
  }));

  // Filter activities by category for tabs
  const meditationActivities = activitiesWithStatus.filter(a => a.category === "Meditation");
  const exerciseActivities = activitiesWithStatus.filter(a => 
    a.category === "Exercise" || a.category === "Relaxation"
  );
  const creativeActivities = activitiesWithStatus.filter(a => 
    a.category === "Journaling" || a.category === "Arts & Crafts"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-mindmend-blue border-t-transparent animate-spin mb-4"></div>
          <p className="text-mindmend-text-muted">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Recommended Activities</h2>
        <p className="text-mindmend-text-muted">
          Personalized exercises and activities to improve your mental wellbeing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="glass-card sticky top-24">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Heart className="mr-2 h-5 w-5 text-mindmend-lavender" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full" orientation="vertical">
                <TabsList className="flex flex-col h-auto space-y-1 bg-transparent">
                  <TabsTrigger value="all" className="w-full justify-start">All Activities</TabsTrigger>
                  <TabsTrigger value="meditation" className="w-full justify-start">Meditation</TabsTrigger>
                  <TabsTrigger value="exercise" className="w-full justify-start">Exercise & Relaxation</TabsTrigger>
                  <TabsTrigger value="creative" className="w-full justify-start">Creative Practices</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-2">Filter by Duration</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-mindmend-blue/10">
                    <Clock className="h-3 w-3 mr-1" /> 5-10 min
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-mindmend-blue/10">
                    <Clock className="h-3 w-3 mr-1" /> 15-20 min
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Filter by Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-mindmend-blue/10">Easy</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-mindmend-blue/10">Medium</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-mindmend-blue/10">Hard</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 gap-6">
                {activitiesWithStatus.map((activity) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onSelect={() => setSelectedActivity(activity)}
                    onComplete={() => markAsCompleted(activity.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="meditation" className="m-0">
              <div className="grid grid-cols-1 gap-6">
                {meditationActivities.map((activity) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onSelect={() => setSelectedActivity(activity)}
                    onComplete={() => markAsCompleted(activity.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="exercise" className="m-0">
              <div className="grid grid-cols-1 gap-6">
                {exerciseActivities.map((activity) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onSelect={() => setSelectedActivity(activity)}
                    onComplete={() => markAsCompleted(activity.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="creative" className="m-0">
              <div className="grid grid-cols-1 gap-6">
                {creativeActivities.map((activity) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onSelect={() => setSelectedActivity(activity)}
                    onComplete={() => markAsCompleted(activity.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selectedActivity.title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{selectedActivity.category}</Badge>
                    <Badge variant="outline" className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {selectedActivity.duration}
                    </Badge>
                    <Badge variant="outline">{selectedActivity.difficulty}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedActivity(null)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              </div>

              <p className="text-mindmend-text-muted mb-6">{selectedActivity.description}</p>

              {selectedActivity.steps && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">How to do this activity</h3>
                  <ol className="space-y-2">
                    {selectedActivity.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center bg-mindmend-blue/10 text-mindmend-blue rounded-full h-6 w-6 mr-3 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {selectedActivity.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-mindmend-green mr-2" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                  Close
                </Button>
                {selectedActivity.completed ? (
                  <Button disabled className="bg-mindmend-green text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                ) : (
                  <Button
                    className="button-gradient"
                    onClick={() => {
                      markAsCompleted(selectedActivity.id);
                      setSelectedActivity({...selectedActivity, completed: true});
                    }}
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ActivityCard = ({ 
  activity, 
  onSelect,
  onComplete
}: { 
  activity: ActivityType; 
  onSelect: () => void;
  onComplete: () => void;
}) => {
  return (
    <Card className="glass-card hover-scale overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className={`p-6 flex flex-col justify-between bg-gradient-to-br from-mindmend-blue/10 to-mindmend-teal/10`}>
            <div>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{activity.category}</Badge>
                {activity.completed && (
                  <Badge variant="outline" className="bg-mindmend-green/10 text-mindmend-green">
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-medium mb-2">{activity.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-mindmend-text-muted">
                <Clock className="h-4 w-4" />
                <span>{activity.duration}</span>
                <span>•</span>
                <span>{activity.difficulty}</span>
              </div>
            </div>
            <div className="mt-4 flex">
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={onSelect}
              >
                View Details
              </Button>
              {activity.completed ? (
                <Button variant="outline" size="sm" disabled>
                  <CheckCircle className="h-4 w-4 mr-1" /> Completed
                </Button>
              ) : (
                <Button
                  className="button-gradient"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onComplete();
                  }}
                >
                  <Play className="h-4 w-4 mr-1" /> Start
                </Button>
              )}
            </div>
          </div>
          <div className="p-6 md:col-span-2">
            <p className="text-mindmend-text-muted mb-4">{activity.description}</p>
            <div className="space-y-1">
              {activity.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-mindmend-green mr-2" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
