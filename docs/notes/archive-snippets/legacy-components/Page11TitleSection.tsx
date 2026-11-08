import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Page11TitleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll animations synchronized with viewport entry
  const opacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.35], [30, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[50vh] sm:h-[75vh] min-h-[260px] sm:min-h-[450px] flex flex-col items-center justify-center bg-brand-bg overflow-hidden select-none"
      id="page-11-title-section"
    >
      {/* Decorative clean radial bloom overlay for ambient lighting */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-brand-bg)_0%,_transparent_100%] pointer-events-none opacity-30" />
      
      <div className="flex flex-col items-center text-center w-full max-w-[90vw] relative z-10 px-4">
        {/* Premium Display Big Title */}
        <motion.h2 
          style={{ opacity, y }}
          className="font-title text-[26px] xs:text-[32px] sm:text-[clamp(28px,4.5vw,58px)] font-bold text-[#1A1A1A] leading-tight tracking-[0.06em] text-center max-w-[1200px]"
        >
          享受理发，就从这里开始
        </motion.h2>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.35, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-4 sm:mt-6 text-[10px] xs:text-[11px] sm:text-[clamp(11px,0.9vw,14px)] tracking-[0.18em] sm:tracking-[0.25em] uppercase font-mono text-[#1A1A1A]"
        >
          ENJOY HAIR CUT FROM THIS MOMENT
        </motion.p>
      </div>
    </section>
  );
}
