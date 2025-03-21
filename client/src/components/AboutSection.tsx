import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const AboutSection = () => {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const items = [
    { icon: 'fa-medal', text: t('about.reasons.experience') },
    { icon: 'fa-users', text: t('about.reasons.team') },
    { icon: 'fa-truck-moving', text: t('about.reasons.trucks') },
    { icon: 'fa-hand-holding-usd', text: t('about.reasons.prices') },
    { icon: 'fa-business-time', text: t('about.reasons.availability') }
  ];

  // Customer satisfaction chart data
  const chartData = {
    labels: [
      t('about.stats.satisfaction'),
      t('about.stats.movings'),
      t('about.stats.returningCustomers')
    ],
    datasets: [
      {
        label: '',
        data: [97, 5000, 70],
        backgroundColor: [
          'rgba(227, 6, 19, 0.8)',
          'rgba(31, 61, 153, 0.8)',
          'rgba(255, 215, 0, 0.8)'
        ],
        borderColor: [
          'rgba(227, 6, 19, 1)',
          'rgba(31, 61, 153, 1)',
          'rgba(255, 215, 0, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            if (value === 97) return value + '%';
            if (value === 5000) return value + '+';
            if (value === 70) return value + '%';
            return value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataIndex === 0) return label + context.parsed.y + '%';
              if (context.dataIndex === 1) return label + context.parsed.y + '+';
              if (context.dataIndex === 2) return label + context.parsed.y + '%';
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heebo font-bold text-secondary mb-8">
            {t('about.title')}
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-700">
              {t('about.description2')}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Why Choose Us */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 }
              }
            }}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-2xl font-heebo font-bold text-secondary mb-6">
              {t('about.whyChooseUs')}
            </h3>

            <ul className="space-y-4">
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: 0.3 + index * 0.1 }
                    }
                  }}
                  initial="hidden"
                  animate={controls}
                >
                  <div className="bg-primary text-white p-3 rounded-lg ml-4">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="mt-1">{item.text}</div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Satisfaction Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.4 }
              }
            }}
            initial="hidden"
            animate={controls}
            className="bg-light p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-heebo font-bold text-secondary mb-6 text-center">
              {t('about.satisfaction')}
            </h3>
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Our Fleet */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.6 }
            }
          }}
          initial="hidden"
          animate={controls}
          className="bg-gradient-to-r from-secondary to-secondary/80 text-white p-8 rounded-xl shadow-xl"
        >
          <h3 className="text-2xl font-heebo font-bold mb-4 text-center">
            {t('about.fleet')}
          </h3>
          <p className="text-lg mb-6 text-center">
            {t('about.fleetDescription')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <i className="fas fa-truck-moving text-5xl mb-4"></i>
              <h4 className="text-xl font-bold mb-2">{t('about.truckTypes.large')}</h4>
              <p className="opacity-80">12 טון, מתאים להובלות דירות גדולות ומשרדים</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <i className="fas fa-truck text-5xl mb-4"></i>
              <h4 className="text-xl font-bold mb-2">{t('about.truckTypes.medium')}</h4>
              <p className="opacity-80">7 טון, מתאים להובלות דירות בינוניות</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <i className="fas fa-shuttle-van text-5xl mb-4"></i>
              <h4 className="text-xl font-bold mb-2">{t('about.truckTypes.small')}</h4>
              <p className="opacity-80">מתאים להובלת פריטים בודדים והובלות קטנות</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;