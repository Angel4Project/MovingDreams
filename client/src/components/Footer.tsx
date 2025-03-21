import { Link } from 'wouter';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img 
              src="https://i.ibb.co/WvLR6P2/logo.png" 
              alt={t('logoAlt')} 
              className="h-16 mb-4"
            />
            <p className="text-white/80 mb-4">
              {t('footerTagline')}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-white/80 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white/80 hover:text-white transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-white/80 hover:text-white transition">{t('home')}</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-white/80 hover:text-white transition">{t('services')}</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-white/80 hover:text-white transition">{t('about')}</a>
                </Link>
              </li>
              <li>
                <Link href="/#calculator">
                  <a className="text-white/80 hover:text-white transition">{t('priceCalculator')}</a>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <a className="text-white/80 hover:text-white transition">{t('testimonials')}</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-white/80 hover:text-white transition">{t('contact')}</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('ourServices')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('apartmentMoving')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('officeMoving')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('singleItemMoving')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('assemblyServices')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('storageServices')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('packingServices')}</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('serviceAreas')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('telAvivArea')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('jerusalemArea')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('haifaArea')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('beerShevaArea')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('sharonArea')}</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">{t('shfelaArea')}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© {t('allRightsReserved')} {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
