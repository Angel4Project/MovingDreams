import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "שם מלא חייב להכיל לפחות 2 תווים" }),
  phone: z.string().min(9, { message: "מספר טלפון לא תקין" }),
  email: z.string().email({ message: "אימייל לא תקין" }).optional().or(z.literal('')),
  preferredDate: z.string().optional(),
  movingType: z.string().min(1, { message: "יש לבחור סוג הובלה" }),
  details: z.string().optional(),
  consentToMarketing: z.boolean().default(false)
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const [refLeft, inViewLeft] = useInView({ threshold: 0.2, triggerOnce: true });
  const [refRight, inViewRight] = useInView({ threshold: 0.2, triggerOnce: true });

  // Initialize the form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      preferredDate: "",
      movingType: "",
      details: "",
      consentToMarketing: false
    }
  });

  // Animation controls
  if (inViewLeft) controlsLeft.start('visible');
  if (inViewRight) controlsRight.start('visible');

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/leads', data);
      
      toast({
        title: t('common.success'),
        description: t('contact.form.success'),
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : String(error),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-5 rounded-full -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-32 -mb-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div 
            ref={refLeft}
            variants={variants}
            initial="hidden"
            animate={controlsLeft}
            className="bg-light rounded-xl shadow-lg p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-700 font-bold mb-2">
                          {t('contact.form.name')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="הכנס את שמך המלא" 
                            className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-700 font-bold mb-2">
                          {t('contact.form.phone')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="הכנס את מספר הטלפון" 
                            className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-700 font-bold mb-2">
                          {t('contact.form.email')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="הכנס את כתובת האימייל" 
                            className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                            type="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-700 font-bold mb-2">
                          {t('contact.form.preferredDate')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="movingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 font-bold mb-2">
                        {t('contact.form.movingType')}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors">
                            <SelectValue placeholder={t('contact.form.selectMovingType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">הובלת דירה</SelectItem>
                          <SelectItem value="office">הובלת משרד</SelectItem>
                          <SelectItem value="single-item">הובלת פריט בודד</SelectItem>
                          <SelectItem value="storage">אחסנה</SelectItem>
                          <SelectItem value="packing">אריזה</SelectItem>
                          <SelectItem value="other">אחר</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 font-bold mb-2">
                        {t('contact.form.additionalDetails')}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t('contact.form.descriptionPlaceholder')} 
                          className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consentToMarketing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-3"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          {t('contact.form.consent')}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg flex items-center"
                  >
                    <i className="fas fa-paper-plane ml-2"></i>
                    <span>{t('contact.form.submit')}</span>
                  </Button>
                  
                  <a 
                    href="https://wa.me/972543806524" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg flex items-center"
                  >
                    <i className="fab fa-whatsapp ml-2 text-xl"></i>
                    <span>{t('contact.form.whatsapp')}</span>
                  </a>
                </div>
              </form>
            </Form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            ref={refRight}
            variants={rightVariants}
            initial="hidden"
            animate={controlsRight}
          >
            <div className="bg-secondary text-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-heebo font-bold mb-6">{t('contact.contactInfo')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{t('contact.phone')}</h4>
                    <p className="text-white text-opacity-90">054-3806524</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{t('contact.email')}</h4>
                    <p className="text-white text-opacity-90">info@or-moving.co.il</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{t('contact.address')}</h4>
                    <p className="text-white text-opacity-90">רחוב האלון 5, הרצליה</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{t('contact.workingHours')}</h4>
                    <p className="text-white text-opacity-90">{t('contact.weekdays')}</p>
                    <p className="text-white text-opacity-90">{t('contact.friday')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl shadow-lg overflow-hidden h-64 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108169.95860222106!2d34.7437874!3d32.085244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a2c0963f90!2z15TXqNeaXFx1MDA1ZteZ15k!5e0!3m2!1siw!2sil!4v1624784792044!5m2!1siw!2sil" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="מפת מיקום"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
