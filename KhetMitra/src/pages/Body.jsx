import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Banner1 from '../assets/Banner1.png';
import Banner2 from '../assets/Banner2.png';
import Animation from '../assets/Animation.mp4';
import { Link } from 'react-router-dom';
import Banner3 from '../assets/Banner3.png';
import Banner4 from '../assets/Banner4.png';
import Highlights from '../components/Highlights';
import About from './About';
import Pros from './Pros';
import Marketing from './Marketing';
import Floating from '../components/Floating';
import Diagnose from './Diagnose';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const banners = [Banner1, Banner2, Banner3, Banner4];

function Body() {
  const [currentBanner, setCurrentBanner] = useState(0);

  // ✅ Add state to control floating feedback
  const [openFeedback, setOpenFeedback] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">   {/* ✅ Full width */}
    <Navbar/>

      {/* Responsive Banner */}
      <div className="w-full mt-[5.1rem] relative">
        <div className="relative w-full aspect-[19/3] sm:aspect-[19/3] md:h-[180px] lg:h-[225px] xl:h-[225px] ">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentBanner}
              src={banners[currentBanner]}
              alt={`Docengo Banner ${currentBanner + 1}`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Tagline + Animation Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-[3rem] pb-[8rem] gap-12 bg-[#e3efe6] w-full">
          {/* Tagline */}
          <div className="w-full lg:w-1/2 ml-20 px-6 lg:px-12">
            <h1 className="text-4xl font-extrabold leading-snug text-[#14213d]">
              <span className="text-red-500">AI</span> <span className="text-green-800">kheti 🌾</span>, <span className="text-red-500">desh </span> ki pragati
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              मिट्टी से मंडी तक – हर कदम पर आपके साथ – खेतमित्र।
            </p>
            <button
              className="mt-6 bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 
               transition duration-300 transform hover:scale-105 text-white font-semibold px-8 py-3 
               rounded-full shadow-md"
              onClick={() =>
                window.open(
                  "https://wa.me/917988100765?text=नमस्ते%2C%20मुझे%20आज%20ही%20AI%20से%20फ़सल%20सुझाव%20चाहिए।",
                  "_blank"
                )
              }
            >
              🌱 आज ही फ़सल सुझाव लें
            </button>
          </div>

          {/* Animation Video */}
          <div className="w-full lg:w-1/2 mr-24 px-6 lg:px-12">
            <video
              src={Animation}
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="-mt-[9rem]">
          <Highlights className="bg-white" />
        </div>
        <Diagnose/>
        <Marketing />
        <Pros />
        <About />

        {/* ✅ Floating Feedback Button */}
        {/* <button
          onClick={() => setOpenFeedback(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 z-50"
        >
          🌾 Feedback
        </button> */}

        {/* ✅ Floating Feedback Modal */}
        <Floating isOpen={openFeedback} onClose={() => setOpenFeedback(false)} />

        <Footer />
      </div>
    </div>
  );
}

export default Body;
