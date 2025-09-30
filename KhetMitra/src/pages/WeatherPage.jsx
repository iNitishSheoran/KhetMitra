import React, { useEffect, useState } from "react";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "efcd381b82e9238378f622303354a388";
  const city = "Delhi";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const current = await currentRes.json();

        // 5-day / 3-hour forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const forecastData = await forecastRes.json();

        // Group daily
        const daily = {};
        forecastData.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!daily[date]) daily[date] = [];
          daily[date].push(item);
        });

        const processed = Object.entries(daily).map(([date, items]) => {
          const avg = (arr) =>
            Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
          const temps = items.map((i) => i.main.temp);
          const hums = items.map((i) => i.main.humidity);
          const winds = items.map((i) => i.wind.speed);
          const icon = items[0].weather[0].icon;
          const desc = items[0].weather[0].description;

          return {
            date,
            temp: avg(temps),
            humidity: avg(hums),
            wind: avg(winds),
            icon,
            desc,
          };
        });

        setWeather(current);
        setForecast(processed.slice(0, 7));
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl p-8">
        {/* 🌤 Current Weather */}
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Weather Dashboard ({weather.name})
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-green-50 p-6 rounded-2xl shadow-inner">
          {/* Left */}
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mx-auto w-20 h-20"
            />
            <h2 className="text-4xl font-extrabold text-green-700">
              {Math.round(weather.main.temp)}°C
            </h2>
            <p className="text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-sm text-gray-500">
              Feels like {Math.round(weather.main.feels_like)}°C
            </p>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              💧 <span className="font-semibold">{weather.main.humidity}%</span>
              <p className="text-gray-500 text-xs">Humidity</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              💨{" "}
              <span className="font-semibold">
                {(weather.wind.speed * 3.6).toFixed(1)} km/h
              </span>
              <p className="text-gray-500 text-xs">Wind Speed</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              🌡{" "}
              <span className="font-semibold">{weather.main.pressure} hPa</span>
              <p className="text-gray-500 text-xs">Pressure</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              ☀️ <span className="font-semibold">6</span>
              <p className="text-gray-500 text-xs">UV Index</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              🌅{" "}
              <span className="font-semibold">
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <p className="text-gray-500 text-xs">Sunrise</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              🌇{" "}
              <span className="font-semibold">
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <p className="text-gray-500 text-xs">Sunset</p>
            </div>
          </div>
        </div>

        {/* 📅 7-Day Forecast */}
        <h2 className="text-lg font-bold text-green-800 mt-8 mb-4">
          7-Day Forecast
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((day, i) => (
            <div
              key={i}
              className="bg-green-50 rounded-2xl p-4 text-center shadow hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-700">
                {new Date(day.date).toLocaleDateString("en-IN", {
                  weekday: "short",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.desc}
                className="mx-auto w-10 h-10"
              />
              <p className="text-green-700 font-bold text-lg">
                {day.temp}°C
              </p>
              <p className="text-xs capitalize text-gray-600">{day.desc}</p>
              <p className="text-[11px] text-gray-500 mt-1">
                💧 {day.humidity}% | 💨 {(day.wind * 3.6).toFixed(1)} km/h
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
