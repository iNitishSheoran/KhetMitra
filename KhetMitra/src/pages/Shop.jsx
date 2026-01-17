import React, { useState } from "react";
import Navbar from "../components/Navbar";
import S1 from "../assets/S1.png";
import S2 from "../assets/S2.png";
import S3 from "../assets/S3.png";
import S4 from "../assets/S4.png";

function Shop() {
  const products = [
    { id: 1, name: "Fingerprint Signup Device", image: S1, price: 600, description: "Fingerprint-based signup module" },
    { id: 2, name: "NPK Sensor with OLED Display", image: S2, price: 2800, description: "Soil nutrient sensor with OLED" },
    { id: 3, name: "Soil Moisture Charger", image: S3, price: 480, description: "Device for soil moisture charging" },
    { id: 4, name: "NPK Sensor with App & Web Tracking", image: S4, price: 5000, description: "Tracks soil pH, pressure, altitude, moisture, N, P, K levels" },
  ];

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const addToCart = (product) => {
    setMessage("⚠️ Sorry! We're not accepting orders at the moment.");
    setTimeout(() => setMessage(""), 3000);
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mt-20 mb-8 text-center">Shop Our Devices</h1>

        {message && (
          <div className="mb-6 text-center text-red-600 font-semibold animate-pulse">{message}</div>
        )}

        {/* Products Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-2xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <h2 className="text-white font-semibold text-lg">{product.name}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold mb-3">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="mt-12 bg-white shadow-2xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.qty} × ₹{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4 font-bold text-lg">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg shadow-md transition duration-200">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;












// import Navbar from "../components/Navbar";
// import { Hammer, Heart, Sparkles } from "lucide-react";

// function Shop() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center text-center px-6 py-24">
//         {/* Icon */}
//         <div className="bg-emerald-600 text-white p-6 rounded-full shadow-xl mb-6 animate-pulse">
//           <Hammer className="w-12 h-12" />
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4">
//           🛒 Shop Coming Soon
//         </h1>

//         <p className="text-lg text-gray-700 max-w-xl mb-8">
//           Our Aloo is working very hard to set up the shop 🥔💪  
//           Devices are getting polished, packed, and prepared with care.
//         </p>

//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-emerald-200 p-8 max-w-md w-full">
//           <p className="text-emerald-700 font-semibold mb-3">
//             💚 From Team Aloo Intelligence
//           </p>

//           <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
//             <p className="text-emerald-800 font-medium">
//               “Please wait a little…
//             </p>
//             <p className="text-sm text-emerald-700">
//               We want everything to be perfect before opening the shop ✨”
//             </p>
//           </div>

//           <div className="mt-4 flex items-center justify-center gap-2 text-emerald-700 font-medium">
//             <Heart className="w-5 h-5" />
//             Built with care for farmers
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-10 flex items-center gap-2 text-emerald-800 font-medium">
//           <Sparkles className="w-5 h-5" />
//           Smart devices coming soon 🥔🚜
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Shop;
