
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin, Calendar as CalendarIcon, User, FileText } from "lucide-react";

const Appointments: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "May 24, 2025",
      time: "10:30 AM",
      location: "City Hospital, Room 305",
      status: "Confirmed",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      doctorName: "Medical Lab Center",
      specialty: "Blood Test",
      date: "June 2, 2025",
      time: "8:00 AM",
      location: "Medical Lab Center, 1st Floor",
      status: "Scheduled",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      doctorName: "Dr. James Wilson",
      specialty: "Neurology",
      date: "April 15, 2025",
      time: "2:00 PM",
      location: "Medical Center, 5th Ave.",
      status: "Completed",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      id: 4,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: "March 22, 2025",
      time: "11:15 AM",
      location: "Skin Care Clinic, Park Rd.",
      status: "Completed",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
    },
  ];

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointment Manager</h1>
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="book">Book New</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">Upcoming Appointments</h2>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/6">
                            <img
                              src={appointment.image}
                              alt={appointment.doctorName}
                              className="w-full h-24 sm:h-full object-cover"
                            />
                          </div>
                          <div className="p-4 sm:p-6 flex-1">
                            <div className="flex flex-col sm:flex-row justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                                <p className="text-gray-600">{appointment.specialty}</p>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className={`py-1 px-3 rounded-full text-xs font-medium ${
                                  appointment.status === "Confirmed" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-blue-100 text-blue-800"
                                }`}>
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">{appointment.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">{appointment.time}</span>
                              </div>
                              <div className="flex items-center sm:col-span-2">
                                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">{appointment.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button size="sm">View Details</Button>
                              <Button size="sm" variant="outline">Reschedule</Button>
                              <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                    <p className="text-gray-600 mb-6">
                      You don't have any scheduled appointments at this time.
                    </p>
                    <Button>Book an Appointment</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="book">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="mx-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="appointment-type-1"
                          name="appointment-type"
                          defaultChecked
                          className="h-4 w-4 text-medical-primary focus:ring-medical-primary border-gray-300 rounded"
                        />
                        <label htmlFor="appointment-type-1" className="ml-3 block text-sm font-medium text-gray-700">
                          In-person Consultation
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="appointment-type-2"
                          name="appointment-type"
                          className="h-4 w-4 text-medical-primary focus:ring-medical-primary border-gray-300 rounded"
                        />
                        <label htmlFor="appointment-type-2" className="ml-3 block text-sm font-medium text-gray-700">
                          Video Consultation
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="appointment-type-3"
                          name="appointment-type"
                          className="h-4 w-4 text-medical-primary focus:ring-medical-primary border-gray-300 rounded"
                        />
                        <label htmlFor="appointment-type-3" className="ml-3 block text-sm font-medium text-gray-700">
                          Medical Test/Procedure
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="appointment-type-4"
                          name="appointment-type"
                          className="h-4 w-4 text-medical-primary focus:ring-medical-primary border-gray-300 rounded"
                        />
                        <label htmlFor="appointment-type-4" className="ml-3 block text-sm font-medium text-gray-700">
                          Follow-up Visit
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Time Slot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button key={time} variant="outline" className="text-sm">
                          <Clock className="mr-2 h-3 w-3" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Selected Doctor
                        </label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <User className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <div className="font-medium">Dr. Sarah Johnson</div>
                            <div className="text-sm text-gray-600">Cardiology</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Appointment Summary
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{date?.toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium">10:30 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">City Hospital, Room 305</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">In-person Consultation</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="appointment-notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Notes for Doctor (Optional)
                        </label>
                        <textarea
                          id="appointment-notes"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-medical-primary focus:ring-medical-primary sm:text-sm"
                          placeholder="Briefly describe your symptoms or reason for visit..."
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="reminder-checkbox"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-medical-primary focus:ring-medical-primary border-gray-300 rounded"
                        />
                        <label htmlFor="reminder-checkbox" className="ml-2 block text-sm text-gray-700">
                          Send me reminders for this appointment
                        </label>
                      </div>
                      
                      <Button className="w-full">Confirm Appointment</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">Past Appointments</h2>
              
              {pastAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <Card key={appointment.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/6">
                            <img
                              src={appointment.image}
                              alt={appointment.doctorName}
                              className="w-full h-24 sm:h-full object-cover"
                            />
                          </div>
                          <div className="p-4 sm:p-6 flex-1">
                            <div className="flex flex-col sm:flex-row justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                                <p className="text-gray-600">{appointment.specialty}</p>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-xs font-medium">
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">{appointment.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">{appointment.time}</span>
                              </div>
                              <div className="flex items-center sm:col-span-2">
                                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">{appointment.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                View Summary
                              </Button>
                              <Button size="sm" variant="outline">
                                Book Follow-up
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointment history</h3>
                    <p className="text-gray-600">
                      Your past appointments will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Appointments;
