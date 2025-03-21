import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'wouter';

const HeroSection = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  return (
    <section id="home" ref={sectionRef} className="relative bg-secondary overflow-hidden">
      {/* Background with radial gradient */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-secondary"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 text-white mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('heroTitle1')} 
              <span className="text-primary">{t('heroTitle2')}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/contact">
                <a className="px-8 py-4 rounded-lg bg-primary text-white text-center text-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105">
                  {t('getQuote')}
                </a>
              </Link>
              <Link href="/services">
                <a className="px-8 py-4 rounded-lg bg-white text-secondary text-center text-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105">
                  {t('discoverServices')}
                </a>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="relative w-full max-w-md" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <img 
                src="https://images.unsplash.com/photo-1603665330306-dd1a67e0cc4e?w=800&auto=format&fit=crop" 
                alt={t('movingTruckImage')} 
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3">
                <span className="text-lg font-bold">{t('professionalReliable')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
