import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch(`${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000`)
      .then((res) => res.json())
      .then((res) => {
        const uniqueStates = [
          ...new Set(res.records.map((item) => item.state)),
        ].sort();
        setStates(uniqueStates);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}`
      )
        .then((res) => res.json())
        .then((res) => {
          const uniqueDistricts = [
            ...new Set(res.records.map((item) => item.district)),
          ].sort();
          setDistricts(uniqueDistricts);
          setSelectedDistrict("");
          setCommodities([]);
          setSelectedCommodity("");
        })
        .catch((err) => console.error(err));
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}&filters[district]=${encodeURIComponent(selectedDistrict)}`
      )
        .then((res) => res.json())
        .then((res) => {
          const uniqueCommodities = [
            ...new Set(res.records.map((item) => item.commodity)),
          ].sort();
          setCommodities(uniqueCommodities);
          setSelectedCommodity("");
        })
        .catch((err) => console.error(err));
    } else {
      setCommodities([]);
      setSelectedCommodity("");
    }
  }, [selectedDistrict]);

  const handleSubmit = () => {
    if (selectedState && selectedDistrict && selectedCommodity) {
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
        })
        .catch((err) => console.error(err));
    } else {
      alert("Please select State, District, and Commodity first!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700">
          📊 India Mandi Price Finder
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* State */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
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
            <label className="block mb-2 font-semibold text-gray-700">
              Select District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition disabled:bg-gray-100"
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
            <label className="block mb-2 font-semibold text-gray-700">
              Select Commodity
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition disabled:bg-gray-100"
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
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold shadow-md transition"
          >
            Show Prices
          </button>
        </div>

        {/* Results */}
        {data.length > 0 && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Results:
            </h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-green-100">
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
                      className="border px-4 py-2 text-left text-gray-700 font-semibold"
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
                    className="hover:bg-green-50 transition cursor-pointer"
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

        {selectedCommodity && data.length === 0 && (
          <p className="mt-6 text-red-500 font-semibold text-center">
            ⚠️ No data available
          </p>
        )}
      </div>
    </div>
  );
}
