// India average crop yield ≈ 1.5–2.2 tons / acre = we're using 1.8 tons/acre
// Fertilizer usage ≈ 50–70 kg / acre = we're using 60 kg/acre
// Pesticide usage ≈ 0.2–0.5 litres / acre = we're using 0.35 litres/acre
// Avg pesticide usage = 0.2 – 0.5 litres / acre / season
// 2️⃣ Post-Harvest Loss → 0.65 tons
// ICAR India Average Loss: Harvest handling	5–8% ; Storage	6–10% ; Transport	4–6% =>>>>> 👉 Total Avg Loss = ~18%
// Cold Storage Needed → 60% of marketable produce
// Warehouse Storage → 40% of marketable produce
// Saved via Route Optimization → 3% of marketable produce
// Packhouse Benefit → If loss > 15%, recommend packhouse which can save additional 10% of total yield
// Agri Infra Fund Eligibility → If cold storage needed > 5 tons, eligible for subsidy

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Sprout,
  FlaskRound,
  Bug,
  ArrowLeft,
  Info,
  Warehouse,
  Snowflake,
  Truck,
  PackageCheck,
  AlertTriangle,
} from "lucide-react";

function FarmDetail() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const size = parseFloat(query.get("size")) || 0;

  const estimatedYield = size * 1.8;
  const fertilizer = size * 60;
  const pesticide = size * 0.35;

  const spoilageRate = 0.18;
  const spoilageLoss = estimatedYield * spoilageRate;
  const marketableProduce = estimatedYield - spoilageLoss;

  const coldStorageQty = marketableProduce * 0.6;
  const normalStorageQty = marketableProduce * 0.4;

  const unoptimizedLossRate = 0.06;
  const optimizedLossRate = 0.03;
  const savedProduceByRouting =
    marketableProduce * (unoptimizedLossRate - optimizedLossRate);

  const packhouseRecommended =
    (spoilageLoss / estimatedYield) * 100 > 15;

  const packhouseSavedProduce = estimatedYield * 0.1;
  const agriInfraFundEligible = coldStorageQty > 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex flex-col items-center p-6">
      <Navbar/>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md hover:bg-green-100 transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-green-800">
          🌾 Smart Farm & Post-Harvest Report
        </h1>
        <p className="text-gray-600 mt-2">
          ICAR & KVK aligned scientific estimation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-5 shadow-lg">
          <Leaf className="text-green-600 mb-2" />
          <p className="text-sm text-gray-500">Farm Size</p>
          <p className="text-xl font-bold">{size} acres</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-yellow-50 rounded-2xl p-5 shadow-lg">
          <Sprout className="text-yellow-600 mb-2" />
          <p className="text-sm text-gray-500">Estimated Yield</p>
          <p className="text-xl font-bold">{estimatedYield.toFixed(2)} tons</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 rounded-2xl p-5 shadow-lg">
          <FlaskRound className="text-blue-600 mb-2" />
          <p className="text-sm text-gray-500">Fertilizer Required</p>
          <p className="text-xl font-bold">{fertilizer.toFixed(1)} kg</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-red-50 rounded-2xl p-5 shadow-lg">
          <Bug className="text-red-600 mb-2" />
          <p className="text-sm text-gray-500">Pesticide Required</p>
          <p className="text-xl font-bold">{pesticide.toFixed(2)} litres</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-5 shadow-lg">
          <AlertTriangle className="text-orange-500 mb-2" />
          <p className="text-sm text-gray-500">Post-Harvest Loss</p>
          <p className="text-xl font-bold">{spoilageLoss.toFixed(2)} tons</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-cyan-50 rounded-2xl p-5 shadow-lg">
          <Snowflake className="text-cyan-600 mb-2" />
          <p className="text-sm text-gray-500">Cold Storage Needed</p>
          <p className="text-xl font-bold">{coldStorageQty.toFixed(2)} tons</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-50 rounded-2xl p-5 shadow-lg">
          <Warehouse className="text-gray-600 mb-2" />
          <p className="text-sm text-gray-500">Warehouse Storage</p>
          <p className="text-xl font-bold">{normalStorageQty.toFixed(2)} tons</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-indigo-50 rounded-2xl p-5 shadow-lg">
          <Truck className="text-indigo-600 mb-2" />
          <p className="text-sm text-gray-500">Saved via Route Optimization</p>
          <p className="text-xl font-bold">
            {savedProduceByRouting.toFixed(2)} tons
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-emerald-50 rounded-2xl p-5 shadow-lg">
          <PackageCheck className="text-emerald-600 mb-2" />
          <p className="text-sm text-gray-500">Packhouse Benefit</p>
          <p className="text-xl font-bold">
            {packhouseRecommended
              ? `${packhouseSavedProduce.toFixed(2)} tons saved`
              : "Not Required"}
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-green-100 rounded-2xl p-5 shadow-lg">
          <Info className="text-green-700 mb-2" />
          <p className="text-sm text-gray-500">Agri Infra Fund</p>
          <p className="text-xl font-bold">
            {agriInfraFundEligible ? "Eligible" : "Not Eligible"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default FarmDetail;
