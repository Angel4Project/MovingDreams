import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PriceCalculator from "@/components/PriceCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { dir } = useLanguage();

  useEffect(() => {
    // Set up any global page effects or analytics
    window.scrollTo(0, 0);
  }, []);

  return (
    <div dir={dir} className="font-assistant bg-light text-dark overflow-x-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PriceCalculator />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/972543806524" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-50 hover:scale-110 transition-transform"
        aria-label="Contact us via WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>
      
      {/* Accessibility Widget */}
      <AccessibilityWidget />
    </div>
  );
}
