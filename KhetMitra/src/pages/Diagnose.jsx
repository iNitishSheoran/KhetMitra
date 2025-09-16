import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  FlaskConical,
  Leaf,
  Sun,
  CloudRain,
  Gauge,
  Wind,
  MapPin,
  AlertTriangle,
} from "lucide-react";

// ✅ Import sound from assets
import notificationSound from "../assets/notification.mp3";

function Diagnose() {
  const [sensorData, setSensorData] = useState({});
  const unavailableText = "डिवाइस उपलब्ध नहीं है (Device Unavailable)";

  // ✅ Ask notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Play sound
  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch(() => {});
  };

  // ✅ Show notification
  const showNotification = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
      playSound();
    }
  };

  // ✅ Fetch sensors + trigger alerts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://10.157.44.151:2713/sensor/latest");
        const data = await res.json();
        if (data.success) {
          setSensorData((prev) => {
            const old = prev || {};

            // 🌧 Rain Alert
            if (data.data.rain === 1 && old.rain !== 1) {
              showNotification("🌧 बारिश अलर्ट", "तेज़ हवा और बारिश शुरू हो गई है, सामान संभाल लो।");
            }

            // 🌬 Wind Alert (>0.4)
            if (data.data.voltage > 0.4 && (old.voltage ?? 0) <= 0.4) {
              showNotification("🌬 हवा अलर्ट", "तेज़ हवा चल रही है, सावधान रहें।");
            }

            // 🐄 Grazing Alert
            if (data.data.button === 1 && old.button !== 1) {
              showNotification("🚨 पशु अलर्ट", "पशु खेत में प्रवेश कर गए हैं, फसल बचाइए!");
            }

            return data.data;
          });
        }
      } catch (err) {
        console.error("Error fetching sensor data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const cropSensors = [
    { title: "मिट्टी का तापमान (Soil Temperature) 🌡️", value: sensorData.soilTemp ?? unavailableText, icon: <Thermometer className="w-7 h-7 text-orange-400" /> },
    { title: "मिट्टी की नमी (Soil Moisture) 💧", value: sensorData.soilMoist ?? unavailableText, icon: <Droplets className="w-7 h-7 text-cyan-300" /> },
    { title: "मिट्टी का pH (Soil pH)", value: sensorData.soilPH ?? unavailableText, icon: <FlaskConical className="w-7 h-7 text-emerald-300" /> },
    { title: "नाइट्रोजन (Nitrogen - N)", value: sensorData.nitrogen ?? unavailableText, icon: <Leaf className="w-7 h-7 text-green-400" /> },
    { title: "फॉस्फोरस (Phosphorus - P)", value: sensorData.phosphorus ?? unavailableText, icon: <Leaf className="w-7 h-7 text-teal-300" /> },
    { title: "पोटेशियम (Potassium - K)", value: sensorData.potassium ?? unavailableText, icon: <Leaf className="w-7 h-7 text-lime-300" /> },
    { title: "मिट्टी तापमान (2) (Soil Temperature (2))", value: sensorData.ds18b20Temp ?? unavailableText, icon: <Thermometer className="w-7 h-7 text-red-400" /> },
  ];

  const environmentAlerts = [
    { title: "क्षेत्र तापमान (Area Temperature) 🌡️", value: sensorData.bmpTemp ?? unavailableText, icon: <Thermometer className="w-7 h-7 text-yellow-400" /> },
    { title: "दबाव (Pressure - mmHg)", value: sensorData.pressure ?? unavailableText, icon: <Gauge className="w-7 h-7 text-sky-400" /> },
    { title: "ऊँचाई (Altitude - m)", value: sensorData.altitude ?? unavailableText, icon: <MapPin className="w-7 h-7 text-indigo-400" /> },
    { title: "वर्षा सूचना (Rain Alert) ☔", value: sensorData.rain === 1 ? "हाँ (Yes)" : "नहीं (No)", icon: <CloudRain className="w-7 h-7 text-sky-400" /> },
    { title: "प्रकाश तीव्रता (Light Intensity - LDR)", value: sensorData.ldr ?? unavailableText, icon: <Sun className="w-7 h-7 text-yellow-400" /> },
    { title: "तेज़ हवा / आंधी अलर्ट (Wind Alert) ⚡", value: sensorData.voltage ?? unavailableText, icon: <Wind className="w-7 h-7 text-indigo-400" /> },
    { title: "पशु चराई सूचना (Grazing Alert)", value: sensorData.button === 1 ? "हाँ (Yes)" : "नहीं (No)", icon: <AlertTriangle className="w-7 h-7 text-red-400" /> },
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
            🌾 खेत का लाइव निदान (Live Farm Diagnosis)
          </h1>
          <p className="text-lg text-emerald-200 mt-2">
            वास्तविक समय के सेंसर और पर्यावरण अलर्ट (Real-time Sensors & Environment Alerts)
          </p>
        </div>

        {/* Crop Sensors */}
        <div className="relative z-10 px-6">
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">
            🌱 फसल स्वास्थ्य सेंसर (Crop Health Sensors)
            <span className="text-sm text-gray-400 font-normal">
              * (डिवाइस/हार्डवेयर के बिना कार्य नहीं करेगा, कृपया कनेक्ट करें)  
              *(Will not work without device/hardware, please connect)*
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
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">
            ⚡ पर्यावरण अलर्ट (Environment Alerts)  
            <span className="text-sm text-gray-400 font-normal">
              * (डिवाइस/हार्डवेयर के बिना कार्य नहीं करेगा, कृपया कनेक्ट करें)  
              *(Will not work without device/hardware, please connect)*
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
                <p className={`text-xl font-bold ${alert.value === unavailableText ? "text-red-400" : "text-emerald-300"}`}>
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
