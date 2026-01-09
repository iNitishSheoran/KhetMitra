import React from "react";
import { useNavigate } from "react-router-dom";

export default function WeatherWidget({ weather }) {
  const navigate = useNavigate();

  if (!weather) {
    return (
      <div className="p-5 text-center bg-white rounded-xl shadow">
        Weather data not available 😞
      </div>
    );
  }

  const icon = weather.weather[0].icon;

  return (
    <div className="max-w-sm mx-auto p-5 rounded-2xl shadow bg-white">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">{weather.name}</h2>
        <p className="text-4xl font-bold">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="capitalize text-gray-600">
          {weather.weather[0].description}
        </p>

        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon"
        />

        <button
          onClick={() => navigate("/weather")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          7 Days Forecast
        </button>
      </div>
    </div>
  );
}
