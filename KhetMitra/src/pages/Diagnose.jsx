import React, { useState, useEffect, useRef } from "react";
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

// Assets
import rainSound from "../assets/rain.mp3";
import animalSound from "../assets/animal.mp3";
import windSound from "../assets/wind.mp3";
import satelliteImg from "../assets/satellite.png";

// ------------------------
// ✅ LOCAL CROP RECOMMENDATION ENGINE (NO API)
// ------------------------
function getLocalCropRecommendation(data) {
  const { soilPH, nitrogen, phosphorus, potassium, soilMoist, soilTemp } = data;

  let crops = [];

  // pH Based Crop Recommendation
  if (soilPH >= 6 && soilPH <= 7.5) {
    crops.push("🌾 गेहूं (Wheat)");
    crops.push("🌽 मक्का (Maize)");
    crops.push("🥔 आलू (Potato)");
  } else if (soilPH < 6) {
    crops.push("🌾 धान (Rice)");
    crops.push("🌿 गन्ना (Sugarcane)");
    crops.push("🍅 टमाटर (Tomato)");
  } else if (soilPH > 7.5) {
    crops.push("🌱 चना (Gram)");
    crops.push("🌿 मूंगफली (Groundnut)");
    crops.push("🌴 बाजरा (Millet)");
  }

  // Nitrogen Based Suggestion
  if (nitrogen < 50) crops.push("🟤 Low Nitrogen: दालें उगाओ (Pulses)");
  else if (nitrogen > 150) crops.push("🟢 High Nitrogen: पत्तेदार सब्ज़ियाँ");

  // Moisture Based Suggestion
  if (soilMoist < 30) crops.push("💧 Low Moisture: बाजरा, मूंगफली");
  else if (soilMoist > 70) crops.push("🌧 High Moisture: धान, गन्ना");

  // Temperature Based Suggestion
  if (soilTemp < 20) crops.push("❄️ गेहूं, मटर");
  else if (soilTemp > 32) crops.push("🔥 मक्का, गन्ना, कपास");

  // Remove Duplicates + Select Only Top 3
  crops = [...new Set(crops)].slice(0, 3);

  return `
🌿 Recommended Crops:
1️⃣ ${crops[0] || "पर्याप्त डेटा नहीं"}
2️⃣ ${crops[1] || "पर्याप्त डेटा नहीं"}
3️⃣ ${crops[2] || "पर्याप्त डेटा नहीं"}

💡 Quick Soil Tip:
• Soil pH 6–7.5 सबसे अच्छा माना जाता है।
• गोबर की खाद/कम्पोस्ट डालो — nutrients balance होता है।
`.trim();
}

