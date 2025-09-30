// src/components/WeatherWidget.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function WeatherWidget({ weather }) {
  const navigate = useNavigate();

  // 🧠 Agar data nahi aaya to null return
  if (!weather || weather.cod !== 200) {
    return (
      <div className="p-5 text-center bg-white/80 rounded-2xl shadow-md border">
        <p className="text-gray-500">Weather data not available 😞</p>
      </div>
    );
  }

  const { name, main, weather: w } = weather;
  const icon = w[0].icon;
  const desc = w[0].description;

  return (
    <div className="max-w-sm w-full mx-auto p-5 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md border border-gray-200 transition-all hover:scale-[1.02]">
      <div className="flex flex-col items-center">
        {/* 🏙 City */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>

        {/* 🌡 Temp */}
        <p className="text-4xl font-bold text-gray-900">
          {Math.round(main.temp)}°C
        </p>

        {/* ☁️ Description */}
        <p className="capitalize text-lg text-gray-600">{desc}</p>

        {/* 🖼 Icon */}
        <img
          className="w-16 h-16 mt-2"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />

        {/* 📅 Forecast button */}
        <button
          onClick={() => navigate("/forecast")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          7 Days Forecast
        </button>
      </div>
    </div>
  );
}
