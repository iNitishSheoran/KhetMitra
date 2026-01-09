import { useEffect, useState } from "react";

const API_KEY = "efcd381b82e9238378f622303354a388";

export default function useWeatherByLocation() {
  const [data, setData] = useState(null);
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        console.log("LAT:", lat, "LON:", lon);

        // 🔥 One Call API (BEST ACCURACY)
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
          { cache: "no-store" }
        );
        const weatherJson = await weatherRes.json();

        // Reverse Geocoding (Exact area name)
        const placeRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
          { cache: "no-store" }
        );
        const placeJson = await placeRes.json();

        setData(weatherJson.current);
        setPlace(
          placeJson?.[0]?.name +
            (placeJson?.[0]?.state ? ", " + placeJson[0].state : "")
        );
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  }, []);

  return { data, place, loading };
}
