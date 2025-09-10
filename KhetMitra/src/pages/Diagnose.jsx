import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Activity,
  FlaskConical,
  Leaf,
  Sun,
  CloudRain,
  Wind,
  AlertTriangle,
} from "lucide-react";

function Diagnose() {
  const [hoveredAlert, setHoveredAlert] = useState(null);
  const [moisture, setMoisture] = useState(null);

  const unavailableText = "Device Unavailable";

  // ✅ Fetch moisture from backend
  useEffect(() => {
    const fetchMoisture = async () => {
      try {
        const res = await fetch("http://localhost:2713/sensor/moisture");
        const data = await res.json();
        setMoisture(data.moisture);
      } catch (err) {
        console.error("Error fetching moisture:", err);
        setMoisture(null);
      }
    };

    fetchMoisture();
    const interval = setInterval(fetchMoisture, 5000);
    return () => clearInterval(interval);
  }, []);

  const cropSensors = [
    { title: "pH स्तर", value: unavailableText, icon: <FlaskConical className="w-7 h-7 text-emerald-300" /> },
    { title: "नमी 💧", value: unavailableText, icon: <Droplets className="w-7 h-7 text-emerald-300" /> },
    { title: "विद्युत चालकता", value: unavailableText, icon: <Activity className="w-7 h-7 text-teal-300" /> },
    { title: "NPK (नाइट्रोजन, फॉस्फोरस, पोटाश)", value: unavailableText, icon: <Leaf className="w-7 h-7 text-green-300" /> },
    { title: "तापमान", value: unavailableText, icon: <Thermometer className="w-7 h-7 text-orange-400" /> },
    { 
      title: "नमी उप उपकरण", 
      value: moisture !== null ? `${moisture}%` : unavailableText, 
      icon: <Droplets className="w-7 h-7 text-cyan-300" /> 
    },
  ];

  const environmentAlerts = [
    { title: "प्रकाश तीव्रता 🌟", value: unavailableText, icon: <Sun className="w-7 h-7 text-yellow-400" /> },
    { title: "वर्षा सूचना", value: unavailableText, icon: <CloudRain className="w-7 h-7 text-sky-400" /> },
    { title: "पशु चराई सूचना", value: unavailableText, icon: <AlertTriangle className="w-7 h-7 text-red-400" /> },
    { title: "तेज़ हवा / आंधी अलर्ट", value: unavailableText, icon: <Wind className="w-7 h-7 text-indigo-400" /> },
  ];

  const glowStyle = {
    boxShadow: "0 0 20px rgba(72,187,120,0.2)",
    border: "1px solid rgba(233,252,239,0.2)",
    background: "rgba(20, 30, 40, 0.6)",
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0d1b1e] via-[#102a2c] to-[#051f29] text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-[64px] relative z-10">
        {/* Title */}
        <div className="relative z-10 p-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-400 drop-shadow-lg">
            🌾 खेत का लाइव निदान
          </h1>
          <p className="text-lg text-emerald-200 mt-2">
            वास्तविक समय के सेंसर और पर्यावरण अलर्ट
          </p>
        </div>

        {/* Crop Sensors */}
        <div className="relative z-10 px-6">
       <h2 className="text-2xl font-bold text-emerald-300 mb-4">
  🌱 फसल स्वास्थ्य सेंसर 
  <span className="text-sm text-gray-400 font-normal">
    * (डिवाइस/हार्डवेयर के बिना कार्य नहीं करेगा, कृपया कनेक्ट करें)
  </span>
</h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cropSensors.map((sensor, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center"
                style={glowStyle}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-3">{sensor.icon}</div>
                <h2 className="text-lg font-semibold">{sensor.title}</h2>
                <p className={`text-xl font-bold ${sensor.value === unavailableText ? "text-red-400" : "text-emerald-300"}`}>
                  {sensor.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Environment Alerts */}
        <div className="relative z-10 px-6 mt-10 mb-10">
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">⚡ पर्यावरण अलर्ट
            <span className="text-sm text-gray-400 font-normal">
    * (डिवाइस/हार्डवेयर के बिना कार्य नहीं करेगा, कृपया कनेक्ट करें)
  </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {environmentAlerts.map((alert, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center"
                style={glowStyle}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-3">{alert.icon}</div>
                <h2 className="text-lg font-semibold">{alert.title}</h2>
                <p className="text-xl font-bold text-red-400">{alert.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;
