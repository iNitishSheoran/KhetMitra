import React, { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function HelpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    phoneNo: "",
    email: "",
    help: "",
    imageUrl: ""
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
      const res = await axios.post(`${BASE_URL}/help/submit`, form);
      setMessage(res.data.message);
      setForm({ name: "", state: "", district: "", phoneNo: "", email: "", help: "", imageUrl: "" });
      navigate("/my-requests");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Failed to submit request");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-green-700 text-center mb-2">
          सहायता अनुरोध (Help Request)
        </h2>
        <p className="text-gray-600 text-center mb-6">
          अपनी समस्या हमें बताएं – हमारी टीम जल्द से जल्द मदद करेगी।
        </p>

        {/* Success/Error message */}
        {message && (
          <div className="text-center text-sm font-medium text-red-600 mb-4">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="आपका नाम (Name)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="राज्य (State)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="जिला (District)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="text"
            name="phoneNo"
            value={form.phoneNo}
            onChange={handleChange}
            placeholder="फोन नंबर (10 अंकों का)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ईमेल (Email)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (Optional)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
          />

          {/* Help textarea full width */}
          <textarea
            name="help"
            value={form.help}
            onChange={handleChange}
            placeholder="अपनी समस्या का विवरण लिखें (Describe your issue)"
            rows="5"
            className="md:col-span-2 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
            required
          ></textarea>

          {/* Submit button full width */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition duration-200"
          >
            {loading ? "Submitting..." : "अनुरोध सबमिट करें (Submit Request)"}
          </button>
        </form>
      </div>
    </div>
  );
}
