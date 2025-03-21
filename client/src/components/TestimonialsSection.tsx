import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  initials: string;
  rating: number;
  text: string;
  service: string;
  details: string[];
  additionalText: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="testimonial-card h-[320px]">
      <div 
        className={`testimonial-inner relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="testimonial-front bg-white rounded-xl shadow-lg p-6 h-full absolute inset-0 backface-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-xl mr-4">
                <span>{testimonial.initials}</span>
              </div>
              <div>
                <h4 className="font-heebo font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
            <div className="text-accent">
              <i className="fas fa-quote-right text-3xl opacity-30"></i>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex text-accent mb-2">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fas ${
                    i < Math.floor(testimonial.rating) 
                      ? 'fa-star' 
                      : i < testimonial.rating 
                        ? 'fa-star-half-alt' 
                        : 'fa-star text-gray-300'
                  }`}
                ></i>
              ))}
            </div>
            <p className="text-gray-700 line-clamp-4">
              {testimonial.text}
            </p>
          </div>
          <div className="text-sm text-gray-500">{testimonial.service}</div>
          <button 
            className="flip-btn absolute bottom-4 left-4 text-primary hover:text-secondary transition-colors"
            onClick={() => setFlipped(true)}
          >
            <i className="fas fa-sync"></i>
          </button>
        </div>
        
        {/* Back Side */}
        <div className="testimonial-back bg-primary text-white rounded-xl shadow-lg p-6 h-full absolute inset-0 backface-hidden rotate-y-180">
          <h4 className="font-heebo font-bold text-lg mb-3">פרטי ההובלה:</h4>
          <ul className="space-y-2 mb-6">
            {testimonial.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-check-circle mt-1 ml-3"></i>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="text-sm opacity-75 mb-3">
            "{testimonial.additionalText}"
          </div>
          <button 
            className="flip-btn absolute bottom-4 left-4 text-white hover:text-accent transition-colors"
            onClick={() => setFlipped(false)}
          >
            <i className="fas fa-sync"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
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

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 }
    })
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'דניאל גולן',
      location: 'תל אביב',
      initials: 'דג',
      rating: 5,
      text: 'שירות יוצא מן הכלל! צוות מקצועי, אדיב ויעיל. ההובלה בוצעה במהירות ובמקצועיות, בלי שום נזקים לרהיטים. מומלץ בחום!',
      service: 'הובלת דירה 3 חדרים',
      details: [
        'הובלת דירת 3 חדרים מתל אביב לרמת גן',
        'שירותי פירוק והרכבה של כל הרהיטים',
        'אריזת כל תכולת הדירה כולל כלים וציוד שביר',
        'הובלה בוצעה ב-19.4.2023'
      ],
      additionalText: 'האמת שהייתי חששן לגבי ההובלה, אבל אור וצוות המובילים נתנו לי ביטחון מהרגע הראשון. ממליץ עליהם בלב שלם!'
    },
    {
      id: 2,
      name: 'מיכל כהן',
      location: 'חיפה',
      initials: 'מכ',
      rating: 5,
      text: 'העברנו משרד שלם עם אור להובלות והכל עבר בצורה חלקה להפליא. הצוות היה מקצועי, דייקני וידע בדיוק איך לטפל בציוד המשרדי הרגיש.',
      service: 'הובלת משרד',
      details: [
        'הובלת משרד מחיפה למפרץ חיפה',
        'העברת 15 עמדות עבודה ושרתים',
        'טיפול מיוחד בציוד מחשוב רגיש',
        'הובלה בוצעה ב-2.6.2023'
      ],
      additionalText: 'ההובלה בוצעה בסוף שבוע כדי שלא לפגוע בפעילות העסקית. ביום ראשון כבר עבדנו כרגיל במשרד החדש!'
    },
    {
      id: 3,
      name: 'אלון לוי',
      location: 'ירושלים',
      initials: 'אל',
      rating: 4.5,
      text: 'נעזרתי באור להובלות להעברת פסנתר כנף עתיק. זו הייתה משימה מורכבת במיוחד והם טיפלו בה באופן מושלם, עם כל הזהירות והמקצועיות.',
      service: 'הובלת פסנתר',
      details: [
        'הובלת פסנתר כנף יקר ערך מקומה 3 ללא מעלית',
        'שימוש במנוף מיוחד להורדת הפסנתר',
        'עטיפה מיוחדת להגנה בפני שריטות ומכות',
        'הובלה בוצעה ב-25.5.2023'
      ],
      additionalText: 'פסנתר הכנף הוא זיכרון משפחתי יקר. הייתי חרד מאוד לגביו, אך הפסנתר הגיע במצב מושלם. תודה!'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-light to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          className="text-center mt-12"
        >
          <a href="#" className="inline-block bg-white text-secondary border-2 border-secondary px-8 py-3 rounded-lg font-bold hover:bg-secondary hover:text-white transition-colors">
            <span>{t('testimonials.viewAll')}</span>
            <i className="fas fa-chevron-left mr-2"></i>
          </a>
        </motion.div>
      </div>
      
    </section>
  );
};

export default TestimonialsSection;
