import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin signal-coloured reading-progress line at the very top of the page. */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[hsl(var(--signal))]"
      style={{ scaleX }}
    />
  );
};
