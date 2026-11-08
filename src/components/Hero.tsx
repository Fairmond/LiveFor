import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(0);
  const [vw, setVw] = useState(0);

  useEffect(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
    const handleResize = () => {
      setVh(window.innerHeight);
      setVw(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Circle radius starts at 0 and grows to 100vw during the first 80vh of scroll
  // Radius 0 = 0px diameter, Radius 100vw = 200vw diameter
  const circleSize = useTransform(scrollY, [0, vh * 0.8 || 800], [0, (vw || 1440) * 2]);
  const circleOpacity = useTransform(scrollY, [0, (vh * 0.8 || 800) * 0.08, vh * 0.8 || 800], [0, 1, 1]);

  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] h-[100dvh] flex-shrink-0 flex flex-col items-center justify-center pt-[clamp(30px,3.5vh,60px)] pb-4 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
          {/* Fallback if video fails to load */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
        </video>
      </div>

      {/* Main Layout Container */}
      <div className="relative w-full max-w-outer px-4 sm:px-6 flex justify-center translate-y-[10%]">
        <div className="w-full max-w-inner flex flex-col items-center text-center">
          
          {/* Content Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full max-w-2xl mx-auto"
          >
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 font-title text-[clamp(34px,5.37vw,64px)] font-bold text-white mb-[clamp(16px,2.52vw,30px)] leading-[1.12] tracking-tight select-none whitespace-nowrap"
            >
              立刻，预见未来的自己
            </motion.h1>

            {/* Subtitles */}
            <div className="relative z-30 flex flex-col items-center gap-[clamp(2px,0.34vw,4px)] mb-[clamp(28px,5.37vw,64px)] font-brand select-none px-2 max-w-[90vw]">
              <p className="text-[clamp(12px,1.18vw,14px)] text-white/80 font-normal tracking-wide sm:tracking-wider leading-relaxed">
                通过可视化理发指南，帮你的理发体验变得 可控、便捷、高效。
              </p>
              <p className="text-[clamp(12px,1.18vw,14px)] text-white/60 font-normal tracking-wide sm:tracking-wider leading-relaxed">
                真正掌控自己的发型。
              </p>
            </div>

            {/* Liquid Glass Capsule Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex items-center justify-center"
            >
              <button
                type="button"
                onClick={() => {
                  const titleEl = document.getElementById('promo-section-title') || document.querySelector('#promo-section h2');
                  if (titleEl) {
                    const rect = titleEl.getBoundingClientRect();
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const targetY = scrollTop + rect.top - (window.innerHeight - rect.height) / 2;

                    const lenis = (window as any).lenis;
                    if (lenis && typeof lenis.scrollTo === 'function') {
                      // 速度降至 80%：由 1.2s 延展至 1.5s
                      lenis.scrollTo(targetY, { duration: 1.5 });
                    } else {
                      const startY = scrollTop;
                      const diff = Math.max(0, targetY) - startY;
                      const duration = 1500;
                      const startTime = performance.now();
                      const step = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = progress < 0.5 
                          ? 4 * progress * progress * progress 
                          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                        window.scrollTo(0, startY + diff * ease);
                        if (progress < 1) requestAnimationFrame(step);
                      };
                      requestAnimationFrame(step);
                    }
                  } else {
                    const sectionEl = document.getElementById('promo-section');
                    sectionEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="group relative cursor-pointer outline-none border-0 bg-transparent p-0 transition-transform duration-300 hover:scale-105 active:scale-95"
                aria-label="我们改变了什么"
              >
                <img 
                  src="/capsule.png" 
                  alt="我们改变了什么" 
                  className="w-[clamp(240px,21vw,300px)] h-auto object-contain select-none pointer-events-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:brightness-110" 
                />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Growing Blurry Circle - on top of content */}
      <motion.div
        style={{
          width: circleSize,
          height: circleSize,
          opacity: circleOpacity,
          backgroundColor: 'rgb(249, 249, 249)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          x: '-50%',
          y: '50%',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
