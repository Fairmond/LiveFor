import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { NfcInteractionDemo } from "../NfcInteractionDemo";

export const MobileNfcSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "-30px 0px -30px 0px",
  });
  const [animCycle, setAnimCycle] = useState(0);
  const prevInViewRef = useRef(false);

  useEffect(() => {
    if (isInView && !prevInViewRef.current) {
      setAnimCycle((c) => c + 1);
    }
    prevInViewRef.current = isInView;
  }, [isInView]);

  return (
    <section
      id="mobile-nfc"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center select-none bg-[#f9f9f9] overflow-hidden pt-16 xs:pt-20 pb-12 xs:pb-16"
    >
      <div className="w-full max-w-[430px] overflow-hidden">
        <svg
          key={`mobile-nfc-svg-${animCycle}`}
          viewBox="0 3080 393 558"
          className="w-full h-auto block select-none overflow-hidden"
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <defs>
            <filter id="m_edge_mask_blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Background fill to match #f9f9f9 */}
          <rect x="0" y="3080" width="393" height="558" fill="#f9f9f9" />

          <g transform="translate(-3 2980)">
            {/* Background Grid Lines matching the exact mobile design */}
            <line x2="332" transform="translate(30.5 163.5)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />
            <line x2="332" transform="translate(30.5 210.5)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />
            <line x2="332" transform="translate(30.5 464.5)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />
            <line x2="332" transform="translate(30.5 610)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />
            <line x2="332" transform="translate(30.5 657.5)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />
            <line y2="529" transform="translate(30.5 128.842)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />
            <line y2="529" transform="translate(363 128.842)" fill="none" stroke="#b0b0b0" strokeWidth="0.5" />

            {/* Edge blur mask rects contained strictly within this section */}
            <rect width="57" height="530" transform="translate(8 128)" fill="#f9f9f9" filter="url(#m_edge_mask_blur)" style={{ filter: "blur(10px)" }} />
            <rect width="57" height="530" transform="translate(335 128)" fill="#f9f9f9" filter="url(#m_edge_mask_blur)" style={{ filter: "blur(10px)" }} />
            <rect width="374" height="43" transform="translate(8 114)" fill="#f9f9f9" filter="url(#m_edge_mask_blur)" style={{ filter: "blur(10px)" }} />

            {/* Interactive Animated NFC Phones with ripple wave and callouts */}
            <NfcInteractionDemo isInView={isInView} isMobile={true} />

            {/* Typography: 极致快捷 便利的 体验 */}
            <g transform="translate(52 509)">
              <text
                fill="#292929"
                fontSize="27"
                fontFamily="SourceHanSansCN-Medium, Source Han Sans CN, PingFang SC, Microsoft YaHei, sans-serif"
                fontWeight="500"
                letterSpacing="0.04em"
              >
                <tspan x="0" y="0">极致快捷</tspan>
                <tspan x="0" y="37">便利的</tspan>
                <tspan x="0" y="74">体验</tspan>
              </text>
            </g>

            {/* Subtitle & Arrow: 碰一碰交换信息 */}
            <g transform="translate(176 -3182.5)">
              <text
                transform="translate(26 3745.5)"
                fill="#b3b3b3"
                fontSize="10"
                fontFamily="SourceHanSansCN-Normal, Source Han Sans CN, PingFang SC, Microsoft YaHei, sans-serif"
                letterSpacing="0.07em"
              >
                <tspan x="0" y="0">NFC快捷交换信息，将你的预</tspan>
                <tspan x="0" y="12">设和偏好即刻传给理发师，不</tspan>
                <tspan x="0" y="24">再需要逐条口述。</tspan>
              </text>
              <text
                transform="translate(56 3727.5)"
                fill="#292929"
                fontSize="15"
                fontFamily="SourceHanSansCN-Normal, Source Han Sans CN, PingFang SC, Microsoft YaHei, sans-serif"
                letterSpacing="0.06em"
              >
                <tspan x="0" y="0">碰一碰交换信息</tspan>
              </text>
              <g transform="translate(-189.305 -105.02)">
                <g transform="translate(355.305 3886.07) rotate(135)">
                  <path d="M7.461,14.92,0,7.46,7.461,0" fill="none" stroke="#292929" strokeWidth="2" />
                  <path d="M14.878,0H0" transform="translate(0.001 7.46)" fill="none" stroke="#292929" strokeLinejoin="round" strokeWidth="2" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
};
