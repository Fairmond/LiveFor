import React from 'react';

export interface ShowcaseDefsProps {
  prefix?: string;
}

/**
 * 集中管理展示模块所需的滤镜、渐变与裁剪蒙版定义
 * 通过动态 prefix 支持多端/多实例完全隔离，根治 display:none 导致渐变与遮罩丢失的问题
 */
export const ShowcaseDefs: React.FC<ShowcaseDefsProps> = ({ prefix = 'sc_' }) => {
  return (
    <defs>
      {/* 1. 外层视口裁剪：水平两端留出充分羽化余量，彻底解决卡片与高斯模糊被直角硬切的问题 */}
      <clipPath id={`${prefix}viewport-clip`}>
        <rect x="-250" y="0" width="1100" height="700" fill="#fff" />
      </clipPath>

      {/* 2. 液体球裁剪多边形 (精准保持原设计几何形状) */}
      <clipPath id={`${prefix}liquid-clip`}>
        <path
          d="M33.034,109.895c18.671-42.205,78.562-42.205,97.234,0h0c15.548,35.146-10.185,74.67-48.617,74.67h0c-38.432,0-64.165-39.524-48.617-74.67Z"
          transform="translate(163.301 184.564) rotate(180)"
        />
      </clipPath>

      {/* 3. 头像圆角裁剪 */}
      <clipPath id={`${prefix}avatar-clip`}>
        <rect width="106.289" height="105.685" rx="12" />
      </clipPath>

      {/* 4. 标准卡片平滑阴影 */}
      <filter id={`${prefix}card-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.08" />
      </filter>

      {/* 5. 活动高亮卡片浮起阴影 */}
      <filter id={`${prefix}active-card-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#000000" floodOpacity="0.14" />
      </filter>

      {/* 6. 综合能力评级：黑环渐变 */}
      <radialGradient id={`${prefix}dark-ring-gradient`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#eaecf0" />
        <stop offset="8.8%" stopColor="#e3e4e6" stopOpacity="0.2" />
        <stop offset="20.6%" stopColor="#d7d8da" stopOpacity="0.251" />
        <stop offset="33.7%" stopColor="#616262" stopOpacity="0.769" />
        <stop offset="49.1%" stopColor="#464646" stopOpacity="0.89" />
        <stop offset="100%" stopColor="#2d2d2d" />
      </radialGradient>

      {/* 7. 综合能力评级：S 评级红弧扇区渐变 */}
      <radialGradient
        id={`${prefix}red-arc-gradient`}
        cx="0.5"
        cy="0.5"
        r="0.5"
        gradientTransform="translate(0 -0.18) scale(1 1.36)"
      >
        <stop offset="0%" stopColor="#b70f00" />
        <stop offset="100%" stopColor="#e46054" />
      </radialGradient>

      {/* S 红弧发光阴影 */}
      <filter id={`${prefix}red-arc-glow`} x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#a30d00" floodOpacity="0.76" />
      </filter>

      {/* S 字母文字微阴影 */}
      <filter id={`${prefix}s-letter-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#740a00" floodOpacity="0.54" />
      </filter>

      {/* 8. 液体球：双波浪渐变 */}
      <linearGradient id={`${prefix}wave-gradient-1`} x1="0.5" y1="0" x2="0.5" y2="1.95">
        <stop offset="0%" stopColor="#c03023" />
        <stop offset="100%" stopColor="#d06a62" />
      </linearGradient>

      <linearGradient id={`${prefix}wave-gradient-2`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#b70f00" />
        <stop offset="60.6%" stopColor="#d16e66" />
        <stop offset="80.7%" stopColor="#da8f89" />
        <stop offset="100%" stopColor="#eed7d7" />
      </linearGradient>

      {/* 液体球外环玻璃微质感渐变 */}
      <linearGradient id={`${prefix}sphere-ring-gradient`} x1="0.51" y1="1" x2="0.51" y2="0">
        <stop offset="0%" stopColor="#ffedeb" />
        <stop offset="48.9%" stopColor="#fdfdfd" />
        <stop offset="79.3%" stopColor="#fbfbfb" />
        <stop offset="100%" stopColor="#f5f5f5" />
      </linearGradient>

      {/* 液体球红色外光晕 */}
      <filter id={`${prefix}sphere-glow`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff5849" floodOpacity="0.55" />
      </filter>

      {/* 9. 季度数据：红黄绿三色饼图扇区渐变 */}
      <radialGradient id={`${prefix}pie-red`} cx="0.54" cy="0.33" r="0.46">
        <stop offset="0%" stopColor="#b80c00" />
        <stop offset="100%" stopColor="#e35e54" />
      </radialGradient>

      <radialGradient id={`${prefix}pie-yellow`} cx="0.5" cy="0.34" r="0.46">
        <stop offset="0%" stopColor="#b88700" />
        <stop offset="100%" stopColor="#e3bd54" />
      </radialGradient>

      <radialGradient id={`${prefix}pie-green`} cx="0.52" cy="0.45" r="0.48">
        <stop offset="0%" stopColor="#25b851" />
        <stop offset="100%" stopColor="#54e37f" />
      </radialGradient>

      {/* 饼图微发光 */}
      <filter id={`${prefix}pie-glow-red`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#a30e00" floodOpacity="0.75" />
      </filter>

      <filter id={`${prefix}pie-glow-yellow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#a37800" floodOpacity="0.75" />
      </filter>

      <filter id={`${prefix}pie-glow-green`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00a331" floodOpacity="0.75" />
      </filter>

      {/* 10. 两侧透镜边缘括号型遮盖的高斯模糊滤镜 (增强高斯模糊羽化效果) */}
      <filter id={`${prefix}lens-blur`} x="-60%" y="-30%" width="220%" height="160%">
        <feGaussianBlur stdDeviation="20" />
      </filter>
    </defs>
  );
};
