import React from 'react';
import type { MotionValue } from 'motion/react';

export type StageId = 1 | 2 | 3 | 4;

export interface StageTabItem {
  id: StageId;
  x: number;
  y: number;
  width: number;
  height: number;
  viewBox: string;
  background: React.ReactNode;
  labelProps: {
    fill: string;
    fontSize: number;
    x: number;
    y: number;
    text: string;
  };
}

export interface TrackTransformState {
  x: number;
  width: number;
}

export interface StageScrollState {
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  
  // Tab indicators
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

  // Texts
  text1Opacity: MotionValue<number>;
  text1Y: MotionValue<number>;
  text2Opacity: MotionValue<number>;
  text2Y: MotionValue<number>;
  text3Opacity: MotionValue<number>;
  text3Y: MotionValue<number>;
  text4Opacity: MotionValue<number>;
  text4Y: MotionValue<number>;

  // Grid
  gridRoll: MotionValue<string>;

  // Stage 1 Mockup
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

  // Stage 2/3/4 Mockup
  phone2Opacity: MotionValue<number>;
  phone2SlideX: MotionValue<number>;
  hud1Opacity: MotionValue<number>;
  hud2Opacity: MotionValue<number>;
  tab1SwitchOpacity: MotionValue<number>;
  tab2SwitchOpacity: MotionValue<number>;
  phone2ParallaxY: MotionValue<string>;
}
