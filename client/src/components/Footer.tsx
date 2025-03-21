import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <svg className="h-12 w-auto" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <text 
                  x="50%" 
                  y="50%" 
                  fontFamily="Arial, sans-serif" 
                  fontSize="24" 
                  fontWeight="bold" 
                  fill="#FFFFFF" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                >
                  אור להובלות
                </text>
              </svg>
            </div>
            <p className="text-sm opacity-80 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-whatsapp text-lg"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heebo font-bold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#calculator" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t('nav.calculator')}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t('nav.testimonials')}
                </a>
              </li>
              <li>
                <a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heebo font-bold mb-4">
              {t('contact.contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 ml-3"></i>
                <div>
                  <div className="font-bold">
                    {t('contact.phone')}
                  </div>
                  <a href="tel:0543806524" className="opacity-80 hover:opacity-100 transition-opacity">
                    054-3806524
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 ml-3"></i>
                <div>
                  <div className="font-bold">
                    {t('contact.email')}
                  </div>
                  <a href="mailto:info@ormoving.co.il" className="opacity-80 hover:opacity-100 transition-opacity">
                    info@ormoving.co.il
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 ml-3"></i>
                <div>
                  <div className="font-bold">
                    {t('contact.address')}
                  </div>
                  <div className="opacity-80">
                    רחוב הרצל 132, תל אביב
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-blue-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm opacity-80">
              {t('footer.copyright').replace('2023', currentYear.toString())}
            </div>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('footer.termsOfUse')}
              </a>
              <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('footer.privacyPolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;