import React from 'react';
import { motion, type MotionValue } from 'motion/react';

export interface StageDescriptionProps {
  text1Opacity: MotionValue<number>;
  text1Y: MotionValue<number>;
  text2Opacity: MotionValue<number>;
  text2Y: MotionValue<number>;
  text3Opacity: MotionValue<number>;
  text3Y: MotionValue<number>;
  text4Opacity: MotionValue<number>;
  text4Y: MotionValue<number>;
}

export const StageDescription: React.FC<StageDescriptionProps> = ({
  text1Opacity,
  text1Y,
  text2Opacity,
  text2Y,
  text3Opacity,
  text3Y,
  text4Opacity,
  text4Y,
}) => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full overflow-visible z-10 pointer-events-none"
      viewBox="0 0 1440 700" 
      fill="none"
    >
      {/* Stage 1: 造型高度个性化 */}
      <motion.g style={{ opacity: text1Opacity, y: text1Y }}>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Source Han Sans CN, sans-serif', fontSize: '28px', fontWeight: '900' }}>
          <tspan x="462" y="331.708">造型高度个性化</tspan>
        </text>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Noto Sans SC, sans-serif', fontSize: '16px', fontWeight: 'normal' }}>
          <tspan x="462" y="366.052">智能效果图 + 全维度信息描述 + 真实发型参考示例图</tspan>
          <tspan x="462" y="388.052">轻松勾勒出脑海中的画面。</tspan>
        </text>
      </motion.g>

      {/* Stage 2: 需求高度精准化 */}
      <motion.g style={{ opacity: text2Opacity, y: text2Y }}>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Source Han Sans CN, sans-serif', fontSize: '28px', fontWeight: '900' }}>
          <tspan x="462" y="331.708">需求高度精准化</tspan>
        </text>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Noto Sans SC, sans-serif', fontSize: '16px', fontWeight: 'normal' }}>
          <tspan x="462" y="366.052">关键需求图文双维度清晰高亮描述</tspan>
          <tspan x="462" y="388.052">每一剪都心中有数。</tspan>
        </text>
      </motion.g>

      {/* Stage 3: 所有需求逐条确认 */}
      <motion.g style={{ opacity: text3Opacity, y: text3Y }}>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Source Han Sans CN, sans-serif', fontSize: '28px', fontWeight: '900' }}>
          <tspan x="462" y="331.708">所有需求逐条确认</tspan>
        </text>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Noto Sans SC, sans-serif', fontSize: '16px', fontWeight: 'normal' }}>
          <tspan x="462" y="366.052">理前不敷衍，理后不扯皮</tspan>
          <tspan x="462" y="388.052">全流程透明可控。</tspan>
        </text>
      </motion.g>

      {/* Stage 4: 进度实时指示 */}
      <motion.g style={{ opacity: text4Opacity, y: text4Y }}>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Source Han Sans CN, sans-serif', fontSize: '28px', fontWeight: '900' }}>
          <tspan x="462" y="331.708">进度实时指示</tspan>
        </text>
        <text fill="#2E2E2E" textAnchor="middle" style={{ whiteSpace: 'pre', fontFamily: 'Noto Sans SC, sans-serif', fontSize: '16px', fontWeight: 'normal' }}>
          <tspan x="462" y="366.052">当前确认步骤一目了然</tspan>
          <tspan x="462" y="388.052">步步安心，随时掌控。</tspan>
        </text>
      </motion.g>

      <defs>
        <radialGradient id="paint0_radial_0_1_rel" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(44.566 -10.7) scale(82.537 81.5466)">
          <stop stopColor="#2E2E2E" />
          <stop offset="1" />
        </radialGradient>
        <radialGradient id="paint1_radial_0_1_rel" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 -8.892) scale(66.652 65.5189)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EBEBEB" />
        </radialGradient>
        <radialGradient id="paint2_radial_0_1_rel" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 -8.892) scale(66.652 65.5189)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EBEBEB" />
        </radialGradient>
        <radialGradient id="paint3_radial_0_1_rel" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 -8.892) scale(66.652 65.5189)">
          <stop stopColor="white" />
          <stop offset="0.736" stopColor="#F9F9F9" />
          <stop offset="1" stopColor="#EBEBEB" />
        </radialGradient>
      </defs>
    </svg>
  );
};
