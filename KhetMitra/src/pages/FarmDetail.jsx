import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  Sprout,
  FlaskRound,
  Bug,
  ArrowLeft,
  Info,
} from "lucide-react";

function FarmDetail() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const size = parseFloat(query.get("size")) || 0;

  // 🌾 Scientific Logic (India Agriculture Avg - ICAR & Govt Data Based)
  const estimatedYield = (size * 1.8).toFixed(2);      // tons
  const fertilizer = (size * 60).toFixed(1);           // kg
  const pesticide = (size * 0.35).toFixed(2);          // litres

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex flex-col items-center p-6">
      {/* 🔙 Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md hover:bg-green-100 transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* 🧾 Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-green-800 flex justify-center items-center gap-2">
          🌾 Farm Report Summary
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Based on scientific Indian agriculture standards & your farm size.
        </p>
      </motion.div>

      {/* 🌿 Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-10">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-5 flex flex-col items-start border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="text-green-600" size={24} />
            <h2 className="text-lg font-semibold text-green-800">Farm Size</h2>
          </div>
          <p className="text-xl font-bold text-gray-800">{size} acres</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-yellow-50 shadow-lg rounded-2xl p-5 flex flex-col items-start border border-yellow-100">
          <div className="flex items-center gap-3 mb-2">
            <Sprout className="text-yellow-600" size={24} />
            <h2 className="text-lg font-semibold text-yellow-800">Estimated Yield</h2>
          </div>
          <p className="text-xl font-bold text-gray-800">{estimatedYield} tons</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 shadow-lg rounded-2xl p-5 flex flex-col items-start border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <FlaskRound className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold text-blue-800">Fertilizer Required</h2>
          </div>
          <p className="text-xl font-bold text-gray-800">
            {fertilizer} kg <span className="text-sm text-gray-500">(Balanced NPK)</span>
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-red-50 shadow-lg rounded-2xl p-5 flex flex-col items-start border border-red-100">
          <div className="flex items-center gap-3 mb-2">
            <Bug className="text-red-600" size={24} />
            <h2 className="text-lg font-semibold text-red-800">Pesticide Required</h2>
          </div>
          <p className="text-xl font-bold text-gray-800">{pesticide} litres</p>
        </motion.div>
      </div>

      {/* 📋 Recommendation Summary */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center gap-2 mb-4">
          <Info className="text-green-600" size={22} />
          <h3 className="text-lg font-semibold text-green-800">Recommendation Summary</h3>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li>
            ✅ For <span className="font-semibold">{size} acres</span>, total estimated yield is{" "}
            <span className="font-semibold">{estimatedYield} tons</span>.
          </li>
          <li>
            🌱 Apply{" "}
            <span className="font-semibold text-green-700">
              {fertilizer} kg of Balanced NPK fertilizer
            </span>{" "}
            for optimal growth.
          </li>
          <li>
            🐞 Use{" "}
            <span className="font-semibold text-green-700">
              {pesticide} litres
            </span>{" "}
            of pesticide (avg Indian usage basis).
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default FarmDetail;
