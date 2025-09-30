import React from "react";
import WeatherCard from "../components/WeatherCard";
import FarmSizeCard from "../components/FarmSizeCard";

export default function Dashboard() {
  const weather = { city: "Delhi", tempC: 34, desc: "Broken Clouds" };
  const farmSize = 5.2;

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        AI kheti, desh ki pragati
      </h1>

      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 320 }}>
          <WeatherCard weather={weather} />
        </div>

        <div>
          <FarmSizeCard size={farmSize} cropDefault="wheat" />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 360,
            height: 220,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            background: "linear-gradient(90deg, #f3f7f2, #eef5ef)",
          }}
        ></div>
      </div>
    </div>
  );
}
