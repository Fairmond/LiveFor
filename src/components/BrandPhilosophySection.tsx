import React from 'react';
import { motion } from 'motion/react';

export default function BrandPhilosophySection() {
  return (
    <section 
      id="brand-philosophy-section"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-brand-bg select-none py-4 sm:py-12 px-2 sm:px-4"
    >
      <div className="w-full max-w-[1440px] aspect-[1440/699]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 1440 699"
          className="w-full h-full block"
        >
          <defs>
            <filter
              id="bp-filter-perm"
              width={343}
              height={473}
              x={151}
              y={226}
              filterUnits="userSpaceOnUse"
            >
              <feOffset dx={2} dy={3} />
              <feGaussianBlur result="blur" stdDeviation={5} />
              <feFlood floodOpacity={0.302} />
              <feComposite in2="blur" operator="in" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="bp-filter-wind"
              width={348}
              height={473}
              x={550}
              y={226}
              filterUnits="userSpaceOnUse"
            >
              <feOffset dx={2} dy={3} />
              <feGaussianBlur result="blur-2" stdDeviation={5} />
              <feFlood floodOpacity={0.302} />
              <feComposite in2="blur-2" operator="in" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="bp-filter-sun"
              width={346}
              height={473}
              x={950}
              y={226}
              filterUnits="userSpaceOnUse"
            >
              <feOffset dx={2} dy={3} />
              <feGaussianBlur result="blur-3" stdDeviation={5} />
              <feFlood floodOpacity={0.302} />
              <feComposite in2="blur-3" operator="in" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="bp-shadow-rect"
              width={232}
              height={88}
              x={1077}
              y={104}
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy={3} />
              <feGaussianBlur result="blur-4" stdDeviation={5} />
              <feFlood floodOpacity={0.102} />
              <feComposite in2="blur-4" operator="in" />
              <feComposite in="SourceGraphic" />
            </filter>
            <pattern
              id="bp-pattern"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 892 1260"
            >
              <image
                xlinkHref="/贴面烫发.png"
                width={892}
                height={1260}
              />
            </pattern>
            <pattern
              id="bp-pattern-sun"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 909 1276"
            >
              <image
                xlinkHref="/阳光温柔体积.png"
                width={909}
                height={1276}
              />
            </pattern>
            <style>
              {
                ".bp-cls-9{fill:none;stroke:#292929;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
              }
            </style>
          </defs>

          {/* Background Rectangle: width 1440, height 559 */}
          <path
            id="矩形_461"
            d="M0 0h1440v559H0z"
            data-name="矩形 461"
            style={{
              fill: "#f2f2f2",
            }}
          />

          <g style={{ transform: 'scale(0.85)', transformOrigin: '720px 350px' }}>
          <g id="组_150" data-name="组 150" transform="translate(2 -3248)">
            {/* Card 1: 贴面烫发 */}
            <g id="组_147" data-name="组 147" transform="translate(4 162)">
              <motion.g
                id="贴面烫发"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{ transformOrigin: '313px 3594.5px', cursor: 'pointer' }}
              >
                <g
                  style={{
                    filter: "url(#bp-filter-perm)",
                    mixBlendMode: "hard-light",
                    isolation: "isolate",
                  }}
                  transform="translate(-6 3135)"
                >
                  <path
                    id="使用工具生成图片_4_2"
                    d="M0 0h313v443H0z"
                    data-name="使用工具生成图片 (4)"
                    style={{
                      fill: "url(#bp-pattern)",
                    }}
                    transform="translate(164 238)"
                  />
                </g>
                <image
                  xlinkHref="/贴面烫发.png"
                  id="使用工具生成图片_4_3"
                  width={314}
                  height={443}
                  data-name="使用工具生成图片 (4)"
                  transform="translate(156 3373)"
                />
              </motion.g>
            </g>

            {/* Card 2: 如风自由 */}
            <g id="组_148" data-name="组 148" transform="translate(12 159.072)">
              <motion.g
                id="如风自由"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{ transformOrigin: '703.5px 3594.9px', cursor: 'pointer' }}
              >
                <g
                  style={{
                    filter: "url(#bp-filter-wind)",
                  }}
                  transform="translate(-14 3137.93)"
                >
                  <image
                    xlinkHref="/如风自由体积.png"
                    id="如风自由体积-2"
                    width={318}
                    height={443}
                    data-name="如风自由体积"
                    transform="translate(563 238)"
                  />
                </g>
                <image
                  xlinkHref="/如风自由.png"
                  id="如风自由-2"
                  width={315}
                  height={444}
                  data-name="如风自由"
                  transform="translate(546 3372.928)"
                />
              </motion.g>
            </g>

            {/* Card 3: 阳光温柔 */}
            <g id="组_149" data-name="组 149" transform="translate(24 162.014)">
              <motion.g
                id="阳光温柔"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{ transformOrigin: '1092px 3594.5px', cursor: 'pointer' }}
              >
                <g
                  style={{
                    filter: "url(#bp-filter-sun)",
                  }}
                  transform="translate(-26 3134.99)"
                >
                  <path
                    id="阳光温柔体积-2"
                    d="M0 0h316v443H0z"
                    data-name="阳光温柔体积"
                    style={{
                      fill: "url(#bp-pattern-sun)",
                    }}
                    transform="translate(963 238)"
                  />
                </g>
                <image
                  xlinkHref="/阳光温柔.png"
                  id="阳光温柔-2"
                  width={316}
                  height={443}
                  data-name="阳光温柔"
                  transform="translate(934 3372.986)"
                />
              </motion.g>
            </g>

            {/* Title / Header Elements */}
            <g id="标题组" transform="translate(-4 902)">
              <text
                id="不止时尚_更有态度_"
                data-name="不止时尚，更有态度。"
                style={{
                  letterSpacing: ".04em",
                  fontSize: 40,
                  fontFamily: 'SourceHanSansCN-Bold, "Source Han Sans CN", "Microsoft YaHei", sans-serif',
                  fontWeight: 700,
                  fill: "#292929",
                }}
                transform="translate(151 2387)"
              >
                <tspan x={0} y={46}>
                  {"不止时尚，更有态度。"}
                </tspan>
              </text>
              <text
                id="为用户即使推送最新_最热的造型发型设计_掌握潮流趋势_更让自己的风格_态度有的放矢_"
                data-name="为用户即使推送最新、最热的造型发型设计。掌握潮流趋势，更让自己的风格、态度有的放矢。"
                style={{
                  fontSize: 24,
                  fill: "#8f8f8f",
                  fontFamily: 'SourceHanSansCN-Regular, "Source Han Sans CN", "Microsoft YaHei", sans-serif',
                  letterSpacing: ".04em",
                }}
                transform="translate(151 2450)"
              >
                <tspan x={0} y={28}>
                  {"为用户及时推送最新、最热的造型发型设计。掌"}
                </tspan>
                <tspan x={0} y={68}>
                  {"握潮流趋势，更让自己的风格、态度有的放矢。"}
                </tspan>
              </text>
            </g>

            {/* Link Elements */}
            <g transform="translate(52 24.641)">
              <motion.g
                id="跳转组"
                style={{ cursor: 'pointer', transformOrigin: '1139px 3369px' }}
                whileHover="hover"
                initial="initial"
              >
                <motion.g
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.04 }
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                >
                  <g
                    style={{
                      filter: "url(#bp-shadow-rect)",
                    }}
                    transform="translate(-54 3223.36)"
                  >
                    <rect
                      id="矩形_462-2"
                      width={202}
                      height={58}
                      data-name="矩形 462"
                      rx={15}
                      style={{
                        fill: "#fff",
                      }}
                      transform="translate(1092 116)"
                    />
                  </g>
                  <rect
                    id="矩形_463"
                    width={200}
                    height={56}
                    data-name="矩形 463"
                    rx={15}
                    style={{
                      fill: "#fafafa",
                    }}
                    transform="translate(1039 3341.359)"
                  />
                  <text
                    id="更多推荐"
                    style={{
                      fontFamily: 'SourceHanSansCN-Medium, "Source Han Sans CN", "Microsoft YaHei", sans-serif',
                      fontWeight: 500,
                      fontSize: 24,
                      letterSpacing: ".04em",
                      fill: "#292929",
                    }}
                    transform="translate(1069.791 3379.267)"
                  >
                    <tspan x={0} y={0}>
                      {"更多推荐"}
                    </tspan>
                  </text>
                </motion.g>
                
                {/* Arrow */}
                <g transform="translate(1220.209 3377.872) rotate(180)">
                  <motion.g
                    id="_6906744bc45e42ad5fe6cd95_arrow_header"
                    data-name="6906744bc45e42ad5fe6cd95_arrow_header"
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 6 }
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  >
                    <path
                      id="路径_143"
                      d="M7.461 14.92 0 7.46 7.461 0"
                      className="bp-cls-9"
                      data-name="路径 143"
                    />
                    <path
                      id="路径_144"
                      d="M14.878 0H0"
                      className="bp-cls-9"
                      data-name="路径 144"
                      transform="translate(.001 7.46)"
                    />
                  </motion.g>
                </g>
              </motion.g>
            </g>
          </g>
          </g>
        </svg>
      </div>
    </section>
  );
}
