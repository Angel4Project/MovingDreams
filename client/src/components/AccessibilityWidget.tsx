import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Font size adjustment
  const [fontSize, setFontSize] = useState(100); // 100%
  
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
  
  // Close when clicking outside of the widget
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node) && isOpen) {
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
  
  const panelVariants = {
    hidden: { 
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: '0 0 15px rgba(37, 99, 235, 0.6)' 
    },
    tap: { 
      scale: 0.95 
    }
  };
  
  return (
    <div 
      ref={widgetRef}
      className="fixed bottom-6 left-6 z-50 flex items-end"
    >
      {/* Accessibility Widget Button */}
      <motion.button
        className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center cosmic-glow z-10"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        onClick={toggleOpen}
        aria-label={t('accessibility.toggle')}
      >
        <i className="fas fa-universal-access text-lg"></i>
        
        {/* Animated ring around button */}
        <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping-slow opacity-20"></div>
      </motion.button>
      
      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-0 left-0 bg-slate-900/95 border border-slate-700 backdrop-blur-md rounded-lg overflow-hidden shadow-xl w-80 cosmic-glow"
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
                  onClick={() => setIsOpen(false)}
                  aria-label={t('accessibility.close')}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {t('accessibility.description')}
              </p>
            </div>
            
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
            </div>
            
            <div className="p-3 bg-slate-800/30 border-t border-slate-700 text-center">
              <p className="text-xs text-slate-400">
                {t('accessibility.footer')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityWidget;