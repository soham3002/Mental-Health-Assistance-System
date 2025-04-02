
import React from "react";
import { Layout } from "@/components/Layout";
import { Appointments } from "@/components/Appointments";
import { hasCompletedAssessment } from "@/utils/assessmentUtils";
import { Navigate } from "react-router-dom";

const AppointmentsPage = () => {
  // Check if user has completed assessment, redirect to home if not
  if (!hasCompletedAssessment()) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Appointments />
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
