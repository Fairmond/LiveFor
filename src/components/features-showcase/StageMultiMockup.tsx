import React from 'react';
import { motion, type MotionValue } from 'motion/react';
import { getX, getY, getW, getH } from './math';

export interface StageMultiMockupProps {
  phone2Opacity: MotionValue<number>;
  phone2SlideX: MotionValue<number>;
  hud1Opacity: MotionValue<number>;
  hud2Opacity: MotionValue<number>;
  tab1SwitchOpacity: MotionValue<number>;
  tab2SwitchOpacity: MotionValue<number>;
  phone2ParallaxY: MotionValue<string>;
}

export const StageMultiMockup: React.FC<StageMultiMockupProps> = ({
  phone2Opacity,
  phone2SlideX,
  hud1Opacity,
  hud2Opacity,
  tab1SwitchOpacity,
  tab2SwitchOpacity,
  phone2ParallaxY,
}) => {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        left: getX(825.77),
        top: getY(118.574),
        width: getW(402.451),
        height: getH(831.569),
        opacity: phone2Opacity,
        y: phone2ParallaxY,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          x: phone2SlideX,
          scale: 0.85,
          transformOrigin: 'center center'
        }}
      >
        <svg 
          viewBox="0 0 402.451 831.569" 
          className="w-full h-full overflow-visible"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="phone2_body_mask">
              <rect x="0" y="0" width="450" height="850" fill="white" />
              <rect x="23.1697" y="14.0079" width="371.6454" height="805.705" rx="60" fill="black" />
            </mask>
            <clipPath id="phone_screen_clip_unified">
              <rect x="23.1697" y="14.0079" width="371.6454" height="805.705" rx="60" />
            </clipPath>
            <linearGradient id="btn_grad_unified" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B71102" />
              <stop offset="1" stopColor="#C5564E" />
            </linearGradient>
            <radialGradient id="phone_frame_radial_unified" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(208.838 436.254) scale(237.369 534.569)">
              <stop stopColor="white"/>
              <stop offset="0.569" stopColor="#999999"/>
              <stop offset="1" stopColor="#404040"/>
            </radialGradient>
          </defs>

          {/* Phone 2 Base from body.png */}
          <svg
            x={13.73}
            y={-0.2}
            width={390.523}
            height={833.66}
            viewBox="2503 715 1729 3621"
            preserveAspectRatio="none"
            className="pointer-events-none"
          >
            <image
              href="/Body.png"
              xlinkHref="/Body.png"
              width={6736}
              height={5052}
            />
          </svg>

          {/* Screen Content */}
          <g clipPath="url(#phone_screen_clip_unified)">
            <g transform="translate(4.18, 8.34) scale(0.98)">
              <rect x="19.3774" y="5.78638" width="379.23" height="822.148" rx="60" fill="white" />
              <image href="/images/背景图.png" xlinkHref="/images/背景图.png" x="19.3774" y="5.78638" width="379.23" height="822.148" preserveAspectRatio="xMidYMid slice" />
              
              {/* Main Portrait */}
              <image href="/正面大头图.png" xlinkHref="/正面大头图.png" x="27.8407" y="179.93162" width="183.706" height="320.963" preserveAspectRatio="xMidYMid meet" />
              
              {/* Reference Image */}
              <image href="/images/参考展示图.png" xlinkHref="/images/参考展示图.png" x="0" y="489.04462" width="399.37" height="200.776" preserveAspectRatio="xMidYMid slice" />
              
              {/* Footer Module */}
              <image href="/底部模块.png" xlinkHref="/底部模块.png" x="31.6862" y="680.97162" width="353.251" height="131.084" preserveAspectRatio="xMidYMid meet" />
              
              {/* Attribute List */}
              <image href="/三分属性框图.png" xlinkHref="/三分属性框图.png" x="217.9226" y="367.24462" width="160.093" height="42.3234" preserveAspectRatio="xMidYMid meet" />

              {/* HUD 1 vs HUD 2 in-place crossfade */}
              <motion.image 
                href="/hud注释.png" 
                xlinkHref="/hud注释.png" 
                x="117.6226" y="232.46362" width="70" height="100" 
                style={{ opacity: hud1Opacity }}
                preserveAspectRatio="xMidYMin meet"
              />
              <motion.image 
                href="/第二hud.png" 
                xlinkHref="/第二hud.png" 
                x="50.6226" y="262.46362" width="140" height="150" 
                style={{ opacity: hud2Opacity }}
                preserveAspectRatio="xMidYMin meet"
              />

              {/* Tab Images with Motion */}
              <motion.image 
                href="/选项卡.png" 
                xlinkHref="/选项卡.png" 
                x="217.9226" y="186.39062" width="167.147" height="262.5" 
                style={{ opacity: tab1SwitchOpacity, transformOrigin: 'right top' }}
                preserveAspectRatio="xMidYMin meet"
              />
              <motion.image 
                href="/第二选项卡.png" 
                xlinkHref="/第二选项卡.png" 
                x="217.9226" y="186.39062" width="167.147" height="262.5" 
                style={{ opacity: tab2SwitchOpacity, transformOrigin: 'right top' }}
                preserveAspectRatio="xMidYMin meet"
              />

              {/* Button Group (2 / 4 继续) */}
              <g transform="translate(258.1206, 681.96562)">
                <rect width="127" height="127" rx="16" fill="url(#btn_grad_unified)" />
                <text x="6" y="118" fill="white" style={{ fontFamily: 'Source Han Sans CN', fontSize: '24px', fontWeight: 'bold' }}>2 / 4</text>
                <text x="85" y="120" fill="white" style={{ fontFamily: 'YouYuan', fontSize: '16px' }}>继续</text>
                <g transform="translate(94.0796, 15.65962) scale(0.8)">
                    <path d="M12.377 4.159L19.838 11.619L12.377 19.079" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M0 0V7.394C0.01 7.968 0.145 8.532 0.396 9.048C0.647 9.564 1.008 10.019 1.453 10.381C2.439 11.193 3.681 11.632 4.959 11.619H19.837" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>

              {/* Main Title */}
              <text 
                x="261.22" y="152" 
                textAnchor="middle" 
                fill="white" 
                style={{ fontFamily: 'BIZ UDGothic', fontSize: '55px', fontWeight: 'bold' }}
              >
                微分碎盖
              </text>
            </g>
          </g>

          {/* Outer Phone Frame from body.png with cutout screen mask */}
          <g mask="url(#phone2_body_mask)" className="pointer-events-none">
            <svg
              x={13.73}
              y={-0.2}
              width={390.523}
              height={833.66}
              viewBox="2503 715 1729 3621"
              preserveAspectRatio="none"
            >
              <image
                href="/Body.png"
                xlinkHref="/Body.png"
                width={6736}
                height={5052}
              />
            </svg>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
};
