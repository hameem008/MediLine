
import React from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

const DoctorSearchCard: React.FC = () => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-medical-primary text-white pb-4 rounded-t-lg">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Search className="mr-2 h-5 w-5" />
          Doctor Directory & Search
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <p className="text-gray-600">
            Patients can find doctors by:
          </p>
          <ul className="space-y-2 ml-6 list-disc text-gray-600">
            <li>Specialty</li>
            <li>Location</li>
            <li>Availability</li>
            <li>Ratings</li>
          </ul>
          <div className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="specialty" className="text-sm font-medium text-gray-700">
                  Specialty
                </label>
                <Select>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="Enter city or zip code"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <Button className="w-full">
              Search Doctors
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorSearchCard;
