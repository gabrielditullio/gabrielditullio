import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type Variants,
} from "framer-motion";

// ============================================
// MOTION TOKENS
// ============================================
export const DURATION = {
  fast: 0.15,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.2,
};

export const STAGGER = {
  dense: 0.03,
  standard: 0.06,
  dramatic: 0.12,
};

export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  standard: { type: "spring" as const, stiffness: 200, damping: 25 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  playful: { type: "spring" as const, stiffness: 150, damping: 10 },
};

// ============================================
// VARIANT ENGINE
// ============================================
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...SPRING.standard, duration: DURATION.base },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: SPRING.standard },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: SPRING.standard },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: SPRING.gentle },
};

export const cinematic: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...SPRING.gentle, duration: DURATION.slow },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.standard,
      delayChildren: 0.1,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING.standard,
  },
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  hover: {
    y: -6,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    transition: SPRING.standard,
  },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: SPRING.snappy },
  tap: { scale: 0.97, transition: { duration: DURATION.fast } },
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

/** Scroll-triggered reveal wrapper */
export const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dirs: Record<string, { hidden: object; visible: object }> = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={dirs[direction]}
      transition={{ duration: 0.6, delay, ...SPRING.standard }}
    >
      {children}
    </motion.div>
  );
};

/** Stagger container with InView detection */
export const StaggerContainer = ({
  children,
  staggerDelay = STAGGER.standard,
  className = "",
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
};

/** Word-by-word text reveal */
export const TextReveal = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.3em" }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              delay: delay + i * 0.05,
              ...SPRING.standard,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/** Scroll progress bar */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        background: "hsl(var(--primary))",
        scaleX,
        transformOrigin: "left",
        zIndex: 9999,
      }}
    />
  );
};

/** Film grain overlay for premium texture */
export const GrainOverlay = () => (
  <svg
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 9998,
      opacity: 0.04,
    }}
  >
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

/** Parallax element */
export const ParallaxElement = ({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

/** Number counter with scroll trigger */
export const Counter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true });
  const [count, setCount] = useState(0);

  return (
    <span ref={ref}>
      {prefix}
      <AnimatedNumber target={target} isInView={isInView} duration={duration} />
      {suffix}
    </span>
  );
};

// Internal helper
import { useState, useEffect } from "react";

const AnimatedNumber = ({
  target,
  isInView,
  duration,
}: {
  target: number;
  isInView: boolean;
  duration: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <>{count.toLocaleString()}</>;
};
