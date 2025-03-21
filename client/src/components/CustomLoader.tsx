import { useEffect, useRef } from 'react';
import LoadingAnimation from './3d/LoadingAnimation';

const CustomLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Fade in loading text
    const textTimer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transition = 'opacity 1s';
      }
    }, 1000);

    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div ref={loaderRef} className="fixed top-0 left-0 w-full h-full bg-black z-[9999] flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-full perspective-[1000px]">
        <LoadingAnimation />
      </div>
      <div className="relative z-10">
        <h2 ref={textRef} className="text-white text-3xl font-bold mt-8 opacity-0 text-center">
          האור שלך בקצה ההובלה
        </h2>
      </div>
    </div>
  );
};

export default CustomLoader;
