import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import TruckModel from '@/components/three/TruckModel';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';

// Price calculator form schema
const priceCalculatorSchema = z.object({
  movingType: z.string({ required_error: 'Please select a moving type' }),
  size: z.string().optional().nullable(),
  floor: z.coerce.number().min(0).max(50).optional().nullable(),
  distance: z.coerce.number().min(1, { message: 'Distance must be at least 1 km' }),
  additionalServices: z.array(z.string()).optional().nullable(),
});

type PriceCalculatorValues = z.infer<typeof priceCalculatorSchema>;

const PriceCalculator = () => {
  const { t } = useLanguage();
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [capacity, setCapacity] = useState(35); // Default capacity for the 3D truck model
  
  const form = useForm<PriceCalculatorValues>({
    resolver: zodResolver(priceCalculatorSchema),
    defaultValues: {
      movingType: '',
      size: '',
      floor: 0,
      distance: 10,
      additionalServices: [],
    },
  });
  
  const { watch, setValue } = form;
  const watchedValues = watch();
  
  // Update the truck capacity based on form values
  useEffect(() => {
    const { movingType, size, additionalServices } = watchedValues;
    
    let newCapacity = 35; // Default
    
    if (movingType === 'apartment') {
      if (size === 'small') newCapacity = 30;
      else if (size === 'medium') newCapacity = 60;
      else if (size === 'large') newCapacity = 90;
    } else if (movingType === 'office') {
      if (size === 'small') newCapacity = 40;
      else if (size === 'medium') newCapacity = 70;
      else if (size === 'large') newCapacity = 95;
    } else if (movingType === 'singleItem') {
      newCapacity = 15;
    }
    
    // Add more if packing services selected
    if (additionalServices && additionalServices.includes('packing')) {
      newCapacity = Math.min(newCapacity + 15, 100);
    }
    
    setCapacity(newCapacity);
  }, [watchedValues]);
  
  // Calculate estimated price
  useEffect(() => {
    const { movingType, size, floor, distance, additionalServices } = watchedValues;
    
    if (!movingType || !distance) {
      setEstimatedPrice(null);
      return;
    }
    
    let basePrice = 0;
    
    // Base price by moving type and size
    if (movingType === 'apartment') {
      if (size === 'small') basePrice = 1500;
      else if (size === 'medium') basePrice = 2500;
      else if (size === 'large') basePrice = 3500;
    } else if (movingType === 'office') {
      if (size === 'small') basePrice = 2000;
      else if (size === 'medium') basePrice = 3500;
      else if (size === 'large') basePrice = 5000;
    } else if (movingType === 'singleItem') {
      basePrice = 600;
    } else if (movingType === 'storage') {
      basePrice = 800;
    }
    
    // Add distance cost
    const distanceCost = Math.max(0, distance - 15) * 10; // First 15km free, then 10 per km
    
    // Add floor cost
    let floorCost = 0;
    if (floor && floor > 0) {
      if (floor <= 2) floorCost = floor * 100;
      else floorCost = 200 + (floor - 2) * 150; // 100 per floor up to 2nd floor, then 150 per floor
    }
    
    // Add costs for additional services
    let additionalCost = 0;
    if (additionalServices && additionalServices.length > 0) {
      if (additionalServices.includes('packing')) additionalCost += 500;
      if (additionalServices.includes('disassembly')) additionalCost += 300;
      if (additionalServices.includes('storage')) additionalCost += 800;
      if (additionalServices.includes('insurance')) additionalCost += 200;
    }
    
    // Calculate total
    const total = basePrice + distanceCost + floorCost + additionalCost;
    setEstimatedPrice(total);
  }, [watchedValues]);
  
  // Handle service checkboxes
  const handleServiceChange = (service: string) => {
    const currentServices = form.getValues('additionalServices') || [];
    
    if (currentServices.includes(service)) {
      setValue(
        'additionalServices',
        currentServices.filter(s => s !== service)
      );
    } else {
      setValue('additionalServices', [...currentServices, service]);
    }
  };
  
  // Save quote to server
  const saveMutation = useMutation({
    mutationFn: async (data: PriceCalculatorValues & { estimatedPrice: string }) => {
      return await apiRequest('/api/price-quotes', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: 'הצעת המחיר נשמרה בהצלחה',
        description: 'נשלח אליך אימייל עם פרטי ההצעה',
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('common.error'),
        description: 'לא ניתן היה לשמור את הצעת המחיר. אנא נסה שנית.',
        variant: 'destructive',
      });
    },
  });
  
  const handleSaveQuote = () => {
    if (estimatedPrice) {
      saveMutation.mutate({
        ...form.getValues(),
        estimatedPrice: estimatedPrice.toString(),
      });
    }
  };
  
  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-white to-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-heebo font-bold mb-6 text-secondary">
              {t('calculator.details')}
            </h3>
            
            <form className="space-y-6">
              {/* Moving Type */}
              <div className="space-y-2">
                <label className="block font-medium">
                  {t('calculator.movingType')} <span className="text-primary">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <label className={`relative border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.movingType === 'apartment' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="apartment"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-home text-2xl mb-2 text-secondary"></i>
                      <div className="text-sm">הובלת דירה</div>
                    </div>
                    {watchedValues.movingType === 'apartment' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                  
                  <label className={`relative border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.movingType === 'office' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="office"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-building text-2xl mb-2 text-secondary"></i>
                      <div className="text-sm">הובלת משרד</div>
                    </div>
                    {watchedValues.movingType === 'office' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                  
                  <label className={`relative border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.movingType === 'singleItem' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="singleItem"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-couch text-2xl mb-2 text-secondary"></i>
                      <div className="text-sm">פריט בודד</div>
                    </div>
                    {watchedValues.movingType === 'singleItem' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                  
                  <label className={`relative border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.movingType === 'storage' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="storage"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-warehouse text-2xl mb-2 text-secondary"></i>
                      <div className="text-sm">אחסון</div>
                    </div>
                    {watchedValues.movingType === 'storage' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                </div>
                {form.formState.errors.movingType && (
                  <p className="text-sm text-primary">{form.formState.errors.movingType.message}</p>
                )}
              </div>
              
              {/* Size - only show for apartment or office */}
              {(watchedValues.movingType === 'apartment' || watchedValues.movingType === 'office') && (
                <div className="space-y-2">
                  <label className="block font-medium">
                    {watchedValues.movingType === 'apartment' ? t('calculator.apartmentSize') : t('calculator.officeSize')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className={`text-center border rounded-lg p-2 cursor-pointer transition-colors ${
                      watchedValues.size === 'small' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                    }`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value="small"
                        {...form.register('size')}
                      />
                      <span>קטן (1-2 חדרים)</span>
                    </label>
                    
                    <label className={`text-center border rounded-lg p-2 cursor-pointer transition-colors ${
                      watchedValues.size === 'medium' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                    }`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value="medium"
                        {...form.register('size')}
                      />
                      <span>בינוני (3-4 חדרים)</span>
                    </label>
                    
                    <label className={`text-center border rounded-lg p-2 cursor-pointer transition-colors ${
                      watchedValues.size === 'large' ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                    }`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value="large"
                        {...form.register('size')}
                      />
                      <span>גדול (5+ חדרים)</span>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Floor */}
              <div className="space-y-2">
                <label htmlFor="floor" className="block font-medium">
                  {t('calculator.floor')}
                </label>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <input
                    id="floor"
                    type="number"
                    min="0"
                    max="50"
                    className="w-20 p-2 border rounded-lg"
                    {...form.register('floor')}
                  />
                  <div>
                    <div className="text-sm text-gray-600">
                      {watchedValues.floor === 0 && 'קרקע'}
                      {watchedValues.floor === 1 && 'קומה ראשונה'}
                      {watchedValues.floor === 2 && 'קומה שנייה'}
                      {watchedValues.floor === 3 && 'קומה שלישית'}
                      {watchedValues.floor && watchedValues.floor > 3 && `קומה ${watchedValues.floor}`}
                    </div>
                    <div className="text-xs text-secondary">
                      {watchedValues.floor && watchedValues.floor > 0 && 'האם יש מעלית שירות?'}
                    </div>
                  </div>
                </div>
                {form.formState.errors.floor && (
                  <p className="text-sm text-primary">{form.formState.errors.floor.message}</p>
                )}
              </div>
              
              {/* Additional Services */}
              <div className="space-y-2">
                <label className="block font-medium">
                  {t('calculator.additionalServices')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.additionalServices?.includes('packing') ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('packing') || false}
                      onChange={() => handleServiceChange('packing')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                        watchedValues.additionalServices?.includes('packing') ? 'bg-primary border-primary text-white' : 'border-gray-400'
                      }`}>
                        {watchedValues.additionalServices?.includes('packing') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span>{t('calculator.services.packing')}</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.additionalServices?.includes('disassembly') ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('disassembly') || false}
                      onChange={() => handleServiceChange('disassembly')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                        watchedValues.additionalServices?.includes('disassembly') ? 'bg-primary border-primary text-white' : 'border-gray-400'
                      }`}>
                        {watchedValues.additionalServices?.includes('disassembly') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span>{t('calculator.services.disassembly')}</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.additionalServices?.includes('storage') ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('storage') || false}
                      onChange={() => handleServiceChange('storage')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                        watchedValues.additionalServices?.includes('storage') ? 'bg-primary border-primary text-white' : 'border-gray-400'
                      }`}>
                        {watchedValues.additionalServices?.includes('storage') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span>{t('calculator.services.storage')}</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-colors ${
                    watchedValues.additionalServices?.includes('insurance') ? 'bg-primary/10 border-primary' : 'hover:bg-light'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('insurance') || false}
                      onChange={() => handleServiceChange('insurance')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                        watchedValues.additionalServices?.includes('insurance') ? 'bg-primary border-primary text-white' : 'border-gray-400'
                      }`}>
                        {watchedValues.additionalServices?.includes('insurance') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span>{t('calculator.services.insurance')}</span>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Distance */}
              <div className="space-y-2">
                <label htmlFor="distance" className="block font-medium">
                  {t('calculator.distance')} <span className="text-primary">*</span>
                </label>
                <div>
                  <input
                    id="distance"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    {...form.register('distance')}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1 ק"מ</span>
                    <span>{watchedValues.distance} ק"מ</span>
                    <span>100 ק"מ</span>
                  </div>
                </div>
                {form.formState.errors.distance && (
                  <p className="text-sm text-primary">{form.formState.errors.distance.message}</p>
                )}
              </div>
              
              {/* Price Estimation */}
              <div className="bg-secondary text-white p-6 rounded-xl mt-8">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-bold">{t('calculator.estimation')}</h4>
                  <div className="text-2xl font-bold">
                    {estimatedPrice ? `₪${estimatedPrice.toLocaleString()}` : '---'}
                  </div>
                </div>
                <div className="text-sm opacity-70">{t('calculator.disclaimer')}</div>
                
                <button
                  type="button"
                  className="mt-4 w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-70"
                  disabled={!estimatedPrice || saveMutation.isPending}
                  onClick={handleSaveQuote}
                >
                  {saveMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>{t('common.loading')}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-file-invoice-dollar"></i>
                      <span>{t('calculator.getQuote')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* 3D Truck Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b">
              <h3 className="text-2xl font-heebo font-bold text-secondary">
                {t('calculator.truck')}
              </h3>
            </div>
            
            <div className="flex-1" style={{ minHeight: '400px' }}>
              <TruckModel capacity={capacity} />
            </div>
            
            <div className="p-6 bg-light border-t">
              <div className="mb-2">
                <div className="font-medium mb-1">{t('calculator.capacity')}</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full"
                    style={{ width: `${capacity}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>0%</span>
                <span>{capacity}%</span>
                <span>100%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;