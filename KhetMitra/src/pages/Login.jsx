// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [form, setForm] = useState({
    emailId: "",
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
      const res = await axios.post(`${BASE_URL}/login`, form, { withCredentials: true });
      setMessage(res.data?.message || "Login successful");

      // Keep user info locally (useful for UI)
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      // refresh auth hook immediately so Navbar updates without full reload
      if (refreshAuth) await refreshAuth();

      navigate("/"); // redirect after login
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "❌ Login failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Login</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="emailId"
            value={form.emailId}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg p-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-green-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
