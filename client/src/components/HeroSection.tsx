import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import * as THREE from 'three';

const HeroSection = () => {
  const { t, dir } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Set up Three.js background effect
    const container = heroRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Add some particles for a gentle background effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(dir === 'rtl' ? 0x1F3D99 : 0xE30613),
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop
    const animate = () => {
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [dir]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        delay: custom * 0.2 
      } 
    })
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-right">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-heebo font-black text-primary mb-6 leading-tight"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-secondary mb-8 font-rubik"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <a 
                href="#calculator" 
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg"
              >
                {t('hero.cta')}
              </a>
              <a 
                href="#services" 
                className="bg-white text-secondary border-2 border-secondary px-8 py-4 rounded-lg text-lg font-bold hover:bg-secondary hover:text-white transition-colors"
              >
                {t('hero.secondaryCta')}
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <img 
              src="https://images.unsplash.com/photo-1630565945886-dc8fda16ae59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bW92aW5nIHRydWNrc3x8fHx8fDE2NDI3NjgxNTk&ixlib=rb-1.2.1&q=80&w=600" 
              alt="משאית הובלה של אור להובלות" 
              className="rounded-xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-5 -left-5 bg-accent text-secondary py-3 px-6 rounded-lg shadow-lg font-heebo font-bold transform rotate-2">
              <div className="flex items-center">
                <i className="fas fa-star mr-2"></i>
                <span>{t('hero.tagline')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
