import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export const MobileMagazineSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#f2f2f2] py-16 xs:py-24 px-5 sm:px-6 flex flex-col items-center select-none overflow-hidden my-12 xs:my-16">
      <div className="w-full max-w-[460px] flex flex-col">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#1e1e1e] text-[clamp(24px,7.5vw,32px)] font-bold tracking-[0.01em] font-['Noto_Sans_SC',sans-serif] leading-[1.25]"
        >
          不止时尚，更有态度。
        </motion.h2>

        {/* Subtitle */}
        <div className="mt-3.5 space-y-1 text-[#78787c] text-[clamp(13px,3.8vw,15px)] leading-[1.6] font-normal tracking-[0.01em]">
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            为用户即使推送最新、最热的造型设计。
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.16, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            更让自己的风格、态度有的放矢。
          </motion.p>
        </div>

        {/* 3 Cascading Diagonal Magazine Covers (As shown in 组 186.png) - Slide in from right to left */}
        <div className="relative w-full h-[clamp(430px,118vw,485px)] mt-8 overflow-visible">
          {/* Card 1: Top-Left (茶灰色 x 贴面烫发) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 w-[53%] max-w-[190px] aspect-[892/1260] rounded-[6px] overflow-hidden shadow-[0_16px_32px_-6px_rgba(0,0,0,0.22),0_6px_14px_-3px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] z-10 bg-neutral-100 will-change-transform"
          >
            <img
              src="/贴面烫发.png"
              alt="茶灰色 x 贴面烫发"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle magazine book spine crease */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none rounded-l-[6px]" />
          </motion.div>

          {/* Card 2: Center/Middle (如风自由) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[24%] sm:left-[86px] top-[95px] sm:top-[100px] w-[53%] max-w-[190px] aspect-[948/1338] rounded-[6px] overflow-hidden shadow-[0_18px_36px_-6px_rgba(0,0,0,0.24),0_8px_16px_-4px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.06] z-20 bg-neutral-100 will-change-transform"
          >
            <img
              src="/如风自由.png"
              alt="如风自由 画染技术与波纹烫发"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle magazine book spine crease */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none rounded-l-[6px]" />
          </motion.div>

          {/* Card 3: Bottom-Right (温暖明亮 披肩中长发 x 栗色) */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.24, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[190px] sm:top-[200px] w-[53%] max-w-[190px] aspect-[909/1276] rounded-[6px] overflow-hidden shadow-[0_20px_40px_-6px_rgba(0,0,0,0.26),0_10px_18px_-4px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.06] z-30 bg-neutral-100 will-change-transform"
          >
            <img
              src="/阳光温柔.png"
              alt="温暖明亮 披肩中长发 x 栗色"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle magazine book spine crease */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none rounded-l-[6px]" />
          </motion.div>
        </div>

        {/* 更多推荐 Button (Strictly matching PC Page9Section style: #fafafa background, rounded-[10px], #292929 text and arrow, soft shadow) */}
        <div className="w-full flex justify-start mt-5 sm:mt-7">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="group flex items-center justify-center gap-3 px-5 py-2.5 rounded-[10px] bg-[#fafafa] text-[#292929] text-[14px] font-medium tracking-[0.04em] font-['Source_Han_Sans_CN',sans-serif] shadow-[0_3px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04] active:scale-95 transition-all cursor-pointer"
          >
            <span>更多推荐</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="text-[#292929] transition-transform duration-200 group-hover:translate-x-1"
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

