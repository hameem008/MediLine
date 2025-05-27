import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  User,
  Menu,
  X,
  Calendar,
  FileText,
  Search,
  Home,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-medical-primary rounded-md flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
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
              <span className="ml-2 text-xl font-semibold text-medical-primary">
                MediLine Health
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-medical-primary flex items-center px-3 py-2"
            >
              <Home size={16} className="mr-1" />
              Home
            </Link>
            <Link
              to="/doctors"
              className="text-gray-600 hover:text-medical-primary flex items-center px-3 py-2"
            >
              <Search size={16} className="mr-1" />
              Find Doctors
            </Link>
            <Link
              to="/appointments"
              className="text-gray-600 hover:text-medical-primary flex items-center px-3 py-2"
            >
              <Calendar size={16} className="mr-1" />
              Appointments
            </Link>
            <Link
              to="/medical-history"
              className="text-gray-600 hover:text-medical-primary flex items-center px-3 py-2"
            >
              <FileText size={16} className="mr-1" />
              Medical Records
            </Link>
            <Button variant="outline" className="ml-2" asChild>
              <Link to="/login">
                🔐 Log In
              </Link>
            </Button>
            <Button asChild>
              <Link to="/register">
                <User className="mr-2 h-4 w-4" /> Register
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-medical-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-medical-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-medical-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Home size={16} className="mr-2" />
                Home
              </div>
            </Link>
            <Link
              to="/doctors"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-medical-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Search size={16} className="mr-2" />
                Find Doctors
              </div>
            </Link>
            <Link
              to="/appointments"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-medical-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                Appointments
              </div>
            </Link>
            <Link
              to="/medical-history"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-medical-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <FileText size={16} className="mr-2" />
                Medical Records
              </div>
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
              <Button asChild className="w-full">
                <Link to="/login" onClick={toggleMenu}>
                  🔐 Log In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/register" onClick={toggleMenu}>
                  <User className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
