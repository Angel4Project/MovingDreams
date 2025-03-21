import { useLanguage } from '../hooks/useLanguage';

const CTABanner = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 right-0 w-full bg-white shadow-lg py-3 px-4 md:w-auto md:m-4 md:rounded-lg z-40">
      <div className="flex flex-col md:flex-row items-center">
        <div className="text-center md:text-right mb-3 md:mb-0 md:ml-4">
          <p className="font-bold">{t('needMovingServices')}</p>
          <p className="text-sm text-gray-600">{t('happyToHelp')}</p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <a 
            href="tel:0543806524" 
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
          >
            <i className="fas fa-phone-alt ml-2"></i>
            <span>{t('callNow')}</span>
          </a>
          <a 
            href="https://wa.me/972543806524" 
            className="px-4 py-2 bg-[#25D366] text-white rounded-lg flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp ml-2"></i>
            <span>{t('whatsapp')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
