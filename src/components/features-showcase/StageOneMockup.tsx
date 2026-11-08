import React from 'react';
import { motion, type MotionValue } from 'motion/react';
import { getX, getY, getW, getH } from './math';

export interface StageOneMockupProps {
  phone1Opacity: MotionValue<number>;
  mainImgOpacity: MotionValue<number>;
  mainImgX: MotionValue<string>;
  titleOpacity: MotionValue<number>;
  titleX: MotionValue<number>;
  lengthImgOpacity: MotionValue<number>;
  lengthImgX: MotionValue<string>;
  textureImgOpacity: MotionValue<number>;
  textureImgX: MotionValue<string>;
  permImgOpacity: MotionValue<number>;
  permImgX: MotionValue<string>;
  mainRefImgOpacity: MotionValue<number>;
  mainRefImgX: MotionValue<string>;
  displayImgOpacity: MotionValue<number>;
  displayImgY: MotionValue<string>;
}

export const StageOneMockup: React.FC<StageOneMockupProps> = ({
  phone1Opacity,
  mainImgOpacity,
  mainImgX,
  titleOpacity,
  titleX,
  lengthImgOpacity,
  lengthImgX,
  textureImgOpacity,
  textureImgX,
  permImgOpacity,
  permImgX,
  mainRefImgOpacity,
  mainRefImgX,
  displayImgOpacity,
  displayImgY,
}) => {
  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none"
      style={{
        x: getX(-11.32),
        opacity: phone1Opacity,
        scale: 0.85,
        transformOrigin: `${getX(1038.32)} ${getY(450)}`
      }}
    >
      <svg viewBox="0 0 1440 700" fill="none" className="absolute inset-0 w-full h-full overflow-visible">
        <g id="手机内容组">
          <g id="背景">
            {/* Phone 1 Base from body.png */}
            <svg
              x={841.894}
              y={112.548}
              width={393.164}
              height={839.295}
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
            <rect x="851.397" y="126.851" width="374.158" height="811.152" rx="60" fill="white" />
            <image x="851.397" y="124.851" width="374.158" height="811.152" href="/images/背景图.png" preserveAspectRatio="xMidYMid slice" clipPath="url(#clip_phone_screen_st1)" />
            {/* Phone 1 Outer Border from body.png with cutout screen mask */}
            <g mask="url(#phone1_body_mask)" className="pointer-events-none">
              <svg
                x={841.894}
                y={112.548}
                width={393.164}
                height={839.295}
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
          </g>
          <motion.g
            style={{
              opacity: titleOpacity,
              x: titleX
            }}
          >
            <text fill="white" style={{ whiteSpace: 'pre', fontFamily: 'BIZ UDGothic, sans-serif', fontSize: '55px', fontWeight: 'bold' }}>
              <tspan x="991" y="265.437">微分碎盖</tspan>
            </text>
          </motion.g>
        </g>
        <defs>
          <mask id="phone1_body_mask">
            <rect x="800" y="50" width="500" height="950" fill="white" />
            <rect x="851.397" y="126.851" width="374.158" height="811.152" rx="60" fill="black" />
          </mask>
          <radialGradient id="paint4_radial_0_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1038.32 551.951) scale(238.974 538.183)">
            <stop stopColor="white" />
            <stop offset="0.569" stopColor="#999999" />
            <stop offset="1" stopColor="#404040" />
          </radialGradient>
          <clipPath id="clip_phone_screen_st1">
            <rect x="851.397" y="126.851" width="374.158" height="811.152" rx="60" />
          </clipPath>
        </defs>
      </svg>

      {/* Stage 1 Floating Cards (Original Coordinates) */}
      <motion.img 
        src="/images/大图.png" 
        alt="造型效果"
        className="absolute object-cover"
        style={{
          left: getX(853.248),
          top: getY(278.099),
          width: getW(231.707),
          height: getH(291.761),
          transformOrigin: '0 0',
          rotate: '4.07784deg',
          opacity: mainImgOpacity,
          x: mainImgX
        }}
      />
      <motion.img 
        src="/images/打理图.png" 
        alt="打理参考"
        className="absolute object-cover"
        style={{
          left: getX(1042.66),
          top: getY(570.05),
          width: getW(169.279),
          height: getH(45.4634),
          opacity: mainRefImgOpacity,
          x: mainRefImgX
        }}
      />
      <motion.img 
        src="/images/长度图.png" 
        alt="长度参考"
        className="absolute object-cover"
        style={{
          left: getX(1042.66),
          top: getY(290.432),
          width: getW(169.111),
          height: getH(116.093),
          opacity: lengthImgOpacity,
          x: lengthImgX
        }}
      />
      <motion.img 
        src="/images/卷烫图.png" 
        alt="卷烫参考"
        className="absolute object-cover"
        style={{
          left: getX(1033.37),
          top: getY(502.235),
          width: getW(187.608),
          height: getH(63.1839),
          opacity: permImgOpacity,
          x: permImgX
        }}
      />
      <motion.img 
        src="/images/发质图.png" 
        alt="发质参考"
        className="absolute object-cover"
        style={{
          left: getX(1037.09),
          top: getY(414.913),
          width: getW(180.219),
          height: getH(90.1094),
          opacity: textureImgOpacity,
          x: textureImgX
        }}
      />
      <motion.img 
        src="/images/参考展示图.png" 
        alt="展示参考"
        className="absolute object-cover"
        style={{
          left: getX(829),
          top: getY(609.995),
          width: getW(402.069),
          height: getH(202.133),
          opacity: displayImgOpacity,
          y: displayImgY
        }}
      />
    </motion.div>
  );
};
