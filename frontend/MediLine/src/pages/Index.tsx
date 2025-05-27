import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import DoctorSearchCard from "@/components/DoctorSearchCard";
import AppointmentManager from "@/components/AppointmentManager";
import MedicalHistoryCard from "@/components/MedicalHistoryCard";
import AIRecommendation from "@/components/AIRecommendation";
import { Button } from "@/components/ui/button";
import { Search, Calendar, FileText, User, TestTube } from "lucide-react";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MediLine Health connects patients, doctors, and healthcare facilities through a seamless digital platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Symptom Tracking"
              icon={<User size={24} />}
            >
              <p className="text-gray-600 mb-4">
                Log your symptoms, track changes over time, and share accurate information with healthcare providers.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">Track Symptoms</Link>
              </Button>
            </FeatureCard>
            
            <FeatureCard
              title="Doctor Search"
              icon={<Search size={24} />}
            >
              <p className="text-gray-600 mb-4">
                Find specialized healthcare professionals by specialty, location, availability, and ratings.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/doctors">Find Doctors</Link>
              </Button>
            </FeatureCard>
            
            <FeatureCard
              title="Appointment Booking"
              icon={<Calendar size={24} />}
            >
              <p className="text-gray-600 mb-4">
                Schedule, reschedule or cancel appointments with doctors and medical facilities in just a few clicks.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/appointments">Manage Appointments</Link>
              </Button>
            </FeatureCard>
            
            <FeatureCard
              title="Medical Records"
              icon={<FileText size={24} />}
            >
              <p className="text-gray-600 mb-4">
                Access your complete medical history, including test results, prescriptions, and doctor's notes.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/medical-history">View Medical History</Link>
              </Button>
            </FeatureCard>
            
            <FeatureCard
              title="Prescription Management"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                  <path d="M9 3V8H4M9 3H20V21H4V8L9 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            >
              <p className="text-gray-600 mb-4">
                View your current medications, dosage instructions, and receive reminders for refills.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">View Medications</Link>
              </Button>
            </FeatureCard>
            
            <FeatureCard
              title="Test Results"
              icon={<TestTube size={24} />}
            >
              <p className="text-gray-600 mb-4">
                Receive laboratory and diagnostic test results directly through the platform with explanations.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">View Test Results</Link>
              </Button>
            </FeatureCard>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-medical-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the full spectrum of MediLine Health's integrated healthcare platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoctorSearchCard />
            <AppointmentManager />
            <MedicalHistoryCard />
            <AIRecommendation />
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-medical-primary rounded-xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Get Started with MediLine Health
              </h2>
              <p className="text-xl opacity-90 mb-6 max-w-2xl">
                Join thousands of patients and healthcare providers on our comprehensive medical platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/dashboard">Patient Dashboard</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link to="/doctors">Find Doctors</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
