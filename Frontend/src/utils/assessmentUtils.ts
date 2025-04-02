
// Simple utility to save assessment data to localStorage
export const saveAssessmentData = (data: any) => {
  localStorage.setItem('assessmentData', JSON.stringify(data));
};

// Utility to get assessment data from localStorage
export const getAssessmentData = () => {
  const data = localStorage.getItem('assessmentData');
  if (data) {
    return JSON.parse(data);
  }
  
  // Return mock data if nothing is saved yet
  return {
    name: "User",
    age: 32,
    gender: "male",
    sleepQuality: 7,
    stressLevel: 8,
    moodRating: 6,
    energyLevel: 5,
    primaryGoal: "reduce-stress",
    preferredActivities: ["Meditation", "Nature walks"]
  };
};

// Utility to check if the user has completed assessment
export const hasCompletedAssessment = () => {
  return localStorage.getItem('assessmentData') !== null;
};

// Clear all assessment data (for testing)
export const clearAssessmentData = () => {
  localStorage.removeItem('assessmentData');
};
