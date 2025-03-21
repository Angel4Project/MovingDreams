import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceCardProps {
  icon: string;
  image: string;
  title: string;
  description: string;
  benefits: string[];
  index: number;
}

const ServiceCard = ({ icon, image, title, description, benefits, index }: ServiceCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="service-card group relative overflow-hidden rounded-xl bg-card border border-slate-700 h-full"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="mb-4 flex items-center">
          <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary cosmic-glow">
            <i className={`${icon} text-2xl`}></i>
          </div>
          <h3 className="mr-4 text-xl font-heebo font-bold text-divine">{title}</h3>
        </div>
        
        <p className="text-slate-300 mb-4">{description}</p>
        
        <div className="mt-auto">
          <h4 className="text-gold font-medium mb-2">יתרונות:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                className="flex items-center text-sm text-slate-300"
              >
                <span className="text-primary mr-2">
                  <i className="fas fa-check-circle"></i>
                </span>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Hover Effect Elements */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <i className="fas fa-arrow-left text-gold"></i>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-gold to-secondary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const services = [
    {
      icon: 'fas fa-home',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
      title: 'הובלת דירות',
      description: 'שירות הובלת דירות מקצועי מבית לבית, הכולל פירוק והרכבה של רהיטים, אריזה, והעברה בטוחה.',
      benefits: [
        'פירוק והרכבת רהיטים כלול במחיר',
        'צוות מיומן ומקצועי',
        'שמירה על ציוד רגיש',
        'ביטוח מלא'
      ]
    },
    {
      icon: 'fas fa-building',
      image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
      title: 'הובלת משרדים',
      description: 'העברת משרדים ללא השבתת העסק, עם התמחות מיוחדת בציוד משרדי, מחשבים וארכיונים.',
      benefits: [
        'העברה מהירה בסופי שבוע',
        'אריזת ציוד אלקטרוני בהתאמה',
        'סידור מחדש לפי תוכנית',
        'פתרונות לשרתים וציוד רגיש'
      ]
    },
    {
      icon: 'fas fa-couch',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
      title: 'הובלת פריטים בודדים',
      description: 'שירות משתלם להובלת פריטים בודדים כמו ספות, מקררים, מכונות כביסה, או כל רהיט אחר.',
      benefits: [
        'שירות מהיר ללא המתנה',
        'מחירים מותאמים לפריט בודד',
        'אפשרות להובלה ביום ההזמנה',
        'טיפול מקצועי בפריטים כבדים'
      ]
    },
    {
      icon: 'fas fa-warehouse',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
      title: 'שירותי אחסנה',
      description: 'מחסנים מאובטחים לטווח קצר או ארוך, מושלמים למעבר בין דירות או לאחסון עונתי.',
      benefits: [
        'מחסנים מאובטחים 24/7',
        'מערכת בקרת אקלים',
        'גישה נוחה למחסן שלך',
        'אחסון לכל טווח זמן'
      ]
    },
    {
      icon: 'fas fa-box',
      image: 'https://images.unsplash.com/photo-1595079676341-2917591131f4',
      title: 'שירותי אריזה',
      description: 'אריזה מקצועית של כל תכולת הבית או המשרד עם חומרי אריזה איכותיים ועמידים.',
      benefits: [
        'חומרי אריזה פרימיום',
        'סימון קופסאות לפי חדרים',
        'אריזה מיוחדת לפריטים שבירים',
        'פירוק אריזות בסיום'
      ]
    },
    {
      icon: 'fas fa-truck-loading',
      image: 'https://images.unsplash.com/photo-1568452329428-e760163f262c',
      title: 'שירותי מנוף',
      description: 'פתרונות הרמה מקצועיים לפריטים כבדים, דרך חלונות או מרפסות, כאשר המדרגות אינן אפשריות.',
      benefits: [
        'פתרון לקומות גבוהות',
        'הרמת פריטים עד 500 ק"ג',
        'מפעילי מנוף מוסמכים',
        'אישורי בטיחות והיתרים'
      ]
    }
  ];
  
  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-gold/5 animate-float"></div>
        <div className="absolute top-60 right-40 w-20 h-20 rounded-full bg-secondary/5 animate-float-fast"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-divine mb-4 inline-block relative">
            {t('services.title')}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-gold"></div>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              image={service.image}
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;