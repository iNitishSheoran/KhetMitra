import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = "Delhi"; // You can make this dynamic later

export default function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Step 1: Get coordinates from city name
        const cityRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const cityData = await cityRes.json();
        if (!cityRes.ok) throw new Error(cityData.message);

        const { lat, lon } = cityData.coord;

        // Step 2: Get full forecast using One Call API 3.0
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { data, loading, error };
}
