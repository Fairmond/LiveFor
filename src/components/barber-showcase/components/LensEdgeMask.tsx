import React from 'react';

export interface LensEdgeMaskProps {
  fillColor?: string;
  prefix?: string;
  className?: string;
  leftMaskOffset?: number;
}

/**
 * 独立子组件：边缘过渡遮盖组 (透镜羽化曲线遮罩)
 * 1. 外缘设置实底防护，防止高斯模糊引起的边缘透光缝隙
 * 2. 对双侧括号型内向弧线应用真实高斯模糊滤镜 (feGaussianBlur)，呈现柔和自然的羽化过渡
 * 3. 支持左侧括号遮罩位置微调 (leftMaskOffset)，完美适配移动端视觉平衡
 */
export const LensEdgeMask: React.FC<LensEdgeMaskProps> = ({
  fillColor = '#f9f9f9',
  prefix = 'sc_',
  className = '',
  leftMaskOffset = 0,
}) => {
  return (
    <g
      id="lens-edge-mask-group"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* 画布左右两端外侧实底防透层 (左侧充分延展至 x=-250，右侧外移至 740+，杜绝硬切断卡片和羽化边缘) */}
      <rect x="-250" y="-20" width={290 + Math.max(0, -leftMaskOffset)} height="740" fill={fillColor} />
      <rect x="740" y="-20" width="300" height="740" fill={fillColor} />

      {/* 带有高斯模糊滤镜的双侧括号型遮罩 */}
      <g transform="translate(-91.16, 4.96)" filter={`url(#${prefix}lens-blur)`}>
        {/* 左侧括号弧形遮罩 (支持根据移动端或自定义向左微调) */}
        <path
          d="M-100,0H259.544s-56.527,188.915-56.527,363.915S259.544,700,259.544,700H-100Z"
          transform={`translate(${33.571 + leftMaskOffset})`}
          fill={fillColor}
        />
        {/* 右侧括号弧形遮罩 */}
        <path
          d="M300,0H0S56.527,188.915,56.527,363.915,0,700,0,700H300Z"
          transform="translate(695.924)"
          fill={fillColor}
        />
      </g>
    </g>
  );
};

export default LensEdgeMask;
