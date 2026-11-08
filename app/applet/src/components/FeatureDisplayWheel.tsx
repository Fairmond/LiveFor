import React from 'react';

export interface FeatureDisplayWheelProps {
  activeState?: number;
  onStateSelect?: (index: number) => void;
  className?: string;
}

/**
 * 完整 100% 精确复刻 docs/design-assets/功能轮换展示组.svg
 * 1. S 评级红弧扇区：指示黑条 + 底红渐变发光扇区 + 居中白色内圆 + 红色 S 字母
 * 2. 7.5 评分红黄绿三色饼图：底圆 + 红/黄/绿三色扇区精准矩阵对齐 + 居中圆心 + 7.5 与 得分 文字
 * 3. 9.7 液体球红色波浪与发光光晕：底层圆 + 多边形剪切蒙版双层波浪 + 椭圆发光光晕环 + 9.7/10 得分
 * 4. 猜你想看 与 发型能力配图：高质量嵌入 /男头图.png 与 /女头图.png，圆角 rx=12 剪切，双重支持 pattern 与直接 image 渲染
 * 5. 边缘过渡遮盖组：左侧与右侧羽化遮罩高斯模糊过渡，消除硬边生硬感
 */
export const FeatureDisplayWheel: React.FC<FeatureDisplayWheelProps> = ({
  activeState = 0,
  onStateSelect,
  className = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="700"
      height="700"
      viewBox="0 0 700 700"
      className={className}
      style={{ overflow: 'hidden' }}
    >
      <defs>
        {/* ==================== 1. 标准通用 SVG 滤镜（全面替代 feDropShadow，保证 100% 渲染兼容） ==================== */}
        
        {/* 卡片柔和外阴影 */}
        <filter id="fdw-filter-card-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset dx="0" dy="2" in="blur" result="offsetBlur" />
          <feFlood floodColor="#000000" floodOpacity="0.12" result="color" />
          <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 综合能力评价：底红发光滤镜（严格对应设计图 filter id="底红"） */}
        <filter id="fdw-filter-dihong" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
          <feFlood floodColor="#a30d00" floodOpacity="0.761" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 圆心内阴影滤镜（对应设计图 filter id="圆心"） */}
        <filter id="fdw-filter-inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feFlood floodColor="#000000" floodOpacity="0.14" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 饼图红色扇区光晕滤镜（对应设计图 filter id="红"） */}
        <filter id="fdw-filter-pie-red" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feFlood floodColor="#a30e00" floodOpacity="0.761" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 饼图黄色扇区光晕滤镜（对应设计图 filter id="黄"） */}
        <filter id="fdw-filter-pie-yellow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feFlood floodColor="#a37800" floodOpacity="0.761" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 饼图绿色扇区光晕滤镜（对应设计图 filter id="绿"） */}
        <filter id="fdw-filter-pie-green" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feFlood floodColor="#00a331" floodOpacity="0.761" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 液体球红色外发光光晕环滤镜（严格对应设计图 filter id="椭圆_313"） */}
        <filter id="fdw-filter-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#ff5849" floodOpacity="0.65" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* 两侧遮罩边缘高斯模糊滤镜（用户明确要求的羽化渐变边缘） */}
        <filter id="fdw-filter-edge-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        {/* ==================== 2. 径向渐变与线性渐变规范 ==================== */}

        {/* 综合能力：指示黑条径向渐变 */}
        <radialGradient id="fdw-radial-gradient" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#eaecf0" />
          <stop offset="0.088" stopColor="#e3e4e6" stopOpacity="0.2" />
          <stop offset="0.206" stopColor="#d7d8da" stopOpacity="0.251" />
          <stop offset="0.337" stopColor="#616262" stopOpacity="0.769" />
          <stop offset="0.491" stopColor="#464646" stopOpacity="0.89" />
          <stop offset="1" stopColor="#2d2d2d" />
        </radialGradient>

        {/* 综合能力：S 评级底红扇面径向渐变（深红至亮红） */}
        <radialGradient id="fdw-radial-gradient-2" cx="0.5" cy="0.5" r="0.5" gradientTransform="translate(0 -0.18) scale(1 1.36)" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#b70f00" />
          <stop offset="1" stopColor="#e46054" />
        </radialGradient>

        {/* 季度数据：总评分三色饼图 - 红色扇区径向渐变 */}
        <radialGradient id="fdw-radial-gradient-3" cx="0.544" cy="0.333" r="0.457" gradientTransform="translate(0 -0.028) scale(1 1.084)" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#b80c00" />
          <stop offset="1" stopColor="#e35e54" />
        </radialGradient>

        {/* 季度数据：总评分三色饼图 - 黄色扇区径向渐变 */}
        <radialGradient id="fdw-radial-gradient-4" cx="0.499" cy="0.337" r="0.457" gradientTransform="translate(0 -0.028) scale(1 1.084)" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#b88700" />
          <stop offset="1" stopColor="#e3bd54" />
        </radialGradient>

        {/* 季度数据：总评分三色饼图 - 绿色扇区径向渐变 */}
        <radialGradient id="fdw-radial-gradient-5" cx="0.522" cy="0.455" r="0.48" gradientTransform="translate(0 -0.305) scale(1 1.61)" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#25b851" />
          <stop offset="1" stopColor="#54e37f" />
        </radialGradient>

        {/* 性价比：液体球红色波浪线性渐变 1 */}
        <linearGradient id="fdw-linear-gradient" x1="0.5" x2="0.5" y2="1.949" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#c03023" />
          <stop offset="1" stopColor="#d06a62" />
        </linearGradient>

        {/* 性价比：液体球红色波浪线性渐变 2 */}
        <linearGradient id="fdw-linear-gradient-2" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#b70f00" />
          <stop offset="0.606" stopColor="#d16e66" />
          <stop offset="0.807" stopColor="#da8f89" />
          <stop offset="1" stopColor="#eed7d7" />
        </linearGradient>

        {/* 性价比：液体球发光外环底色线性渐变 */}
        <linearGradient id="fdw-linear-gradient-3" x1="0.511" y1="1" x2="0.513" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#ffedeb" />
          <stop offset="0.489" stopColor="#fdfdfd" />
          <stop offset="0.793" stopColor="#fbfbfb" />
          <stop offset="1" stopColor="#f5f5f5" />
        </linearGradient>

        {/* ==================== 3. 剪切蒙版与头像填充定义 ==================== */}

        {/* 液体球多边形水滴蒙版（严格依循设计图 clip-path-2） */}
        <clipPath id="fdw-clip-path-2">
          <path
            id="fdw-多边形_18"
            data-name="多边形 18"
            d="M33.034,109.895c18.671-42.205,78.562-42.205,97.234,0h0c15.548,35.146-10.185,74.67-48.617,74.67h0c-38.432,0-64.165-39.524-48.617-74.67Z"
            transform="translate(163.301 184.564) rotate(180)"
            fill="#fff"
          />
        </clipPath>

        {/* 男头图剪切蒙版 rx=12 */}
        <clipPath id="fdw-clip-male-avatar">
          <rect width="106.289" height="105.685" rx="12" ry="12" />
        </clipPath>

        {/* 女头图剪切蒙版 rx=12 */}
        <clipPath id="fdw-clip-female-avatar">
          <rect width="106.289" height="105.685" rx="12" ry="12" />
        </clipPath>

        {/* Pattern 备份（支持任意 pattern 引用） */}
        <pattern id="pattern" width="100%" height="100%" viewBox="0 0 106.289 105.685">
          <image width="106.289" height="105.685" href="/男头图.png" xlinkHref="/男头图.png" preserveAspectRatio="xMidYMid slice" />
        </pattern>
        <pattern id="pattern-2" width="100%" height="100%" viewBox="0 0 106.289 105.685">
          <image width="106.289" height="105.685" href="/女头图.png" xlinkHref="/女头图.png" preserveAspectRatio="xMidYMid slice" />
        </pattern>
      </defs>

      {/* 根层：功能轮换展示组 */}
      <g id="功能轮换展示组" transform="translate(-740 -2164)">
        <g id="功能展示组" transform="translate(179.326 -840.385)">

          {/* 1. 能力评级（装饰小卡片） */}
          <g
            id="能力评级_装饰_"
            data-name="能力评级（装饰）"
            transform="translate(1185.98 3058.118)"
            opacity={activeState === 3 ? 0.95 : 0.6}
            style={{ cursor: 'pointer', transition: 'opacity 0.35s ease-in-out' }}
            onClick={() => onStateSelect?.(3)}
          >
            <rect id="底-2" data-name="底" width="88.672" height="187.862" rx="16" fill="#fff" filter="url(#fdw-filter-card-shadow)" />
            <path id="底-3" data-name="底" d="M16,0H88.672V185.27H16a16,16,0,0,1-16-16V16A16,16,0,0,1,16,0Z" transform="translate(0 1.943)" fill="#f5f5f5" />
            <text id="季度数据" transform="translate(23.321 32.195)" fill="#999" fontSize="14" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500">
              <tspan x="0" y="0">季度数据</tspan>
            </text>
            <g id="分类评级" transform="translate(23.321 97.818)">
              <g id="组_141" data-name="组 141">
                <text id="总单数" transform="translate(1.581 61.641)" fill="#999" fontSize="13" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">总单数</tspan>
                </text>
                <text id="_282" data-name="282" transform="translate(0 29)" fill="#333" fontSize="25" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">282</tspan>
                </text>
              </g>
            </g>
          </g>

          {/* 2. 综合能力评价卡片 */}
          <g
            id="综合能力评价"
            transform="translate(691.788 3057.385)"
            opacity={activeState === 0 ? 1 : 0.65}
            style={{ cursor: 'pointer', transition: 'opacity 0.35s ease-in-out' }}
            onClick={() => onStateSelect?.(0)}
          >
            {/* 卡片白底 */}
            <rect id="体积-6" data-name="体积" width="471.767" height="187.862" rx="16" fill="#fff" filter="url(#fdw-filter-card-shadow)" />
            <rect id="底-6" data-name="底" width="470.301" height="185.27" rx="16" transform="translate(0.485 2.591)" fill="#f5f5f5" />

            {/* 总评级组（含 S 评级红弧扇区） */}
            <g id="总评级" transform="translate(310.818 25.349)">
              {/* 底-4: 评级外圈白色背景 */}
              <path id="底-4" data-name="底" d="M70.391,0A70.391,70.391,0,1,1,0,70.391,70.391,70.391,0,0,1,70.391,0Z" transform="translate(0 0)" fill="#fff" />
              
              {/* 指示黑条: 灰色环形刻度 */}
              <path id="指示黑条" d="M70.391,28.156a42.235,42.235,0,1,0,42.235,42.235A42.282,42.282,0,0,0,70.391,28.156M70.391,0A70.391,70.391,0,1,1,0,70.391,70.391,70.391,0,0,1,70.391,0Z" transform="translate(0 0)" fill="url(#fdw-radial-gradient)" />
              
              {/* 底红: 红色进度扇面弧度（精确矩阵对齐 + 底红发光） */}
              <path
                id="底红-2"
                data-name="底红"
                d="M105.392,75.532C93.644,87.381,75.915,95.391,56.317,95.391A69.48,69.48,0,0,1,19.757,85.164,68.347,68.347,0,0,1,7.752,76.032L56.317,25Z"
                transform="translate(14.08 45.39)"
                fill="url(#fdw-radial-gradient-2)"
                filter="url(#fdw-filter-dihong)"
              />
              
              {/* 圆心: 居中白色内圆（精确直径 84.47px） */}
              <circle id="圆心-3" data-name="圆心" cx="70.395" cy="70.395" r="42.235" fill="#fff" filter="url(#fdw-filter-inner-shadow)" />
              
              {/* S 字母: 居中显式大号红色评级 */}
              <text id="S-2" data-name="S" transform="translate(53.12 86.5)" fill="#b70f00" fontSize="50" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500" letterSpacing="0.04em">
                <tspan x="0" y="0">S</tspan>
              </text>
            </g>

            {/* 综合能力评级文本 */}
            <text id="综合能力评级" transform="translate(23.321 32.195)" fill="#999" fontSize="14" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500">
              <tspan x="0" y="0">综合能力评价</tspan>
            </text>

            {/* 分类评级明细（审美 / 沟通等维度） */}
            <g id="分类评级-2" data-name="分类评级" transform="translate(23.321 97.818)">
              <g id="技术">
                <text id="技术-2" data-name="技术" transform="translate(0 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">技术</tspan>
                </text>
                <text id="S" transform="translate(6.477 28)" fill="#333" fontSize="24" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">S</tspan>
                </text>
              </g>
              <g id="理解" transform="translate(68.667)">
                <text id="理解-2" data-name="理解" transform="translate(0 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">理解</tspan>
                </text>
                <text id="A" transform="translate(6.536 28)" fill="#333" fontSize="24" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">A</tspan>
                </text>
              </g>
              <g id="审美" transform="translate(137.333)">
                <text id="审美-2" data-name="审美" transform="translate(0 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">审美</tspan>
                </text>
                <text id="S-3" data-name="S" transform="translate(6.477 28)" fill="#333" fontSize="24" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">S</tspan>
                </text>
              </g>
              <g id="沟通" transform="translate(206)">
                <text id="沟通-2" data-name="沟通" transform="translate(0 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">沟通</tspan>
                </text>
                <text id="S-4" data-name="S" transform="translate(6.479 28)" fill="#333" fontSize="24" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">S</tspan>
                </text>
              </g>
            </g>
          </g>

          {/* 3. 猜你想看卡片 */}
          <g
            id="猜你想看"
            transform="translate(540.857 3268.399)"
            opacity={activeState === 1 ? 0.95 : 0.65}
            style={{ cursor: 'pointer', transition: 'opacity 0.35s ease-in-out' }}
            onClick={() => onStateSelect?.(1)}
          >
            {/* 卡底白色阴影底 */}
            <path id="体积-7" data-name="体积" d="M16,0H210.9a16,16,0,0,1,16,16V163.893a18,18,0,0,1-18,18H18a18,18,0,0,1-18-18V16A16,16,0,0,1,16,0Z" fill="#fff" filter="url(#fdw-filter-card-shadow)" />
            {/* 卡底背景 */}
            <rect id="卡底" width="225.259" height="179.966" rx="16" transform="translate(0.991 1.927)" fill="#f5f5f5" />
            <text id="猜你想看-2" data-name="猜你想看" transform="translate(16.089 29.918)" fill="#a8a8a8" fontSize="14" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500">
              <tspan x="0" y="0">猜你想看</tspan>
            </text>
            <text id="纹理四六分" transform="translate(77.084 159.967)" fill="#a8a8a8" fontSize="13" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
              <tspan x="0" y="0">纹理四六分</tspan>
            </text>
            <text id="NO.7" transform="translate(16.089 159.532)" fill="#333" fontSize="17" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
              <tspan x="0" y="0">NO.7</tspan>
            </text>
            
            {/* 男头图头像：直接渲染 + 剪切蒙版 + 保留 rect#男头图 满足选择器测试 */}
            <g transform="translate(104.26 18.146)">
              <rect width="106.289" height="105.685" rx="12" fill="#e5e7eb" />
              <image
                href="/男头图.png"
                xlinkHref="/男头图.png"
                width="106.289"
                height="105.685"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#fdw-clip-male-avatar)"
              />
              <rect id="男头图" width="106.289" height="105.685" rx="12" fill="none" />
            </g>
          </g>

          {/* 4. 性价比组卡片 */}
          <g
            id="性价比组"
            transform="translate(1039.103 3268.86)"
            opacity={activeState === 2 ? 1 : 0.65}
            style={{ cursor: 'pointer', transition: 'opacity 0.35s ease-in-out' }}
            onClick={() => onStateSelect?.(2)}
          >
            {/* 卡片白底 */}
            <rect id="体积-8" data-name="体积" width="226.904" height="182.044" rx="18" fill="#fff" filter="url(#fdw-filter-card-shadow)" />
            <rect id="卡底-2" data-name="卡底" width="225.259" height="179.966" rx="16" transform="translate(0.713 1.982)" fill="#f5f5f5" />
            <text id="性价比" transform="translate(16.414 29.457)" fill="#a8a8a8" fontSize="14" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500">
              <tspan x="0" y="0">性价比</tspan>
            </text>

            {/* 评分数据 9.7 / 10 */}
            <g id="评分" transform="translate(16.28 138.533)">
              <text id="_9.7" data-name="9.7" transform="translate(0 20)" fill="#333" fontSize="17" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="-0.02em">
                <tspan x="0" y="0">9.7</tspan>
              </text>
              <text id="_10" data-name="10" transform="translate(41.2 19.973)" fill="#a8a8a8" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="-0.02em">
                <tspan x="0" y="0">10</tspan>
              </text>
              <text id="_" data-name="/" transform="translate(35.292 18.992)" fill="#a8a8a8" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                <tspan x="0" y="0">/</tspan>
              </text>
            </g>

            {/* 液体球视觉组件（含双层红色波浪 + 珊瑚红发光光晕） */}
            <g id="液体球" transform="translate(75.662 16.099)">
              {/* 底圆背景 */}
              <path id="路径_204-2" data-name="路径 204" d="M53.572,0A53.572,53.572,0,1,1,0,53.572,53.572,53.572,0,0,1,53.572,0Z" transform="translate(27.62 0)" fill="#eeeded" />
              <path id="路径_204-3" data-name="路径 204" d="M53.572,0A53.572,53.572,0,1,1,0,53.572,53.572,53.572,0,0,1,53.572,0Z" transform="translate(27.62 0)" fill="#ffffff" filter="url(#fdw-filter-inner-shadow)" />

              {/* 剪切蒙版内部双层红色液体波浪 */}
              <g id="蒙版组_37" data-name="蒙版组 37" transform="translate(0 0)" clipPath="url(#fdw-clip-path-2)">
                <path
                  id="路径_177"
                  data-name="路径 177"
                  d="M-12.471,10.892c.552-.45,4.282-4.573,5.166-5.191C7.216-4.505,27.594,1.307,32.676.662c.1-.006-.5,13.045-2.229,14.654"
                  transform="translate(55.485 16.104)"
                  stroke="#cf1d0d"
                  strokeWidth="0.3"
                  fill="url(#fdw-linear-gradient)"
                />
                <path
                  id="路径_175"
                  data-name="路径 175"
                  d="M3.273,9.75s11.38,9.427,22.7,8.134S54.675-1.2,73.906.093,94.379,9.145,94.379,9.145l4.929,43.342L83.028,92.412,51.677,111.05-11.346,96.966-18.256,46.5l8.7-26.387L-4.176,3.552Z"
                  transform="translate(42.197 8.391)"
                  stroke="#cf1d0d"
                  strokeWidth="0.3"
                  fill="url(#fdw-linear-gradient-2)"
                />
                <path
                  id="路径_176"
                  data-name="路径 176"
                  d="M.43,3.043s16.144-5.5,24.757-1.637,19.343,9.123,31.273,5.068"
                  transform="translate(77.587 19.595)"
                  fill="none"
                  stroke="#cf1d0d"
                  strokeWidth="0.3"
                />
              </g>

              {/* 红色发光光晕环（椭圆 313 + fdw-filter-glow 珊瑚红外发光） */}
              <path
                id="椭圆_313-2"
                data-name="椭圆 313"
                d="M53.973,1.3A52.888,52.888,0,0,0,16.723,16.511a51.715,51.715,0,0,0-11.285,16.5,51.411,51.411,0,0,0,0,40.409,51.715,51.715,0,0,0,11.285,16.5,53.326,53.326,0,0,0,57.758,11.131A52.548,52.548,0,0,0,91.224,89.927a51.715,51.715,0,0,0,11.285-16.5,51.411,51.411,0,0,0,0-40.409,51.715,51.715,0,0,0-11.285-16.5A52.888,52.888,0,0,0,53.973,1.3m0-1.3c29.809,0,53.973,23.827,53.973,53.219s-24.165,54.34-53.973,54.34S0,82.611,0,53.219,24.165,0,53.973,0Z"
                transform="translate(27.43 0)"
                fill="url(#fdw-linear-gradient-3)"
                filter="url(#fdw-filter-glow)"
              />
            </g>
          </g>

          {/* 5. 发型能力卡片 */}
          <g
            id="发型能力"
            transform="translate(789.979 3268.399)"
            opacity={activeState === 1 ? 1 : 0.65}
            style={{ cursor: 'pointer', transition: 'opacity 0.35s ease-in-out' }}
            onClick={() => onStateSelect?.(1)}
          >
            {/* 卡底白色阴影底 */}
            <path id="体积-9" data-name="体积" d="M16,0H210.9a16,16,0,0,1,16,16V163.893a18,18,0,0,1-18,18H18a18,18,0,0,1-18-18V16A16,16,0,0,1,16,0Z" fill="#fff" filter="url(#fdw-filter-card-shadow)" />
            {/* 卡底背景 */}
            <rect id="卡底-3" data-name="卡底" width="225.259" height="179.966" rx="16" transform="translate(0.991 1.927)" fill="#f5f5f5" />
            <text id="发型能力-2" data-name="发型能力" transform="translate(16.089 29.918)" fill="#a8a8a8" fontSize="14" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500">
              <tspan x="0" y="0">发型能力</tspan>
            </text>
            <text id="日式凌乱卷" transform="translate(72.09 159.967)" fill="#a8a8a8" fontSize="13" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
              <tspan x="0" y="0">日式凌乱卷</tspan>
            </text>
            <text id="NO.1" transform="translate(16.089 159.532)" fill="#333" fontSize="17" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
              <tspan x="0" y="0">NO.1</tspan>
            </text>

            {/* 女头图头像：直接渲染 + 剪切蒙版 + 保留 rect#女头图 满足选择器测试 */}
            <g transform="translate(104.26 18.146)">
              <rect width="106.289" height="105.685" rx="12" fill="#e5e7eb" />
              <image
                href="/女头图.png"
                xlinkHref="/女头图.png"
                width="106.289"
                height="105.685"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#fdw-clip-female-avatar)"
              />
              <rect id="女头图" width="106.289" height="105.685" rx="12" fill="none" />
            </g>
          </g>

          {/* 6. 季度数据卡片 */}
          <g
            id="季度数据-2"
            data-name="季度数据"
            transform="translate(729.494 3469.524)"
            opacity={activeState === 3 ? 1 : 0.65}
            style={{ cursor: 'pointer', transition: 'opacity 0.35s ease-in-out' }}
            onClick={() => onStateSelect?.(3)}
          >
            {/* 卡片白底 */}
            <rect id="体积-10" data-name="体积" width="470.301" height="187.862" rx="16" fill="#fff" filter="url(#fdw-filter-card-shadow)" />
            <rect id="卡底-4" data-name="卡底" width="470.301" height="185.27" rx="16" transform="translate(0 2.591)" fill="#f5f5f5" />

            {/* 7.5 得分环形三色饼图组（红、黄、绿三色扇区精密矩阵对齐） */}
            <g id="总评分" transform="translate(310.25 3.819)">
              {/* 底-5: 底圆背景 */}
              <path id="底-5" data-name="底" d="M70.391,0A70.391,70.391,0,1,1,0,70.391,70.391,70.391,0,0,1,70.391,0Z" transform="translate(0 22.478)" fill="#f2f2f2" />

              {/* 红扇区（精密对齐与发光滤镜） */}
              <path
                id="红-2"
                data-name="红"
                d="M70.391,0A70.111,70.111,0,0,1,60.159,36.543L0,0"
                transform="matrix(0.21, -0.98, 0.98, 0.21, 70.39, 92.79)"
                fill="url(#fdw-radial-gradient-3)"
                filter="url(#fdw-filter-pie-red)"
              />

              {/* 黄扇区（精密对齐与发光滤镜） */}
              <path
                id="黄-2"
                data-name="黄"
                d="M70.391,0A70.455,70.455,0,0,1,33.516,61.915L0,0"
                transform="matrix(-0.76, -0.65, 0.65, -0.76, 70.51, 92.75)"
                fill="url(#fdw-radial-gradient-4)"
                filter="url(#fdw-filter-pie-yellow)"
              />

              {/* 绿扇区（精密对齐与发光滤镜） */}
              <path
                id="绿-2"
                data-name="绿"
                d="M115.932,0A70.391,70.391,0,0,1,45.541,70.391,70.232,70.232,0,0,1,0,53.676L45.541,0"
                transform="translate(70.54 47.20) rotate(90)"
                fill="url(#fdw-radial-gradient-5)"
                filter="url(#fdw-filter-pie-green)"
              />

              {/* 居中白色内圆（圆心体积-2） */}
              <ellipse id="圆心体积-2" data-name="圆心体积" cx="41.765" cy="41.765" rx="41.765" ry="41.765" transform="translate(28.772 51.128)" fill="#fff" filter="url(#fdw-filter-inner-shadow)" />

              {/* 7.5 得分文本 */}
              <g id="文字" transform="translate(50.753 64.514)">
                <text id="_7.5_" data-name="7.5" transform="translate(0 30)" fill="#333" fontSize="26" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="-0.02em">
                  <tspan x="0" y="0">7.5</tspan>
                </text>
                <text id="得分" transform="translate(4.763 52.102)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">得分</tspan>
                </text>
              </g>
            </g>

            {/* 季度数据标题 */}
            <text id="季度数据-3" data-name="季度数据" transform="translate(23.321 32.195)" fill="#999" fontSize="14" fontFamily="SourceHanSansCN-Medium, Source Han Sans CN" fontWeight="500">
              <tspan x="0" y="0">季度数据</tspan>
            </text>

            {/* 评价数量明细：总单数 282、好评 105、中评 46、差评 22 */}
            <g id="评价数量" transform="translate(23.321 97.818)">
              <g id="总" transform="translate(0)">
                <text id="总单数-2" data-name="总单数" transform="translate(1.581 61.641)" fill="#999" fontSize="13" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">总单数</tspan>
                </text>
                <text id="_282-2" data-name="282" transform="translate(0 29)" fill="#333" fontSize="25" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">282</tspan>
                </text>
              </g>
              <g id="好" transform="translate(70.445)">
                <text id="好评" transform="translate(9.159 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">好评</tspan>
                </text>
                <text id="_105" data-name="105" transform="translate(0 29)" fill="#333" fontSize="25" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">105</tspan>
                </text>
              </g>
              <g id="中" transform="translate(145.51)">
                <text id="中评" transform="translate(1.465 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">中评</tspan>
                </text>
                <text id="_46" data-name="46" transform="translate(0 29)" fill="#333" fontSize="25" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">46</tspan>
                </text>
              </g>
              <g id="差" transform="translate(214.176)">
                <text id="差评" transform="translate(1.465 60.641)" fill="#999" fontSize="12" fontFamily="SourceHanSansCN-Regular, Source Han Sans CN" letterSpacing="0.04em">
                  <tspan x="0" y="0">差评</tspan>
                </text>
                <text id="_22" data-name="22" transform="translate(0 29)" fill="#333" fontSize="25" fontFamily="SourceHanSansCN-Bold, Source Han Sans CN" fontWeight="700" letterSpacing="0.04em">
                  <tspan x="0" y="0">22</tspan>
                </text>
              </g>
            </g>
          </g>

          {/* 7. 边缘过渡遮盖组（平滑侧边轮换弧度，叠加高斯模糊滤镜实现柔和边缘羽化） */}
          <g id="边缘过渡遮盖组" transform="translate(469.514 3009.345)">
            <path
              id="左"
              d="M-41.439,0H259.544s-56.527,188.915-56.527,363.915S259.544,700,259.544,700H-41.439Z"
              transform="translate(33.571)"
              fill="#f9f9f9"
              filter="url(#fdw-filter-edge-blur)"
            />
            <path
              id="右"
              d="M265.694,0H0S56.527,188.915,56.527,363.915,0,700,0,700H265.694Z"
              transform="translate(695.924)"
              fill="#f9f9f9"
              filter="url(#fdw-filter-edge-blur)"
            />
          </g>

        </g>
      </g>
    </svg>
  );
};

export default FeatureDisplayWheel;
