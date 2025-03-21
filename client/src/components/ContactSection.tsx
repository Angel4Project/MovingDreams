import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';

// Contact form schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  phone: z.string().min(9, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  movingType: z.string({ required_error: 'Please select a moving type' }),
  details: z.string().optional().nullable(),
  consentToMarketing: z.boolean().optional().nullable(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { t } = useLanguage();
  const [formSuccess, setFormSuccess] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      preferredDate: '',
      movingType: '',
      details: '',
      consentToMarketing: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setFormSuccess(true);
      form.reset();
      toast({
        title: t('contact.form.success'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('common.error'),
        description: 'There was an error submitting your request. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-heebo font-bold mb-6 text-secondary">
              {t('contact.form.submit')}
            </h3>

            {formSuccess ? (
              <div className="text-center p-8">
                <div className="text-primary text-5xl mb-4">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h4 className="text-xl font-bold mb-2">{t('contact.form.success')}</h4>
                <p className="text-gray-600 mb-6">
                  נציג יצור איתך קשר בהקדם
                </p>
                <button
                  className="bg-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-secondary/90 transition-colors"
                  onClick={() => setFormSuccess(false)}
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  שליחת טופס נוסף
                </button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block font-medium">
                      {t('contact.form.name')} <span className="text-primary">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="ישראל ישראלי"
                      {...form.register('fullName')}
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-sm text-primary">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-medium">
                      {t('contact.form.phone')} <span className="text-primary">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="050-1234567"
                      {...form.register('phone')}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-primary">{form.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-medium">
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="your@email.com"
                      {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-primary">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="preferredDate" className="block font-medium">
                      {t('contact.form.preferredDate')}
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      {...form.register('preferredDate')}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="movingType" className="block font-medium">
                      {t('contact.form.movingType')} <span className="text-primary">*</span>
                    </label>
                    <select
                      id="movingType"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      {...form.register('movingType')}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t('contact.form.selectMovingType')}
                      </option>
                      <option value="apartment">הובלת דירה</option>
                      <option value="office">הובלת משרד</option>
                      <option value="singleItem">הובלת פריט בודד</option>
                      <option value="storage">אחסון</option>
                    </select>
                    {form.formState.errors.movingType && (
                      <p className="text-sm text-primary">{form.formState.errors.movingType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="details" className="block font-medium">
                      {t('contact.form.additionalDetails')}
                    </label>
                    <textarea
                      id="details"
                      rows={4}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={t('contact.form.descriptionPlaceholder')}
                      {...form.register('details')}
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse">
                    <input
                      type="checkbox"
                      id="consentToMarketing"
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                      {...form.register('consentToMarketing')}
                    />
                    <label htmlFor="consentToMarketing" className="text-sm">
                      {t('contact.form.consent')}
                    </label>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors disabled:opacity-70"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <span className="flex items-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        {t('common.loading')}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <i className="fas fa-paper-plane mr-2"></i>
                        {t('contact.form.submit')}
                      </span>
                    )}
                  </button>

                  <a
                    href="https://wa.me/972543806524"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-4 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    {t('contact.form.whatsapp')}
                  </a>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary rounded-xl text-white shadow-lg p-8 h-full"
          >
            <h3 className="text-2xl font-heebo font-bold mb-8">
              {t('contact.contactInfo')}
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary text-white p-3 rounded-lg ml-4">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">{t('contact.phone')}</h4>
                  <p className="opacity-80">
                    <a href="tel:0543806524" className="hover:underline">
                      054-3806524
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary text-white p-3 rounded-lg ml-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">{t('contact.email')}</h4>
                  <p className="opacity-80">
                    <a href="mailto:info@ormoving.co.il" className="hover:underline">
                      info@ormoving.co.il
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary text-white p-3 rounded-lg ml-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">{t('contact.address')}</h4>
                  <p className="opacity-80">
                    רחוב הרצל 132, תל אביב
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary text-white p-3 rounded-lg ml-4">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">{t('contact.workingHours')}</h4>
                  <p className="opacity-80">
                    {t('contact.weekdays')}
                    <br />
                    {t('contact.friday')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-blue-700">
              <div className="text-lg font-bold mb-4">עקבו אחרינו:</div>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="bg-white text-secondary p-3 rounded-full hover:bg-accent transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-white text-secondary p-3 rounded-full hover:bg-accent transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-white text-secondary p-3 rounded-full hover:bg-accent transition-colors">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;