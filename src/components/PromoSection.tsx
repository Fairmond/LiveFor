import { motion } from 'motion/react';

export default function PromoSection({ 
  id = "promo-section",
  title = "触手可及的未来",
  description = "无论你身处何地都能精准对接最适合你的发型方案，让一切改变都充满期待。"
}: { 
  id?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section 
      className="relative z-30 w-full pt-10 sm:pt-14 pb-14 sm:pb-20 flex flex-col items-center justify-center bg-brand-bg overflow-hidden px-4"
      id={id}
    >
      <div 
        className="relative z-30 flex flex-col items-center text-center w-full max-w-[90vw]"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Big Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[24px] xs:text-[28px] sm:text-[clamp(29px,2.33vw,38px)] font-['Noto_Sans_SC'] font-bold text-[#2E2E2E] leading-tight sm:leading-none w-full text-center"
        >
          {title}
        </motion.h2>

        {/* Gap: 18px */}
        <div className="h-3 sm:h-[calc(18/1440*100vw)] min-h-[12px]" />

        {/* Small Text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14px] xs:text-[15px] sm:text-[clamp(17px,1.33vw,22px)] font-brand font-normal text-[#2E2E2E] tracking-normal w-full max-w-xl text-center leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
