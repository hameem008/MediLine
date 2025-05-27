
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Calendar } from "lucide-react";

// Mock data for doctors
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 124,
    location: "City Hospital, Main St.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    available: true,
    nextSlot: "Today, 4:00 PM",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 95,
    location: "Medical Center, 5th Ave.",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    available: true,
    nextSlot: "Tomorrow, 10:30 AM",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 156,
    location: "Skin Care Clinic, Park Rd.",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    available: true,
    nextSlot: "Today, 2:15 PM",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Surgeon",
    rating: 4.6,
    reviews: 88,
    location: "Orthopedic Institute, Health Blvd.",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    available: false,
    nextSlot: "May 25, 9:00 AM",
  },
  {
    id: 5,
    name: "Dr. Amanda Patel",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 210,
    location: "Children's Wellness Center, Cedar St.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    available: true,
    nextSlot: "Today, 5:30 PM",
  },
];

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState([4]);
  const [availableOnly, setAvailableOnly] = useState(false);
  
  // Filter the doctors based on search criteria
  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSpecialty = !specialty || doctor.specialty.toLowerCase() === specialty.toLowerCase();
    
    const matchesLocation = !location || doctor.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesRating = doctor.rating >= minRating[0];
    
    const matchesAvailability = !availableOnly || doctor.available;
    
    return matchesSearch && matchesSpecialty && matchesLocation && matchesRating && matchesAvailability;
  });

  return (
    <MainLayout>
      <div className="bg-medical-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Doctors</h1>
            <p className="text-xl text-gray-600 mb-6">
              Search for healthcare professionals by name, specialty, or location.
            </p>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by doctor name or specialty..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Filter Results</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="specialty-filter" className="text-sm font-medium text-gray-700 block">
                      Specialty
                    </label>
                    <Select value={specialty} onValueChange={setSpecialty}>
                      <SelectTrigger id="specialty-filter">
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                        <SelectItem value="Neurologist">Neurologist</SelectItem>
                        <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                        <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
                        <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="location-filter" className="text-sm font-medium text-gray-700 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="location-filter"
                        placeholder="Any location"
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Minimum Rating: {minRating}
                    </label>
                    <Slider
                      value={minRating}
                      min={0}
                      max={5}
                      step={0.1}
                      onValueChange={setMinRating}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0</span>
                      <span>5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="available-now"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      className="rounded border-gray-300 text-medical-primary focus:ring-medical-primary"
                    />
                    <label htmlFor="available-now" className="ml-2 text-sm text-gray-700">
                      Available Today
                    </label>
                  </div>
                  
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Doctor list */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredDoctors.length} doctors
              </p>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating-high">Highest Rated</SelectItem>
                  <SelectItem value="rating-low">Lowest Rated</SelectItem>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="doctor-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 lg:w-1/5">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover sm:aspect-square"
                          />
                        </div>
                        <div className="p-4 sm:p-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                            <div className="flex items-center mt-1 sm:mt-0">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-gray-700 font-medium">{doctor.rating}</span>
                              <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="mb-3">{doctor.specialty}</Badge>
                          <p className="flex items-center text-gray-600 mb-4">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            {doctor.location}
                          </p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
                            <div className="flex items-center mb-3 sm:mb-0">
                              <Calendar className="h-4 w-4 mr-2 text-medical-primary" />
                              <div>
                                <span className="font-medium">Next Available: </span>
                                <span>{doctor.nextSlot}</span>
                              </div>
                            </div>
                            <Button>Book Appointment</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Doctors;
