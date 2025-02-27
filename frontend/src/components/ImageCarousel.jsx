import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import authImageLight from "../assets/authImageLight.png";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";

const ImageCarousel = () => {
  const slides = [authImageLight, image1, image2, image3];
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval); 
  }, [curr]); 

  return (
    <div className="w-full h-screen hidden lg:block relative">
      <div className="w-full h-full">
        <img
          key={curr}
          src={slides[curr]}
          alt="Slider Images"
          className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button onClick={prev} className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white">
            <ChevronLeft size={40} />
          </button>
          <button onClick={next} className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white">
            <ChevronRight size={40} />
          </button>
        </div>
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
