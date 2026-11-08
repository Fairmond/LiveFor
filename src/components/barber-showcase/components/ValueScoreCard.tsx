import React from 'react';
import type { ValueScoreData } from '../types';

export interface ValueScoreCardProps {
  data?: Partial<ValueScoreData>;
  opacity?: number;
  isSelected?: boolean;
  className?: string;
  prefix?: string;
}

const DEFAULT_DATA: ValueScoreData = {
  title: '性价比',
  score: '9.7',
  maxScore: '10',
};

/**
 * 独立子组件：性价比数据卡片
 * 选中时应用与「发型能力」完全一致的高亮投影 (active-card-shadow)
 */
export const ValueScoreCard: React.FC<ValueScoreCardProps> = ({
  data,
  opacity = 1,
  isSelected = false,
  className = '',
  prefix = 'sc_',
}) => {
  const mergedData = { ...DEFAULT_DATA, ...data };

  return (
    <g
      id="card-value-score"
      className={`transition-all duration-300 ${className}`}
      opacity={opacity}
    >
      {/* 1. 卡片底座与投影 (选中时切换为 active-card-shadow) */}
      <rect
        width="226.904"
        height="182.044"
        rx="18"
        fill="#ffffff"
        filter={isSelected ? `url(#${prefix}active-card-shadow)` : `url(#${prefix}card-shadow)`}
      />
      <rect
        x="0.713"
        y="1.982"
        width="225.259"
        height="179.966"
        rx="16"
        fill="#f5f5f5"
      />

      {/* 2. 标题 */}
      <text
        x="16.414"
        y="29.457"
        fill="#a8a8a8"
        fontSize="14"
        fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, -apple-system, sans-serif"
        fontWeight="500"
      >
        {mergedData.title}
      </text>

      {/* 3. 评分展示 */}
      <g transform="translate(16.28, 138.533)">
        <text
          x="0"
          y="20"
          fill="#333333"
          fontSize="17"
          fontFamily="SourceHanSansCN-Bold, Source Han Sans CN, -apple-system, sans-serif"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          {mergedData.score}
        </text>
        <text
          x="35.292"
          y="18.992"
          fill="#a8a8a8"
          fontSize="12"
          fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, sans-serif"
          letterSpacing="0.04em"
        >
          /
        </text>
        <text
          x="41.2"
          y="19.973"
          fill="#a8a8a8"
          fontSize="12"
          fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          {mergedData.maxScore}
        </text>
      </g>

      {/* 4. 3D 红色动态液体球 */}
      <g transform="translate(75.662, 16.099)">
        {/* 底球内凹质感底色 */}
        <circle
          cx="53.572"
          cy="53.572"
          r="53.572"
          transform="translate(27.62, 0)"
          fill="#eeeded"
        />

        {/* 蒙版裁切内的双波浪水体 */}
        <g clipPath={`url(#${prefix}liquid-clip)`}>
          {/* 上波浪 */}
          <path
            d="M-12.471,10.892c.552-.45,4.282-4.573,5.166-5.191C7.216-4.505,27.594,1.307,32.676.662c.1-.006-.5,13.045-2.229,14.654"
            transform="translate(55.485, 16.104)"
            stroke="#cf1d0d"
            strokeWidth="0.3"
            fill={`url(#${prefix}wave-gradient-1)`}
          />
          {/* 主体红色波浪水域 */}
          <path
            d="M3.273,9.75s11.38,9.427,22.7,8.134S54.675-1.2,73.906.093,94.379,9.145,94.379,9.145l4.929,43.342L83.028,92.412,51.677,111.05-11.346,96.966-18.256,46.5l8.7-26.387L-4.176,3.552Z"
            transform="translate(42.197, 8.391)"
            stroke="#cf1d0d"
            strokeWidth="0.3"
            fill={`url(#${prefix}wave-gradient-2)`}
          />
          {/* 水面反光线条 */}
          <path
            d="M.43,3.043s16.144-5.5,24.757-1.637,19.343,9.123,31.273,5.068"
            transform="translate(77.587, 19.595)"
            fill="none"
            stroke="#cf1d0d"
            strokeWidth="0.3"
          />
        </g>

        {/* 液体球外部发光玻璃质感光环 */}
        <path
          d="M53.973,1.3A52.888,52.888,0,0,0,16.723,16.511a51.715,51.715,0,0,0-11.285,16.5,51.411,51.411,0,0,0,0,40.409,51.715,51.715,0,0,0,11.285,16.5,53.326,53.326,0,0,0,57.758,11.131A52.548,52.548,0,0,0,91.224,89.927a51.715,51.715,0,0,0,11.285-16.5,51.411,51.411,0,0,0,0-40.409,51.715,51.715,0,0,0-11.285-16.5A52.888,52.888,0,0,0,53.973,1.3m0-1.3c29.809,0,53.973,23.827,53.973,53.219s-24.165,54.34-53.973,54.34S0,82.611,0,53.219,24.165,0,53.973,0Z"
          transform="translate(27.43, 0)"
          fill={`url(#${prefix}sphere-ring-gradient)`}
          filter={`url(#${prefix}sphere-glow)`}
        />
      </g>
    </g>
  );
};
