import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const API_KEY = "579b464db66ec23bdd000001cce051d55c5546f641caf1d798e209b3";
const BASE_URL =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

export default function MandiPriceApp() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000`)
      .then((res) => res.json())
      .then((res) => {
        const uniqueStates = [...new Set(res.records.map((item) => item.state))].sort();
        setStates(uniqueStates);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load states. Please try again.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}`
      )
        .then((res) => res.json())
        .then((res) => {
          const uniqueDistricts = [...new Set(res.records.map((item) => item.district))].sort();
          setDistricts(uniqueDistricts);
          setSelectedDistrict("");
          setCommodities([]);
          setSelectedCommodity("");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load districts. Please try again.");
          setLoading(false);
        });
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      setLoading(true);
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}&filters[district]=${encodeURIComponent(selectedDistrict)}`
      )
        .then((res) => res.json())
        .then((res) => {
          const uniqueCommodities = [...new Set(res.records.map((item) => item.commodity))].sort();
          setCommodities(uniqueCommodities);
          setSelectedCommodity("");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load commodities. Please try again.");
          setLoading(false);
        });
    } else {
      setCommodities([]);
      setSelectedCommodity("");
    }
  }, [selectedDistrict]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selectedState && selectedDistrict && selectedCommodity) {
      setLoading(true);
      setError("");
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}&filters[district]=${encodeURIComponent(
          selectedDistrict
        )}&filters[commodity]=${encodeURIComponent(selectedCommodity)}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.records || []);
          if (!res.records || res.records.length === 0) {
            setError("No data available for the selected combination.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch data. Please try again.");
          setLoading(false);
        });
    } else {
      setError("Please select State, District, and Commodity first!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f0a] via-[#112011] to-[#0b120b] text-white font-sans pt-[110px] p-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#142614] via-[#1e331e] to-[#173017] shadow-2xl rounded-3xl p-8 border border-green-500/30">
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-green-300 drop-shadow-lg">
            🌾 India Mandi Price Finder
          </h1>

          {error && submitted && (
            <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6 text-center font-semibold shadow-md">
              ⚠️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* State */}
            <div>
              <label className="block mb-2 font-semibold text-green-300">
                Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border border-green-500/50 rounded-xl bg-[#102210] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition hover:border-emerald-400"
              >
                <option value="">-- Select State --</option>
                {states.map((st, idx) => (
                  <option key={idx} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block mb-2 font-semibold text-green-300">
                Select District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
                className="w-full p-3 border border-green-500/50 rounded-xl bg-[#102210] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition hover:border-emerald-400 disabled:bg-[#0b100b] disabled:text-gray-400"
              >
                <option value="">-- Select District --</option>
                {districts.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Commodity */}
            <div>
              <label className="block mb-2 font-semibold text-green-300">
                Select Commodity
              </label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                disabled={!selectedDistrict}
                className="w-full p-3 border border-green-500/50 rounded-xl bg-[#102210] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition hover:border-emerald-400 disabled:bg-[#0b100b] disabled:text-gray-400"
              >
                <option value="">-- Select Commodity --</option>
                {commodities.map((com, idx) => (
                  <option key={idx} value={com}>
                    {com}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-300 text-[#0a0f0a] px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition disabled:opacity-60"
            >
              {loading ? "Loading..." : "Show Prices"}
            </button>
          </div>

          {/* Results Table */}
          {data.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-300">Results:</h2>
              <table className="min-w-full bg-[#102210] border border-green-600/40 rounded-2xl shadow-md">
                <thead className="bg-[#1a301a] text-green-200">
                  <tr>
                    {[
                      "Market",
                      "Commodity",
                      "Variety",
                      "Min Price",
                      "Max Price",
                      "Modal Price",
                      "Date",
                    ].map((head, idx) => (
                      <th
                        key={idx}
                        className="border px-4 py-2 text-left font-semibold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-[#234023] transition cursor-pointer"
                    >
                      <td className="border px-4 py-2">{item.market}</td>
                      <td className="border px-4 py-2">{item.commodity}</td>
                      <td className="border px-4 py-2">{item.variety}</td>
                      <td className="border px-4 py-2">{item.min_price}</td>
                      <td className="border px-4 py-2">{item.max_price}</td>
                      <td className="border px-4 py-2">{item.modal_price}</td>
                      <td className="border px-4 py-2">{item.arrival_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* No data message */}
          {submitted && data.length === 0 && !error && !loading && (
            <p className="mt-6 text-green-300 font-semibold text-center">
              ⚠️ No data available for the selected combination.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
