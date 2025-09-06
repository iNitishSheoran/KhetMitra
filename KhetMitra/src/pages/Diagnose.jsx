import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState({
    ph: 6.5,
    conductivity: 1.2,
    npk: "N:45 P:30 K:25",
    temperature: 28,
    moisture: 60,
    uv: 3.2,
    rain: "नहीं हो रही 🌤️",
    grazing: "कोई पशु पास नहीं 🐄",
    storm: "सुरक्षित ✅",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        ph: (6 + Math.random()).toFixed(2),
        conductivity: (1 + Math.random() * 2).toFixed(2),
        npk: `N:${Math.floor(Math.random() * 100)} P:${Math.floor(
          Math.random() * 100
        )} K:${Math.floor(Math.random() * 100)}`,
        temperature: (25 + Math.random() * 10).toFixed(1),
        moisture: (40 + Math.random() * 30).toFixed(0),
        uv: (1 + Math.random() * 10).toFixed(1),
        rain: Math.random() > 0.7 ? "बारिश हो रही है 🌧️" : "नहीं हो रही 🌤️",
        grazing: Math.random() > 0.6 ? "पशु खेत में हैं ⚠️" : "कोई पशु पास नहीं 🐄",
        storm: Math.random() > 0.8 ? "⚠️ तेज़ हवा/आंधी" : "सुरक्षित ✅",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cropSensors = [
    {
      title: "pH स्तर",
      value: data.ph,
      icon: <FlaskConical className="w-7 h-7 text-green-400" />,
      unit: "",
    },
    {
      title: "विद्युत चालकता",
      value: data.conductivity,
      icon: <Activity className="w-7 h-7 text-blue-400" />,
      unit: " mS/cm",
    },
    {
      title: "NPK (नाइट्रोजन, फॉस्फोरस, पोटाश)",
      value: data.npk,
      icon: <Leaf className="w-7 h-7 text-green-500" />,
      unit: "",
    },
    {
      title: "तापमान",
      value: data.temperature,
      icon: <Thermometer className="w-7 h-7 text-red-400" />,
      unit: " °C",
    },
    {
      title: "नमी",
      value: data.moisture,
      icon: <Droplets className="w-7 h-7 text-blue-500" />,
      unit: " %",
    },
  ];

  const environmentAlerts = [
    {
      title: "UV विकिरण",
      value: data.uv,
      icon: <Sun className="w-7 h-7 text-yellow-400" />,
      unit: " mW/cm²",
    },
    {
      title: "वर्षा सूचना",
      value: data.rain,
      icon: <CloudRain className="w-7 h-7 text-blue-400" />,
      unit: "",
    },
    {
      title: "पशु चराई सूचना",
      value: data.grazing,
      icon: <AlertTriangle className="w-7 h-7 text-orange-400" />,
      unit: "",
    },
    {
      title: "तेज़ हवा / आंधी अलर्ट",
      value: data.storm,
      icon: <Wind className="w-7 h-7 text-cyan-400" />,
      unit: "",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-green-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Animated glowing background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(34,197,94,0.3), transparent 70%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.3), transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Title */}
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
          🌾 खेत का लाइव निदान
        </h1>
        <p className="text-lg text-gray-200 mt-2">
          वास्तविक समय के सेंसर और पर्यावरण अलर्ट
        </p>
      </div>

      {/* Crop Sensors */}
      <div className="relative z-10 px-6">
        <h2 className="text-2xl font-bold text-green-300 mb-4">
          🌱 फसल स्वास्थ्य सेंसर
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cropSensors.map((sensor, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center border border-green-300/30 hover:border-yellow-300/50"
              whileHover={{ scale: 1.07 }}
            >
              <div className="mb-3">{sensor.icon}</div>
              <h2 className="text-lg font-semibold">{sensor.title}</h2>
              <p className="text-2xl font-bold text-yellow-200 drop-shadow-md">
                {sensor.value}
                <span className="text-gray-200 text-lg">{sensor.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Environment Alerts */}
      <div className="relative z-10 px-6 mt-10 mb-10">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">
          ⚡ पर्यावरण अलर्ट
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {environmentAlerts.map((alert, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center border border-blue-300/30 hover:border-red-300/50"
              whileHover={{ scale: 1.07 }}
            >
              <div className="mb-3">{alert.icon}</div>
              <h2 className="text-lg font-semibold">{alert.title}</h2>
              <p className="text-xl font-bold text-green-200 drop-shadow-md">
                {alert.value}
                <span className="text-gray-200 text-lg">{alert.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diagnose;
