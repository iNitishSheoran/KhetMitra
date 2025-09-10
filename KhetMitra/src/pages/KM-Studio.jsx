import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/GOf4givZqMI",
    title: "AI se Kisanon ki Madad",
    desc: "KhetMitra se kisanon ko market price aur farming tips ki sahaj jankari.",
  },
  {
    id: 2,
    url: "https://www.youtube.com/embed/9DaI8DzNF5k",
    title: "Beej se Bechne tak",
    desc: "AI ke sath kheti ka safar: Beej se lekar mandi tak ka safar ab aasaan.",
  },
  {
    id: 3,
    url: "https://www.youtube.com/embed/kIP0aOj3Zpk",
    title: "Mandi Price Update",
    desc: "Real-time mandi ke daam, ab KhetMitra se har kisan ke phone par.",
  },
  {
    id: 4,
    url: "https://www.youtube.com/embed/0tKzFhwvb9Q",
    title: "Smart Farming",
    desc: "AI se kheti aur bhi smart – samay aur fasal dono ki bachat.",
  },
];

export default function KMStudio() {
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-300 p-8 overflow-hidden">
      {/* Floating Farming Icons */}
      <motion.span
        className="absolute text-6xl left-10 top-20 opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        🚜
      </motion.span>
      <motion.span
        className="absolute text-5xl right-20 top-40 opacity-20"
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
            whileHover={{ scale: 1.07, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => setOpenVideo(video)}
          >
            {/* Thumbnail */}
            <div className="h-64 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center relative">
              <motion.div
                className="p-6 rounded-full bg-white/20 backdrop-blur-md border border-white shadow-lg"
                whileHover={{ scale: 1.2 }}
              >
                <Play size={56} className="text-white drop-shadow-lg" />
              </motion.div>
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
