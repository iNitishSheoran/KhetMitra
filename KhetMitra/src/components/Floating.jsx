import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Share2, ThumbsUp, Star } from "lucide-react";

function Floating() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert(
      `🙏 धन्यवाद ${name || "Farmer"}!\nFeedback: ${feedback}\nRating: ${rating}⭐`
    );
    setName("");
    setFeedback("");
    setRating(0);
    setIsOpen(false);
  };

  const handleCall = () => {
    window.location.href = "tel:+917988100765";
  };

  const handleShare = () => {
    const text = encodeURIComponent("🌱 किसान मित्र, मेरी खेती के अनुभव को देखें!");
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-6 z-50">
        {/* AI Icon */}
        <motion.div
          className="relative flex flex-col items-center cursor-pointer z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() =>
            window.open(
              "https://huggingface.co/spaces/sangal-aarushi/KhetMitraAI",
              "_blank"
            )
          }
        >
          {/* Glowing Rings - won't block clicks */}
          <span className="pointer-events-none absolute w-20 h-20 rounded-2xl border-4 border-purple-500 opacity-40 animate-ping" />
          <span className="pointer-events-none absolute w-28 h-28 rounded-2xl border-4 border-purple-400 opacity-30 animate-ping [animation-delay:0.6s]" />
          <span className="pointer-events-none absolute w-36 h-36 rounded-2xl border-4 border-purple-300 opacity-20 animate-ping [animation-delay:1.2s]" />

          {/* Brain Icon */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-9 h-9"
            >
              <path d="M9 2a3 3 0 0 0-3 3v2.5a2.5 2.5 0 0 0 0 5V14a3 3 0 0 0 3 3v4a3 3 0 0 0 3 3h.5V2H12a3 3 0 0 0-3-3zm6 0a3 3 0 0 1 3 3v2.5a2.5 2.5 0 0 1 0 5V14a3 3 0 0 1-3 3v4a3 3 0 0 1-3 3h-.5V2H12a3 3 0 0 1 3-3z" />
            </svg>
          </div>
          <p className="mt-2 text-sm font-semibold text-purple-700 text-center">
            KhetMitra AI
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCall}
            className="w-14 h-14 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg hover:bg-yellow-600 transition"
          >
            <Phone className="text-white w-6 h-6" />
          </button>

          <button
            onClick={handleShare}
            className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center shadow-lg hover:bg-blue-800 transition"
          >
            <Share2 className="text-white w-6 h-6" />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center shadow-lg hover:bg-green-800 transition"
          >
            <ThumbsUp className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
              <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
                🌾 अपनी राय साझा करें
              </h2>

              <div className="flex flex-col gap-4">
                {/* Name Input */}
                <input
                  type="text"
                  placeholder="आपका नाम"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Feedback Input */}
                <textarea
                  placeholder="अपनी राय लिखें..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                />

                {/* Rating */}
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 cursor-pointer transition ${
                        rating >= star
                          ? "fill-green-600 text-green-600"
                          : "text-gray-400 hover:text-green-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-green-600 transition"
                >
                  ✅ Submit Feedback
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-gray-600 font-medium py-2 hover:underline"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Floating;
