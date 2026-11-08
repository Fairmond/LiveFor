import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

export const MobileFuturePromo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animState, setAnimState] = useState<'idle' | 'entered' | 'exited'>('idle');

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // 1. 入场时机：在这个区域底部出现在屏幕中时 (rect.bottom <= vh)
      // 2. 出场时机：在下方样机就位的同时 (下方样机在 smoothProgress 0.20 就位居中，对应 rect.bottom <= vh * 0.38)
      if (rect.bottom > vh) {
        setAnimState('idle');
      } else if (rect.bottom <= vh * 0.38) {
        setAnimState('exited');
      } else {
        setAnimState('entered');
      }
    };

    handleScrollOrResize();
    const rafId = requestAnimationFrame(handleScrollOrResize);

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  // 入场从上至下出现 (y: -32 -> 0)，出场从下至上消失 (y: 0 -> -32)
  const titleVariants = {
    idle: { opacity: 0, y: -32 },
    entered: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    },
    exited: { 
      opacity: 0, 
      y: -32,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  const descVariants = {
    idle: { opacity: 0, y: -24 },
    entered: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }
    },
    exited: { 
      opacity: 0, 
      y: -24,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative z-30 w-full max-w-[430px] bg-[#f9f9f9] pt-8 xs:pt-10 pb-8 xs:pb-10 px-6 flex flex-col items-center text-center select-none"
    >
      <motion.h2
        initial="idle"
        animate={animState}
        variants={titleVariants}
        className="text-[#2e2e2e] text-[26px] xs:text-[28px] font-extrabold tracking-[0.018em] font-title"
      >
        触手可及的未来
      </motion.h2>
      <motion.div
        initial="idle"
        animate={animState}
        variants={descVariants}
        className="text-[#2e2e2e] text-[15px] sm:text-[16px] leading-[1.65] mt-3.5 font-brand max-w-[340px] tracking-[0.005em] flex flex-col items-center"
      >
        <p>无论你身处何地都能精准对接最适合你的发型方案，</p>
        <p>让一切改变都充满期待。</p>
      </motion.div>
    </section>
  );
};
