import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { BackgroundAtmosphere } from './BackgroundAtmosphere';
import { BackgroundGrid } from './BackgroundGrid';
import { useFeatureScrollStage } from './features-showcase/hooks/useFeatureScrollStage';
import { useStageScrollNavigator } from './features-showcase/hooks/useStageScrollNavigator';
import { StageDescription } from './features-showcase/StageDescription';
import { StageTabBar } from './features-showcase/StageTabBar';
import { StageOneMockup } from './features-showcase/StageOneMockup';
import { StageMultiMockup } from './features-showcase/StageMultiMockup';

export const UnifiedFeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  // 1. 逻辑与动画状态层抽离 (Custom Hook)
  const stageScroll = useFeatureScrollStage({ containerRef });

  // 2. 阶段滚动导航层抽离 (Custom Hook)
  const { scrollToStage } = useStageScrollNavigator({ containerRef });

  return (
    <section 
      ref={containerRef}
      id="unified-features-section"
      className="relative w-full h-[400vh] bg-brand-bg select-none"
    >
      {/* Sticky Viewport Stage: Perfectly Centered Viewport Pinning */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Master 1440 x 700 SVG Coordinate Stage */}
        <div 
          className="relative w-full max-w-[1440px] aspect-[1440/700] mx-auto flex items-center justify-center overflow-visible"
          style={{ aspectRatio: '1440 / 700' }}
        >
          {/* Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <BackgroundAtmosphere />
          </div>

          {/* Rolling Tian Grid (moves up during Stage 4 to reveal lower quadrants) */}
          <motion.div 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ y: stageScroll.gridRoll }}
          >
            <BackgroundGrid type="page3" limitBottom={false} />
          </motion.div>

          {/* 1. 纯展示子组件：左侧阶段文案区 (Stage 1~4) */}
          <StageDescription
            text1Opacity={stageScroll.text1Opacity}
            text1Y={stageScroll.text1Y}
            text2Opacity={stageScroll.text2Opacity}
            text2Y={stageScroll.text2Y}
            text3Opacity={stageScroll.text3Opacity}
            text3Y={stageScroll.text3Y}
            text4Opacity={stageScroll.text4Opacity}
            text4Y={stageScroll.text4Y}
          />

          {/* 2. 纯展示子组件：阶段指示器选项卡与底座 (1 2 3 4) */}
          <StageTabBar
            hoveredTab={hoveredTab}
            onHoverTab={setHoveredTab}
            onSelectStage={scrollToStage}
            tab1Active={stageScroll.tab1Active}
            tab2Active={stageScroll.tab2Active}
            tab3Active={stageScroll.tab3Active}
            tab4Active={stageScroll.tab4Active}
            tabLefts={stageScroll.tabLefts}
            tabWidths={stageScroll.tabWidths}
            tabHeights={stageScroll.tabHeights}
            tabTops={stageScroll.tabTops}
            tabFontSizes={stageScroll.tabFontSizes}
            tabFontColors={stageScroll.tabFontColors}
            tabLightBgOpacities={stageScroll.tabLightBgOpacities}
            tabSelectedOpacities={stageScroll.tabSelectedOpacities}
          />

          {/* 3. 纯展示子组件：Stage 1 样机展开与浮动卡片群组 */}
          <StageOneMockup
            phone1Opacity={stageScroll.phone1Opacity}
            mainImgOpacity={stageScroll.mainImgOpacity}
            mainImgX={stageScroll.mainImgX}
            titleOpacity={stageScroll.titleOpacity}
            titleX={stageScroll.titleX}
            lengthImgOpacity={stageScroll.lengthImgOpacity}
            lengthImgX={stageScroll.lengthImgX}
            textureImgOpacity={stageScroll.textureImgOpacity}
            textureImgX={stageScroll.textureImgX}
            permImgOpacity={stageScroll.permImgOpacity}
            permImgX={stageScroll.permImgX}
            mainRefImgOpacity={stageScroll.mainRefImgOpacity}
            mainRefImgX={stageScroll.mainRefImgX}
            displayImgOpacity={stageScroll.displayImgOpacity}
            displayImgY={stageScroll.displayImgY}
          />

          {/* 4. 纯展示子组件：Stage 2/3/4 原地 HUD 交叉淡入淡出与田字格推移样机 */}
          <StageMultiMockup
            phone2Opacity={stageScroll.phone2Opacity}
            phone2SlideX={stageScroll.phone2SlideX}
            hud1Opacity={stageScroll.hud1Opacity}
            hud2Opacity={stageScroll.hud2Opacity}
            tab1SwitchOpacity={stageScroll.tab1SwitchOpacity}
            tab2SwitchOpacity={stageScroll.tab2SwitchOpacity}
            phone2ParallaxY={stageScroll.phone2ParallaxY}
          />

        </div>

      </div>
    </section>
  );
};
