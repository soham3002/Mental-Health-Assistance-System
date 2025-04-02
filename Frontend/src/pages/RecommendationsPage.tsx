
import React from "react";
import { Layout } from "@/components/Layout";
import { Recommendations } from "@/components/Recommendations";
import { hasCompletedAssessment } from "@/utils/assessmentUtils";
import { Navigate } from "react-router-dom";

const RecommendationsPage = () => {
  // Check if user has completed assessment, redirect to home if not
  if (!hasCompletedAssessment()) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Recommendations />
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
