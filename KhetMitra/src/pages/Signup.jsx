// src/components/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import farmerImg from "../assets/indian-farmer.png";

// Icons
import { User, Mail, Lock, Phone, MapPin, Leaf, Calendar } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    state: "",
    district: "",
    crops: "",
    age: "",
    password: "",
    state: "",
    district: "",
    crops: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/signup`, form, { withCredentials: true });
      setMessage(res.data?.message || "Account created");
      navigate("/login"); // redirect after signup
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "❌ Signup failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="flex items-center border border-green-300 rounded-xl p-3 bg-white/30 backdrop-blur-md focus-within:ring-2 focus-within:ring-green-500 transition shadow-sm hover:shadow-md">
      <Icon className="w-5 h-5 text-green-600 mr-2" />
      <input
        {...props}
        className="w-full outline-none bg-transparent placeholder-gray-600"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Create an Account</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full border rounded-lg p-2" required />
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border rounded-lg p-2" />
          <input type="email" name="emailId" value={form.emailId} onChange={handleChange} placeholder="Email Address" className="w-full border rounded-lg p-2" required />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border rounded-lg p-2" required />

          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-green-600 cursor-pointer hover:underline">
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
