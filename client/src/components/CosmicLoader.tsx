import { useEffect, useRef, useState } from 'react';
import SpaceScene from '@/components/three/SpaceScene';
// Temporarily remove language dependency
// import { useLanguage } from "@/context/LanguageContext";

const CosmicLoader = () => {
  // const { t } = useLanguage();
  const [logoVisible, setLogoVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show logo after delay
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 1500);

    return () => {
      clearTimeout(logoTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      {/* Three.js Space Animation */}
      <SpaceScene />
      
      {/* Company Logo and Tagline */}
      <div 
        className={`relative z-10 text-white text-center transition-opacity duration-1000 ${
          logoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-64 h-auto mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
            <text x="50%" y="50%" fontSize="40" fontWeight="bold" fontFamily="Arial, sans-serif" fill="red" textAnchor="middle" dominantBaseline="middle">אור להובלות</text>
          </svg>
        </div>
        <h2 className="text-2xl font-heebo font-bold">האור שלך בקצה ההובלה</h2>
      </div>
    </div>
  );
};

export default CosmicLoader;
