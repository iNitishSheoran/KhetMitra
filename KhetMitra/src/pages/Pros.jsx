import React from "react";
import K1 from "../assets/K1.png";
import K2 from "../assets/K2.png";
import K3 from "../assets/K3.png";
import K4 from "../assets/K4.png";
import K5 from "../assets/K5.png";
import K6 from "../assets/K6.png";

const features = [
  {
    id: 1,
    icon: "🧪",
    title: "मिट्टी का pH जाँच",
    desc: "खेत की मिट्टी का सही pH जानकर तय करें कौन सी फ़सल सबसे उपजाऊ होगी। समय रहते सही सुधार करें और उत्पादन बढ़ाएँ।",
    img: K1,
  },
  {
    id: 2,
    icon: "💧",
    title: "तापमान और नमी निगरानी",
    desc: "सेंसर आधारित AI आपके खेत की नमी और तापमान पर नज़र रखेगा, ताकि सिंचाई और बोवाई सही समय पर हो सके।",
    img: K2,
  },
  {
    id: 3,
    icon: "🌱",
    title: "NPK पोषक तत्व जाँच",
    desc: "मिट्टी में नाइट्रोजन, फॉस्फोरस और पोटैशियम स्तर की जाँच कर फसल को ज़रूरी खाद की सटीक सलाह।",
    img: K3,
  },
  {
    id: 4,
    icon: "☀️",
    title: "UV किरणें व पशु चराई अलर्ट",
    desc: "तेज़ धूप, UV किरणें या जानवरों द्वारा चराई का तुरंत नोटिफिकेशन — खेत की सुरक्षा अब आपके मोबाइल पर।",
    img: K4,
  },
  {
    id: 5,
    icon: "🌪️",
    title: "आंधी, तूफ़ान और बारिश चेतावनी",
    desc: "मौसम की रीयल-टाइम जानकारी — तेज़ हवाओं, आंधी या बारिश से पहले अलर्ट पाकर फसल बचाएँ।",
    img: K5,
  },
  {
    id: 6,
    icon: "🤖",
    title: "AI सलाह और सिफ़ारिशें",
    desc: "फसल चयन से लेकर रोग नियंत्रण तक — AI आपके खेत का स्मार्ट साथी है, जो हर कदम पर सही सुझाव देता है।",
    img: K6,
  },
];

function Pros() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 py-16 px-6 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
        क्यों चुनें <span className="text-green-600">KhetMitra? 🌾</span>
      </h2>
      <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-12">
        आधुनिक खेती के लिए स्मार्ट AI टूल्स, सही समय पर जानकारी और किसानों का भरोसेमंद साथी।
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((f) => (
          <div
            key={f.id}
            className="shadow-xl rounded-2xl border border-green-200 hover:shadow-2xl transition transform hover:-translate-y-2 bg-white"
          >
            <div className="p-8 text-center">
              <img src={f.img} alt={f.title} className="h-24 w-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl">{f.icon}</span> {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pros;
