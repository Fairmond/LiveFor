import React, { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { NfcInteractionDemo } from "./NfcInteractionDemo";
import { PhoneScannerDemo } from "./PhoneScannerDemo";

function Page10Section(props: React.SVGProps<SVGSVGElement>) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3, margin: "-60px 0px -60px 0px" });

  return (
    <section 
      id="page-10-section"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-brand-bg select-none px-2 sm:px-4"
    >
      <div className="w-full max-w-[1440px] aspect-[1440/1400]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 1400"
          className="w-full h-full block"
          {...props}
        >
          <defs>
            <linearGradient id="grid-horizontal-fade" x1={0} y1={0} x2={1440} y2={0} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f9f9f9" />
              <stop offset="15%" stopColor="#b3b3b3" />
              <stop offset="85%" stopColor="#b3b3b3" />
              <stop offset="100%" stopColor="#f9f9f9" />
            </linearGradient>
            <linearGradient id="grid-vertical-fade-top" x1={0} y1={0} x2={0} y2={100} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f9f9f9" />
              <stop offset="100%" stopColor="#b3b3b3" />
            </linearGradient>
          </defs>
          <path fill="#f9f9f9" d="M0 0h1440v1400H0z" data-name="矩形 466" />
          <g style={{ transform: 'scale(0.85)', transformOrigin: '720px 700px' }}>
          <g fill="none">
            <path stroke="#b3b3b3" d="m888 734 1 660" data-name="直线 135" />
            <path stroke="#b3b3b3" d="M216 498.5h336" data-name="直线 133" />
            <path stroke="url(#grid-horizontal-fade)" d="M0 794h1440" data-name="直线 136" />
            <path stroke="url(#grid-horizontal-fade)" d="M0 1394h1440" data-name="直线 144" />
            <path stroke="url(#grid-horizontal-fade)" d="M0 734h1440" data-name="直线 138" />
            <path stroke="url(#grid-horizontal-fade)" d="M0 134h1440" data-name="直线 139" />
            <path stroke="url(#grid-horizontal-fade)" d="M0 74h1440" data-name="直线 140" />
            <path stroke="url(#grid-vertical-fade-top)" d="M552 0v794" data-name="直线 137" />
            <path stroke="url(#grid-vertical-fade-top)" d="M888 0v134" data-name="直线 142" />
            <path stroke="url(#grid-vertical-fade-top)" d="M216 0v1394" data-name="直线 141" />
            <path stroke="url(#grid-vertical-fade-top)" d="M1224 0v1394" data-name="直线 143" />
          </g>
          {/* Packaged Phone Map Scanner Module */}
          <PhoneScannerDemo isInView={isInView} />
          {/* AI Recommendation Cell Block with Hover Animation */}
          <motion.g whileHover="hover" style={{ cursor: "pointer" }}>
            <motion.rect
              x={888}
              y={794}
              width={336}
              height={600}
              fill="#1A1A1A"
              initial={{ fillOpacity: 0 }}
              variants={{
                hover: { fillOpacity: 1 }
              }}
              transition={{ duration: 0.25 }}
            />
            <motion.text
              fill="#292929"
              variants={{
                hover: { fill: "#F9F9F9" }
              }}
              transition={{ duration: 0.25 }}
              fontFamily="SourceHanSansCN-Medium, Source Han Sans CN"
              fontSize={32}
              fontWeight={500}
              letterSpacing=".06em"
              transform="translate(913 1222)"
            >
              <tspan x={0} y={0}>
                {"AI智能推荐理发师"}
              </tspan>
            </motion.text>
            <text
              fill="#b3b3b3"
              data-name="根据距离、性价比、技术能力适配的多维度智能 analysis 帮您快速筛选目标理发师。"
              fontFamily="SourceHanSansCN-Normal, Source Han Sans CN"
              fontSize={20}
              letterSpacing=".07em"
              transform="translate(913 1240)"
            >
              <tspan x={0} y={23}>
                {
                  "根据距离、性价比、技术能力"
                }
              </tspan>
              <tspan x={0} y={45}>
                {
                  "适配的多维度智能分析帮您快"
                }
              </tspan>
              <tspan x={0} y={67}>
                {"速筛选目标理发师。"}
              </tspan>
            </text>
            <motion.text
              fill="#292929"
              variants={{
                hover: { fill: "#F9F9F9" }
              }}
              transition={{ duration: 0.25 }}
              data-name="阅读文档"
              fontFamily="SourceHanSansCN-Medium, Source Han Sans CN"
              fontSize={20}
              fontWeight={500}
              letterSpacing=".06em"
              transform="translate(913 1346)"
            >
              <tspan x={0} y={23}>
                {"阅读文档"}
              </tspan>
            </motion.text>
            <motion.g
              fill="none"
              stroke="#292929"
              variants={{
                hover: { stroke: "#F9F9F9" }
              }}
              transition={{ duration: 0.25 }}
              strokeWidth={2}
              data-name="6906744bc45e42ad5fe6cd95_arrow_header"
            >
              <path
                d="m1009.48 1356.205 10.55-.001v10.55"
                data-name="路径 143"
              />
              <path
                strokeLinejoin="round"
                d="m1009.509 1366.725 10.52-10.52"
                data-name="路径 144"
              />
            </motion.g>
          </motion.g>

          {/* NFC Cell Block with Hover Animation */}
          <motion.g whileHover="hover" style={{ cursor: "pointer" }}>
            <motion.rect
              x={216}
              y={498.5}
              width={336}
              height={235.5}
              fill="#1A1A1A"
              initial={{ fillOpacity: 0 }}
              variants={{
                hover: { fillOpacity: 1 }
              }}
              transition={{ duration: 0.25 }}
            />
            <text
              fill="#b3b3b3"
              data-name="NFC快捷交换信息，将你的预设和偏好即刻传给理发师，不再需要逐条口述。"
              fontFamily="SourceHanSansCN-Normal, Source Han Sans CN"
              fontSize={20}
              letterSpacing=".07em"
              transform="translate(240 581)"
            >
              <tspan x={0} y={23}>
                {
                  "NFC快捷交换信息，将你的预"
                }
              </tspan>
              <tspan x={0} y={45}>
                {
                  "设和偏好即刻传给理发师，不"
                }
              </tspan>
              <tspan x={0} y={67}>
                {"再需要逐条口述。"}
              </tspan>
            </text>
            <motion.text
              fill="#292929"
              variants={{
                hover: { fill: "#F9F9F9" }
              }}
              transition={{ duration: 0.25 }}
              fontFamily="SourceHanSansCN-Medium, Source Han Sans CN"
              fontSize={32}
              fontWeight={500}
              letterSpacing=".06em"
              transform="translate(240 563)"
            >
              <tspan x={0} y={0}>
                {"碰一碰交换信息"}
              </tspan>
            </motion.text>
            <g data-name="阅读文档">
              <motion.text
                fill="#292929"
                variants={{
                  hover: { fill: "#F9F9F9" }
                }}
                transition={{ duration: 0.25 }}
                data-name="阅读文档"
                fontFamily="SourceHanSansCN-Medium, Source Han Sans CN"
                fontSize={20}
                fontWeight={500}
                letterSpacing=".06em"
                transform="translate(240 687)"
              >
                <tspan x={0} y={23}>
                  {"阅读文档"}
                </tspan>
              </motion.text>
              <motion.g
                fill="none"
                stroke="#292929"
                variants={{
                  hover: { stroke: "#F9F9F9" }
                }}
                transition={{ duration: 0.25 }}
                strokeWidth={2}
                data-name="6906744bc45e42ad5fe6cd95_arrow_header"
              >
                <path d="M339.48 697.21h10.55v10.55" data-name="路径 143" />
                <path
                  strokeLinejoin="round"
                  d="m339.509 707.731 10.52-10.52"
                  data-name="路径 144"
                />
              </motion.g>
            </g>
          </motion.g>
          <NfcInteractionDemo isInView={isInView} />
          <text
            fill="#292929"
            data-name="极致快捷 便利的 体验"
            fontFamily="SourceHanSansCN-Medium, Source Han Sans CN"
            fontSize={65}
            fontWeight={500}
            letterSpacing=".04em"
            transform="translate(239 230)"
          >
            <tspan x={0} y={0}>
              {"极致快捷"}
            </tspan>
            <tspan x={0} y={90}>
              {"便利的"}
            </tspan>
            <tspan x={0} y={180}>
              {"体验"}
            </tspan>
          </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

export default memo(Page10Section);
