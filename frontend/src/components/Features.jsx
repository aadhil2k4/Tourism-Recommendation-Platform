import { Map, Compass, Newspaper, Star, Building2, Brain } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI Trip Planner",
      description: "Get personalized itineraries crafted by advanced AI based on your preferences and travel style."
    },
    {
      icon: <Map className="w-8 h-8 text-primary" />,
      title: "Interactive Maps",
      description: "Explore destinations through interactive maps with real user reviews and local recommendations."
    },
    {
      icon: <Compass className="w-8 h-8 text-primary" />,
      title: "1000+ Destinations",
      description: "Discover hidden gems and popular spots across the globe with our extensive destination database."
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Personalized Recommendations",
      description: "Receive tailored suggestions based on your interests, past trips, and travel goals."
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Local Insights",
      description: "Find the best restaurants, attractions, and accommodations with detailed local information."
    },
    {
      icon: <Newspaper className="w-8 h-8 text-primary" />,
      title: "Travel News",
      description: "Stay updated with the latest travel news, trends, and destination highlights."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Nature background"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
      
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-primary/10 via-background/70 to-primary/10" />
      
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent"
        >
          Experience Smart Travel
        </motion.h2>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-6 rounded-lg bg-card/60 backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-300 border border-border/50"
            >
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
