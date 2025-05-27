
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import PatientDashboard from "@/components/PatientDashboard";

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PatientDashboard />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
