import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AccessibilityWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isFontEnlarged, setIsFontEnlarged] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target as Node) && 
        !(event.target as HTMLElement).closest('#accessibility-button')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Apply accessibility styles when settings change
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    // Font size
    if (isFontEnlarged) {
      htmlElement.style.fontSize = '120%';
    } else {
      htmlElement.style.fontSize = '';
    }
    
    // High contrast
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Grayscale
    if (isGrayscale) {
      document.body.classList.add('grayscale');
    } else {
      document.body.classList.remove('grayscale');
    }
    
    // Clean up when component unmounts
    return () => {
      htmlElement.style.fontSize = '';
      document.body.classList.remove('high-contrast', 'grayscale');
    };
  }, [isFontEnlarged, isHighContrast, isGrayscale]);

  // Handle text-to-speech
  const handleTextToSpeech = () => {
    const shouldSpeak = !isSpeechActive;
    setIsSpeechActive(shouldSpeak);
    
    if (shouldSpeak && 'speechSynthesis' in window) {
      // Get all visible text from the page
      const mainContent = document.querySelector('main')?.textContent || 
                        document.body.textContent || 
                        '';
      
      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(mainContent);
      
      // Set language based on the current page language
      utterance.lang = document.documentElement.lang;
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
      
      // Stop when toggled off
      utterance.onend = () => setIsSpeechActive(false);
    } else {
      // Stop speaking
      window.speechSynthesis?.cancel();
    }
  };

  // Reset all accessibility settings
  const resetSettings = () => {
    setIsFontEnlarged(false);
    setIsHighContrast(false);
    setIsGrayscale(false);
    setIsSpeechActive(false);
    window.speechSynthesis?.cancel();
  };

  return (
    <>
      {/* Accessibility Button */}
      <button 
        id="accessibility-button"
        className="fixed bottom-6 right-6 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Options"
      >
        <i className="fas fa-universal-access text-xl"></i>
      </button>

      {/* Accessibility Panel */}
      <div 
        ref={panelRef}
        className={`fixed bottom-20 right-6 bg-white rounded-xl shadow-2xl z-50 w-64 ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="p-4">
          <h3 className="text-lg font-heebo font-bold text-secondary mb-4">{t('accessibility.title')}</h3>
          <div className="space-y-3">
            <button 
              className={`w-full ${isFontEnlarged ? 'bg-primary text-white' : 'bg-light hover:bg-gray-200'} transition-colors rounded-lg px-4 py-2 text-sm text-right flex items-center justify-between`}
              onClick={() => setIsFontEnlarged(!isFontEnlarged)}
            >
              <span>{t('accessibility.increaseFontSize')}</span>
              <i className="fas fa-text-height"></i>
            </button>
            
            <button 
              className={`w-full ${isHighContrast ? 'bg-primary text-white' : 'bg-light hover:bg-gray-200'} transition-colors rounded-lg px-4 py-2 text-sm text-right flex items-center justify-between`}
              onClick={() => setIsHighContrast(!isHighContrast)}
            >
              <span>{t('accessibility.highContrast')}</span>
              <i className="fas fa-adjust"></i>
            </button>
            
            <button 
              className={`w-full ${isGrayscale ? 'bg-primary text-white' : 'bg-light hover:bg-gray-200'} transition-colors rounded-lg px-4 py-2 text-sm text-right flex items-center justify-between`}
              onClick={() => setIsGrayscale(!isGrayscale)}
            >
              <span>{t('accessibility.grayscale')}</span>
              <i className="fas fa-tint-slash"></i>
            </button>
            
            <button 
              className={`w-full ${isSpeechActive ? 'bg-primary text-white' : 'bg-light hover:bg-gray-200'} transition-colors rounded-lg px-4 py-2 text-sm text-right flex items-center justify-between`}
              onClick={handleTextToSpeech}
            >
              <span>{t('accessibility.textToSpeech')}</span>
              <i className="fas fa-volume-up"></i>
            </button>
            
            <button 
              className="w-full bg-secondary text-white hover:bg-opacity-90 transition-colors rounded-lg px-4 py-2 text-sm"
              onClick={resetSettings}
            >
              {t('accessibility.reset')}
            </button>
          </div>
        </div>
      </div>

      {/* Global accessibility styles */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(1.5);
        }
        
        .grayscale {
          filter: grayscale(1);
        }
      `}</style>
    </>
  );
};

export default AccessibilityWidget;
