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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };
  
  return (
    <section id="calculator" className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/10 animate-float-slow"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-gold/10 animate-float"></div>
        <div className="absolute top-60 right-40 w-20 h-20 rounded-full bg-secondary/10 animate-float-fast"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-divine mb-4 inline-block relative">
            {t('calculator.title')}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-gold"></div>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Calculator Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-card cosmic-glow rounded-xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-heebo font-bold mb-6 text-divine">
              {t('calculator.details')}
            </h3>
            
            <form className="space-y-6">
              {/* Moving Type */}
              <div className="space-y-3">
                <label className="block font-medium text-divine">
                  {t('calculator.movingType')} <span className="text-primary">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <label className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    watchedValues.movingType === 'apartment' 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="apartment"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-home text-2xl mb-3 text-primary"></i>
                      <div className="text-sm text-divine">הובלת דירה</div>
                    </div>
                    {watchedValues.movingType === 'apartment' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-divine rounded-full p-1 w-6 h-6 flex items-center justify-center animate-pulse-glow">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                  
                  <label className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    watchedValues.movingType === 'office' 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="office"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-building text-2xl mb-3 text-primary"></i>
                      <div className="text-sm text-divine">הובלת משרד</div>
                    </div>
                    {watchedValues.movingType === 'office' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-divine rounded-full p-1 w-6 h-6 flex items-center justify-center animate-pulse-glow">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                  
                  <label className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    watchedValues.movingType === 'singleItem' 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="singleItem"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-couch text-2xl mb-3 text-primary"></i>
                      <div className="text-sm text-divine">פריט בודד</div>
                    </div>
                    {watchedValues.movingType === 'singleItem' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-divine rounded-full p-1 w-6 h-6 flex items-center justify-center animate-pulse-glow">
                        <i className="fas fa-check text-xs"></i>
                      </div>
                    )}
                  </label>
                  
                  <label className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    watchedValues.movingType === 'storage' 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="radio"
                      className="sr-only"
                      value="storage"
                      {...form.register('movingType')}
                    />
                    <div className="text-center">
                      <i className="fas fa-warehouse text-2xl mb-3 text-primary"></i>
                      <div className="text-sm text-divine">אחסון</div>
                    </div>
                    {watchedValues.movingType === 'storage' && (
                      <div className="absolute -top-2 -right-2 bg-primary text-divine rounded-full p-1 w-6 h-6 flex items-center justify-center animate-pulse-glow">
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
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 overflow-hidden"
                >
                  <label className="block font-medium text-divine">
                    {watchedValues.movingType === 'apartment' ? t('calculator.apartmentSize') : t('calculator.officeSize')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className={`text-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                      watchedValues.size === 'small' 
                        ? 'bg-primary/20 border-primary cosmic-glow' 
                        : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                    }`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value="small"
                        {...form.register('size')}
                      />
                      <span className="text-divine">קטן (1-2 חדרים)</span>
                    </label>
                    
                    <label className={`text-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                      watchedValues.size === 'medium' 
                        ? 'bg-primary/20 border-primary cosmic-glow' 
                        : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                    }`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value="medium"
                        {...form.register('size')}
                      />
                      <span className="text-divine">בינוני (3-4 חדרים)</span>
                    </label>
                    
                    <label className={`text-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                      watchedValues.size === 'large' 
                        ? 'bg-primary/20 border-primary cosmic-glow' 
                        : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                    }`}>
                      <input
                        type="radio"
                        className="sr-only"
                        value="large"
                        {...form.register('size')}
                      />
                      <span className="text-divine">גדול (5+ חדרים)</span>
                    </label>
                  </div>
                </motion.div>
              )}
              
              {/* Floor */}
              <div className="space-y-3">
                <label htmlFor="floor" className="block font-medium text-divine">
                  {t('calculator.floor')}
                </label>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <input
                    id="floor"
                    type="number"
                    min="0"
                    max="50"
                    className="w-20 p-3 bg-slate-800 border border-slate-700 rounded-lg text-divine focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    {...form.register('floor')}
                  />
                  <div>
                    <div className="text-sm text-slate-300">
                      {watchedValues.floor === 0 && 'קרקע'}
                      {watchedValues.floor === 1 && 'קומה ראשונה'}
                      {watchedValues.floor === 2 && 'קומה שנייה'}
                      {watchedValues.floor === 3 && 'קומה שלישית'}
                      {watchedValues.floor !== undefined && watchedValues.floor !== null && watchedValues.floor > 3 && `קומה ${watchedValues.floor}`}
                    </div>
                    <div className="text-xs text-primary mt-1">
                      {watchedValues.floor !== undefined && watchedValues.floor !== null && watchedValues.floor > 0 && 'האם יש מעלית שירות?'}
                    </div>
                  </div>
                </div>
                {form.formState.errors.floor && (
                  <p className="text-sm text-primary">{form.formState.errors.floor.message}</p>
                )}
              </div>
              
              {/* Additional Services */}
              <div className="space-y-3">
                <label className="block font-medium text-divine">
                  {t('calculator.additionalServices')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    watchedValues.additionalServices?.includes('packing') 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('packing') || false}
                      onChange={() => handleServiceChange('packing')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex items-center justify-center mr-2 rounded transition-colors ${
                        watchedValues.additionalServices?.includes('packing') 
                          ? 'bg-primary text-divine' 
                          : 'border border-slate-600'
                      }`}>
                        {watchedValues.additionalServices?.includes('packing') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span className="text-divine">{t('calculator.services.packing')}</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    watchedValues.additionalServices?.includes('disassembly') 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('disassembly') || false}
                      onChange={() => handleServiceChange('disassembly')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex items-center justify-center mr-2 rounded transition-colors ${
                        watchedValues.additionalServices?.includes('disassembly') 
                          ? 'bg-primary text-divine' 
                          : 'border border-slate-600'
                      }`}>
                        {watchedValues.additionalServices?.includes('disassembly') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span className="text-divine">{t('calculator.services.disassembly')}</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    watchedValues.additionalServices?.includes('storage') 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('storage') || false}
                      onChange={() => handleServiceChange('storage')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex items-center justify-center mr-2 rounded transition-colors ${
                        watchedValues.additionalServices?.includes('storage') 
                          ? 'bg-primary text-divine' 
                          : 'border border-slate-600'
                      }`}>
                        {watchedValues.additionalServices?.includes('storage') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span className="text-divine">{t('calculator.services.storage')}</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                    watchedValues.additionalServices?.includes('insurance') 
                      ? 'bg-primary/20 border-primary cosmic-glow' 
                      : 'border-slate-700 hover:border-primary/50 bg-slate-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={watchedValues.additionalServices?.includes('insurance') || false}
                      onChange={() => handleServiceChange('insurance')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 flex items-center justify-center mr-2 rounded transition-colors ${
                        watchedValues.additionalServices?.includes('insurance') 
                          ? 'bg-primary text-divine' 
                          : 'border border-slate-600'
                      }`}>
                        {watchedValues.additionalServices?.includes('insurance') && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                      </div>
                      <span className="text-divine">{t('calculator.services.insurance')}</span>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Distance */}
              <div className="space-y-3">
                <label className="block font-medium text-divine">
                  {t('calculator.distance')} <span className="text-primary">*</span>
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-track-cosmic"
                      {...form.register('distance')}
                    />
                    <div 
                      className="absolute top-1 h-0 -mt-1 w-1 bg-primary pointer-events-none z-10"
                      style={{ 
                        left: `${(watchedValues.distance || 1) - 1}%`, 
                        height: '10px', 
                        transform: 'translateX(-50%)',
                        boxShadow: '0 0 10px rgba(37, 99, 235, 0.8)'
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>1 ק"מ</span>
                    <span className="text-divine text-sm font-medium">{watchedValues.distance} ק"מ</span>
                    <span>100 ק"מ</span>
                  </div>
                </div>
                {form.formState.errors.distance && (
                  <p className="text-sm text-primary">{form.formState.errors.distance.message}</p>
                )}
              </div>
              
              {/* Price Estimation */}
              <motion.div 
                className="bg-card border border-slate-700 rounded-xl mt-8 overflow-hidden"
                animate={{ 
                  borderColor: estimatedPrice ? 'rgb(37, 99, 235)' : 'rgb(51, 65, 85)'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-divine">{t('calculator.estimation')}</h4>
                    <motion.div 
                      className="text-2xl font-bold text-gold"
                      key={estimatedPrice || 0}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {estimatedPrice ? `₪${estimatedPrice.toLocaleString()}` : '---'}
                    </motion.div>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{t('calculator.disclaimer')}</div>
                </div>
                
                <div className="p-6">
                  <button
                    type="button"
                    className="w-full btn-3d bg-primary text-divine py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-70 disabled:hover:bg-primary disabled:hover:bg-opacity-100"
                    disabled={!estimatedPrice || saveMutation.isPending}
                    onClick={handleSaveQuote}
                  >
                    {saveMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin ml-2"></i>
                        <span>{t('common.loading')}</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-file-invoice-dollar ml-2"></i>
                        <span>{t('calculator.getQuote')}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </form>
          </motion.div>
          
          {/* 3D Truck Visualization */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className="bg-card cosmic-glow rounded-xl border border-slate-700 overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
              <h3 className="text-2xl font-heebo font-bold text-divine">
                {t('calculator.truck')}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {/* Description based on capacity */}
                {capacity < 30 && t('calculator.capacity.low')}
                {capacity >= 30 && capacity < 70 && t('calculator.capacity.medium')}
                {capacity >= 70 && t('calculator.capacity.high')}
              </p>
            </div>
            
            <div className="flex-1" style={{ minHeight: '400px' }}>
              <TruckModel capacity={capacity} />
            </div>
            
            <div className="p-6 bg-slate-800/50 border-t border-slate-700">
              <div className="mb-2">
                <div className="font-medium mb-1 text-divine">{t('calculator.capacity')}</div>
                <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-gold to-primary rounded-full"
                    initial={{ width: '35%' }}
                    animate={{ width: `${capacity}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>ריק</span>
                <span className="text-divine font-medium">{capacity}%</span>
                <span>מלא</span>
              </div>
              
              <div className="mt-4 grid grid-cols-5 gap-2">
                {/* Boxes representing content, highlighting based on capacity */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const isActive = capacity >= (i + 1) * 20;
                  return (
                    <div 
                      key={i}
                      className={`h-3 rounded-full transition-colors ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary/80 to-gold/80' 
                          : 'bg-slate-700'
                      }`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom CSS for range input is in index.css */}
    </section>
  );
};

export default PriceCalculator;