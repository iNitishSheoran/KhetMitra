import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Banner1 from '../assets/Banner1.png';
import Banner2 from '../assets/Banner2.png';
// import CardContainer from '../components/CardContainer';
import Animation from '../assets/Animation.mp4'
// import Pros from './Pros';
// import About from "./About";
// import Footer from '../components/Footer';
// import FloatingActions from '../components/FloatingActions';
// import Highlights from '../components/Highlights';
// import FloatingFeedback from "../components/FloatingFeedback";
import { Link } from 'react-router-dom';
import Banner3 from '../assets/Banner3.png';
import Banner4 from '../assets/Banner4.png';


  const banners = [Banner1, Banner2, Banner3, Banner4];

 function Body() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Responsive Banner */}
      <div className="w-full mt-[3.10rem] relative overflow-hidden">
        {/* Maintain 1900x300 ratio = 6.33:1 => Use padding-bottom trick */}
        <div className="relative w-full aspect-[19/3] sm:aspect-[19/3] md:h-[180px] lg:h-[225px] xl:h-[225px] overflow-hidden">
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
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-[3rem] pb-[8rem] gap-12 bg-[#edf2fe]">
          {/* Tagline */}
<div className="max-w-[600px]">
  {/* ✅ Visitor Counter (above heading, inside light bg)
  <div className="mb-4">
    <a href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
      <img
        src="https://hitwebcounter.com/counter/counter.php?page=21136147&style=0050&nbdigits=6&type=page&initCount=1000"
        title="Visitor Counter"
        alt="Visit counter For Websites"
        style={{ border: "0" }}
      />
    </a>
  </div> */}

  <h1 className="text-4xl font-extrabold leading-snug text-[#14213d]">
  जब <span className="text-red-500">Topic</span> हो Weak, <span className="text-red-500">Docengo </span>करे ठीक!
  </h1>
            <p className="text-lg text-gray-600 mt-4">
            Your pace. Your topic. Your mentor - That's Docengo.
            </p>
            {/* <Link to="/batches"> */}
            <button className="mt-6 bg-gradient-to-r from-red-500 to-[#14213d] hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
            onClick={() =>
              window.open(
                "https://wa.me/918882153238?text=Hi%2C%20I'm%20interested%20in%20FREE%20Demo%20Session",
                "_blank"
              )
            }
            >
            Book a Free Demo Session ⭐️
            </button>
            {/* </Link> */}


          </div>

          {/* Animation Video */}
          <div className="max-w-[600px] w-full">
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
        <div className=' -mt-[9rem]'>
          {/* <Highlights className="bg-white" /> */}
        </div>
      </div>
      

      {/* Cards Section */}
      {/* <CardContainer /> */}
      {/* <FloatingActions /> */}
      {/* <FloatingFeedback /> */}
      {/* <Pros /> */}
      {/* <About />
      <Footer /> */}
    </div>
  );
}

export default Body;