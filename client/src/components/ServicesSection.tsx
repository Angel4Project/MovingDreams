import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

// Service interface
interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const ServicesSection = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Services data based on translations
  const services: Service[] = [
    {
      id: 'apartment',
      icon: 'fas fa-box-open',
      title: t('service1Title'),
      description: t('service1Desc')
    },
    {
      id: 'office',
      icon: 'fas fa-building',
      title: t('service2Title'),
      description: t('service2Desc')
    },
    {
      id: 'single-items',
      icon: 'fas fa-piano',
      title: t('service3Title'),
      description: t('service3Desc')
    },
    {
      id: 'assembly',
      icon: 'fas fa-tools',
      title: t('service4Title'),
      description: t('service4Desc')
    },
    {
      id: 'storage',
      icon: 'fas fa-warehouse',
      title: t('service5Title'),
      description: t('service5Desc')
    },
    {
      id: 'packing',
      icon: 'fas fa-box',
      title: t('service6Title'),
      description: t('service6Desc')
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {t('servicesTitle')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('servicesSubtitle')}
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="services-card bg-gray-light rounded-xl overflow-hidden shadow-lg p-6 transition-all duration-500 hover:transform hover:translateY-[-10px] hover:scale-[1.02] hover:shadow-xl"
              variants={item}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 text-white">
                <i className={`${service.icon} text-3xl`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <a href="#contact" className="text-primary font-bold flex items-center">
                <span>{t('getMoreDetails')}</span>
                <i className="fas fa-arrow-left mr-2"></i>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
