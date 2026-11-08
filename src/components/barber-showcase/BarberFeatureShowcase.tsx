import React, { useState, useEffect, useId } from 'react';
import type { BarberFeatureShowcaseProps } from './types';
import { ShowcaseDefs } from './components/ShowcaseDefs';
import { OverallRatingCard } from './components/OverallRatingCard';
import { DecorativePeekCard } from './components/DecorativePeekCard';
import { HairstyleCard } from './components/HairstyleCard';
import { ValueScoreCard } from './components/ValueScoreCard';
import { QuarterDataCard } from './components/QuarterDataCard';
import { LensEdgeMask } from './components/LensEdgeMask';

/**
 * 主装配组件：全新组件化「功能轮换展示组」
 * 
 * 关键保障：
 * 1. 动态阴影响应：任一卡片被选中时，其投影颜色与范围自动切换为与「发型能力」完全一致的高亮发光投影 (active-card-shadow)，未选中时恢复为标准卡片阴影。
 * 2. 括号型遮罩高斯模糊：双端两侧优雅羽化。
 * 3. 实例 ID 作用域隔离：彻底避免多端碰撞与颜色丢失。
 */
export const BarberFeatureShowcase: React.FC<BarberFeatureShowcaseProps> = ({
  className = '',
  data,
  activeCardIndex = 1,
  onCardSelect,
  isMobile = false,
  leftMaskOffset,
}) => {
  const [selectedCard, setSelectedCard] = useState<number>(activeCardIndex);

  useEffect(() => {
    setSelectedCard(activeCardIndex);
  }, [activeCardIndex]);

  const reactId = useId();
  const prefix = `sc_${reactId.replace(/[^a-zA-Z0-9]/g, '')}_`;

  // 单击触发选中 (非悬浮)
  const activeIdx = selectedCard;

  // 左侧括号遮罩微调：PC 端向左微调 -24px，移动端保持标准居中 0px (在 700 视口坐标系下)
  const defaultLeftMaskOffset = isMobile ? 0 : -24;
  const effectiveLeftMaskOffset = leftMaskOffset ?? defaultLeftMaskOffset;

  const handleSelect = (idx: number) => {
    if (idx === 2) return; // 卡片 2 (NO.7 猜你想看) 为纯展示预览卡，不可被选中
    setSelectedCard(idx);
    onCardSelect?.(idx);
  };

  const getOpacity = (cardIdx: number, defaultOpacity: number) => {
    if (cardIdx !== 2 && activeIdx === cardIdx) return 1;
    if (isMobile) return 0.6; // 移动端未选中卡片统一 60% 不透明度
    return defaultOpacity;
  };

  // 卡片缩放动效：选中卡片按中心放大 (移动端 1.08x，平滑过渡)
  const getCardScaleStyle = (cardIdx: number, cx: number, cy: number) => {
    const isSelected = cardIdx !== 2 && activeIdx === cardIdx;
    const selectedScale = isMobile ? 1.08 : 1.055;
    const scale = isSelected ? selectedScale : 1;
    return {
      transformBox: 'fill-box' as const,
      transformOrigin: `${cx}px ${cy}px`,
      transform: `scale(${scale})`,
      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  // 5 个交互卡片渲染函数
  const renderCardItem = (cardIdx: number) => {
    switch (cardIdx) {
      case 0:
        return (
          <g
            key="card-0"
            transform="translate(131.114, 53.000)"
            className="cursor-pointer"
            onClick={() => handleSelect(0)}
          >
            <g style={getCardScaleStyle(0, 235.88, 93.93)}>
              <OverallRatingCard
                prefix={prefix}
                data={data?.overallRating}
                isSelected={activeIdx === 0}
                opacity={getOpacity(0, 0.75)}
              />
            </g>
          </g>
        );
      case 2:
        return (
          <g
            key="card-2"
            transform="translate(-19.817, 264.014)"
            className="pointer-events-none select-none"
          >
            <g style={getCardScaleStyle(2, 113.51, 91.0)}>
              <HairstyleCard
                prefix={prefix}
                data={{
                  title: '猜你想看',
                  rank: 'NO.7',
                  styleName: '纹理四六分',
                  imageUrl: '/男头图.png',
                  ...data?.leftGuessHairstyle,
                }}
                isSelected={false}
                opacity={getOpacity(2, 0.65)}
              />
            </g>
          </g>
        );
      case 1:
        return (
          <g
            key="card-1"
            transform="translate(229.305, 264.014)"
            className="cursor-pointer"
            onClick={() => handleSelect(1)}
          >
            <g style={getCardScaleStyle(1, 113.51, 91.0)}>
              <HairstyleCard
                prefix={prefix}
                data={{
                  title: '发型能力',
                  rank: 'NO.1',
                  styleName: '日式凌乱卷',
                  imageUrl: '/女头图.png',
                  ...data?.centerHairstyle,
                }}
                isSelected={activeIdx === 1}
                opacity={getOpacity(1, 1)}
              />
            </g>
          </g>
        );
      case 3:
        return (
          <g
            key="card-3"
            transform="translate(478.429, 264.475)"
            className="cursor-pointer"
            onClick={() => handleSelect(3)}
          >
            <g style={getCardScaleStyle(3, 113.45, 91.02)}>
              <ValueScoreCard
                prefix={prefix}
                data={data?.valueScore}
                isSelected={activeIdx === 3}
                opacity={getOpacity(3, 0.65)}
              />
            </g>
          </g>
        );
      case 4:
        return (
          <g
            key="card-4"
            transform="translate(168.82, 465.139)"
            className="cursor-pointer"
            onClick={() => handleSelect(4)}
          >
            <g style={getCardScaleStyle(4, 235.15, 93.93)}>
              <QuarterDataCard
                prefix={prefix}
                data={data?.quarterData}
                isSelected={activeIdx === 4}
                opacity={getOpacity(4, 0.75)}
              />
            </g>
          </g>
        );
      default:
        return null;
    }
  };

  // 保持层叠关系：选中卡片置顶绘制，以完整展现其放大轮廓与高亮发光投影
  const baseCardOrder = [0, 2, 1, 3, 4];
  const sortedCardIndices = [
    ...baseCardOrder.filter((idx) => idx !== activeIdx),
    ...(baseCardOrder.includes(activeIdx) ? [activeIdx] : []),
  ];

  return (
    <div
      className={`relative w-full aspect-square flex items-center justify-center select-none ${className}`}
      data-testid="barber-feature-showcase-modular"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 700"
        className="w-full h-full block"
        style={{ overflow: 'visible' }}
      >
        {/* 全局滤镜、渐变与裁剪蒙版定义 (带高斯模糊与实例前缀隔离) */}
        <ShowcaseDefs prefix={prefix} />

        {/* 视口边界裁剪容器 */}
        <g clipPath={`url(#${prefix}viewport-clip)`}>
          
          {/* 背景右上角纯装饰窥视卡 (始终位于底层) */}
          <g transform="translate(625.306, 53.733)" className="pointer-events-none">
            <DecorativePeekCard prefix={prefix} opacity={0.6} />
          </g>

          {/* 交互卡片组：未选中的卡片先在底层绘制，选中卡片在顶层最后绘制以使其大阴影覆盖在其他卡片上方 */}
          {sortedCardIndices.map((idx) => renderCardItem(idx))}

          {/* 透镜边缘弧形遮罩 (带高斯模糊，两侧与 #f9f9f9 背景无缝融接) */}
          <LensEdgeMask prefix={prefix} fillColor="#f9f9f9" leftMaskOffset={effectiveLeftMaskOffset} />

        </g>
      </svg>
    </div>
  );
};

export default BarberFeatureShowcase;
