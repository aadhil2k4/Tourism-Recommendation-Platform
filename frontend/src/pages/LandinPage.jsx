import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const LandinPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default LandinPage