import React from "react";

export default function WeatherCard({ weather }) {
  const containerStyle = {
    background: "#fff",
    borderRadius: 12,
    padding: 22,
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    minWidth: 280,
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700 }}>{weather.city}</div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            margin: "8px 0",
          }}
        >
          {weather.tempC}°C
        </div>
        <div style={{ color: "#666" }}>{weather.desc}</div>
        <div style={{ marginTop: 18 }}>
          <button
            style={{
              background: "#27a844",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            7 Days Forecast
          </button>
        </div>
      </div>
    </div>
  );
}
