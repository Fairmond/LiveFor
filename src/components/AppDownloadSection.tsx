import React, { memo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

function AppDownloadSection(props: React.SVGProps<SVGSVGElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pinState, setPinState] = useState<'before' | 'pinned' | 'dropped'>('before');

  // Motion values for smooth progress-linked animations
  const phoneX = useMotionValue(161.5);
  
  // Independent motion values to make logo and button enter asynchronously
  const logoOpacity = useMotionValue(0);
  const logoX = useMotionValue(30);
  const ctaOpacity = useMotionValue(0);
  const ctaX = useMotionValue(35);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = containerRef.current.clientHeight;
      const viewportHeight = window.innerHeight;

      const pinStart = elementTop;
      const pinEnd = elementTop + elementHeight - viewportHeight;
      const currentScroll = window.scrollY;

      let state: 'before' | 'pinned' | 'dropped' = 'before';
      let progress = 0;

      if (currentScroll < pinStart) {
        state = 'before';
        progress = 0;
      } else if (currentScroll >= pinStart && currentScroll < pinEnd) {
        state = 'pinned';
        progress = (currentScroll - pinStart) / (pinEnd - pinStart);
      } else {
        state = 'dropped';
        progress = 1;
      }

      setPinState(state);

      // 1. Hide the navbar early: starts hiding 250px before pinning, fully hidden 50px before
      const startHideY = pinStart - 250;
      const endHideY = pinStart - 50;
      let navProgress = 0;
      if (currentScroll >= startHideY) {
        navProgress = Math.min((currentScroll - startHideY) / (endHideY - startHideY), 1);
      } else {
        navProgress = 0;
      }

      window.dispatchEvent(
        new CustomEvent("livefor-nav-offset", {
          detail: { progress: navProgress },
        })
      );

      // 2. Horizontally translate the centered phone back to the left from 0.15 to 0.70 progress range
      const phoneProgress = Math.min(Math.max((progress - 0.15) / 0.55, 0), 1);
      const computedPhoneX = 161.5 * (1 - phoneProgress);
      phoneX.set(computedPhoneX);

      // 3. Asynchronously reveal logo group (starts sooner, from 0.35 to 0.65 range)
      const logoProgress = Math.min(Math.max((progress - 0.35) / 0.30, 0), 1);
      logoOpacity.set(logoProgress);
      logoX.set(30 * (1 - logoProgress));

      // 4. Asynchronously reveal CTA button (starts later, from 0.55 to 0.85 range)
      const ctaProgress = Math.min(Math.max((progress - 0.55) / 0.30, 0), 1);
      ctaOpacity.set(ctaProgress);
      ctaX.set(35 * (1 - ctaProgress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.dispatchEvent(
        new CustomEvent("livefor-nav-offset", {
          detail: { progress: 0 },
        })
      );
    };
  }, [phoneX, logoOpacity, logoX, ctaOpacity, ctaX]);

  const getContainerStyle = (): React.CSSProperties => {
    switch (pinState) {
      case 'before':
        return {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
        };
      case 'pinned':
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 40,
        };
      case 'dropped':
        return {
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100vh',
        };
    }
  };

  return (
    <section 
      ref={containerRef}
      id="app-download-section"
      className="relative w-full h-[calc(1.8*100vw*871/1485)] sm:h-[calc(2.2*100vw*871/1485)] max-h-[calc(2.2*1440px*871/1485)] min-h-[150vh] sm:min-h-[200vh] bg-[#f9f9f9] select-none overflow-x-hidden"
    >
      <div 
        style={getContainerStyle()}
        className="w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none"
      >
        <div className="w-full max-w-[1440px] aspect-[1485/871] px-2 sm:px-4 md:px-8 pointer-events-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1485 871"
            className="w-full h-full block"
            {...props}
          >
            <defs>
              <linearGradient
                id="app-dl-gradient-c"
                x1={0.742}
                x2={0.338}
                y1={1.641}
                y2={-0.243}
                gradientUnits="objectBoundingBox"
              >
                <stop offset={0} stopColor="#3b3b3b" />
                <stop offset={1} />
              </linearGradient>
              <clipPath id="app-dl-clipPath-b">
                <circle
                  cx={7.309}
                  cy={7.309}
                  r={7.309}
                  fill="#fff"
                  data-name="椭圆 321"
                  opacity={0.22}
                />
              </clipPath>
              <pattern
                id="app-dl-pattern-a"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 6736 5052"
              >
                <image
                  href="/尾页样机.png"
                  xlinkHref="/尾页样机.png"
                  width={6736}
                  height={5052}
                />
              </pattern>
            </defs>
            <path fill="#f9f9f9" d="M45 0h1440v800H45z" data-name="矩形 468" />
            
            {/* Centered Phone Components with scroll-linked horizontal movement */}
            <motion.g style={{ x: phoneX }}>
              <path fill="url(#app-dl-pattern-a)" d="M0 0h1162v871H0z" />
              <g
                clipPath="url(#app-dl-clipPath-b)"
                data-name="蒙版组 57"
                transform="translate(573.692 138.646)"
              >
                <image
                  href="/Body.png"
                  xlinkHref="/Body.png"
                  width={1163.567}
                  height={872.675}
                  transform="translate(-605.16 -149.173)"
                />
              </g>
            </motion.g>

            {/* Asynchronous Entrance: Logo and Title Group */}
            <motion.g style={{ opacity: logoOpacity, x: logoX }}>
              <g data-name="组 159" transform="translate(80 -4918)">
                <image
                  href="/logo黑红.png"
                  xlinkHref="/logo黑红.png"
                  width={325}
                  height={325}
                  transform="translate(720 5071)"
                />
                <text
                  data-name="LIVEFOR 理法"
                  fontFamily="FZYooncheQWHS-M--GB1-0, FZYooncheQWHS"
                  fontSize={42}
                  letterSpacing="-.05em"
                  transform="translate(765 5386)"
                >
                  <tspan x={0} y={0}>
                    {"LIVEFOR"}
                  </tspan>
                  <tspan y={0} fontFamily="FZYooncheQWHS-B--GB1-0, FZYooncheQWHS" />
                  <tspan y={0} fontFamily="FZYooncheQWHS-R--GB1-0, FZYooncheQWHS">
                    {"理法"}
                  </tspan>
                </text>
              </g>
            </motion.g>

            {/* Asynchronous Entrance: Download CTA Button with independent stagger */}
            <motion.g 
              data-name="组 161"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                cursor: "pointer", 
                transformOrigin: "962px 613px",
                opacity: ctaOpacity,
                x: ctaX
              }}
            >
              <g
                fill="url(#app-dl-gradient-c)"
                stroke="#707070"
                data-name="矩形 473"
                transform="translate(819 578)"
              >
                <rect width={287} height={70} stroke="none" rx={35} />
                <rect width={286} height={69} x={0.5} y={0.5} fill="none" rx={34.5} />
              </g>
              <text
                fill="#f9f9f9"
                fontFamily="Noto Sans SC"
                fontSize={36}
                transform="translate(921 626)"
              >
                <tspan x={0} y={0}>
                  {"下载理法"}
                </tspan>
              </text>
              <g fill="none" stroke="#f9f9f9" strokeWidth={2.5} data-name="组 160">
                <g data-name="矩形 474" transform="translate(857 597)">
                  <rect width={22} height={33} stroke="none" rx={7} />
                  <rect width={19.5} height={30.5} x={1.25} y={1.25} rx={5.75} />
                </g>
                <path
                  strokeLinecap="round"
                  d="M866.084 603.703h3.826"
                  data-name="直线 145"
                />
              </g>
            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}

export const AppDownloadSectionMemo = memo(AppDownloadSection);
export default AppDownloadSectionMemo;
