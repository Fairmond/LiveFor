import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  BarberFeatureShowcase,
  BarberFeatureDescModule,
  useBarberFeatureCarousel,
} from '../barber-showcase';

export default function MobileBarberInfoSection() {
  const {
    activeState,
    progress,
    currentItem,
    activeCardIndex,
    handleSelectState,
    handleCardSelect,
  } = useBarberFeatureCarousel({ durationMs: 3000 });

  const titleRef = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (!titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // 入场时机：再延后一个身位（共延后两个身位，rect.bottom <= vh - bodyHeight * 2）原地渐显
      const bodyHeight = rect.height || 80;
      if (rect.bottom <= vh - bodyHeight * 2) {
        setIsEntered(true);
      } else {
        setIsEntered(false);
      }
    };

    handleScrollOrResize();
    const rafId = requestAnimationFrame(handleScrollOrResize);

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  return (
    <section
      id="mobile-barber-info-section"
      className="w-full max-w-[520px] flex flex-col items-center select-none bg-[#f9f9f9] pt-16 xs:pt-20 pb-16 xs:pb-24 overflow-hidden px-4"
    >
      {/* 1. 顶部文字 (标题组) */}
      <div ref={titleRef} className="w-full px-4 xs:px-6 pt-2 pb-2 text-left">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: isEntered ? 1 : 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(22px,6vw,26px)] font-bold text-[#292929] leading-tight tracking-[0.04em] font-['SourceHanSansCN-Bold','Source_Han_Sans_CN',sans-serif]"
        >
          全面、可信的理发师信息。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isEntered ? 1 : 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 text-[clamp(12px,3.6vw,14px)] font-normal text-[#8f8f8f] leading-relaxed tracking-[0.04em] font-['SourceHanSansCN-Regular','Source_Han_Sans_CN',sans-serif]"
        >
          客评与理法专业评审双重信源交叉印证。打造全方位可视化评价体系。
        </motion.p>
      </div>

      {/* 2. 核心展示模块：自适应宽度居中展示，与下方描述组实时联动 */}
      <div className="w-full flex justify-center items-center mt-6 xs:mt-8 mb-4 xs:mb-6 select-none overflow-hidden px-2">
        <div className="w-full max-w-[385px] aspect-square flex items-center justify-center shrink-0">
          <BarberFeatureShowcase
            activeCardIndex={activeCardIndex}
            onCardSelect={handleCardSelect}
            isMobile={true}
            className="w-full h-full aspect-square"
          />
        </div>
      </div>

      {/* 3. 移动端功能轮换描述模块：位于展示模块正下方，四组分别对应四个同名卡片，3s 周期轮换与纺锤形进度条 */}
      <div className="w-full px-7 text-left mt-2">
        <BarberFeatureDescModule
          activeState={activeState}
          currentItem={currentItem}
          progress={progress}
          onSelectState={handleSelectState}
          isMobile={true}
        />
      </div>
    </section>
  );
}
