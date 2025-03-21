import { useState } from 'react';
import { useLanguage, type Language } from '@/context/LanguageContext';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguageDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  // Close language dropdown when clicking outside
  const handleClickOutside = () => {
    setLanguageDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <svg 
              className="h-14 w-auto" 
              viewBox="0 0 200 80" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <text 
                x="50%" 
                y="50%" 
                fontFamily="Arial, sans-serif" 
                fontSize="30" 
                fontWeight="bold" 
                fill="#E30613" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                אור להובלות
              </text>
            </svg>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse font-heebo font-bold text-secondary">
            <a href="#services" className="hover:text-primary transition-colors">{t('nav.services')}</a>
            <a href="#calculator" className="hover:text-primary transition-colors">{t('nav.calculator')}</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">{t('nav.testimonials')}</a>
            <a href="#contact" className="hover:text-primary transition-colors">{t('nav.contact')}</a>
          </nav>
          
          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative" onClick={handleClickOutside}>
              <button 
                className="flex items-center text-secondary hover:text-primary transition-colors"
                onClick={toggleLanguageDropdown}
              >
                <span className="mr-1">
                  {language === 'he' ? 'עב' : language === 'en' ? 'EN' : language === 'ru' ? 'RU' : 'عر'}
                </span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              
              {languageDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-md mt-2 py-2 w-24 z-20">
                  <button 
                    onClick={() => handleLanguageChange('he')}
                    className="block px-4 py-1 hover:bg-light transition-colors w-full text-right"
                  >
                    עברית
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    className="block px-4 py-1 hover:bg-light transition-colors w-full text-right"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('ru')}
                    className="block px-4 py-1 hover:bg-light transition-colors w-full text-right"
                  >
                    Русский
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('ar')}
                    className="block px-4 py-1 hover:bg-light transition-colors w-full text-right"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
            
            {/* Contact Button */}
            <a 
              href="tel:0543806524" 
              className="hidden md:flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors font-heebo"
            >
              <i className="fas fa-phone-alt mr-2"></i>
              <span>054-3806524</span>
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-secondary hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white shadow-inner ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-3 font-heebo font-bold">
            <a 
              href="#services" 
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </a>
            <a 
              href="#calculator" 
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.calculator')}
            </a>
            <a 
              href="#testimonials" 
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.testimonials')}
            </a>
            <a 
              href="#contact" 
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <a 
              href="tel:0543806524" 
              className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors justify-center"
            >
              <i className="fas fa-phone-alt mr-2"></i>
              <span>054-3806524</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
