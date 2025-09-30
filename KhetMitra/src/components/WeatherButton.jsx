import React from "react";
import { Link } from "react-router-dom";
import useWeather from "../hooks/useWeather";

export default function WeatherButton() {
  const { data, loading } = useWeather();
  const temp = data?.current ? Math.round(data.current.temp) : "--";
  const desc = data?.current?.weather?.[0]?.main || "";

  return (
    <Link
      to="/weather"
      style={{
        backgroundColor: "#2d6a4f",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "25px",
        textDecoration: "none",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      🌤 {loading ? "Loading..." : `${temp}°C, ${desc}`}
    </Link>
  );
}
