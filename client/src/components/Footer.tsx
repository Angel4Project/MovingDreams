import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <svg 
              className="mb-6 w-40 h-auto" 
              viewBox="0 0 200 80" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <text 
                x="50%" 
                y="50%" 
                fontFamily="Arial, sans-serif" 
                fontSize="30" 
                fontWeight="bold" 
                fill="#FFFFFF" 
                textAnchor="middle" 
                dominantBaseline="middle"
              >
                אור להובלות
              </text>
            </svg>
            
            <p className="text-white text-opacity-80 mb-4">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-heebo font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('nav.home')}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('nav.services')}</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('nav.calculator')}</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('nav.testimonials')}</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('nav.contact')}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-heebo font-bold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('services.apartment.title')}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('services.office.title')}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('services.singleItem.title')}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('services.assembly.title')}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('services.storage.title')}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  <i className="fas fa-chevron-left ml-2"></i>
                  <span>{t('services.packing.title')}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-heebo font-bold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 ml-3"></i>
                <span>054-3806524</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 ml-3"></i>
                <span>info@or-moving.co.il</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 ml-3"></i>
                <span>רחוב האלון 5, הרצליה</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <a href="#contact" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors inline-block">
                <i className="fas fa-paper-plane ml-2"></i>
                <span>{t('contact.sendMessage')}</span>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-white border-opacity-10 mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white text-opacity-60 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </div>
          <div className="flex">
            <a href="#" className="text-white text-opacity-60 text-sm mx-3 hover:text-opacity-100 transition-colors">
              {t('footer.termsOfUse')}
            </a>
            <a href="#" className="text-white text-opacity-60 text-sm mx-3 hover:text-opacity-100 transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
