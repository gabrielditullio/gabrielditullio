import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// Reusable animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Character-by-character text reveal
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const MotionSection = ({ children, className, delay = 0 }: MotionSectionProps) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

interface MotionDivProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  style?: React.CSSProperties;
}

export const MotionDiv = ({ children, className, variants = fadeUp, delay = 0, style }: MotionDivProps) => (
  <motion.div
    variants={variants}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

// Text that reveals word by word
export const TextReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.span
      variants={staggerContainerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={charReveal}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
