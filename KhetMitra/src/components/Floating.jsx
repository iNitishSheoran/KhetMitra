import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Share2, ThumbsUp, Star } from "lucide-react";

function Floating() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert(`🙏 धन्यवाद ${name || "Farmer"}!\nFeedback: ${feedback}\nRating: ${rating}⭐`);
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
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* Call Button */}
        <button
          onClick={handleCall}
          className="w-14 h-14 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg hover:bg-yellow-600 transition"
        >
          <Phone className="text-white w-6 h-6" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center shadow-lg hover:bg-blue-800 transition"
        >
          <Share2 className="text-white w-6 h-6" />
        </button>

        {/* Feedback Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition"
        >
          <ThumbsUp className="text-white w-6 h-6" />
        </button>
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
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
              <h2 className="text-2xl font-bold text-green-800 text-center mb-4">
                🌾 अपनी राय साझा करें
              </h2>

              {/* Name Input */}
              <input
                type="text"
                placeholder="आपका नाम"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Feedback Input */}
              <textarea
                placeholder="अपनी राय लिखें..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
              />

              {/* Rating */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-7 h-7 cursor-pointer ${
                      rating >= star ? "fill-green-600 text-green-600" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
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
