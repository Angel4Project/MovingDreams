import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FloatingSocialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      bgColor: 'bg-[#25D366]',
      link: 'https://wa.me/9720545555555',
      tooltip: t('social.whatsapp'),
    },
    {
      name: 'Phone',
      icon: 'fas fa-phone-alt',
      bgColor: 'bg-primary',
      link: 'tel:0545555555',
      tooltip: t('social.phone'),
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      bgColor: 'bg-[#1877F2]',
      link: 'https://facebook.com',
      tooltip: t('social.facebook'),
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      bgColor: 'bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500',
      link: 'https://instagram.com',
      tooltip: t('social.instagram'),
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      bgColor: 'bg-gold',
      link: 'mailto:info@lehovalot.com',
      tooltip: t('social.email'),
    },
  ];
  
  // Close when clicking outside of the buttons
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonsRef.current && !buttonsRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  // Button animations
  const containerVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };
  
  const buttonVariants = {
    open: { 
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    closed: { 
      y: 20,
      scale: 0.8,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20 
      }
    }
  };
  
  const toggleButtonVariants = {
    open: { 
      rotate: 225,
      backgroundColor: '#ef4444',
      boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
    },
    closed: { 
      rotate: 0,
      backgroundColor: '#2563EB',
      boxShadow: '0 0 15px rgba(37, 99, 235, 0.6)'
    }
  };
  
  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.2 
      }
    }
  };
  
  return (
    <div 
      ref={buttonsRef}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={containerVariants}
        className="flex flex-col-reverse items-center gap-4 mb-4"
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  className="relative group"
                  variants={buttonVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <motion.a
                    href={social.link}
                    className={`${social.bgColor} cosmic-glow w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transform transition-transform duration-300 hover:scale-110`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    target={social.name !== 'Phone' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <i className={social.icon}></i>
                    
                    {/* Animated cosmic particles around button */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: 0.7,
                          }}
                        ></div>
                      ))}
                    </div>
                  </motion.a>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute top-1/2 right-full -translate-y-1/2 mr-3 px-3 py-1 rounded-lg bg-slate-800 text-white text-sm whitespace-nowrap pointer-events-none"
                    initial="hidden"
                    whileHover="visible"
                    animate="hidden"
                    variants={tooltipVariants}
                  >
                    {social.tooltip}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-slate-800"></div>
                  </motion.div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.button
        className="relative w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl shadow-lg focus:outline-none cosmic-glow"
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? "open" : "closed"}
        variants={toggleButtonVariants}
        aria-label={isOpen ? t('social.close') : t('social.open')}
        onClick={toggleOpen}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-plus'}`}></i>
        
        {/* Animated ring around button */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full animate-ping-slow opacity-30"></div>
        
        {/* Cosmic particles around the toggle button */}
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() + 0.5})`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `float-particle ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingSocialButtons;