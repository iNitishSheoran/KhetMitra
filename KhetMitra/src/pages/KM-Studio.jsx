import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const videos = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/GOf4givZqMI",
    thumb: "https://img.youtube.com/vi/GOf4givZqMI/hqdefault.jpg",
    title: "AI se Kisanon ki Madad",
    desc: "KhetMitra se kisanon ko market price aur farming tips ki sahaj jankari.",
  },
  {
    id: 2,
    url: "https://www.youtube.com/embed/9DaI8DzNF5k",
    thumb: "https://img.youtube.com/vi/9DaI8DzNF5k/hqdefault.jpg",
    title: "Beej se Bechne tak",
    desc: "AI ke sath kheti ka safar: Beej se lekar mandi tak ka safar ab aasaan.",
  },
  {
    id: 3,
    url: "https://www.youtube.com/embed/kIP0aOj3Zpk",
    thumb: "https://img.youtube.com/vi/kIP0aOj3Zpk/hqdefault.jpg",
    title: "Mandi Price Update",
    desc: "Real-time mandi ke daam, ab KhetMitra se har kisan ke phone par.",
  },
  {
    id: 4,
    url: "https://www.youtube.com/embed/0tKzFhwvb9Q",
    thumb: "https://img.youtube.com/vi/0tKzFhwvb9Q/hqdefault.jpg",
    title: "Smart Farming",
    desc: "AI se kheti aur bhi smart – samay aur fasal dono ki bachat.",
  },
  {
    id: 5,
    url: "https://www.youtube.com/embed/SUCvZeeMRSA",
    thumb: "https://img.youtube.com/vi/SUCvZeeMRSA/hqdefault.jpg",
    title: "Shorts 1",
    desc: "AI powered farming innovations – Shorts version.",
  },
  {
    id: 6,
    url: "https://www.youtube.com/embed/l_GU2tItZZk",
    thumb: "https://img.youtube.com/vi/l_GU2tItZZk/hqdefault.jpg",
    title: "Shorts 2",
    desc: "Mandi prices & insights in 60 seconds.",
  },
  {
    id: 7,
    url: "https://www.youtube.com/embed/HcwnO8Dsdv8",
    thumb: "https://img.youtube.com/vi/HcwnO8Dsdv8/hqdefault.jpg",
    title: "Shorts 3",
    desc: "Quick tips for smart farming.",
  },
  {
    id: 8,
    url: "https://www.youtube.com/embed/K4jBRxo7RuI",
    thumb: "https://img.youtube.com/vi/K4jBRxo7RuI/hqdefault.jpg",
    title: "Shorts 4",
    desc: "AI + Kisan = Future farming revolution.",
  },
];

export default function KMStudio() {
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-300 overflow-hidden">
      <Navbar />

      {/* Navbar ke niche thoda space */}
      <div className="pt-28 px-8">
        {/* Floating Farming Icons */}
        <motion.span
          className="absolute text-6xl left-10 top-32 opacity-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          🚜
        </motion.span>
        <motion.span
          className="absolute text-5xl right-20 top-48 opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          🌾
        </motion.span>
        <motion.span
          className="absolute text-6xl left-1/2 bottom-20 opacity-20"
          animate={{ y: [0, 25, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
        >
          🌱
        </motion.span>

        <h1 className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 drop-shadow-lg">
          🌾 KhetMitra – AI se Kisanon ki Shakti 🌱
        </h1>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="relative bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden group cursor-pointer border border-green-200"
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setOpenVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={video.thumb}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.div
                    className="p-6 rounded-full bg-white/30 backdrop-blur-md border border-white shadow-lg"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
                <span className="absolute bottom-3 right-3 text-xs bg-green-800 text-white px-3 py-1 rounded-full shadow-md">
                  Tap to Play
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-2xl font-bold text-green-900 drop-shadow-sm">
                  {video.title}
                </h2>
                <p className="text-green-700 mt-2">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {openVideo && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className="relative">
              <iframe
                src={`${openVideo.url}?autoplay=1`}
                title="YouTube video player"
                className="w-full h-[420px] md:h-[540px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setOpenVideo(null)}
                className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-lg"
              >
                ✖ Close
              </button>
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-bold text-green-900">
                {openVideo.title}
              </h2>
              <p className="text-green-700 mt-2">{openVideo.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
