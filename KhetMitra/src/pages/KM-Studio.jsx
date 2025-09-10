import React from "react";
import { Tractor, Sprout, Wheat, Store } from "lucide-react";
import Navbar from "../components/Navbar";

const videos = [
  {
    src: "/S1.mp4",
    title: "AI se Farming Guidance",
    desc: "KhetMitra farmers ko AI ke zariye behtareen sujhaav deta hai.",
    icon: <Tractor className="w-8 h-8 text-green-400" />,
  },
  {
    src: "/S2.mp4",
    title: "Market Price Support",
    desc: "KhetMitra mandi daam realtime dikhata hai aur behtar faisle lene me madad karta hai.",
    icon: <Store className="w-8 h-8 text-yellow-400" />,
  },
  {
    src: "/S3.mp4",
    title: "Beej se Bechne Tak",
    desc: "KhetMitra farmer ke pure safar me sath deta hai — beej se lekar bazaar tak.",
    icon: <Sprout className="w-8 h-8 text-emerald-400" />,
  },
  {
    src: "/S4.mp4",
    title: "Digital Farming Future",
    desc: "AI aur data ke sath, farming aur bhi smart aur aasaan ban rahi hai.",
    icon: <Wheat className="w-8 h-8 text-orange-400" />,
  },
];

export default function KMStudio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1F1B] via-[#1B4332] to-[#081C15] text-white pt-28 pb-16 px-6">
      <Navbar/>
      {/* Page Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#4ADE80]">
          🎬 KM-Studio
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          Farmers ke liye ek digital safar — <span className="text-[#FFD95A]">AI aur technology</span> ke sath.  
          KhetMitra unke beej se bazaar tak ka saathi hai.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg bg-black"
          >
            {/* Video */}
            <video
              src={video.src}
              controls
              className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5">
              <div className="flex items-center space-x-3 mb-2">
                {video.icon}
                <h2 className="text-xl font-bold">{video.title}</h2>
              </div>
              <p className="text-gray-300 text-sm">{video.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing Note */}
      <div className="text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#FFD95A]">
          🌱 KhetMitra — Har Kisaan ka Digital Saathi 🌱
        </h2>
        <p className="text-gray-300 mt-3">
          Technology aur AI ke sath, farming ko banaye smart, sustainable aur profitable.
        </p>
      </div>
    </div>
  );
}