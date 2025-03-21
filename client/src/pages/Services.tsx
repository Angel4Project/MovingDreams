import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { fadeIn, serviceCardAnimation } from '../lib/animations';
import ContactForm from '../components/ContactForm';

interface ServiceDetail {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

const Services = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Update page title and meta description
  useEffect(() => {
    document.title = `${t('services')} - אור להובלות`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `אור להובלות מציעה מגוון שירותי הובלה מקצועיים: הובלות דירות, משרדים, פריטים בודדים, שירותי פירוק והרכבה, אחסנה ואריזה.`);
    }
  }, [t]);

  // Detailed service data
  const serviceDetails: ServiceDetail[] = [
    {
      id: 'apartment',
      icon: 'fas fa-home',
      title: t('service1Title'),
      description: t('service1Desc'),
      benefits: [
        'תכנון וייעוץ לפני ההובלה',
        'צוות מקצועי ומיומן',
        'ציוד מתקדם להובלה בטוחה',
        'פירוק והרכבה של רהיטים',
        'אפשרות לשירותי אריזה מלאים',
        'ביטוח מלא לכל החפצים'
      ],
      image: 'https://images.unsplash.com/photo-1600518464441-9306a6dc4221?w=800&auto=format&fit=crop'
    },
    {
      id: 'office',
      icon: 'fas fa-building',
      title: t('service2Title'),
      description: t('service2Desc'),
      benefits: [
        'הובלה במינימום הפרעה לפעילות העסקית',
        'פירוק והרכבה של ריהוט משרדי',
        'העברת ציוד טכני וחשמלי ברמת זהירות גבוהה',
        'תיאום עם מנהלי בניינים וחברות אבטחה',
        'אפשרות להובלות לילה וסופי שבוע',
        'ניסיון רב בהעברת חברות גדולות'
      ],
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop'
    },
    {
      id: 'single-items',
      icon: 'fas fa-couch',
      title: t('service3Title'),
      description: t('service3Desc'),
      benefits: [
        'צוות מקצועי ייעודי להובלת פריטים מיוחדים',
        'ציוד וכלים מותאמים לכל סוג פריט',
        'התמחות בהובלת פסנתרים וכלי נגינה',
        'אריזה מיוחדת לפריטים עדינים',
        'ביטוח מיוחד לפריטים בעלי ערך גבוה',
        'שירות מהיר וזמין'
      ],
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop'
    },
    {
      id: 'assembly',
      icon: 'fas fa-tools',
      title: t('service4Title'),
      description: t('service4Desc'),
      benefits: [
        'צוות נגרים ומרכיבים מקצועיים',
        'כלי עבודה מתקדמים ואיכותיים',
        'התמחות בריהוט מכל הסוגים והמותגים',
        'אחריות מלאה על עבודה מקצועית',
        'שירות מהיר ויעיל',
        'אפשרות להזמנת שירות עצמאי ללא הובלה'
      ],
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop'
    },
    {
      id: 'storage',
      icon: 'fas fa-warehouse',
      title: t('service5Title'),
      description: t('service5Desc'),
      benefits: [
        'מחסנים נקיים ומאובטחים',
        'בקרת אקלים ולחות למניעת נזקים',
        'מערכות אבטחה וניטור 24/7',
        'אפשרות לאחסון קצר וארוך טווח',
        'גישה לחפצים במידת הצורך',
        'מחירים תחרותיים וגמישות בתנאי התשלום'
      ],
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop'
    },
    {
      id: 'packing',
      icon: 'fas fa-box',
      title: t('service6Title'),
      description: t('service6Desc'),
      benefits: [
        'חומרי אריזה איכותיים וידידותיים לסביבה',
        'אריזה מותאמת אישית לכל פריט',
        'צוות אריזה מיומן ובעל ניסיון',
        'סימון וקטלוג של כל הפריטים',
        'אריזה מיוחדת לפריטים שבירים ועדינים',
        'חיסכון בזמן ומאמץ עבורכם'
      ],
      image: 'https://images.unsplash.com/photo-1610529026015-a46c7d6190cb?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <>
      {/* Services Header */}
      <div className="relative bg-secondary py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-secondary"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeIn('up', 0.3)}
            >
              {t('servicesTitle')}
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn('up', 0.4)}
            >
              {t('servicesSubtitle')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Services Detail */}
      <div className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {serviceDetails.map((service, index) => (
              <motion.div 
                key={service.id} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeIn(index % 2 === 0 ? 'left' : 'right', 0.2)}
              >
                <div className="lg:w-1/2">
                  <div className="mb-4 flex items-center">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white mr-4">
                      <i className={service.icon + " text-xl"}></i>
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                  
                  <div className="bg-gray-light rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold mb-4">יתרונות השירות:</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mt-1 ml-2"><i className="fas fa-check-circle"></i></span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="#contact" 
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-opacity-90 transition"
                    >
                      <span>{t('getQuote')}</span>
                      <i className="fas fa-arrow-left mr-2"></i>
                    </a>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            מוכנים להתחיל את ההובלה שלכם?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            צוות המקצוענים שלנו מחכה לסייע לכם בכל שלב בתהליך ההובלה. קבלו הצעת מחיר ללא התחייבות.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 rounded-lg bg-primary text-white text-xl font-bold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              <i className="fas fa-phone-alt ml-2"></i>
              <span>צור קשר עכשיו</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>
    </>
  );
};

export default Services;
