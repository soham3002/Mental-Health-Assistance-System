
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { saveAssessmentData } from "@/utils/assessmentUtils";

type AssessmentStep = {
  id: number;
  title: string;
  description: string;
};

const steps: AssessmentStep[] = [
  {
    id: 1,
    title: "About You",
    description: "Let's start with some basic information",
  },
  {
    id: 2,
    title: "Your Well-being",
    description: "Help us understand how you're feeling recently",
  },
  {
    id: 3,
    title: "Your Goals",
    description: "What are you hoping to achieve?",
  },
];

export const AssessmentForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    sleepQuality: 5,
    stressLevel: 5,
    moodRating: 5,
    energyLevel: 5,
    primaryGoal: "",
    preferredActivities: [],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value[0] }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save the assessment data
    saveAssessmentData(formData);
    
    // Show success message
    toast.success("Assessment completed! Redirecting to your dashboard...");
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                currentStep >= step.id - 1
                  ? "text-mindmend-blue"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${
                  currentStep >= step.id - 1
                    ? "bg-gradient-to-r from-mindmend-blue to-mindmend-teal text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.id}
              </div>
              <div className="text-sm font-medium hidden md:block">{step.title}</div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-mindmend-blue to-mindmend-teal transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <Card className="glass-card animate-scale-in">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-2">{steps[currentStep].title}</h2>
          <p className="text-mindmend-text-muted mb-6">{steps[currentStep].description}</p>

          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-mindmend-blue focus:border-mindmend-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-mindmend-blue focus:border-mindmend-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger id="gender" className="transition-all duration-300 focus:ring-2 focus:ring-mindmend-blue focus:border-mindmend-blue">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Sleep Quality</Label>
                  <span className="font-medium text-mindmend-blue">{formData.sleepQuality}/10</span>
                </div>
                <Slider
                  value={[formData.sleepQuality]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange("sleepQuality", value)}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-mindmend-text-muted">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Stress Level</Label>
                  <span className="font-medium text-mindmend-blue">{formData.stressLevel}/10</span>
                </div>
                <Slider
                  value={[formData.stressLevel]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange("stressLevel", value)}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-mindmend-text-muted">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Mood Rating</Label>
                  <span className="font-medium text-mindmend-blue">{formData.moodRating}/10</span>
                </div>
                <Slider
                  value={[formData.moodRating]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange("moodRating", value)}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-mindmend-text-muted">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Energy Level</Label>
                  <span className="font-medium text-mindmend-blue">{formData.energyLevel}/10</span>
                </div>
                <Slider
                  value={[formData.energyLevel]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange("energyLevel", value)}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-mindmend-text-muted">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primaryGoal">What's your primary goal?</Label>
                <Select
                  value={formData.primaryGoal}
                  onValueChange={(value) => handleInputChange("primaryGoal", value)}
                >
                  <SelectTrigger id="primaryGoal" className="transition-all duration-300 focus:ring-2 focus:ring-mindmend-blue focus:border-mindmend-blue">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reduce-stress">Reduce stress & anxiety</SelectItem>
                    <SelectItem value="improve-mood">Improve mood</SelectItem>
                    <SelectItem value="better-sleep">Better sleep</SelectItem>
                    <SelectItem value="work-life-balance">Work-life balance</SelectItem>
                    <SelectItem value="improve-focus">Improve focus & productivity</SelectItem>
                    <SelectItem value="build-resilience">Build resilience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>What activities do you enjoy? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {["Meditation", "Reading", "Exercise", "Nature walks", "Journaling", "Arts & crafts"].map((activity) => (
                    <div
                      key={activity}
                      className={`rounded-lg border border-gray-200 p-3 cursor-pointer transition-all duration-300 hover:border-mindmend-blue ${
                        formData.preferredActivities.includes(activity)
                          ? "bg-mindmend-blue/10 border-mindmend-blue"
                          : ""
                      }`}
                      onClick={() => {
                        const activities = [...formData.preferredActivities];
                        if (activities.includes(activity)) {
                          const index = activities.indexOf(activity);
                          activities.splice(index, 1);
                        } else {
                          activities.push(activity);
                        }
                        handleInputChange("preferredActivities", activities);
                      }}
                    >
                      <span className="text-sm font-medium">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="transition-all duration-300"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-mindmend-blue to-mindmend-teal text-white hover:shadow-md transition-all duration-300"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
