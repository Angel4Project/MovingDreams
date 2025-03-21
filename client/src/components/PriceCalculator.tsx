import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import TruckModel from '@/components/three/TruckModel';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const PriceCalculator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Form state
  const [movingType, setMovingType] = useState('apartment');
  const [apartmentSize, setApartmentSize] = useState('1');
  const [officeSize, setOfficeSize] = useState('small');
  const [itemType, setItemType] = useState('fridge');
  const [floor, setFloor] = useState(0);
  const [distance, setDistance] = useState(50);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState('₪1,500 - ₪2,200');
  const [truckCapacity, setTruckCapacity] = useState('35%');
  const [truckType, setTruckType] = useState('משאית 12 טון');
  
  // Animation controls
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Update price estimation when form values change
  useEffect(() => {
    updatePrice();
  }, [movingType, apartmentSize, officeSize, itemType, floor, distance, additionalServices]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const toggleAdditionalService = (service: string) => {
    if (additionalServices.includes(service)) {
      setAdditionalServices(additionalServices.filter(s => s !== service));
    } else {
      setAdditionalServices([...additionalServices, service]);
    }
  };

  const updatePrice = () => {
    // Base price calculation
    let basePrice = 1000;
    let maxPrice = 1500;
    
    // Add price based on moving type
    if (movingType === 'apartment') {
      const sizeMultiplier = parseInt(apartmentSize) * 500;
      basePrice += sizeMultiplier;
      maxPrice += sizeMultiplier + 700;
      
      // Floor price
      const floorPrice = floor * 250;
      basePrice += floorPrice;
      maxPrice += floorPrice;
      
      // Update truck capacity based on apartment size
      const capacityValue = 20 + parseInt(apartmentSize) * 15;
      setTruckCapacity(`${capacityValue}%`);
      
      // Update truck type based on apartment size
      if (parseInt(apartmentSize) <= 2) {
        setTruckType('משאית 7 טון');
      } else {
        setTruckType('משאית 12 טון');
      }
    } else if (movingType === 'office') {
      const officeMultipliers: Record<string, number> = {
        small: 1000,
        medium: 2000,
        large: 3500,
        xl: 5000
      };
      
      basePrice += officeMultipliers[officeSize];
      maxPrice += officeMultipliers[officeSize] + 1000;
      
      // Update truck capacity and type
      if (officeSize === 'small') {
        setTruckCapacity('40%');
        setTruckType('משאית 7 טון');
      } else if (officeSize === 'medium') {
        setTruckCapacity('60%');
        setTruckType('משאית 12 טון');
      } else {
        setTruckCapacity('85%');
        setTruckType('משאית 12 טון');
      }
    } else if (movingType === 'item') {
      const itemPrices: Record<string, number> = {
        fridge: 400,
        'washing-machine': 350,
        sofa: 500,
        bed: 450,
        piano: 1200,
        cabinet: 550,
        other: 500
      };
      
      basePrice = itemPrices[itemType];
      maxPrice = basePrice + 200;
      
      // Update truck capacity and type
      setTruckCapacity('15%');
      
      if (itemType === 'piano') {
        setTruckType('משאית 7 טון');
      } else {
        setTruckType('טנדר');
      }
    }
    
    // Distance calculation
    basePrice += distance * 2;
    maxPrice += distance * 3;
    
    // Additional services
    if (additionalServices.includes('packing')) {
      basePrice += 500;
      maxPrice += 800;
    }
    
    if (additionalServices.includes('disassembly')) {
      basePrice += 300;
      maxPrice += 500;
    }
    
    if (additionalServices.includes('storage')) {
      basePrice += 700;
      maxPrice += 1200;
    }
    
    if (additionalServices.includes('insurance')) {
      basePrice += 250;
      maxPrice += 400;
    }
    
    setEstimatedPrice(`₪${basePrice.toLocaleString()} - ₪${maxPrice.toLocaleString()}`);
  };

  const handleGetQuote = async () => {
    try {
      const quoteData = {
        movingType,
        size: movingType === 'apartment' 
          ? apartmentSize 
          : movingType === 'office' 
            ? officeSize 
            : itemType,
        floor,
        distance,
        additionalServices,
        estimatedPrice
      };
      
      await apiRequest('POST', '/api/price-quotes', quoteData);
      
      toast({
        title: t('common.success'),
        description: t('contact.form.success'),
      });
      
      // Scroll to contact section
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : String(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="calculator" className="py-20 bg-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Calculator Form */}
            <div className="p-8">
              <h3 className="text-2xl font-heebo font-bold text-secondary mb-6">{t('calculator.details')}</h3>
              
              <form className="space-y-6">
                {/* Moving Type */}
                <div>
                  <label className="block text-gray-700 font-bold mb-3">{t('calculator.movingType')}</label>
                  <div className="grid grid-cols-3 gap-4">
                    <label 
                      className={`relative bg-light rounded-lg p-4 text-center cursor-pointer transition-all border-2 ${
                        movingType === 'apartment' ? 'border-secondary' : 'border-transparent hover:border-secondary'
                      }`}
                      onClick={() => setMovingType('apartment')}
                    >
                      <input 
                        type="radio" 
                        name="moving-type" 
                        value="apartment" 
                        className="absolute opacity-0" 
                        checked={movingType === 'apartment'}
                        onChange={() => setMovingType('apartment')}
                      />
                      <i className={`fas fa-home text-2xl mb-2 ${movingType === 'apartment' ? 'text-primary' : ''}`}></i>
                      <span className="block text-sm">{t('services.apartment.title')}</span>
                    </label>
                    
                    <label 
                      className={`relative bg-light rounded-lg p-4 text-center cursor-pointer transition-all border-2 ${
                        movingType === 'office' ? 'border-secondary' : 'border-transparent hover:border-secondary'
                      }`}
                      onClick={() => setMovingType('office')}
                    >
                      <input 
                        type="radio" 
                        name="moving-type" 
                        value="office" 
                        className="absolute opacity-0"
                        checked={movingType === 'office'}
                        onChange={() => setMovingType('office')}
                      />
                      <i className={`fas fa-building text-2xl mb-2 ${movingType === 'office' ? 'text-primary' : ''}`}></i>
                      <span className="block text-sm">{t('services.office.title')}</span>
                    </label>
                    
                    <label 
                      className={`relative bg-light rounded-lg p-4 text-center cursor-pointer transition-all border-2 ${
                        movingType === 'item' ? 'border-secondary' : 'border-transparent hover:border-secondary'
                      }`}
                      onClick={() => setMovingType('item')}
                    >
                      <input 
                        type="radio" 
                        name="moving-type" 
                        value="item" 
                        className="absolute opacity-0"
                        checked={movingType === 'item'}
                        onChange={() => setMovingType('item')}
                      />
                      <i className={`fas fa-couch text-2xl mb-2 ${movingType === 'item' ? 'text-primary' : ''}`}></i>
                      <span className="block text-sm">{t('services.singleItem.title')}</span>
                    </label>
                  </div>
                </div>
                
                {/* Apartment Size (shows only if apartment is selected) */}
                {movingType === 'apartment' && (
                  <div>
                    <label className="block text-gray-700 font-bold mb-3">{t('calculator.apartmentSize')}</label>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {['1', '2', '3', '4'].map((size) => (
                        <label 
                          key={size}
                          className={`relative bg-light rounded-lg p-3 text-center cursor-pointer transition-all border-2 ${
                            apartmentSize === size ? 'border-secondary' : 'border-transparent hover:border-secondary'
                          }`}
                          onClick={() => setApartmentSize(size)}
                        >
                          <input 
                            type="radio" 
                            name="apartment-size" 
                            value={size} 
                            className="absolute opacity-0"
                            checked={apartmentSize === size}
                            onChange={() => setApartmentSize(size)}
                          />
                          <span className="block text-lg font-bold">{size === '4' ? '4+' : size}</span>
                          <span className="block text-xs">חדרים</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="bg-light rounded-lg p-4">
                      <label className="block text-gray-700 font-bold mb-2">{t('calculator.floor')}</label>
                      <div className="flex items-center">
                        <button 
                          type="button" 
                          className="bg-white text-primary w-10 h-10 rounded-lg shadow flex items-center justify-center"
                          onClick={() => floor > 0 && setFloor(floor - 1)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-bold">{floor}</span>
                        </div>
                        <button 
                          type="button" 
                          className="bg-white text-primary w-10 h-10 rounded-lg shadow flex items-center justify-center"
                          onClick={() => setFloor(floor + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Office Options */}
                {movingType === 'office' && (
                  <div>
                    <label className="block text-gray-700 font-bold mb-3">{t('calculator.officeSize')}</label>
                    <select 
                      className="w-full bg-light border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                      value={officeSize}
                      onChange={(e) => setOfficeSize(e.target.value)}
                    >
                      <option value="small">קטן (עד 50 מ"ר)</option>
                      <option value="medium">בינוני (50-100 מ"ר)</option>
                      <option value="large">גדול (100-200 מ"ר)</option>
                      <option value="xl">גדול מאוד (200+ מ"ר)</option>
                    </select>
                  </div>
                )}
                
                {/* Single Item Options */}
                {movingType === 'item' && (
                  <div>
                    <label className="block text-gray-700 font-bold mb-3">{t('calculator.itemType')}</label>
                    <select 
                      className="w-full bg-light border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value)}
                    >
                      <option value="fridge">מקרר</option>
                      <option value="washing-machine">מכונת כביסה</option>
                      <option value="sofa">ספה</option>
                      <option value="bed">מיטה</option>
                      <option value="piano">פסנתר</option>
                      <option value="cabinet">ארון</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>
                )}
                
                {/* Additional Services */}
                <div>
                  <label className="block text-gray-700 font-bold mb-3">{t('calculator.additionalServices')}</label>
                  <div className="space-y-3">
                    {[
                      { id: 'packing', label: t('calculator.services.packing'), icon: 'box' },
                      { id: 'disassembly', label: t('calculator.services.disassembly'), icon: 'tools' },
                      { id: 'storage', label: t('calculator.services.storage'), icon: 'warehouse' },
                      { id: 'insurance', label: t('calculator.services.insurance'), icon: 'shield-alt' }
                    ].map((service) => (
                      <label key={service.id} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          name={`service-${service.id}`} 
                          className="form-checkbox hidden"
                          checked={additionalServices.includes(service.id)}
                          onChange={() => toggleAdditionalService(service.id)}
                        />
                        <div 
                          className={`w-6 h-6 border-2 rounded mr-3 flex items-center justify-center transition-colors ${
                            additionalServices.includes(service.id) 
                              ? 'bg-primary border-primary' 
                              : 'border-gray-300 group-hover:border-secondary'
                          }`}
                        >
                          <i 
                            className={`fas fa-check text-white text-sm ${
                              additionalServices.includes(service.id) ? 'opacity-100' : 'opacity-0'
                            }`}
                          ></i>
                        </div>
                        <span>{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Distance */}
                <div>
                  <label className="block text-gray-700 font-bold mb-3">{t('calculator.distance')}</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="1000" 
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span>1</span>
                    <span className="font-bold">{distance} ק"מ</span>
                    <span>1000+</span>
                  </div>
                </div>
              </form>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">{t('calculator.estimation')}</span>
                  <span className="text-2xl font-bold text-primary">{estimatedPrice}</span>
                </div>
                
                <div className="text-sm text-gray-500 mb-6">
                  {t('calculator.disclaimer')}
                </div>
                
                <button 
                  type="button" 
                  className="w-full bg-primary text-white rounded-lg py-4 px-6 text-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg flex items-center justify-center"
                  onClick={handleGetQuote}
                >
                  <span>{t('calculator.getQuote')}</span>
                  <i className="fas fa-arrow-left mr-2"></i>
                </button>
              </div>
            </div>
            
            {/* 3D Truck Visualization */}
            <div className="bg-gray-900 relative">
              <div className="w-full" style={{ minHeight: '600px' }}>
                <TruckModel capacity={parseFloat(truckCapacity)} />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4 flex justify-between items-center">
                <div>
                  <span className="font-bold">{t('calculator.truck')} </span>
                  <span>{truckType}</span>
                </div>
                <div>
                  <span className="font-bold">{t('calculator.capacity')} </span>
                  <span>{truckCapacity}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceCalculator;
