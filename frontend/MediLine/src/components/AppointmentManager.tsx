
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const AppointmentManager: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-medical-primary text-white pb-4 rounded-t-lg">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Appointment Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <ul className="space-y-2 ml-6 list-disc text-gray-600">
            <li>Book Appointment</li>
            <li>View doctor availability</li>
            <li>Select date/time</li>
            <li>Reschedule or cancel</li>
            <li>Appointment Reminders</li>
          </ul>
          <div className="pt-4 border-t border-gray-200">
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-800 mb-2">Select Date</h3>
              <div className="border rounded-md p-3 bg-gray-50">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-800 mb-2">Available Time Slots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Button variant="outline" className="flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  9:00 AM
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  10:30 AM
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  1:00 PM
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  2:15 PM
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  3:45 PM
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Clock className="mr-2 h-4 w-4" />
                  4:30 PM
                </Button>
              </div>
            </div>
            <Button className="w-full">
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentManager;
