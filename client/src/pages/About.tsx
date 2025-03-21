import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { fadeIn } from '../lib/animations';
import ContactForm from '../components/ContactForm';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Update page title and meta description
  useEffect(() => {
    document.title = `${t('about')} - אור להובלות`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `הכירו את אור להובלות - חברת הובלות מובילה בישראל. למעלה מעשור של ניסיון, צוות מקצועי, ושירות איכותי עם יחס אישי.`);
    }
  }, [t]);

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: 'אור ישראלי',
      position: 'מייסד ומנכ"ל',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop',
      bio: 'אור הקים את החברה לפני 12 שנה מתוך אהבה לתחום הלוגיסטיקה וחזון לשירות הובלות ברמה אחרת. עם ניסיון של למעלה מ-15 שנה בתחום, הוא מוביל את החברה להצלחה מתמשכת.'
    },
    {
      name: 'מיכל כהן',
      position: 'מנהלת תפעול',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop',
      bio: 'מיכל אחראית על כל הפעילות התפעולית של החברה. עם רקע בלוגיסטיקה וניהול פרויקטים, היא מבטיחה שכל הובלה מתבצעת בצורה חלקה ויעילה.'
    },
    {
      name: 'יוסי לוי',
      position: 'ראש צוות מובילים',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
      bio: 'יוסי מוביל את צוות המובילים המקצועי שלנו. עם ניסיון של 10 שנים בתחום, הוא מדריך את הצוות בסטנדרטים הגבוהים ביותר של מקצועיות, זהירות ושירות.'
    }
  ];

  // Milestones data
  const milestones: MilestoneItem[] = [
    {
      year: '2011',
      title: 'הקמת החברה',
      description: 'אור להובלות הוקמה עם משאית אחת וחזון גדול לשנות את תחום ההובלות בישראל.'
    },
    {
      year: '2014',
      title: 'הרחבת פעילות',
      description: 'הוספת שירותי אחסנה ואריזה והרחבת צי המשאיות לחמש משאיות.'
    },
    {
      year: '2017',
      title: 'פריסה ארצית',
      description: 'הרחבת הפעילות לכל רחבי הארץ והקמת מחסן לוגיסטי מרכזי באזור המרכז.'
    },
    {
      year: '2020',
      title: 'חדשנות דיגיטלית',
      description: 'השקת מערכת דיגיטלית חדשנית למעקב ותיאום הובלות בזמן אמת.'
    },
    {
      year: '2023',
      title: 'מובילים בתחום',
      description: 'אור להובלות הופכת לאחת מחברות ההובלה המובילות בישראל עם צי של 15 משאיות ומעל 50 עובדים.'
    }
  ];

  return (
    <>
      {/* About Header */}
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
              {t('aboutUsTitle')}
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn('up', 0.4)}
            >
              {t('aboutUsText1')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 mb-20"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn('up', 0.3)}
          >
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">הסיפור שלנו</h2>
              <p className="text-lg text-gray-700 mb-4">
                אור להובלות נוסדה בשנת 2011 על ידי אור ישראלי, מתוך חזון להביא רמה חדשה של מקצועיות ואמינות לתחום ההובלות בישראל.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                התחלנו את דרכנו עם משאית אחת ונהג אחד, ועם הזמן צמחנו לחברה מובילה בתחום עם צי של 15 משאיות מודרניות ומעל 50 עובדים מקצועיים.
              </p>
              <p className="text-lg text-gray-700">
                לאורך השנים, שמרנו על העקרונות המנחים אותנו: יחס אישי, מקצועיות ללא פשרות, אמינות ודיוק בלוחות זמנים, ושאיפה מתמדת למצוינות.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop" 
                  alt="צוות אור להובלות" 
                  className="rounded-xl shadow-xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-3">
                  <span className="text-lg font-bold">
                    מעל 12 שנות ניסיון
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline Milestones */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">אבני דרך</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                המסע שלנו להפיכת אור להובלות לחברת ההובלות המובילה בישראל
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    className="relative flex flex-col md:flex-row items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-last md:text-left md:pl-12'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <span className="text-primary font-bold text-xl">{milestone.year}</span>
                        <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-700">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow"></div>
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">הצוות שלנו</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                הכירו את האנשים המוכשרים שעומדים מאחורי אור להובלות
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-bold mb-4">{member.position}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">במספרים</h2>
            <p className="text-lg max-w-3xl mx-auto">
              ההישגים שלנו במספרים מספרים את הסיפור של מחויבות, אמינות ושירות מצוין
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center p-6 bg-white/10 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-xl">הובלות מוצלחות</div>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white/10 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">אנשי צוות מקצועיים</div>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white/10 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-xl">משאיות מודרניות</div>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-white/10 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-xl">שנות ניסיון</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>
    </>
  );
};

export default About;
