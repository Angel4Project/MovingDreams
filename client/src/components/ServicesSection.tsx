import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceCardProps {
  icon: string;
  image: string;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, image, title, description, index }: ServiceCardProps) => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl relative service-card group"
    >
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
      <div className="h-48 overflow-hidden">
        <img 
          src={image}
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 relative">
        <div className="absolute -top-10 right-6 w-16 h-16 bg-primary text-white rounded-lg shadow-lg flex items-center justify-center">
          <i className={`${icon} text-2xl`}></i>
        </div>
        <h3 className="text-xl font-heebo font-bold text-secondary mb-3 mt-4">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href="#calculator" 
          className="inline-block text-primary font-bold hover:underline transition-colors group-hover:text-secondary"
        >
          <span>{t('services.more')}</span>
          <i className="fas fa-arrow-left mr-2"></i>
        </a>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const services = [
    {
      icon: 'fas fa-home',
      image: 'https://images.unsplash.com/photo-1600518464441-9306aabb4b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZnVybml0dXJlIG1vdmluZ3x8fHx8fDE2NDI3NjgxNTk&ixlib=rb-1.2.1&q=80&w=500',
      title: t('services.apartment.title'),
      description: t('services.apartment.description')
    },
    {
      icon: 'fas fa-building',
      image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8b2ZmaWNlIG1vdmluZ3x8fHx8fDE2NDI3NjgxNTk&ixlib=rb-1.2.1&q=80&w=500',
      title: t('services.office.title'),
      description: t('services.office.description')
    },
    {
      icon: 'fas fa-couch',
      image: 'https://images.unsplash.com/photo-1518091943806-3d48e7021da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGlhbm8gbW92aW5nfHx8fHx8MTY0Mjc2ODE1OQ&ixlib=rb-1.2.1&q=80&w=500',
      title: t('services.singleItem.title'),
      description: t('services.singleItem.description')
    },
    {
      icon: 'fas fa-tools',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZnVybml0dXJlIGFzc2VtYmx5fHx8fHx8MTY0Mjc2ODE1OQ&ixlib=rb-1.2.1&q=80&w=500',
      title: t('services.assembly.title'),
      description: t('services.assembly.description')
    },
    {
      icon: 'fas fa-warehouse',
      image: 'https://images.unsplash.com/photo-1598908314732-07113901949e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c3RvcmFnZSB3YXJlaG91c2V8fHx8fHwxNjQyNzY4MTU5&ixlib=rb-1.2.1&q=80&w=500',
      title: t('services.storage.title'),
      description: t('services.storage.description')
    },
    {
      icon: 'fas fa-box',
      image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGFja2luZyBib3hlc3x8fHx8fDE2NDI3NjgxNTk&ixlib=rb-1.2.1&q=80&w=500',
      title: t('services.packing.title'),
      description: t('services.packing.description')
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-light">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              image={service.image}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
