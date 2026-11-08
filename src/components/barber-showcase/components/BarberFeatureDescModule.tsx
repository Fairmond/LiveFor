import React, { useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TalentMark, HairstyleMark, ValueMark, QuarterMark } from '../../BarberMarkIcons';
import type { FeatureDescItem } from '../hooks/useBarberFeatureCarousel';

export interface BarberFeatureDescModuleProps {
  activeState: number;
  currentItem: FeatureDescItem;
  progress: number;
  onSelectState?: (index: number) => void;
  className?: string;
  isMobile?: boolean;
}

/**
 * 功能轮换描述模块
 * 包含：
 * 1. 对应四个同名卡片的动态徽标胶囊 (综合能力、发型能力、性价比、季度数据，带平滑出入场过渡)
 * 2. 随当前卡片联动的双行精准描述文案 (带平滑出入场过渡)
 * 3. 3s 周期实时加载进度条 (细长两头尖纺锤形，开始时黑条完全消失，结束时完全覆盖，最前端颜色减淡)
 * 三大元素保持优美舒适的呼吸纵向间距
 */
export const BarberFeatureDescModule: React.FC<BarberFeatureDescModuleProps> = ({
  activeState,
  currentItem,
  progress,
  onSelectState,
  className = '',
  isMobile = false,
}) => {
  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9]/g, '');
  const clipId = `spindle-clip-${safeId}`;
  const gradId = `spindle-grad-${safeId}`;

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const fillWidth = clampedProgress * 445;

  // 尖角纺锤形精确几何路径 (两头尖锐收敛，中心最宽处 2.4px，彻底解决椭圆两头圆钝不够尖的问题)
  const SPINDLE_PATH = "M 0,1.2 A 20630,20630 0 0,1 445,1.2 A 20630,20630 0 0,1 0,1.2 Z";

  return (
    <div
      id="barber-feature-desc-group"
      className={`flex flex-col items-start select-none ${className}`}
    >
      {/* 1. 动态徽标胶囊 (点击可手动切换下一项，带平滑出入场过渡) */}
      <div
        className="cursor-pointer transition-transform duration-200 active:scale-95 origin-left inline-flex items-center"
        onClick={() => onSelectState?.((activeState + 1) % 4)}
        title="点击切换展示维度"
      >
        <div 
          className="relative h-[34px] flex items-center"
          style={{ 
            transform: isMobile ? 'scale(0.85)' : 'scale(clamp(0.75, calc(1cqi / 14.4), 1))', 
            transformOrigin: 'left center' 
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState}
              initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -5, filter: 'blur(2px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeState === 0 && <TalentMark />}
              {activeState === 1 && <HairstyleMark />}
              {activeState === 2 && <ValueMark />}
              {activeState === 3 && <QuarterMark />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. 双行描述文案 (字间距 0.04em ~ 0.06em，显著增大与徽标胶囊的纵向间距，带平滑出入场过渡) */}
      <div
        className="text-[#5c5c5c] font-medium leading-[1.4] tracking-[0.04em] font-['Source_Han_Sans_CN',sans-serif] overflow-hidden"
        style={{
          fontSize: isMobile ? '13px' : 'clamp(11px, 1.11cqi, 16px)',
          marginTop: isMobile ? '16px' : 'clamp(10px, 1.25cqi, 18px)',
          minHeight: isMobile ? '40px' : 'clamp(28px, 2.5cqi, 38px)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeState}
            initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{currentItem.descLine1}</p>
            <p>{currentItem.descLine2}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. 3s 倒计时进度条：显著增大与文案的纵向间距，两端极致尖锐纺锤形，PC端厚度样式回调 */}
      <div
        className="w-full flex items-center"
        style={{
          maxWidth: isMobile ? '100%' : 'clamp(240px, 30.9cqi, 445px)',
          marginTop: isMobile ? '22px' : 'clamp(16px, 1.8cqi, 26px)',
        }}
      >
        <svg
          viewBox="0 0 445 2.4"
          className="w-full block"
          style={{ height: isMobile ? '2.5px' : 'clamp(2px, 0.22cqi, 3px)' }}
          preserveAspectRatio="none"
        >
          <defs>
            {/* 细长尖角纺锤形裁剪蒙版 (两端极致尖锐) */}
            <clipPath id={clipId}>
              <path d={SPINDLE_PATH} />
            </clipPath>
            {/* 进度黑条渐变：底端深黑，最前端减淡渐变 */}
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#222222" />
              <stop offset="75%" stopColor="#222222" />
              <stop offset="90%" stopColor="#555555" />
              <stop offset="100%" stopColor={clampedProgress >= 0.995 ? '#222222' : '#9c9c9c'} />
            </linearGradient>
          </defs>

          {/* 纺锤形底轨 (浅灰 #dadada) */}
          <path d={SPINDLE_PATH} fill="#dadada" />

          {/* 进度黑条 (开始时完全消失，结束时完全覆盖，最前端颜色减淡) */}
          <g clipPath={`url(#${clipId})`}>
            {clampedProgress > 0 && (
              <rect
                x="0"
                y="0"
                width={fillWidth}
                height="2.4"
                fill={`url(#${gradId})`}
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BarberFeatureDescModule;
