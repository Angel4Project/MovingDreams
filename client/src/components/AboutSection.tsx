import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const AboutSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const statsList = [
    { label: t('customerSatisfaction'), value: 98 },
    { label: t('onTimeDelivery'), value: 95 },
    { label: t('returningCustomers'), value: 90 }
  ];

  return (
    <section id="about" className="py-20 bg-gray-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6">{t('aboutUsTitle')}</h2>
            <p className="text-xl text-gray-600 mb-6">
              {t('aboutUsText1')}
            </p>
            <p className="text-xl text-gray-600 mb-6">
              {t('aboutUsText2')}
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="text-2xl font-bold mb-4">{t('reliabilityMetrics')}</h3>
              
              {statsList.map((stat, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="w-full bg-gray-medium rounded-full h-4">
                    <motion.div 
                      className="bg-primary h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${stat.value}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop" 
                alt={t('movingTeamImage')} 
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">{t('professionalSkilled')}</h3>
                <p className="text-white opacity-90">{t('highestQualityService')}</p>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-3">
                <span className="text-lg font-bold">
                  <i className="fas fa-truck ml-2"></i>
                  <span>{t('completedMovings')}</span>
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img 
                src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop" 
                alt={t('movingTruckImage')} 
                className="rounded-lg shadow-lg h-40 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop" 
                alt={t('unloadingTruckImage')} 
                className="rounded-lg shadow-lg h-40 w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
