import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, TestTube, Pill, Clock, User } from "lucide-react";

const PatientDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, John Doe</h2>
          <p className="text-gray-600">Here's your health overview</p>
        </div>
        <Button size="sm" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          Update Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Upcoming Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-medical-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm text-gray-600">Next: May 24, 2025</div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Active Medications</CardTitle>
              <Pill className="h-4 w-4 text-medical-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-600">Last updated: May 12, 2025</div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Recent Tests</CardTitle>
              <TestTube className="h-4 w-4 text-medical-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-gray-600">Blood Test: May 10, 2025</div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-medical-secondary p-2 rounded-full">
                    <Clock className="h-5 w-5 text-medical-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Dr. Sarah Johnson</div>
                      <div className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                        Confirmed
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Cardiology</div>
                    <div className="text-sm text-gray-500">May 24, 2025 · 10:30 AM</div>
                    <div className="text-sm text-gray-500">City Hospital, Room 305</div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-medical-secondary p-2 rounded-full">
                    <TestTube className="h-5 w-5 text-medical-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Blood Test</div>
                      <div className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                        Scheduled
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Lab Services</div>
                    <div className="text-sm text-gray-500">June 2, 2025 · 8:00 AM</div>
                    <div className="text-sm text-gray-500">Medical Lab Center, 1st Floor</div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Atorvastatin 10mg</div>
                    <div className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">1 tablet daily in the evening</div>
                  <div className="text-sm text-gray-500">Prescribed: May 5, 2025</div>
                  <div className="text-sm text-gray-500">Dr. Sarah Johnson</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Metformin 500mg</div>
                    <div className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">1 tablet twice daily with meals</div>
                  <div className="text-sm text-gray-500">Prescribed: May 5, 2025</div>
                  <div className="text-sm text-gray-500">Dr. Sarah Johnson</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Aspirin 81mg</div>
                    <div className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">1 tablet daily in the morning</div>
                  <div className="text-sm text-gray-500">Prescribed: May 5, 2025</div>
                  <div className="text-sm text-gray-500">Dr. Sarah Johnson</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Complete Blood Count (CBC)</div>
                    <div className="text-xs bg-medical-light text-medical-primary px-2 py-1 rounded-full">
                      Completed
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Date: May 10, 2025</div>
                  <div className="text-sm text-gray-500">Medical Lab Center</div>
                  <div className="text-sm text-gray-500">Dr. Mark Wilson</div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">View Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical History Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Chronic Conditions</div>
                  <div className="text-sm text-gray-500">
                    <ul className="list-disc pl-5 mt-2">
                      <li>Type 2 Diabetes (diagnosed 2023)</li>
                      <li>Hypertension (diagnosed 2022)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Allergies</div>
                  <div className="text-sm text-gray-500">
                    <ul className="list-disc pl-5 mt-2">
                      <li>Penicillin</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Past Surgeries</div>
                  <div className="text-sm text-gray-500">
                    <ul className="list-disc pl-5 mt-2">
                      <li>Appendectomy (2015)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-2">
                  <Button className="w-full">View Complete Medical History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p>You have no unread messages</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
