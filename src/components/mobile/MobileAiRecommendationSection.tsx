import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import type { MotionValue } from "motion/react";
import { PhoneScannerDemo } from "../PhoneScannerDemo";

export interface MobileAiRecommendationSectionProps {
  titleEntranceProgress?: MotionValue<number>;
}

export const MobileAiRecommendationSection: React.FC<MobileAiRecommendationSectionProps> = ({
  titleEntranceProgress: externalProgress,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "-40px 0px -40px 0px",
  });

  const firstDivRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stickyScreenRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const [startX, setStartX] = useState<number>(245);
  const [titleHalfW, setTitleHalfW] = useState<number>(115);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // 入场进度：从左到右渐显 (0 -> 1)
  // 开始时机：当这个 div (舞台容器) 的底端进入屏幕视口时开始触发 (stageRect.bottom <= vh)
  // 结束时机：第二个 div (吸附单屏) 的底边出现在屏幕中时结束 (stickyRect.bottom <= vh)
  const internalProgress = useMotionValue(0);
  const entranceProgress = externalProgress || internalProgress;

  useEffect(() => {
    const handleScroll = () => {
      if (!stageRef.current || !stickyScreenRef.current) return;
      const stageRect = stageRef.current.getBoundingClientRect();
      const stickyRect = stickyScreenRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // 入场时机整体提前约 140px (视口约 18%)，让文字在更早滚动位便开始并完成渐显展开
      const earlyOffset = Math.round(Math.min(vh * 0.18, 150));
      const targetTriggerY = vh + earlyOffset;

      // 1. 开始时机：提前触发 (stageRect.bottom <= targetTriggerY)
      // 2. 结束时机：提前结束 (stickyRect.bottom <= targetTriggerY)
      const startDist = stageRect.bottom - targetTriggerY; // <= 0 when started
      const endDist = stickyRect.bottom - targetTriggerY;   // <= 0 when ended

      if (startDist > 0) {
        entranceProgress.set(0);
      } else if (endDist <= 0) {
        entranceProgress.set(1);
      } else {
        const total = Math.max(stickyRect.bottom - stageRect.bottom, 60);
        const current = targetTriggerY - stageRect.bottom;
        const p = Math.min(Math.max(current / total, 0), 1);
        entranceProgress.set(p);
      }
    };

    handleScroll();
    const rafId = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [entranceProgress]);

  // 动态测量大标题宽度，将裁切窗口永久锁定在大标题最右侧
  useEffect(() => {
    const updatePosition = () => {
      if (textRef.current) {
        const textW = textRef.current.offsetWidth || 230;
        const halfW = Math.round(textW / 2);
        setTitleHalfW(halfW);
        // 样机宽度 258px (半宽 129px)。起始时样机左边缘紧贴大标题最右边缘 (halfW)
        // 处于静止裁切窗口外部，初始自然完全不可见
        const computedStart = halfW + 130;
        setStartX(computedStart);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // 监听整段底页粘性滚动轨道的滚动进度
  // "start start": 底部单屏粘在视口顶端（文字精确处于视口正中央）
  // "end end": 滚轮滚动到底部
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  // 使用弹簧阻尼使滚轮推动时具有丝滑高级的物理惯性
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 32,
    restDelta: 0.001,
  });

  // 滚轮进度映射：
  // 0.00 -> 0.12：文字固定在视口中央，静止停留，样机在窗口右侧隐藏待命
  // 0.12 -> 0.38：随滚轮推进，样机从固定窗口向左滑入，文字同步从右向左渐隐
  // 0.32 -> 0.70：样机平稳移至最佳视觉位 (-15px)，同时右侧同步显现大 logo 与下载按钮（同 PC 端）
  // 0.70 -> 1.00：完全就位并始终稳固停留在视口中心
  const phoneX = useTransform(smoothProgress, [0.12, 0.70], [startX, -15]);

  // 固定视窗裁切机制：
  // 窗口右边界严格锁定在大标题最右侧 (50% + titleHalfW)，空间绝对固定，不随滚轮与样机移动！
  // 样机超出文字最右侧的部分被硬性裁切；进入视界后 (0.72 之后) 解除裁切
  const phoneClipPath = useTransform(smoothProgress, (val) => {
    if (val >= 0.72) return "none";
    return `inset(-200px calc(50% - ${titleHalfW}px) -200px -200px)`;
  });

  const phoneOpacity = useTransform(smoothProgress, [0.11, 0.12], [0, 1]);
  const phoneVisibility = useTransform(smoothProgress, (val) =>
    val < 0.11 ? "hidden" : "visible"
  );

  // 1. 入场遮罩进度 (从左到右渐显)：-20% -> 120%
  const entranceMaskCutoff = useTransform(entranceProgress, [0, 1], [-20, 120]);
  const entranceOpacity = useTransform(entranceProgress, [0, 0.25, 1], [0, 1, 1]);
  const entranceX = useTransform(entranceProgress, [0, 1], [-18, 0]);

  // 2. 出场遮罩进度 (从右向左渐隐)：120% -> -25%
  const exitMaskCutoff = useTransform(smoothProgress, [0.12, 0.38], [120, -25]);
  const exitOpacity = useTransform(smoothProgress, [0.30, 0.38], [1, 0]);

  // 融合入场与出场遮罩进度
  const effectiveMaskCutoff = useTransform(
    [entranceMaskCutoff, exitMaskCutoff],
    ([enterVal, exitVal]: [number, number]) => Math.min(enterVal, exitVal)
  );

  const maskStyle = useTransform(
    effectiveMaskCutoff,
    (val) =>
      `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${Math.max(0, val - 30)}%, rgba(0,0,0,0) ${Math.max(0, val)}%, rgba(0,0,0,0) 100%)`
  );

  const textOpacity = useTransform(
    [entranceOpacity, exitOpacity],
    ([enterOp, exitOp]: [number, number]) => Math.min(enterOp, exitOp)
  );

  // 右侧大 Logo 与 LIVEFOR 理法 文字异步显现动画（延后出场：待样机主体滑入并就位左侧后再进场）
  const logoOpacity = useTransform(smoothProgress, [0.55, 0.76], [0, 1]);
  const logoX = useTransform(smoothProgress, [0.55, 0.76], [24, 0]);

  // 右侧下载理法按钮异步显现动画（紧随大 Logo 后延后入场）
  const ctaOpacity = useTransform(smoothProgress, [0.70, 0.90], [0, 1]);
  const ctaX = useTransform(smoothProgress, [0.70, 0.90], [28, 0]);
  const rightGroupVisibility = useTransform(smoothProgress, (val) =>
    val < 0.52 ? "hidden" : "visible"
  );

  return (
    <section
      id="mobile-ai-recommendation"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center select-none bg-[#f9f9f9] pt-12 xs:pt-16"
    >
      <div ref={firstDivRef} className="w-full max-w-[500px] sm:max-w-[540px] px-2 xs:px-4 mx-auto overflow-hidden">
        <svg
          viewBox="0 3637.5 393 496"
          className="w-full h-auto block select-none overflow-hidden"
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <defs>
            {/* Background grid blur filters */}
            <filter id="m_ai_edge_mask_blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Background fill matching original design */}
          <rect x="0" y="3637.5" width="393" height="496" fill="#f9f9f9" />

          {/* Reusable Phone Map Scanning Illustration Component flush against line 160 at Y=4015.5 */}
          <PhoneScannerDemo
            isInView={isInView}
            isMobile={true}
            x={85}
            y={3675}
            width={223}
            height={340.5}
          />

          {/* Background Grid Lines seamlessly continuing from NFC section without duplicate lines */}
          <g id="ai-background-grid" style={{ pointerEvents: "none" }}>
            {/* Horizontal dividing line under the phone at Y=4015.5 (直线 160) */}
            <line
              x1="27.5"
              y1="4015.5"
              x2="360"
              y2="4015.5"
              stroke="#b0b0b0"
              strokeWidth="0.5"
            />
            {/* Horizontal dividing line under description at Y=4132.5 (直线 161) */}
            <line
              x1="27.5"
              y1="4132.5"
              x2="360"
              y2="4132.5"
              stroke="#b0b0b0"
              strokeWidth="0.5"
            />
            {/* Vertical grid lines terminating cleanly at the last horizontal line Y=4132.5 */}
            <line
              x1="27.5"
              y1="3637.5"
              x2="27.5"
              y2="4132.5"
              stroke="#b0b0b0"
              strokeWidth="0.5"
            />
            <line
              x1="360"
              y1="3637.5"
              x2="360"
              y2="4132.5"
              stroke="#b0b0b0"
              strokeWidth="0.5"
            />

            {/* Edge blur masks matching the native mobile SVG */}
            <rect
              width="57"
              height="496"
              transform="translate(5 3637.5)"
              fill="#f9f9f9"
              filter="url(#m_ai_edge_mask_blur)"
              style={{ filter: "blur(10px)" }}
            />
            <rect
              width="57"
              height="496"
              transform="translate(332 3637.5)"
              fill="#f9f9f9"
              filter="url(#m_ai_edge_mask_blur)"
              style={{ filter: "blur(10px)" }}
            />
          </g>

          {/* Section Headings & Description Texts matching 组 191.svg */}
          <g id="ai-foreground-content">
            {/* Title: 理发师 AI智能推荐 */}
            <text
              transform="translate(48 4052)"
              fill="#292929"
              fontSize="27"
              fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, PingFang SC, Microsoft YaHei, sans-serif"
              fontWeight="500"
              letterSpacing="0.04em"
            >
              <tspan x="0" y="0">理发师 AI智能推荐</tspan>
            </text>

            {/* Description Text: 智能推荐描述 */}
            <text
              transform="translate(48 4099)"
              fill="#8c8c8c"
              fontSize="10"
              fontFamily="SourceHanSansCN-Normal, Source Han Sans CN, PingFang SC, Microsoft YaHei, sans-serif"
              letterSpacing="0.07em"
            >
              <tspan x="0" y="0">根据距离、性价比、技术能力</tspan>
              <tspan x="0" y="12">适配的多维度智能分析帮您快</tspan>
              <tspan x="0" y="24">速筛选目标理发师。</tspan>
            </text>

            {/* Action Arrow ↗ */}
            <g
              transform="translate(325.234 4105.929)"
              className="cursor-pointer"
            >
              <g transform="translate(21.071 10.55) rotate(135)">
                <path
                  d="M7.461,14.92,0,7.46,7.461,0"
                  fill="none"
                  stroke="#292929"
                  strokeWidth="2"
                />
                <path
                  d="M14.878,0H0"
                  transform="translate(0.001 7.46)"
                  fill="none"
                  stroke="#292929"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* 滚轮驱动轨道容器：整段固定在视口中央，样机进入与文字渐隐完全随滚轮滚动进行 */}
      <div
        ref={scrollTrackRef}
        className="relative w-full max-w-[500px] sm:max-w-[540px] px-2 xs:px-4 mx-auto h-[260vh] mt-16 xs:mt-24"
      >
        {/* 粘性吸附单屏：严密固定在视口正中央 */}
        <div ref={stickyScreenRef} className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden select-none bg-[#f9f9f9]">
          {/* 舞台容器：文字与样机在同一中心坐标系中重叠定位 */}
          <div ref={stageRef} className="relative w-full flex items-center justify-center min-h-[480px]">
            {/* Layer 1: "享受理发 就从这里开始" 文字 (z-10) */}
            {/* 随滚轮推进：入场从左到右渐显，推进后从右向左渐隐 */}
            <motion.div
              style={{
                WebkitMaskImage: maskStyle,
                maskImage: maskStyle,
                opacity: textOpacity,
                x: entranceX,
              }}
              className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            >
              <h2
                ref={textRef}
                className="text-[clamp(28px,8vw,38px)] leading-[1.38] tracking-[0.07em] text-[#292929] text-center font-bold select-none whitespace-nowrap"
                style={{
                  fontFamily:
                    "FZYAYH-GB18030L2-B, FZYaYiHei GB18030L2, PingFang SC, Microsoft YaHei, sans-serif",
                }}
              >
                <span className="block">享受理发</span>
                <span className="block mt-2">就从这里开始</span>
              </h2>
            </motion.div>

            {/* Layer 2: 样机 (z-20) */}
            {/* 窗口固定在大标题最右侧绝对不动，样机从中向左滑出进入视界 */}
            <motion.div
              style={{
                clipPath: phoneClipPath,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <motion.div
                style={{
                  x: phoneX,
                  y: 20,
                  opacity: phoneOpacity,
                  visibility: phoneVisibility,
                  width: "258px",
                  height: "auto",
                }}
                className="flex items-center justify-center will-change-transform"
              >
                <svg
                  viewBox="2491 714 2744 4176"
                  className="w-full h-auto block select-none"
                >
                  {/* 尾页样机高精材质层 */}
                  <image
                    href="/尾页样机.png"
                    xlinkHref="/尾页样机.png"
                    x="0"
                    y="0"
                    width="6736"
                    height="5052"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Layer 3: 右侧大 Logo 与 下载理法 按钮 (z-20，同 PC 端) */}
            <motion.div
              style={{
                visibility: rightGroupVisibility,
                left: "calc(50% + 26px)",
                width: "140px",
              }}
              className="absolute z-20 flex flex-col items-center justify-center will-change-transform pointer-events-auto"
            >
              {/* 大 Logo 与 LIVEFOR 理法 品牌标识 */}
              <motion.div
                style={{ opacity: logoOpacity, x: logoX }}
                className="flex flex-col items-center justify-center select-none"
              >
                <img
                  src="/logo黑红.png"
                  alt="LIVEFOR Logo"
                  className="w-[104px] h-[104px] object-contain select-none pointer-events-none"
                  draggable={false}
                />
                <div
                  className="text-[18px] tracking-[-0.04em] text-[#292929] flex items-center justify-center gap-1 font-bold select-none leading-none mt-2 whitespace-nowrap"
                  style={{
                    fontFamily:
                      "FZYooncheQWHS-M--GB1-0, FZYooncheQWHS, PingFang SC, sans-serif",
                  }}
                >
                  <span>LIVEFOR</span>
                  <span
                    className="font-normal"
                    style={{
                      fontFamily:
                        "FZYooncheQWHS-R--GB1-0, FZYooncheQWHS, PingFang SC, sans-serif",
                    }}
                  >
                    理法
                  </span>
                </div>
              </motion.div>

              {/* 下载理法 胶囊按钮（同 PC 端 Page12Section 设计） */}
              <motion.button
                style={{
                  opacity: ctaOpacity,
                  x: ctaX,
                  background:
                    "linear-gradient(135deg, #3b3b3b 0%, #000000 100%)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setDownloaded(true);
                  setTimeout(() => setDownloaded(false), 2000);
                }}
                className="mt-4 flex items-center justify-center gap-2 w-[128px] h-[38px] rounded-full border border-[#707070]/60 text-white shadow-md select-none transition-shadow active:brightness-95 cursor-pointer"
              >
                {/* 手机线框图标 (与 PC 端 Page12Section 保持一致) */}
                <div className="w-[12px] h-[18px] rounded-[4px] border-[1.6px] border-[#f9f9f9] relative flex items-start justify-center pt-[2px] shrink-0">
                  <div className="w-[3.5px] h-[1.2px] bg-[#f9f9f9] rounded-full" />
                </div>
                <span
                  className="text-[13.5px] font-medium tracking-[0.05em] text-[#f9f9f9] whitespace-nowrap"
                  style={{ fontFamily: "Noto Sans SC, PingFang SC, sans-serif" }}
                >
                  {downloaded ? "已获取安装包" : "下载理法"}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAiRecommendationSection;
