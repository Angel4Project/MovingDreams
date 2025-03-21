import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FloatingSocialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();
  
  // Font size adjustment
  const [fontSize, setFontSize] = useState(100); // 100%
  
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
      name: 'Email',
      icon: 'fas fa-envelope',
      bgColor: 'bg-gold',
      link: 'mailto:info@or-lehovalot.co.il',
      tooltip: t('social.email'),
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
      name: 'Accessibility',
      icon: 'fas fa-universal-access',
      bgColor: 'bg-indigo-700',
      tooltip: t('accessibility.toggle'),
      onClick: () => setIsAccessibilityOpen(!isAccessibilityOpen)
    },
    {
      name: 'Language',
      icon: 'fas fa-language',
      bgColor: 'bg-emerald-600',
      tooltip: t('common.chooseLanguage'),
      onClick: () => {
        // Toggle between languages
        const nextLanguage = language === 'he' ? 'en' : 
                             language === 'en' ? 'ru' : 
                             language === 'ru' ? 'ar' : 'he';
        setLanguage(nextLanguage);
      }
    },
  ];
  
  // Accessibility options
  const accessibilityOptions = [
    {
      id: 'larger-text',
      icon: 'fas fa-text-height',
      label: t('accessibility.largerText'),
      action: () => {
        if (fontSize < 130) {
          setFontSize(prevSize => prevSize + 10);
          document.documentElement.style.fontSize = `${fontSize + 10}%`;
        }
      }
    },
    {
      id: 'smaller-text',
      icon: 'fas fa-text-width',
      label: t('accessibility.smallerText'),
      action: () => {
        if (fontSize > 90) {
          setFontSize(prevSize => prevSize - 10);
          document.documentElement.style.fontSize = `${fontSize - 10}%`;
        }
      }
    },
    {
      id: 'high-contrast',
      icon: 'fas fa-adjust',
      label: t('accessibility.highContrast'),
      action: () => {
        document.body.classList.toggle('high-contrast');
      }
    },
    {
      id: 'dyslexic-font',
      icon: 'fas fa-font',
      label: t('accessibility.dyslexicFont'),
      action: () => {
        document.body.classList.toggle('dyslexic-font');
      }
    },
    {
      id: 'links-highlight',
      icon: 'fas fa-link',
      label: t('accessibility.highlightLinks'),
      action: () => {
        document.body.classList.toggle('highlight-links');
      }
    },
    {
      id: 'reset',
      icon: 'fas fa-undo',
      label: t('accessibility.reset'),
      action: () => {
        // Reset all accessibility settings
        setFontSize(100);
        document.documentElement.style.fontSize = '100%';
        document.body.classList.remove('high-contrast', 'dyslexic-font', 'highlight-links');
      }
    }
  ];
  
  // Language options
  const languageOptions = [
    { code: 'he', label: 'עברית', icon: '🇮🇱' },
    { code: 'en', label: 'English', icon: '🇺🇸' },
    { code: 'ru', label: 'Русский', icon: '🇷🇺' },
    { code: 'ar', label: 'العربية', icon: '🇸🇦' }
  ];
  
  // Close when clicking outside of the buttons
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonsRef.current && !buttonsRef.current.contains(event.target as Node)) {
        if (isOpen) setIsOpen(false);
        if (isAccessibilityOpen) setIsAccessibilityOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isAccessibilityOpen]);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isAccessibilityOpen) setIsAccessibilityOpen(false);
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
  
  const panelVariants = {
    hidden: { 
      y: 100,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };
  
  return (
    <div 
      ref={buttonsRef}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Social Media Buttons */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={containerVariants}
        className="flex flex-col-reverse items-center gap-3 mb-4"
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
                    href={social.onClick ? undefined : social.link}
                    onClick={social.onClick}
                    className={`${social.bgColor} cosmic-glow w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transform transition-transform duration-300 hover:scale-110`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    target={(social.name !== 'Phone' && social.name !== 'Chat' && social.name !== 'Accessibility') ? '_blank' : undefined}
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
      
      {/* Main Toggle Button */}
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
      
      {/* Accessibility Panel */}
      <AnimatePresence>
        {isAccessibilityOpen && (
          <motion.div
            className="absolute bottom-20 right-0 bg-slate-900/95 border border-slate-700 backdrop-blur-md rounded-lg overflow-hidden shadow-xl w-80 cosmic-glow"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
          >
            <div className="p-5 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-divine">
                  {t('accessibility.title')}
                </h3>
                <button
                  className="text-slate-400 hover:text-white transition-colors"
                  onClick={() => setIsAccessibilityOpen(false)}
                  aria-label={t('accessibility.close')}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {t('accessibility.description')}
              </p>
            </div>
            
            {/* Accessibility Options */}
            <div className="p-3">
              <div className="grid grid-cols-2 gap-3">
                {accessibilityOptions.map(option => (
                  <motion.button
                    key={option.id}
                    className="p-3 bg-slate-800 hover:bg-primary/20 border border-slate-700 hover:border-primary rounded-lg flex flex-col items-center justify-center text-center transition-colors duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={option.action}
                  >
                    <i className={`${option.icon} text-lg text-primary mb-2`}></i>
                    <span className="text-sm text-divine">{option.label}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Font size indicator */}
              <div className="mt-4 px-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-divine">{t('accessibility.fontSize')}</span>
                  <span className="text-sm font-medium text-primary">{fontSize}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    style={{ width: `${((fontSize - 90) / 40) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Language Selector */}
              <div className="mt-4 border-t border-slate-700 pt-3">
                <div className="text-sm text-divine mb-2">{t('accessibility.language')}</div>
                <div className="grid grid-cols-4 gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`p-2 rounded-lg text-center transition-colors ${
                        language === lang.code
                          ? 'bg-primary/20 border border-primary'
                          : 'bg-slate-800 border border-slate-700 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-xl mb-1">{lang.icon}</div>
                      <div className="text-xs text-divine">{lang.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSocialButtons;