import React from "react";
import { ReactTyped } from "react-typed";
import farmerImg from "../assets/farmer.png"; // तूने जो image save की है

function About() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex items-center justify-center px-8 py-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6">
            हमारे बारे में -{" "}
            <span className="text-yellow-700 drop-shadow-sm">KhetMitra</span> 🌾
          </h1>

          {/* Typing Tagline */}
          <div className="text-2xl md:text-3xl font-bold text-green-900 leading-relaxed mb-6 h-16">
            <ReactTyped
              strings={[
                "🌱 खेती को विज्ञान से जोड़ें",
                "🚜 हर किसान की मदद में आगे बढ़ें",
                "🌍 मिट्टी बताए सेहत का हाल",
                "🌡️ NPK, नमी और तापमान का कमाल",
                "⛈️ मौसम की खबर रहे आपके पास",
                "💚 KhetMitra बने खेती का विश्वास",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            <span className="font-semibold">KhetMitra</span> किसानों का डिजिटल
            साथी है। यहाँ आपको मिलती है मिट्टी की जाँच, स्मार्ट फसल सलाह,
            रोग पहचान और मौसम अलर्ट — ताकि आपकी मेहनत का हर दाना सोना बने। 🌾
          </p>

          {/* CTA Button */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105">
            खेतमित्र से जुड़ें 🚜
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={farmerImg}
            alt="Farmer Illustration"
            className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-green-200"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
