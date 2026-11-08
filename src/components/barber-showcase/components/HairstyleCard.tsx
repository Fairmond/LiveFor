import React from 'react';
import type { HairstyleData } from '../types';

export interface HairstyleCardProps {
  data?: Partial<HairstyleData>;
  isActive?: boolean;
  isSelected?: boolean;
  opacity?: number;
  className?: string;
  prefix?: string;
}

const DEFAULT_DATA: HairstyleData = {
  title: '发型能力',
  rank: 'NO.1',
  styleName: '日式凌乱卷',
  imageUrl: '/女头图.png',
};

/**
 * 独立子组件：发型能力 / 猜你想看卡片
 */
export const HairstyleCard: React.FC<HairstyleCardProps> = ({
  data,
  isActive,
  isSelected,
  opacity = 1,
  className = '',
  prefix = 'sc_',
}) => {
  const mergedData = { ...DEFAULT_DATA, ...data };
  const activeState = isSelected ?? isActive ?? false;

  return (
    <g
      id={`card-hairstyle-${mergedData.rank}`}
      className={`transition-all duration-300 ${className}`}
      opacity={opacity}
    >
      {/* 1. 浮起发光投影 (选中时切换为 active-card-shadow) */}
      <path
        d="M16,0H210.9a16,16,0,0,1,16,16V163.893a18,18,0,0,1-18,18H18a18,18,0,0,1-18-18V16A16,16,0,0,1,16,0Z"
        fill="#ffffff"
        filter={activeState ? `url(#${prefix}active-card-shadow)` : `url(#${prefix}card-shadow)`}
      />

      {/* 2. 卡片浅灰底色 */}
      <rect
        x="0.991"
        y="1.927"
        width="225.259"
        height="179.966"
        rx="16"
        fill="#f5f5f5"
      />

      {/* 3. 标题 */}
      <text
        x="16.089"
        y="29.918"
        fill="#a8a8a8"
        fontSize="14"
        fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, -apple-system, sans-serif"
        fontWeight="500"
      >
        {mergedData.title}
      </text>

      {/* 4. 排名标签与发型名称 */}
      <text
        x="16.089"
        y="159.532"
        fill="#333333"
        fontSize="17"
        fontFamily="SourceHanSansCN-Bold, Source Han Sans CN, -apple-system, sans-serif"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        {mergedData.rank}
      </text>

      <text
        x="72.09"
        y="159.967"
        fill="#a8a8a8"
        fontSize="13"
        fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, sans-serif"
        letterSpacing="0.04em"
      >
        {mergedData.styleName}
      </text>

      {/* 5. 发型切图 (带 12px 圆角裁剪) */}
      <g transform="translate(104.26, 18.146)">
        <image
          href={mergedData.imageUrl}
          width="106.289"
          height="105.685"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${prefix}avatar-clip)`}
        />
      </g>
    </g>
  );
};
