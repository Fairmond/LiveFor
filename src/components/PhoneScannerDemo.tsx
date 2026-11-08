import React, { memo } from "react";
import { motion } from "motion/react";

export interface PhoneScannerDemoProps {
  /** Controls when the radar sweep animation activates */
  isInView?: boolean;
  /** Whether rendering in mobile layout (scales and positions to mobile grid) */
  isMobile?: boolean;
  /** Optional custom X position for mobile layout (defaults to 85) */
  x?: number | string;
  /** Optional custom Y position for mobile layout (defaults to 3675) */
  y?: number | string;
  /** Optional custom width for mobile layout (defaults to 223) */
  width?: number | string;
  /** Optional custom height for mobile layout (defaults to 230.5) */
  height?: number | string;
  className?: string;
}

/**
 * PhoneScannerDemo
 * 
 * Standalone packaged component for the phone map scanning module.
 * Reusable across both Desktop (Page10Section) and Mobile (MobileAiRecommendationSection).
 * Encapsulates phone chassis, screen clip, vector street map,
 * animated sweeping radar system, and location destination pin.
 */
export const PhoneScannerDemo = memo(function PhoneScannerDemo({
  isInView = true,
  isMobile = false,
  x = 85,
  y = 3675,
  width = 223,
  height = 230.5,
  className,
}: PhoneScannerDemoProps) {
  const prefix = isMobile ? "ps-m" : "ps-pc";

  const renderDefs = () => (
    <defs>
      {/* Outer Phone Bezel Chassis Gradient */}
      <linearGradient
        id={`${prefix}-chassis-grad`}
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#e7e7e7" />
        <stop offset={1} stopColor="#adadad" />
      </linearGradient>

      {/* Screen Clip for Map Content */}
      <clipPath id={`${prefix}-screen-clip`}>
        <rect
          width={368}
          height={851}
          fill="#fff"
          stroke="#707070"
          rx={28}
          transform="translate(432 4018)"
        />
      </clipPath>

      {/* Radar Circular Boundary Clip */}
      <clipPath id={`${prefix}-radar-clip`}>
        <path d="M214.707 417.78c-14.535 0-29.06-1.427-43.173-4.24a217.313 217.313 0 0 1-40.21-12.158 216.086 216.086 0 0 1-36.387-19.238 214.63 214.63 0 0 1-31.702-25.479 211.447 211.447 0 0 1-26.156-30.878 207.012 207.012 0 0 1-19.748-35.44 203.655 203.655 0 0 1-12.48-39.161A204.913 204.913 0 0 1 .5 209.14c0-14.156 1.464-28.302 4.351-42.047a203.656 203.656 0 0 1 12.48-39.16 207.014 207.014 0 0 1 19.748-35.44 211.445 211.445 0 0 1 26.156-30.88 214.636 214.636 0 0 1 31.702-25.478 216.089 216.089 0 0 1 36.387-19.237 217.31 217.31 0 0 1 40.21-12.159A221.35 221.35 0 0 1 214.707.5c14.535 0 29.06 1.426 43.173 4.24a217.312 217.312 0 0 1 40.21 12.158 216.09 216.09 0 0 1 36.387 19.237 214.634 214.634 0 0 1 31.702 25.479 211.445 211.445 0 0 1 26.156 30.879 207.009 207.009 0 0 1 19.748 35.44 203.657 203.657 0 0 1 12.48 39.16 204.912 204.912 0 0 1 4.351 42.047c0 14.155-1.464 28.301-4.351 42.046a203.656 203.656 0 0 1-12.48 39.161 207.007 207.007 0 0 1-19.748 35.44 211.447 211.447 0 0 1-26.156 30.878 214.63 214.63 0 0 1-31.702 25.479 216.087 216.087 0 0 1-36.387 19.238 217.314 217.314 0 0 1-40.21 12.158 221.352 221.352 0 0 1-43.173 4.24Z" />
      </clipPath>

      {/* Destination Pin Shadow Filters */}
      <filter
        id={`${prefix}-pin-filter-1`}
        width={36.801}
        height={32.441}
        x={533.936}
        y={1163.653}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={2.5} />
        <feFlood floodColor="#6c8bbb" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>

      <filter
        id={`${prefix}-pin-filter-2`}
        width={41}
        height={40}
        x={532}
        y={1172.653}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} />
        <feGaussianBlur result="blur-2" stdDeviation={3} />
        <feFlood floodColor="#6c8bbb" />
        <feComposite in2="blur-2" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>

      {/* Vector Street Map Pattern */}
      <pattern
        id={`${prefix}-map-pattern`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 840 905"
      >
        <image
          xlinkHref="/便利体验图示-image.png"
          href="/便利体验图示-image.png"
          width={840}
          height={905}
        />
      </pattern>
    </defs>
  );

  const renderPhoneBody = () => (
    <>
      {/* 1. Phone Chassis Bezel (路径 231) */}
      <g
        fill={`url(#${prefix}-chassis-grad)`}
        data-name="路径 231"
        transform="translate(354 4042)"
      >
        <path d="M342 851.5H28a27.41 27.41 0 0 1-19.445-8.055A27.41 27.41 0 0 1 .5 824V28c.162-2.66 1.052-5.735 2.575-8.88 1.584-3.272 3.827-6.555 6.49-9.498C12 7.137 15.285 4.48 18.582 2.33 22.362-.136 25.79-1.72 28.5-2.251c.493-.097 3.735-.212 16.382-.212C108.878-2.463 339.67.47 341.994.5H342a27.409 27.409 0 0 1 19.445 8.055A27.41 27.41 0 0 1 369.5 28v796a27.41 27.41 0 0 1-8.055 19.445A27.41 27.41 0 0 1 342 851.5Z" />
        <path
          fill="#4d4d4d"
          d="M44.881-1.963c-13.232 0-15.884.127-16.286.203-2.646.519-6.014 2.078-9.739 4.507-3.265 2.13-6.519 4.761-8.93 7.22-2.626 2.905-4.84 6.145-6.401 9.37C2.033 22.419 1.16 25.424 1 28.03V824a26.911 26.911 0 0 0 7.908 19.092A26.912 26.912 0 0 0 28 851h314a26.912 26.912 0 0 0 19.092-7.908A26.911 26.911 0 0 0 369 824V28a26.912 26.912 0 0 0-7.908-19.092A26.912 26.912 0 0 0 342 1h-.013C339.664.97 108.875-1.963 44.881-1.963m0-1C109.621-2.963 342 0 342 0c15.464 0 28 12.536 28 28v796c0 15.464-12.536 28-28 28H28c-15.464 0-28-12.536-28-28V28C.326 22.518 3.607 15.46 9.2 9.28 13.905 4.475 22.386-1.56 28.401-2.742c.787-.154 6.737-.221 16.479-.221Z"
        />
      </g>

      {/* 2. Inner Phone Screen Background (地图) */}
      <g
        fill="#fff"
        stroke="#4d4d4d"
        data-name="地图"
        transform="translate(365 4037)"
      >
        <rect width={370} height={852} stroke="none" rx={28} />
        <rect width={369} height={851} x={0.5} y={0.5} fill="none" rx={27.5} />
      </g>

      {/* 3. Screen Clip: Map + Sweeping Conic Radar + Location Pin (蒙版组 52) */}
      <g
        clipPath={`url(#${prefix}-screen-clip)`}
        data-name="蒙版组 52"
        transform="translate(-66 20)"
      >
        {/* Vector Street Map */}
        <path
          fill={`url(#${prefix}-map-pattern)`}
          d="M0 0h567v612H0z"
          data-name="图像 38"
          transform="rotate(90 -1530 2471)"
        />

        {/* Sweeping Conic Radar System (路径 232) */}
        <g
          data-name="路径 232"
          opacity={0.8}
          transform="rotate(-137 1234.213 2205.233)"
        >
          <foreignObject
            x={-35.293}
            y={-41}
            width={500}
            height={500}
            clipPath={`url(#${prefix}-radar-clip)`}
          >
            <motion.div
              className="w-full h-full rounded-full origin-center"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(3, 85, 255, 0.65) 0%, rgba(3, 85, 255, 0.25) 35%, rgba(3, 85, 255, 0.05) 60%, rgba(3, 85, 255, 0) 100%)",
              }}
              initial={{ rotate: 360 }}
              animate={isInView ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </foreignObject>

          {/* Outer Radar Boundary Ring Outline */}
          <path
            fill="#05f"
            d="M214.707 1a220.849 220.849 0 0 0-43.075 4.23 216.816 216.816 0 0 0-40.118 12.13 215.584 215.584 0 0 0-36.302 19.193 214.134 214.134 0 0 0-31.628 25.419A210.948 210.948 0 0 0 37.49 92.778a206.507 206.507 0 0 0-19.7 35.353 203.156 203.156 0 0 0-12.45 39.065A204.415 204.415 0 0 0 1 209.14c0 14.12 1.46 28.232 4.34 41.943a203.156 203.156 0 0 0 12.45 39.065 206.507 206.507 0 0 0 19.7 35.354 210.944 210.944 0 0 0 26.094 30.805 214.132 214.132 0 0 0 31.628 25.419 215.586 215.586 0 0 0 36.302 19.193 216.814 216.814 0 0 0 40.118 12.13 220.849 220.849 0 0 0 43.075 4.23c14.502 0 28.995-1.423 43.076-4.23a216.813 216.813 0 0 0 40.117-12.13 215.588 215.588 0 0 0 36.302-19.193 214.132 214.132 0 0 0 31.628-25.419 210.946 210.946 0 0 0 26.094-30.805 206.511 206.511 0 0 0 19.7-35.354 203.151 203.151 0 0 0 12.45-39.065 204.415 204.415 0 0 0 4.34-41.943c0-14.121-1.46-28.233-4.34-41.944a203.152 203.152 0 0 0-12.45-39.065 206.51 206.51 0 0 0-19.7-35.353 210.95 210.95 0 0 0-26.094-30.806 214.134 214.134 0 0 0-31.628-25.419A215.586 215.586 0 0 0 297.9 17.36a216.815 216.815 0 0 0-40.117-12.13A220.849 220.849 0 0 0 214.707 1m0-1c118.58 0 214.707 93.635 214.707 209.14 0 115.504-96.127 209.14-214.707 209.14S0 324.643 0 209.14C0 93.635 96.128 0 214.707 0Z"
          />
        </g>

        {/* Blue Target Destination Pin (组 154) */}
        <g data-name="组 154">
          <g filter={`url(#${prefix}-pin-filter-1)`} transform="translate(66 3171.003)">
            <g fill="#0256ff" data-name="多边形 27">
              <path d="M561.437 1184.59h-18.193l9.097-14.553 9.096 14.554Z" />
              <path
                fill="#fff"
                d="m552.34 1171.924-7.291 11.667h14.584l-7.292-11.667m0-2.887c.326 0 .652.156.848.47l9.096 14.554a1 1 0 0 1-.848 1.53h-18.193a1 1 0 0 1-.848-1.53l9.097-14.554a.992.992 0 0 1 .848-.47Z"
              />
            </g>
          </g>
          <g filter={`url(#${prefix}-pin-filter-2)`} transform="translate(66 3171.003)">
            <g
              fill="#0256ff"
              stroke="#fff"
              strokeWidth={2}
              data-name="椭圆 320"
              transform="translate(541 1178.65)"
            >
              <ellipse cx={11.5} cy={11} stroke="none" rx={11.5} ry={11} />
              <ellipse cx={11.5} cy={11} fill="none" rx={10.5} ry={10} />
            </g>
          </g>
        </g>
      </g>

      {/* 4. Top Camera Notch Dot */}
      <g fill="#4d4d4d" stroke="#4d4d4d" transform="translate(542 4046)">
        <ellipse cx={7.5} cy={8} stroke="none" rx={7.5} ry={8} />
        <ellipse cx={7.5} cy={8} fill="none" rx={7} ry={7.5} />
      </g>
    </>
  );

  // Mobile layout rendering
  if (isMobile) {
    const numWidth = typeof width === "number" ? width : parseFloat(String(width)) || 223;
    const numHeight = typeof height === "number" ? height : parseFloat(String(height)) || 295;
    const vbHeight = numWidth > 0 ? (numHeight / numWidth) * 385 : 509;

    return (
      <svg
        id="phone-scanner-demo-mobile"
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={`350 4037 385 ${vbHeight}`}
        preserveAspectRatio="xMidYMin slice"
        overflow="hidden"
        className={`block select-none ${className || ""}`}
      >
        {renderDefs()}
        {renderPhoneBody()}
      </svg>
    );
  }

  // Desktop layout rendering
  return (
    <g
      id="phone-scanner-demo-pc"
      clipPath={`url(#${prefix}-frame-clip)`}
      transform="translate(0 -3191)"
      className={className}
    >
      <defs>
        {/* Frame Outer Clip */}
        <clipPath id={`${prefix}-frame-clip`}>
          <path
            fill="none"
            stroke="#707070"
            d="M287 4037h532v547H287z"
            data-name="矩形 464"
          />
        </clipPath>
      </defs>
      {renderDefs()}
      {renderPhoneBody()}
    </g>
  );
});

export default PhoneScannerDemo;
