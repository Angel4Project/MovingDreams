import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import TruckModel from './3d/TruckModel';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Create schema based on expected quote data
const calculatorSchema = z.object({
  movingType: z.enum(["apartment", "office", "single-item"], {
    required_error: "סוג ההובלה הוא שדה חובה",
  }),
  rooms: z.string().optional(),
  itemType: z.string().optional(),
  origin: z.string({
    required_error: "כתובת המוצא היא שדה חובה",
  }).min(3, { message: "כתובת המוצא חייבת להכיל לפחות 3 תווים" }),
  destination: z.string({
    required_error: "כתובת היעד היא שדה חובה",
  }).min(3, { message: "כתובת היעד חייבת להכיל לפחות 3 תווים" }),
  movingDate: z.string({
    required_error: "תאריך ההובלה הוא שדה חובה",
  }),
  includePacking: z.boolean().default(false),
  includeAssembly: z.boolean().default(false),
  includeStorage: z.boolean().default(false),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

const PriceCalculator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<{ 
    basePrice: number;
    additionalServices: number;
    distancePrice: number;
    totalPrice: number;
  }>({
    basePrice: 1500,
    additionalServices: 0,
    distancePrice: 300,
    totalPrice: 1800
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      movingType: "apartment",
      rooms: "3",
      origin: "",
      destination: "",
      movingDate: new Date().toISOString().split('T')[0],
      includePacking: false,
      includeAssembly: false,
      includeStorage: false
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (data: CalculatorFormValues) => {
      return apiRequest("POST", "/api/price-quote", data);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setEstimatedPrice({
        basePrice: Math.floor(data.data.estimatedPrice * 0.7),
        additionalServices: calculateAdditionalServices(form.getValues()),
        distancePrice: 300,
        totalPrice: data.data.estimatedPrice
      });
      
      toast({
        title: t('priceCalculated'),
        description: t('priceCalculatedDesc'),
      });
    },
    onError: (error) => {
      toast({
        title: t('errorCalculatingPrice'),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Calculate additional services cost
  const calculateAdditionalServices = (values: CalculatorFormValues) => {
    let total = 0;
    if (values.includePacking) total += 500;
    if (values.includeAssembly) total += 400;
    if (values.includeStorage) total += 800;
    return total;
  };

  // Watch the moving type to show/hide relevant fields
  const movingType = form.watch("movingType");

  // Handle form submission
  const onSubmit = async (values: CalculatorFormValues) => {
    setIsAnimating(true);
    
    // Start the truck animation
    setTimeout(() => {
      mutation.mutate(values);
      
      // End animation after 4 seconds
      setTimeout(() => {
        setIsAnimating(false);
      }, 4000);
    }, 500);
  };

  // Handle WhatsApp sharing
  const handleWhatsAppShare = () => {
    const values = form.getValues();
    const movingTypeLabel = values.movingType === 'apartment' 
      ? t('apartment')
      : values.movingType === 'office' 
        ? t('office') 
        : t('singleItem');

    let message = `${t('whatsappQuoteMessage')}\n`;
    message += `${t('movingType')}: ${movingTypeLabel}\n`;
    message += `${t('origin')}: ${values.origin}\n`;
    message += `${t('destination')}: ${values.destination}\n`;
    message += `${t('movingDate')}: ${values.movingDate}\n`;
    message += `${t('estimatedPrice')}: ₪${estimatedPrice.totalPrice}\n`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/972543806524?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="calculator" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {t('calculatorTitle')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('calculatorSubtitle')}
          </motion.p>
        </div>
        
        <motion.div 
          className="flex flex-col lg:flex-row bg-gray-light rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="lg:w-1/2 p-8">
            <h3 className="text-2xl font-bold mb-6">{t('movingDetails')}</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="movingType"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('movingType')}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div className="relative">
                            <RadioGroupItem value="apartment" id="apartment" className="hidden peer" />
                            <label 
                              htmlFor="apartment" 
                              className="block p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/10 text-center"
                            >
                              <i className="fas fa-home text-2xl mb-2"></i>
                              <div>{t('apartment')}</div>
                            </label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="office" id="office" className="hidden peer" />
                            <label 
                              htmlFor="office" 
                              className="block p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/10 text-center"
                            >
                              <i className="fas fa-building text-2xl mb-2"></i>
                              <div>{t('office')}</div>
                            </label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="single-item" id="single-item" className="hidden peer" />
                            <label 
                              htmlFor="single-item" 
                              className="block p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/10 text-center"
                            >
                              <i className="fas fa-couch text-2xl mb-2"></i>
                              <div>{t('singleItem')}</div>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {movingType === "apartment" && (
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="block text-gray-800 font-bold mb-2">{t('apartmentSize')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectRooms')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 {t('room')}</SelectItem>
                            <SelectItem value="2">2 {t('rooms')}</SelectItem>
                            <SelectItem value="3">3 {t('rooms')}</SelectItem>
                            <SelectItem value="4">4 {t('rooms')}</SelectItem>
                            <SelectItem value="5">5 {t('rooms')}</SelectItem>
                            <SelectItem value="6+">6+ {t('rooms')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {movingType === "single-item" && (
                  <FormField
                    control={form.control}
                    name="itemType"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="block text-gray-800 font-bold mb-2">{t('itemType')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectItemType')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="furniture">{t('furniture')}</SelectItem>
                            <SelectItem value="appliance">{t('appliance')}</SelectItem>
                            <SelectItem value="piano">{t('piano')}</SelectItem>
                            <SelectItem value="safe">{t('safe')}</SelectItem>
                            <SelectItem value="other">{t('other')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('origin')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('enterOrigin')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('destination')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('enterDestination')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="movingDate"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('movingDate')}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="mb-6">
                  <FormLabel className="block text-gray-800 font-bold mb-2">{t('additionalServices')}</FormLabel>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="includePacking"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="packing"
                              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                          </FormControl>
                          <FormLabel htmlFor="packing" className="mr-2">
                            {t('packingServices')}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="includeAssembly"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="assembly"
                              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                          </FormControl>
                          <FormLabel htmlFor="assembly" className="mr-2">
                            {t('assemblyServices')}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="includeStorage"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="storage"
                              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                          </FormControl>
                          <FormLabel htmlFor="storage" className="mr-2">
                            {t('storageServices')}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    className="px-8 py-4 h-auto rounded-lg bg-primary text-white text-center text-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105 flex-1"
                    disabled={mutation.isPending || isAnimating}
                  >
                    {mutation.isPending ? t('calculating') : t('calculatePrice')}
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleWhatsAppShare}
                    className="px-8 py-4 h-auto rounded-lg bg-secondary text-white text-center text-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105 flex-1"
                    disabled={mutation.isPending || isAnimating}
                  >
                    {t('sendToWhatsApp')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="lg:w-1/2 bg-secondary text-white p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-6">{t('movingSimulation')}</h3>
            
            <div className="truck-container flex-1 relative mb-6 bg-[rgba(255,255,255,0.1)] rounded-xl p-4">
              <TruckModel isAnimating={isAnimating} />
            </div>
            
            <div className="bg-[rgba(255,255,255,0.2)] p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-4">{t('priceEstimate')}</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('basePrice')}:</span>
                  <span id="base-price">₪{estimatedPrice.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('additionalServices')}:</span>
                  <span id="additional-services">₪{estimatedPrice.additionalServices.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('distance')}:</span>
                  <span id="distance-price">₪{estimatedPrice.distancePrice.toLocaleString()}</span>
                </div>
                <div className="h-px bg-white opacity-30 my-2"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>{t('total')}:</span>
                  <span id="total-price">₪{estimatedPrice.totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 text-sm opacity-80">
                * {t('priceDisclaimer')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceCalculator;
