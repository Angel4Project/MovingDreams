import { Variants } from 'framer-motion';

// Fade in animation with different directions
export const fadeIn = (direction: string, delay: number): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// Scale animation
export const scaleAnimation: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

// Flip card animation
export const flipCard: Variants = {
  front: { rotateY: 0, transition: { duration: 0.6 } },
  back: { rotateY: 180, transition: { duration: 0.6 } }
};

// Service card animation
export const serviceCardAnimation: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

// Truck moving animation
export const truckAnimation: Variants = {
  start: { x: 0, transition: { duration: 0 } },
  move: { 
    x: "70%", 
    transition: { 
      duration: 2,
      ease: "easeInOut"
    }
  },
  return: { 
    x: 0, 
    transition: { 
      duration: 1.5,
      delay: 0.5,
      ease: "easeInOut"
    }
  }
};

// Loading animation variants
export const loadingAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.5 
    }
  }
};

// Stars animation for space loading
export const twinkleAnimation: Variants = {
  dim: { opacity: 0.3, scale: 1 },
  bright: { 
    opacity: 1, 
    scale: 1.2,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Sun growing animation
export const sunGrowAnimation: Variants = {
  initial: { scale: 0 },
  grow: { 
    scale: 10,
    transition: { 
      duration: 4,
      delay: 2,
      ease: "easeInOut"
    }
  }
};

// Float animation for 3D elements
export const floatAnimation: Variants = {
  up: { y: -20 },
  down: { 
    y: 0,
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Text fade in animation for loading screen
export const textFadeInAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1,
      delay: 1
    }
  }
};
