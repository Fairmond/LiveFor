import React from 'react';
import { useScroll, useSpring, useTransform } from 'motion/react';
import { getX, getY, getW, getH } from '../math';
import type { StageScrollState } from '../types';

export interface UseFeatureScrollStageOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useFeatureScrollStage({
  containerRef,
}: UseFeatureScrollStageOptions): StageScrollState {
  // SCROLL PROGRESS ENGINE (0.00 ~ 1.00)
  // Section height = 400vh:
  // - 0.00 ~ 0.25 : Stage 1 (造型高度个性化 + 样机1展开)
  // - 0.25 ~ 0.50 : Stage 2 (需求高度精准化 + 样机2 HUD1 & 选项卡1)
  // - 0.50 ~ 0.75 : Stage 3 (所有需求逐条确认 + 样机2 原地替换 HUD2 & 选项卡2)
  // - 0.75 ~ 1.00 : Stage 4 (进度实时指示 + 田字格与样机下半部分推移到位)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 38,
    restDelta: 0.0001,
  });

  // 1. INDICATOR 1 2 3 4 OPACITIES
  const tab1Active = useTransform(smoothProgress, [0.0, 0.22, 0.27], [1, 1, 0], { clamp: true });
  const tab2Active = useTransform(smoothProgress, [0.24, 0.29, 0.45, 0.50], [0, 1, 1, 0], { clamp: true });
  const tab3Active = useTransform(smoothProgress, [0.48, 0.53, 0.70, 0.75], [0, 1, 1, 0], { clamp: true });
  const tab4Active = useTransform(smoothProgress, [0.73, 0.78, 1.0], [0, 1, 1], { clamp: true });

  // INDICATOR TAB POSITION & SIZE TRANSFORMS
  const tab1Left = useTransform(smoothProgress, () => getX(278));
  const tab2Left = useTransform([tab1Active], (latest: number[]) => {
    const [t1] = latest;
    const w1 = (t1 ?? 0) * 14 + 76;
    return getX(278 + w1 + 7.5);
  });
  const tab3Left = useTransform([tab1Active, tab2Active], (latest: number[]) => {
    const [t1, t2] = latest;
    const w1 = (t1 ?? 0) * 14 + 76;
    const w2 = (t2 ?? 0) * 14 + 76;
    return getX(278 + w1 + 7.5 + w2 + 7.5);
  });
  const tab4Left = useTransform([tab1Active, tab2Active, tab3Active], (latest: number[]) => {
    const [t1, t2, t3] = latest;
    const w1 = (t1 ?? 0) * 14 + 76;
    const w2 = (t2 ?? 0) * 14 + 76;
    const w3 = (t3 ?? 0) * 14 + 76;
    return getX(278 + w1 + 7.5 + w2 + 7.5 + w3 + 7.5);
  });
  const tabLefts = [tab1Left, tab2Left, tab3Left, tab4Left];

  const tab1W = useTransform(tab1Active, [0, 1], [getW(76), getW(90)]);
  const tab2W = useTransform(tab2Active, [0, 1], [getW(76), getW(90)]);
  const tab3W = useTransform(tab3Active, [0, 1], [getW(76), getW(90)]);
  const tab4W = useTransform(tab4Active, [0, 1], [getW(76), getW(90)]);
  const tabWidths = [tab1W, tab2W, tab3W, tab4W];

  const tab1H = useTransform(tab1Active, [0, 1], [getH(76), getH(90)]);
  const tab2H = useTransform(tab2Active, [0, 1], [getH(76), getH(90)]);
  const tab3H = useTransform(tab3Active, [0, 1], [getH(76), getH(90)]);
  const tab4H = useTransform(tab4Active, [0, 1], [getH(76), getH(90)]);
  const tabHeights = [tab1H, tab2H, tab3H, tab4H];

  const tab1Top = useTransform(tab1Active, [0, 1], [getY(493.391), getY(479.391)]);
  const tab2Top = useTransform(tab2Active, [0, 1], [getY(493.391), getY(479.391)]);
  const tab3Top = useTransform(tab3Active, [0, 1], [getY(493.391), getY(479.391)]);
  const tab4Top = useTransform(tab4Active, [0, 1], [getY(493.391), getY(479.391)]);
  const tabTops = [tab1Top, tab2Top, tab3Top, tab4Top];

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

  const tab1LightBgOpacity = useTransform(tab1Active, (v) => 1 - v);
  const tabLightBgOpacities = [tab1LightBgOpacity, 1, 1, 1];
  const tabSelectedOpacities = [tab1Active, tab2Active, tab3Active, tab4Active];

  // 2. TEXT CROSSFADES
  const text1Opacity = useTransform(smoothProgress, [0.0, 0.22, 0.27], [1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0.0, 0.22, 0.27], [0, 0, -15]);

  const text2Opacity = useTransform(smoothProgress, [0.24, 0.29, 0.44, 0.49], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.24, 0.29, 0.44, 0.49], [15, 0, 0, -15]);

  const text3Opacity = useTransform(smoothProgress, [0.49, 0.54, 0.69, 0.74], [0, 1, 1, 0]);
  const text3Y = useTransform(smoothProgress, [0.49, 0.54, 0.69, 0.74], [15, 0, 0, -15]);

  const text4Opacity = useTransform(smoothProgress, [0.74, 0.79, 1.0], [0, 1, 1]);
  const text4Y = useTransform(smoothProgress, [0.74, 0.79, 1.0], [15, 0, 0]);

  // 3. BACKGROUND GRID ROLL
  const gridRoll = useTransform(smoothProgress, [0.72, 0.83], ['0%', '-87.1429%']);

  // 4. PHONE 1 (Stage 1 Standalone Mockup)
  const phone1Opacity = useTransform(smoothProgress, [0.0, 0.22, 0.27], [1, 1, 0]);
  const mainImgOpacity = useTransform(smoothProgress, [0.0, 0.08], [0, 1]);
  const mainImgX = useTransform(smoothProgress, [0.0, 0.08], [getX(-50), '0%']);

  const titleOpacity = useTransform(smoothProgress, [0.01, 0.09], [0, 1]);
  const titleX = useTransform(smoothProgress, [0.01, 0.09], [60, 0]);

  const lengthImgOpacity = useTransform(smoothProgress, [0.02, 0.10], [0, 1]);
  const lengthImgX = useTransform(smoothProgress, [0.02, 0.10], [getX(100), '0%']);

  const textureImgOpacity = useTransform(smoothProgress, [0.04, 0.12], [0, 1]);
  const textureImgX = useTransform(smoothProgress, [0.04, 0.12], [getX(100), '0%']);

  const permImgOpacity = useTransform(smoothProgress, [0.06, 0.14], [0, 1]);
  const permImgX = useTransform(smoothProgress, [0.06, 0.14], [getX(100), '0%']);

  const mainRefImgOpacity = useTransform(smoothProgress, [0.08, 0.16], [0, 1]);
  const mainRefImgX = useTransform(smoothProgress, [0.08, 0.16], [getX(100), '0%']);

  const displayImgOpacity = useTransform(smoothProgress, [0.05, 0.13], [0, 1]);
  const displayImgY = useTransform(smoothProgress, [0.05, 0.13], [getY(30), '0%']);

  // 5. PHONE 2 (Stage 2/3/4 Mockup)
  const phone2Opacity = useTransform(smoothProgress, [0.24, 0.29, 1.0], [0, 1, 1]);
  const phone2SlideX = useTransform(smoothProgress, [0.24, 0.29], [500, 0]);

  const hud1Opacity = useTransform(smoothProgress, [0.45, 0.53], [1, 0]);
  const hud2Opacity = useTransform(smoothProgress, [0.50, 0.58], [0, 1]);

  const tab1SwitchOpacity = useTransform(smoothProgress, [0.48, 0.52], [1, 0]);
  const tab2SwitchOpacity = useTransform(smoothProgress, [0.48, 0.52], [0, 1]);

  const phone2ParallaxY = useTransform(smoothProgress, [0.72, 0.83], ['0%', '-26.6225%'], { clamp: true });

  return {
    scrollYProgress,
    smoothProgress,
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
    text1Opacity,
    text1Y,
    text2Opacity,
    text2Y,
    text3Opacity,
    text3Y,
    text4Opacity,
    text4Y,
    gridRoll,
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
    phone2Opacity,
    phone2SlideX,
    hud1Opacity,
    hud2Opacity,
    tab1SwitchOpacity,
    tab2SwitchOpacity,
    phone2ParallaxY,
  };
}
