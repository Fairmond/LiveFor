import React, { useId } from 'react';

// 综合能力标识 (红色渐变 + S)
export const TalentMark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `talent-mark-grad-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={116} height={34} viewBox="0 0 116 34" {...props}>
      <defs>
        <linearGradient id={gradId} x1={0.5} y1={0.391} x2={0.12} y2={0.111} gradientUnits="objectBoundingBox">
          <stop offset={0} stopColor="#c73a2e" />
          <stop offset={1} stopColor="#e46156" />
        </linearGradient>
      </defs>
      <rect width={116} height={34} rx={6} fill="#2a2a2a" />
      <rect width={24} height={24} rx={6} fill="#c73a2e" style={{ fill: `url(#${gradId})` }} transform="translate(7 5)" />
      <circle cx={9} cy={9} r={9} fill="#fff" transform="translate(10 8)" />
      <text
        style={{
          fontFamily: 'SourceHanSansCN-Medium, Source Han Sans CN',
          fontWeight: 500,
          letterSpacing: '.06em',
          fill: '#c73a2e',
          fontSize: 12,
        }}
        transform="translate(15.5 21.5)"
      >
        <tspan x={0} y={0}>S</tspan>
      </text>
      <text
        style={{
          fontFamily: 'SourceHanSansCN-Medium, Source Han Sans CN',
          fontWeight: 500,
          letterSpacing: '.06em',
          fill: '#f1f1f1',
          fontSize: 16,
        }}
        transform="translate(42 24)"
      >
        <tspan x={0} y={0}>综合能力</tspan>
      </text>
    </svg>
  );
};

// 发型能力标识 (蓝色渐变 + 3柱排行榜矢量icon)
export const HairstyleMark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `hair-mark-grad-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={116} height={34} viewBox="0 0 116 34" {...props}>
      <defs>
        <linearGradient id={gradId} x1="0.365" y1="0.5" x2="0.131" y2="0.182" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#4f8abd" />
          <stop offset="1" stopColor="#6dade7" />
        </linearGradient>
      </defs>
      <rect width={116} height={34} rx={6} fill="#2a2a2a" />
      <g transform="translate(7 5)">
        <rect width={24} height={24} rx={6} fill="#4f8abd" style={{ fill: `url(#${gradId})` }} />
        {/* 3根排行榜柱状图 (左矮、中高、右中，基线对齐) */}
        <g transform="translate(3 0)">
          {/* 左柱 (矮柱) */}
          <g transform="translate(0 12.365)">
            <path
              d="M 4.664 7.135 L 0.861 7.135 C 0.69 7.135 0.5 6.882 0.5 6.544 L 0.5 1.091 C 0.5 0.753 0.69 0.5 0.861 0.5 L 4.664 0.5 Z"
              fill="#ffffff"
            />
          </g>
          {/* 中柱 (最高柱) */}
          <g transform="translate(6 5)">
            <path
              d="M 1 0 H 5 A 1 1 0 0 1 6 1 V 15 H 0 V 1 A 1 1 0 0 1 1 0 Z"
              fill="#ffffff"
            />
          </g>
          {/* 右柱 (中柱) */}
          <g transform="translate(12.8 9)">
            <path
              d="M 0 0 H 4.2 A 1 1 0 0 1 5.2 1 V 10 A 1 1 0 0 1 4.2 11 H 0 V 0 Z"
              fill="#ffffff"
            />
          </g>
        </g>
      </g>
      <text
        style={{
          fontFamily: 'SourceHanSansCN-Medium, Source Han Sans CN',
          fontWeight: 500,
          letterSpacing: '.06em',
          fill: '#f1f1f1',
          fontSize: 16,
        }}
        transform="translate(42 24)"
      >
        <tspan x={0} y={0}>发型能力</tspan>
      </text>
    </svg>
  );
};

// 性价比标识 (金色渐变 + $)
export const ValueMark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `val-mark-grad-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={98} height={34} viewBox="0 0 98 34" {...props}>
      <defs>
        <linearGradient id={gradId} x1={0.448} y1={0.453} x2={0.128} y2={0.077} gradientUnits="objectBoundingBox">
          <stop offset={0} stopColor="#dfb02f" />
          <stop offset={1} stopColor="#ffd35e" />
        </linearGradient>
      </defs>
      <rect width={98} height={34} rx={6} fill="#2a2a2a" />
      <rect width={24} height={24} rx={6} fill="#dfb02f" style={{ fill: `url(#${gradId})` }} transform="translate(7 5)" />
      <circle cx={9} cy={9} r={9} fill="#fff" transform="translate(10 8)" />
      <text
        style={{
          fontFamily: 'SourceHanSansCN-Medium, Source Han Sans CN',
          fontWeight: 500,
          letterSpacing: '.06em',
          fill: '#dfb02f',
          fontSize: 12,
        }}
        transform="translate(15.5 21.5)"
      >
        <tspan x={0} y={0}>$</tspan>
      </text>
      <text
        style={{
          fontFamily: 'SourceHanSansCN-Medium, Source Han Sans CN',
          fontWeight: 500,
          letterSpacing: '.06em',
          fill: '#f1f1f1',
          fontSize: 16,
        }}
        transform="translate(42 24)"
      >
        <tspan x={0} y={0}>性价比</tspan>
      </text>
    </svg>
  );
};

// 季度数据标识 (蓝色渐变 + 饼图icon)
export const QuarterMark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `quarter-mark-grad-${uid}`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={115} height={34} viewBox="0 0 115 34" {...props}>
      <defs>
        <linearGradient id={gradId} x1={0.448} y1={0.453} x2={0.128} y2={0.077} gradientUnits="objectBoundingBox">
          <stop offset={0} stopColor="#4f8abd" />
          <stop offset={1} stopColor="#6dade7" />
        </linearGradient>
      </defs>
      <rect width={115} height={34} rx={6} fill="#2a2a2a" />
      <g transform="translate(7 5)">
        <rect width={24} height={24} rx={6} fill="#4f8abd" style={{ fill: `url(#${gradId})` }} />
        <path
          d="M7.5 0v7.5H15A7.5 7.5 0 1 1 7.5 0Z"
          fill="#fff"
          transform="translate(4.5 4.5)"
        />
        <path
          d="M7.5 0v7.5H0A7.5 7.5 0 0 1 7.5 0Z"
          fill="#0a365d"
          transform="translate(4.5 4.5) rotate(90 7.5 7.5)"
        />
      </g>
      <text
        style={{
          fill: '#f1f1f1',
          fontSize: 16,
          fontFamily: 'SourceHanSansCN-Medium, Source Han Sans CN',
          fontWeight: 500,
          letterSpacing: '.06em',
        }}
        transform="translate(42 24)"
      >
        <tspan x={0} y={0}>季度数据</tspan>
      </text>
    </svg>
  );
};
