import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const AccessibilityWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(0); // 0 = normal, 1 = large, 2 = larger
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Apply accessibility settings
  useEffect(() => {
    const html = document.documentElement;
    
    // Font size
    html.classList.remove('text-lg', 'text-xl');
    if (fontSize === 1) html.classList.add('text-lg');
    if (fontSize === 2) html.classList.add('text-xl');
    
    // High contrast
    if (highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    // Grayscale
    if (grayscale) {
      html.style.filter = 'grayscale(100%)';
    } else {
      html.style.filter = '';
    }
  }, [fontSize, highContrast, grayscale]);

  const resetSettings = () => {
    setFontSize(0);
    setHighContrast(false);
    setGrayscale(false);
  };

  return (
    <div ref={widgetRef} className="fixed top-6 left-6 z-50">
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        aria-label="Accessibility Options"
      >
        <i className="fas fa-universal-access text-xl"></i>
      </button>
      
      {/* Accessibility Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-14 left-0 bg-white rounded-lg shadow-xl p-4 w-64"
        >
          <h3 className="text-lg font-bold text-secondary mb-4">
            {t('accessibility.title')}
          </h3>
          
          <div className="space-y-3">
            {/* Font Size */}
            <div>
              <button
                onClick={() => setFontSize(prev => Math.min(prev + 1, 2))}
                className="w-full flex items-center justify-between bg-light hover:bg-gray-200 p-2 rounded transition-colors"
                disabled={fontSize >= 2}
              >
                <span>{t('accessibility.increaseFontSize')}</span>
                <i className="fas fa-text-height"></i>
              </button>
            </div>
            
            {/* High Contrast */}
            <div>
              <button
                onClick={() => setHighContrast(prev => !prev)}
                className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                  highContrast ? 'bg-secondary text-white' : 'bg-light hover:bg-gray-200'
                }`}
              >
                <span>{t('accessibility.highContrast')}</span>
                <i className={`fas fa-adjust ${highContrast ? 'text-white' : ''}`}></i>
              </button>
            </div>
            
            {/* Grayscale */}
            <div>
              <button
                onClick={() => setGrayscale(prev => !prev)}
                className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                  grayscale ? 'bg-secondary text-white' : 'bg-light hover:bg-gray-200'
                }`}
              >
                <span>{t('accessibility.grayscale')}</span>
                <i className={`fas fa-eye ${grayscale ? 'text-white' : ''}`}></i>
              </button>
            </div>
            
            {/* Reset Button */}
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={resetSettings}
                className="w-full flex items-center justify-between text-primary hover:text-secondary p-1 rounded transition-colors"
              >
                <span>{t('accessibility.reset')}</span>
                <i className="fas fa-undo"></i>
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Global CSS for accessibility features */}
      <style>
        {`
          .high-contrast {
            filter: contrast(150%);
          }
        `}
      </style>
    </div>
  );
};

export default AccessibilityWidget;