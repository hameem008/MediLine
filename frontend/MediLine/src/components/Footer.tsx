
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
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
            </div>
            <p className="text-gray-500 text-sm">
              A comprehensive digital medical system connecting patients, doctors, and healthcare facilities.
            </p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">For Patients</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctors" className="text-gray-500 hover:text-medical-primary text-sm">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-500 hover:text-medical-primary text-sm">
                  Book Appointments
                </Link>
              </li>
              <li>
                <Link to="/medical-history" className="text-gray-500 hover:text-medical-primary text-sm">
                  View Medical History
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-500 hover:text-medical-primary text-sm">
                  Patient Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">For Doctors</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
                  Doctor Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
                  Manage Appointments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
                  Patient Records
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
                  Prescription System
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-500 text-sm">
                Email: contact@medilinehealth.com
              </li>
              <li className="text-gray-500 text-sm">
                Phone: (123) 456-7890
              </li>
              <li className="text-gray-500 text-sm">
                Address: 123 Medical Plaza, Healthcare City
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MediLine Health. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-medical-primary text-sm">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
