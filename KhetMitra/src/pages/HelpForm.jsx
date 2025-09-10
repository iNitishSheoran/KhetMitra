import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import HelpImage from "../assets/Help.png";
import Navbar from "../components/Navbar";

export default function HelpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    phoneNo: "",
    email: "",
    help: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send JSON directly
      const res = await axios.post(`${BASE_URL}/help/submit`, form, {
        withCredentials: true,
      });

      setMessage(res.data.message || "✅ Request submitted successfully!");

      // Reset form
      setForm({
        name: "",
        state: "",
        district: "",
        phoneNo: "",
        email: "",
        help: "",
      });

      // Clear message after 3s
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
  console.log(err); // for debugging

  if (err.response?.status === 401) {
    setMessage("Please Login to send Help Requests");
  } else {
    setMessage(err.response?.data?.error || "❌ Failed to submit request");
  }

  setTimeout(() => setMessage(""), 3000);
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-[#bddcb8] flex flex-col items-center px-4 py-10">
      <Navbar/>
      <div className="h-16 w-full"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
        सहायता अनुरोध (Help Request)
      </h2>

      <div className="max-w-5xl w-full bg-[#e1fbdd] shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
        {/* Left image */}
        <div className="flex justify-center items-center">
          <img
            src={HelpImage}
            alt="Help"
            className="rounded-lg shadow-md w-full max-w-sm"
          />
        </div>

        {/* Right form */}
        <div className="flex flex-col justify-center">
          {message && (
            <div className="text-center mb-4 text-sm font-medium text-red-500">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="आपका नाम (Name)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="राज्य (State)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="जिला (District)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="text"
              name="phoneNo"
              value={form.phoneNo}
              onChange={handleChange}
              placeholder="फोन नंबर (10 अंक)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ईमेल (Email)"
              className="md:col-span-2 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <textarea
              name="help"
              value={form.help}
              onChange={handleChange}
              placeholder="अपनी समस्या का विवरण लिखें (Describe your issue)"
              rows="4"
              className="md:col-span-2 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-200"
            >
              {loading ? "सबमिट हो रहा है..." : "अनुरोध सबमिट करें"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex justify-center md:justify-start gap-6 mt-6 text-gray-600 text-sm">
            <p>📞 +91 79881 00765</p>
            <p>✉️ khetmitra23@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
