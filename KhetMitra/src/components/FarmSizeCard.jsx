import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tractor, Sprout, Leaf } from "lucide-react";

export default function FarmSizeCard() {
  const navigate = useNavigate();
  const [farmSize, setFarmSize] = useState("");

  const handleSubmit = () => {
    if (!farmSize || isNaN(farmSize) || farmSize <= 0) {
      alert("Please enter a valid farm size in acres!");
      return;
    }
    navigate(`/farm-detail?size=${farmSize}`);
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-50 shadow-lg rounded-2xl p-6 w-[280px] border border-green-200 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <Sprout className="text-green-700 w-6 h-6" />
        <h2 className="text-lg font-bold text-green-800">Farm Assistant 🌾</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Enter your farm size to get yield, fertilizer & pesticide suggestions.
      </p>
      <input
        type="number"
        value={farmSize}
        onChange={(e) => setFarmSize(e.target.value)}
        placeholder="e.g. 2.5 acres"
        className="border border-green-300 focus:ring-2 focus:ring-green-500 rounded-lg px-4 py-2 w-full text-center text-gray-700 font-medium mb-4"
      />
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        <Tractor size={18} /> Calculate
      </button>
      <p className="mt-3 text-xs text-gray-500">Click to view detailed report</p>
    </div>
  );
}
