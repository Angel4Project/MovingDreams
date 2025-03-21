import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AboutSection = () => {
  const { t } = useLanguage();
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const [refLeft, inViewLeft] = useInView({ threshold: 0.2, triggerOnce: true });
  const [refRight, inViewRight] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inViewLeft) controlsLeft.start('visible');
    if (inViewRight) controlsRight.start('visible');
  }, [controlsLeft, controlsRight, inViewLeft, inViewRight]);

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

  // Chart data
  const chartData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: t('about.satisfaction'),
        data: [92, 94, 95, 97, 97, 98],
        fill: true,
        backgroundColor: 'rgba(227, 6, 19, 0.1)',
        borderColor: '#E30613',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 85,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={refLeft}
            variants={variants}
            initial="hidden"
            animate={controlsLeft}
          >
            <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-6">{t('about.title')}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {t('about.description2')}
            </p>
            
            <div className="bg-light rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-heebo font-bold text-primary mb-4">{t('about.whyChooseUs')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 ml-3"></i>
                  <span>{t('about.reasons.experience')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 ml-3"></i>
                  <span>{t('about.reasons.team')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 ml-3"></i>
                  <span>{t('about.reasons.trucks')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 ml-3"></i>
                  <span>{t('about.reasons.prices')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 ml-3"></i>
                  <span>{t('about.reasons.availability')}</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            ref={refRight}
            variants={rightVariants}
            initial="hidden"
            animate={controlsRight}
          >
            <div className="bg-light rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-heebo font-bold text-secondary mb-6 text-center">{t('about.satisfaction')}</h3>
              
              <div className="mb-8 h-64 relative">
                <Chart type="line" data={chartData} options={chartOptions} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-gray-600">{t('about.stats.satisfaction')}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-3xl font-bold text-primary mb-2">4,500+</div>
                  <div className="text-sm text-gray-600">{t('about.stats.movings')}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-3xl font-bold text-primary mb-2">750+</div>
                  <div className="text-sm text-gray-600">{t('about.stats.returningCustomers')}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-secondary rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary opacity-10 rounded-full -ml-10 -mb-10"></div>
              
              <h3 className="text-xl font-heebo font-bold mb-4 relative">{t('about.fleet')}</h3>
              <p className="mb-4 relative">{t('about.fleetDescription')}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
                <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                  <i className="fas fa-truck text-2xl mb-2"></i>
                  <div className="text-sm">{t('about.truckTypes.large')}</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                  <i className="fas fa-truck-moving text-2xl mb-2"></i>
                  <div className="text-sm">{t('about.truckTypes.medium')}</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                  <i className="fas fa-shuttle-van text-2xl mb-2"></i>
                  <div className="text-sm">{t('about.truckTypes.small')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
