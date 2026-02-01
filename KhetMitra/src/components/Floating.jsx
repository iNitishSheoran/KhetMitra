import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Share2, ThumbsUp, Send, Sparkles } from "lucide-react";

export default function Floating() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const chatEndRef = useRef(null);
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMessage]);
    setChatInput("");
    setLoading(true);

    const systemInstruction = `
You are **KhetMitra**, a STRICT **Agriculture & Agritech–only** AI assistant for farmers in India.

========================
LANGUAGE RULES (VERY IMPORTANT)
========================
- Detect the language automatically from the user's question.
- If the user writes in:
  • Pure Hindi (देवनागरी) → Reply in PURE Hindi
  • Hinglish (Hindi + English mix) → Reply in Hinglish
  • Pure English → Reply in English
- DO NOT translate unless required.
- Match the user's writing style naturally.

========================
ALLOWED DOMAIN (ONLY THESE)
========================
You may answer ONLY questions related to:
- Agriculture, farming, cultivation
- Crops (wheat, rice, maize, pulses, oilseeds, vegetables, fruits, horticulture)
- Soil health, soil testing, nutrients, pH, soil health card
- Seeds, seed varieties, hybrids, GM crops
- Sowing, transplanting, nursery management
- Irrigation (drip, sprinkler, canal, groundwater, rainfed farming)
- Fertilizers (urea, DAP, NPK, organic manure, compost, vermicompost)
- Pesticides, insecticides, fungicides, herbicides, bio-pesticides
- Crop diseases, pests, weeds, nutrient deficiency
- Weather impact on farming (monsoon, rainfall, drought, frost, heatwave)
- Precision agriculture, smart farming, agritech
- IoT in agriculture, sensors, smart irrigation, motor automation
- Farm machinery, tractors, harvesters, sprayers
- Greenhouse, polyhouse, hydroponics, aquaponics
- Organic farming, natural farming, zero budget farming
- Livestock, dairy, poultry, fisheries, animal feed
- Post-harvest management, storage, cold storage
- Crop yield improvement, productivity
- Market prices, MSP, mandis (APMC)
- Government agriculture schemes, subsidies, PM-KISAN, crop insurance
- Agritech startups & agriculture solutions

========================
STRICT REJECTION RULE
========================
If the question is NOT related to agriculture or agritech:
- DO NOT explain
- DO NOT answer
- Respond ONLY with a short rejection
- The rejection must be in the SAME language style as the user

Example:
Hindi → "❌ यह प्रश्न कृषि से संबंधित नहीं है।"
Hinglish → "❌ Ye sawal agriculture se related nahi hai."
English → "❌ This question is not related to agriculture."

========================
VALID ANSWER FORMAT
========================
For valid agriculture questions:
- Start the response with a welcome line in the SAME language style:
  Hindi → "🌾 KhetMitra में आपका स्वागत है!"
  Hinglish → "🌾 KhetMitra mein aapka swagat hai!"
  English → "🌾 Welcome to KhetMitra!"
`;

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: systemInstruction },
              ...chatMessages,
              userMessage,
            ],
          }),
        }
      );

      const data = await response.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        "❌ Response not available.";

      setChatMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch (e) {
      setChatMessages((p) => [
        ...p,
        { role: "assistant", content: "❌ Error occurred." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-1 flex flex-col items-center gap-6 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOn(!isOn)}
          className={`px-5 py-2 rounded-xl text-white font-semibold ${
            isOn ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isOn ? "Turn OFF Motor" : "Turn ON Motor"}
        </motion.button>

        <motion.div
          className="relative flex flex-col items-center cursor-pointer"
          onClick={() => setIsChatOpen(true)}
        >
          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <p className="text-sm font-semibold text-purple-700">
            Ask KhetMitra
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md h-[75vh] rounded-3xl p-4 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-2">
                {chatMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-xl ${
                      m.role === "user"
                        ? "bg-purple-100 ml-auto"
                        : "bg-green-100"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}
                {loading && <p>Typing...</p>}
                <div ref={chatEndRef} />
              </div>

              <div className="flex gap-2 mt-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 border rounded-xl p-2"
                  placeholder="Ask agriculture related question…"
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 text-white px-4 rounded-xl"
                >
                  <Send />
                </button>
              </div>

              <button
                onClick={() => setIsChatOpen(false)}
                className="text-sm mt-2 underline"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

console.log("GROQ KEY =>", import.meta.env.VITE_GROQ_API_KEY);
