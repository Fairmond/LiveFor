import { useState, useEffect, useRef, useCallback } from 'react';

export const FEATURE_DESC_ITEMS = [
  {
    id: 0,
    cardIndex: 0,
    label: '综合能力',
    descLine1: '从技术、沟通、审美、理解等多重维度进行深度',
    descLine2: '评测，真实客观反映理发师的综合实力。',
  },
  {
    id: 1,
    cardIndex: 1,
    label: '发型能力',
    descLine1: '展示理发师最擅长的发型以及排行榜，帮助用',
    descLine2: '户洞悉理发师的专业维度。',
  },
  {
    id: 2,
    cardIndex: 3,
    label: '性价比',
    descLine1: '结合主观好评与客观单价交叉验证，计算得到',
    descLine2: '的高可信度评分，为您折射极致性价比。',
  },
  {
    id: 3,
    cardIndex: 4,
    label: '季度数据',
    descLine1: '包含总单数、好评率以及评级等多维季度数据',
    descLine2: '交叉印证，打造高度真实的数据看板。',
  },
] as const;

export type FeatureDescItem = typeof FEATURE_DESC_ITEMS[number];

export interface UseBarberFeatureCarouselOptions {
  durationMs?: number; // 默认 3s (3000ms)
  initialState?: number;
}

export function useBarberFeatureCarousel({
  durationMs = 3000,
  initialState = 0,
}: UseBarberFeatureCarouselOptions = {}) {
  const [activeState, setActiveState] = useState<number>(initialState);
  const [progress, setProgress] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    setProgress(0);

    const tick = (now: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now;
      }
      const elapsed = now - startTimeRef.current;
      const currentProgress = Math.min(elapsed / durationMs, 1);
      setProgress(currentProgress);

      if (elapsed >= durationMs) {
        setActiveState((prev) => (prev + 1) % FEATURE_DESC_ITEMS.length);
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeState, durationMs]);

  const handleSelectState = useCallback((index: number) => {
    setActiveState(((index % 4) + 4) % 4);
    setProgress(0);
    startTimeRef.current = null;
  }, []);

  const currentItem = FEATURE_DESC_ITEMS[activeState] ?? FEATURE_DESC_ITEMS[0];
  const activeCardIndex = currentItem.cardIndex;

  const handleCardSelect = useCallback((cardIdx: number) => {
    const matched = FEATURE_DESC_ITEMS.findIndex((item) => item.cardIndex === cardIdx);
    if (matched !== -1) {
      handleSelectState(matched);
    }
  }, [handleSelectState]);

  return {
    activeState,
    progress,
    currentItem,
    activeCardIndex,
    handleSelectState,
    handleCardSelect,
  };
}
