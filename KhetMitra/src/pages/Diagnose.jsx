import React, { useState } from "react";
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

  const unavailableText = "Device Unavailable";

  const cropSensors = [
    { title: "pH स्तर", value: unavailableText, icon: <FlaskConical className="w-7 h-7 text-emerald-300" />, unit: "" },
    { title: "विद्युत चालकता", value: unavailableText, icon: <Activity className="w-7 h-7 text-teal-300" />, unit: "" },
    { title: "NPK (नाइट्रोजन, फॉस्फोरस, पोटाश)", value: unavailableText, icon: <Leaf className="w-7 h-7 text-green-300" />, unit: "" },
    { title: "तापमान", value: unavailableText, icon: <Thermometer className="w-7 h-7 text-orange-400" />, unit: "" },
    { title: "नमी", value: unavailableText, icon: <Droplets className="w-7 h-7 text-cyan-300" />, unit: "" },
  ];

  const environmentAlerts = [
    { title: "UV विकिरण", value: unavailableText, icon: <Sun className="w-7 h-7 text-yellow-400" />, unit: "" },
    { title: "वर्षा सूचना", value: unavailableText, icon: <CloudRain className="w-7 h-7 text-sky-400" />, unit: "" },
    { title: "पशु चराई सूचना", value: unavailableText, icon: <AlertTriangle className="w-7 h-7 text-red-400" />, unit: "" },
    { title: "तेज़ हवा / आंधी अलर्ट", value: unavailableText, icon: <Wind className="w-7 h-7 text-indigo-400" />, unit: "" },
  ];

  const glowStyle = {
    boxShadow: "0 0 20px rgba(72,187,120,0.2)",
    border: "1px solid rgba(233,252,239,0.2)",
    background: "rgba(20, 30, 40, 0.6)", // frosted dark glass
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0d1b1e] via-[#102a2c] to-[#051f29] text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-[64px] relative z-10">
        {/* Animated radial glows */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(233,252,239,0.12), transparent 70%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.12), transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Page Title */}
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
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cropSensors.map((sensor, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center"
                style={glowStyle}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="mb-3">{sensor.icon}</div>
                <h2 className="text-lg font-semibold">{sensor.title}</h2>
                <p className="text-xl font-bold text-red-400">
                  {sensor.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Environment Alerts */}
        <div className="relative z-10 px-6 mt-10 mb-10">
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">⚡ पर्यावरण अलर्ट</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {environmentAlerts.map((alert, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center"
                style={glowStyle}
                onMouseEnter={() => setHoveredAlert(index)}
                onMouseLeave={() => setHoveredAlert(null)}
                animate={{
                  scale:
                    hoveredAlert === null
                      ? 1
                      : hoveredAlert === index
                      ? 1.05
                      : 0.95,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="mb-3">{alert.icon}</div>
                <h2 className="text-lg font-semibold">{alert.title}</h2>
                <p className="text-xl font-bold text-red-400">
                  {alert.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;
