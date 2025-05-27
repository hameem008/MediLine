import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TestTube, Pill, Calendar, History } from "lucide-react";

const MedicalHistory: React.FC = () => {
  // Mock data for medical records
  const labTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      date: "May 10, 2025",
      provider: "Medical Lab Center",
      doctor: "Dr. Mark Wilson",
      results: "Normal",
      details: "All parameters within normal range.",
      pdfUrl: "#",
    },
    {
      id: 2,
      name: "Lipid Profile",
      date: "May 10, 2025",
      provider: "Medical Lab Center",
      doctor: "Dr. Mark Wilson",
      results: "Abnormal",
      details: "LDL: 145 mg/dL (High), HDL: 42 mg/dL (Low), Triglycerides: 165 mg/dL (Normal).",
      pdfUrl: "#",
    },
    {
      id: 3,
      name: "Chest X-Ray",
      date: "February 3, 2025",
      provider: "City Hospital Radiology",
      doctor: "Dr. Lisa Chang",
      results: "Normal",
      details: "No abnormalities detected.",
      pdfUrl: "#",
    },
  ];

  const medications = [
    {
      id: 1,
      name: "Atorvastatin 10mg",
      type: "Tablet",
      dose: "1 tablet daily in the evening",
      startDate: "May 5, 2025",
      endDate: "Ongoing",
      prescribedBy: "Dr. Sarah Johnson",
      purpose: "Lower cholesterol levels",
    },
    {
      id: 2,
      name: "Metformin 500mg",
      type: "Tablet",
      dose: "1 tablet twice daily with meals",
      startDate: "May 5, 2025",
      endDate: "Ongoing",
      prescribedBy: "Dr. Sarah Johnson",
      purpose: "Control blood glucose levels",
    },
    {
      id: 3,
      name: "Aspirin 81mg",
      type: "Tablet",
      dose: "1 tablet daily in the morning",
      startDate: "May 5, 2025",
      endDate: "Ongoing",
      prescribedBy: "Dr. Sarah Johnson",
      purpose: "Prevent blood clots",
    },
    {
      id: 4,
      name: "Amoxicillin 500mg",
      type: "Capsule",
      dose: "1 capsule three times daily",
      startDate: "January 15, 2025",
      endDate: "January 22, 2025",
      prescribedBy: "Dr. James Wilson",
      purpose: "Treat bacterial infection",
    },
  ];

  const conditions = [
    {
      id: 1,
      name: "Type 2 Diabetes",
      diagnosedDate: "2023",
      diagnosedBy: "Dr. Sarah Johnson",
      status: "Active - Managed",
      notes: "Under control with medication and lifestyle modifications.",
    },
    {
      id: 2,
      name: "Hypertension",
      diagnosedDate: "2022",
      diagnosedBy: "Dr. Robert Chen",
      status: "Active - Managed",
      notes: "Currently controlled with medication.",
    },
    {
      id: 3,
      name: "Seasonal Allergies",
      diagnosedDate: "2020",
      diagnosedBy: "Dr. Emily Rodriguez",
      status: "Intermittent",
      notes: "Symptoms occur primarily in spring. Treated with antihistamines as needed.",
    },
  ];

  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "May 5, 2025",
      reason: "Follow-up consultation",
      notes: "Patient reported feeling better. Blood pressure: 128/82. Weight: 182 lbs. Medications adjusted.",
    },
    {
      id: 2,
      doctorName: "Dr. James Wilson",
      specialty: "Neurology",
      date: "April 15, 2025",
      reason: "Headache evaluation",
      notes: "Patient reported frequent headaches. Ordered MRI. Prescribed pain management.",
    },
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: "March 22, 2025",
      reason: "Skin rash",
      notes: "Diagnosed with contact dermatitis. Prescribed topical steroid cream. Follow-up in 2 weeks.",
    },
  ];

  // Function to handle tab change by ID
  const handleTabChange = (tabId: string) => {
    const tabElement = document.querySelector(`[data-value="${tabId}"]`);
    if (tabElement) {
      (tabElement as HTMLElement).click();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
            <p className="text-gray-600">
              A comprehensive record of your health journey
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Download Medical Summary
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tests">Test Results</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="visits">Doctor Visits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="bg-medical-primary text-white">
                  <CardTitle className="flex items-center">
                    <TestTube className="mr-2 h-5 w-5" />
                    Recent Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {labTests.slice(0, 2).map((test) => (
                    <div key={test.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{test.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          test.results === "Normal" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {test.results}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{test.date}</p>
                      <p className="text-sm text-gray-600 mt-1">{test.details}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <a href="#tests" onClick={(e) => {
                      e.preventDefault();
                      handleTabChange("tests");
                    }}>
                      View All Tests
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-medical-primary text-white">
                  <CardTitle className="flex items-center">
                    <Pill className="mr-2 h-5 w-5" />
                    Current Medications
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {medications.slice(0, 3).map((medication) => (
                    <div key={medication.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
                      <h3 className="font-medium">{medication.name}</h3>
                      <p className="text-sm text-gray-500">{medication.dose}</p>
                      <p className="text-sm text-gray-600 mt-1">Prescribed by {medication.prescribedBy}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <a href="#medications" onClick={(e) => {
                      e.preventDefault();
                      handleTabChange("medications");
                    }}>
                      View All Medications
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-medical-primary text-white">
                  <CardTitle className="flex items-center">
                    <History className="mr-2 h-5 w-5" />
                    Chronic Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {conditions.map((condition) => (
                    <div key={condition.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{condition.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {condition.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Diagnosed: {condition.diagnosedDate}</p>
                      <p className="text-sm text-gray-600 mt-1">{condition.notes}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-medical-primary text-white">
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Recent Doctor Visits
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {appointments.slice(0, 2).map((appointment) => (
                    <div key={appointment.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
                      <h3 className="font-medium">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-500">{appointment.specialty} - {appointment.date}</p>
                      <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <a href="#visits" onClick={(e) => {
                      e.preventDefault();
                      handleTabChange("visits");
                    }}>
                      View All Visits
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <CardTitle>Laboratory and Diagnostic Tests</CardTitle>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button variant="outline" size="sm">Filter</Button>
                    <Button variant="outline" size="sm">Sort by Date</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {labTests.map((test) => (
                    <div key={test.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-lg">{test.name}</h3>
                          <p className="text-gray-500">{test.date}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 md:mt-0 ${
                          test.results === "Normal" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {test.results}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Provider:</p>
                          <p className="font-medium">{test.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ordering Physician:</p>
                          <p className="font-medium">{test.doctor}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Results:</p>
                        <p>{test.details}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={test.pdfUrl}>View Full Report</a>
                        </Button>
                        <Button size="sm" variant="outline">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <CardTitle>Medication History</CardTitle>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button variant="outline" size="sm">Current Only</Button>
                    <Button variant="outline" size="sm">All Medications</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h3 className="font-medium text-gray-700">Current Medications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Medication</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Dosage</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Start Date</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Prescribed By</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {medications.slice(0, 3).map((medication) => (
                          <tr key={medication.id}>
                            <td className="px-4 py-4 font-medium">{medication.name}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.dose}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.startDate}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.prescribedBy}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <h3 className="font-medium text-gray-700 mt-8">Past Medications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Medication</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Dosage</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Dates</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Prescribed By</th>
                          <th className="px-4 py-3 text-sm font-medium text-gray-600">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {medications.slice(3).map((medication) => (
                          <tr key={medication.id}>
                            <td className="px-4 py-4 font-medium">{medication.name}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.dose}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.startDate} to {medication.endDate}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.prescribedBy}</td>
                            <td className="px-4 py-4 text-gray-600">{medication.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conditions">
            <Card>
              <CardHeader>
                <CardTitle>Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conditions.map((condition) => (
                    <div key={condition.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-lg">{condition.name}</h3>
                          <p className="text-gray-500">Diagnosed: {condition.diagnosedDate}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 md:mt-0 bg-blue-100 text-blue-800">
                          {condition.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Diagnosing Physician:</p>
                          <p className="font-medium">{condition.diagnosedBy}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Notes:</p>
                        <p>{condition.notes}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Related Records
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visits">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <CardTitle>Doctor Visit History</CardTitle>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <Button variant="outline" size="sm">Filter by Doctor</Button>
                    <Button variant="outline" size="sm">Filter by Date</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-lg">{appointment.doctorName}</h3>
                          <p className="text-gray-500">{appointment.specialty}</p>
                        </div>
                        <p className="text-gray-600 mt-2 md:mt-0">{appointment.date}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Reason for Visit:</p>
                        <p className="font-medium">{appointment.reason}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Doctor's Notes:</p>
                        <p>{appointment.notes}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Prescription
                        </Button>
                        <Button size="sm" variant="outline">
                          View Test Orders
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MedicalHistory;
