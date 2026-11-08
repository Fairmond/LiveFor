import React from 'react';
import type { QuarterStatsData } from '../types';

export interface QuarterDataCardProps {
  data?: Partial<QuarterStatsData>;
  opacity?: number;
  isSelected?: boolean;
  className?: string;
  prefix?: string;
}

const DEFAULT_DATA: QuarterStatsData = {
  title: '季度数据',
  score: '7.5',
  scoreLabel: '得分',
  stats: [
    { label: '总单数', value: '282' },
    { label: '好评', value: '105' },
    { label: '中评', value: '46' },
    { label: '差评', value: '22' },
  ],
};

/**
 * 独立子组件：底部「季度数据」卡片
 * 选中时应用与「发型能力」完全一致的高亮投影 (active-card-shadow)
 */
export const QuarterDataCard: React.FC<QuarterDataCardProps> = ({
  data,
  opacity = 1,
  isSelected = false,
  className = '',
  prefix = 'sc_',
}) => {
  const mergedData = { ...DEFAULT_DATA, ...data };
  const stats = mergedData.stats;

  return (
    <g
      id="card-quarter-data"
      className={`transition-all duration-300 ${className}`}
      opacity={opacity}
    >
      {/* 1. 卡片底座与投影 (选中时切换为 active-card-shadow) */}
      <rect
        width="470.301"
        height="187.862"
        rx="16"
        fill="#ffffff"
        filter={isSelected ? `url(#${prefix}active-card-shadow)` : `url(#${prefix}card-shadow)`}
      />
      <rect
        y="2.591"
        width="470.301"
        height="185.27"
        rx="16"
        fill="#f5f5f5"
      />

      {/* 2. 标题 */}
      <text
        x="23.321"
        y="32.195"
        fill="#999999"
        fontSize="14"
        fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, -apple-system, sans-serif"
        fontWeight="500"
      >
        {mergedData.title}
      </text>

      {/* 3. 四项数量统计 (总单数、好评、中评、差评) */}
      <g transform="translate(23.321, 97.818)">
        {stats.map((item, idx) => {
          const xOffsets = [0, 70.445, 145.51, 214.176];
          const x = xOffsets[idx] ?? idx * 72;
          return (
            <g key={item.label} transform={`translate(${x}, 0)`}>
              <text
                x={idx === 0 ? '1.58' : '1.47'}
                y="61.641"
                fill="#999999"
                fontSize={idx === 0 ? '13' : '12'}
                fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, sans-serif"
                letterSpacing="0.04em"
              >
                {item.label}
              </text>
              <text
                x="0"
                y="29"
                fill="#333333"
                fontSize="25"
                fontFamily="SourceHanSansCN-Bold, Source Han Sans CN, -apple-system, sans-serif"
                fontWeight="700"
                letterSpacing="0.04em"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </g>

      {/* 4. 红/黄/绿三色总评分环形饼图 */}
      <g transform="translate(310.25, 3.819)">
        {/* 浅灰底圆 */}
        <circle
          cx="70.391"
          cy="70.391"
          r="70.391"
          transform="translate(0, 22.478)"
          fill="#f2f2f2"
        />

        {/* 红色扇区 */}
        <path
          d="M70.391,0A70.111,70.111,0,0,1,60.159,36.543L0,0"
          transform="matrix(0.21, -0.98, 0.98, 0.21, 70.39, 92.79)"
          fill={`url(#${prefix}pie-red)`}
          filter={`url(#${prefix}pie-glow-red)`}
        />

        {/* 黄色扇区 */}
        <path
          d="M70.391,0A70.455,70.455,0,0,1,33.516,61.915L0,0"
          transform="matrix(-0.76, -0.65, 0.65, -0.76, 70.51, 92.75)"
          fill={`url(#${prefix}pie-yellow)`}
          filter={`url(#${prefix}pie-glow-yellow)`}
        />

        {/* 绿色主扇区 */}
        <path
          d="M115.932,0A70.391,70.391,0,0,1,45.541,70.391,70.232,70.232,0,0,1,0,53.676L45.541,0"
          transform="translate(70.54, 47.2) rotate(90)"
          fill={`url(#${prefix}pie-green)`}
          filter={`url(#${prefix}pie-glow-green)`}
        />

        {/* 饼图中心白色圆 (圆心 70.54, 92.89) */}
        <ellipse
          cx="41.765"
          cy="41.765"
          rx="41.765"
          ry="41.765"
          transform="translate(28.772, 51.128)"
          fill="#ffffff"
        />

        {/* 分数与文本：精准对齐圆心 (70.54, 92.89) */}
        <text
          x="70.54"
          y="93"
          textAnchor="middle"
          fill="#333333"
          fontSize="26"
          fontFamily="SourceHanSansCN-Bold, Source Han Sans CN, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          {mergedData.score}
        </text>
        <text
          x="70.54"
          y="110"
          textAnchor="middle"
          fill="#999999"
          fontSize="12"
          fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, BlinkMacSystemFont, sans-serif"
          letterSpacing="0.04em"
        >
          {mergedData.scoreLabel}
        </text>
      </g>
    </g>
  );
};
