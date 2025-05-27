
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AIRecommendation: React.FC = () => {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API request to the AI service
    console.log("Submitted symptoms:", symptoms);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-medical-primary text-white pb-4 rounded-t-lg">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Search className="mr-2 h-5 w-5" />
          AI-Driven Doctor Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <ul className="space-y-2 ml-6 list-disc text-gray-600">
            <li>Patients can input current symptoms, feelings or concerns</li>
            <li>Recommends relevant specialists based on symptom patterns</li>
          </ul>

          <form onSubmit={handleSubmit} className="pt-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                Describe your symptoms or health concerns
              </label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: I've been experiencing frequent headaches in the morning and occasional dizziness for the past week."
                className="h-32"
              />
              <p className="text-xs text-gray-500">
                Note: This tool provides suggestions only and does not replace professional medical advice.
              </p>
            </div>
            <Button className="w-full" type="submit">
              Get Doctor Recommendations
            </Button>
          </form>

          {/* This would show conditionally after submission in a real app */}
          <div className="pt-4 border-t border-gray-200 hidden">
            <h3 className="font-medium text-gray-800 mb-3">Recommended Specialists</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Neurologist</div>
                <div className="text-sm text-gray-600">Specializes in diagnosing and treating headaches, dizziness, and other neurological symptoms</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">General Physician</div>
                <div className="text-sm text-gray-600">Recommended for initial assessment of your symptoms</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendation;
