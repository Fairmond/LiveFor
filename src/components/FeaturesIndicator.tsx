import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

export interface FeaturesIndicatorProps {
  activeWeights: [
    MotionValue<number>,
    MotionValue<number>,
    MotionValue<number>,
    MotionValue<number>
  ];
  onTabClick?: (stageId: 1 | 2 | 3 | 4) => void;
  scale?: number;
  className?: string;
  trackBorderRadius?: number | string;
}

const HOVER_SCALE = 1.05;
const BASE_WIDTH = 355.5;
const BASE_HEIGHT = 97;

export const FeaturesIndicator: React.FC<FeaturesIndicatorProps> = ({
  activeWeights,
  onTabClick,
  scale = 1,
  className = '',
  trackBorderRadius = '18px',
}) => {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [tab1Active, tab2Active, tab3Active, tab4Active] = activeWeights;

  // Exact desktop SVG tab geometry and radial gradient definitions
  const tabs = [
    {
      id: 1,
      width: 90,
      height: 90,
      viewBox: '0 0 90 90',
      background: (
        <>
          <path
            d="M65.5 0H24.5C10.969 0 0 10.969 0 24.5V65.5C0 79.031 10.969 90 24.5 90H65.5C79.031 90 90 79.031 90 65.5V24.5C90 10.969 79.031 0 65.5 0Z"
            stroke="#404040"
            strokeWidth="2"
          />
          <path
            d="M65.066 0H24.066C10.259 0 -0.934 11.193 -0.934 25V66C-0.934 79.807 10.259 91 24.066 91H65.066C78.873 91 90.066 79.807 90.066 66V25C90.066 11.193 78.873 0 65.066 0Z"
            fill="url(#feat_indicator_paint0_radial)"
          />
        </>
      ),
      text: '1',
    },
    {
      id: 2,
      width: 76,
      height: 76,
      viewBox: '0 0 76 76',
      background: (
        <>
          <path
            d="M56 0H20C8.954 0 0 8.954 0 20V56C0 67.046 8.954 76 20 76H56C67.046 76 76 67.046 76 56V20C76 8.954 67.046 0 56 0Z"
            fill="url(#feat_indicator_paint1_radial)"
          />
          <path
            d="M56 0.5H20C9.23 0.5 0.5 9.23 0.5 20V56C0.5 66.77 9.23 75.5 20 75.5H56C66.77 75.5 75.5 66.77 75.5 56V20C75.5 9.23 66.77 0.5 56 0.5Z"
            stroke="#E1E1E1"
          />
        </>
      ),
      text: '2',
    },
    {
      id: 3,
      width: 76,
      height: 76,
      viewBox: '0 0 76 76',
      background: (
        <>
          <path
            d="M56 0H20C8.954 0 0 8.954 0 20V56C0 67.046 8.954 76 20 76H56C67.046 76 76 67.046 76 56V20C76 8.954 67.046 0 56 0Z"
            fill="url(#feat_indicator_paint2_radial)"
          />
          <path
            d="M56 0.5H20C9.23 0.5 0.5 9.23 0.5 20V56C0.5 66.77 9.23 75.5 20 75.5H56C66.77 75.5 75.5 66.77 75.5 56V20C75.5 9.23 66.77 0.5 56 0.5Z"
            stroke="#E1E1E1"
          />
        </>
      ),
      text: '3',
    },
    {
      id: 4,
      width: 76,
      height: 76,
      viewBox: '0 0 76 76',
      background: (
        <>
          <path
            d="M56 0H20C8.954 0 0 8.954 0 20V56C0 67.046 8.954 76 20 76H56C67.046 76 76 67.046 76 56V20C76 8.954 67.046 0 56 0Z"
            fill="url(#feat_indicator_paint3_radial)"
          />
          <path
            d="M56 0.5H20C9.23 0.5 0.5 9.23 0.5 20V56C0.5 66.77 9.23 75.5 20 75.5H56C66.77 75.5 75.5 66.77 75.5 56V20C75.5 9.23 66.77 0.5 56 0.5Z"
            stroke="#E1E1E1"
          />
        </>
      ),
      text: '4',
    },
  ];

  // Mathematical tab position transforms
  // Each tab left = 7.5 + sum(width_i + 7.5)
  const tab1Left = 7.5;
  const tab2Left = useTransform([tab1Active], (latest: number[]) => {
    const [t1] = latest;
    const w1 = (t1 ?? 0) * 14 + 76;
    return 7.5 + w1 + 7.5;
  });
  const tab3Left = useTransform([tab1Active, tab2Active], (latest: number[]) => {
    const [t1, t2] = latest;
    const w1 = (t1 ?? 0) * 14 + 76;
    const w2 = (t2 ?? 0) * 14 + 76;
    return 7.5 + w1 + 7.5 + w2 + 7.5;
  });
  const tab4Left = useTransform([tab1Active, tab2Active, tab3Active], (latest: number[]) => {
    const [t1, t2, t3] = latest;
    const w1 = (t1 ?? 0) * 14 + 76;
    const w2 = (t2 ?? 0) * 14 + 76;
    const w3 = (t3 ?? 0) * 14 + 76;
    return 7.5 + w1 + 7.5 + w2 + 7.5 + w3 + 7.5;
  });
  const tabLefts = [tab1Left, tab2Left, tab3Left, tab4Left];

  // Tab dynamic sizes: unselected=76px, selected=90px
  const tab1W = useTransform(tab1Active, [0, 1], [76, 90]);
  const tab2W = useTransform(tab2Active, [0, 1], [76, 90]);
  const tab3W = useTransform(tab3Active, [0, 1], [76, 90]);
  const tab4W = useTransform(tab4Active, [0, 1], [76, 90]);
  const tabWidths = [tab1W, tab2W, tab3W, tab4W];

  const tab1H = useTransform(tab1Active, [0, 1], [76, 90]);
  const tab2H = useTransform(tab2Active, [0, 1], [76, 90]);
  const tab3H = useTransform(tab3Active, [0, 1], [76, 90]);
  const tab4H = useTransform(tab4Active, [0, 1], [76, 90]);
  const tabHeights = [tab1H, tab2H, tab3H, tab4H];

  // Tab top position: unselected=14px, selected=0px
  // Guarantees bottom edge = top + height = 14 + 76 = 0 + 90 = 90px (ALWAYS FLUSH)
  const tab1Top = useTransform(tab1Active, [0, 1], [14, 0]);
  const tab2Top = useTransform(tab2Active, [0, 1], [14, 0]);
  const tab3Top = useTransform(tab3Active, [0, 1], [14, 0]);
  const tab4Top = useTransform(tab4Active, [0, 1], [14, 0]);
  const tabTops = [tab1Top, tab2Top, tab3Top, tab4Top];

  // Font size & colors
  const tab1FontSize = useTransform(tab1Active, [0, 1], [30, 40]);
  const tab2FontSize = useTransform(tab2Active, [0, 1], [30, 40]);
  const tab3FontSize = useTransform(tab3Active, [0, 1], [30, 40]);
  const tab4FontSize = useTransform(tab4Active, [0, 1], [30, 40]);
  const tabFontSizes = [tab1FontSize, tab2FontSize, tab3FontSize, tab4FontSize];

  const tab1FontColor = useTransform(tab1Active, [0, 1], ['#2E2E2E', '#E6E6E6']);
  const tab2FontColor = useTransform(tab2Active, [0, 1], ['#2E2E2E', '#E6E6E6']);
  const tab3FontColor = useTransform(tab3Active, [0, 1], ['#2E2E2E', '#E6E6E6']);
  const tab4FontColor = useTransform(tab4Active, [0, 1], ['#2E2E2E', '#E6E6E6']);
  const tabFontColors = [tab1FontColor, tab2FontColor, tab3FontColor, tab4FontColor];

  // Background crossfading
  const tab1LightBgOpacity = useTransform(tab1Active, [0, 1], [1, 0]);
  const tab2LightBgOpacity = useTransform(tab2Active, [0, 1], [1, 0]);
  const tab3LightBgOpacity = useTransform(tab3Active, [0, 1], [1, 0]);
  const tab4LightBgOpacity = useTransform(tab4Active, [0, 1], [1, 0]);
  const tabLightBgOpacities = [tab1LightBgOpacity, tab2LightBgOpacity, tab3LightBgOpacity, tab4LightBgOpacity];
  const tabSelectedOpacities = [tab1Active, tab2Active, tab3Active, tab4Active];

  // Hover shift and expansion logic
  const getHoverHalfDelta = () => {
    if (hoveredTab === null) return 0;
    const opacities = [
      tab1Active.get?.() ?? 1,
      tab2Active.get?.() ?? 0,
      tab3Active.get?.() ?? 0,
      tab4Active.get?.() ?? 0,
    ];
    const activeWeight = opacities[hoveredTab - 1] ?? 0;
    const baseW = activeWeight * (90 - 76) + 76;
    return (baseW * (HOVER_SCALE - 1)) / 2;
  };

  const getShift = (tabIndex: number) => {
    if (hoveredTab === null) return 0;
    const hoveredIdx = hoveredTab - 1;
    if (tabIndex === hoveredIdx) return 0;
    const halfDelta = getHoverHalfDelta();
    return tabIndex < hoveredIdx ? -halfDelta : halfDelta;
  };

  const getTrackTransform = () => {
    const baseTrackX = 0;
    const baseTrackWidth = BASE_WIDTH;
    if (hoveredTab === null) return { x: baseTrackX, width: baseTrackWidth };

    const halfDelta = getHoverHalfDelta();
    return {
      width: baseTrackWidth + halfDelta * 2,
      x: baseTrackX - halfDelta,
    };
  };

  const trackState = getTrackTransform();
  const selectedTabRef = tabs[0];
  const unselectedTabRef = tabs[1];

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: BASE_WIDTH * scale,
        height: BASE_HEIGHT * scale,
      }}
    >
      {/* SVG Radial Gradients */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <radialGradient
            id="feat_indicator_paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(44.566 -10.7) scale(82.537 81.5466)"
          >
            <stop stopColor="#2E2E2E" />
            <stop offset="1" />
          </radialGradient>
          <radialGradient
            id="feat_indicator_paint1_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(38 -8.892) scale(66.652 65.5189)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#EBEBEB" />
          </radialGradient>
          <radialGradient
            id="feat_indicator_paint2_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(38 -8.892) scale(66.652 65.5189)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#EBEBEB" />
          </radialGradient>
          <radialGradient
            id="feat_indicator_paint3_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(38 -8.892) scale(66.652 65.5189)"
          >
            <stop stopColor="white" />
            <stop offset="0.736" stopColor="#F9F9F9" />
            <stop offset="1" stopColor="#EBEBEB" />
          </radialGradient>
        </defs>
      </svg>

      {/* Main Track and Buttons Scaled Container */}
      <div
        className="relative"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Track Background */}
        <motion.div
          className="absolute pointer-events-auto"
          animate={{
            width: trackState.width,
            left: trackState.x,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            top: 7,
            height: 90,
            backgroundColor: '#F2F2F2',
            border: '1px solid #E1E1E1',
            borderRadius: trackBorderRadius,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))',
          }}
        />

        {/* Buttons 1 2 3 4 with 100% PC Radial Gradients & Fonts */}
        {tabs.map((tab, index) => {
          const isButton1 = tab.id === 1;

          return (
            <motion.div
              key={tab.id}
              className="absolute cursor-pointer pointer-events-auto z-10 flex items-center justify-center select-none overflow-visible"
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => onTabClick?.(tab.id as 1 | 2 | 3 | 4)}
              whileTap={{ scale: 0.96 }}
              animate={{
                x: getShift(index),
                scale: hoveredTab === tab.id ? HOVER_SCALE : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                left: tabLefts[index],
                top: tabTops[index],
                width: tabWidths[index],
                height: tabHeights[index],
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-visible pointer-events-none">
                {/* Unselected Light Base */}
                <motion.svg
                  viewBox={isButton1 ? unselectedTabRef.viewBox : tab.viewBox}
                  fill="none"
                  className="absolute inset-0 w-full h-full overflow-visible"
                  style={{ opacity: tabLightBgOpacities[index] }}
                >
                  {isButton1 ? unselectedTabRef.background : tab.background}
                </motion.svg>

                {/* Selected Dark Radial Overlay */}
                <motion.svg
                  viewBox={selectedTabRef.viewBox}
                  fill="none"
                  className="absolute inset-0 w-full h-full overflow-visible"
                  style={{ opacity: tabSelectedOpacities[index] }}
                >
                  {selectedTabRef.background}
                </motion.svg>

                {/* Label Text */}
                <svg viewBox={tab.viewBox} fill="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <motion.text
                    fill={tabFontColors[index]}
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                      whiteSpace: 'pre',
                      fontFamily: 'BIZ UDPGothic, sans-serif',
                      fontSize: tabFontSizes[index],
                      fontWeight: 'bold',
                    }}
                  >
                    {tab.text}
                  </motion.text>
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
