import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import PriceCalculator from '../components/PriceCalculator';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../hooks/useLanguage';

const Home = () => {
  const { t } = useLanguage();

  // Update page title and meta description
  useEffect(() => {
    document.title = `אור להובלות - ${t('heroTitle1')}${t('heroTitle2')}`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `אור להובלות - ${t('footerTagline')}`);
    }
  }, [t]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PriceCalculator />
      <TestimonialsSection />
      <ContactForm />
    </>
  );
};

export default Home;
