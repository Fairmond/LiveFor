import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import { MobileFuturePromo } from "./MobileFuturePromo";
import { MobileFeaturesSection } from "./MobileFeaturesSection";
import MobileBarberInfoSection from "./MobileBarberInfoSection";
import { MobileMagazineSection } from "./MobileMagazineSection";
import { MobileNfcSection } from "./MobileNfcSection";
import { MobileAiRecommendationSection } from "./MobileAiRecommendationSection";


// Isolated Back-To-Top button component
const MobileBackToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-4 z-50 w-10 h-10 rounded-full bg-[#1e293b]/90 backdrop-blur-md shadow-lg flex items-center justify-center text-white/90 hover:text-white hover:bg-[#0f172a] active:scale-95 transition-all duration-200 border border-white/10"
      style={{
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export const MobileLayout: React.FC<{ 
  onNavigate?: (page: 'home' | 'product-design') => void;
  currentPage?: 'home' | 'product-design';
}> = ({ onNavigate, currentPage = 'home' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. 移动端首页长度与窗口长度动态相等
  const [viewportHeight, setViewportHeight] = useState(() => 
    typeof window !== 'undefined' ? window.innerHeight : 700
  );
  const [viewportWidth, setViewportWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 393
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerWidth = Math.min(viewportWidth, 430) || 393;
  // 动态计算 SVG viewBox 高度，确保纵横比与窗口完全等比贴合无缝隙
  const viewBoxHeight = Math.max(680, Math.round((393 * viewportHeight) / containerWidth));
  // 窗口变长时的垂直微调，使内容在首屏保持优美留白与呼吸感
  const contentYOffset = Math.max(0, (viewBoxHeight - 700) * 0.3);

  // 3. 底部动态过渡光斑：
  // - 取消防误触死区，滚动开始 (0px) 即刻实时响应
  // - 加快初始扩张阶段：在前 80px 的轻微滑动内，直径从 0 迅速扩张到横向完全覆盖手机屏幕 (containerWidth * 1.15)
  // - 后续区间 (80px ~ 260px) 保持平稳过渡，最终完全包裹并融入下一模块的浅灰白底色 (#f9f9f9)
  const { scrollY } = useScroll();
  const circleSize = useTransform(
    scrollY,
    [0, 80, 260],
    [0, containerWidth * 1.15, Math.max(780, containerWidth * 2.3)]
  );
  const circleOpacity = useTransform(
    scrollY,
    [0, 20, 260],
    [0, 0.95, 1]
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 底部尾页标题入场时，顶栏同步上移收回窗口上方
  const titleEntranceProgress = useMotionValue(0);
  const navY = useTransform(titleEntranceProgress, [0, 1], [0, -110]);
  const navOpacity = useTransform(titleEntranceProgress, [0, 0.75, 1], [1, 0.35, 0]);

  return (
    <div className="relative w-full min-h-screen bg-[#f9f9f9] flex flex-col items-center overflow-x-clip">
      {/* 0. Fixed Top Navbar Bar - 固定在窗口顶部，随底页标题出现同步上移收回窗口上方 */}
      <motion.header
        style={{
          y: navY,
          opacity: navOpacity,
        }}
        className="fixed top-[max(18px,calc(env(safe-area-inset-top)+4px))] z-50 w-full max-w-[430px] px-3 flex justify-center pointer-events-none will-change-transform"
      >
        <div className="w-full max-w-[369px] h-[54.2px] pointer-events-auto rounded-[18px] border-0 outline-none backdrop-blur-md filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 369 54.195"
            className="w-full h-full block select-none border-0 outline-none"
          >
            <g id="iPhone_14_Pro_63">
              <g id="标签栏">
                <rect id="矩形_425" width="369" height="54.195" rx="18" fill="#0a0d12" fillOpacity="0.85" stroke="none" />
                <g 
                  id="组_113" 
                  transform="translate(13 4.098)" 
                  className="cursor-pointer"
                  onClick={() => {
                    onNavigate?.('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <image id="logo白红" width="26" height="26" transform="translate(5 10)" href="/logo.png" xlinkHref="/logo.png" />
                  <text id="理法" transform="translate(33 14.5)" fill="#ebebeb" fontSize="15" fontFamily="'FZYOONCHEQWHJW', FZYooncheQWHS-M--GB1-0, FZYooncheQWHS, sans-serif" letterSpacing="0.04em">
                    <tspan x="0" y="14">理法</tspan>
                  </text>
                  <text id="Livefor" transform="translate(63 14.5)" fill="#ebebeb" fontSize="15" fontFamily="'FZYOONCHEQWHJW', FZYooncheQWHS-M--GB1-0, FZYooncheQWHS, sans-serif" letterSpacing="0.006em">
                    <tspan x="0" y="14">LIVEFOR</tspan>
                  </text>
                </g>
              </g>

              {/* Hamburger Button with generous touch hit target */}
              <g 
                id="组_183" 
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              >
                <rect x="321" y="9" width="45" height="36" fill="transparent" />
                <line id="直线_148" x1="336.69" x2="350.835" y1="21.1" y2="21.1" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1.5" />
                <line id="直线_147" x1="336.69" x2="350.835" y1="27.1" y2="27.1" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1.5" />
                <line id="直线_149" x1="336.69" x2="350.835" y1="33.1" y2="33.1" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        </div>
      </motion.header>

      {/* 1. Mobile Top: 移动端首页长度和窗口长度动态相等 (shrink-0 防止 flex 子元素被压缩) */}
      <div 
        className="relative w-full max-w-[430px] shrink-0 select-none overflow-hidden h-[100dvh] min-h-[100dvh]"
        style={{ height: `${viewportHeight}px`, minHeight: '100dvh' }}
      >
        {/* Background Video & Poster Layer - 去掉黑黑的全屏遮罩，还原本色 */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
            preload="auto"
            poster="/iPhone 14 Pro - 61-image.jpg"
            className="w-full h-full object-cover object-center"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            <source src="/video/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* SVG Structure matching iPhone 14 Pro – 63 with 1:1 precision */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox={`0 0 393 ${viewBoxHeight}`}
          className="relative z-10 w-full h-full block"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="m_hero_title_glow" x="9" y="152" width="375" height="197" filterUnits="userSpaceOnUse">
              <feOffset dy="3" in="SourceAlpha" />
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#fff" floodOpacity="0.722" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
            <pattern id="m_capsule_pattern" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 2800 544">
              <image width="2800" height="544" href="/capsule.png" xlinkHref="/capsule.png" />
            </pattern>
            <clipPath id="clip_iphone_14_pro_63">
              <rect width="393" height={viewBoxHeight} />
            </clipPath>
          </defs>

          <g id="iPhone_14_Pro_63" clipPath="url(#clip_iphone_14_pro_63)">
            {/* Title & Subtitle Group (组_120) */}
            <g id="组_120" transform={`translate(-523 ${28 + contentYOffset})`}>
              {/* 主标题：立刻，预见未来的自己 (严格保持 72px / 48px 与白色发光滤镜) */}
              <g transform="matrix(1, 0, 0, 1, 523, -28)" filter="url(#m_hero_title_glow)">
                <text 
                  id="立刻_预见未来的自己" 
                  transform="translate(27 243)" 
                  fill="#fff" 
                  fontSize="72" 
                  fontFamily="'FZYaYiHei-L02S', FZYAYH-GB18030L2-B, FZYaYiHei GB18030L2, 'PingFang SC', sans-serif" 
                  letterSpacing="0.01em"
                >
                  <tspan x="0" y="0">立刻</tspan>
                  <tspan y="0" fontSize="48">，</tspan>
                  <tspan fontSize="48">
                    <tspan x="0" y="72">预见未来的自己</tspan>
                  </tspan>
                </text>
              </g>

              {/* 副标题文案：严格 16px, #b3b3b3, 3行排版 */}
              <text 
                id="通过可视化理发指南" 
                transform="translate(550 360)" 
                fill="#b3b3b3" 
                fontSize="16" 
                fontFamily="'FZYOONCHEQWHJW', SourceHanSansCN-Normal, Source Han Sans CN, -apple-system, sans-serif" 
                letterSpacing="0.008em"
              >
                <tspan x="0" y="19">通过可视化理发指南，帮你的理发体</tspan>
                <tspan x="0" y="43">验变的 可控、便捷、高效。真正掌控</tspan>
                <tspan x="0" y="67">自己的发型。</tspan>
              </text>
            </g>

            {/* 改变胶囊按钮 (改变按钮)：274 x 53 水平完美居中 */}
            <g 
              id="改变按钮" 
              transform={`translate(-494 ${45.613 + contentYOffset})`} 
              className="cursor-pointer active:scale-95 transition-transform"
              onClick={() => onNavigate?.('product-design')}
            >
              <rect 
                id="Liquid_Glass_Capsule" 
                width="274" 
                height="53" 
                rx="26.5"
                transform="translate(554 472.387)" 
                fill="url(#m_capsule_pattern)" 
              />
            </g>
          </g>
        </svg>

        {/* 底部动态向下扩散光斑：圆心精准位于首页底线 (bottom: 0, left: 50%, x: -50%, y: 50%) */}
        <motion.div
          id="m_hero_circle_wrapper"
          style={{
            width: circleSize,
            height: circleSize,
            opacity: circleOpacity,
            backgroundColor: '#f9f9f9',
            filter: 'blur(36px)',
            borderRadius: '50%',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            x: '-50%',
            y: '50%',
            zIndex: 20,
            pointerEvents: 'none',
            willChange: 'width, height, opacity',
          }}
        />
      </div>

      {/* 2. Interactive Future Salon Promo (Page 3 on mobile) */}
      <MobileFuturePromo />

      {/* 3. Interactive Mobile Feature Cards (Page 4) */}
      <MobileFeaturesSection />

      {/* 4. Barber Info Section: "遇见专属发型师" (Page 5 & 6) */}
      <MobileBarberInfoSection />

      {/* 5. Magazine Recommendations Section: "不止时尚，更有态度。" (Cascading 3 covers matching 组 186.png) */}
      <MobileMagazineSection />

      {/* 6. Animated Mobile NFC Feature Section (碰一碰交换信息) */}
      <MobileNfcSection />

      {/* 7. Mobile Bottom: AI Recommendation (Page 12), Footer CTA */}
      <MobileAiRecommendationSection titleEntranceProgress={titleEntranceProgress} />

      {/* 8. Mobile Footer */}
      <footer className="w-full relative z-40 py-8 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] bg-[#070A13] border-t border-white/5 flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-2 mb-3">
          <img src="/logo.png" alt="LIVEFOR Logo" className="w-5 h-5 object-contain opacity-80" />
          <span className="font-brand text-xs font-medium text-white/70 tracking-wider uppercase">理法 LIVEFOR</span>
        </div>
        <p className="text-white/30 text-xs mb-3 select-none">
          © 2024 理法 LIVEFOR. All Rights Reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white/40 hover:text-white/80 active:text-white text-xs py-1.5 px-3.5 rounded border border-white/10 hover:border-white/20 transition-all cursor-pointer font-['Noto_Sans_SC'] font-normal"
        >
          回到顶部
        </button>
      </footer>

      {/* Back to top floating button */}
      <MobileBackToTop />

      {/* Mobile Menu Drawer (triggered by top navbar hamburger button) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-[24px] flex flex-col justify-between pt-[calc(env(safe-area-inset-top,0px)+2rem)] pb-[calc(env(safe-area-inset-bottom,0px)+2.5rem)] px-6 sm:px-8"
          >
            <div className="flex items-center justify-between w-full pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="font-brand text-sm font-medium text-white tracking-wider uppercase">理法 LIVEFOR</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-[#EBEBEB] hover:text-white rounded-full bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div 
              className="flex flex-col gap-6 my-auto py-6 font-brand"
              style={{ fontFamily: "var(--font-brand), 'FZYOONCHEQWHJW', sans-serif" }}
            >
              {[
                { label: "主站", subLabel: "Station", id: "home" },
                { label: "产品设计", subLabel: "Product Design", id: "product-design" },
                { label: "资源下载", subLabel: "Resource", id: "resource" },
                { label: "制作人员", subLabel: "Producer", id: "producer" },
              ].map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button 
                    key={link.id}
                    className="block group py-2 w-full text-left cursor-pointer focus:outline-none" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (link.id === 'home') {
                        onNavigate?.('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (link.id === 'product-design') {
                        onNavigate?.('product-design');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (link.id === 'resource') {
                        const el = document.getElementById('mobile-ai-recommendation-section') || document.querySelector('footer');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (link.id === 'producer') {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }
                    }}
                  >
                    <div 
                      className={`text-2xl mb-1 transition-colors flex items-center justify-between ${
                        isActive ? 'text-white font-medium' : 'text-[#EBEBEB] font-normal group-hover:text-white'
                      }`}
                      style={{ 
                        fontFamily: isActive 
                          ? "'FZYOONCHE-Medium', var(--font-brand), 'FZYOONCHEQWHJW', sans-serif" 
                          : "'FZYOONCHE-Regular', var(--font-brand), 'FZYOONCHEQWHJW', sans-serif",
                        fontWeight: isActive ? 500 : 400
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />}
                      </span>
                      {isActive && (
                        <span 
                          className="text-xs text-white/50 tracking-normal font-normal"
                          style={{ fontFamily: "'FZYOONCHE-Regular', var(--font-brand), 'FZYOONCHEQWHJW', sans-serif" }}
                        >
                          当前页
                        </span>
                      )}
                    </div>
                    <div 
                      className={`text-xs tracking-widest uppercase transition-colors ${
                        isActive ? 'text-[#EBEBEB] font-normal' : 'text-[#808080] font-normal group-hover:text-[#EBEBEB]'
                      }`}
                      style={{ 
                        fontFamily: "'FZYOONCHE-Regular', var(--font-brand), 'FZYOONCHEQWHJW', sans-serif",
                        fontWeight: 400
                      }}
                    >
                      {link.subLabel}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="w-full pt-4">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate?.('product-design');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#EBEBEB] text-[#1A1A1A] font-brand font-bold text-base py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg hover:bg-white cursor-pointer"
                style={{ fontFamily: "var(--font-brand), 'FZYOONCHEQWHJW', sans-serif" }}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileLayout;
