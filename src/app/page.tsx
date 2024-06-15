import AboutSection from "./components/Home/AboutSection";
import ContactSection from "./components/Home/ContactSection";
import FAQSection from "./components/Home/FAQSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";
import HeroSection from "./components/Home/HeroSection";

export default function Home() {
  return (
    <div className="bg-beige min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
