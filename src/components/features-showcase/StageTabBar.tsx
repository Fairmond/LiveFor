import React from 'react';
import { motion, type MotionValue } from 'motion/react';
import { getX, getY, getW, getH } from './math';
import type { StageId, StageTabItem, TrackTransformState } from './types';

export interface StageTabBarProps {
  hoveredTab: number | null;
  onHoverTab: (tabId: number | null) => void;
  onSelectStage: (stageId: StageId) => void;
  tab1Active: MotionValue<number>;
  tab2Active: MotionValue<number>;
  tab3Active: MotionValue<number>;
  tab4Active: MotionValue<number>;
  tabLefts: MotionValue<string>[];
  tabWidths: MotionValue<string>[];
  tabHeights: MotionValue<string>[];
  tabTops: MotionValue<string>[];
  tabFontSizes: MotionValue<number>[];
  tabFontColors: MotionValue<string>[];
  tabLightBgOpacities: (MotionValue<number> | number)[];
  tabSelectedOpacities: MotionValue<number>[];
}

const TABS: StageTabItem[] = [
  { 
    id: 1, x: 278, y: 479.391, width: 90, height: 90, viewBox: "0 0 90 90", 
    background: (
      <>
        <path d="M65.5 0H24.5C10.969 0 0 10.969 0 24.5V65.5C0 79.031 10.969 90 24.5 90H65.5C79.031 90 90 79.031 90 65.5V24.5C90 10.969 79.031 0 65.5 0Z" stroke="#404040" strokeWidth="2" />
        <path d="M65.066 0H24.066C10.259 0 -0.934 11.193 -0.934 25V66C-0.934 79.807 10.259 91 24.066 91H65.066C78.873 91 90.066 79.807 90.066 66V25C90.066 11.193 78.873 0 65.066 0Z" fill="url(#paint0_radial_0_1_rel)" />
      </>
    ),
    labelProps: { fill: "#E6E6E6", fontSize: 40, x: 45, y: 45, text: "1" }
  },
  { 
    id: 2, x: 375.5, y: 493.391, width: 76, height: 76, viewBox: "0 0 76 76" , 
    background: (
      <>
        <path d="M56 0H20C8.954 0 0 8.954 0 20V56C0 67.046 8.954 76 20 76H56C67.046 76 76 67.046 76 56V20C76 8.954 67.046 0 56 0Z" fill="url(#paint1_radial_0_1_rel)" />
        <path d="M56 0.5H20C9.23 0.5 0.5 9.23 0.5 20V56C0.5 66.77 9.23 75.5 20 75.5H56C66.77 75.5 75.5 66.77 75.5 56V20C75.5 9.23 66.77 0.5 56 0.5Z" stroke="#E1E1E1" />
      </>
    ),
    labelProps: { fill: "#2E2E2E", fontSize: 30, x: 38, y: 38, text: "2" }
  },
  { 
    id: 3, x: 458.5, y: 493.391, width: 76, height: 76, viewBox: "0 0 76 76" , 
    background: (
      <>
        <path d="M56 0H20C8.954 0 0 8.954 0 20V56C0 67.046 8.954 76 20 76H56C67.046 76 76 67.046 76 56V20C76 8.954 67.046 0 56 0Z" fill="url(#paint2_radial_0_1_rel)" />
        <path d="M56 0.5H20C9.23 0.5 0.5 9.23 0.5 20V56C0.5 66.77 9.23 75.5 20 75.5H56C66.77 75.5 75.5 66.77 75.5 56V20C75.5 9.23 66.77 0.5 56 0.5Z" stroke="#E1E1E1" />
      </>
    ),
    labelProps: { fill: "#2E2E2E", fontSize: 30, x: 38, y: 38, text: "3" }
  },
  { 
    id: 4, x: 541.5, y: 493.391, width: 76, height: 76, viewBox: "0 0 76 76" , 
    background: (
      <>
        <path d="M56 0H20C8.954 0 0 8.954 0 20V56C0 67.046 8.954 76 20 76H56C67.046 76 76 67.046 76 56V20C76 8.954 67.046 0 56 0Z" fill="url(#paint3_radial_0_1_rel)" />
        <path d="M56 0.5H20C9.23 0.5 0.5 9.23 0.5 20V56C0.5 66.77 9.23 75.5 20 75.5H56C66.77 75.5 75.5 66.77 75.5 56V20C75.5 9.23 66.77 0.5 56 0.5Z" stroke="#E1E1E1" />
      </>
    ),
    labelProps: { fill: "#2E2E2E", fontSize: 30, x: 38, y: 38, text: "4" }
  },
];

const HOVER_SCALE = 1.05;

export const StageTabBar: React.FC<StageTabBarProps> = ({
  hoveredTab,
  onHoverTab,
  onSelectStage,
  tab1Active,
  tab2Active,
  tab3Active,
  tab4Active,
  tabLefts,
  tabWidths,
  tabHeights,
  tabTops,
  tabFontSizes,
  tabFontColors,
  tabLightBgOpacities,
  tabSelectedOpacities,
}) => {
  const getHoverHalfDelta = (): number => {
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

  const getShift = (tabIndex: number): number => {
    if (hoveredTab === null) return 0;
    const hoveredIdx = hoveredTab - 1;
    if (tabIndex === hoveredIdx) return 0;
    const halfDelta = getHoverHalfDelta();
    return tabIndex < hoveredIdx ? -halfDelta : halfDelta;
  };

  const getTrackTransform = (): TrackTransformState => {
    const baseTrackX = 270.5;
    const baseTrackWidth = 355.5;
    if (hoveredTab === null) return { x: baseTrackX, width: baseTrackWidth };
    
    const halfDelta = getHoverHalfDelta();
    return {
      width: baseTrackWidth + halfDelta * 2,
      x: baseTrackX - halfDelta
    };
  };

  const trackState = getTrackTransform();

  return (
    <div 
      className="absolute z-30 pointer-events-none"
      style={{
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
    >
      {/* Track Background */}
      <motion.div
        className="absolute pointer-events-auto"
        animate={{
          width: getW(trackState.width),
          left: getX(trackState.x)
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          top: getY(486.391),
          height: getH(90),
          backgroundColor: '#F2F2F2',
          border: '1px solid #E1E1E1',
          borderRadius: '18px',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))',
        }}
      />

      {/* Buttons 1 2 3 4 with 100% Original Radial Gradients & Fonts */}
      {TABS.map((tab, index) => {
        const selectedTabRef = TABS[0];
        const unselectedTabRef = TABS[1];
        const isButton1 = tab.id === 1;

        return (
          <motion.div 
            key={tab.id}
            className="absolute cursor-pointer pointer-events-auto z-10 flex items-center justify-center select-none overflow-visible"
            onMouseEnter={() => onHoverTab(tab.id)}
            onMouseLeave={() => onHoverTab(null)}
            onClick={() => onSelectStage(tab.id)}
            animate={{
              x: getShift(index),
              scale: hoveredTab === tab.id ? HOVER_SCALE : 1
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
              <svg
                viewBox={tab.viewBox}
                fill="none" 
                className="absolute inset-0 w-full h-full overflow-visible"
              >
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
                    fontWeight: 'bold'
                  }}
                >
                  {tab.labelProps.text}
                </motion.text>
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
