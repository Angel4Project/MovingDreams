import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FloatingSocialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
  // Contact information
  const contactInfo = {
    phone: '0543806524',
    whatsapp: '972543806524',
    email: 'or4moving@gmail.com',
    facebook: 'https://www.facebook.com/profile.php?id=100055173724987',
    instagram: 'https://www.instagram.com/or4moving/'
  };
  
  // Pre-composed WhatsApp message
  const whatsappMessage = encodeURIComponent('שלום, אשמח לקבל פרטים נוספים על שירותי ההובלה שלכם');
  
  // Variants for animation
  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const buttonVariants = {
    open: (i: number) => ({
      y: -i * 60,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 15 },
        opacity: { duration: 0.2 }
      }
    }),
    closed: {
      y: 0,
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 }
      }
    }
  };
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={containerVariants}
        className="relative"
      >
        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-16 h-16 rounded-full bg-primary cosmic-glow btn-3d flex items-center justify-center text-white text-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
        </motion.button>
        
        {/* Phone Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.a
              href={`tel:${contactInfo.phone}`}
              custom={1}
              variants={buttonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-xl"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(21, 128, 61, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              title={t('contact.callUs')}
            >
              <i className="fas fa-phone"></i>
            </motion.a>
          )}
        </AnimatePresence>
        
        {/* WhatsApp Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              custom={2}
              variants={buttonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(74, 222, 128, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              title={t('contact.whatsapp')}
            >
              <i className="fab fa-whatsapp"></i>
            </motion.a>
          )}
        </AnimatePresence>
        
        {/* Email Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.a
              href={`mailto:${contactInfo.email}`}
              custom={3}
              variants={buttonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              title={t('contact.email')}
            >
              <i className="fas fa-envelope"></i>
            </motion.a>
          )}
        </AnimatePresence>
        
        {/* Facebook Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              custom={4}
              variants={buttonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(37, 99, 235, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              title={t('contact.facebook')}
            >
              <i className="fab fa-facebook-f"></i>
            </motion.a>
          )}
        </AnimatePresence>
        
        {/* Instagram Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              custom={5}
              variants={buttonVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center text-xl"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(219, 39, 119, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              title={t('contact.instagram')}
            >
              <i className="fab fa-instagram"></i>
            </motion.a>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingSocialButtons;