import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PriceCalculator from "@/components/PriceCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { dir } = useLanguage();

  useEffect(() => {
    // Set up any global page effects or analytics
    window.scrollTo(0, 0);
    
    // Set meta tags for SEO
    document.title = "אור להובלות | שירותי הובלה מקצועיים ואמינים";
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "name": "אור להובלות",
      "url": "https://www.orlehovalot.co.il",
      "logo": "https://www.orlehovalot.co.il/logo.png",
      "description": "חברת הובלות מקצועית ואמינה המספקת שירותי הובלת דירות, משרדים, פריטים בודדים, אחסון ושירותי מנוף.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ויצמן 555",
        "addressLocality": "כפר סבא",
        "addressRegion": "מרכז",
        "addressCountry": "IL"
      },
      "openingHours": [
        "Su-Th 06:00-22:00",
        "Fr 08:00-14:00"
      ],
      "telephone": "+972545555555"
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div dir={dir} className="font-assistant bg-cosmic text-divine overflow-x-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PriceCalculator />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "אור להובלות",
          "url": "https://www.orlehovalot.co.il",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.orlehovalot.co.il/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }} />
    </div>
  );
}
