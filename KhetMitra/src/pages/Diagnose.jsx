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

// ✅ Assets
import rainSound from "../assets/rain.mp3";
import animalSound from "../assets/animal.mp3";
import windSound from "../assets/wind.mp3";
import satelliteImg from "../assets/satellite.png";

// ✅ Gemini API Key (frontend visible, better use backend for security)
const GEMINI_API_KEY = "AIzaSyC5_ATHKUvuOIz4jKA1YBSm2OKTewHAjA8";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default function Diagnose() {
  const [sensorData, setSensorData] = useState({});
  const [recommendation, setRecommendation] = useState("Waiting for data...");
  const [loadingRec, setLoadingRec] = useState(false);

  const recCalledRef = useRef(false); // ✅ to ensure only one call
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

  // ✅ Notification permission
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

  // ✅ Fetch sensor data every 5s
  useEffect(() => {
    let mounted = true;
    const fetchSensor = async () => {
      try {
        const res = await fetch("http://10.157.44.151:2713/sensor/latest");
        const data = await res.json();
        if (!mounted) return;
        if (data?.success) {
          const newData = data.data;

          // Alerts
          if (newData.rain === 1 && (sensorData.rain ?? 0) !== 1) {
            showNotification("🌧 बारिश अलर्ट", "तेज़ हवा और बारिश शुरू हो गई है, सामान संभाल लो।", rainSound);
          }
          if (newData.voltage > 5 && (sensorData.voltage ?? 0) <= 5) {
            showNotification("🌬 हवा अलर्ट", "तेज़ हवा चल रही है, सावधान रहें।", windSound);
          }
          if (newData.button === 1 && (sensorData.button ?? 0) !== 1) {
            showNotification("🚨 पशु अलर्ट", "पशु खेत में प्रवेश कर गए हैं, फसल बचाइए!", animalSound);
          }

          setSensorData(newData);

          // ✅ Gemini API call only once (when data first becomes valid)
          if (!recCalledRef.current) {
            const valid = newData.soilPH || newData.nitrogen || newData.phosphorus || newData.potassium;
            if (valid) {
              recCalledRef.current = true;
              callGeminiForRecommendation(newData);
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

  // ✅ Gemini API call
  const callGeminiForRecommendation = async (data) => {
    setLoadingRec(true);
    try {
      const prompt = `You are an expert Indian crop advisor. Based on the soil and environment data below, recommend exactly 3 suitable crops (short names), each with 1 short farmer-friendly sentence (in Hinglish). Also add a 1-line quick tip (Hindi/Hinglish) about soil correction if needed.
Data:
- Soil pH: ${data.soilPH}
- Nitrogen (N): ${data.nitrogen}
- Phosphorus (P): ${data.phosphorus}
- Potassium (K): ${data.potassium}
- Soil Moisture: ${data.soilMoist}
- Soil Temperature: ${data.soilTemp}
- Rain: ${data.rain}
- Pressure: ${data.pressure}
- Altitude: ${data.altitude}
- Light (LDR): ${data.ldr}
- Wind (voltage/windSpeed): ${data.voltage}

Keep the answer short, farmer-friendly, and in Hinglish.
Format: list of 3 crops with emojis, then short reasons and one-line tip.`;

      const body = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      setRecommendation(text?.trim() || "⚠️ Local Kisan Mitra se salah lo.");
    } catch (err) {
      console.error("Gemini fetch error:", err);
      setRecommendation("⚠️ Local Kisan Mitra se salah lo.");
    } finally {
      setLoadingRec(false);
    }
  };

  // ✅ UI
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
    { title: "वर्षा सूचना ☔वर्षा सूचना (Rain Alert) ☔", value: sensorData.rain === 1 ? "हाँ" : "नहीं", icon: <CloudRain className="w-7 h-7 text-sky-400" /> },
    { title: "प्रकाश तीव्रता (Light Intensity - LDR)", value: sensorData.ldr ?? unavailableText, icon: <Sun className="w-7 h-7 text-yellow-400" /> },
    { title: "तेज़ हवा / आंधी अलर्ट (Wind Alert) ⚡", value: sensorData.voltage ?? unavailableText, icon: <Wind className="w-7 h-7 text-indigo-400" /> },
    { title: "पशु चराई सूचना (Grazing Alert)", value: sensorData.button === 1 ? "हाँ" : "नहीं", icon: <AlertTriangle className="w-7 h-7 text-red-400" /> },
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
        {/* Title with Satellite */}
        <div className="relative z-10 p-8 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-400 drop-shadow-lg">
              🌾 खेत का लाइव निदान (Live Farm Diagnosis)
            </h1>
            <img
              src={satelliteImg}
              alt="Satellite"
              className="w-12 h-12 animate-bounce"
            />
          </div>
          <p className="text-sm text-gray-400 mt-2 italic">
            Connecting with Satellite...
          </p>
          <p className="text-lg text-emerald-200 mt-2">
            वास्तविक समय के सेंसर और पर्यावरण अलर्ट (Real-time Sensors & Environment Alerts)
          </p>
        </div>

      {/* Crop Sensors */}
      <div className="px-6">
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
      <div className="px-6 mt-10">
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
