import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const wordReveal: Variants = {
  initial: { 
    clipPath: "inset(100% 0 0 0)", 
    y: 20, 
    opacity: 0 
  },
  animate: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const blurReveal: Variants = {
  initial: { 
    filter: "blur(10px)", 
    opacity: 0 
  },
  animate: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};