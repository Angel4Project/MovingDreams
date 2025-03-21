import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '../hooks/useLanguage';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="block">
                <img src="https://i.ibb.co/WvLR6P2/logo.png" alt={t('logoAlt')} className="h-14" />
              </a>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse text-lg">
            <Link href="/">
              <a className={`px-3 py-2 rounded-md hover:bg-gray-medium transition ${location === '/' ? 'font-bold' : ''}`}>{t('home')}</a>
            </Link>
            <Link href="/services">
              <a className={`px-3 py-2 rounded-md hover:bg-gray-medium transition ${location === '/services' ? 'font-bold' : ''}`}>{t('services')}</a>
            </Link>
            <Link href="/about">
              <a className={`px-3 py-2 rounded-md hover:bg-gray-medium transition ${location === '/about' ? 'font-bold' : ''}`}>{t('about')}</a>
            </Link>
            <Link href="/testimonials">
              <a className={`px-3 py-2 rounded-md hover:bg-gray-medium transition ${location === '/testimonials' ? 'font-bold' : ''}`}>{t('testimonials')}</a>
            </Link>
            <Link href="/contact">
              <a className={`px-3 py-2 rounded-md hover:bg-gray-medium transition ${location === '/contact' ? 'font-bold' : ''}`}>{t('contact')}</a>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {language === 'he' ? 'עברית' : language === 'en' ? 'English' : language === 'ru' ? 'Русский' : 'العربية'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('he')}>עברית</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ru')}>Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode}
              aria-label={darkMode ? t('lightMode') : t('darkMode')}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <a 
              href="tel:0543806524" 
              className="hidden md:flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-opacity-90 transition"
            >
              <i className="fas fa-phone-alt ml-2"></i>
              <span dir="ltr">054-3806524</span>
            </a>
            
            <Button 
              className="md:hidden" 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/">
                <a className="px-3 py-2 rounded-md hover:bg-gray-medium transition">{t('home')}</a>
              </Link>
              <Link href="/services">
                <a className="px-3 py-2 rounded-md hover:bg-gray-medium transition">{t('services')}</a>
              </Link>
              <Link href="/about">
                <a className="px-3 py-2 rounded-md hover:bg-gray-medium transition">{t('about')}</a>
              </Link>
              <Link href="/testimonials">
                <a className="px-3 py-2 rounded-md hover:bg-gray-medium transition">{t('testimonials')}</a>
              </Link>
              <Link href="/contact">
                <a className="px-3 py-2 rounded-md hover:bg-gray-medium transition">{t('contact')}</a>
              </Link>
            </nav>
            <div className="mt-4">
              <a 
                href="tel:0543806524" 
                className="flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white"
              >
                <i className="fas fa-phone-alt ml-2"></i>
                <span dir="ltr">054-3806524</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
