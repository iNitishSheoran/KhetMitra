// src/components/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailId: "",
    state: "",
    district: "",
    crops: "",
    age: "",
    password: "",
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
      const res = await axios.post(`${BASE_URL}/signup`, form, {
        withCredentials: true,
      });
      setMessage(res.data?.message || "Account created");
      navigate("/");
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

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Create an Account
        </h2>
        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg p-3"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="emailId"
              value={form.emailId}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border rounded-lg p-3"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border rounded-lg p-3"
              required
            />
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="District"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="crops"
              value={form.crops}
              onChange={handleChange}
              placeholder="Crops you are growing"
              className="w-full border rounded-lg p-3"
            />
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full border rounded-lg p-3"
              min="18"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
