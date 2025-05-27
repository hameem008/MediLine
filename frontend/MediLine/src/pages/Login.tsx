import React, { useState } from "react";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

type Role = "patient" | "doctor";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = role === "patient" ? "/login/patient" : "/login/doctor";

    try {
      const response = await api.post(url, { email, password });
      alert("Login successful!");
      console.log("User:", response.data);
      navigate("/dashboard");
    } catch (err: any) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <MainLayout>
      {/* Full-page wrapper that prevents horizontal scrolling */}
      <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-white">
        {/* Form container */}
        <div className="w-full max-w-md px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-6 text-medical-primary">
            Login as {role}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full p-2 border rounded"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-medical-primary text-white py-2 px-4 rounded hover:bg-medical-primary-dark transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
