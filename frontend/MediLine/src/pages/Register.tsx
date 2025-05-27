import React, { useState } from "react";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

type Role = "patient" | "doctor";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    specialization: "",
    designation: "",
    academicInstitution: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = role === "patient" ? "/register/patient" : "/register/doctor";

    const payload =
      role === "patient"
        ? {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            bloodGroup: formData.bloodGroup,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
          }
        : {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            specialization: formData.specialization,
            designation: formData.designation,
            academicInstitution: formData.academicInstitution,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
          };

    try {
      await api.post(url, payload);
      alert("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      alert("Registration failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-medical-primary">
          Register as {role}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium">Registering as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full p-2 border rounded"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {role === "patient" && (
            <>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-2 border rounded" />
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </>
          )}

          {role === "doctor" && (
            <>
              <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded" />
              <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} className="w-full p-2 border rounded" />
              <input name="academicInstitution" placeholder="Academic Institution" value={formData.academicInstitution} onChange={handleChange} className="w-full p-2 border rounded" />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-medical-primary text-white py-2 px-4 rounded hover:bg-medical-primary-dark transition"
          >
            Register
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Register;
