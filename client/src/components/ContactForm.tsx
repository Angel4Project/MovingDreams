import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Create schema for contact form
const contactFormSchema = z.object({
  name: z.string({
    required_error: "השם הוא שדה חובה",
  }).min(2, { message: "השם חייב להכיל לפחות 2 תווים" }),
  phone: z.string({
    required_error: "מספר הטלפון הוא שדה חובה",
  }).min(9, { message: "מספר הטלפון חייב להכיל לפחות 9 ספרות" }),
  email: z.string().email({ message: "אנא הזן כתובת אימייל תקינה" }).optional().or(z.literal("")),
  serviceType: z.string({
    required_error: "סוג השירות הוא שדה חובה",
  }),
  message: z.string().optional(),
  movingDate: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: "",
      movingDate: new Date().toISOString().split('T')[0]
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: async () => {
      toast({
        title: t('formSubmitted'),
        description: t('formSubmittedDesc'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('errorSubmittingForm'),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Handle form submission
  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-xl">
          <motion.div 
            className="lg:w-1/2 p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">{t('contactTitle')}</h2>
            <p className="text-xl text-gray-600 mb-10">
              {t('contactSubtitle')}
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-800 font-bold mb-2">{t('fullName')}*</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enterName')} {...field} />
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
                        <FormLabel className="block text-gray-800 font-bold mb-2">{t('phone')}*</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enterPhone')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('email')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('enterEmail')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('serviceType')}*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectServiceType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">{t('apartmentMoving')}</SelectItem>
                          <SelectItem value="office">{t('officeMoving')}</SelectItem>
                          <SelectItem value="single">{t('singleItemMoving')}</SelectItem>
                          <SelectItem value="storage">{t('storageServices')}</SelectItem>
                          <SelectItem value="packing">{t('packingServices')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('message')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4} 
                          placeholder={t('describeMoving')} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="movingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-800 font-bold mb-2">{t('estimatedDate')}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    className="px-8 py-4 h-auto rounded-lg bg-primary text-white text-center text-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105 flex-1"
                    disabled={mutation.isPending}
                  >
                    <i className="fas fa-paper-plane ml-2"></i>
                    <span>{mutation.isPending ? t('sending') : t('sendDetails')}</span>
                  </Button>
                  
                  <a 
                    href="https://wa.me/972543806524" 
                    className="px-8 py-4 h-auto rounded-lg bg-[#25D366] text-white text-center text-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105 flex-1 flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp text-xl ml-2"></i>
                    <span>{t('contactWhatsapp')}</span>
                  </a>
                </div>
              </form>
            </Form>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 bg-secondary text-white p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">{t('contactInfo')}</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone-alt text-xl"></i>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold text-lg">{t('phone')}</h4>
                  <p dir="ltr" className="text-xl">
                    <a href="tel:0543806524">054-380-6524</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold text-lg">{t('email')}</h4>
                  <p dir="ltr" className="text-xl">
                    <a href="mailto:info@or-moving.co.il">info@or-moving.co.il</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold text-lg">{t('address')}</h4>
                  <p className="text-xl">{t('companyAddress')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div className="mr-4">
                  <h4 className="font-bold text-lg">{t('businessHours')}</h4>
                  <p className="text-xl">{t('weekdayHours')}</p>
                  <p className="text-xl">{t('fridayHours')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-bold text-lg mb-4">{t('followUs')}</h4>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
