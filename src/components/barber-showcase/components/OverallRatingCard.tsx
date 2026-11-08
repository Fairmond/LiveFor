import React from 'react';
import type { OverallRatingData } from '../types';

export interface OverallRatingCardProps {
  data?: Partial<OverallRatingData>;
  opacity?: number;
  isSelected?: boolean;
  className?: string;
  prefix?: string;
}

const DEFAULT_DATA: OverallRatingData = {
  title: '综合能力评级',
  ratingGrade: 'S',
  metrics: [
    { label: '技术', grade: 'A' },
    { label: '理解', grade: 'B' },
    { label: '审美', grade: 'S' },
    { label: '沟通', grade: 'S' },
  ],
};

/**
 * 独立子组件：顶部「综合能力评级」卡片
 * 1. 选中时应用与「发型能力」完全一致的高亮发光投影 (active-card-shadow)，未选中时为标准阴影
 * 2. 卡片底色与其他卡片统一为 #f5f5f5
 * 3. S 字母在圆环中精准居中
 */
export const OverallRatingCard: React.FC<OverallRatingCardProps> = ({
  data,
  opacity = 1,
  isSelected = false,
  className = '',
  prefix = 'sc_',
}) => {
  const mergedData = { ...DEFAULT_DATA, ...data };
  const metrics = mergedData.metrics;

  return (
    <g
      id="card-overall-rating"
      className={`transition-all duration-300 ${className}`}
      opacity={opacity}
    >
      {/* 1. 卡片底座投影 (选中时切换为 active-card-shadow) */}
      <rect
        width="471.767"
        height="187.862"
        rx="16"
        fill="#ffffff"
        filter={isSelected ? `url(#${prefix}active-card-shadow)` : `url(#${prefix}card-shadow)`}
      />

      {/* 2. 卡片表面底色：统一 #f5f5f5 */}
      <rect
        y="2.591"
        width="471.767"
        height="185.27"
        rx="16"
        fill="#f5f5f5"
      />

      {/* 3. 标题文案 */}
      <text
        x="24.053"
        y="32.928"
        fill="#999999"
        fontSize="14"
        fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, -apple-system, sans-serif"
        fontWeight="500"
      >
        {mergedData.title}
      </text>

      {/* 4. 四项维度评级标签 */}
      <g transform="translate(29.236, 98.55)">
        {metrics.map((item, idx) => {
          const xOffsets = [0, 69.962, 137.334, 206];
          const x = xOffsets[idx] ?? idx * 70;
          return (
            <g key={item.label} transform={`translate(${x}, 0)`}>
              <text
                x="0"
                y="60.641"
                fill="#999999"
                fontSize="12"
                fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, sans-serif"
                letterSpacing="0.04em"
              >
                {item.label}
              </text>
              <text
                x="6.48"
                y="28"
                fill="#333333"
                fontSize="24"
                fontFamily="SourceHanSansCN-Bold, Source Han Sans CN, -apple-system, sans-serif"
                fontWeight="700"
                letterSpacing="0.04em"
              >
                {item.grade}
              </text>
            </g>
          );
        })}
      </g>

      {/* 5. S 评级圆环仪表盘 */}
      <g transform="translate(310.818, 25.349)">
        {/* 底层白圆 */}
        <circle
          cx="70.391"
          cy="70.391"
          r="70.391"
          fill="#ffffff"
        />

        {/* 黑色质感圆环 (带深色渐变) */}
        <path
          d="M70.391,28.156a42.235,42.235,0,1,0,42.235,42.235A42.282,42.282,0,0,0,70.391,28.156M70.391,0A70.391,70.391,0,1,1,0,70.391,70.391,70.391,0,0,1,70.391,0Z"
          fill={`url(#${prefix}dark-ring-gradient)`}
        />

        {/* 红色 S 评级弧度扇区 (局部归一化定位) */}
        <path
          d="M105.392,75.532C93.644,87.381,75.915,95.391,56.317,95.391A69.48,69.48,0,0,1,19.757,85.164,68.347,68.347,0,0,1,7.752,76.032L56.317,25Z"
          transform="translate(14.08, 45.39)"
          fill={`url(#${prefix}red-arc-gradient)`}
          filter={`url(#${prefix}red-arc-glow)`}
        />

        {/* 圆心白色内环 */}
        <circle
          cx="70.391"
          cy="70.391"
          r="42.235"
          fill="#ffffff"
        />

        {/* 核心 S 字母：基线对齐圆心 70.391 */}
        <text
          x="70.391"
          y="87.5"
          textAnchor="middle"
          fill="#b70f00"
          fontSize="50"
          fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="500"
          letterSpacing="0.04em"
          filter={`url(#${prefix}s-letter-shadow)`}
        >
          {mergedData.ratingGrade}
        </text>
      </g>
    </g>
  );
};
