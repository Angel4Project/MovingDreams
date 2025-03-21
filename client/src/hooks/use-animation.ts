import { useRef, useEffect } from 'react';

interface AnimationOptions {
  duration?: number;
  easing?: (t: number) => number;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
}

type AnimationFunction = (options: AnimationOptions) => void;

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

/**
 * Custom hook for creating animations with requestAnimationFrame
 * @returns Animation control functions
 */
export function useAnimation() {
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Cleanup function to cancel any ongoing animation
  const cancelAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      startTimeRef.current = null;
    }
  };
  
  // Main animation function
  const animate: AnimationFunction = ({
    duration = 1000,
    easing = easings.easeOutCubic,
    onUpdate,
    onComplete,
  }) => {
    // Cancel any ongoing animation
    cancelAnimation();
    
    // Animation loop
    const animationLoop = (timestamp: number) => {
      // Set start time on first frame
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      // Calculate progress (0 to 1)
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);
      const progress = easing(rawProgress);
      
      // Call update callback with current progress
      if (onUpdate) {
        onUpdate(progress);
      }
      
      // Continue animation if not complete
      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animationLoop);
      } else {
        // Animation complete
        animationRef.current = null;
        startTimeRef.current = null;
        
        if (onComplete) {
          onComplete();
        }
      }
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animationLoop);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return cancelAnimation;
  }, []);
  
  return {
    animate,
    cancel: cancelAnimation,
    easings,
  };
}

export default useAnimation;
