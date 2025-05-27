
import React from "react";
import { FileText, TestTube, Pill, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MedicalHistoryCard: React.FC = () => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-medical-primary text-white pb-4 rounded-t-lg">
        <CardTitle className="text-xl font-semibold flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Medical History
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <p className="text-gray-600">
            A comprehensive, lifetime record of a patient's health journey.
          </p>
          <ul className="space-y-2 ml-6 list-disc text-gray-600">
            <li>Diagnoses, surgeries, allergies, immunization records, and chronic conditions.</li>
            <li>Lab/test results (e.g., blood reports, X-rays, MRI scans).</li>
            <li>Doctor's notes, treatment plans, and progress updates.</li>
            <li>Hospitalization details, discharge summaries, and rehabilitation progress.</li>
          </ul>
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <h3 className="font-medium text-gray-800">Recent Medical Records</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                <div className="bg-medical-secondary p-2 rounded-full mr-3">
                  <TestTube className="h-4 w-4 text-medical-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Blood Test Results</div>
                  <div className="text-xs text-gray-500">May 10, 2025</div>
                  <div className="text-xs text-gray-600 mt-1">Complete Blood Count (CBC), Lipid Profile, HbA1c</div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                <div className="bg-medical-secondary p-2 rounded-full mr-3">
                  <Pill className="h-4 w-4 text-medical-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Current Medications</div>
                  <div className="text-xs text-gray-500">Updated May 12, 2025</div>
                  <div className="text-xs text-gray-600 mt-1">Atorvastatin 10mg, Metformin 500mg</div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                <div className="bg-medical-secondary p-2 rounded-full mr-3">
                  <File className="h-4 w-4 text-medical-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Doctor's Notes</div>
                  <div className="text-xs text-gray-500">May 5, 2025</div>
                  <div className="text-xs text-gray-600 mt-1">Follow-up consultation with Dr. Sarah Johnson</div>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              View Complete Medical History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalHistoryCard;
