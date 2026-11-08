import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { FeaturesIndicator } from "../FeaturesIndicator";

interface StageInfo {
  id: number;
  title: string;
  line1: string;
  line2: string;
}

const STAGES: StageInfo[] = [
  {
    id: 1,
    title: "造型高度个性化",
    line1: "智能效果图 + 全维度信息描述 + 真实发型参考示例图",
    line2: "轻松勾勒出脑海中的画面。",
  },
  {
    id: 2,
    title: "需求高度精准化",
    line1: "关键需求图文双维度清晰高亮描述",
    line2: "每一剪都心中有数。",
  },
  {
    id: 3,
    title: "所有需求逐条确认",
    line1: "理前不敷衍，理后不扯皮",
    line2: "全流程透明可控。",
  },
  {
    id: 4,
    title: "进度实时指示",
    line1: "当前确认步骤一目了然",
    line2: "步步安心，随时掌控。",
  },
];

export const MobileFeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 38,
    restDelta: 0.0001,
  });

  // Stage 1 Animation: Mockup starts off-screen and slides in during 0.10 -> 0.30
  // scroll 0.10 -> 0.20: mockup slides in from right (100vw -> 0vw)
  // scroll 0.20 -> 0.30: fully displayed and assembled in center
  // scroll 0.30 -> 0.40: static completed stage 1 inspection
  // scroll 0.40 -> 0.45: mockup slides out to the left (-100vw) while fading out
  const phone1SlideX = useTransform(smoothProgress, [0.10, 0.20, 0.40, 0.45], ['100vw', '0vw', '0vw', '-100vw']);
  // Phone 1 opacity: fades in 0.10 -> 0.14, stays fully visible through 0.40, fades out 0.40 -> 0.45 as it slides left
  const phone1Opacity = useTransform(smoothProgress, [0.10, 0.14, 0.40, 0.45], [0, 1, 1, 0]);

  // Phone 1 internal elements staggered animations expanding throughout 0.10 -> 0.30
  const titleOpacity = useTransform(smoothProgress, [0.11, 0.17], [0, 1]);
  const titleX = useTransform(smoothProgress, [0.11, 0.17], [30, 0]);

  const mainImgOpacity = useTransform(smoothProgress, [0.12, 0.19], [0, 1]);
  const mainImgX = useTransform(smoothProgress, [0.12, 0.19], [-25, 0]);

  const lengthImgOpacity = useTransform(smoothProgress, [0.14, 0.21], [0, 1]);
  const lengthImgX = useTransform(smoothProgress, [0.14, 0.21], [35, 0]);

  const textureImgOpacity = useTransform(smoothProgress, [0.17, 0.24], [0, 1]);
  const textureImgX = useTransform(smoothProgress, [0.17, 0.24], [35, 0]);

  const permImgOpacity = useTransform(smoothProgress, [0.20, 0.26], [0, 1]);
  const permImgX = useTransform(smoothProgress, [0.20, 0.26], [35, 0]);

  const mainRefImgOpacity = useTransform(smoothProgress, [0.22, 0.28], [0, 1]);
  const mainRefImgX = useTransform(smoothProgress, [0.22, 0.28], [35, 0]);

  const displayImgOpacity = useTransform(smoothProgress, [0.24, 0.30], [0, 1]);
  const displayImgY = useTransform(smoothProgress, [0.24, 0.30], [20, 0]);

  // Stage 2 (0.45 ~ 0.65), 3, 4: Second Mockup (Page4PhoneUI style)
  // Transition: Phone 2 slides in from the right (100vw -> 0vw) while fading in (0 -> 1) during 0.40 -> 0.45
  const phone2Opacity = useTransform(smoothProgress, [0.40, 0.45], [0, 1]);
  const phone2SlideX = useTransform(smoothProgress, [0.40, 0.45], ['100vw', '0vw']);

  // Stage 3: Inner components switch inside Phone 2
  // HUD 1 (参数注释) & Tab 1: active throughout Stage 2 (0.45 ~ 0.65), transitions to HUD 2 during 0.60 -> 0.65
  const hud1Opacity = useTransform(smoothProgress, [0.60, 0.65], [1, 0]);
  const tab1Opacity = useTransform(smoothProgress, [0.60, 0.65], [1, 0]);

  // HUD 2 (需求清单) & Tab 2: inactive in Stage 2, transitions in during 0.60 -> 0.65, stays active in Stage 3 & 4
  const hud2Opacity = useTransform(smoothProgress, [0.60, 0.65], [0, 1]);
  const tab2Opacity = useTransform(smoothProgress, [0.60, 0.65], [0, 1]);

  // Stage 4: Second mockup scrolls upward to reveal bottom controls (increased magnitude)
  // 0.80 -> 0.94: phone moves up from 0% to -40%
  const phone2ParallaxY = useTransform(smoothProgress, [0.80, 0.94], ["0%", "-40%"], { clamp: true });

  // Text Descriptions Opacities for the 4 stages strictly aligned to mockup animation milestones
  const text1Opacity = useTransform(smoothProgress, [0.0, 0.40, 0.45], [1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0.40, 0.45], [0, -10]);

  // Stage 2: Presented during 0.45 -> 0.65 (transitions in 0.40 -> 0.45, transitions out 0.60 -> 0.65)
  const text2Opacity = useTransform(smoothProgress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.40, 0.45, 0.60, 0.65], [10, 0, 0, -10]);

  // Stage 3: Presented during 0.65 -> 0.82 (transitions in 0.60 -> 0.65, transitions out 0.78 -> 0.82)
  const text3Opacity = useTransform(smoothProgress, [0.60, 0.65, 0.78, 0.82], [0, 1, 1, 0]);
  const text3Y = useTransform(smoothProgress, [0.60, 0.65, 0.78, 0.82], [10, 0, 0, -10]);

  // Stage 4: Presented during 0.82 -> 1.0 (transitions in 0.78 -> 0.82)
  const text4Opacity = useTransform(smoothProgress, [0.78, 0.82, 1.0], [0, 1, 1]);
  const text4Y = useTransform(smoothProgress, [0.78, 0.82], [10, 0]);

  // Indicator Component: Active tab states strictly aligned with mockup animation stages
  // Stage 1 (0.10 ~ 0.40): Mockup 1 slides in (0.10->0.30), expands and displays -> Tab 1 active
  const tab1ActiveWeight = useTransform(smoothProgress, [0.0, 0.40, 0.45], [1, 1, 0], { clamp: true });
  // Stage 2 (0.45 ~ 0.65): Mockup 2 slides in with HUD 1 -> Tab 2 active
  const tab2ActiveWeight = useTransform(smoothProgress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0], { clamp: true });
  // Stage 3 (0.65 ~ 0.82): Mockup 2 switches to HUD 2 -> Tab 3 active
  const tab3ActiveWeight = useTransform(smoothProgress, [0.60, 0.65, 0.78, 0.82], [0, 1, 1, 0], { clamp: true });
  // Stage 4 (0.82 ~ 1.0): Mockup 2 scrolls upward to -19% -> Tab 4 active
  const tab4ActiveWeight = useTransform(smoothProgress, [0.78, 0.82, 1.0], [0, 1, 1], { clamp: true });

  const scrollAnimRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, []);

  const smoothScrollTo = (targetY: number, duration = 750) => {
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    let start: number | null = null;

    // Ease-out only (no ease-in): immediate high velocity start, pronounced and smooth deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);
      window.scrollTo(0, startY + diff * ease);

      if (elapsed < duration) {
        scrollAnimRef.current = window.requestAnimationFrame(step);
      } else {
        scrollAnimRef.current = null;
      }
    };

    scrollAnimRef.current = window.requestAnimationFrame(step);
  };

  const scrollToStage = (stageId: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = containerRef.current.clientHeight;

    // useScroll has offset: ["start end", "end end"]
    // scrollYProgress = 0 when window.scrollY = containerTop - window.innerHeight
    // scrollYProgress = 1 when window.scrollY = containerTop + containerHeight - window.innerHeight
    // To land with mathematical precision on each animation stage when mockup is fully in place:
    // Stage 1: 0.32 (Mockup 1 fully slid in and assembled in center)
    // Stage 2: 0.52 (Stage 2 fully in place with Mockup 2 & HUD 1)
    // Stage 3: 0.72 (Stage 3 fully in place with Mockup 2 & HUD 2)
    // Stage 4: 0.95 (Stage 4 fully in place with Mockup 2 scrolled up to -40%)
    const targets = [0.32, 0.52, 0.72, 0.95];
    const targetProgress = targets[stageId - 1];
    const targetY = containerTop - window.innerHeight + targetProgress * containerHeight;
    smoothScrollTo(Math.max(0, targetY), 750);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#f9f9f9]"
    >
      {/* Sticky Pinned Viewport Container: Full Viewport Width */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden select-none relative">
        
        {/* ========================================================= */}
        {/* Mockups Stage Container (Upper to Centered Showcase)      */}
        {/* ========================================================= */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-visible z-10 pt-2 sm:pt-4">
          {/* Mockup Frame Box: Doubled scale from previous ~185px to ~365px */}
          <div className="relative w-[340px] xs:w-[365px] sm:w-[385px] max-w-[92vw] aspect-[402.451/831.569] max-h-[78dvh] xs:max-h-[82dvh] flex items-center justify-center">
            
            {/* ------------------------------------------------------- */}
            {/* Phone 1 (Stage 1: Slides in from the right)            */}
            {/* ------------------------------------------------------- */}
            <motion.div
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                x: phone1SlideX,
                opacity: phone1Opacity,
              }}
            >
              <svg
                viewBox="825.77 118.574 402.451 831.569"
                className="w-full h-full overflow-visible drop-shadow-xl"
                fill="none"
              >
                <defs>
                  <mask id="phone1_mask_m">
                    <rect x="750" y="50" width="550" height="950" fill="white" />
                    <rect x="851.397" y="126.851" width="374.158" height="811.152" rx="60" fill="black" />
                  </mask>
                  <clipPath id="phone1_screen_clip_m">
                    <rect x="851.397" y="126.851" width="374.158" height="811.152" rx="60" />
                  </clipPath>
                </defs>

                {/* Base Phone Screen Background */}
                <rect x="851.397" y="126.851" width="374.158" height="811.152" rx="60" fill="white" />
                <image
                  href="/images/背景图.png"
                  xlinkHref="/images/背景图.png"
                  x="851.397"
                  y="124.851"
                  width="374.158"
                  height="811.152"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#phone1_screen_clip_m)"
                />

                {/* Phone 1 Screen Content (Desktop Parity with Staggered Animations) */}
                <g clipPath="url(#phone1_screen_clip_m)">
                  {/* Title "微分碎盖" */}
                  <motion.g style={{ opacity: titleOpacity, x: titleX }}>
                    <text
                      fill="white"
                      style={{
                        whiteSpace: "pre",
                        fontFamily: "BIZ UDGothic, sans-serif",
                        fontSize: "55px",
                        fontWeight: "bold",
                      }}
                    >
                      <tspan x="991" y="265.437">微分碎盖</tspan>
                    </text>
                  </motion.g>

                  {/* Main Photo (Tilted 4.07784deg) */}
                  <motion.g style={{ opacity: mainImgOpacity, x: mainImgX }}>
                    <image
                      href="/images/大图.png"
                      xlinkHref="/images/大图.png"
                      x="853.248"
                      y="278.099"
                      width="231.707"
                      height="291.761"
                      transform="rotate(4.07784, 853.248, 278.099)"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </motion.g>

                  {/* Length Image */}
                  <motion.g style={{ opacity: lengthImgOpacity, x: lengthImgX }}>
                    <image
                      href="/images/长度图.png"
                      xlinkHref="/images/长度图.png"
                      x="1042.66"
                      y="290.432"
                      width="169.111"
                      height="116.093"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </motion.g>

                  {/* Texture Image */}
                  <motion.g style={{ opacity: textureImgOpacity, x: textureImgX }}>
                    <image
                      href="/images/发质图.png"
                      xlinkHref="/images/发质图.png"
                      x="1037.09"
                      y="414.913"
                      width="180.219"
                      height="90.1094"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </motion.g>

                  {/* Perm Image */}
                  <motion.g style={{ opacity: permImgOpacity, x: permImgX }}>
                    <image
                      href="/images/卷烫图.png"
                      xlinkHref="/images/卷烫图.png"
                      x="1033.37"
                      y="502.235"
                      width="187.608"
                      height="63.1839"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </motion.g>

                  {/* Care / Manage Image */}
                  <motion.g style={{ opacity: mainRefImgOpacity, x: mainRefImgX }}>
                    <image
                      href="/images/打理图.png"
                      xlinkHref="/images/打理图.png"
                      x="1042.66"
                      y="570.05"
                      width="169.279"
                      height="45.4634"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </motion.g>

                  {/* Reference Showcase Display Image */}
                  <motion.g style={{ opacity: displayImgOpacity, y: displayImgY }}>
                    <image
                      href="/images/参考展示图.png"
                      xlinkHref="/images/参考展示图.png"
                      x="829"
                      y="609.995"
                      width="402.069"
                      height="202.133"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#phone1_screen_clip_m)"
                    />
                  </motion.g>
                </g>

                {/* Phone 1 Outer Mask Frame */}
                <g mask="url(#phone1_mask_m)" className="pointer-events-none">
                  <svg
                    x={841.894}
                    y={112.548}
                    width={393.164}
                    height={839.295}
                    viewBox="2503 715 1729 3621"
                    preserveAspectRatio="none"
                  >
                    <image href="/Body.png" xlinkHref="/Body.png" width={6736} height={5052} />
                  </svg>
                </g>
              </svg>
            </motion.div>

            {/* ------------------------------------------------------- */}
            {/* Phone 2 (Stage 2, 3, 4: Parameter & Checklist Mockup)   */}
            {/* ------------------------------------------------------- */}
            <motion.div
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                x: phone2SlideX,
                opacity: phone2Opacity,
                y: phone2ParallaxY,
              }}
            >
              <svg
                viewBox="0 0 402.451 831.569"
                className="w-full h-full overflow-visible drop-shadow-xl"
                fill="none"
              >
                <defs>
                  <mask id="phone2_mask_m">
                    <rect x="0" y="0" width="450" height="850" fill="white" />
                    <rect x="23.1697" y="14.0079" width="371.6454" height="805.705" rx="60" fill="black" />
                  </mask>
                  <clipPath id="phone2_screen_clip_m">
                    <rect x="23.1697" y="14.0079" width="371.6454" height="805.705" rx="60" />
                  </clipPath>
                  <linearGradient id="btn_grad_m" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#B71102" />
                    <stop offset="1" stopColor="#C5564E" />
                  </linearGradient>
                </defs>

                {/* Base Phone */}
                <svg
                  x={13.73}
                  y={-0.2}
                  width={390.523}
                  height={833.66}
                  viewBox="2503 715 1729 3621"
                  preserveAspectRatio="none"
                >
                  <image href="/Body.png" xlinkHref="/Body.png" width={6736} height={5052} />
                </svg>

                {/* Phone 2 Screen Content */}
                <g clipPath="url(#phone2_screen_clip_m)">
                  <g transform="translate(4.18, 8.34) scale(0.98)">
                    {/* Background */}
                    <rect x="19.38" y="5.79" width="379.23" height="822.15" fill="white" />
                    <image
                      href="/images/背景图.png"
                      xlinkHref="/images/背景图.png"
                      x="19.38"
                      y="5.79"
                      width="379.23"
                      height="822.15"
                      preserveAspectRatio="xMidYMid slice"
                    />

                    {/* Title "微分碎盖" */}
                    <text
                      x="261.22"
                      y="152"
                      textAnchor="middle"
                      fill="white"
                      style={{
                        fontFamily: "SourceHanSansCN-Heavy, Source Han Sans CN, sans-serif",
                        fontSize: "52px",
                        fontWeight: "900",
                        letterSpacing: "0.05em",
                      }}
                    >
                      微分碎盖
                    </text>

                    {/* Portrait */}
                    <image
                      href="/正面大头图.png"
                      xlinkHref="/正面大头图.png"
                      x="27.84"
                      y="179.93"
                      width="183.71"
                      height="320.96"
                      preserveAspectRatio="xMidYMid meet"
                    />

                    {/* Reference photo */}
                    <image
                      href="/images/参考展示图.png"
                      xlinkHref="/images/参考展示图.png"
                      x="0"
                      y="489.04"
                      width="399.37"
                      height="200.78"
                      preserveAspectRatio="xMidYMid slice"
                    />

                    {/* Footer Module */}
                    <image
                      href="/底部模块.png"
                      xlinkHref="/底部模块.png"
                      x="31.69"
                      y="680.97"
                      width="353.25"
                      height="131.08"
                      preserveAspectRatio="xMidYMid meet"
                    />

                    {/* Attribute tags */}
                    <image
                      href="/三分属性框图.png"
                      xlinkHref="/三分属性框图.png"
                      x="217.92"
                      y="367.24"
                      width="160.09"
                      height="42.32"
                      preserveAspectRatio="xMidYMid meet"
                    />

                    {/* ----------------------------------------------- */}
                    {/* Stage 2 HUD 1 & Tab 1 (Haircut parameters)       */}
                    {/* ----------------------------------------------- */}
                    <motion.image
                      href="/hud注释.png"
                      xlinkHref="/hud注释.png"
                      x="117.62"
                      y="232.46"
                      width="70"
                      height="100"
                      style={{ opacity: hud1Opacity }}
                      preserveAspectRatio="xMidYMin meet"
                    />
                    <motion.image
                      href="/选项卡.png"
                      xlinkHref="/选项卡.png"
                      x="217.92"
                      y="186.39"
                      width="167.15"
                      height="262.5"
                      style={{ opacity: tab1Opacity }}
                      preserveAspectRatio="xMidYMin meet"
                    />

                    {/* ----------------------------------------------- */}
                    {/* Stage 3 HUD 2 & Tab 2 (Checklist confirmation)  */}
                    {/* ----------------------------------------------- */}
                    <motion.image
                      href="/第二hud.png"
                      xlinkHref="/第二hud.png"
                      x="50.62"
                      y="262.46"
                      width="140"
                      height="150"
                      style={{ opacity: hud2Opacity }}
                      preserveAspectRatio="xMidYMin meet"
                    />
                    <motion.image
                      href="/第二选项卡.png"
                      xlinkHref="/第二选项卡.png"
                      x="217.92"
                      y="186.39"
                      width="167.15"
                      height="262.5"
                      style={{ opacity: tab2Opacity }}
                      preserveAspectRatio="xMidYMin meet"
                    />

                    {/* Stage 4 Exposed Button Group */}
                    <g transform="translate(258.12, 681.97)">
                      <rect width="127" height="127" rx="16" fill="url(#btn_grad_m)" />
                      <text
                        x="6"
                        y="118"
                        fill="white"
                        style={{
                          fontFamily: "Source Han Sans CN",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        2 / 4
                      </text>
                      <text
                        x="85"
                        y="120"
                        fill="white"
                        style={{ fontFamily: "Source Han Sans CN", fontSize: "16px" }}
                      >
                        继续
                      </text>
                      <g transform="translate(94.08, 15.66) scale(0.8)">
                        <path
                          d="M12.377 4.159L19.838 11.619L12.377 19.079"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0 0V7.394C0.01 7.968 0.145 8.532 0.396 9.048C0.647 9.564 1.008 10.019 1.453 10.381C2.439 11.193 3.681 11.632 4.959 11.619H19.837"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  </g>
                </g>

                {/* Phone 2 Outer Mask Frame */}
                <g mask="url(#phone2_mask_m)">
                  <svg
                    x={13.73}
                    y={-0.2}
                    width={390.523}
                    height={833.66}
                    viewBox="2503 715 1729 3621"
                    preserveAspectRatio="none"
                  >
                    <image href="/Body.png" xlinkHref="/Body.png" width={6736} height={5052} />
                  </svg>
                </g>
              </svg>
            </motion.div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* Seamless Gaussian-blurred Background Overlay              */}
        {/* Covers lower ~46dvh with a continuous, smooth gradient    */}
        {/* Completely solid #f9f9f9 across the text area to eliminate*/}
        {/* any horizontal seams or phone mockup bleed-through        */}
        {/* ========================================================= */}
        <div 
          className="absolute bottom-0 inset-x-0 w-full h-[46dvh] xs:h-[48dvh] pointer-events-none z-20 overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Backdrop blur for smooth progressive softening of the mockup */}
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 12%, black 30%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 12%, black 30%)',
            }}
          />

          {/* Seamless Gaussian ease-in gradient to solid #f9f9f9 (solid above the text) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(249, 249, 249, 0) 0%, rgba(249, 249, 249, 0.35) 8%, rgba(249, 249, 249, 0.80) 18%, #f9f9f9 28%, #f9f9f9 100%)',
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* Bottom Content Area: Descriptions + Indicator on Overlay  */}
        {/* Placed cleanly on top of the blurred cover (z-30)         */}
        {/* ========================================================= */}
        <div className="absolute bottom-0 inset-x-0 w-full flex flex-col items-center justify-end pb-4 xs:pb-6 px-4 z-30 pointer-events-auto">
          <div className="w-full max-w-[430px] flex flex-col items-center">
            
            {/* Text Description Container (Crossfades across 4 stages) */}
            <div className="relative w-full h-[68px] xs:h-[72px] flex items-center justify-center mb-12 xs:mb-14">
              {/* Stage 1 Text */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-2"
                style={{ opacity: text1Opacity, y: text1Y }}
              >
                <h3 
                  className="text-[17px] xs:text-[18px] text-[#2E2E2E] tracking-normal mb-1 leading-tight select-none"
                  style={{ fontFamily: 'Source Han Sans CN, sans-serif', fontWeight: 900 }}
                >
                  {STAGES[0].title}
                </h3>
                <p 
                  className="text-[11px] xs:text-[12px] text-[#2E2E2E] font-normal leading-[1.4] max-w-[360px] select-none"
                  style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
                >
                  <span className="block">{STAGES[0].line1}</span>
                  <span className="block">{STAGES[0].line2}</span>
                </p>
              </motion.div>

              {/* Stage 2 Text */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-2"
                style={{ opacity: text2Opacity, y: text2Y }}
              >
                <h3 
                  className="text-[17px] xs:text-[18px] text-[#2E2E2E] tracking-normal mb-1 leading-tight select-none"
                  style={{ fontFamily: 'Source Han Sans CN, sans-serif', fontWeight: 900 }}
                >
                  {STAGES[1].title}
                </h3>
                <p 
                  className="text-[11px] xs:text-[12px] text-[#2E2E2E] font-normal leading-[1.4] max-w-[360px] select-none"
                  style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
                >
                  <span className="block">{STAGES[1].line1}</span>
                  <span className="block">{STAGES[1].line2}</span>
                </p>
              </motion.div>

              {/* Stage 3 Text */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-2"
                style={{ opacity: text3Opacity, y: text3Y }}
              >
                <h3 
                  className="text-[17px] xs:text-[18px] text-[#2E2E2E] tracking-normal mb-1 leading-tight select-none"
                  style={{ fontFamily: 'Source Han Sans CN, sans-serif', fontWeight: 900 }}
                >
                  {STAGES[2].title}
                </h3>
                <p 
                  className="text-[11px] xs:text-[12px] text-[#2E2E2E] font-normal leading-[1.4] max-w-[360px] select-none"
                  style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
                >
                  <span className="block">{STAGES[2].line1}</span>
                  <span className="block">{STAGES[2].line2}</span>
                </p>
              </motion.div>

              {/* Stage 4 Text */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-2"
                style={{ opacity: text4Opacity, y: text4Y }}
              >
                <h3 
                  className="text-[17px] xs:text-[18px] text-[#2E2E2E] tracking-normal mb-1 leading-tight select-none"
                  style={{ fontFamily: 'Source Han Sans CN, sans-serif', fontWeight: 900 }}
                >
                  {STAGES[3].title}
                </h3>
                <p 
                  className="text-[11px] xs:text-[12px] text-[#2E2E2E] font-normal leading-[1.4] max-w-[360px] select-none"
                  style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
                >
                  <span className="block">{STAGES[3].line1}</span>
                  <span className="block">{STAGES[3].line2}</span>
                </p>
              </motion.div>
            </div>

            {/* Dynamic Indicator Track - shifted up by 25px */}
            <div className="flex justify-center w-full -translate-y-[25px]">
              <FeaturesIndicator
                activeWeights={[
                  tab1ActiveWeight,
                  tab2ActiveWeight,
                  tab3ActiveWeight,
                  tab4ActiveWeight,
                ]}
                onTabClick={(id) => scrollToStage(id as 1 | 2 | 3 | 4)}
                scale={(280 / 355.5) * 0.9}
                trackBorderRadius="24px"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
