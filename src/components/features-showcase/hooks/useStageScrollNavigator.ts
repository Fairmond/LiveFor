import React, { useCallback } from 'react';
import { smoothScrollTo } from '../math';
import type { StageId } from '../types';

export interface UseStageScrollNavigatorOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  stageProgressTargets?: [number, number, number, number];
  duration?: number;
}

export function useStageScrollNavigator({
  containerRef,
  stageProgressTargets = [0.18, 0.35, 0.60, 0.85],
  duration = 750,
}: UseStageScrollNavigatorOptions) {
  const scrollToStage = useCallback(
    (stageId: StageId) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const scrollableDistance = containerRef.current.clientHeight - window.innerHeight;

      const targetProgress = stageProgressTargets[stageId - 1] ?? 0;
      const targetY = containerTop + scrollableDistance * targetProgress;
      smoothScrollTo(targetY, duration);
    },
    [containerRef, stageProgressTargets, duration]
  );

  return {
    scrollToStage,
  };
}
