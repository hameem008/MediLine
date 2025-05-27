
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-medical-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in [--animation-delay:200ms]">
            <div className="h-12 w-12 bg-medical-primary rounded-lg flex items-center justify-center mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12H16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-medical-primary mb-6">
              MediLine Health
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              A Digital Medical System
            </p>
            <p className="text-3xl text-medical-dark font-medium mb-6">
              Your health, our mission
            </p>
            <p className="text-gray-600 mb-8 max-w-md">
              Connect with healthcare professionals, manage appointments, access
              your medical history, and receive personalized care - all in one
              place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/doctors">Find Doctors</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">My Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in [--animation-delay:400ms]">
            <div className="relative">
              <div className="w-full h-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-medical-secondary p-2 rounded-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-medical-primary"
                    >
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      <path d="M9 14h.01" />
                      <path d="M13 14h.01" />
                      <path d="M9 18h.01" />
                      <path d="M13 18h.01" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-500">MediLine Health ID: 2005033</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Patient Dashboard</h3>
                    <p className="text-sm text-gray-500">View your health summary</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-medical-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Upcoming</div>
                      <div className="font-medium">2 Appointments</div>
                    </div>
                    <div className="bg-medical-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Medications</div>
                      <div className="font-medium">3 Active</div>
                    </div>
                    <div className="bg-medical-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Test Results</div>
                      <div className="font-medium">1 Pending</div>
                    </div>
                    <div className="bg-medical-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Messages</div>
                      <div className="font-medium">0 Unread</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Next Appointment</div>
                    <div className="text-sm font-medium">Dr. Sarah Johnson</div>
                    <div className="text-xs text-gray-500">May 24, 2025 · 10:30 AM</div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View Full Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
