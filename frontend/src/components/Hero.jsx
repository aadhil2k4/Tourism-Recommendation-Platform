import { Navigation } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../assets/HeroImage.svg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background z-20" />

      {/* Background SVG - resized */}
      <div className="absolute inset-0 -z-5">
        <img 
          src={heroImage}
          alt="Hero Image" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Radial background layer */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background/80 to-background" />

      {/* Foreground content */}
      <div className="container mx-auto px-6 relative z-30 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navigation className="w-16 h-16 mx-auto mb-8 text-primary" />
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        >
          Discover Your Perfect Journey
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-bold"
        >
          Experience personalized travel recommendations powered by AI, explore over 1000+ destinations, and plan your dream vacation with local insights.
        </motion.p>
        <button className="btn btn-primary" onClick={() => navigate("/signup")}>Try Now</button>
      </div>
    </section>
  );
};

export default Hero;
