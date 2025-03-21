import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useQuery } from '@tanstack/react-query';

interface Testimonial {
  id: number;
  name: string;
  serviceType: string;
  location: string;
  rating: number;
  content: string;
  details: string;
  imageUrl: string;
}

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Fetch testimonials from API
  const { data: testimonials, isLoading, isError } = useQuery({
    queryKey: ['/api/testimonials'],
    staleTime: 60000, // 1 minute
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {t('testimonialsTitle')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('testimonialsSubtitle')}
          </motion.p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            {t('errorLoadingTestimonials')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <motion.div 
                key={testimonial.id}
                className="h-80 perspective-[1000px]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="testimonial-card h-full w-full relative group">
                  <div className="testimonial-front h-full w-full absolute rounded-xl bg-white p-6 shadow-lg flex flex-col transform transition-transform duration-500 backface-hidden group-hover:rotate-y-180">
                    <div className="flex mb-4">
                      <div className="text-primary">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 flex-1 mb-4">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-medium rounded-full overflow-hidden flex-shrink-0 mr-4">
                        <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.serviceType}, {testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="testimonial-back h-full w-full absolute rounded-xl bg-primary p-6 shadow-lg flex flex-col text-white transform transition-transform duration-500 backface-hidden rotate-y-180 group-hover:rotate-y-0">
                    <h4 className="text-xl font-bold mb-4">{t('movingDetails')}</h4>
                    <ul className="space-y-2 flex-1">
                      {testimonial.details.split(',').map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check-circle mt-1 ml-2"></i>
                          <span>{detail.trim()}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="italic">"
                      {index === 0 ? t('testimonialQuote1') : 
                       index === 1 ? t('testimonialQuote2') :
                       t('testimonialQuote3')}
                    "</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <motion.a 
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary text-white font-bold hover:bg-opacity-90 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span>{t('readMoreTestimonials')}</span>
            <i className="fas fa-arrow-left mr-2"></i>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