export default function Diagnose() {
  const [sensorData, setSensorData] = useState({});
  const [recommendation, setRecommendation] = useState("Waiting for data...");
  const [loadingRec, setLoadingRec] = useState(false);

  const recCalledRef = useRef(false);
  const unavailableText = "डिवाइस उपलब्ध नहीं है (Device Unavailable)";

  const emptyData = {
    soilTemp: 0,
    soilMoist: 0,
    soilPH: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ds18b20Temp: 0,
    bmpTemp: 0,
    pressure: 0,
    altitude: 0,
    rain: 0,
    ldr: 0,
    voltage: 0,
    button: 0,
  };

  // Notification Permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play().catch(() => {});
  };

  const showNotification = (title, body, soundFile) => {
    if (!("Notification" in window)) return;

    const createNotif = () => {
      new Notification(title, { body });
      if (soundFile) playSound(soundFile);
    };

    if (Notification.permission === "granted") createNotif();
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((p) => {
        if (p === "granted") createNotif();
      });
    }
  };

  // Fetch sensor data every 5 seconds
  useEffect(() => {
    let mounted = true;

    const fetchSensor = async () => {
      try {
        const res = await fetch("http://10.68.136.151:2713/sensor/latest");
        const data = await res.json();

        if (!mounted) return;

        if (data?.success) {
          const newData = data.data;

          // Alerts
          if (newData.rain === 1 && (sensorData.rain ?? 0) !== 1) {
            showNotification("🌧 बारिश अलर्ट", "तेज़ बारिश शुरू हो गई है!", rainSound);
          }

          if (newData.voltage > 5 && (sensorData.voltage ?? 0) <= 5) {
            showNotification("🌬 हवा अलर्ट", "तेज़ हवा चल रही है!", windSound);
          }

          if (newData.button === 1 && (sensorData.button ?? 0) !== 1) {
            showNotification("🚨 पशु अलर्ट", "पशु खेत में घुस आए!", animalSound);
          }

          setSensorData(newData);

          // Only one-time crop recommendation trigger
          if (!recCalledRef.current) {
            const valid =
              newData.soilPH ||
              newData.nitrogen ||
              newData.phosphorus ||
              newData.potassium;

            if (valid) {
              recCalledRef.current = true;
              setLoadingRec(true);

              // Local Recommendation (no API)
              const rec = getLocalCropRecommendation(newData);
              setRecommendation(rec);
              setLoadingRec(false);
            }
          }
        } else {
          setSensorData(emptyData);
        }
      } catch (e) {
        console.error("Sensor fetch error:", e);
        setSensorData(emptyData);
      }
    };

    fetchSensor();
    const interval = setInterval(fetchSensor, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const cropSensors = [
    { title: "मिट्टी का तापमान 🌡️", value: sensorData.soilTemp ?? unavailableText, icon: <Thermometer className="w-7 h-7 text-orange-400" /> },
    { title: "मिट्टी की नमी 💧", value: sensorData.soilMoist ?? unavailableText, icon: <Droplets className="w-7 h-7 text-cyan-300" /> },
    { title: "मिट्टी का pH", value: sensorData.soilPH ?? unavailableText, icon: <FlaskConical className="w-7 h-7 text-emerald-300" /> },
    { title: "नाइट्रोजन (N)", value: sensorData.nitrogen ?? unavailableText, icon: <Leaf className="w-7 h-7 text-green-400" /> },
    { title: "फॉस्फोरस (P)", value: sensorData.phosphorus ?? unavailableText, icon: <Leaf className="w-7 h-7 text-teal-300" /> },
    { title: "पोटेशियम (K)", value: sensorData.potassium ?? unavailableText, icon: <Leaf className="w-7 h-7 text-lime-300" /> },
  ];

  const environmentAlerts = [
    { title: "क्षेत्र तापमान 🌡️", value: sensorData.bmpTemp ?? unavailableText, icon: <Thermometer className="w-7 h-7 text-yellow-400" /> },
    { title: "दबाव (mmHg)", value: sensorData.pressure ?? unavailableText, icon: <Gauge className="w-7 h-7 text-sky-400" /> },
    { title: "ऊँचाई (m)", value: sensorData.altitude ?? unavailableText, icon: <MapPin className="w-7 h-7 text-indigo-400" /> },
    { title: "वर्षा अलर्ट", value: sensorData.rain === 1 ? "हाँ" : "नहीं", icon: <CloudRain className="w-7 h-7 text-sky-400" /> },
    { title: "प्रकाश तीव्रता", value: sensorData.ldr ?? unavailableText, icon: <Sun className="w-7 h-7 text-yellow-400" /> },
    { title: "आंधी/हवा", value: sensorData.voltage ?? unavailableText, icon: <Wind className="w-7 h-7 text-indigo-400" /> },
    { title: "पशु अलर्ट", value: sensorData.button === 1 ? "हाँ" : "नहीं", icon: <AlertTriangle className="w-7 h-7 text-red-400" /> },
  ];

  const glowStyle = {
    boxShadow: "0 0 20px rgba(72,187,120,0.2)",
    border: "1px solid rgba(233,252,239,0.2)",
    background: "rgba(20, 30, 40, 0.6)",
  };

  return (
    <div className="min-h-screen pb-10 pt-10 bg-gradient-to-br from-[#0d1b1e] via-[#102a2c] to-[#051f29] text-white">
      <Navbar />

      <div className="pt-[64px] relative z-10">
        {/* Title */}
        <div className="relative p-8 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-400 drop-shadow-lg">
              🌾 खेत का लाइव निदान (Live Farm Diagnosis)
            </h1>
            <img src={satelliteImg} alt="Satellite" className="w-12 h-12 animate-bounce" />
          </div>
          <p className="text-sm text-gray-400 mt-2 italic">Connecting with Satellite...</p>
          <p className="text-lg text-emerald-200 mt-2">वास्तविक समय सेंसर & अलर्ट</p>
        </div>

        {/* Crop Sensors */}
        <div className="px-6">
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">🌱 फसल स्वास्थ्य सेंसर</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cropSensors.map((sensor, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center"
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
        <div className="px-6 mt-10">
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">⚡ पर्यावरण अलर्ट</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {environmentAlerts.map((alert, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center"
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

        {/* Crop Recommendation */}
        <div className="px-6 mt-10 mb-10">
          <h2 className="text-2xl font-bold text-emerald-300 mb-4">🌿 फसल सुझाव</h2>

          <motion.div className="p-6 rounded-2xl" style={glowStyle} whileHover={{ scale: 1.02 }}>
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-semibold">अनुशंसित फसलें</h3>
              <div className="text-sm text-gray-300">{loadingRec ? "Fetching..." : "Updated"}</div>
            </div>

            <pre className="whitespace-pre-wrap text-emerald-200">{recommendation}</pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
