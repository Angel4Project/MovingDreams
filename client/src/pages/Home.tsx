import { useEffect } from "react";
// Temporarily comment out components that may use language context until we fix the issue
// import Header from "@/components/Header";
// import HeroSection from "@/components/HeroSection";
// import ServicesSection from "@/components/ServicesSection";
// import AboutSection from "@/components/AboutSection";
// import PriceCalculator from "@/components/PriceCalculator";
// import TestimonialsSection from "@/components/TestimonialsSection";
// import ContactSection from "@/components/ContactSection";
// import Footer from "@/components/Footer";
// import AccessibilityWidget from "@/components/AccessibilityWidget";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { dir, t } = useLanguage();

  useEffect(() => {
    // Set up any global page effects or analytics
    window.scrollTo(0, 0);
  }, []);

  return (
    <div dir={dir} className="font-assistant bg-light text-dark overflow-x-hidden min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {t('hero.title')}
      </h1>
      <p className="text-xl text-center mb-8">
        {t('hero.subtitle')}
      </p>
      
      <div className="text-center">
        <p className="mb-4">
          {t('hero.tagline')}
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {t('hero.cta')}
          </button>
          <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors">
            {t('hero.secondaryCta')}
          </button>
        </div>
      </div>
    </div>
  );
}
