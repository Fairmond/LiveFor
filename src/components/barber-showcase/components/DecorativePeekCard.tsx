import React from 'react';

export interface DecorativePeekCardProps {
  className?: string;
  opacity?: number;
  prefix?: string;
}

/**
 * 独立子组件：顶部右侧轻微露出的装饰卡片 (能力评级/季度数据预览)
 */
export const DecorativePeekCard: React.FC<DecorativePeekCardProps> = ({
  className = '',
  opacity = 0.9,
  prefix = 'sc_',
}) => {
  return (
    <g
      id="card-decorative-peek"
      className={`transition-opacity duration-300 ${className}`}
      opacity={opacity}
    >
      <rect
        width="88.672"
        height="187.862"
        rx="16"
        fill="#ffffff"
        filter={`url(#${prefix}card-shadow)`}
      />
      <path
        d="M16,0H88.672V185.27H16a16,16,0,0,1-16-16V16A16,16,0,0,1,16,0Z"
        transform="translate(0, 1.943)"
        fill="#f5f5f5"
      />
      <text
        x="23.321"
        y="32.195"
        fill="#999999"
        fontSize="14"
        fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, -apple-system, sans-serif"
        fontWeight="500"
      >
        季度数据
      </text>
      <g transform="translate(23.321, 97.818)">
        <text
          x="1.581"
          y="61.641"
          fill="#999999"
          fontSize="13"
          fontFamily="SourceHanSansCN-Regular, Source Han Sans CN, -apple-system, sans-serif"
          letterSpacing="0.04em"
        >
          总单数
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
          282
        </text>
      </g>
    </g>
  );
};
