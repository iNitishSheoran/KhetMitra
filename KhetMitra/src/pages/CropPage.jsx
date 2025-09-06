import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function CropPage() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all crop names
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/crop/all`, { withCredentials: true });
        setCrops(res.data.crops);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch crops");
      }
    };
    fetchCrops();
  }, []);

  // Fetch crop + cultivation details
  useEffect(() => {
    if (!selectedCrop) return;

    const fetchCropDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/crop/details/${encodeURIComponent(selectedCrop)}`,
          { withCredentials: true }
        );
        // Smooth transition: only replace data after loading
        setTimeout(() => {
          setCropDetails(res.data.crop);
          setLoading(false);
        }, 300); // optional delay for smooth fade
      } catch (err) {
        console.error(err);
        alert("Crop data not found");
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [selectedCrop]);

  const renderObject = (obj) => (
    <ul className="ml-5 list-disc">
      {Object.entries(obj).map(([key, value]) => (
        <li key={key}>
          <strong>{key.replace(/_/g, " ")}:</strong>{" "}
          {Array.isArray(value)
            ? value.join(" – ")
            : typeof value === "object"
            ? renderObject(value)
            : value}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20 relative">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Crop Details and Cultivation Steps</h1>

      {/* Dropdown */}
      <select
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
        className="w-full p-2 border border-green-500 rounded mb-6"
      >
        <option value="">-- Select a Crop --</option>
        {crops.map((crop) => (
          <option key={crop._id} value={crop.name || crop.name_en}>
            {crop.name || crop.name_en}
          </option>
        ))}
      </select>

      {/* Crop & Cultivation Details */}
      {cropDetails && (
        <div className="p-4 border rounded shadow bg-green-50 space-y-4 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <p className="text-gray-500 text-lg">Loading...</p>
            </div>
          )}

          {/* Crop Names */}
          <h2 className="text-2xl font-semibold text-green-800">
            {cropDetails.name_hi || cropDetails.name_en || cropDetails.name}
          </h2>

          {/* Crop Model Data */}
          {cropDetails.npk && (
            <div>
              <h3 className="font-semibold text-green-700 mb-1">Crop Details:</h3>
              <ul className="ml-5 list-disc">
                {Object.entries(cropDetails.npk).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key.toUpperCase()}:</strong> {Array.isArray(val) ? val.join(" – ") : val}
                  </li>
                ))}
                {cropDetails.temperature_c && <li><strong>Temperature °C:</strong> {cropDetails.temperature_c.join(" – ")}</li>}
                {cropDetails.humidity_percent && <li><strong>Humidity %:</strong> {cropDetails.humidity_percent.join(" – ")}</li>}
                {cropDetails.soil_moisture_percent && <li><strong>Soil Moisture %:</strong> {cropDetails.soil_moisture_percent.join(" – ")}</li>}
                {cropDetails.ph && <li><strong>pH:</strong> {cropDetails.ph.join(" – ")}</li>}
                {cropDetails.ec_ds_m && <li><strong>EC dS/m:</strong> {cropDetails.ec_ds_m.join(" – ")}</li>}
                {cropDetails.notes && <li><strong>Notes:</strong> {cropDetails.notes}</li>}
              </ul>
            </div>
          )}

          {/* Cultivation Model Data */}
          <div>
            <h3 className="font-semibold text-green-700 mb-1">Cultivation Steps:</h3>

            {["season", "soil", "sowing_window", "irrigation_schedule", "weed_control", "pest_disease_management", "harvest_and_postharvest"].map(field =>
              cropDetails[field] ? (
                <p key={field}>
                  <strong>{field.replace(/_/g, " ").toUpperCase()}:</strong> {cropDetails[field]}
                </p>
              ) : null
            )}

            {cropDetails.seed_nursery && (
              <div>
                <h4 className="font-semibold text-green-600 mb-1">Seed / Nursery Info:</h4>
                {renderObject(cropDetails.seed_nursery)}
              </div>
            )}

            {cropDetails.fertilizer_NPK_kg_per_ha && (
              <div>
                <h4 className="font-semibold text-green-600 mb-1">Fertilizer (kg/ha):</h4>
                {renderObject(cropDetails.fertilizer_NPK_kg_per_ha)}
              </div>
            )}

            {cropDetails.timeline_months && (
              <div>
                <h4 className="font-semibold text-green-600 mb-1">Timeline:</h4>
                {renderObject(cropDetails.timeline_months)}
              </div>
            )}

            {cropDetails.detailed_steps_en?.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-1">Cultivation Steps (EN):</h4>
                <ol className="list-decimal ml-5">
                  {cropDetails.detailed_steps_en.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>
              </div>
            )}
            {cropDetails.detailed_steps_hi?.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-1">कृषि चरण (HI):</h4>
                <ol className="list-decimal ml-5">
                  {cropDetails.detailed_steps_hi.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>
              </div>
            )}

            {cropDetails.sources?.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-1">Sources:</h4>
                <ul className="ml-5 list-disc">
                  {cropDetails.sources.map((src, i) => <li key={i}>{src}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
