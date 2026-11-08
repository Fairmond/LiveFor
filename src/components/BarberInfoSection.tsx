import React from 'react';
import { motion } from 'motion/react';
import {
  BarberFeatureShowcase,
  BarberFeatureDescModule,
  useBarberFeatureCarousel,
} from './barber-showcase';

export default function BarberInfoSection() {
  const {
    activeState,
    progress,
    currentItem,
    activeCardIndex,
    handleSelectState,
    handleCardSelect,
  } = useBarberFeatureCarousel({ durationMs: 3000 });

  return (
    <section 
      id="barber-info-section"
      className="relative w-full flex justify-center items-center bg-[#f9f9f9] select-none overflow-hidden"
    >
      <div className="@container relative w-[90%] max-w-[1296px] aspect-[1440/700] mx-auto overflow-hidden bg-[#f9f9f9]">
        
        {/* 左侧大标题与下方描述模块：依循 1440x700 画布坐标对齐 */}
        <div 
          id="barber-left-intro-module"
          className="absolute left-[10.49%] top-[31.86%] w-[34%] bottom-[15.14%] flex flex-col justify-between z-10 pointer-events-auto"
        >
          <div>
            {/* 大标题 */}
            <motion.h2 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-[#292929] leading-tight font-['Source_Han_Sans_CN',sans-serif] tracking-tight whitespace-nowrap"
              style={{ fontSize: 'clamp(20px, 2.78cqi, 40px)' }}
            >
              全面、可信的理发师信息。
            </motion.h2>

            {/* 副标题 */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8f8f8f] font-normal leading-[1.6] font-['Source_Han_Sans_CN',sans-serif] tracking-[0.04em]"
              style={{ 
                fontSize: 'clamp(13px, 1.67cqi, 24px)',
                marginTop: 'clamp(8px, 1.4cqi, 20px)'
              }}
            >
              <p>客评与理法专业评审双重信源交叉印证。打造全</p>
              <p>方位可视化评价体系。</p>
            </motion.div>
          </div>

          {/* 功能轮换描述模块：四组对应展示模块的四个同名卡片，3s 周期轮换与纺锤形进度条 */}
          <BarberFeatureDescModule
            activeState={activeState}
            currentItem={currentItem}
            progress={progress}
            onSelectState={handleSelectState}
          />
        </div>

        {/* 右侧展示模块：高度组件化「功能轮换展示组」，联动高亮对应的卡片与投影 (整体向左平移留出适度呼吸边距) */}
        <div 
          id="pc-barber-wheel-display"
          className="absolute right-[4.5%] top-0 w-[48.611%] h-full flex items-center justify-end select-none pointer-events-auto"
        >
          <BarberFeatureShowcase
            activeCardIndex={activeCardIndex}
            onCardSelect={handleCardSelect}
            leftMaskOffset={-24}
            className="w-full h-full aspect-square"
          />
        </div>

      </div>
    </section>
  );
}
